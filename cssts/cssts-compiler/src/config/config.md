# CSSTS 配置说明

## 配置概述

CSSTS 配置用于控制 CSS 原子类的生成规则，包括属性、数值类型、单位、关键字、颜色、伪类和伪元素等。

## 配置结构

```typescript
interface CsstsConfig {
  // 属性配置
  properties?: CssPropertyConfigItem[];
  excludeProperties?: CssPropertyName[];

  // 数值类型配置
  numberTypes?: NumberTypeConfigItem[];
  excludeNumberTypes?: NumberTypeExcludeItem[];

  // 单位分类配置
  unitCategories?: UnitCategoryConfigItem[];
  excludeUnitCategories?: UnitCategoryExcludeItem[];

  // 单位配置
  units?: UnitConfigItem[];
  excludeUnits?: UnitExcludeItem[];

  // 关键字/颜色配置
  keywords?: CssKeywordName[];
  excludeKeywords?: CssKeywordName[];
  colors?: CssColorName[];
  excludeColors?: CssColorName[];

  // 其他配置
  customProperties?: Record<string, CustomPropertyValue>;
  progressiveRanges?: ProgressiveRange[];

  // 伪类/伪元素配置
  pseudoClasses?: CssPseudoClassName[];
  excludePseudoClasses?: CssPseudoClassName[];
  pseudoElements?: CssPseudoElementName[];
  excludePseudoElements?: CssPseudoElementName[];

  // 伪类/伪元素样式配置
  pseudoClassesConfig?: CssPseudoClassConfig;
  pseudoElementsConfig?: CssPseudoElementConfig;
}
```

## 白名单/黑名单机制

每个配置项都支持白名单和黑名单两种模式：

- **白名单**（如 `properties`）：配置后只生成指定项，忽略黑名单
- **黑名单**（如 `excludeProperties`）：仅当白名单为空时生效，排除指定项

### 排除配置 (exclude)

排除配置支持与白名单相同的跨级策略，但**不支持 CsstsStepConfig**（因为排除不需要配置数值）。

```typescript
// excludeProperties - 排除属性
excludeProperties: [
  'width',                                    // 字符串：排除属性
  { height: ['length'] },                     // 排除属性下的数值类型
  { height: { pixel: ['px'] } },              // 排除属性下分类的单位
]

// excludeNumberTypes - 排除数值类型
excludeNumberTypes: [
  'angle',                                    // 字符串：排除整个 numberType
  { length: ['pixel'] },                      // 排除 numberType 下的分类
  { length: { pixel: ['px'] } },              // 排除分类下的单位
  { pixel: ['px'] },                          // 跨级：排除分类下的单位
]

// excludeUnitCategories - 排除单位分类
excludeUnitCategories: [
  'resolution',                               // 字符串：排除整个分类
  { pixel: ['px'] },                          // 排除分类下的单位
]

// excludeUnits - 排除单位（只支持字符串数组）
excludeUnits: ['px', 'rem', 'em']
```

## 数值配置 (CsstsStepConfig)

用于配置数值生成规则：

```typescript
interface CsstsStepConfig {
  step?: number | ProgressiveRange[];  // 步长或渐进步长
  min?: number;                         // 最小值
  max?: number;                         // 最大值
  negative?: boolean;                   // 是否生成负值
  presets?: number[];                   // 预设值（与 step 互补）
}
```

### 渐进步长 (ProgressiveRange)

```typescript
interface ProgressiveRange {
  max: number;      // 范围最大值
  divisors: number[]; // 能被整除的数
}

// 示例：不同范围使用不同步长
progressiveRanges: [
  { max: 100, divisors: [1] },      // 0-100: 每个整数
  { max: 500, divisors: [5] },      // 100-500: 能被 5 整除
  { max: 1000, divisors: [10] },    // 500-1000: 能被 10 整除
]
```

## 层级配置

### 层级关系

```
Property → NumberType → Category → Unit → Config
   ↓          ↓           ↓         ↓
 height     length      pixel      px      { min: 0, max: 100 }
```

### 类型依赖关系

类型设计遵循**上层依赖下层**的原则，修改底层类型会自动影响上层：

**白名单配置（从下到上）：**
```
UnitConfigItem (最底层)
    ↑
CategoryValueConfig
    ↑
UnitCategoryConfigItem
    ↑
NumberTypeValueConfig
    ↑
NumberTypeConfigItem
    ↑
CssPropertyValueConfig
    ↑
CssPropertyConfigItem (最上层)
```

**排除配置（从下到上）：**
```
UnitExcludeItem = CssNumberUnitName (最底层)
    ↑
CategoryExcludeValueConfig = UnitExcludeItem[]
    ↑
UnitCategoryExcludeItem
    ↑
NumberTypeExcludeValueConfig
    ↑
NumberTypeExcludeItem
    ↑
CssPropertyExcludeValueConfig
    ↑
CssPropertyExcludeItem (最上层)
```

### 跨级配置规则

- **字符串形式**：只支持当前层级的名称（不支持跨级）
- **对象形式**：支持跨级配置，可以从任意层级开始

---

### properties 配置

**类型**: `CssPropertyConfigItem[]`

**支持的配置格式**:

| 格式 | 说明 | 示例 |
|-----|------|------|
| `CssPropertyName` | 字符串，只支持属性名称 | `'width'`, `'height'` |
| `Record<CssPropertyName, CssPropertyValueConfig>` | 属性配置对象 | `{ height: { numberTypes: ['length'] } }` |
| `Record<CssPropertyName, NumberTypeConfigItem[]>` | 属性下的数值类型配置数组 | `{ height: [{ px: { min: 0 } }] }` |
| `Record<CssNumberCategoryName, CategoryValueConfig>` | 跨级：分类配置 | `{ pixel: { px: { min: 0 } } }` |
| `Record<CssNumberUnitName, CsstsStepConfig>` | 跨级：单位配置 | `{ px: { min: 100 } }` |

**CssPropertyValueConfig 支持的字段**:
- `numberTypes?: CssNumberTypeName[]` - 指定数值类型
- `keywords?: CssKeywordName[]` - 指定关键字
- `colors?: CssColorName[]` - 指定颜色
- 以及任意跨级配置（单位名、分类名作为 key）

```typescript
properties: [
  // 字符串：只支持属性名称（不支持跨级）
  'width',
  'height',

  // 对象：支持多种配置方式
  { height: { numberTypes: ['length'] } },           // 指定数值类型
  { height: { keywords: ['auto'] } },                // 指定关键字
  { height: { colors: ['red'] } },                   // 指定颜色
  { height: { px: { min: 100 } } },                  // 跨级：直接配置单位
  { height: { pixel: { px: { min: 0 } } } },         // 配置分类和单位
  { height: { pixel: ['px', 'rem'] } },              // 指定分类下的单位列表

  // 跨级：直接用单位/分类名称作为 key
  { px: [
    'length',                                        // 启用 numberType
    { pixel: ['px', 'vw'] },                         // 指定分类下的单位列表
    { px: { min: 100 } },                            // 配置具体单位
  ]},
]
```

---

### numberTypes 配置

**类型**: `NumberTypeConfigItem[]`

**支持的配置格式**:

| 格式 | 说明 | 示例 |
|-----|------|------|
| `CssNumberTypeName` | 字符串，只支持 numberType 名称 | `'length'`, `'angle'` |
| `Record<CssNumberTypeName, NumberTypeValueConfig>` | numberType 配置对象 | `{ length: { pixel: { px: { min: 0 } } } }` |
| `Record<CssNumberCategoryName, CategoryValueConfig>` | 跨级：分类配置 | `{ pixel: { px: { min: 0 } } }` |
| `Record<CssNumberUnitName, CsstsStepConfig>` | 跨级：单位配置 | `{ px: { min: 100 } }` |

**NumberTypeValueConfig 支持的格式**:
- `CsstsStepConfig` - 直接配置整个数值类型
- `CssNumberCategoryName[]` - 指定支持的分类列表
- `Record<CssNumberCategoryName, CategoryValueConfig>` - 配置多个分类
- `Record<CssNumberUnitName, CsstsStepConfig>` - 跨级配置单位

```typescript
numberTypes: [
  // 字符串：只支持 numberType 名称（不支持跨级）
  'length',
  'angle',

  // 对象：支持多种配置方式
  { length: { presets: [0, 100] } },                 // 直接配置整个 numberType
  { length: ['pixel', 'percentage'] },              // 指定支持的分类列表
  { length: { pixel: { px: { min: 0 } } } },        // 完整路径
  { length: { pixel: ['px', 'rem'] } },             // 指定分类下的单位列表
  { length: { px: { min: 0 } } },                   // 跨过 category 直接配置 unit

  // 跨级：从 category 或 unit 开始（字符串不支持）
  { pixel: { px: { min: 0 } } },                    // 从 category 开始
  { pixel: ['px', 'rem'] },                         // 指定 category 下的单位列表
  { px: { min: 100 } },                             // 直接配置 unit
]
```

---

### unitCategories 配置

**类型**: `UnitCategoryConfigItem[]`

**支持的配置格式**:

| 格式 | 说明 | 示例 |
|-----|------|------|
| `CssNumberCategoryName` | 字符串，只支持 category 名称 | `'pixel'`, `'percentage'` |
| `Record<CssNumberCategoryName, CategoryValueConfig>` | category 配置对象 | `{ pixel: { px: { min: 0 } } }` |
| `Record<CssNumberUnitName, CsstsStepConfig>` | 跨级：单位配置 | `{ px: { min: 100 } }` |

**CategoryValueConfig 支持的格式**:
- `CsstsStepConfig` - 直接配置整个分类
- `CssNumberUnitName[]` - 指定支持的单位列表
- `Record<CssNumberUnitName, CsstsStepConfig>` - 配置具体单位

```typescript
unitCategories: [
  // 字符串：只支持 category 名称（不支持跨级）
  'pixel',
  'percentage',
  // 'px',  // ❌ 错误！字符串不支持跨级

  // 对象：支持多种配置方式
  { pixel: { presets: [0, 100] } },                 // 直接配置整个 category
  { pixel: ['px', 'rem'] },                         // 指定支持的单位列表
  { pixel: { px: { min: 0 } } },                    // 配置具体单位

  // 跨级：直接配置 unit（只有对象形式支持）
  { px: { min: 100 } },
  { rem: { presets: [0, 0.5, 1, 1.5, 2] } },
]
```

---

### units 配置

**类型**: `UnitConfigItem[]`

**支持的配置格式**:

| 格式 | 说明 | 示例 |
|-----|------|------|
| `CssNumberUnitName` | 字符串，简单启用单位 | `'px'`, `'rem'` |
| `Record<CssNumberUnitName, CsstsStepConfig>` | 单位配置对象 | `{ px: { min: 0, max: 100 } }` |

```typescript
units: [
  // 字符串：简单启用
  'px',
  'rem',

  // 对象：带配置
  { px: { min: 0, max: 100, step: 4 } },
  { rem: { presets: [0, 0.5, 1, 1.5, 2] } },
  { percent: { presets: [0, 25, 50, 75, 100] } },
]
```

---

### 配置格式总结

| 配置项 | 字符串支持 | 对象跨级支持 |
|-------|-----------|-------------|
| `properties` | 只支持 `CssPropertyName` | 支持 property → category → unit |
| `numberTypes` | 只支持 `CssNumberTypeName` | 支持 numberType → category → unit |
| `unitCategories` | 只支持 `CssNumberCategoryName` | 支持 category → unit |
| `units` | 只支持 `CssNumberUnitName` | 无跨级（已是最底层） |

---

## 排除配置详解

排除配置与白名单配置结构对应，但**不支持 CsstsStepConfig**（因为排除不需要配置数值）。

### excludeUnits

**类型**: `UnitExcludeItem[]` = `CssNumberUnitName[]`

最底层，只支持字符串数组。

```typescript
excludeUnits: ['px', 'rem', 'em']
```

### excludeUnitCategories

**类型**: `UnitCategoryExcludeItem[]`

**支持的配置格式**:

| 格式 | 说明 | 示例 |
|-----|------|------|
| `CssNumberCategoryName` | 字符串，排除整个分类 | `'pixel'` |
| `Record<CssNumberCategoryName, CategoryExcludeValueConfig>` | 排除分类下的单位 | `{ pixel: ['px'] }` |

```typescript
excludeUnitCategories: [
  'resolution',                    // 排除整个分类
  { pixel: ['px', 'rem'] },        // 排除分类下的指定单位
]
```

### excludeNumberTypes

**类型**: `NumberTypeExcludeItem[]`

**支持的配置格式**:

| 格式 | 说明 | 示例 |
|-----|------|------|
| `CssNumberTypeName` | 字符串，排除整个 numberType | `'angle'` |
| `Record<CssNumberTypeName, NumberTypeExcludeValueConfig>` | 排除 numberType 下的分类或单位 | `{ length: ['pixel'] }` |
| `Record<CssNumberCategoryName, CategoryExcludeValueConfig>` | 跨级：排除分类下的单位 | `{ pixel: ['px'] }` |

```typescript
excludeNumberTypes: [
  'angle',                                    // 排除整个 numberType
  { length: ['pixel'] },                      // 排除 numberType 下的分类
  { length: { pixel: ['px'] } },              // 排除分类下的单位
  { pixel: ['px'] },                          // 跨级：排除分类下的单位
]
```

### excludeProperties

**类型**: `CssPropertyExcludeItem[]`

**支持的配置格式**:

| 格式 | 说明 | 示例 |
|-----|------|------|
| `CssPropertyName` | 字符串，排除整个属性 | `'width'` |
| `Record<CssPropertyName, CssPropertyExcludeValueConfig>` | 排除属性下的配置 | `{ height: { numberTypes: ['length'] } }` |
| `Record<CssNumberCategoryName, CategoryExcludeValueConfig>` | 跨级：排除分类下的单位 | `{ pixel: ['px'] }` |

```typescript
excludeProperties: [
  'width',                                    // 排除整个属性
  { height: { numberTypes: ['length'] } },    // 排除属性下的数值类型
  { height: { pixel: ['px'] } },              // 排除属性下分类的单位
  { pixel: ['px'] },                          // 跨级：排除分类下的单位
]
```

### 排除配置格式总结

| 配置项 | 字符串支持 | 对象跨级支持 |
|-------|-----------|-------------|
| `excludeProperties` | 只支持 `CssPropertyName` | 支持 property → category |
| `excludeNumberTypes` | 只支持 `CssNumberTypeName` | 支持 numberType → category |
| `excludeUnitCategories` | 只支持 `CssNumberCategoryName` | 支持 category（配置要排除的单位） |
| `excludeUnits` | 只支持 `CssNumberUnitName` | 无跨级（已是最底层） |

## 单位别名

部分单位提供别名，方便用户输入：

| 用户输入 | 实际单位 |
|---------|---------|
| `''`    | `unitless` |
| `'%'`   | `percent` |

运行时会自动转换，使用 `resolveUnitAlias()` 函数。

## 配置示例

### 基础配置

```typescript
import { createConfig } from 'cssts-compiler';

const config = createConfig({
  properties: ['width', 'height', 'margin', 'padding'],
  unitCategories: ['pixel', 'percentage'],
});
```

### 属性级别配置

```typescript
const config = createConfig({
  properties: [
    'width',
    { height: { px: { min: 0, max: 500, step: 10 } } },
    { margin: { numberTypes: ['length'], keywords: ['auto'] } },
  ],
});
```

### 自定义数值范围

```typescript
const config = createConfig({
  unitCategories: [
    { pixel: { px: { min: 0, max: 100, step: 4 } } },
    { percentage: { presets: [0, 25, 50, 75, 100] } },
  ],
});
```

### 混合配置

```typescript
const config = createConfig({
  properties: [
    { width: { px: { step: 4, presets: [1, 2, 3] } } },  // step + presets 互补
    { height: { percent: { presets: [0, 50, 100] } } },
  ],
  excludeKeywords: ['inherit', 'initial'],
  pseudoClasses: ['hover', 'focus', 'active'],
});
```

## 相关文件

- `csstsConfig.d.ts` - 配置类型定义
- `CsstsDefaultConfig.ts` - 默认配置
- `units.ts` - 单位常量和别名映射
- `numberTypeCategory.ts` - 数值类型和分类映射
