/**
 * CSS 类型定义导出
 * 
 * 目录结构：
 * ├── data/                    # 原始数据（颜色、伪类、伪元素）
 * ├── units/                   # 单位相关（类型、分类、映射）
 * ├── keywords.ts              # 属性关键字（自动生成）
 * ├── property-config.ts       # 属性配置（自动生成）
 * ├── cssts-config.ts          # CSSTS 配置类（手动维护）
 * └── config-utils.ts          # 配置工具函数
 */

// 数据层
export * from './data';

// 单位层
export * from './units';

// 属性层（自动生成）
export * from './keywords';
export * from './property-config';

// 配置层（手动维护）
export * from './cssts-config';
export * from './config-utils';

// 兼容旧导出（从 pseudo.ts 迁移到 data/）
export {
  PSEUDO_CLASSES,
  PSEUDO_ELEMENTS,
  PSEUDO_CLASS_CATEGORIES,
  PSEUDO_CLASS_DESCRIPTIONS,
  PSEUDO_ELEMENT_DESCRIPTIONS,
  PSEUDO_CLASS_CATEGORY_MAP,
  COMMON_PSEUDO_CLASSES,
  COMMON_PSEUDO_ELEMENTS,
  type PseudoClassName,
  type PseudoElementName,
  type PseudoClassCategory,
  type CommonPseudoClass,
  type CommonPseudoElement,
} from './data';

// 兼容旧导出（从 colors.ts 迁移到 data/）
export {
  COLORS,
  SYSTEM_COLORS,
  ALL_COLORS,
  type ColorValue,
  type SystemColorValue,
  type AllColorValue,
} from './data';
