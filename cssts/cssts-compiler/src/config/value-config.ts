/**
 * 此文件已弃用
 * 
 * 所有类型定义已移到对应的分类文件中：
 * - 步长和数值配置类型 → config/units.ts
 * - 自定义属性值类型 → cssts-config.ts
 * 
 * 保留此文件以兼容旧的导入
 */

// 为了兼容旧代码，重新导出类型
export type { ProgressiveRange, StepConfig, UnitValueConfig } from './units.js';
