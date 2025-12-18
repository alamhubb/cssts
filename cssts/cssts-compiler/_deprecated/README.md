# 过时文件目录

此目录包含已被新代码替代的过时文件，可以安全删除。

## 过时原因

### generator/ 目录（旧的兼容层）
- `atom-generator.ts` - 被 `src/generator-dts/atom-generator.ts` 替代
- `config.ts` - 被 `src/cssts-config.ts` 替代
- `dts-generator.ts` - 被 `src/generator-dts/dts-generator.ts` 替代
- `index.ts` - 兼容层，重新导出新代码
- `value-generator.ts` - 功能已整合到 `src/generator-dts/atom-generator.ts`

### scripts/ 目录（旧的根目录脚本）
- `extract-css-data-v4.ts` - 被 `src/generator-data/` 替代
- `generate-dts.ts` - 被 `src/generator-dts/index.ts` 替代
- `test-config.ts` - 测试脚本，使用旧 API

### 其他
- `config-utils.ts` - 功能已整合到 `src/cssts-config.ts` 和 `src/css-utils.ts`
- `test-temp.ts` - 临时测试文件

## 新目录结构

```
cssts-compiler/
├── src/                    # 源代码
│   ├── config/             # 自动生成的配置（从 csstree 提取）
│   ├── custom/             # 手动维护的自定义数据
│   ├── data/               # 原始数据（颜色、单位、伪类列表）
│   ├── descriptions/       # 中英文描述
│   ├── presets/            # 预设配置（如 tailwind-like）
│   ├── generator-data/     # 数据生成脚本
│   ├── generator-dts/      # .d.ts 生成脚本
│   ├── factory/            # AST 转换
│   ├── parser/             # 解析器
│   ├── transform/          # 转换模块
│   ├── utils/              # 工具函数
│   ├── cssts-config.ts     # 主配置类
│   ├── css-utils.ts        # CSS 工具函数
│   └── index.ts            # 主入口
├── tests/                  # 测试
└── types/                  # 生成的 .d.ts 文件
```

## 运行脚本

```bash
# 生成 config/ 目录下的文件
npx tsx src/generator-data/index.ts

# 生成 types/ 目录下的 .d.ts 文件
npx tsx src/generator-dts/index.ts
```

## 删除方法

Windows CMD:
```cmd
rmdir /s /q cssts\cssts-compiler\_deprecated
```

PowerShell:
```powershell
Remove-Item -Recurse -Force cssts/cssts-compiler/_deprecated
```
