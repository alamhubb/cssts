# Generator 数据生成脚本

> 把 CSS 规范数据"编译"成 cssts-compiler 能理解的 TypeScript 代码

## 🎯 这是什么？

**Generator 生成的是 cssts-compiler 自身的源代码（CSS 知识库）**，而不是用户项目中的类型提示。

### Generator vs DTS 的区别

| 维度 | `generator/`（本目录） | `dts/` |
|------|----------------------|--------|
| **生成什么** | 编译器**源代码** | 用户的**IDE 类型提示** |
| **输出位置** | `cssts-compiler/src/data/` | `用户项目/node_modules/@types/cssts-ts/` |
| **谁执行** | cssts-compiler 开发者（你） | vite-plugin-cssts 自动执行 |
| **用户需要吗** | ❌ 用户永远不需要 | ❌ 用户也不需要（自动执行） |

### 本质理解

```
Generator 的作用：
把 W3C 的 CSS 规范（csstree）→ 编译成 TypeScript 代码 → 让编译器知道"世界上有哪些 CSS"

DTS 的作用：
读取编译器内置的 CSS 知识 → 根据用户配置 → 生成 IDE 类型提示
```

---

## ⚠️ 重要提示

**用户和普通开发不需要执行这些脚本！** 只有在以下情况才需要运行：

1. 升级 csstree 库版本（CSS 规范更新）
2. 修改 datajson/*.json 配置
3. 添加新的伪类/伪元素支持
4. 修改单位分类映射

---

## 📁 目录结构

```
generator/
├── datajson/                      # 原始数据（手动维护）
│   ├── numberMapping.json         # 单位→分类映射
│   ├── pseudo-standards.json      # 伪类/伪元素列表
│   └── propertyInheritance.json   # 属性继承关系
├── generator-data.ts              # 数据生成脚本 → src/data/
└── generator-type.ts              # 类型生成脚本 → src/config/types/
```

---

## 🔗 数据流向

```
┌─────────────────┐     ┌─────────────────┐
│    csstree      │     │   datajson/     │
│  (npm 库)       │     │  (手动维护)      │
└────────┬────────┘     └────────┬────────┘
         │                       │
         └───────────┬───────────┘
                     ▼
          ┌─────────────────────┐
          │ generator-data.ts   │
          │ (tsx 执行)           │
          └──────────┬──────────┘
                     ▼
          ┌─────────────────────┐
          │    src/data/        │
          │  (自动生成 .ts)      │
          └──────────┬──────────┘
                     ▼
          ┌─────────────────────┐
          │ generator-type.ts   │
          │ (tsx 执行)           │
          └──────────┬──────────┘
                     ▼
          ┌─────────────────────┐
          │ src/config/types/   │
          │ (自动生成 .d.ts)     │
          └─────────────────────┘
```

### 完整流程：开发者 → 用户

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    开发者维护编译器时（generator/）                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   csstree (npm) + datajson/                                                │
│         │                                                                   │
│         ▼                                                                   │
│   generator-data.ts  →  src/data/*.ts（编译器的CSS知识库）                    │
│         │                                                                   │
│         ▼                                                                   │
│   generator-type.ts  →  src/config/types/*.d.ts（配置的类型定义）             │
│         │                                                                   │
│         ▼                                                                   │
│   npm publish cssts-compiler（发布到 npm）                                  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                    用户使用时（Vite 启动，dts/ 自动执行）                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   cssts-compiler（已发布的包，包含 src/data/*.ts）                           │
│         │                                                                   │
│         ▼                                                                   │
│   dts/atom-generator.ts（读取 src/data/ + 用户配置）                        │
│         │                                                                   │
│         ▼                                                                   │
│   generateDtsFiles()  →  node_modules/@types/cssts-ts/index.d.ts           │
│                          （用户项目的 IDE 类型提示）                          │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ 执行方法

```bash
cd cssts/cssts/cssts-compiler

# 1. 先生成数据文件
tsx generator/generator-data.ts

# 2. 再生成类型文件
tsx generator/generator-type.ts
```

**必须按顺序执行**，因为 `generator-type.ts` 依赖 `src/data/` 的内容。

---

## 📄 datajson/ 文件说明

### numberMapping.json

定义单位分类映射：

```json
{
  "numberTypeToCategories": {
    "length": ["pixel", "fontRelative", "viewportPercentage"]
  },
  "categoryUnits": {
    "pixel": ["px"],
    "fontRelative": ["em", "rem"]
  }
}
```

**用途**：决定哪些单位属于哪个分类

### pseudo-standards.json

定义伪类和伪元素：

```json
{
  "pseudoClasses": ["hover", "focus", "active"],
  "pseudoElements": ["before", "after", "placeholder"]
}
```

**用途**：生成 `$$hover`、`$$before` 等伪类语法支持

### propertyInheritance.json

定义属性简写继承：

```json
{
  "m": ["margin"],
  "mx": ["marginLeft", "marginRight"],
  "p": ["padding"]
}
```

**用途**：用于组合原子类生成（如 `mx10px` → `marginLeft: 10px; marginRight: 10px`）

---

## 📦 生成的文件

### src/data/ (由 generator-data.ts 生成)

| 文件 | 内容 |
|------|------|
| `cssPropertyNameMapping.ts` | CSS 属性 camelCase → kebab-case 映射 |
| `cssKeywordsData.ts` | CSS 关键字（flex, block, auto...） |
| `cssColorData.ts` | 颜色数据（red, blue, transparent...） |
| `cssPseudoData.ts` | 伪类/伪元素（hover, focus...） |
| `cssNumberData.ts` | 单位和分类（px, em, %...） |
| `cssPropertyKeywords.ts` | 属性→关键字映射 |
| `cssPropertyNumber.ts` | 属性→数值分类映射 |
| `cssPropertyColorTypes.ts` | 属性→颜色类型映射 |
| `cssPropertyInheritance.ts` | 属性继承关系 |

### src/config/types/

| 文件 | 来源 | 内容 |
|------|------|------|
| `cssPropertyConfig.d.ts` | 🤖 自动生成 | CSS 属性配置类型定义 |
| `csstsConfig.d.ts` | ✋ **手动维护** | CsstsConfig / CsstsCompilerConfig 接口 |

> **注意**：`csstsConfig.d.ts` 现在是**手动维护**的，包含配置层次设计：
> - `CsstsConfig`: 核心业务配置（控制"生成什么原子类"）
> - `CsstsCompilerConfig`: 编译器配置（继承业务配置 + 添加 dts、debug 等构建配置）

---

## ⏰ 何时执行

| 场景 | 需要执行 |
|------|---------|
| 修改解析/转换逻辑 | ❌ 不需要 |
| 修改 CSS 生成逻辑 | ❌ 不需要 |
| 升级 csstree 版本 | ✅ 执行两个脚本 |
| 修改 datajson/*.json | ✅ 执行两个脚本 |
| 添加新伪类支持 | ✅ 修改 pseudo-standards.json 后执行 |
| 修改配置接口设计 | ❌ 手动编辑 csstsConfig.d.ts |

---

## ⚠️ 注意事项

1. **不要手动编辑 `src/data/*.ts`** - 会被覆盖
2. **不要手动编辑 `src/config/types/cssPropertyConfig.d.ts`** - 会被覆盖
3. **`src/config/types/csstsConfig.d.ts` 是手动维护的** - 不会被覆盖
4. **执行后验证** - 运行 `npm run build` 确保没有类型错误

