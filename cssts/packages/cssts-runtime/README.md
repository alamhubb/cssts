# cssts-runtime

> CssTs 运行时 - 样式合并与冲突处理

## 核心设计理念

`cssts-runtime` 是一个**真正零依赖**的运行时包：

- ❌ **不需要** `properties.json`
- ❌ **不需要** `initProperties()` 初始化
- ❌ **不需要** `getCssClassName()` 转换
- ✅ **只做**对象合并和字符串分割

## 架构

```
┌─────────────────────────────────────────────────────────────────┐
│                        编译时                                    │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  vite-plugin-cssts                                       │   │
│  │                                                          │   │
│  │  1. 解析 css { displayFlex, colorRed } 语法              │   │
│  │  2. 解析变量名中的 $$ 伪类标记                           │   │
│  │  3. 生成 csstsAtom 虚拟文件                              │   │
│  │  4. 生成 CSS（包含伪类样式）                             │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                        运行时                                    │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  cssts-runtime                                           │   │
│  │                                                          │   │
│  │  CSSTS_SEPARATOR = '_'  ← 分隔符常量                     │   │
│  │  $cls()                 ← 纯对象合并                     │   │
│  │  replace()              ← 解析属性，智能替换             │   │
│  │                                                          │   │
│  │  ⚠️ 不需要 properties.json                               │   │
│  │  ⚠️ 不需要 initProperties()                              │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

## 分隔符常量

```typescript
// runtime 定义分隔符，compiler 导入使用
export const CSSTS_SEPARATOR = '_'
```

**重要**：分隔符由 runtime 定义，compiler 从 runtime 导入使用，保证编译时和运行时一致。

## 安装

```bash
npm install cssts-runtime
```

## 核心 API

### CSSTS_SEPARATOR - 分隔符常量

```typescript
import { CSSTS_SEPARATOR } from 'cssts-runtime'

CSSTS_SEPARATOR  // '_'
```

### $cls - 样式合并

纯对象合并，不做任何转换：

```typescript
import { $cls } from 'cssts-runtime'

const style = $cls(
  csstsAtom.displayFlex,
  csstsAtom.alignItemsCenter,
  csstsAtom.gap16px
)
// 返回: { 'display_flex': true, 'align-items_center': true, 'gap_16px': true }
```

### replace - 样式替换

通过字符串分割提取属性名，检测冲突并替换：

```typescript
import { replace } from 'cssts-runtime'

const style = { 'color_red': true, 'font-weight_bold': true }
const newStyle = replace(style, csstsAtom.colorBlue)
// 返回: { 'color_blue': true, 'font-weight_bold': true }
```

### replaceAll - 批量替换

```typescript
import { replaceAll } from 'cssts-runtime'

const style = { 'color_red': true, 'font-size_14px': true }
const newStyle = replaceAll(style, [
  csstsAtom.colorBlue,
  csstsAtom.fontSize16px
])
// 返回: { 'color_blue': true, 'font-size_16px': true }
```

## 类名格式

| 类型 | 格式 | 示例 |
|------|------|------|
| Atom | `{property}_{value}` | `color_red`, `display_flex` |
| GroupUtil | 自定义名 | `clickable`, `buttonBase` |

## 命名规范

| TS 变量名 | CSS 类名 | CSS 规则 |
|-----------|----------|----------|
| `displayFlex` | `display_flex` | `display: flex` |
| `paddingTop16px` | `padding-top_16px` | `padding-top: 16px` |
| `opacity0p9` | `opacity_0.9` | `opacity: 0.9` |
| `width50pct` | `width_50%` | `width: 50%` |
| `zIndexN1` | `z-index_-1` | `z-index: -1` |

## 许可证

MIT
