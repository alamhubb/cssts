# CSSTS Language Support

为 CSSTS (CSS TypeScript) 文件提供语言支持的 VSCode 扩展。

## 支持的文件类型

- `.cssts` 文件 - 完整的语言服务支持

## 功能

- 语法高亮
- 智能补全（CSS 属性名、值）
- 悬停提示
- 跳转到定义
- 查找引用
- 语义令牌
- 错误诊断

## 工作原理

扩展使用 `cssts-compiler` 包将 `.cssts` 文件转换为 TypeScript，然后利用 TypeScript 语言服务提供智能功能。这确保了编辑器中的行为与 Vite 构建时的行为一致。

## 安装

### 开发模式

1. 安装依赖：
```bash
npm install
```

2. 构建扩展：
```bash
npm run build
```

3. 在 VSCode 中按 F5 启动扩展开发主机

### 打包发布

```bash
npm run package
```

## 文件结构

```
cssts-language/
├── cssts-language-server/     # 语言服务器
│   └── src/
│       ├── index.ts           # 服务器入口
│       ├── CsstsLanguagePlugin.ts  # 语言插件
│       └── logutil.ts         # 日志工具
├── cssts-vscode-client/       # VSCode 客户端
│   └── src/
│       └── extension.ts       # 扩展入口
├── syntaxes/                  # 语法定义
│   └── cssts.tmLanguage.json
├── language-configuration.json # 语言配置
├── package.json               # 扩展配置
└── tsdown.config.ts           # 构建配置
```

## 依赖

- [Volar](https://github.com/volarjs/volar.js) - 语言服务框架
- [TypeScript](https://www.typescriptlang.org/) - 类型系统
- [cssts-compiler](../cssts/cssts-compiler) - CSSTS 编译器（代码转换）

## 与 Vite 插件的关系

`cssts-language` 和 `vite-plugin-cssts` 都使用 `cssts-compiler` 进行代码转换，确保：

- 编辑器中的语法检查与构建时一致
- 代码补全基于实际的转换结果
- 错误提示准确反映编译问题

## License

MIT
