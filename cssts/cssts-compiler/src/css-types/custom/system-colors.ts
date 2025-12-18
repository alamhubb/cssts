/**
 * CSS 系统颜色（手动维护）
 * 
 * 系统颜色是 CSS Color Module Level 4 定义的特殊颜色关键字，
 * 它们映射到用户操作系统的 UI 颜色。
 * 
 * 这些颜色不在 csstree 的标准颜色列表中，需要手动维护。
 */

/** CSS 系统颜色关键字（CSS Color Module Level 4） */
export const SYSTEM_COLORS = [
  'AccentColor',
  'AccentColorText',
  'ActiveText',
  'ButtonBorder',
  'ButtonFace',
  'ButtonText',
  'Canvas',
  'CanvasText',
  'Field',
  'FieldText',
  'GrayText',
  'Highlight',
  'HighlightText',
  'LinkText',
  'Mark',
  'MarkText',
  'SelectedItem',
  'SelectedItemText',
  'VisitedText',
] as const;

/** 系统颜色值类型 */
export type SystemColorValue = typeof SYSTEM_COLORS[number];
