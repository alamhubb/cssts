# CSSTS 配置说明

## 配置层级结构

CSSTS 采用三层精准类型约束：

```
Property → NumberCategory → NumberUnit
         → ColorType → Color
         → Keyword
```

## 步长配置 (CssStepConfig)

```typescript
interface CssStepConfig {
  step?: number | number[] | CssProgressiveRange[];  // 步长配置
  min?: number;                                       // 最小值
  max?: number;                                       // 最大值
  negative?: boolean;                                 // 是否支持负值
  presets?: number[];                                 // 预设值
}
```

### step 支持三种格式

```typescript
// 1. 单一步长
step: 1

// 2. 多个步长值（生成能被这些值整除的数）
step: [1, 5, 10]  // 生成 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, ...

// 3. 渐进步长范围（不同范围使用不同步长）
step: [
  { max: 10, divisors: [1] },        // 0-10: 步长 1
  { max: 100, divisors: [5, 10] },   // 10-100: 步长 5, 10
  { max: 1000, divisors: [50, 100] } // 100-1000: 步长 50, 100
]
```

### 渐进步长范围 (progressiveRanges)

全局渐进步长配置，根据数值范围使用不同的步长：

```typescript
progressiveRanges: [
  { max: 10, divisors: [1] },        // 0-10: 步长 1
  { max: 100, divisors: [5, 10] },   // 10-100: 步长 5, 10
  { max: 1000, divisors: [50, 100] } // 100-1000: 步长 50, 100
]
```

## 配置字段

### 属性列表 (properties / excludeProperties)

**用途**：控制启用/禁用哪些 CSS 属性，只接受属性名数组。

```typescript
// 启用的属性（属性名列表）
properties: [
  'width',
  'height', 
  'padding',
  'margin',
  'display',
  'flex',
  // ...
],

// 排除的属性（属性名列表）
excludeProperties: [
  'azimuth',
  'voiceFamily',
  // ...
]
```

### 属性详细配置 (propertiesConfig)

**用途**：配置特定属性的详细信息，如数值范围、步长、预设值等。与 `properties` 分离，职责清晰。

```typescript
propertiesConfig: [
  // z-index: 配置无单位数值的范围
  {
    zIndex: {
      unitless: {
        negative: true,
        max: 10000,
        presets: [-1, 999, 9999],
      }
    }
  },

  // opacity: 0-1 范围，步长 0.1
  {
    opacity: {
      unitless: {
        negative: false,
        min: 0,
        max: 1,
        step: 0.1,
      }
    }
  },

  // border-radius: 配置多个 category
  {
    borderRadius: {
      pixel: {
        negative: false,
        min: 0,
        max: 100,
        step: 1
      },
      percentage: {
        negative: false,
        min: 0,
        max: 50,
        step: 5
      }
    }
  },

  // rotate: 角度配置
  {
    rotate: {
      angle: {
        negative: true,
        min: -360,
        max: 360,
        step: 1,
        presets: [0, 45, 90, 180],
      }
    }
  }
]
```

**注意**：`propertiesConfig` 只需要配置需要自定义的属性，未配置的属性使用全局默认值。

### 数值类别配置 (numberCategories / excludeNumberCategories / numberCategoriesConfig)

数值类别及其包含的单位：

| Category | Units |
|----------|-------|
| pixel | px |
| fontRelative | em, rem, ch, ex, cap, ic, lh, rlh |
| physical | cm, mm, in, pt, pc, Q |
| percentage | %, vw, vh, vmin, vmax, svw, svh, lvw, lvh, dvw, dvh, vi, vb |
| angle | deg, grad, rad, turn |
| time | s, ms |
| frequency | Hz, kHz |
| resolution | dpi, dpcm, dppx, x |
| flex | fr |
| unitless | (无单位) |

```typescript
// 支持的数值类别（类别名列表）
numberCategories: [
  'pixel',
  'fontRelative',
  'percentage',
  'angle',
  'time',
  'unitless',
  'flex',
],

// 排除的数值类别（类别名列表）
excludeNumberCategories: [
  'physical',    // 排除物理单位
  'frequency',   // 排除频率单位
  'resolution',  // 排除分辨率单位
],

// 数值类别详细配置
numberCategoriesConfig: [
  {
    pixel: { min: 0, max: 1000, step: 1, negative: true },
  },
  {
    fontRelative: { min: 0, max: 20, step: 0.125 },
  },
  {
    percentage: { min: 0, max: 100, step: 1, presets: [33.33, 66.67] },
  }
]
```

### 数值单位配置 (numberUnits / excludeUnits / numberUnitsConfig)

直接配置具体单位：

```typescript
// 支持的单位（单位名列表）
numberUnits: ['px', 'em', 'rem', 'vw', 'vh'],

// 排除的单位（单位名列表）
excludeUnits: ['cm', 'mm', 'in', 'pt', 'pc'],

// 单位详细配置
numberUnitsConfig: [
  {
    px: { min: 0, max: 1000, step: 1 },
  },
  {
    vw: { min: 0, max: 100, step: 5 },
  }
]
```

### 颜色类型配置 (colorTypes / excludeColorTypes / colorTypesConfig)

颜色类型包括：`namedColor`, `systemColor`, `deprecatedSystemColor`, `nonStandardColor`

```typescript
// 支持的颜色类型（类型名列表）
colorTypes: ['namedColor', 'systemColor'],

// 排除的颜色类型（类型名列表）
excludeColorTypes: ['deprecatedSystemColor', 'nonStandardColor'],

// 颜色类型详细配置
colorTypesConfig: [
  {
    namedColor: ['red', 'blue', 'green'],
  },
  {
    systemColor: ['AccentColor', 'ButtonFace'],
  }
]
```

### 颜色配置 (colors / excludeColors)

直接配置具体颜色：

```typescript
colors: ['red', 'blue', 'transparent'],
excludeColors: ['rebeccapurple']
```

### 关键字配置 (keywords / excludeKeywords)

```typescript
keywords: ['auto', 'none', 'inherit'],
excludeKeywords: ['initial', 'unset']
```

### 伪类/伪元素配置

```typescript
pseudoClasses: ['hover', 'focus', 'active'],
excludePseudoClasses: ['visited'],

pseudoElements: ['before', 'after'],
excludePseudoElements: ['marker'],

// 伪类/伪元素样式配置
pseudoClassesConfig: {
  hover: {
    color: 'red',
    backgroundColor: 'blue'
  }
},
pseudoElementsConfig: {
  before: {
    content: '""'
  }
}
```

### 其他配置

```typescript
// 自定义属性
customProperties: {
  '--primary-color': '#007bff',
  '--spacing': {
    sm: '8px',
    md: '16px',
    lg: '24px'
  }
}
```

## 配置职责分离

所有配置都遵循"列表 + 详情"分离的模式：

| 列表配置 | 详情配置 | 用途 |
|----------|----------|------|
| `properties` | `propertiesConfig` | CSS 属性 |
| `excludeProperties` | - | 排除属性 |
| `numberCategories` | `numberCategoriesConfig` | 数值类别 |
| `excludeNumberCategories` | - | 排除类别 |
| `numberUnits` | `numberUnitsConfig` | 数值单位 |
| `excludeUnits` | - | 排除单位 |
| `colorTypes` | `colorTypesConfig` | 颜色类型 |
| `excludeColorTypes` | - | 排除颜色类型 |

这种分离使得：
- 列表配置保持简洁，只关心"要哪些"
- 详情配置专注于"如何配置"
- 两者可以独立修改，互不影响

## 命名规范

- 属性名：camelCase（如 `backgroundColor`）
- 颜色名：camelCase（如 `mozButtonDefault`）
- 关键字：kebab-case 原值（如 `flex-start`）
- 伪类/伪元素：camelCase（如 `focusVisible`）
- 数值类别：camelCase（如 `fontRelative`）
