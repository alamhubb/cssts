/**
 * 系统颜色描述（手动维护）
 * 
 * 提供系统颜色的中英文描述，用于文档和智能提示。
 */

import type { SystemColorValue } from '../custom/system-colors';

/** 系统颜色描述 */
export const SYSTEM_COLOR_DESCRIPTIONS: Record<SystemColorValue, { en: string; zh: string }> = {
  'AccentColor': { en: 'Accent color for UI controls', zh: 'UI 控件的强调色' },
  'AccentColorText': { en: 'Text color on accent color', zh: '强调色上的文本颜色' },
  'ActiveText': { en: 'Active link text color', zh: '活动链接文本颜色' },
  'ButtonBorder': { en: 'Button border color', zh: '按钮边框颜色' },
  'ButtonFace': { en: 'Button background color', zh: '按钮背景颜色' },
  'ButtonText': { en: 'Button text color', zh: '按钮文本颜色' },
  'Canvas': { en: 'Application background color', zh: '应用背景颜色' },
  'CanvasText': { en: 'Application text color', zh: '应用文本颜色' },
  'Field': { en: 'Input field background', zh: '输入框背景' },
  'FieldText': { en: 'Input field text color', zh: '输入框文本颜色' },
  'GrayText': { en: 'Disabled text color', zh: '禁用文本颜色' },
  'Highlight': { en: 'Selection background', zh: '选中背景' },
  'HighlightText': { en: 'Selection text color', zh: '选中文本颜色' },
  'LinkText': { en: 'Unvisited link color', zh: '未访问链接颜色' },
  'Mark': { en: 'Mark/highlight background', zh: '标记/高亮背景' },
  'MarkText': { en: 'Mark/highlight text color', zh: '标记/高亮文本颜色' },
  'SelectedItem': { en: 'Selected item background', zh: '选中项背景' },
  'SelectedItemText': { en: 'Selected item text color', zh: '选中项文本颜色' },
  'VisitedText': { en: 'Visited link color', zh: '已访问链接颜色' },
};
