# CSSTS 配置系统

> 灵活的分层配置系统，支持属性、数值类型、单位分类、单位、关键字、颜色、伪类等多维度定制

## 快速开始

```typescript
import { CsstsConfig } from 'cssts-compiler'

// 使用默认配置
const config = new CsstsConfig()

// 自定义配置
const config = new CsstsConfig({
  includeProperties: ['width', 'height', 'margin', 'padding'],
  includeUnitCategories: ['pixel', 'percentage'],
  excludeNumberTypes: ['angle', 'frequency'],
})
```

## 配置架构

CSSTS 配置采用**分层白名单/黑名单**模式，支持**跨级别配置**和**混合数组格式**：

```
属性 (Properties)
  ↓
数值类型 (NumberTypes)
  ↓
单位分类 (UnitCategories)
  ↓
单位 (Units)
  ↓
数值 (Values)
```

## 配置层级详解

### 1. 属性配置 (Properties)

控制生成哪些 CSS 属性的原子类。

```typescript
// 白名单：只生成指定属性
includeProperties: ['width', 'height', 'margin', 'padding']

// 黑名单：排除指定属性（默认排除 Tailwind 中 98% 用不到的属性）
excludeProperties: ['all', 'appearance', 'backfaceVisibility']
```

**优先级**：`includeProperties` > `excludeProperties`

---

### 2. 数值类型配置 (NumberTypes)

控制支持哪些数值类型（length、angle、time 等）。

#### Include 配置（支持嵌套配置）

```typescript
includeNumberTypes: [
  'length',                                    // 启用整个 length 类型
  { time: ['ms', 's'] },                       // 启用 time 类型，但只用 ms 和 s
  { length: { pixel: ['px', 'em'] } }          // 启用 length 中 pixel 分类的 px 和 em
]
```

#### Exclude 配置（只排除名字）

```typescript
excludeNumberTypes: [
  'angle',                                     // 排除整个 angle 类型
  { time: ['ms', 's'] },                       // 排除 time 类型的 ms 和 s
  { length: { pixel: ['px'] } }                // 排除 length 中 pixel 分类的 px
]
```

**支持的数值类型**：
- `length` - 长度（px、em、rem、%、vw 等）
- `angle` - 角度（deg、grad、rad、turn）
- `time` - 时间（s、ms）
- `frequency` - 频率（Hz、kHz）
- `percentage` - 百分比（%）
- `number` / `integer` - 数值（opacity、z-index 等）
- `resolution` - 分辨率（dpi、dpcm、dppx）
- `flex` - 弹性（fr）

---

### 3. 单位分类配置 (UnitCategories)

控制支持哪些单位分类，以及每个分类的数值范围。

#### Include 配置（支持嵌套配置 + 步长）

```typescript
includeUnitCategories: [
  'pixel',                                     // 启用 pixel 分类，使用默认配置
  { percentage: { '%': { presets: [0, 25, 50, 75, 100] } } },  // 自定义百分比值
  { fontRelative: { em: { step: 0.25, max: 10 } } }            // 自定义 em 的步长
]
```

#### Exclude 配置（只排除名字）

```typescript
excludeUnitCategories: [
  'resolution',                                // 排除整个 resolution 分类
  { pixel: ['px'] }                            // 排除 pixel 分类的 px 单位
]
```

**系统级别默认排除**（低频使用）：
```typescript
SYSTEM_DEFAULT_EXCLUDED_UNIT_CATEGORIES = [
  'resolution',  // dpi, dpcm, dppx, x - 98% 用不到
  'physical',    // pt, pc, in, cm, mm, Q - 95% 用不到
  'flex',        // fr - Grid 用户较少
]
```

**支持的单位分类**：
- `pixel` - 像素单位（px）
- `percentage` - 百分比和视口单位（%、vw、vh、vmin、vmax 等）
- `fontRelative` - 相对字体单位（em、rem、ch、ex、cap、ic、lh、rlh）
- `physical` - 物理长度单位（cm、mm、in、pt、pc、Q）
- `angle` - 角度单位（deg、grad、rad、turn）
- `time` - 时间单位（s、ms）
- `frequency` - 频率单位（Hz、kHz）
- `resolution` - 分辨率单位（dpi、dpcm、dppx、x）
- `flex` - 弹性单位（fr）
- `unitless` - 无单位数值（opacity、z-index、line-height 等）

---

### 4. 单位配置 (Units)

控制支持哪些单位，以及每个单位的数值范围。

#### Include 配置（支持步长配置）

```typescript
includeUnits: [
  'px',                                        // 启用 px，使用默认配置
  'em',                                        // 启用 em，使用默认配置
  { px: { step: 4, max: 500 } },              // 自定义 px 的步长和最大值
  { em: { presets: [0.5, 1, 1.5, 2] } }       // 自定义 em 的预设值
]
```

#### Exclude 配置（只排除名字）

```typescript
excludeUnits: [
  'px',
  'em',
  { dpi: {} }
]
```

---

### 5. 关键字配置 (Keywords)

控制支持哪些 CSS 关键字值。

```typescript
// 白名单
includeKeywords: ['auto', 'inherit', 'initial', 'unset']

// 黑名单
excludeKeywords: ['revert', 'revert-layer']
```

---

### 6. 颜色配置 (Colors)

控制支持哪些颜色值。

```typescript
// 白名单
includeColors: ['red', 'blue', 'green', '#fff', 'rgb(255, 0, 0)']

// 黑名单
excludeColors: ['transparent']
```

---

### 7. 伪类/伪元素配置 (Pseudo)

控制支持哪些伪类和伪元素。

```typescript
// 伪类
includePseudoClasses: ['hover', 'active', 'focus', 'disabled']
excludePseudoClasses: ['visited', 'target']

// 伪元素
includePseudoElements: ['before', 'after', 'first-line']
excludePseudoElements: ['selection']

// 伪类样式配置（当变量名包含伪类后缀时自动添加的样式）
pseudoClassStyles: {
  hover: { opacity: 0.9 },
  active: { opacity: 0.6 },
  disabled: { opacity: 0.5, cursor: 'not-allowed' }
}
```

---

## 配置优先级

### 白名单 vs 黑名单

```
if (includeList && includeList.length > 0) {
  // 使用白名单（只包含指定的项）
  return includeList.includes(value)
} else {
  // 使用黑名单（排除指定的项）
  return !excludeList.includes(value)
}
```

**规则**：
1. 如果配置了 `include*`，则只生成这些项，忽略 `exclude*`
2. 如果没有配置 `include*`，则使用 `exclude*` 排除不需要的项
3. 系统级别默认排除（如 `SYSTEM_DEFAULT_EXCLUDED_UNIT_CATEGORIES`）只在 `excludeUnitCategories` 为空时生效

---

## 高级用法

### 跨级别配置

在 `includeNumberTypes` 中直接配置单位，跳过 unitCategory 层级：

```typescript
includeNumberTypes: [
  { length: { px: { step: 4 } } }  // 完整三层
  { length: { em: { step: 0.25 } } }  // 跨越 unitCategory 层级
]
```

### 混合数组格式

在同一个数组中混合字符串和对象：

```typescript
includeUnitCategories: [
  'pixel',                                     // 字符串：使用默认配置
  { percentage: { '%': { presets: [...] } } } // 对象：自定义配置
]
```

### 分层配置示例

```typescript
const config = new CsstsConfig({
  // 只生成常用属性
  includeProperties: [
    'width', 'height', 'margin', 'padding',
    'display', 'position', 'top', 'left', 'right', 'bottom',
    'backgroundColor', 'color', 'fontSize'
  ],

  // 只支持 length 和 percentage 数值类型
  includeNumberTypes: [
    'length',
    'percentage'
  ],

  // 只支持 pixel 和 percentage 单位分类
  includeUnitCategories: [
    'pixel',
    'percentage'
  ],

  // 自定义单位配置
  includeUnits: [
    'px',
    { em: { step: 0.25, max: 10 } }
  ],

  // 排除某些关键字
  excludeKeywords: ['inherit', 'initial'],

  // 支持的伪类
  includePseudoClasses: ['hover', 'active', 'focus', 'disabled']
})
```

---

## 数值生成策略

### 渐进步长 (Progressive Ranges)

系统默认使用渐进步长策略，根据数值范围自动调整步长：

```typescript
DEFAULT_PROGRESSIVE_RANGES = [
  { max: 100, divisors: [1] },         // 0-100: 每个整数
  { max: 200, divisors: [2, 5] },      // 100-200: 能被 2 或 5 整除
  { max: 500, divisors: [5] },         // 200-500: 能被 5 整除
  { max: 1000, divisors: [10] },       // 500-1000: 能被 10 整除
  // ...
]
```

### 预设值 (Presets)

使用预设值精确控制生成的数值：

```typescript
DEFAULT_UNIT_CATEGORY_CONFIGS = {
  pixel: {
    negative: true,
    presets: [0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 20, 24, 28, 32, ...]
  },
  percentage: {
    negative: false,
    presets: [0, 10, 20, 25, 30, 33.333333, 40, 50, 60, 66.666667, 70, 75, 80, 90, 100]
  }
}
```

---

## 配置类型参考

### CsstsConfig

主配置类，包含所有配置选项。

```typescript
class CsstsConfig {
  // 属性配置
  includeProperties?: CssPropertyCamelName[]
  excludeProperties: CssPropertyCamelName[]

  // 数值类型配置
  includeNumberTypes?: NumberTypeConfigItem<NumberTypeName>[]
  excludeNumberTypes: NumberTypeExcludeItem<NumberTypeName>[]

  // 单位分类配置
  includeUnitCategories?: UnitCategoryConfigItem<UnitCategoryName>[]
  excludeUnitCategories: UnitCategoryExcludeItem<UnitCategoryName>[]

  // 单位配置
  includeUnits?: UnitConfigItem<UnitType>[]
  excludeUnits: UnitExcludeItem<UnitType>[]

  // 关键字/颜色配置
  includeKeywords?: KeywordValue[]
  excludeKeywords: KeywordValue[]
  includeColors?: AllColorValue[]
  excludeColors: AllColorValue[]

  // 伪类/伪元素配置
  includePseudoClasses?: PseudoClassName[]
  excludePseudoClasses: PseudoClassName[]
  includePseudoElements?: PseudoElementName[]
  excludePseudoElements: PseudoElementName[]

  // 其他配置
  customProperties: Record<string, CustomPropertyValue>
  progressiveRanges: ProgressiveRange[]
  properties: CssPropertyConfigMap
  pseudoClassStyles: PseudoClassStylesConfig
  pseudoElementStyles: PseudoElementStylesConfig
}
```

---

## 常见场景

### 场景 1：最小化配置（只生成常用的）

```typescript
const config = new CsstsConfig({
  includeProperties: ['width', 'height', 'margin', 'padding', 'display'],
  includeUnitCategories: ['pixel', 'percentage'],
  includeUnits: ['px', '%'],
})
```

### 场景 2：排除低频使用的

```typescript
const config = new CsstsConfig({
  excludeNumberTypes: ['angle', 'frequency', 'resolution'],
  excludeUnitCategories: ['physical', 'flex'],
})
```

### 场景 3：自定义数值范围

```typescript
const config = new CsstsConfig({
  includeUnits: [
    { px: { step: 4, max: 256 } },      // px: 0, 4, 8, 12, ..., 256
    { em: { presets: [0.5, 1, 1.5, 2] } } // em: 0.5, 1, 1.5, 2
  ]
})
```

### 场景 4：跨级别配置

```typescript
const config = new CsstsConfig({
  includeNumberTypes: [
    'length',
    { time: ['ms', 's'] },                    // 只用 time 的 ms 和 s
    { length: { pixel: ['px'] } }             // 只用 length 中 pixel 的 px
  ]
})
```

---

## 最佳实践

1. **从系统默认开始** - 系统已经排除了 98% 用不到的项
2. **优先使用白名单** - 明确指定需要的项比排除不需要的更清晰
3. **分层配置** - 在不同层级精确控制，避免过度配置
4. **使用预设值** - 对于常用的数值范围，使用预设值而不是步长
5. **测试生成结果** - 运行生成器验证配置是否符合预期

---

## 相关文件

- `src/cssts-config.ts` - 主配置类
- `src/config/value-config.ts` - 配置类型定义
- `src/utils/config-utils.ts` - 配置工具函数
- `src/generator-dts/atom-generator.ts` - 原子类生成器

