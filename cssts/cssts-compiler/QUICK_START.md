# 配置快速参考

> 常见配置场景和代码示例

## 基础配置

### 使用默认配置

```typescript
import { CsstsConfig } from 'cssts-compiler'

const config = new CsstsConfig()
```

系统会自动排除：
- 98% 用不到的属性（基于 Tailwind）
- 低频单位分类：`resolution`、`physical`、`flex`

### 最小化配置

只生成最常用的属性和单位：

```typescript
const config = new CsstsConfig({
  includeProperties: [
    'width', 'height', 'margin', 'padding',
    'display', 'position', 'top', 'left', 'right', 'bottom',
    'backgroundColor', 'color', 'fontSize', 'fontWeight'
  ],
  includeUnitCategories: ['pixel', 'percentage'],
  includeUnits: ['px', '%', 'em', 'rem']
})
```

---

## 数值类型配置

### 只支持 length 和 percentage

```typescript
const config = new CsstsConfig({
  includeNumberTypes: ['length', 'percentage']
})
```

### 排除特定数值类型

```typescript
const config = new CsstsConfig({
  excludeNumberTypes: ['angle', 'frequency', 'resolution']
})
```

### 混合配置：支持 length，但只用特定单位

```typescript
const config = new CsstsConfig({
  includeNumberTypes: [
    'length',
    { time: ['ms', 's'] }  // 只支持 time 的 ms 和 s
  ]
})
```

---

## 单位分类配置

### 只支持 pixel 和 percentage

```typescript
const config = new CsstsConfig({
  includeUnitCategories: ['pixel', 'percentage']
})
```

### 自定义单位分类的数值范围

```typescript
const config = new CsstsConfig({
  includeUnitCategories: [
    'pixel',
    { percentage: { '%': { presets: [0, 25, 50, 75, 100] } } }
  ]
})
```

### 排除特定单位分类

```typescript
const config = new CsstsConfig({
  excludeUnitCategories: ['resolution', 'physical', 'flex']
})
```

### 排除特定分类下的单位

```typescript
const config = new CsstsConfig({
  excludeUnitCategories: [
    'resolution',           // 排除整个 resolution 分类
    { pixel: ['px'] }       // 排除 pixel 分类的 px 单位
  ]
})
```

---

## 单位配置

### 自定义单位的步长

```typescript
const config = new CsstsConfig({
  includeUnits: [
    'px',
    { em: { step: 0.25, max: 10 } },
    { rem: { step: 0.5, max: 20 } }
  ]
})
```

### 使用预设值

```typescript
const config = new CsstsConfig({
  includeUnits: [
    { px: { presets: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64] } },
    { em: { presets: [0.5, 1, 1.5, 2, 2.5, 3] } }
  ]
})
```

### 排除特定单位

```typescript
const config = new CsstsConfig({
  excludeUnits: ['dpi', 'dpcm', 'dppx', 'x', 'fr']
})
```

---

## 关键字和颜色配置

### 只支持特定关键字

```typescript
const config = new CsstsConfig({
  includeKeywords: ['auto', 'inherit', 'initial', 'unset', 'none']
})
```

### 排除特定关键字

```typescript
const config = new CsstsConfig({
  excludeKeywords: ['revert', 'revert-layer']
})
```

### 只支持特定颜色

```typescript
const config = new CsstsConfig({
  includeColors: ['red', 'blue', 'green', 'white', 'black', '#fff', '#000']
})
```

---

## 伪类和伪元素配置

### 支持的伪类

```typescript
const config = new CsstsConfig({
  includePseudoClasses: [
    'hover', 'active', 'focus', 'disabled',
    'visited', 'target', 'focus-visible'
  ]
})
```

### 排除特定伪类

```typescript
const config = new CsstsConfig({
  excludePseudoClasses: ['visited', 'target']
})
```

### 支持的伪元素

```typescript
const config = new CsstsConfig({
  includePseudoElements: ['before', 'after', 'first-line', 'first-letter']
})
```

### 伪类样式配置

```typescript
const config = new CsstsConfig({
  pseudoClassStyles: {
    hover: { opacity: 0.9 },
    active: { opacity: 0.6 },
    disabled: { opacity: 0.5, cursor: 'not-allowed' },
    focus: { outline: '2px solid blue' }
  }
})
```

---

## 复杂场景

### 场景 1：Tailwind 风格配置

```typescript
const config = new CsstsConfig({
  // 只生成常用属性
  includeProperties: [
    'width', 'height', 'margin', 'padding',
    'display', 'position', 'top', 'left', 'right', 'bottom',
    'backgroundColor', 'color', 'fontSize', 'fontWeight',
    'border', 'borderRadius', 'boxShadow', 'opacity'
  ],

  // 支持的数值类型
  includeNumberTypes: ['length', 'percentage'],

  // 支持的单位分类
  includeUnitCategories: ['pixel', 'percentage', 'fontRelative'],

  // 自定义单位配置
  includeUnits: [
    { px: { presets: [0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 20, 24, 28, 32, 40, 48, 56, 64] } },
    { em: { presets: [0.5, 1, 1.5, 2] } },
    { rem: { presets: [0.5, 1, 1.5, 2, 2.5, 3] } },
    '%'
  ],

  // 支持的伪类
  includePseudoClasses: ['hover', 'active', 'focus', 'disabled'],

  // 伪类样式
  pseudoClassStyles: {
    hover: { opacity: 0.9 },
    active: { opacity: 0.6 },
    disabled: { opacity: 0.5, cursor: 'not-allowed' }
  }
})
```

### 场景 2：最小化生成（性能优先）

```typescript
const config = new CsstsConfig({
  // 只生成最常用的属性
  includeProperties: [
    'width', 'height', 'margin', 'padding',
    'display', 'backgroundColor', 'color'
  ],

  // 只支持 px 和 %
  includeUnits: ['px', '%'],

  // 排除所有低频项
  excludeNumberTypes: ['angle', 'frequency', 'resolution'],
  excludeUnitCategories: ['physical', 'flex'],
  excludeKeywords: ['inherit', 'initial', 'unset'],
  excludePseudoClasses: ['visited', 'target']
})
```

### 场景 3：跨级别配置

```typescript
const config = new CsstsConfig({
  // 支持 length，但只用 pixel 分类的 px
  includeNumberTypes: [
    { length: { pixel: ['px'] } }
  ],

  // 支持 time，但只用 ms 和 s
  includeNumberTypes: [
    { time: ['ms', 's'] }
  ],

  // 排除 length 中 physical 分类的所有单位
  excludeNumberTypes: [
    { length: { physical: ['cm', 'mm', 'in', 'pt', 'pc', 'Q'] } }
  ]
})
```

---

## 配置优先级

### 白名单 vs 黑名单

```typescript
// ✅ 白名单优先
const config = new CsstsConfig({
  includeUnits: ['px', 'em'],  // 只用这两个
  excludeUnits: ['rem']         // 这个会被忽略
})

// ✅ 没有白名单时使用黑名单
const config = new CsstsConfig({
  excludeUnits: ['dpi', 'dpcm']  // 排除这两个
})
```

### 系统默认排除

```typescript
// 系统默认排除这些单位分类
SYSTEM_DEFAULT_EXCLUDED_UNIT_CATEGORIES = [
  'resolution',  // dpi, dpcm, dppx, x
  'physical',    // pt, pc, in, cm, mm, Q
  'flex'         // fr
]

// 如果要启用它们，使用 includeUnitCategories
const config = new CsstsConfig({
  includeUnitCategories: ['resolution', 'physical', 'flex']
})
```

---

## 验证配置

运行生成器查看配置结果：

```bash
# 生成 .d.ts 文件
npx tsx src/generator-dts/index.ts

# 查看生成统计
# 📊 Generation Statistics:
#    Total properties: 521
#    Properties with config: 262
#    Keyword atoms: 6886
#    Number atoms: 34953
```

---

## 相关文档

- [完整配置指南](./CONFIG.md) - 详细的配置说明
- [主 README](./README.md) - 编译器概览
- [源代码](./src/cssts-config.ts) - 配置类实现

