核心属性列表文档

1. 概述

1.1 目的
   核心属性列表是一个精简的 CSS 属性集合，基于 Tailwind CSS 的设计理念
   只包含最常用的属性，可以大幅减少生成的原子类数量

1.2 优势
   1.2.1 原子类数量：从 53,000+ 个降到约 1,092 个（减少 97%）
   1.2.2 文件大小：从 3.3 MB 降到约 150-200 KB（减少 94%）
   1.2.3 编译速度：更快的编译和加载速度
   1.2.4 类型支持：完整的 TypeScript 类型定义
   1.2.5 实用性：覆盖 95% 的常见使用场景

2. 属性分类

2.1 布局属性（10 个）
   2.1.1 display - 显示类型（block, inline, flex, grid, none 等）
   2.1.2 position - 定位方式（static, relative, absolute, fixed, sticky）
   2.1.3 top - 顶部距离（数值）
   2.1.4 right - 右侧距离（数值）
   2.1.5 bottom - 底部距离（数值）
   2.1.6 left - 左侧距离（数值）
   2.1.7 inset - 四边距离简写（数值）
   2.1.8 zIndex - 堆叠顺序（数值）
   2.1.9 float - 浮动（left, right, none）
   2.1.10 clear - 清除浮动（left, right, both, none）
   预期原子类：70 个

2.2 Flexbox 属性（5 个）
   2.2.1 flex - 弹性伸缩（0, 1, auto, none 等）
   2.2.2 flexDirection - 方向（row, column, row-reverse, column-reverse）
   2.2.3 justifyContent - 主轴对齐（flex-start, center, space-between 等）
   2.2.4 alignItems - 交叉轴对齐（flex-start, center, stretch 等）
   2.2.5 gap - 间隙（数值）
   预期原子类：40 个

2.3 Grid 属性（3 个）
   2.3.1 gridTemplateColumns - 列定义（repeat, auto-fit, minmax 等）
   2.3.2 gridTemplateRows - 行定义（repeat, auto-fit, minmax 等）
   2.3.3 gap - 间隙（数值，与 Flexbox 共用）
   预期原子类：50 个

2.4 尺寸属性（6 个）
   2.4.1 width - 宽度（数值 + 百分比）
   2.4.2 height - 高度（数值 + 百分比）
   2.4.3 minWidth - 最小宽度（数值）
   2.4.4 maxWidth - 最大宽度（数值）
   2.4.5 minHeight - 最小高度（数值）
   2.4.6 maxHeight - 最大高度（数值）
   预期原子类：144 个

2.5 间距属性（2 个）
   2.5.1 margin - 外边距（数值）
   2.5.2 padding - 内边距（数值）
   预期原子类：48 个

2.6 背景属性（3 个）
   2.6.1 backgroundColor - 背景颜色（颜色值）
   2.6.2 backgroundImage - 背景图像（url, gradient 等）
   2.6.3 backgroundSize - 背景大小（cover, contain, auto 等）
   预期原子类：300 个

2.7 文本属性（5 个）
   2.7.1 color - 文本颜色（颜色值）
   2.7.2 fontSize - 字体大小（xs, sm, base, lg, xl 等）
   2.7.3 fontWeight - 字体粗细（100, 200, 300, 400, 500, 600, 700, 800, 900）
   2.7.4 lineHeight - 行高（1, 1.25, 1.5, 1.75, 2 等）
   2.7.5 textAlign - 文本对齐（left, center, right, justify）
   预期原子类：150 个

2.8 边框属性（4 个）
   2.8.1 border - 边框（宽度 + 样式 + 颜色）
   2.8.2 borderColor - 边框颜色（颜色值）
   2.8.3 borderRadius - 圆角（数值）
   2.8.4 borderWidth - 边框宽度（数值）
   预期原子类：100 个

2.9 阴影属性（2 个）
   2.9.1 boxShadow - 盒子阴影（none, sm, md, lg, xl 等）
   2.9.2 textShadow - 文本阴影（none, sm, md, lg 等）
   预期原子类：15 个

2.10 变换属性（4 个）
   2.10.1 transform - 变换（none, rotate, scale, translate 等）
   2.10.2 rotate - 旋转（角度值）
   2.10.3 scale - 缩放（数值）
   2.10.4 translate - 平移（数值）
   预期原子类：60 个

2.11 过渡属性（2 个）
   2.11.1 transition - 过渡（all, colors, opacity 等）
   2.11.2 animation - 动画（animation-name, animation-duration 等）
   预期原子类：15 个

2.12 其他属性（3 个）
   2.12.1 opacity - 透明度（0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100）
   2.12.2 cursor - 光标（pointer, default, text, move 等）
   2.12.3 overflow - 溢出（visible, hidden, scroll, auto）
   预期原子类：100 个

3. 统计信息

3.1 属性总数
   3.1.1 总属性数：41 个
   3.1.2 分类数：12 个

3.2 预期原子类数量
   3.2.1 布局：70 个
   3.2.2 Flexbox：40 个
   3.2.3 Grid：50 个
   3.2.4 尺寸：144 个
   3.2.5 间距：48 个
   3.2.6 背景：300 个
   3.2.7 文本：150 个
   3.2.8 边框：100 个
   3.2.9 阴影：15 个
   3.2.10 变换：60 个
   3.2.11 过渡：15 个
   3.2.12 其他：100 个
   3.2.13 总计：1,092 个

4. 使用方法

4.1 导入核心属性
   import { CORE_PROPERTIES } from '@cssts/cssts-compiler';

4.2 在配置中使用
   const config = new CsstsConfig({
     includeProperties: CORE_PROPERTIES,
   });

4.3 按分类导入
   import {
     LAYOUT_PROPERTIES,
     FLEXBOX_PROPERTIES,
     GRID_PROPERTIES,
     // ... 其他分类
   } from '@cssts/cssts-compiler';

4.4 自定义组合
   const customProperties = [
     ...LAYOUT_PROPERTIES,
     ...FLEXBOX_PROPERTIES,
     ...SIZING_PROPERTIES,
     // 添加其他需要的属性
   ];

5. 对比数据

5.1 原子类数量对比
   5.1.1 完整属性集：53,000+ 个
   5.1.2 核心属性集：约 1,092 个
   5.1.3 减少比例：97%

5.2 文件大小对比
   5.2.1 完整属性集：3.3 MB
   5.2.2 核心属性集：约 150-200 KB
   5.2.3 减少比例：94%

5.3 行数对比
   5.3.1 完整属性集：54,000+ 行
   5.3.2 核心属性集：约 2,000-3,000 行
   5.3.3 减少比例：95%

6. 扩展属性

6.1 如果需要更多属性
   6.1.1 可以从 RARE_PROPERTIES 中选择需要的属性
   6.1.2 或者直接添加到 includeProperties 配置中

6.2 示例
   const config = new CsstsConfig({
     includeProperties: [
       ...CORE_PROPERTIES,
       'textDecoration',
       'textTransform',
       'wordBreak',
     ],
   });

7. 建议

7.1 默认使用核心属性
   7.1.1 对大多数项目来说，核心属性已经足够
   7.1.2 可以覆盖 95% 的常见使用场景

7.2 按需扩展
   7.2.1 如果需要特定属性，可以在配置中添加
   7.2.2 不需要一次性加载所有属性

7.3 性能优化
   7.3.1 使用核心属性可以显著提升编译速度
   7.3.2 减少 IDE 的类型检查时间
   7.3.3 改善开发体验
