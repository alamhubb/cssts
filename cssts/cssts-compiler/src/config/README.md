# CSSTS 默认配置说明

> 本文档说明 cssts-compiler 内置的默认配置

## 📋 文件结构

```
config/
├── CsstsDefaultConfig.ts              # 系统默认配置
├── CsstsDefaultSupportCssProperties.ts # 默认支持的 CSS 属性列表
├── ConfigLookup.ts                     # 配置查找器（用户配置 + 默认配置）
└── types/
    ├── cssPropertyConfig.d.ts          # CSS 属性配置类型（自动生成）
    └── csstsConfig.d.ts                # CSSTS 配置类型（手动维护）
```

---

## 🎯 配置层次

```typescript
// CsstsConfig: 核心业务配置（控制"生成什么原子类"）
interface CsstsConfig {
  properties?: CssPropertyName[];
  colors?: CssColorName[];
  progressiveRanges?: CssProgressiveRange[];
  // ...
}

// CsstsCompilerConfig: 编译器配置（继承业务配置 + 添加构建配置）
interface CsstsCompilerConfig extends CsstsConfig {
  dts?: boolean;
  dtsOutputDir?: string;
  dtsSplitFiles?: boolean;
  debug?: boolean;
}
```

---

## 📦 默认支持的 CSS 属性

默认配置支持 **106 个** 常用 CSS 属性，涵盖：

### 布局 (Layout)
- **基础布局**: display, visibility, position, zIndex
- **定位**: inset, top, right, bottom, left
- **溢出**: overflow, overflowX, overflowY

### Flexbox & Grid
- **容器**: flexDirection, flexWrap, justifyContent, alignItems, alignContent, justifyItems
- **间距**: gap, rowGap, columnGap
- **子元素**: flex, flexGrow, flexShrink, flexBasis, alignSelf, justifySelf

### 尺寸 (Sizing)
- **宽高**: width, minWidth, maxWidth, height, minHeight, maxHeight
- **其他**: aspectRatio, boxSizing

### 间距 (Spacing)
- **Margin**: margin, marginTop, marginRight, marginBottom, marginLeft
- **Padding**: padding, paddingTop, paddingRight, paddingBottom, paddingLeft

### 排版 (Typography)
- **字体**: fontSize, fontWeight, fontStyle, fontFamily
- **行距**: lineHeight, letterSpacing
- **对齐**: textAlign, verticalAlign
- **装饰**: textDecoration, textTransform
- **溢出**: textOverflow, whiteSpace, wordBreak, wordWrap
- **颜色**: color

### 背景 (Background)
- background, backgroundColor, backgroundSize, backgroundRepeat

### 边框 (Border)
- **简写**: border, borderStyle
- **统一设置**: borderWidth, borderColor, borderRadius
- **单独方向宽度**: borderTopWidth, borderRightWidth, borderBottomWidth, borderLeftWidth
- **单独方向颜色**: borderTopColor, borderRightColor, borderBottomColor, borderLeftColor
- **圆角**: borderTopLeftRadius, borderTopRightRadius, borderBottomRightRadius, borderBottomLeftRadius

### 视觉效果 (Effects)
- **透明度**: opacity
- **阴影**: boxShadow
- **轮廓**: outline, outlineStyle, outlineWidth, outlineColor, outlineOffset

### 交互与其他 (Misc)
- **交互**: cursor, userSelect, resize, pointerEvents
- **对象**: objectFit, objectPosition

---

## 📏 渐进步长配置 (Progressive Ranges)

默认配置使用智能步长，在不同数值区间使用不同的精度：

| 数值区间 | 步长规则 | 示例 |
|---------|---------|------|
| 0-100 | 每个整数 | 0, 1, 2, ..., 100 |
| 100-200 | 能被 2 或 5 整除 | 100, 102, 105, 110, ... |
| 200-500 | 能被 5 整除 | 200, 205, 210, ..., 500 |
| 500-1000 | 能被 10 整除 | 500, 510, 520, ..., 1000 |
| 1000-2000 | 能被 20 或 50 整除 | 1000, 1020, 1050, 1100, ... |
| 2000-5000 | 能被 50 整除 | 2000, 2050, 2100, ... |
| 5000-10000 | 能被 100 整除 | 5000, 5100, 5200, ... |
| 10000+ | 能被 1000 整除 | 10000, 11000, 12000, ... |

**设计理念**：
- 小数值（0-100）需要精细控制：每个整数
- 中等数值（100-500）适度精简：5px 步长
- 大数值（500+）粗略步长：避免生成过多冗余类

### 配置策略说明

**✅ 分层覆盖策略（ConfigLookup）**

系统保持两份配置：**用户配置** 和 **默认配置**，使用时按需查找：

#### 顶级覆盖

对于大部分配置，用户有就用用户的，没有就用默认的：

```typescript
// 用户只配置了 colors
cssTsPlugin({
  colors: ['red', 'blue', 'green']  // 完全替换默认颜色
  // progressiveRanges 没配置 → 使用默认的
})
```

适用于：`properties`, `colors`, `progressiveRanges`, `groups`, `keywords` 等

#### 按名称覆盖（细粒度）

对于 `numberCategoriesConfig` 和 `propertiesConfig`，按 **Category 名** 或 **Property 名** 查找：

```typescript
// 默认配置
numberCategoriesConfig: [
  { pixel: { min: 0, max: 1000 } },
  { fontRelative: { min: 0, max: 20, units: ['em', 'rem'] } }
]

// 用户配置（只改了 pixel）
cssTsPlugin({
  numberCategoriesConfig: [
    { pixel: { max: 2000 } }  // 覆盖 pixel
  ]
})

// 查找结果：
// pixel → 用户的 { max: 2000 }
// fontRelative → 默认的 { min: 0, max: 20, units: ['em', 'rem'] }
```

**好处**：用户只配置差异部分，不会丢失其他默认配置！

#### ConfigLookup 实现

```typescript
class ConfigLookup {
  constructor(userConfig?, defaultConfig) { ... }
  
  // 顶级覆盖
  get colors() { return this.userConfig?.colors ?? this.defaultConfig.colors }
  
  // 按名称查找（先用户后默认）
  getCategoryConfig(categoryName: string) { ... }
  getPropertyConfig(propertyName: string) { ... }
}
```

---


## 🎨 默认支持的颜色

内置 **27 个** 常用颜色：

```
transparent, black, white, red, green, blue, yellow, 
gray, grey, cyan, magenta, orange, silver, purple, 
pink, brown, lime, navy, teal, olive, skyblue, 
lightgray, darkgray, gold, salmon, tomato, violet
```

**排除的关键字** (42 个)：

排除了不常用或过于专业的颜色空间关键字，如：
- **颜色空间**: a98Rgb, displayP3, prophotoRgb, rec2020, srgb, srgbLinear, xyz, xyzD50, xyzD65
- **颜色函数**: hsl, hwb, lab, lch, oklab, oklch
- **特殊值**: initial, unset, revert, revertLayer

---

## 📊 数值类别配置 (Number Categories)

### 支持的数值类别

| 类别 | 单位 | 范围 | 说明 |
|------|------|------|------|
| **pixel** | px | 0-1000 | 像素单位，最常用 |
| **fontRelative** | em, rem | 0-20 | 字体相对单位，只生成 em/rem |
| **percentage** | %, vw, vh | 0-100 | 百分比类，额外支持 33.33, 66.67 |
| **angle** | deg, rad, turn, grad | -360~360 | 角度单位，步长 10 或 15 |
| **time** | s, ms | 0-5 | 时间单位 |
| **unitless** | (无单位) | -20~20 | 无单位数值，用于 opacity, z-index 等 |
| **flex** | fr | 0-12 | Grid 布局单位 |

### 排除的数值类别

- **physical**: cm, mm, in, pt, pc - 仅用于打印
- **frequency**: Hz, kHz - 音频相关，Web 几乎不用
- **resolution**: dpi, dpcm, dppx - 主要用于媒体查询

---

## ⚙️ 特殊属性配置 (Properties Config)

部分属性有特殊的数值范围配置：

| 属性 | 范围 | 说明 |
|------|------|------|
| **width/height** | 0-10000px | 支持超大尺寸 |
| **margin** | -10000~10000px | 支持负值 |
| **padding** | 0-10000px | 不支持负值 |
| **zIndex** | -1~10000 | 无单位，支持负值 |
| **opacity** | 0-1 (步长 0.1) | 无单位 |
| **lineHeight** | 0-3 (步长 0.25) | 无单位 |
| **fontWeight** | 100-900 (步长 100) | 无单位 |
| **borderRadius** | 0-100px 或 0-50% | 支持像素和百分比 |
| **scale** | 0-2 (步长 0.1) | transform 缩放 |
| **aspectRatio** | 0-3 (步长 0.1) | 宽高比 |

---

## 🎭 伪类配置 (Pseudo Classes Config)

默认为常用伪类配置了样式：

| 伪类 | 默认样式 | 说明 |
|------|---------|------|
| **hover** | `filter: brightness(1.15)` | 悬停时变亮 15% |
| **active** | `filter: brightness(0.85)` | 点击时变暗 15% |
| **focus** | `outline: 2px solid #79bbff; outline-offset: 1px` | 蓝色轮廓聚焦样式 |
| **disabled** | `opacity: 0.5; cursor: not-allowed; filter: grayscale(0.2)` | 禁用态：半透明 + 灰度 |

**使用示例**：
```typescript
const button$$hover$$active = css({ bgBlue600, colorWhite })
// 生成：
// .button { background: blue-600; color: white; }
// .button:hover { filter: brightness(1.15); }
// .button:active { filter: brightness(0.85); }
```

---

## 🔗 组合原子类配置 (Groups)

默认配置了多个常用组合：

### 数值组合

| 组合名 | 属性 | 示例 |
|--------|------|------|
| **size** | height + width | `size100px` = height: 100px + width: 100px |
| **marginX** | marginLeft + marginRight | `marginX20px` = 左右外边距 20px |
| **marginY** | marginTop + marginBottom | `marginY20px` = 上下外边距 20px |
| **paddingX** | paddingLeft + paddingRight | `paddingX20px` = 左右内边距 20px |
| **paddingY** | paddingTop + paddingBottom | `paddingY20px` = 上下内边距 20px |

### 固定关键字组合

| 组合名 | 样式 |
|--------|------|
| **flexRow** | display: flex + flex-direction: row |
| **flexCol** | display: flex + flex-direction: column |

### 关键字迭代组合

自动生成大量 Flexbox 布局组合：

- **flex 值组合**: `flexRow0`, `flexRow1`, `flexRowAuto`, `flexRowNone`, `flexCol0`, `flexCol1`, ...
- **wrap 组合**: `flexRowNowrap`, `flexRowWrap`, `flexColNowrap`, `flexColWrap`
- **justifyContent 组合**: `flexRowStart`, `flexRowCenter`, `flexRowEnd`, `flexRowSpaceBetween`, ...
- **alignItems 组合**: `flexRowYStart`, `flexRowYCenter`, `flexRowYEnd`, `flexColXStart`, ...
- **双轴居中**: `flexRowStartCenter`, `flexRowCenterCenter`, `flexColCenterCenter`, ...

---

## 📝 如何覆盖默认配置

在 `vite.config.ts` 中：

```typescript
cssTsPlugin({
  // 只生成指定属性
  properties: ['width', 'height', 'margin', 'padding'],
  
  // 自定义颜色
  colors: ['brand-primary', 'brand-secondary'],
  
  // 覆盖渐进步长
  progressiveRanges: [
    { max: 50, divisors: [1] },           // 0-50: 每个整数
    { max: 100, divisors: [5] },          // 50-100: 5 的倍数
    { max: Infinity, divisors: [10] }     // 100+: 10 的倍数
  ],
  
  // 覆盖特定属性配置
  propertiesConfig: [{
    width: {
      px: { min: 0, max: 2000 }  // 扩大范围到 2000
    }
  }],
  
  // 自定义伪类样式
  pseudoClassConfig: {
    hover: { opacity: '0.9' }
  }
})
```

---

## 📚 相关文档

- [配置类型定义](./types/csstsConfig.d.ts) - 查看完整配置接口
- [Generator README](../../generator/README.md) - 了解配置数据来源
- [编译器 README](../../README.md) - 了解如何使用编译器
