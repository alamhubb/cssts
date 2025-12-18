# CSS Types 模块设计文档

## 目录结构

```
src/css-types/
├── custom/                        # ✏️ 手动维护（只有数据）
│   ├── unit-categories.ts         # 单位分类定义
│   ├── number-type-mapping.ts     # numberType → unitCategory 映射
│   ├── system-colors.ts           # 系统颜色
│   ├── pseudo-descriptions.ts     # 伪类/伪元素描述
│   └── index.ts
│
├── config/                        # ⚙️ 自动生成（csstree + custom）
│   ├── colors.ts                  # 颜色配置
│   ├── units.ts                   # 单位配置
│   ├── keywords.ts                # 属性关键字
│   ├── pseudo.ts                  # 伪类/伪元素
│   ├── property-config.ts         # 属性配置类
│   └── index.ts
│
├── scripts/                       # 🔧 生成脚本
│   └── generate-config.ts         # 生成 config/ 的脚本
│
├── utils.ts                       # 工具函数
├── cssts-config.ts                # 用户配置类
├── config-utils.ts                # 配置工具函数
└── index.ts                       # 统一导出
```

## 设计原则

1. **custom/** - 只包含数据定义，不包含函数
2. **config/** - 自动生成，合并 csstree + custom
3. **scripts/** - 生成脚本，统一管理
4. **utils.ts** - 工具函数，基于 custom/config 数据

## 运行生成脚本

```bash
npx tsx src/css-types/scripts/generate-config.ts
```

## 映射链

```
CSS 属性 → numberTypes → unitCategories → units → 数值
   ↓           ↓              ↓            ↓        ↓
 width    [length, %]    [pixel, ...]    [px, em]  [1, 2, 4, 8...]
```

## 文件维护说明

| 目录/文件 | 维护方式 | 内容 |
|-----------|----------|------|
| `custom/*` | 手动 | 只有数据定义 |
| `config/*` | 自动生成 | csstree + custom 合并 |
| `scripts/*` | 手动 | 生成脚本 |
| `utils.ts` | 手动 | 工具函数 |
| `cssts-config.ts` | 手动 | 用户配置类 |
