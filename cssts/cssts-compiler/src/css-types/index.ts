/**
 * CSS 类型定义导出
 * 
 * 目录结构：
 * ├── custom/          # 手动维护 - 自定义分类/映射逻辑
 * ├── data/            # 从 csstree 提取 - 原始数据
 * ├── descriptions/    # 手动维护 - 中英文描述
 * ├── config/          # 自动生成 - 综合配置
 * ├── scripts/         # 生成脚本
 * ├── utils.ts         # 工具函数
 * ├── cssts-config.ts  # 用户配置类
 * └── config-utils.ts  # 配置工具函数
 */

// 配置层（自动生成，合并 data + custom + descriptions）
export * from './config';

// 工具函数
export * from './utils';

// 用户配置
export * from './cssts-config';
export * from './config-utils';

// 也可以直接访问各层的数据
export * as custom from './custom';
export * as data from './data';
export * as descriptions from './descriptions';
