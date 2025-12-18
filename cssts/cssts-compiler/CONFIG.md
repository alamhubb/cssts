# CSSTS 配置系统说明

## 概述

CSSTS 的配置系统分为三个层级：

1. **属性级别配置** - 在 `config/property-config.ts` 中自动生成
2. **全局级别配置** - 在 `CsstsConfig` 中手动配置
3. **生成器** - 根据配置生成原子类型提示和原子类

## 三层配置体系

### 1. 属性级别配置（Property-Level Config）

位置：`config/property-config.ts`（自动生成）

```typescript
export class TopConfig {
  keywords: TopKeyword[] = [...TOP_KEYWORDS];
  numberTypes: NumberTypeName[] = [...TOP_NUMBER_TYPES];
}
```

**说明**：
- 每个 CSS 属性都有一个对应的 `Config` 类
- `keywords` - 该属性支持的关键字列表（如果有的话）
- `numberTypes` - 该属性支持的数值类型（如果有的话）
- 如果属性没有关键字或数值类型，则对应字段为 `null`

**示例**：
- `top` 属性：`keywords: ['auto', ...]`, `numberTypes: ['length', 'percentage']`
- `display` 属性：`keywords: ['block', 'inline', ...]`, `numberTypes: null`
- `opacity` 属性：`keywords: null`, `numberTypes: ['number']`

### 2. 全局级别配置（Global-Level Config）

位置：`CsstsConfig` 类

```typescript
const config = new CsstsConfig({
  // 属性配置
  properties: ['width', 'height', 'margin'],  // 白名单
  excludeProperties: ['appearance'],           // 黑名单
  
  // 数值类型配置
  numberTypes: ['length', 'percentage'],       // 白名单
  excludeNumberTypes: ['angle'],               // 黑名单
  
  // 单位分类配置
  unitCategories: ['pixel', 'percentage'],     // 白名单
  excludeUnitCategories: ['resolution'],       // 黑名单
  
  // 单位配置
  units: ['px', 'em'],                         // 白名单
  excludeUnits: ['dpi'],                       // 黑名单
  
  // 关键字/颜色配置
  keywords: ['auto', 'inherit'],               // 白名单
  excludeKeywords: [],                         // 黑名单
  colors: ['red', 'blue'],                     // 白名单
  excludeColors: [],                           // 黑名单
});
```

**优先级规则**：
- 白名单优先于黑名单
- 如果配置了白名单，则黑名单被忽略
- 如果没配置白名单，则使用黑名单过滤

## 生成流程

### 第一步：确定要处理的属性

```
如果全局配置了 properties（白名单）
  ↓
  只处理配置的属性
  
否则
  ↓
  处理所有属性，排除 excludeProperties 中的属性
```

### 第二步：获取属性的默认配置

```
对于每个属性：
  ↓
  从 CssPropertyConfigMap 获取属性配置
  ↓
  获取 keywords 和 numberTypes（可能为 null）
```

### 第三步：生成关键字原子类

```
如果属性配置中 keywords !== null
  ↓
  遍历 keywords 列表
  ↓
  应用全局 keywords 和 colors 过滤
  ↓
  生成原子类
```

**示例**：
```typescript
// 属性配置
TopConfig.keywords = ['auto', 'inherit', ...]

// 全局配置
config.keywords = ['auto']  // 白名单

// 结果：只生成 'auto' 的原子类
```

### 第四步：生成数值原子类

```
如果属性配置中 numberTypes !== null
  ↓
  确定要使用的 numberTypes
    ├─ 如果全局配置了 numberTypes → 使用全局配置
    └─ 否则 → 使用属性配置的 numberTypes
  ↓
  对每个 numberType，获取对应的单位列表
  ↓
  应用全局 units 和 unitCategories 过滤
  ↓
  对每个单位，生成数值列表
  ↓
  生成原子类
```

**示例**：
```typescript
// 属性配置
TopConfig.numberTypes = ['length', 'percentage']

// 全局配置
config.numberTypes = ['length']  // 白名单

// 结果：只生成 length 类型的原子类（px, em, rem 等）
```

## 配置与原子类的对应关系

### 场景 1：只配置属性

```typescript
const config = new CsstsConfig({
  properties: ['width', 'height']
});
```

**结果**：
- 只生成 `width` 和 `height` 的原子类
- 使用这两个属性的默认 `keywords` 和 `numberTypes`
- 使用所有单位和数值

### 场景 2：配置属性和数值类型

```typescript
const config = new CsstsConfig({
  properties: ['width', 'height'],
  numberTypes: ['length']  // 只使用 length 类型
});
```

**结果**：
- 只生成 `width` 和 `height` 的原子类
- 只使用 `length` 类型的单位（px, em, rem, vh, vw 等）
- 不生成百分比单位的原子类

### 场景 3：配置属性、数值类型和单位

```typescript
const config = new CsstsConfig({
  properties: ['width', 'height'],
  numberTypes: ['length'],
  units: ['px', 'em']  // 只使用这两个单位
});
```

**结果**：
- 只生成 `width` 和 `height` 的原子类
- 只使用 `px` 和 `em` 单位
- 生成的原子类数量最少

### 场景 4：配置单位分类

```typescript
const config = new CsstsConfig({
  properties: ['width', 'height'],
  unitCategories: ['pixel']  // 只使用 pixel 分类
});
```

**结果**：
- 只生成 `width` 和 `height` 的原子类
- 只使用 `pixel` 分类中的单位（px）
- 不生成其他分类的单位（em, rem, vh, vw 等）

## 单位分类说明

| 分类 | 单位 | 说明 |
|------|------|------|
| `pixel` | px | 像素单位 |
| `percentage` | % | 百分比 |
| `fontRelative` | em, rem, ch, ex, ic, lh, rlh | 相对字体大小 |
| `physical` | cm, mm, in, pt, pc, Q | 物理长度 |
| `angle` | deg, grad, rad, turn | 角度 |
| `time` | s, ms | 时间 |
| `frequency` | Hz, kHz | 频率 |
| `resolution` | dpi, dpcm, dppx, x | 分辨率 |
| `flex` | fr | Grid 弹性单位 |
| `unitless` | 无单位 | 纯数值 |

## 数值类型说明

| 类型 | 说明 | 单位分类 |
|------|------|---------|
| `length` | 长度 | pixel, fontRelative, physical, 视口单位 |
| `percentage` | 百分比 | percentage |
| `angle` | 角度 | angle |
| `time` | 时间 | time |
| `frequency` | 频率 | frequency |
| `resolution` | 分辨率 | resolution |
| `number` | 纯数值 | unitless |
| `integer` | 整数 | unitless |
| `flex` | 弹性 | flex |

## 原子类生成示例

### 示例 1：简单属性

```typescript
// 配置
const config = new CsstsConfig({
  properties: ['display']
});

// 属性配置
DisplayConfig.keywords = ['block', 'inline', 'flex', 'grid', ...]
DisplayConfig.numberTypes = null

// 生成结果
displayBlock: { 'display_block': true }
displayInline: { 'display_inline': true }
displayFlex: { 'display_flex': true }
displayGrid: { 'display_grid': true }
// ... 等等
```

### 示例 2：数值属性

```typescript
// 配置
const config = new CsstsConfig({
  properties: ['width'],
  units: ['px']
});

// 属性配置
WidthConfig.keywords = null
WidthConfig.numberTypes = ['length', 'percentage']

// 生成结果（只显示 px 单位）
width0: { 'width_0px': true }
width1: { 'width_1px': true }
width2: { 'width_2px': true }
// ... 等等（根据 pixel 分类的预设值）
```

### 示例 3：混合属性

```typescript
// 配置
const config = new CsstsConfig({
  properties: ['border']
});

// 属性配置
BorderConfig.keywords = ['solid', 'dashed', 'dotted', ...]
BorderConfig.numberTypes = ['length']

// 生成结果
borderSolid: { 'border_solid': true }
borderDashed: { 'border_dashed': true }
border0: { 'border_0px': true }
border1: { 'border_1px': true }
// ... 等等
```

## 配置最佳实践

### 1. 最小化配置

```typescript
// 只配置需要的属性
const config = new CsstsConfig({
  properties: ['width', 'height', 'margin', 'padding']
});
```

### 2. 限制单位

```typescript
// 只使用常用单位
const config = new CsstsConfig({
  properties: ['width', 'height'],
  unitCategories: ['pixel', 'percentage']
});
```

### 3. 限制数值范围

```typescript
// 通过 unitCategories 配置限制数值
const config = new CsstsConfig({
  properties: ['width'],
  unitCategories: {
    pixel: {
      presets: [0, 4, 8, 16, 32, 64]  // 只生成这些值
    }
  }
});
```

### 4. 排除不需要的项

```typescript
// 使用黑名单排除
const config = new CsstsConfig({
  excludeProperties: ['appearance', 'clip'],
  excludeKeywords: ['inherit', 'initial']
});
```

## 性能优化建议

| 优化方向 | 方法 | 效果 |
|---------|------|------|
| 减少属性 | 使用 `properties` 白名单 | 减少 50-90% 原子类 |
| 减少单位 | 使用 `units` 或 `unitCategories` | 减少 30-70% 原子类 |
| 减少数值 | 配置 `unitCategories` 的 `presets` | 减少 50-80% 原子类 |
| 减少关键字 | 使用 `keywords` 白名单 | 减少 20-50% 原子类 |

## 常见问题

### Q: 为什么配置了 `properties` 但还是生成了很多原子类？

A: 因为每个属性可能支持多个单位和数值。例如 `width` 属性支持 `length` 和 `percentage` 类型，而 `length` 类型包含多个单位（px, em, rem, vh, vw 等），每个单位又有多个预设值。

**解决方案**：
- 限制 `numberTypes`
- 限制 `unitCategories`
- 限制 `units`

### Q: 如何只生成特定单位的原子类？

A: 使用 `units` 白名单：

```typescript
const config = new CsstsConfig({
  properties: ['width', 'height'],
  units: ['px', 'em']
});
```

### Q: 如何自定义数值范围？

A: 配置 `unitCategories` 的 `presets`：

```typescript
const config = new CsstsConfig({
  unitCategories: {
    pixel: {
      presets: [0, 4, 8, 16, 32, 64]
    }
  }
});
```

### Q: 属性配置中的 `null` 是什么意思？

A: 表示该属性不支持该类型的值。例如 `display` 属性的 `numberTypes` 为 `null`，表示 `display` 不支持数值。
