# CSSTS Language Support

为 CSSTS (CSS TypeScript) 文件提供语言支持的 VSCode 扩展。

## 功能

- 语法高亮
- 智能补全
- 悬停提示
- 跳转到定义
- 查找引用
- 语义令牌

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

## 基于

- [Volar](https://github.com/volarjs/volar.js) - 语言服务框架
- [TypeScript](https://www.typescriptlang.org/) - 类型系统

## License

MIT
