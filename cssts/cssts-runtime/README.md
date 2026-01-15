# cssts (cssts-runtime)

> CssTs 运行时 - 样式合并、冲突处理、分隔符配置

## ⚠️ 重要：伪类分隔符是双美元符号 `$$`

```typescript
// ✅ 正确：使用双美元符号 $$
const btn$$hover$$active = css { cursorPointer }

// ❌ 错误：使用单美元符号 $（伪类不会生效！）
const btn$hover$active = css { cursorPointer }

// 查看配置
import { CSSTS_CONFIG } from 'cssts-ts'
console.log(CSSTS_CONFIG.PSEUDO_SEPARATOR)  // '$$'
```

## 重要说明

**包名是 `cssts`**，不是 `cssts-runtime`（目录名和包名不一致）。

```typescript
// ✅ 正确
import { cssts, CSSTS_CONFIG } from 'cssts-ts'

// ❌ 错误
import { cssts } from 'cssts-runtime'  // 包名不存在
```

## 核心设计理念

`cssts` 是一个**真正零依赖**的运行时包：

- ❌ **不需要** `properties.json`
- ❌ **不需要** `initProperties()` 初始化
- ❌ **不需要** `getCssClassName()` 转换
- ✅ **只做**对象合并和字符串分割
- ✅ **提供**全局分隔符配置

## 分隔符配置

`CSSTS_CONFIG` 是全局统一的分隔符配置，compiler 和 runtime 共用：

```typescript
import { CSSTS_CONFIG } from 'cssts-ts'

// 分隔符配置对象
CSSTS_CONFIG = {
  SEPARATOR: '_',         // CSS 类名分隔符：property_value
  PSEUDO_SEPARATOR: '$$'  // 伪类分隔符：baseName$$pseudo（双美元符号）
}

// 使用
CSSTS_CONFIG.SEPARATOR        // '_'
CSSTS_CONFIG.PSEUDO_SEPARATOR // '$$'
```

**重要**：分隔符由 runtime 定义，compiler 从 runtime 导入使用，保证编译时和运行时一致。

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
│  │  cssts (包名)                                            │   │
│  │                                                          │   │
│  │  CSSTS_CONFIG.SEPARATOR        ← 分隔符配置              │   │
│  │  CSSTS_CONFIG.PSEUDO_SEPARATOR ← 伪类分隔符（$$）        │   │
│  │  $cls()                        ← 纯对象合并              │   │
│  │  replace()                     ← 解析属性，智能替换      │   │
│  │                                                          │   │
│  │  ⚠️ 不需要 properties.json                               │   │
│  │  ⚠️ 不需要 initProperties()                              │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

## 安装

```bash
npm install cssts
```

## 核心 API

### CSSTS_CONFIG - 分隔符配置

```typescript
import { CSSTS_CONFIG } from 'cssts-ts'

CSSTS_CONFIG.SEPARATOR        // '_'   - 类名分隔符
CSSTS_CONFIG.PSEUDO_SEPARATOR // '$$'  - 伪类分隔符（双美元符号）
```

### merge - 样式合并

核心合并函数，支持同属性去重：

```typescript
import { cssts } from 'cssts-ts'

// 基础合并
const style = cssts.merge(
  csstsAtom.displayFlex,
  csstsAtom.colorRed,
  csstsAtom.colorBlue  // 同属性，会替换 colorRed
)
// 返回: { 'display_flex': true, 'color_blue': 'color' }
```

**合并规则**：
- 有属性的类名（value 是 string）：同属性只保留最后一个
- 无属性的类名（value 是 true）：全部保留
- 返回值兼容 Vue `:class` 绑定（truthy 值会添加类名）

### classGroup 类组合

预定义的类组合，直接在 `css {}` 中使用：

```typescript
// 使用 click 类组合
const buttonStyle = css { 
  padding16px, 
  backgroundColorBlue,
  click  // 包含 hover/active/focus/disabled 效果 + cursor: pointer
}

// 使用 ddClick（继承 click + colorRed）
const redBtn = css { ddClick, padding10px }
```

**注意**：classGroup 的类名在 merge 结果中值为 `true`（不参与同属性替换）。

## 伪类语法

使用 `$$` 双美元符号分隔伪类：

```typescript
// 变量名
const btn$$hover$$active = css { cursorPointer }

// 生成的 CSS
// .btn:hover { filter: brightness(1.15); }
// .btn:active { filter: brightness(0.85); }
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
