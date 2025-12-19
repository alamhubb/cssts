# CSS 生成脚本

此目录包含从 csstree 生成 CSS 数据和配置的脚本。这是唯一依赖 csstree 的地方，所有其他代码都从生成的数据中获取信息。

## 脚本概览

### 1. generator-data.ts

**阶段1：数据生成**

从 csstree 提取所有 CSS 数据并生成单个合并文件。

**功能**：
- 遍历 csstree 中的所有 CSS 属性，提取 keywords 和 numberTypes
- 提取 CSS 命名颜色列表
- 提取 CSS 单位列表
- 提取伪类/伪元素列表
- 生成单个合并的数据文件

**输出**：
- `src/data/cssts-data.ts` - 所有 CSS 数据（不打包）

**运行方式**：
```bash
npx tsx generator/generator-data.ts
```

**输出示例**：
```typescript
// 属性数据
export const PROPERTY_DATA: PropertyInfo[] = [
  {
    name: 'width',
    numberTypes: ['length', 'percentage'],
  },
  {
    name: 'display',
    keywords: ['block', 'inline', 'flex', 'grid', ...],
  },
];

// 颜色数据
export const NAMED_COLORS = ['aliceblue', 'antiquewhite', ...] as const;

// 单位数据
export const ALL_UNITS = ['px', 'em', 'rem', '%', ...] as const;

// 伪类/伪元素数据
export const PSEUDO_CLASSES = ['hover', 'active', 'focus', ...] as const;
export const PSEUDO_ELEMENTS = ['before', 'after', ...] as const;
```

### 2. generator-config-type.ts

**阶段2：配置类型提示生成**

从 `src/data/cssts-data.ts` 生成用户配置时的类型提示文件。

**功能**：
- 读取属性数据
- 生成配置类型定义
- 提供 IDE 智能提示

**输出**：
- `src/config/colors.ts` - 颜色配置类型
- `src/config/keywords.ts` - 关键词配置类型
- `src/config/units.ts` - 单位配置类型
- `src/config/pseudo.ts` - 伪类/伪元素配置类型
- `src/config/property-config.ts` - 属性配置类型
- `src/config/index.ts` - 配置模块导出

**运行方式**：
```bash
npx tsx generator/generator-config-type.ts
```

**前置条件**：
必须先运行 `generator-data.ts` 生成 `src/data/cssts-data.ts`

## 执行顺序

```
1. npx tsx generator/generator-data.ts
   ↓
   生成 src/data/cssts-data.ts
   ↓
2. npx tsx generator/generator-config-type.ts
   ↓
   生成 src/config/ 下的所有类型定义
```

## NumberTypes 处理

### 两种 NumberTypes 数据的区别

项目中有两种不同用途的 numberTypes 数据：

#### 1. 属性的 NumberTypes（`propertyNumberTypes.ts`）

这是从 csstree 中提取的**属性可以接受的数值类型**：

```typescript
export const ALL_NUMBER_TYPES = [
  'angle', 'decibel', 'flex', 'frequency', 'integer', 'length', 
  'number', 'percentage', 'ratio', 'resolution', 'semitones', 'time'
] as const;

// 例如
export const WIDTH_NUMBER_TYPES = ['length', 'percentage'] as const;
export const ANIMATION_DELAY_NUMBER_TYPES = ['time'] as const;
```

**用途**：
- 类型定义和验证
- 确定属性支持哪些数值类型
- 生成 TypeScript 类型提示

#### 2. NumberTypes 到单位分类的映射（`numberMapping.json`）

这是一个**配置文件**，定义每个 numberType 对应的单位分类：

```json
{
  "numberTypes": {
    "length": ["pixel", "fontRelative", "physical", "percentage"],
    "angle": ["angle"],
    "time": ["time"],
    "number": ["unitless"],
    "dimension": ["pixel", "fontRelative", "physical", "angle", "time", "frequency", "resolution", "flex", "percentage"]
  },
  "categories": {
    "pixel": ["px"],
    "fontRelative": ["em", "rem", "ch", "ex", "cap", "ic", "lh", "rlh"],
    ...
  }
}
```

**用途**：
- 原子类生成时查找单位
- 定义单位分类和具体单位的映射关系
- 支持自定义单位配置

### 被认可的 NumberTypes

脚本只提取以下被认可的 numberTypes：

```typescript
const ACCEPTED_NUMBER_TYPES = new Set([
  // 从 units 中来的
  'angle', 'decibel', 'flex', 'frequency', 'length', 'resolution', 'semitones', 'time',
  // 纯数值类型
  'number', 'integer', 'percentage', 'ratio',
]);
```

**注意**：`dimension` 虽然在 csstree 中定义，但在实际属性中没有被使用，因此被排除。

### 为什么排除 `zero`？

虽然 csstree 中定义了 `zero` 类型，但它被排除的原因：

1. **语义问题**：`zero` 在 csstree 中是一个特殊的、受限的类型，只在特定属性中被明确标记（如 `transform`）
2. **通用性**：在 CSS 中，`0` 可以用于任何接受数值的属性（如 `height: 0`、`padding: 0`、`margin: 0`），不需要单位
3. **实现简化**：`0` 通常可以用 `number` 类型表示，不需要单独的 `zero` 类型
4. **csstree 限制**：csstree 中的 `zero` 定义不够通用，无法准确反映 CSS 的实际行为

**结论**：在生成 numberTypes 时，我们不包含 `zero`，因为它不是一个通用的、可靠的数值类型分类。同时，`numberMapping.json` 中也不包含 `zero` 的映射，保持一致性。

## 联合类型处理

### 设计决策：展开联合类型

脚本会将 CSS 中的联合类型（如 `length-percentage`）展开成单个类型的数组。

**示例**：
```typescript
// csstree 中的原始定义
width: <length-percentage>

// 生成的数据
{
  name: 'width',
  numberTypes: ['length', 'percentage']  // 联合类型被展开
}
```

### 为什么这样做？

1. **原子类生成的实际行为**：在 `atom-generator.ts` 中，生成器通过 `NUMBER_TYPE_UNITS` 映射表查找每个 numberType 对应的单位列表。联合类型（如 `'length-percentage'`）在映射表中不存在，无法被查找。

2. **等价性**：展开后的 `['length', 'percentage']` 和原始的 `'length-percentage'` 在生成原子类时产生**完全相同的结果**：
   - 都会生成 length 类型的所有单位（px, em, rem 等）
   - 都会生成 percentage 类型的单位（%）

3. **简化处理**：展开联合类型使得生成器逻辑更简单，不需要特殊处理联合类型的情况。

### 映射表参考

```typescript
const UNION_TYPE_MAP: Record<string, string[]> = {
  'length-percentage': ['length', 'percentage'],
  'angle-percentage': ['angle', 'percentage'],
  'time-percentage': ['time', 'percentage'],
  'frequency-percentage': ['frequency', 'percentage'],
};
```

## 架构设计

### 依赖关系

```
generator-data.ts (依赖 csstree)
    ↓
src/data/cssts-data.ts (合并的数据文件)
    ↓
generator-config-type.ts
    ↓
src/config/ (类型定义)
    ↓
src/ 中的其他代码（不依赖 csstree）
```

### 关键原则

1. **单一依赖点**：只有 `generator/` 目录中的脚本依赖 csstree
2. **数据驱动**：`src/` 中的所有代码从 `src/data/` 和 `src/custom/` 获取数据
3. **自动生成**：配置文件由脚本自动生成，不应手动修改
4. **分离关注**：
   - `generator-data.ts` - 只负责数据提取
   - `generator-config-type.ts` - 只负责类型生成

## 数据文件结构

`src/data/cssts-data.ts` 是唯一的数据文件，包含以下导出：

```typescript
// 属性数据
export interface PropertyInfo { ... }
export const PROPERTY_DATA: PropertyInfo[]

// 颜色数据
export const NAMED_COLORS: readonly string[]
export type NamedColorValue

// 单位数据
export const ALL_UNITS: readonly string[]
export type UnitType

// 伪类/伪元素数据
export const PSEUDO_CLASSES: readonly string[]
export type PseudoClassName
export const PSEUDO_ELEMENTS: readonly string[]
export type PseudoElementName
```

## 数据提取方式

所有数据都直接从 csstree 提取：

- **属性数据**：从 `csstree.lexer.properties` 遍历每个属性的语法定义
- **颜色数据**：从 `csstree.lexer.types['color']` 的语法定义中提取所有颜色关键字
- **单位数据**：从 `csstree.lexer.units` 对象中收集所有单位
- **伪类/伪元素**：
  - 从 `csstree.lexer.types['legacy-pseudo-element-selector']` 中提取伪元素
  - 从所有类型定义中提取伪类/伪元素关键字
  - 补充 W3C CSS 规范中定义的标准伪类/伪元素列表
    - 伪类来源：[W3C CSS Selectors Level 4](https://www.w3.org/TR/selectors-4/)
    - 伪元素来源：[W3C CSS Pseudo-Elements Module Level 1](https://www.w3.org/TR/css-pseudo-elements-1/)
  - 注：csstree 中的伪类定义使用 `ident-token`，允许任何标识符，因此需要使用标准列表确保完整性

## 生成统计

最后一次生成的统计信息：
- 总属性数：521
- 有 keywords 的属性：384
- 有 numberTypes 的属性：236
- 同时有两者的属性：174
- 命名颜色数：236
- CSS 单位数：65
- 伪类数：60
- 伪元素数：13

## 使用场景

这些生成的数据和类型用于：
1. 提供用户配置时的 IDE 智能提示
2. 验证属性是否支持某种类型的值
3. 为原子类生成器提供属性元数据
4. 提供类型安全的属性和关键字定义
