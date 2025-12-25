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
├── generator/           # 数据和类型生成脚本（开发时使用）
│   ├── datajson/        # 原始数据文件（JSON）
│   ├── generator-data.ts    # 生成 src/data/
│   └── generator-type.ts    # 生成 src/config/types/
├── src/
│   ├── config/          # 配置系统
│   │   ├── types/       # 配置类型定义（自动生成）
│   │   └── CsstsDefaultConfig.ts
│   ├── data/            # 生成的数据文件
│   ├── dts/             # DTS 生成器（运行时使用）
│   │   ├── atom-generator.ts  # 原子类生成核心逻辑
│   │   ├── dts-writer.ts      # DTS 文件写入
│   │   └── dts-cli.ts         # CLI 入口
│   ├── factory/         # AST 转换器
│   ├── parser/          # 解析器
│   ├── transform/       # 核心转换功能（CSS 生成）
│   └── utils/           # 工具函数
│       ├── cssClassName.ts  # CSS 类名生成
│       ├── cssUtils.ts      # CSS 样式收集
│       ├── config-utils.ts  # 配置工具
│       └── unitCategory.ts  # 单位分类查询
├── target/              # 生成的 .d.ts 文件输出目录
└── tests/               # 测试文件
```

---

## CssTsCstToAst 扩展机制

`CssTsCstToAst` 继承自 `slime-parser` 的 `SlimeCstToAst`，使用**全局注册模式**扩展 CST → AST 转换。

### 为什么需要全局注册

`slime-parser` 内部各转换器通过 `slimeCstToAstUtil.xxx()` 调用。直接继承重写方法**不会生效**，因为内部调用不经过子类。

### 实现方式

```typescript
import { SlimeCstToAst, registerSlimeCstToAstUtil } from 'slime-parser'

export class CssTsCstToAst extends SlimeCstToAst {
  constructor() {
    super()
    // 关键：在构造函数中注册当前实例
    registerSlimeCstToAstUtil(this)
  }

  // 重写方法，拦截 CssExpression 节点
  createPrimaryExpressionAst(cst) {
    const first = cst.children?.[0]
    if (first?.name === 'CssExpression') {
      return this.createCssExpressionAst(first)
    }
    return super.createPrimaryExpressionAst(cst)
  }

  // 处理 css { atom } 语法
  createCssExpressionAst(cst) {
    // 转换为 cssts.$cls() 调用
    // ...
  }
}
```

### 工作原理

1. `CssTsCstToAst` 在构造函数中调用 `registerSlimeCstToAstUtil(this)`
2. 之后 `slime-parser` 内部所有调用都会路由到 `CssTsCstToAst`
3. `createPrimaryExpressionAst` 拦截 `CssExpression` 节点，转换为 `cssts.$cls()` 调用

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

## Groups 组合原子类配置

Groups 允许将多个 CSS 属性组合成一个原子类，支持三种配置方式。

### 类名生成规则

```
最终类名 = prefix + name + [自动生成部分] + suffix
```

- `prefix`: 前缀（可选）
- `name`: 名称（可选）
- `[自动生成部分]`: 根据配置类型自动生成
- `suffix`: 后缀（可选）

### 1. numberProperties - 数值组合

将多个属性绑定到相同的数值，继承数值配置（min/max/step）。

```typescript
// 配置
{ name: 'marginX', numberProperties: ['marginLeft', 'marginRight'] }

// 生成
marginX10px  → margin-left: 10px; margin-right: 10px;
marginX20px  → margin-left: 20px; margin-right: 20px;
```

### 2. keywordProperties - 固定关键字组合

生成固定样式组合的单个原子类。

```typescript
// 配置
{ name: 'flexRow', keywordProperties: { display: 'flex', flexDirection: 'row' } }

// 生成
flexRow → display: flex; flex-direction: row;
```

支持数值：

```typescript
{ name: 'flexCol', keywordProperties: { display: 'flex', flexDirection: 'column', flex: 1 } }
// 生成：flexCol → display: flex; flex-direction: column; flex: 1;
```

### 3. keywordIterations - 遍历关键字组合

遍历属性的关键字值，生成多个原子类（笛卡尔积）。

#### 基础用法

```typescript
// 配置
{
  keywordIterations: {
    display: ['flex'],
    flexDirection: ['row', 'column'],
  }
}

// 生成
flexRow    → display: flex; flex-direction: row;
flexColumn → display: flex; flex-direction: column;
```

#### 详细配置：value + alias + prefix

每个值支持三种写法：

```typescript
// 1. 简写：直接写值
flexDirection: ['row', 'column']

// 2. 简写：数值
flex: [0, 1, 'auto', 'none']

// 3. 详细配置：带 alias 或 prefix
flexDirection: [
  { value: 'row', alias: 'r' },      // 使用别名 → R
  { value: 'column', prefix: 'c' }   // 使用前缀 → CColumn
]
```

#### alias vs prefix 的区别

| 配置 | 作用 | 示例 |
|------|------|------|
| `alias` | 替换整个值的显示名称 | `{ value: 'row', alias: '' }` → 不显示 |
| `prefix` | 在值前面添加前缀 | `{ value: 'center', prefix: 'x' }` → `XCenter` |

#### 属性级别配置

支持在属性级别设置 prefix/alias，里层配置优先级更高：

```typescript
{
  keywordIterations: {
    // 属性级别配置
    alignItems: {
      prefix: 'y',  // 所有值默认使用 y 前缀
      values: [
        'start',                           // 使用外层 prefix → YStart
        'center',                          // 使用外层 prefix → YCenter
        { value: 'end', prefix: 'x' }      // 里层覆盖 → XEnd
      ]
    }
  }
}
```

#### 完整示例：Flexbox 布局组合

```typescript
groups: [
  // row + justifyContent(x轴) + alignItems(y轴)
  {
    keywordIterations: {
      display: [{ value: 'flex', alias: '' }],           // 不显示
      flexDirection: [{ value: 'row', alias: '' }],      // 不显示
      justifyContent: [
        { value: 'start', prefix: 'x' },                 // XStart
        { value: 'center', prefix: 'x' },                // XCenter
        { value: 'space-between', prefix: 'x' },         // XSpaceBetween
      ],
      alignItems: {
        prefix: 'y',
        values: ['start', 'center', 'end']               // YStart, YCenter, YEnd
      }
    }
  }
]

// 生成（笛卡尔积）：
// xStartYStart, xStartYCenter, xStartYEnd,
// xCenterYStart, xCenterYCenter, xCenterYEnd,
// xSpaceBetweenYStart, xSpaceBetweenYCenter, xSpaceBetweenYEnd
```

### 命名转换规则

| 输入 | 转换规则 | 输出 |
|------|----------|------|
| `'row'` | kebab → PascalCase | `Row` |
| `'space-between'` | kebab → PascalCase | `SpaceBetween` |
| `{ value: 'row', alias: '' }` | 空别名 | `` (不显示) |
| `{ value: 'row', alias: 'r' }` | 别名首字母大写 | `R` |
| `{ value: 'center', prefix: 'x' }` | 前缀首字母大写 + 值 | `XCenter` |
| `1` (数值) | 直接使用 | `1` |

### 默认配置示例

```typescript
groups: [
  // 数值组合
  { name: 'marginX', numberProperties: ['marginLeft', 'marginRight'] },
  { name: 'marginY', numberProperties: ['marginTop', 'marginBottom'] },
  { name: 'paddingX', numberProperties: ['paddingLeft', 'paddingRight'] },
  { name: 'paddingY', numberProperties: ['paddingTop', 'paddingBottom'] },
  
  // 固定组合
  { name: 'flexRow', keywordProperties: { display: 'flex', flexDirection: 'row' } },
  { name: 'flexCol', keywordProperties: { display: 'flex', flexDirection: 'column' } },
  
  // 遍历组合：row + flex
  {
    keywordIterations: {
      display: [{ value: 'flex' }],
      flexDirection: [{ value: 'row' }],
      flex: [0, 1, 'auto', 'none'],
    }
  },
  
  // 遍历组合：row + alignItems (y轴)
  {
    keywordIterations: {
      display: [{ value: 'flex' }],
      flexDirection: [{ value: 'row' }],
      alignItems: {
        prefix: 'y',
        values: ['start', 'center', 'end', 'stretch', 'baseline']
      }
    }
  }
]
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

### 设计理念

**核心问题：IDE 提示与编译转换的统一**

用户在 `css { }` 中输入时：
1. 输入 `d` → IDE 应提示 `displayFlex`, `displayBlock` 等
2. 输入完成 `displayFlex` → 编译器转换为 `csstsAtom.displayFlex`

**解决方案：全局常量声明**

生成的 `.d.ts` 文件将每个原子类声明为全局常量：

```typescript
// node_modules/@types/cssts/index.d.ts
declare const displayFlex: { 'display_flex': true };
declare const displayBlock: { 'display_block': true };
declare const paddingTop16px: { 'padding-top_16px': true };
// ... 所有原子类
```

**这样设计的好处：**

1. **IDE 自动补全** - 用户在 `css { }` 中输入时，IDE 会提示所有已声明的全局常量
2. **类型安全** - 如果用户写了不存在的原子类名（如 `deephahah`），IDE 不会提示，用户立即知道这不是有效的原子类
3. **编译时验证** - 编译器可以通过检查标识符是否匹配已知原子类来决定是否转换
4. **统一的数据源** - IDE 提示和编译转换使用同一份类型定义，保证一致性

**工作流程：**

```
用户输入 displayFlex
    ↓
IDE 识别为全局常量，提供补全和类型检查
    ↓
编译器识别为原子类名，转换为 csstsAtom.displayFlex
    ↓
运行时从虚拟模块获取 { 'display_flex': true }
```

### 生成逻辑详解

#### 1. 原子类定义结构

每个原子类由 `AtomDefinition` 描述：

```typescript
interface AtomDefinition {
  name: string;      // 原子类名称 (camelCase)，如 'displayFlex'
  property: string;  // CSS 属性名 (kebab-case)，如 'display'
  value: string;     // CSS 值，如 'flex'
  unit?: string;     // 单位（可选），如 'px'
  number?: number;   // 数值（可选），如 16
}
```

#### 2. 原子类名生成规则

```typescript
// 属性名 (camelCase) + 值 (PascalCase)
atomName = propertyName + formatValue(value)

// 示例：
// display + Flex → displayFlex
// paddingTop + 16px → paddingTop16px
// opacity + 0.9 → opacity0p9 (小数点转 p)
// width + 50% → width50pct (百分号转 pct)
// zIndex + -1 → zIndexN1 (负数前缀 N)
```

#### 3. CSS 类名生成规则

```typescript
// 属性名 (kebab-case) + 分隔符 + 值
cssClassName = `${property}_${value}`

// 示例：
// display_flex
// padding-top_16px
// opacity_0.9
// width_50%
// z-index_-1
```

#### 4. 全局常量声明生成

`generateDts()` 函数遍历所有原子类，生成全局常量声明：

```typescript
// atom-generator.ts 中的 generateDts 函数
export function generateDts(options?: GeneratorOptions): string {
  const atoms = generateAtoms(options);
  
  const lines: string[] = [
    '/**',
    ' * CSSTS 原子类全局常量声明（自动生成）',
    ' * ',
    ' * 这些全局常量用于 css { } 语法中的 IDE 自动补全',
    ' */',
    '',
  ];
  
  for (const atom of atoms) {
    // 生成 CSS 类名：property_value
    const cssClassName = `${atom.property}_${atom.value}`;
    // 生成全局常量声明
    lines.push(`declare const ${atom.name}: { '${cssClassName}': true };`);
  }
  
  lines.push('');
  return lines.join('\n');
}
```

#### 5. 文件写入

`generateDtsFiles()` 函数将生成的内容写入文件：

```typescript
// dts-writer.ts
export function generateDtsFiles(options?: DtsGenerateOptions): DtsGenerateResult {
  const { outputDir = 'node_modules/@types/cssts' } = options ?? {};
  
  // 1. 生成 package.json
  const packageJson = { name: '@types/cssts', version: '0.0.0', types: 'index.d.ts' };
  fs.writeFileSync(path.join(outputDir, 'package.json'), JSON.stringify(packageJson, null, 2));
  
  // 2. 生成 index.d.ts（全局常量声明）
  const dtsContent = generateDts(options);
  fs.writeFileSync(path.join(outputDir, 'index.d.ts'), dtsContent, 'utf-8');
  
  return { files: [...], atomCount: atoms.length };
}
```

#### 6. Vite 插件调用

Vite 插件在 `configResolved` 钩子中调用生成函数：

```typescript
// vite-plugin-cssts/src/index.ts
import { generateDtsFiles } from 'cssts-compiler'

configResolved(resolvedConfig) {
  if (enableDts) {
    const outputDir = path.join(config.root, 'node_modules/@types/cssts');
    generateDtsFiles({ outputDir });
  }
}
```

### API

```typescript
import { generateAtoms, generateDts, generateDtsFiles, generateStats } from 'cssts-compiler'

// 生成原子类定义数组
const atoms = generateAtoms({ config: userConfig })

// 生成 DTS 文件内容（全局常量声明格式）
const dtsContent = generateDts({ config: userConfig })

// 生成 DTS 文件到指定目录
generateDtsFiles({ outputDir: 'node_modules/@types/cssts' })

// 生成统计信息
const stats = generateStats({ config: userConfig })
console.log(`总原子类数: ${stats.totalAtoms}`)
```

### 生成文件结构

```
node_modules/@types/cssts/
├── package.json        # { "name": "@types/cssts", "types": "index.d.ts" }
└── index.d.ts          # 全局原子类常量声明
```

**只生成一个类型文件**，包含所有原子类的全局常量声明：

```typescript
// node_modules/@types/cssts/index.d.ts
/**
 * CSSTS 原子类全局常量声明（自动生成）
 * 
 * 这些全局常量用于 css { } 语法中的 IDE 自动补全
 */

declare const displayFlex: { 'display_flex': true };
declare const displayBlock: { 'display_block': true };
declare const paddingTop16px: { 'padding-top_16px': true };
// ... 约 29000+ 个原子类
```

**不需要的东西：**
- ❌ `CsstsAtoms` 接口 - 用户不直接使用 `csstsAtom.xxx`，编译器自动转换
- ❌ `declare module 'virtual:csstsAtom'` - 虚拟模块运行时由 Vite 提供，不需要类型声明
- ❌ `declare module 'virtual:cssts.css'` - 同理

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
declare const top0: { 'top_0': true };      // ✅ 只生成一个
declare const top1px: { 'top_1px': true };
declare const top1em: { 'top_1em': true };
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

### 数据映射设计

所有 `*_NAME_MAP` 的 key 统一使用 `camelCase`，value 为原始的 `kebab-case`：

```typescript
// 所有 NAME_MAP 统一格式：camelCase → kebab-case
CSS_PROPERTY_NAME_MAP = {
  'backgroundColor': 'background-color',
  'fontSize': 'font-size',
}

KEYWORD_NAME_MAP = {
  'crispEdges': 'crisp-edges',
  'mozBox': '-moz-box',
}

COLOR_NAME_MAP = {
  'transparent': 'transparent',
  'aliceblue': 'aliceblue',
}

PSEUDO_CLASS_NAME_MAP = {
  'focusVisible': 'focus-visible',
  'firstChild': 'first-child',
}

PSEUDO_ELEMENT_NAME_MAP = {
  'firstLine': 'first-line',
  'fileSelectorButton': 'file-selector-button',
}
```

**设计原因：**

1. **数据源格式**：csstree 和其他数据源的原始数据格式是 `kebab-case`
2. **TypeScript 使用**：在 TypeScript 中使用 `camelCase` 作为变量名
3. **查找流程**：
   - 遍历数据源时获取 `kebab-case` 格式的原始数据
   - 将 `kebab-case` 转换为 `camelCase`
   - 用 `camelCase` 作为 key 查找 Map
   - 获取对应的原始 `kebab-case` 值用于生成 CSS

```typescript
// 使用示例
const kebabKeyword = 'crisp-edges';           // 原始数据（来自 csstree）
const camelKey = kebabToCamel(kebabKeyword);  // 转换为 'crispEdges'
const original = KEYWORD_NAME_MAP[camelKey];  // 查找得到 'crisp-edges'

// 生成原子类时
const atomName = `display${camelKey}`;        // 'displayCrispEdges'
const cssValue = original;                     // 'crisp-edges'
```

**统一设计的好处：**

- 所有 Map 使用相同的 key 格式，减少混淆
- 查找逻辑一致：先转 camelCase，再查 Map
- 便于去重：相同 camelCase 的不同 kebab-case 会被自动去重

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
tsx generator/generator-data.ts
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
tsx generator/generator-type.ts
```

输出到 `src/types/`：
- `cssPropertyConfig.d.ts` - 属性配置类型
- `csstsConfig.d.ts` - CSSTS 配置类型

### 执行顺序

```bash
# 1. 先生成数据文件
tsx generator/generator-data.ts

# 2. 再生成类型文件
tsx generator/generator-type.ts
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
