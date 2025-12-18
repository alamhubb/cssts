 # CSSTS Compiler 配置指南

本文档说明 cssts-compiler 的配置系统、数据来源和实现原理。

## 目录

- [数据来源架构](#数据来源架构)
- [CSS 数据（关键字）](#css-数据关键字)
- [数值配置](#数值配置)
- [伪类配置](#伪类配置)
- [配置合并逻辑](#配置合并逻辑)
- [脚本工具](#脚本工具)

---

## 数据来源架构

原子类的生成依赖两种数据来源：

```
┌─────────────────────────────────────────────────────────────┐
│                    原子类生成流程                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  css-data.json (预生成)          config.ts (手动配置)        │
│  ┌─────────────────────┐        ┌─────────────────────┐    │
│  │ CSS 属性关键字       │        │ 数值单位配置         │    │
│  │ - display: flex     │        │ - width: px/rem/%   │    │
│  │ - position: absolute│        │ - padding: px/rem   │    │
│  │ - overflow: hidden  │        │ - z-index: unitless │    │
│  └─────────────────────┘        └─────────────────────┘    │
│           │                              │                  │
│           └──────────┬───────────────────┘                  │
│                      ▼                                      │
│              ┌───────────────┐                              │
│              │ generateAtoms │                              │
│              │  ~53000 个    │                              │
│              └───────────────┘                              │
└─────────────────────────────────────────────────────────────┘
```

| 数据类型 | 来源 | 文件 | 说明 |
|---------|------|------|------|
| **关键字值** | css-tree 预生成 | `src/data/css-data.json` | `display: flex`, `position: absolute` |
| **数值配置** | 手动定义 | `src/generator/config.ts` | `width: 100px`, `padding: 16px` |
| **伪类配置** | 手动定义 | `src/generator/pseudo-config.ts` | `hover`, `active`, `disabled` |

---

## CSS 数据（关键字）

### 数据文件

位置：`src/data/css-data.json`

```json
{
  "generatedAt": "2025-12-17T...",
  "csstreeVersion": "3.1.0",
  "properties": [
    {
      "name": "display",
      "keywords": ["block", "flex", "grid", "inline", "none", ...]
    },
    {
      "name": "position",
      "keywords": ["absolute", "fixed", "relative", "static", "sticky"]
    }
  ],
  "pseudoClasses": ["hover", "active", "focus", ...],
  "pseudoElements": ["before", "after", ...]
}
```

### 生成方式

**手动触发**（不是每次构建自动执行）：

```bash
cd cssts/cssts-compiler
npx tsx scripts/extract-css-data.ts
```

### 为什么预生成？

1. **性能**：避免每次启动都从 css-tree 解析语法树
2. **稳定性**：数据固定，不受 css-tree 版本变化影响
3. **可控性**：可以手动审查和调整数据

### 更新时机

- 升级 css-tree 版本后
- 需要支持新的 CSS 属性时

---

## 数值配置

### 配置文件

位置：`src/generator/config.ts`

### 单位类型

```typescript
type UnitType = 'zero' | 'px' | 'rem' | 'ratio' | 'deg' | 'ms' | 'fr' | 'unitless'
```

| 单位 | CSS 后缀 | 说明 |
|------|---------|------|
| `px` | `px` | 像素 |
| `rem` | `rem` | 相对单位 |
| `ratio` | `%` | 百分比 |
| `deg` | `deg` | 角度 |
| `ms` | `ms` | 毫秒 |
| `fr` | `fr` | Grid 分数单位 |
| `unitless` | (无) | 无单位数值 |
| `zero` | (特殊) | 是否生成 0 值 |

### 单位配置结构

```typescript
interface UnitConfig {
  min?: number      // 最小值（默认由 systemDefaults 提供）
  max?: number      // 最大值
  step?: number     // 步长（不设置则用渐进步长）
  presets?: number[] // 额外预设值
  negative?: boolean // 是否支持负数
}
```

### 属性配置示例

```typescript
const defaultProperties = {
  // 尺寸属性：支持 px、rem、百分比
  width: { zero: true, px: { max: 10000 }, rem: {}, ratio: {} },
  
  // 边距属性：支持负数
  margin: { 
    zero: true, 
    px: { max: 10000, negative: true }, 
    rem: { negative: true } 
  },
  
  // 边框宽度：只支持 px，最大 20
  'border-width': { zero: true, px: { max: 20 } },
  
  // z-index：无单位数值
  'z-index': { unitless: { max: 9999, negative: true } },
  
  // 透明度：0-1 的小数
  opacity: { unitless: { min: 0, max: 1, step: 0.1 } },
}
```

### 数值生成逻辑

位置：`src/generator/value-generator.ts`

**渐进步长算法**（当未指定 step 时）：

```typescript
// 根据数值大小自动调整步长
function getProgressiveStep(value: number): number {
  if (value < 10) return 1
  if (value < 100) return 5
  if (value < 500) return 10
  if (value < 1000) return 50
  return 100
}
```

**生成示例**：
- `padding: 1px, 2px, 3px, ..., 10px, 15px, 20px, ..., 100px, 150px, 200px`
- `opacity: 0, 0.1, 0.2, ..., 1`

### 配置优先级

```
属性配置 > 全局默认配置 > 系统内置默认值
```

```typescript
// 1. 系统内置默认值（最低优先级）
const systemDefaults = {
  px: { min: 1, max: 10000 },
  rem: { min: 0.25, max: 50, step: 0.25 },
  // ...
}

// 2. 全局默认配置
const config: CsstsConfig = {
  defaults: {
    px: { max: 500 },  // 覆盖系统默认
  },
  properties: {
    // 3. 属性配置（最高优先级）
    width: { px: { max: 2000 } },  // 覆盖全局默认
  }
}
```

---

## 伪类配置

### 配置类

位置：`src/generator/pseudo-config.ts`

```typescript
class PseudoUtilsConfig {
  // 默认值直接可见
  hover: PseudoStyleValue = { opacity: '0.9' }
  active: PseudoStyleValue = { opacity: '0.6' }
  focus: PseudoStyleValue = { opacity: '0.9' }
  disabled: PseudoStyleValue = [
    { opacity: '0.5' },
    { cursor: 'not-allowed' }
  ]
  // ...
}
```

### 使用方式

```typescript
// 使用默认配置
const config = new PseudoUtilsConfig()

// 自定义配置
const config = new PseudoUtilsConfig({
  hover: { opacity: '0.8', transform: 'scale(1.02)' },
  active: [
    { opacity: '0.6' },
    { transform: 'scale(0.98)' }
  ]
})
```

### 伪类语法

在代码中使用双美元符号 `$$` 分隔伪类：

```typescript
// ⚠️ 重要：伪类分隔符是 $$（双美元符号）
const button$$hover$$active = css { 
  backgroundColorBlue, 
  colorWhite 
}
```

### 支持的伪类

```typescript
// 常用伪类
const COMMON_PSEUDO_CLASSES = [
  'hover', 'active', 'focus', 'focus-visible', 'focus-within',
  'disabled', 'enabled', 'checked', 'valid', 'invalid',
  'required', 'optional', 'read-only', 'read-write',
  'first-child', 'last-child', 'empty'
]

// 所有 CSS 伪类（60 个）
const ALL_PSEUDO_CLASSES = cssData.pseudoClasses
```

---

## 配置合并逻辑

### 合并函数

```typescript
import { mergeConfig, createConfig, defaultConfig } from 'cssts-compiler'

// 基于默认配置创建自定义配置
const myConfig = createConfig({
  properties: {
    // 只覆盖需要修改的属性
    width: { px: { max: 2000 } },
  }
})

// 或手动合并
const merged = mergeConfig(defaultConfig, userConfig)
```

### 深度合并规则

1. **defaults**：字段级合并
2. **properties**：属性级合并，每个单位配置也会合并

```typescript
// 基础配置
{ properties: { width: { px: { max: 1000 }, rem: {} } } }

// 用户配置
{ properties: { width: { px: { max: 2000 } } } }

// 合并结果
{ properties: { width: { px: { max: 2000 }, rem: {} } } }
// rem 配置被保留，px.max 被覆盖
```

---

## 脚本工具

### 提取 CSS 数据

```bash
npx tsx scripts/extract-css-data.ts
```

从 css-tree 提取 CSS 属性和关键字，生成：
- `src/data/css-data.json` - 数据文件
- `src/data/css-data.d.ts` - 类型定义

### 一致性验证

```bash
npx tsx scripts/verify-consistency.ts
```

对比新版本（预生成数据）和旧版本（css-tree 动态获取）的生成结果，确保一致。

---

## 扩展配置

### 添加新属性

在 `config.ts` 的 `defaultProperties` 中添加：

```typescript
export const defaultProperties = {
  // ... 现有属性
  
  // 添加新属性
  'my-custom-property': { 
    zero: true, 
    px: { max: 100 }, 
    rem: { max: 10 } 
  },
}
```

### 添加新伪类

在 `pseudo-config.ts` 的 `PseudoUtilsConfig` 类中添加：

```typescript
class PseudoUtilsConfig {
  // ... 现有伪类
  
  // 添加新伪类
  'my-pseudo'?: PseudoStyleValue = { opacity: '0.8' }
}
```

### 更新 CSS 数据

1. 升级 css-tree 版本
2. 运行 `npx tsx scripts/extract-css-data.ts`
3. 运行 `npx tsx scripts/verify-consistency.ts` 验证
4. 提交更新的 `css-data.json`
