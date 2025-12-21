# cssts-compiler

> CssTs 编译器 - 解析、转换、生成

## 核心职责

`cssts-compiler` 负责所有**编译时**的工作：

1. **解析** - 解析 `.cssts` 文件中的 `css { }` 语法
2. **转换** - CST 到 AST 转换，生成 `csstsAtom.xxx` 引用
3. **CSS 生成** - 根据使用的样式生成 CSS
4. **类型生成** - 生成 `.d.ts` 类型定义文件

## ⚠️ 重要：伪类分隔符是双美元符号

```typescript
// ✅ 正确：使用双美元符号 $
const btn$$hover$$active = css { cursorPointer }

// ❌ 错误：使用单美元符号（伪类不会生效！）
const btn$hover$active = css { cursorPointer }
```

分隔符配置来自 `cssts-runtime`：`CSSTS_CONFIG.PSEUDO_SEPARATOR = '$$'`

---

## 模块结构

```
cssts-compiler/
├── generator/       # 数据和类型生成脚本
├── src/
│   ├── config/      # 配置系统
│   ├── data/        # 生成的数据文件
│   ├── factory/     # AST 转换器
│   ├── generator/   # DTS 生成器
│   ├── parser/      # 解析器
│   ├── transform/   # 核心转换功能
│   ├── types/       # 类型定义
│   └── utils/       # 工具函数
└── types/           # 生成的 .d.ts 文件输出目录
```

---

## 核心 API

### transformCssTs - 单文件转换

```typescript
import { transformCssTs, type TransformContext } from 'cssts-compiler'

const context: TransformContext = { styles: new Set<string>() }
const result = transformCssTs(code, context)
// result.code - 转换后的 JS 代码
// result.hasStyles - 是否有样式
```

### parseStyleName - 样式名解析

```typescript
import { parseStyleName } from 'cssts-compiler'

parseStyleName('displayFlex')
// { baseName: 'displayFlex', pseudos: [] }

parseStyleName('clickable$$hover$$active')
// { baseName: 'clickable', pseudos: ['hover', 'active'] }
```

### generateAtoms - 原子类生成

```typescript
import { generateAtoms, generateDts, generateStats } from 'cssts-compiler'

const atoms = generateAtoms()
const dtsContent = generateDts()
const stats = generateStats()
```

---

## 命名规范

| TS 变量名 | CSS 类名 | CSS 规则 |
|-----------|----------|----------|
| `displayFlex` | `display_flex` | `display: flex` |
| `paddingTop16px` | `padding-top_16px` | `padding-top: 16px` |
| `opacity0p9` | `opacity_0.9` | `opacity: 0.9` |
| `width50pct` | `width_50%` | `width: 50%` |
| `zIndexN1` | `z-index_-1` | `z-index: -1` |

| 转义符 | 含义 | 示例 |
|--------|------|------|
| `N` | `-` 负数 | `N10` → `-10` |
| `p` | `.` 小数点 | `0p5` → `0.5` |
| `pct` | `%` 百分号 | `50pct` → `50%` |
| `s` | `/` 斜杠 | `16s9` → `16/9` |

### Vendor Prefix 处理

以 `-` 开头的 vendor prefix keyword 会去掉开头的 `-`，然后转换为 PascalCase：

| CSS Keyword | TS 变量名 |
|-------------|-----------|
| `-moz-box` | `displayMozBox` |
| `-webkit-flex` | `displayWebkitFlex` |
| `-ms-grid` | `displayMsGrid` |
| `-webkit-inline-box` | `displayWebkitInlineBox` |

---

## 配置系统

### 配置层级

```
Property → NumberCategory → NumberUnit
         → ColorType → Color
         → Keyword
```

### 配置字段概览

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

### 数值类别 (NumberCategory)

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

### 步长配置 (CssStepConfig)

```typescript
interface CssStepConfig {
  step?: number | number[] | CssProgressiveRange[];
  min?: number;
  max?: number;
  presets?: number[];
}
```

step 支持三种格式：

```typescript
// 1. 单一步长
step: 1

// 2. 多个步长值
step: [1, 5, 10]

// 3. 渐进步长范围
step: [
  { max: 10, divisors: [1] },
  { max: 100, divisors: [5, 10] },
  { max: 1000, divisors: [50, 100] }
]
```

### 配置示例

```typescript
import { CsstsConfig } from 'cssts-compiler'

const config: CsstsConfig = {
  // 属性列表
  properties: ['width', 'height', 'margin', 'padding'],
  excludeProperties: ['azimuth'],

  // 属性详细配置
  propertiesConfig: [
    {
      zIndex: {
        unitless: { min: -1, max: 9999, presets: [-1, 999, 9999] }
      }
    },
    {
      opacity: {
        unitless: { min: 0, max: 1, step: 0.1 }
      }
    }
  ],

  // 数值类别
  numberCategories: ['pixel', 'fontRelative', 'percentage'],
  excludeNumberCategories: ['physical', 'resolution'],

  // 数值类别详细配置
  numberCategoriesConfig: [
    { pixel: { min: 0, max: 1000, step: 1 } },
    { percentage: { min: 0, max: 100, step: 5 } }
  ],

  // 颜色
  colorTypes: ['namedColor', 'systemColor'],
  excludeColorTypes: ['deprecatedSystemColor'],

  // 伪类
  pseudoClasses: ['hover', 'focus', 'active'],
  excludePseudoClasses: ['visited'],

  // 渐进步长
  progressiveRanges: [
    { max: 10, divisors: [1] },
    { max: 100, divisors: [5, 10] },
    { max: 1000, divisors: [50, 100] }
  ]
}
```

### 配置优先级

```
属性级配置 (propertiesConfig) > 全局类别配置 (numberCategoriesConfig) > 默认值
```

属性列表优先级：
1. 有 `properties` → 直接使用
2. 没有 `properties`，有 `excludeProperties` → 所有属性 - 排除项
3. 都没有 → 使用所有属性

---

## DTS 生成器

### API

```typescript
import { generateAtoms, generateDts, generateStats } from 'cssts-compiler'

// 生成原子类定义数组
const atoms = generateAtoms({ config: userConfig })

// 生成 DTS 文件内容
const dtsContent = generateDts({ config: userConfig })

// 生成统计信息
const stats = generateStats({ config: userConfig })
console.log(`总原子类数: ${stats.totalAtoms}`)
```

### 0 值处理

**生成规则：**
- 如果 `min <= 0 && max >= 0`，则包含 0
- 否则不包含 0

**去重优化：**
- CSS 规范中 `0` 不需要单位，`0px`、`0em`、`0rem` 等效于 `0`
- 生成器会自动去重，只生成一个 `top0: '0'`，而不是 `top0px`、`top0em`、`top0rem` 等多个
- 这大幅减少了生成的原子类数量（例如 top 属性从 1013 个减少到 888 个）

```typescript
// 生成结果示例
top0: '0';      // ✅ 只生成一个，值为 '0'（无单位）
top1px: '1px';
top1em: '1em';
top1rem: '1rem';
// top0px, top0em, top0rem 不会生成（去重）
```

---

## 数据来源

### 主要数据源

| 数据源 | 说明 | 提取内容 |
|--------|------|----------|
| [csstree](https://github.com/csstree/csstree) | CSS 语法解析库 | 属性名、keywords、颜色、数值类型 |
| `datajson/numberMapping.json` | 自定义映射 | 单位到 category 的分类映射 |
| `datajson/pseudo-standards.json` | 自定义数据 | 标准伪类和伪元素列表 |
| `datajson/propertyInheritance.json` | 自定义数据 | 属性继承关系（如 margin → marginTop） |

### 从 csstree 提取的数据

- **属性名** - 所有标准 CSS 属性（排除 `-` 开头的 vendor prefix 属性）
- **Keywords** - 每个属性支持的关键字值
- **颜色类型** - `namedColor`、`systemColor`、`deprecatedSystemColor`、`nonStandardColor`
- **数值类型** - `length`、`percentage`、`angle`、`time` 等

### 特殊处理

#### CSS 全局关键字

CSS-wide keywords 是所有 CSS 属性都支持的全局关键字，但 csstree 不会为每个属性显式声明它们。生成器会手动将这些关键字添加到每个属性的 keywords 列表中：

- `inherit` - 继承父元素的值
- `initial` - 使用属性的初始值
- `unset` - 可继承属性用 inherit，否则用 initial
- `revert` - 回退到用户代理样式表的值
- `revert-layer` - 回退到上一个级联层的值

这些关键字同时也存在于 `KEYWORD_NAME_MAP` 中（从 csstree 提取），确保映射完整。

#### 颜色数据

| 关键字 | 来源 | 说明 |
|--------|------|------|
| `transparent` | csstree `namedColor` 类型 | 作为命名颜色存在 |
| `currentColor` | csstree keyword | 作为独立关键字存在于 `KEYWORD_NAME_MAP` |

颜色属性（有 colorTypes 的属性）会自动支持所有配置的颜色类型。

#### Vendor Prefix 处理

以 `-` 开头的 keyword（如 `-moz-box`、`-webkit-flex`）：
1. 去掉开头的 `-`
2. 转换为 PascalCase
3. 与属性名拼接生成原子类名

示例：`-webkit-flex` → `WebkitFlex` → `displayWebkitFlex`

#### Keyword 去重

当不同的 CSS keyword 转换为 camelCase 后产生相同的名称时，生成器会自动去重，保留第一个（按字母排序）。

| CSS Keyword | camelCase | 处理结果 |
|-------------|-----------|----------|
| `crisp-edges` | `crispEdges` | ✅ 保留 |
| `crispEdges` | `crispEdges` | ❌ 跳过（重复） |

这确保了生成的 TypeScript 类型定义中不会出现重复的属性名。

#### 数值单位分类

单位按功能分为 10 个 category：

| Category | 单位 | 说明 |
|----------|------|------|
| pixel | px | 像素单位 |
| fontRelative | em, rem, ch, ex, cap, ic, lh, rlh | 字体相对单位 |
| percentage | %, vw, vh, vmin, vmax, svw, svh, lvw, lvh, dvw, dvh, vi, vb | 百分比和视口单位 |
| physical | cm, mm, in, pt, pc, Q | 物理单位 |
| angle | deg, grad, rad, turn | 角度单位 |
| time | s, ms | 时间单位 |
| frequency | Hz, kHz | 频率单位 |
| resolution | dpi, dpcm, dppx, x | 分辨率单位 |
| flex | fr | 弹性单位 |
| unitless | (无) | 无单位数值 |

---

## 生成脚本

### generator-data.ts（阶段1：数据生成）

从 csstree 提取 CSS 数据：

```bash
npx tsx generator/generator-data.ts
```

输出到 `src/data/`：
- `cssColorData.ts` - 颜色数据
- `cssKeywordsData.ts` - 关键词数据
- `cssNumberData.ts` - 数值类型和单位数据
- `cssPropertyColorTypes.ts` - 属性支持的颜色类型
- `cssPropertyKeywords.ts` - 属性支持的关键词
- `cssPropertyNameMapping.ts` - 属性名称映射
- `cssPropertyNumber.ts` - 属性支持的数值类型
- `cssPseudoData.ts` - 伪类/伪元素数据

### generator-type.ts（阶段2：类型生成）

从数据文件生成类型定义：

```bash
npx tsx generator/generator-type.ts
```

输出到 `src/types/`：
- `cssPropertyConfig.d.ts` - 属性配置类型
- `csstsConfig.d.ts` - CSSTS 配置类型

### 执行顺序

```bash
# 1. 先生成数据文件
npx tsx generator/generator-data.ts

# 2. 再生成类型文件
npx tsx generator/generator-type.ts
```

---

## 核心属性列表

基于 Tailwind CSS 设计理念的精简属性集合（41 个属性，约 1,092 个原子类）：

```typescript
import { CORE_PROPERTIES } from 'cssts-compiler'

const config = {
  properties: CORE_PROPERTIES
}
```

包含：布局、Flexbox、Grid、尺寸、间距、背景、文本、边框、阴影、变换、过渡等常用属性。

---

## License

MIT
