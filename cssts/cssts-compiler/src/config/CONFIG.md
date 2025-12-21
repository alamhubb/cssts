# CSSTS 配置说明

## 配置层级结构

CSSTS 采用四层精准类型约束：

```
Property → NumberType → NumberCategory → NumberUnit
         → ColorType → Color
         → Keyword
```

## 步长配置 (CssStepConfig)

```typescript
interface CssStepConfig {
  step?: number | CssProgressiveRange[];  // 步长或渐进步长
  min?: number;                            // 最小值
  max?: number;                            // 最大值
  negative?: boolean;                      // 是否支持负值
  presets?: number[];                      // 预设值
}
```

### 渐进步长范围 (progressiveRanges)

根据数值范围使用不同的步长：

```typescript
progressiveRanges: [
  { max: 10, divisors: [1] },        // 0-10: 步长 1
  { max: 100, divisors: [5, 10] },   // 10-100: 步长 5, 10
  { max: 1000, divisors: [50, 100] } // 100-1000: 步长 50, 100
]
```

## 配置字段

### 属性列表 (properties / excludeProperties)

简单的属性名列表，控制启用/禁用哪些属性：

```typescript
// 启用的属性
properties: [
  'width',
  'height', 
  'padding',
  'margin',
  'display',
  'flex',
  // ...
],

// 排除的属性
excludeProperties: [
  'azimuth',
  'voiceFamily',
  // ...
]
```

### 属性详细配置 (propertiesInfo / excludePropertiesInfo)

配置 CSS 属性的详细信息：keywords、numberTypes、colorTypes 等。

```typescript
propertiesInfo: [
  {
    width: {
      keywords: ['auto', 'fit-content'],
      numberTypes: ['length', 'percentage'],
      // 可直接配置 NumberType
      length: {
        pixel: { min: 0, max: 1000, step: 1 },
        percentage: ['vw', 'vh']
      }
    }
  },
  {
    opacity: {
      number: { min: 0, max: 1, step: 0.1 }
    }
  }
]
```

**注意**：`propertiesInfo` 只需要配置需要自定义的属性，未配置的属性使用默认值。

### 数值类型配置 (numberTypes / excludeNumberTypes)

数值类型包括：`length`, `angle`, `time`, `frequency`, `percentage`, `number`, `integer`, `resolution`, `flex`, `ratio`

```typescript
numberTypes: [
  'length',  // 字符串形式
  {
    length: {
      // 直接配置步长
      min: 0,
      max: 1000,
      step: 1
    }
  },
  {
    length: {
      // 配置 Category
      pixel: { min: 0, max: 100 },
      percentage: ['vw', 'vh', 'percent']
    }
  }
]
```

### 数值类别配置 (numberCategories / excludeNumberCategories)

数值类别是 NumberType 的子分类：

| NumberType | Categories |
|------------|------------|
| length | pixel, fontRelative, physical, percentage |
| angle | angle |
| time | time |
| frequency | frequency |
| percentage | percentage |
| number/integer | unitless |

```typescript
numberCategories: [
  'pixel',
  {
    pixel: { min: 0, max: 100, step: 1 },
    fontRelative: ['em', 'rem']
  }
]
```

### 数值单位配置 (numberUnits / excludeUnits)

直接配置具体单位的步长：

```typescript
numberUnits: [
  'px',
  {
    px: { min: 0, max: 1000, step: 1 },
    vw: { min: 0, max: 100, step: 5 }
  }
],
excludeUnits: ['cm', 'mm', 'in']  // 排除不需要的单位
```

### 颜色类型配置 (colorTypes / excludeColorTypes)

颜色类型包括：`namedColor`, `systemColor`, `deprecatedSystemColor`, `nonStandardColor`

```typescript
colorTypes: [
  'namedColor',
  {
    namedColor: ['red', 'blue', 'green'],
    systemColor: ['AccentColor', 'ButtonFace']
  }
],
excludeColorTypes: ['deprecatedSystemColor', 'nonStandardColor']
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

## 排除配置说明

排除配置（`exclude*`）不支持步长设置，只能指定要排除的项目：

```typescript
// ✅ 正确 - 简单列表
excludeProperties: ['margin', 'padding']

// ✅ 正确 - 详细排除配置
excludePropertiesInfo: [{ width: { numberTypes: ['percentage'] } }]
excludeNumberTypes: [{ length: ['pixel'] }]

// ❌ 错误 - 排除配置不支持步长
excludePropertiesInfo: [{ width: { length: { min: 100 } } }]
```

## 命名规范

- 属性名：camelCase（如 `backgroundColor`）
- 颜色名：camelCase（如 `mozButtonDefault`）
- 关键字：kebab-case 原值（如 `flex-start`）
- 伪类/伪元素：camelCase（如 `focusVisible`）
