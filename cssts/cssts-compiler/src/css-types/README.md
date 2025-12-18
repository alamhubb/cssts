# CSS Types 模块

CSS 类型系统的核心配置模块，提供单位、颜色、伪类等 CSS 类型的定义和映射。

## 目录结构

```
src/css-types/
├── custom/                    # ✏️ 手动维护 - 自定义分类/映射逻辑
│   ├── unit-categories.ts     # 单位分类定义（按步长特性分组）
│   ├── number-type-mapping.ts # numberType → unitCategory 映射
│   ├── system-colors.ts       # CSS 系统颜色
│   └── index.ts
├── data/                      # 📦 从 csstree 提取 - 原始数据
│   ├── colors.ts              # 命名颜色列表
│   ├── pseudo.ts              # 伪类/伪元素列表
│   ├── units.ts               # 单位列表
│   └── index.ts
├── descriptions/              # 📝 手动维护 - 中英文描述
│   ├── pseudo.ts              # 伪类/伪元素描述
│   ├── units.ts               # 单位分类描述
│   ├── number-types.ts        # 数值类型描述
│   ├── system-colors.ts       # 系统颜色描述
│   └── index.ts
├── config/                    # ⚙️ 自动生成 - 综合配置
│   ├── colors.ts              # 颜色配置（data + custom）
│   ├── units.ts               # 单位配置（data + custom + descriptions）
│   ├── pseudo.ts              # 伪类配置（data + descriptions）
│   ├── keywords.ts            # 属性关键字
│   ├── property-config.ts     # 属性配置
│   └── index.ts
├── scripts/                   # 🔧 生成脚本
│   └── generate-config.ts
├── utils.ts                   # 工具函数
├── cssts-config.ts            # 用户配置类
├── config-utils.ts            # 配置工具函数
└── index.ts
```

## 四个包的职责

### 1. custom/ - 自定义分类逻辑（手动维护）

我们自定义的分类和映射逻辑，这些是 csstree 没有的：

- `unit-categories.ts` - 按步长特性将单位分组（pixel、fontRelative、percentage 等）
- `number-type-mapping.ts` - numberType 到 unitCategory 的映射
- `system-colors.ts` - CSS 系统颜色（csstree 没有）

### 2. data/ - 原始数据（从 csstree 提取）

从 csstree 提取的原始 CSS 数据，方便理解和参考：

- `colors.ts` - 命名颜色列表
- `pseudo.ts` - 伪类/伪元素列表
- `units.ts` - 单位列表

### 3. descriptions/ - 中英文描述（手动维护）

各种 CSS 类型的中英文描述，用于文档和智能提示：

- `pseudo.ts` - 伪类/伪元素描述
- `units.ts` - 单位分类描述
- `number-types.ts` - 数值类型描述
- `system-colors.ts` - 系统颜色描述

### 4. config/ - 综合配置（自动生成）

组合 data/、custom/、descriptions/ 生成的最终配置：

- `colors.ts` - 命名颜色 + 系统颜色
- `units.ts` - 单位配置 + 分类映射 + 反向映射
- `pseudo.ts` - 伪类列表 + 描述

## 核心概念

### 映射链

```
属性 → numberTypes → unitCategories → units → 数值
```

例如：
- `width` 属性支持 `length` 和 `percentage` 类型
- `length` 映射到 `['pixel', 'fontRelative', 'physical', 'percentage']` 分类
- `pixel` 分类包含 `['px']` 单位
- 最终生成 `0, 1px, 2px, 4px, 8px, ...` 数值序列

### 零值处理

`0` 值由系统自动处理（通过 `allowZero` 配置），不作为单独的分类。
在 CSS 中，`0` 对所有数值类型都有效，是通用规则。

## 使用方式

```typescript
import { 
  unitsByCategory,
  numberTypeToCategories,
  CATEGORY_BY_UNIT,
  ALL_COLORS,
  PSEUDO_CLASSES,
} from './css-types';

// 获取分类下的单位
unitsByCategory.pixel  // => ['px']
unitsByCategory.fontRelative  // => ['em', 'rem', 'ch', ...]

// 获取 numberType 对应的分类
numberTypeToCategories.length  // => ['pixel', 'fontRelative', 'physical', 'percentage']

// 根据单位查找分类
CATEGORY_BY_UNIT['px']  // => 'pixel'
CATEGORY_BY_UNIT['em']  // => 'fontRelative'
```

## 重新生成配置

```bash
npx tsx src/css-types/scripts/generate-config.ts
```
