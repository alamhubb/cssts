/**
 * CSS 类型定义导出
 * 
 * 目录结构：
 * ├── custom/          # 手动维护的定制化数据
 * ├── config/          # 自动生成的配置（csstree + custom）
 * ├── scripts/         # 生成脚本
 * ├── utils.ts         # 工具函数
 * ├── cssts-config.ts  # 用户配置类
 * └── config-utils.ts  # 配置工具函数
 */

// 配置层（自动生成，合并 csstree + custom）
export * from './config';

// 工具函数
export * from './utils';

// 用户配置（手动维护）
export * from './cssts-config';
export * from './config-utils';

// 也可以直接访问 custom 层的数据
export * as custom from './custom';
