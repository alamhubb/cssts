/**
 * CSS 数据提取脚本 v4
 * 
 * 改进：
 * 1. 先推断基础类型的 units（不包含联合类型）
 * 2. 属性的 numberTypes 展开联合类型为基础类型
 * 3. 校验：属性的 units = numberTypes 的 units 并集
 * 4. 生成简化的 css-number-types.json
 * 
 * 运行方式：npx tsx scripts/extract-css-data-v4.ts
 */

import * as csstree from 'css-tree';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ==================== 类型定义 ====================

// 9 个基础数值类型
const BASE_NUMBER_TYPES = [
  'length', 'angle', 'time', 'frequency', 
  'percentage', 'number', 'integer', 
  'resolution', 'flex'
] as const;

type BaseNumberType = typeof BASE_NUMBER_TYPES[number];

// 联合类型到基础类型的映射
const COMPOSITE_TO_BASE: Record<string, BaseNumberType[]> = {
  'length-percentage': ['length', 'percentage'],
  'angle-percentage': ['angle', 'percentage'],
  'time-percentage': ['time', 'percentage'],
  'frequency-percentage': ['frequency', 'percentage'],
};

// css-tree 中的类型名到我们的类型名的映射
const NUMBER_TYPE_MAP: Record<string, string> = {
  'length': 'length',
  'length-percentage': 'length-percentage',
  'percentage': 'percentage',
  'number': 'number',
  'integer': 'integer',
  'positive-integer': 'integer',
  'angle': 'angle',
  'angle-percentage': 'angle-percentage',
  'time': 'time',
  'time-percentage': 'time-percentage',
  'flex': 'flex',
  'resolution': 'resolution',
  'frequency': 'frequency',
  'frequency-percentage': 'frequency-percentage',
};


// NumberType 到 UnitCategory 的映射
const NUMBER_TYPE_TO_CATEGORIES: Record<BaseNumberType, string[]> = {
  length: ['pixel', 'fontRelative', 'physical', 'percentage'],
  angle: ['angle'],
  time: ['time'],
  frequency: ['frequency'],
  percentage: ['percentage'],
  number: ['unitless'],
  integer: ['unitless'],
  resolution: ['resolution'],
  flex: ['flex'],
};

// 根据 numberTypes 计算 unitCategories
function computeUnitCategories(numberTypes: BaseNumberType[]): string[] {
  const categories = new Set<string>();
  for (const nt of numberTypes) {
    const cats = NUMBER_TYPE_TO_CATEGORIES[nt];
    if (cats) {
      cats.forEach(c => categories.add(c));
    }
  }
  return [...categories].sort();
}

// 基础类型描述
const BASE_TYPE_DESCRIPTIONS: Record<BaseNumberType, { en: string; zh: string }> = {
  'length': {
    en: 'A distance measurement (px, em, rem, vh, vw, etc.)',
    zh: '距离度量（px、em、rem、vh、vw 等）'
  },
  'angle': {
    en: 'An angle value (deg, grad, rad, turn)',
    zh: '角度值（deg、grad、rad、turn）'
  },
  'time': {
    en: 'A time value (s, ms)',
    zh: '时间值（s、ms）'
  },
  'frequency': {
    en: 'A frequency value (Hz, kHz)',
    zh: '频率值（Hz、kHz）'
  },
  'percentage': {
    en: 'A percentage value (%)',
    zh: '百分比值（%）'
  },
  'number': {
    en: 'A real number, possibly with a fractional component',
    zh: '实数，可能带有小数部分'
  },
  'integer': {
    en: 'A whole number, positive or negative',
    zh: '整数，正数或负数'
  },
  'resolution': {
    en: 'A resolution value (dpi, dpcm, dppx, x)',
    zh: '分辨率值（dpi、dpcm、dppx、x）'
  },
  'flex': {
    en: 'A flexible length in fr units',
    zh: '弹性长度（fr 单位）'
  },
};

// ==================== 提取函数 ====================

function extractNumberTypes(syntax: any, visited: Set<string> = new Set()): Set<string> {
  const types = new Set<string>();
  if (!syntax) return types;

  const lexer = (csstree as any).lexer;

  if (syntax.type === 'Type' && syntax.name) {
    if (NUMBER_TYPE_MAP[syntax.name]) {
      types.add(NUMBER_TYPE_MAP[syntax.name]);
    }
    if (!visited.has(syntax.name)) {
      visited.add(syntax.name);
      const typeData = lexer.types[syntax.name];
      if (typeData && typeData.syntax) {
        for (const t of extractNumberTypes(typeData.syntax, visited)) {
          types.add(t);
        }
      }
    }
  } else if (syntax.type === 'Group' && syntax.terms) {
    for (const term of syntax.terms) {
      for (const t of extractNumberTypes(term, visited)) {
        types.add(t);
      }
    }
  } else if (syntax.type === 'Multiplier' && syntax.term) {
    for (const t of extractNumberTypes(syntax.term, visited)) {
      types.add(t);
    }
  }

  return types;
}

function getPropertyNumberTypes(property: string): string[] {
  const lexer = (csstree as any).lexer;
  const propData = lexer.properties[property];
  if (!propData || !propData.syntax) return [];

  const types = extractNumberTypes(propData.syntax);
  return [...types].sort();
}

// 将联合类型展开为基础类型
function expandToBaseTypes(numberTypes: string[]): BaseNumberType[] {
  const baseTypes = new Set<BaseNumberType>();
  
  for (const nt of numberTypes) {
    if (COMPOSITE_TO_BASE[nt]) {
      // 联合类型，展开
      for (const bt of COMPOSITE_TO_BASE[nt]) {
        baseTypes.add(bt);
      }
    } else if (BASE_NUMBER_TYPES.includes(nt as BaseNumberType)) {
      // 基础类型
      baseTypes.add(nt as BaseNumberType);
    }
  }
  
  return [...baseTypes].sort() as BaseNumberType[];
}


// ==================== 推断基础类型的 units ====================

interface RawPropertyData {
  name: string;
  numberTypes: string[];  // 原始类型（可能包含联合类型）
  units: string[];
}

function inferBaseTypeUnits(properties: RawPropertyData[]): Map<BaseNumberType, Set<string>> {
  const typeUnitsMap = new Map<BaseNumberType, Set<string>>();
  
  // 初始化
  for (const bt of BASE_NUMBER_TYPES) {
    typeUnitsMap.set(bt, new Set());
  }
  
  // 待处理的属性
  let pending = [...properties];
  const MAX_ITERATIONS = 10;
  
  for (let iteration = 1; iteration <= MAX_ITERATIONS; iteration++) {
    const stillPending: RawPropertyData[] = [];
    let processed = 0;
    
    for (const prop of pending) {
      // 展开为基础类型
      const baseTypes = expandToBaseTypes(prop.numberTypes);
      
      // 找出已知和未知的类型
      const knownTypes = baseTypes.filter(bt => typeUnitsMap.get(bt)!.size > 0);
      const unknownTypes = baseTypes.filter(bt => typeUnitsMap.get(bt)!.size === 0);
      
      if (unknownTypes.length === 1) {
        // 只有一个未知类型，可以推断
        const unknownType = unknownTypes[0];
        const remaining = new Set(prop.units);
        
        // 减去已知类型的 units
        for (const kt of knownTypes) {
          for (const u of typeUnitsMap.get(kt)!) {
            remaining.delete(u);
          }
        }
        
        // 设置或验证未知类型的 units
        const existingUnits = typeUnitsMap.get(unknownType)!;
        if (existingUnits.size === 0) {
          // 首次设置
          for (const u of remaining) {
            existingUnits.add(u);
          }
        } else {
          // 已有值，验证一致性
          const existingArr = [...existingUnits].sort();
          const newArr = [...remaining].sort();
          if (existingArr.join(',') !== newArr.join(',')) {
            console.log(`\n❌ 类型 ${unknownType} 的 units 不一致！`);
            console.log(`   已有: [${existingArr.join(', ')}]`);
            console.log(`   新推断 (来自 ${prop.name}): [${newArr.join(', ')}]`);
            console.log('\n❌ 一致性校验失败，程序中断！');
            process.exit(1);
          }
        }
        
        processed++;
      } else if (unknownTypes.length === 0) {
        // 所有类型都已知
        processed++;
      } else {
        // 多个未知类型，暂时跳过
        stillPending.push(prop);
      }
    }
    
    if (stillPending.length === 0) break;
    if (stillPending.length === pending.length) break;
    
    pending = stillPending;
  }
  
  return typeUnitsMap;
}


// ==================== 校验函数 ====================

function validateProperty(
  prop: RawPropertyData,
  typeUnitsMap: Map<BaseNumberType, Set<string>>
): { valid: boolean; expected: Set<string>; actual: Set<string> } {
  const baseTypes = expandToBaseTypes(prop.numberTypes);
  
  // 计算期望的 units（所有基础类型的 units 并集）
  const expected = new Set<string>();
  for (const bt of baseTypes) {
    const units = typeUnitsMap.get(bt);
    if (units) {
      for (const u of units) {
        expected.add(u);
      }
    }
  }
  
  const actual = new Set(prop.units);
  
  // 检查是否相等
  const valid = expected.size === actual.size && 
    [...expected].every(u => actual.has(u));
  
  return { valid, expected, actual };
}

// ==================== 主函数 ====================

function main() {
  console.log('CSS 数据提取 v4\n');
  console.log('基础类型:', BASE_NUMBER_TYPES.join(', '));
  console.log('联合类型:', Object.keys(COMPOSITE_TO_BASE).join(', '));
  console.log();
  
  const lexer = (csstree as any).lexer;
  const allProperties = Object.keys(lexer.properties as Record<string, any>).sort();
  const timestamp = new Date().toISOString();
  const version = (csstree as any).version || 'unknown';
  
  const outputDir = path.join(__dirname, '../src/data');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // 1. 提取原始数据
  console.log('1. 提取原始数据...');
  const rawProperties: RawPropertyData[] = [];
  
  for (const name of allProperties) {
    const numberTypes = getPropertyNumberTypes(name);
    if (numberTypes.length === 0) continue;
    
    // 从 extract-css-data-v3.ts 的逻辑获取 units
    const units = resolveUnitsFromTypes(numberTypes);
    rawProperties.push({ name, numberTypes, units });
  }
  console.log(`   提取了 ${rawProperties.length} 个属性`);
  
  // 2. 推断基础类型的 units
  console.log('\n2. 推断基础类型的 units...');
  const typeUnitsMap = inferBaseTypeUnits(rawProperties);
  
  for (const bt of BASE_NUMBER_TYPES) {
    const units = typeUnitsMap.get(bt)!;
    console.log(`   ${bt}: [${[...units].sort().join(', ')}]`);
  }

  
  // 3. 校验每个属性
  console.log('\n3. 校验每个属性...');
  const validatedProperties: {
    name: string;
    numberTypes: BaseNumberType[];
    unitCategories: string[];
  }[] = [];
  
  let validCount = 0;
  let invalidCount = 0;
  
  for (const prop of rawProperties) {
    const { valid, expected, actual } = validateProperty(prop, typeUnitsMap);
    
    if (valid) {
      validCount++;
      const baseTypes = expandToBaseTypes(prop.numberTypes);
      const unitCategories = computeUnitCategories(baseTypes);
      validatedProperties.push({
        name: prop.name,
        numberTypes: baseTypes,
        unitCategories,
      });
    } else {
      invalidCount++;
      console.log(`\n❌ 校验失败: ${prop.name}`);
      console.log(`   原始 numberTypes: [${prop.numberTypes.join(', ')}]`);
      console.log(`   展开后: [${expandToBaseTypes(prop.numberTypes).join(', ')}]`);
      console.log(`   期望 units: [${[...expected].sort().join(', ')}]`);
      console.log(`   实际 units: [${[...actual].sort().join(', ')}]`);
      
      const missing = [...expected].filter(u => !actual.has(u));
      const extra = [...actual].filter(u => !expected.has(u));
      if (missing.length > 0) console.log(`   缺少: [${missing.join(', ')}]`);
      if (extra.length > 0) console.log(`   多余: [${extra.join(', ')}]`);
      
      // 报错中断
      console.log('\n❌ 校验失败，程序中断！');
      process.exit(1);
    }
  }
  
  console.log(`\n   校验通过: ${validCount}, 失败: ${invalidCount}`);
  
  // 4. 生成 css-number-types.json
  console.log('\n4. 生成 css-number-types.json...');
  
  const unitsObj: Record<string, string[]> = {};
  for (const bt of BASE_NUMBER_TYPES) {
    unitsObj[bt] = [...typeUnitsMap.get(bt)!].sort();
  }
  
  const output = {
    generatedAt: timestamp,
    csstreeVersion: version,
    totalProperties: validatedProperties.length,
    typeDescriptions: BASE_TYPE_DESCRIPTIONS,
    units: unitsObj,
    numberTypeToCategories: NUMBER_TYPE_TO_CATEGORIES,
    properties: validatedProperties,
  };
  
  fs.writeFileSync(
    path.join(outputDir, 'css-number-types.json'),
    JSON.stringify(output, null, 2)
  );
  
  console.log('   ✅ 生成完成！');
  console.log(`\n统计:`);
  console.log(`   - 基础类型: ${BASE_NUMBER_TYPES.length}`);
  console.log(`   - 属性数: ${validatedProperties.length}`);
}

// 从 extract-css-data-v3.ts 复制的 resolveUnitsFromTypes 函数
const UNITS_BY_TYPE: Record<string, string[]> = {
  'length': ['px', 'em', 'rem', 'vh', 'vw', 'vmin', 'vmax', 'cm', 'mm', 'in', 'pt', 'pc', 'ch', 'ex', 'cap', 'ic', 'Q', 'lh', 'rlh', 'vi', 'vb', 'svw', 'svh', 'lvw', 'lvh', 'dvw', 'dvh'],
  'angle': ['deg', 'grad', 'rad', 'turn'],
  'time': ['s', 'ms'],
  'frequency': ['Hz', 'kHz'],
  'resolution': ['dpi', 'dpcm', 'dppx', 'x'],
  'flex': ['fr'],
};

function resolveUnitsFromTypes(numberTypes: string[]): string[] {
  const units = new Set<string>();
  for (const type of numberTypes) {
    if (type === 'length-percentage') {
      UNITS_BY_TYPE['length']?.forEach(u => units.add(u));
      units.add('%');
    } else if (type === 'angle-percentage') {
      UNITS_BY_TYPE['angle']?.forEach(u => units.add(u));
      units.add('%');
    } else if (type === 'time-percentage') {
      UNITS_BY_TYPE['time']?.forEach(u => units.add(u));
      units.add('%');
    } else if (type === 'frequency-percentage') {
      UNITS_BY_TYPE['frequency']?.forEach(u => units.add(u));
      units.add('%');
    } else if (type === 'percentage') {
      units.add('%');
    } else if (type === 'number' || type === 'integer') {
      units.add('<number>');
    } else if (UNITS_BY_TYPE[type]) {
      UNITS_BY_TYPE[type].forEach(u => units.add(u));
    }
  }
  return [...units].sort();
}

main();
