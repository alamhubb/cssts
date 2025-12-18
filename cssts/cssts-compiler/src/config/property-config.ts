/**
 * CSS 属性配置（自动生成）
 */

import { type AllColorValue } from './colors';
import type { NumberTypeName } from './units';
import {
  ACCENT_COLOR_KEYWORDS,
  ALIGN_CONTENT_KEYWORDS,
  ALIGN_ITEMS_KEYWORDS,
  ALIGN_SELF_KEYWORDS,
  ALIGN_TRACKS_KEYWORDS,
  ALIGNMENT_BASELINE_KEYWORDS,
  ALL_KEYWORDS,
  ANCHOR_NAME_KEYWORDS,
  ANCHOR_SCOPE_KEYWORDS,
  ANIMATION_KEYWORDS,
  ANIMATION_COMPOSITION_KEYWORDS,
  ANIMATION_DIRECTION_KEYWORDS,
  ANIMATION_FILL_MODE_KEYWORDS,
  ANIMATION_ITERATION_COUNT_KEYWORDS,
  ANIMATION_NAME_KEYWORDS,
  ANIMATION_PLAY_STATE_KEYWORDS,
  ANIMATION_RANGE_END_KEYWORDS,
  ANIMATION_RANGE_START_KEYWORDS,
  ANIMATION_TIMELINE_KEYWORDS,
  ANIMATION_TIMING_FUNCTION_KEYWORDS,
  APPEARANCE_KEYWORDS,
  ASPECT_RATIO_KEYWORDS,
  AZIMUTH_KEYWORDS,
  BACKDROP_FILTER_KEYWORDS,
  BACKFACE_VISIBILITY_KEYWORDS,
  BACKGROUND_KEYWORDS,
  BACKGROUND_ATTACHMENT_KEYWORDS,
  BACKGROUND_BLEND_MODE_KEYWORDS,
  BACKGROUND_CLIP_KEYWORDS,
  BACKGROUND_COLOR_KEYWORDS,
  BACKGROUND_IMAGE_KEYWORDS,
  BACKGROUND_ORIGIN_KEYWORDS,
  BACKGROUND_POSITION_KEYWORDS,
  BACKGROUND_POSITION_X_KEYWORDS,
  BACKGROUND_POSITION_Y_KEYWORDS,
  BACKGROUND_REPEAT_KEYWORDS,
  BACKGROUND_SIZE_KEYWORDS,
  BASELINE_SHIFT_KEYWORDS,
  BORDER_KEYWORDS,
  BORDER_BLOCK_KEYWORDS,
  BORDER_BLOCK_END_KEYWORDS,
  BORDER_BLOCK_START_KEYWORDS,
  BORDER_BOTTOM_KEYWORDS,
  BORDER_BOTTOM_STYLE_KEYWORDS,
  BORDER_BOTTOM_WIDTH_KEYWORDS,
  BORDER_COLLAPSE_KEYWORDS,
  BORDER_COLOR_KEYWORDS,
  BORDER_IMAGE_REPEAT_KEYWORDS,
  BORDER_IMAGE_SLICE_KEYWORDS,
  BORDER_IMAGE_SOURCE_KEYWORDS,
  BORDER_IMAGE_WIDTH_KEYWORDS,
  BORDER_INLINE_KEYWORDS,
  BORDER_INLINE_END_KEYWORDS,
  BORDER_INLINE_START_KEYWORDS,
  BORDER_LEFT_KEYWORDS,
  BORDER_LEFT_COLOR_KEYWORDS,
  BORDER_LEFT_STYLE_KEYWORDS,
  BORDER_LEFT_WIDTH_KEYWORDS,
  BORDER_RIGHT_KEYWORDS,
  BORDER_RIGHT_COLOR_KEYWORDS,
  BORDER_RIGHT_STYLE_KEYWORDS,
  BORDER_RIGHT_WIDTH_KEYWORDS,
  BORDER_STYLE_KEYWORDS,
  BORDER_TOP_KEYWORDS,
  BORDER_TOP_COLOR_KEYWORDS,
  BORDER_TOP_STYLE_KEYWORDS,
  BORDER_TOP_WIDTH_KEYWORDS,
  BORDER_WIDTH_KEYWORDS,
  BOTTOM_KEYWORDS,
  BOX_ALIGN_KEYWORDS,
  BOX_DECORATION_BREAK_KEYWORDS,
  BOX_DIRECTION_KEYWORDS,
  BOX_LINES_KEYWORDS,
  BOX_ORIENT_KEYWORDS,
  BOX_PACK_KEYWORDS,
  BOX_SHADOW_KEYWORDS,
  BOX_SIZING_KEYWORDS,
  BREAK_AFTER_KEYWORDS,
  BREAK_BEFORE_KEYWORDS,
  BREAK_INSIDE_KEYWORDS,
  CAPTION_SIDE_KEYWORDS,
  CARET_COLOR_KEYWORDS,
  CARET_SHAPE_KEYWORDS,
  CLEAR_KEYWORDS,
  CLIP_KEYWORDS,
  CLIP_PATH_KEYWORDS,
  CLIP_RULE_KEYWORDS,
  COLOR_KEYWORDS,
  COLOR_INTERPOLATION_FILTERS_KEYWORDS,
  COLOR_SCHEME_KEYWORDS,
  COLUMN_COUNT_KEYWORDS,
  COLUMN_FILL_KEYWORDS,
  COLUMN_GAP_KEYWORDS,
  COLUMN_RULE_COLOR_KEYWORDS,
  COLUMN_SPAN_KEYWORDS,
  COLUMN_WIDTH_KEYWORDS,
  CONTAIN_KEYWORDS,
  CONTAIN_INTRINSIC_BLOCK_SIZE_KEYWORDS,
  CONTAIN_INTRINSIC_HEIGHT_KEYWORDS,
  CONTAIN_INTRINSIC_INLINE_SIZE_KEYWORDS,
  CONTAIN_INTRINSIC_SIZE_KEYWORDS,
  CONTAIN_INTRINSIC_WIDTH_KEYWORDS,
  CONTAINER_NAME_KEYWORDS,
  CONTAINER_TYPE_KEYWORDS,
  CONTENT_KEYWORDS,
  CONTENT_VISIBILITY_KEYWORDS,
  COUNTER_INCREMENT_KEYWORDS,
  COUNTER_RESET_KEYWORDS,
  COUNTER_SET_KEYWORDS,
  CUE_AFTER_KEYWORDS,
  CUE_BEFORE_KEYWORDS,
  CURSOR_KEYWORDS,
  D_KEYWORDS,
  DIRECTION_KEYWORDS,
  DISPLAY_KEYWORDS,
  DOMINANT_BASELINE_KEYWORDS,
  EMPTY_CELLS_KEYWORDS,
  FIELD_SIZING_KEYWORDS,
  FILL_KEYWORDS,
  FILL_RULE_KEYWORDS,
  FILTER_KEYWORDS,
  FLEX_KEYWORDS,
  FLEX_BASIS_KEYWORDS,
  FLEX_DIRECTION_KEYWORDS,
  FLEX_WRAP_KEYWORDS,
  FLOAT_KEYWORDS,
  FONT_KEYWORDS,
  FONT_FAMILY_KEYWORDS,
  FONT_FEATURE_SETTINGS_KEYWORDS,
  FONT_KERNING_KEYWORDS,
  FONT_LANGUAGE_OVERRIDE_KEYWORDS,
  FONT_OPTICAL_SIZING_KEYWORDS,
  FONT_PALETTE_KEYWORDS,
  FONT_SIZE_KEYWORDS,
  FONT_SIZE_ADJUST_KEYWORDS,
  FONT_SMOOTH_KEYWORDS,
  FONT_STRETCH_KEYWORDS,
  FONT_STYLE_KEYWORDS,
  FONT_SYNTHESIS_KEYWORDS,
  FONT_SYNTHESIS_POSITION_KEYWORDS,
  FONT_SYNTHESIS_SMALL_CAPS_KEYWORDS,
  FONT_SYNTHESIS_STYLE_KEYWORDS,
  FONT_SYNTHESIS_WEIGHT_KEYWORDS,
  FONT_VARIANT_KEYWORDS,
  FONT_VARIANT_ALTERNATES_KEYWORDS,
  FONT_VARIANT_CAPS_KEYWORDS,
  FONT_VARIANT_EAST_ASIAN_KEYWORDS,
  FONT_VARIANT_EMOJI_KEYWORDS,
  FONT_VARIANT_LIGATURES_KEYWORDS,
  FONT_VARIANT_NUMERIC_KEYWORDS,
  FONT_VARIANT_POSITION_KEYWORDS,
  FONT_VARIATION_SETTINGS_KEYWORDS,
  FONT_WEIGHT_KEYWORDS,
  FORCED_COLOR_ADJUST_KEYWORDS,
  GRID_KEYWORDS,
  GRID_AREA_KEYWORDS,
  GRID_AUTO_COLUMNS_KEYWORDS,
  GRID_AUTO_FLOW_KEYWORDS,
  GRID_AUTO_ROWS_KEYWORDS,
  GRID_COLUMN_KEYWORDS,
  GRID_COLUMN_END_KEYWORDS,
  GRID_COLUMN_START_KEYWORDS,
  GRID_ROW_KEYWORDS,
  GRID_ROW_END_KEYWORDS,
  GRID_ROW_START_KEYWORDS,
  GRID_TEMPLATE_KEYWORDS,
  GRID_TEMPLATE_AREAS_KEYWORDS,
  GRID_TEMPLATE_COLUMNS_KEYWORDS,
  GRID_TEMPLATE_ROWS_KEYWORDS,
  HANGING_PUNCTUATION_KEYWORDS,
  HEIGHT_KEYWORDS,
  HYPHENATE_CHARACTER_KEYWORDS,
  HYPHENATE_LIMIT_CHARS_KEYWORDS,
  HYPHENS_KEYWORDS,
  IMAGE_ORIENTATION_KEYWORDS,
  IMAGE_RENDERING_KEYWORDS,
  IMAGE_RESOLUTION_KEYWORDS,
  IME_MODE_KEYWORDS,
  INITIAL_LETTER_KEYWORDS,
  INITIAL_LETTER_ALIGN_KEYWORDS,
  INPUT_SECURITY_KEYWORDS,
  INTERPOLATE_SIZE_KEYWORDS,
  ISOLATION_KEYWORDS,
  JUSTIFY_CONTENT_KEYWORDS,
  JUSTIFY_ITEMS_KEYWORDS,
  JUSTIFY_SELF_KEYWORDS,
  JUSTIFY_TRACKS_KEYWORDS,
  KERNING_KEYWORDS,
  LEFT_KEYWORDS,
  LETTER_SPACING_KEYWORDS,
  LINE_BREAK_KEYWORDS,
  LINE_CLAMP_KEYWORDS,
  LINE_HEIGHT_KEYWORDS,
  LIST_STYLE_IMAGE_KEYWORDS,
  LIST_STYLE_POSITION_KEYWORDS,
  LIST_STYLE_TYPE_KEYWORDS,
  MARGIN_KEYWORDS,
  MARGIN_BOTTOM_KEYWORDS,
  MARGIN_LEFT_KEYWORDS,
  MARGIN_RIGHT_KEYWORDS,
  MARGIN_TOP_KEYWORDS,
  MARGIN_TRIM_KEYWORDS,
  MARKER_KEYWORDS,
  MARKER_END_KEYWORDS,
  MARKER_MID_KEYWORDS,
  MARKER_START_KEYWORDS,
  MASK_KEYWORDS,
  MASK_BORDER_MODE_KEYWORDS,
  MASK_BORDER_REPEAT_KEYWORDS,
  MASK_BORDER_SLICE_KEYWORDS,
  MASK_BORDER_SOURCE_KEYWORDS,
  MASK_BORDER_WIDTH_KEYWORDS,
  MASK_CLIP_KEYWORDS,
  MASK_COMPOSITE_KEYWORDS,
  MASK_IMAGE_KEYWORDS,
  MASK_MODE_KEYWORDS,
  MASK_ORIGIN_KEYWORDS,
  MASK_POSITION_KEYWORDS,
  MASK_REPEAT_KEYWORDS,
  MASK_SIZE_KEYWORDS,
  MASK_TYPE_KEYWORDS,
  MASONRY_AUTO_FLOW_KEYWORDS,
  MATH_DEPTH_KEYWORDS,
  MATH_SHIFT_KEYWORDS,
  MATH_STYLE_KEYWORDS,
  MAX_HEIGHT_KEYWORDS,
  MAX_LINES_KEYWORDS,
  MAX_WIDTH_KEYWORDS,
  MIN_HEIGHT_KEYWORDS,
  MIN_WIDTH_KEYWORDS,
  MIX_BLEND_MODE_KEYWORDS,
  OBJECT_FIT_KEYWORDS,
  OBJECT_POSITION_KEYWORDS,
  OFFSET_ANCHOR_KEYWORDS,
  OFFSET_PATH_KEYWORDS,
  OFFSET_POSITION_KEYWORDS,
  OFFSET_ROTATE_KEYWORDS,
  OUTLINE_COLOR_KEYWORDS,
  OUTLINE_STYLE_KEYWORDS,
  OUTLINE_WIDTH_KEYWORDS,
  OVERFLOW_KEYWORDS,
  OVERFLOW_ANCHOR_KEYWORDS,
  OVERFLOW_BLOCK_KEYWORDS,
  OVERFLOW_CLIP_BOX_KEYWORDS,
  OVERFLOW_CLIP_MARGIN_KEYWORDS,
  OVERFLOW_INLINE_KEYWORDS,
  OVERFLOW_WRAP_KEYWORDS,
  OVERFLOW_X_KEYWORDS,
  OVERFLOW_Y_KEYWORDS,
  OVERLAY_KEYWORDS,
  OVERSCROLL_BEHAVIOR_KEYWORDS,
  OVERSCROLL_BEHAVIOR_BLOCK_KEYWORDS,
  OVERSCROLL_BEHAVIOR_INLINE_KEYWORDS,
  OVERSCROLL_BEHAVIOR_X_KEYWORDS,
  OVERSCROLL_BEHAVIOR_Y_KEYWORDS,
  PAGE_KEYWORDS,
  PAGE_BREAK_AFTER_KEYWORDS,
  PAGE_BREAK_BEFORE_KEYWORDS,
  PAGE_BREAK_INSIDE_KEYWORDS,
  PAINT_ORDER_KEYWORDS,
  PAUSE_AFTER_KEYWORDS,
  PAUSE_BEFORE_KEYWORDS,
  PERSPECTIVE_KEYWORDS,
  PERSPECTIVE_ORIGIN_KEYWORDS,
  POINTER_EVENTS_KEYWORDS,
  POSITION_KEYWORDS,
  POSITION_ANCHOR_KEYWORDS,
  POSITION_AREA_KEYWORDS,
  POSITION_TRY_FALLBACKS_KEYWORDS,
  POSITION_TRY_ORDER_KEYWORDS,
  POSITION_VISIBILITY_KEYWORDS,
  PRINT_COLOR_ADJUST_KEYWORDS,
  QUOTES_KEYWORDS,
  RESIZE_KEYWORDS,
  REST_AFTER_KEYWORDS,
  REST_BEFORE_KEYWORDS,
  RIGHT_KEYWORDS,
  ROTATE_KEYWORDS,
  ROW_GAP_KEYWORDS,
  RUBY_ALIGN_KEYWORDS,
  RUBY_MERGE_KEYWORDS,
  RUBY_POSITION_KEYWORDS,
  SCALE_KEYWORDS,
  SCROLL_BEHAVIOR_KEYWORDS,
  SCROLL_PADDING_KEYWORDS,
  SCROLL_PADDING_BLOCK_KEYWORDS,
  SCROLL_PADDING_BLOCK_END_KEYWORDS,
  SCROLL_PADDING_BLOCK_START_KEYWORDS,
  SCROLL_PADDING_BOTTOM_KEYWORDS,
  SCROLL_PADDING_INLINE_KEYWORDS,
  SCROLL_PADDING_INLINE_END_KEYWORDS,
  SCROLL_PADDING_INLINE_START_KEYWORDS,
  SCROLL_PADDING_LEFT_KEYWORDS,
  SCROLL_PADDING_RIGHT_KEYWORDS,
  SCROLL_PADDING_TOP_KEYWORDS,
  SCROLL_SNAP_ALIGN_KEYWORDS,
  SCROLL_SNAP_COORDINATE_KEYWORDS,
  SCROLL_SNAP_DESTINATION_KEYWORDS,
  SCROLL_SNAP_POINTS_X_KEYWORDS,
  SCROLL_SNAP_POINTS_Y_KEYWORDS,
  SCROLL_SNAP_STOP_KEYWORDS,
  SCROLL_SNAP_TYPE_KEYWORDS,
  SCROLL_SNAP_TYPE_X_KEYWORDS,
  SCROLL_SNAP_TYPE_Y_KEYWORDS,
  SCROLL_TIMELINE_AXIS_KEYWORDS,
  SCROLL_TIMELINE_NAME_KEYWORDS,
  SCROLLBAR_COLOR_KEYWORDS,
  SCROLLBAR_GUTTER_KEYWORDS,
  SCROLLBAR_WIDTH_KEYWORDS,
  SHAPE_OUTSIDE_KEYWORDS,
  SHAPE_RENDERING_KEYWORDS,
  SPEAK_KEYWORDS,
  SPEAK_AS_KEYWORDS,
  STROKE_KEYWORDS,
  STROKE_DASHARRAY_KEYWORDS,
  STROKE_LINECAP_KEYWORDS,
  STROKE_LINEJOIN_KEYWORDS,
  TABLE_LAYOUT_KEYWORDS,
  TEXT_ALIGN_KEYWORDS,
  TEXT_ALIGN_LAST_KEYWORDS,
  TEXT_ANCHOR_KEYWORDS,
  TEXT_COMBINE_UPRIGHT_KEYWORDS,
  TEXT_DECORATION_COLOR_KEYWORDS,
  TEXT_DECORATION_LINE_KEYWORDS,
  TEXT_DECORATION_SKIP_KEYWORDS,
  TEXT_DECORATION_SKIP_INK_KEYWORDS,
  TEXT_DECORATION_STYLE_KEYWORDS,
  TEXT_DECORATION_THICKNESS_KEYWORDS,
  TEXT_EMPHASIS_COLOR_KEYWORDS,
  TEXT_EMPHASIS_POSITION_KEYWORDS,
  TEXT_EMPHASIS_STYLE_KEYWORDS,
  TEXT_INDENT_KEYWORDS,
  TEXT_JUSTIFY_KEYWORDS,
  TEXT_ORIENTATION_KEYWORDS,
  TEXT_OVERFLOW_KEYWORDS,
  TEXT_RENDERING_KEYWORDS,
  TEXT_SHADOW_KEYWORDS,
  TEXT_SIZE_ADJUST_KEYWORDS,
  TEXT_SPACING_TRIM_KEYWORDS,
  TEXT_TRANSFORM_KEYWORDS,
  TEXT_UNDERLINE_OFFSET_KEYWORDS,
  TEXT_UNDERLINE_POSITION_KEYWORDS,
  TEXT_WRAP_MODE_KEYWORDS,
  TEXT_WRAP_STYLE_KEYWORDS,
  TIMELINE_SCOPE_KEYWORDS,
  TOP_KEYWORDS,
  TOUCH_ACTION_KEYWORDS,
  TRANSFORM_KEYWORDS,
  TRANSFORM_BOX_KEYWORDS,
  TRANSFORM_ORIGIN_KEYWORDS,
  TRANSFORM_STYLE_KEYWORDS,
  TRANSITION_KEYWORDS,
  TRANSITION_BEHAVIOR_KEYWORDS,
  TRANSITION_PROPERTY_KEYWORDS,
  TRANSITION_TIMING_FUNCTION_KEYWORDS,
  TRANSLATE_KEYWORDS,
  UNICODE_BIDI_KEYWORDS,
  USER_SELECT_KEYWORDS,
  VECTOR_EFFECT_KEYWORDS,
  VERTICAL_ALIGN_KEYWORDS,
  VIEW_TIMELINE_AXIS_KEYWORDS,
  VIEW_TIMELINE_INSET_KEYWORDS,
  VIEW_TIMELINE_NAME_KEYWORDS,
  VIEW_TRANSITION_NAME_KEYWORDS,
  VISIBILITY_KEYWORDS,
  VOICE_BALANCE_KEYWORDS,
  VOICE_DURATION_KEYWORDS,
  VOICE_FAMILY_KEYWORDS,
  VOICE_PITCH_KEYWORDS,
  VOICE_RANGE_KEYWORDS,
  VOICE_RATE_KEYWORDS,
  VOICE_STRESS_KEYWORDS,
  VOICE_VOLUME_KEYWORDS,
  WHITE_SPACE_KEYWORDS,
  WHITE_SPACE_COLLAPSE_KEYWORDS,
  WHITE_SPACE_TRIM_KEYWORDS,
  WIDTH_KEYWORDS,
  WILL_CHANGE_KEYWORDS,
  WORD_BREAK_KEYWORDS,
  WORD_SPACING_KEYWORDS,
  WORD_WRAP_KEYWORDS,
  WRITING_MODE_KEYWORDS,
  Z_INDEX_KEYWORDS,
  ZOOM_KEYWORDS,
} from './keywords';
import type {
  AccentColorKeyword,
  AlignContentKeyword,
  AlignItemsKeyword,
  AlignSelfKeyword,
  AlignTracksKeyword,
  AlignmentBaselineKeyword,
  AllKeyword,
  AnchorNameKeyword,
  AnchorScopeKeyword,
  AnimationKeyword,
  AnimationCompositionKeyword,
  AnimationDirectionKeyword,
  AnimationFillModeKeyword,
  AnimationIterationCountKeyword,
  AnimationNameKeyword,
  AnimationPlayStateKeyword,
  AnimationRangeEndKeyword,
  AnimationRangeStartKeyword,
  AnimationTimelineKeyword,
  AnimationTimingFunctionKeyword,
  AppearanceKeyword,
  AspectRatioKeyword,
  AzimuthKeyword,
  BackdropFilterKeyword,
  BackfaceVisibilityKeyword,
  BackgroundKeyword,
  BackgroundAttachmentKeyword,
  BackgroundBlendModeKeyword,
  BackgroundClipKeyword,
  BackgroundColorKeyword,
  BackgroundImageKeyword,
  BackgroundOriginKeyword,
  BackgroundPositionKeyword,
  BackgroundPositionXKeyword,
  BackgroundPositionYKeyword,
  BackgroundRepeatKeyword,
  BackgroundSizeKeyword,
  BaselineShiftKeyword,
  BorderKeyword,
  BorderBlockKeyword,
  BorderBlockEndKeyword,
  BorderBlockStartKeyword,
  BorderBottomKeyword,
  BorderBottomStyleKeyword,
  BorderBottomWidthKeyword,
  BorderCollapseKeyword,
  BorderColorKeyword,
  BorderImageRepeatKeyword,
  BorderImageSliceKeyword,
  BorderImageSourceKeyword,
  BorderImageWidthKeyword,
  BorderInlineKeyword,
  BorderInlineEndKeyword,
  BorderInlineStartKeyword,
  BorderLeftKeyword,
  BorderLeftColorKeyword,
  BorderLeftStyleKeyword,
  BorderLeftWidthKeyword,
  BorderRightKeyword,
  BorderRightColorKeyword,
  BorderRightStyleKeyword,
  BorderRightWidthKeyword,
  BorderStyleKeyword,
  BorderTopKeyword,
  BorderTopColorKeyword,
  BorderTopStyleKeyword,
  BorderTopWidthKeyword,
  BorderWidthKeyword,
  BottomKeyword,
  BoxAlignKeyword,
  BoxDecorationBreakKeyword,
  BoxDirectionKeyword,
  BoxLinesKeyword,
  BoxOrientKeyword,
  BoxPackKeyword,
  BoxShadowKeyword,
  BoxSizingKeyword,
  BreakAfterKeyword,
  BreakBeforeKeyword,
  BreakInsideKeyword,
  CaptionSideKeyword,
  CaretColorKeyword,
  CaretShapeKeyword,
  ClearKeyword,
  ClipKeyword,
  ClipPathKeyword,
  ClipRuleKeyword,
  ColorKeyword,
  ColorInterpolationFiltersKeyword,
  ColorSchemeKeyword,
  ColumnCountKeyword,
  ColumnFillKeyword,
  ColumnGapKeyword,
  ColumnRuleColorKeyword,
  ColumnSpanKeyword,
  ColumnWidthKeyword,
  ContainKeyword,
  ContainIntrinsicBlockSizeKeyword,
  ContainIntrinsicHeightKeyword,
  ContainIntrinsicInlineSizeKeyword,
  ContainIntrinsicSizeKeyword,
  ContainIntrinsicWidthKeyword,
  ContainerNameKeyword,
  ContainerTypeKeyword,
  ContentKeyword,
  ContentVisibilityKeyword,
  CounterIncrementKeyword,
  CounterResetKeyword,
  CounterSetKeyword,
  CueAfterKeyword,
  CueBeforeKeyword,
  CursorKeyword,
  DKeyword,
  DirectionKeyword,
  DisplayKeyword,
  DominantBaselineKeyword,
  EmptyCellsKeyword,
  FieldSizingKeyword,
  FillKeyword,
  FillRuleKeyword,
  FilterKeyword,
  FlexKeyword,
  FlexBasisKeyword,
  FlexDirectionKeyword,
  FlexWrapKeyword,
  FloatKeyword,
  FontKeyword,
  FontFamilyKeyword,
  FontFeatureSettingsKeyword,
  FontKerningKeyword,
  FontLanguageOverrideKeyword,
  FontOpticalSizingKeyword,
  FontPaletteKeyword,
  FontSizeKeyword,
  FontSizeAdjustKeyword,
  FontSmoothKeyword,
  FontStretchKeyword,
  FontStyleKeyword,
  FontSynthesisKeyword,
  FontSynthesisPositionKeyword,
  FontSynthesisSmallCapsKeyword,
  FontSynthesisStyleKeyword,
  FontSynthesisWeightKeyword,
  FontVariantKeyword,
  FontVariantAlternatesKeyword,
  FontVariantCapsKeyword,
  FontVariantEastAsianKeyword,
  FontVariantEmojiKeyword,
  FontVariantLigaturesKeyword,
  FontVariantNumericKeyword,
  FontVariantPositionKeyword,
  FontVariationSettingsKeyword,
  FontWeightKeyword,
  ForcedColorAdjustKeyword,
  GridKeyword,
  GridAreaKeyword,
  GridAutoColumnsKeyword,
  GridAutoFlowKeyword,
  GridAutoRowsKeyword,
  GridColumnKeyword,
  GridColumnEndKeyword,
  GridColumnStartKeyword,
  GridRowKeyword,
  GridRowEndKeyword,
  GridRowStartKeyword,
  GridTemplateKeyword,
  GridTemplateAreasKeyword,
  GridTemplateColumnsKeyword,
  GridTemplateRowsKeyword,
  HangingPunctuationKeyword,
  HeightKeyword,
  HyphenateCharacterKeyword,
  HyphenateLimitCharsKeyword,
  HyphensKeyword,
  ImageOrientationKeyword,
  ImageRenderingKeyword,
  ImageResolutionKeyword,
  ImeModeKeyword,
  InitialLetterKeyword,
  InitialLetterAlignKeyword,
  InputSecurityKeyword,
  InterpolateSizeKeyword,
  IsolationKeyword,
  JustifyContentKeyword,
  JustifyItemsKeyword,
  JustifySelfKeyword,
  JustifyTracksKeyword,
  KerningKeyword,
  LeftKeyword,
  LetterSpacingKeyword,
  LineBreakKeyword,
  LineClampKeyword,
  LineHeightKeyword,
  ListStyleImageKeyword,
  ListStylePositionKeyword,
  ListStyleTypeKeyword,
  MarginKeyword,
  MarginBottomKeyword,
  MarginLeftKeyword,
  MarginRightKeyword,
  MarginTopKeyword,
  MarginTrimKeyword,
  MarkerKeyword,
  MarkerEndKeyword,
  MarkerMidKeyword,
  MarkerStartKeyword,
  MaskKeyword,
  MaskBorderModeKeyword,
  MaskBorderRepeatKeyword,
  MaskBorderSliceKeyword,
  MaskBorderSourceKeyword,
  MaskBorderWidthKeyword,
  MaskClipKeyword,
  MaskCompositeKeyword,
  MaskImageKeyword,
  MaskModeKeyword,
  MaskOriginKeyword,
  MaskPositionKeyword,
  MaskRepeatKeyword,
  MaskSizeKeyword,
  MaskTypeKeyword,
  MasonryAutoFlowKeyword,
  MathDepthKeyword,
  MathShiftKeyword,
  MathStyleKeyword,
  MaxHeightKeyword,
  MaxLinesKeyword,
  MaxWidthKeyword,
  MinHeightKeyword,
  MinWidthKeyword,
  MixBlendModeKeyword,
  ObjectFitKeyword,
  ObjectPositionKeyword,
  OffsetAnchorKeyword,
  OffsetPathKeyword,
  OffsetPositionKeyword,
  OffsetRotateKeyword,
  OutlineColorKeyword,
  OutlineStyleKeyword,
  OutlineWidthKeyword,
  OverflowKeyword,
  OverflowAnchorKeyword,
  OverflowBlockKeyword,
  OverflowClipBoxKeyword,
  OverflowClipMarginKeyword,
  OverflowInlineKeyword,
  OverflowWrapKeyword,
  OverflowXKeyword,
  OverflowYKeyword,
  OverlayKeyword,
  OverscrollBehaviorKeyword,
  OverscrollBehaviorBlockKeyword,
  OverscrollBehaviorInlineKeyword,
  OverscrollBehaviorXKeyword,
  OverscrollBehaviorYKeyword,
  PageKeyword,
  PageBreakAfterKeyword,
  PageBreakBeforeKeyword,
  PageBreakInsideKeyword,
  PaintOrderKeyword,
  PauseAfterKeyword,
  PauseBeforeKeyword,
  PerspectiveKeyword,
  PerspectiveOriginKeyword,
  PointerEventsKeyword,
  PositionKeyword,
  PositionAnchorKeyword,
  PositionAreaKeyword,
  PositionTryFallbacksKeyword,
  PositionTryOrderKeyword,
  PositionVisibilityKeyword,
  PrintColorAdjustKeyword,
  QuotesKeyword,
  ResizeKeyword,
  RestAfterKeyword,
  RestBeforeKeyword,
  RightKeyword,
  RotateKeyword,
  RowGapKeyword,
  RubyAlignKeyword,
  RubyMergeKeyword,
  RubyPositionKeyword,
  ScaleKeyword,
  ScrollBehaviorKeyword,
  ScrollPaddingKeyword,
  ScrollPaddingBlockKeyword,
  ScrollPaddingBlockEndKeyword,
  ScrollPaddingBlockStartKeyword,
  ScrollPaddingBottomKeyword,
  ScrollPaddingInlineKeyword,
  ScrollPaddingInlineEndKeyword,
  ScrollPaddingInlineStartKeyword,
  ScrollPaddingLeftKeyword,
  ScrollPaddingRightKeyword,
  ScrollPaddingTopKeyword,
  ScrollSnapAlignKeyword,
  ScrollSnapCoordinateKeyword,
  ScrollSnapDestinationKeyword,
  ScrollSnapPointsXKeyword,
  ScrollSnapPointsYKeyword,
  ScrollSnapStopKeyword,
  ScrollSnapTypeKeyword,
  ScrollSnapTypeXKeyword,
  ScrollSnapTypeYKeyword,
  ScrollTimelineAxisKeyword,
  ScrollTimelineNameKeyword,
  ScrollbarColorKeyword,
  ScrollbarGutterKeyword,
  ScrollbarWidthKeyword,
  ShapeOutsideKeyword,
  ShapeRenderingKeyword,
  SpeakKeyword,
  SpeakAsKeyword,
  StrokeKeyword,
  StrokeDasharrayKeyword,
  StrokeLinecapKeyword,
  StrokeLinejoinKeyword,
  TableLayoutKeyword,
  TextAlignKeyword,
  TextAlignLastKeyword,
  TextAnchorKeyword,
  TextCombineUprightKeyword,
  TextDecorationColorKeyword,
  TextDecorationLineKeyword,
  TextDecorationSkipKeyword,
  TextDecorationSkipInkKeyword,
  TextDecorationStyleKeyword,
  TextDecorationThicknessKeyword,
  TextEmphasisColorKeyword,
  TextEmphasisPositionKeyword,
  TextEmphasisStyleKeyword,
  TextIndentKeyword,
  TextJustifyKeyword,
  TextOrientationKeyword,
  TextOverflowKeyword,
  TextRenderingKeyword,
  TextShadowKeyword,
  TextSizeAdjustKeyword,
  TextSpacingTrimKeyword,
  TextTransformKeyword,
  TextUnderlineOffsetKeyword,
  TextUnderlinePositionKeyword,
  TextWrapModeKeyword,
  TextWrapStyleKeyword,
  TimelineScopeKeyword,
  TopKeyword,
  TouchActionKeyword,
  TransformKeyword,
  TransformBoxKeyword,
  TransformOriginKeyword,
  TransformStyleKeyword,
  TransitionKeyword,
  TransitionBehaviorKeyword,
  TransitionPropertyKeyword,
  TransitionTimingFunctionKeyword,
  TranslateKeyword,
  UnicodeBidiKeyword,
  UserSelectKeyword,
  VectorEffectKeyword,
  VerticalAlignKeyword,
  ViewTimelineAxisKeyword,
  ViewTimelineInsetKeyword,
  ViewTimelineNameKeyword,
  ViewTransitionNameKeyword,
  VisibilityKeyword,
  VoiceBalanceKeyword,
  VoiceDurationKeyword,
  VoiceFamilyKeyword,
  VoicePitchKeyword,
  VoiceRangeKeyword,
  VoiceRateKeyword,
  VoiceStressKeyword,
  VoiceVolumeKeyword,
  WhiteSpaceKeyword,
  WhiteSpaceCollapseKeyword,
  WhiteSpaceTrimKeyword,
  WidthKeyword,
  WillChangeKeyword,
  WordBreakKeyword,
  WordSpacingKeyword,
  WordWrapKeyword,
  WritingModeKeyword,
  ZIndexKeyword,
  ZoomKeyword,
} from './keywords';

// ==================== 数值类型常量 ====================

export const ACCENT_COLOR_NUMBER_TYPES = ['angle', 'number', 'percentage'] as const;
export const ANIMATION_NUMBER_TYPES = ['integer', 'number'] as const;
export const ANIMATION_DELAY_NUMBER_TYPES = ['time'] as const;
export const ANIMATION_DURATION_NUMBER_TYPES = ['time'] as const;
export const ANIMATION_ITERATION_COUNT_NUMBER_TYPES = ['number'] as const;
export const ANIMATION_RANGE_END_NUMBER_TYPES = ['length', 'percentage'] as const;
export const ANIMATION_RANGE_START_NUMBER_TYPES = ['length', 'percentage'] as const;
export const ANIMATION_TIMING_FUNCTION_NUMBER_TYPES = ['integer', 'number'] as const;
export const ASPECT_RATIO_NUMBER_TYPES = ['number'] as const;
export const AZIMUTH_NUMBER_TYPES = ['angle'] as const;
export const BACKDROP_FILTER_NUMBER_TYPES = ['angle', 'length', 'number', 'percentage'] as const;
export const BACKGROUND_NUMBER_TYPES = ['angle', 'length', 'number', 'percentage', 'resolution'] as const;
export const BACKGROUND_COLOR_NUMBER_TYPES = ['angle', 'number', 'percentage'] as const;
export const BACKGROUND_IMAGE_NUMBER_TYPES = ['angle', 'length', 'number', 'percentage', 'resolution'] as const;
export const BACKGROUND_POSITION_NUMBER_TYPES = ['length', 'percentage'] as const;
export const BACKGROUND_POSITION_X_NUMBER_TYPES = ['length', 'percentage'] as const;
export const BACKGROUND_POSITION_Y_NUMBER_TYPES = ['length', 'percentage'] as const;
export const BACKGROUND_SIZE_NUMBER_TYPES = ['length', 'percentage'] as const;
export const BASELINE_SHIFT_NUMBER_TYPES = ['length', 'number', 'percentage'] as const;
export const BORDER_NUMBER_TYPES = ['angle', 'length', 'number', 'percentage'] as const;
export const BORDER_BLOCK_NUMBER_TYPES = ['angle', 'number', 'percentage'] as const;
export const BORDER_BLOCK_END_NUMBER_TYPES = ['angle', 'number', 'percentage'] as const;
export const BORDER_BLOCK_START_NUMBER_TYPES = ['angle', 'number', 'percentage'] as const;
export const BORDER_BOTTOM_NUMBER_TYPES = ['angle', 'length', 'number', 'percentage'] as const;
export const BORDER_BOTTOM_LEFT_RADIUS_NUMBER_TYPES = ['length', 'percentage'] as const;
export const BORDER_BOTTOM_RIGHT_RADIUS_NUMBER_TYPES = ['length', 'percentage'] as const;
export const BORDER_BOTTOM_WIDTH_NUMBER_TYPES = ['length'] as const;
export const BORDER_COLOR_NUMBER_TYPES = ['angle', 'number', 'percentage'] as const;
export const BORDER_END_END_RADIUS_NUMBER_TYPES = ['length', 'percentage'] as const;
export const BORDER_END_START_RADIUS_NUMBER_TYPES = ['length', 'percentage'] as const;
export const BORDER_IMAGE_OUTSET_NUMBER_TYPES = ['length', 'number'] as const;
export const BORDER_IMAGE_SLICE_NUMBER_TYPES = ['number', 'percentage'] as const;
export const BORDER_IMAGE_SOURCE_NUMBER_TYPES = ['angle', 'length', 'number', 'percentage', 'resolution'] as const;
export const BORDER_IMAGE_WIDTH_NUMBER_TYPES = ['length', 'number', 'percentage'] as const;
export const BORDER_INLINE_NUMBER_TYPES = ['angle', 'number', 'percentage'] as const;
export const BORDER_INLINE_END_NUMBER_TYPES = ['angle', 'number', 'percentage'] as const;
export const BORDER_INLINE_START_NUMBER_TYPES = ['angle', 'number', 'percentage'] as const;
export const BORDER_LEFT_NUMBER_TYPES = ['angle', 'length', 'number', 'percentage'] as const;
export const BORDER_LEFT_COLOR_NUMBER_TYPES = ['angle', 'number', 'percentage'] as const;
export const BORDER_LEFT_WIDTH_NUMBER_TYPES = ['length'] as const;
export const BORDER_RADIUS_NUMBER_TYPES = ['length', 'percentage'] as const;
export const BORDER_RIGHT_NUMBER_TYPES = ['angle', 'length', 'number', 'percentage'] as const;
export const BORDER_RIGHT_COLOR_NUMBER_TYPES = ['angle', 'number', 'percentage'] as const;
export const BORDER_RIGHT_WIDTH_NUMBER_TYPES = ['length'] as const;
export const BORDER_SPACING_NUMBER_TYPES = ['length'] as const;
export const BORDER_START_END_RADIUS_NUMBER_TYPES = ['length', 'percentage'] as const;
export const BORDER_START_START_RADIUS_NUMBER_TYPES = ['length', 'percentage'] as const;
export const BORDER_TOP_NUMBER_TYPES = ['angle', 'length', 'number', 'percentage'] as const;
export const BORDER_TOP_COLOR_NUMBER_TYPES = ['angle', 'number', 'percentage'] as const;
export const BORDER_TOP_LEFT_RADIUS_NUMBER_TYPES = ['length', 'percentage'] as const;
export const BORDER_TOP_RIGHT_RADIUS_NUMBER_TYPES = ['length', 'percentage'] as const;
export const BORDER_TOP_WIDTH_NUMBER_TYPES = ['length'] as const;
export const BORDER_WIDTH_NUMBER_TYPES = ['length'] as const;
export const BOTTOM_NUMBER_TYPES = ['length', 'percentage'] as const;
export const BOX_FLEX_NUMBER_TYPES = ['number'] as const;
export const BOX_FLEX_GROUP_NUMBER_TYPES = ['integer'] as const;
export const BOX_ORDINAL_GROUP_NUMBER_TYPES = ['integer'] as const;
export const BOX_SHADOW_NUMBER_TYPES = ['angle', 'length', 'number', 'percentage'] as const;
export const CARET_COLOR_NUMBER_TYPES = ['angle', 'number', 'percentage'] as const;
export const CLIP_NUMBER_TYPES = ['length'] as const;
export const CLIP_PATH_NUMBER_TYPES = ['length', 'percentage'] as const;
export const COLOR_NUMBER_TYPES = ['angle', 'number', 'percentage'] as const;
export const COLUMN_COUNT_NUMBER_TYPES = ['integer'] as const;
export const COLUMN_GAP_NUMBER_TYPES = ['length', 'percentage'] as const;
export const COLUMN_RULE_COLOR_NUMBER_TYPES = ['angle', 'number', 'percentage'] as const;
export const COLUMN_WIDTH_NUMBER_TYPES = ['length'] as const;
export const CONTAIN_INTRINSIC_BLOCK_SIZE_NUMBER_TYPES = ['length'] as const;
export const CONTAIN_INTRINSIC_HEIGHT_NUMBER_TYPES = ['length'] as const;
export const CONTAIN_INTRINSIC_INLINE_SIZE_NUMBER_TYPES = ['length'] as const;
export const CONTAIN_INTRINSIC_SIZE_NUMBER_TYPES = ['length'] as const;
export const CONTAIN_INTRINSIC_WIDTH_NUMBER_TYPES = ['length'] as const;
export const CONTENT_NUMBER_TYPES = ['angle', 'length', 'number', 'percentage', 'resolution'] as const;
export const COUNTER_INCREMENT_NUMBER_TYPES = ['integer'] as const;
export const COUNTER_RESET_NUMBER_TYPES = ['integer'] as const;
export const COUNTER_SET_NUMBER_TYPES = ['integer'] as const;
export const CURSOR_NUMBER_TYPES = ['number'] as const;
export const CX_NUMBER_TYPES = ['length', 'percentage'] as const;
export const CY_NUMBER_TYPES = ['length', 'percentage'] as const;
export const FILL_NUMBER_TYPES = ['angle', 'number', 'percentage'] as const;
export const FILL_OPACITY_NUMBER_TYPES = ['number'] as const;
export const FILTER_NUMBER_TYPES = ['angle', 'length', 'number', 'percentage'] as const;
export const FLEX_GROW_NUMBER_TYPES = ['number'] as const;
export const FLEX_SHRINK_NUMBER_TYPES = ['number'] as const;
export const FONT_FEATURE_SETTINGS_NUMBER_TYPES = ['integer'] as const;
export const FONT_SIZE_NUMBER_TYPES = ['length', 'percentage'] as const;
export const FONT_SIZE_ADJUST_NUMBER_TYPES = ['number'] as const;
export const FONT_SMOOTH_NUMBER_TYPES = ['length'] as const;
export const FONT_STRETCH_NUMBER_TYPES = ['percentage'] as const;
export const FONT_STYLE_NUMBER_TYPES = ['angle'] as const;
export const FONT_VARIATION_SETTINGS_NUMBER_TYPES = ['number'] as const;
export const FONT_WEIGHT_NUMBER_TYPES = ['number'] as const;
export const GLYPH_ORIENTATION_HORIZONTAL_NUMBER_TYPES = ['angle'] as const;
export const GLYPH_ORIENTATION_VERTICAL_NUMBER_TYPES = ['angle'] as const;
export const GRID_AREA_NUMBER_TYPES = ['integer'] as const;
export const GRID_AUTO_COLUMNS_NUMBER_TYPES = ['flex', 'length', 'percentage'] as const;
export const GRID_AUTO_ROWS_NUMBER_TYPES = ['flex', 'length', 'percentage'] as const;
export const GRID_COLUMN_NUMBER_TYPES = ['integer'] as const;
export const GRID_COLUMN_END_NUMBER_TYPES = ['integer'] as const;
export const GRID_COLUMN_GAP_NUMBER_TYPES = ['length', 'percentage'] as const;
export const GRID_COLUMN_START_NUMBER_TYPES = ['integer'] as const;
export const GRID_ROW_NUMBER_TYPES = ['integer'] as const;
export const GRID_ROW_END_NUMBER_TYPES = ['integer'] as const;
export const GRID_ROW_GAP_NUMBER_TYPES = ['length', 'percentage'] as const;
export const GRID_ROW_START_NUMBER_TYPES = ['integer'] as const;
export const GRID_TEMPLATE_NUMBER_TYPES = ['flex', 'length', 'percentage'] as const;
export const GRID_TEMPLATE_COLUMNS_NUMBER_TYPES = ['flex', 'integer', 'length', 'percentage'] as const;
export const GRID_TEMPLATE_ROWS_NUMBER_TYPES = ['flex', 'integer', 'length', 'percentage'] as const;
export const HEIGHT_NUMBER_TYPES = ['length', 'percentage'] as const;
export const HYPHENATE_LIMIT_CHARS_NUMBER_TYPES = ['integer'] as const;
export const IMAGE_ORIENTATION_NUMBER_TYPES = ['angle'] as const;
export const IMAGE_RESOLUTION_NUMBER_TYPES = ['resolution'] as const;
export const INITIAL_LETTER_NUMBER_TYPES = ['integer', 'number'] as const;
export const KERNING_NUMBER_TYPES = ['length', 'number', 'percentage'] as const;
export const LEFT_NUMBER_TYPES = ['length', 'percentage'] as const;
export const LETTER_SPACING_NUMBER_TYPES = ['length', 'percentage'] as const;
export const LINE_CLAMP_NUMBER_TYPES = ['integer'] as const;
export const LINE_HEIGHT_NUMBER_TYPES = ['length', 'number', 'percentage'] as const;
export const LINE_HEIGHT_STEP_NUMBER_TYPES = ['length'] as const;
export const LIST_STYLE_IMAGE_NUMBER_TYPES = ['angle', 'length', 'number', 'percentage', 'resolution'] as const;
export const MARGIN_NUMBER_TYPES = ['length', 'percentage'] as const;
export const MARGIN_BOTTOM_NUMBER_TYPES = ['length', 'percentage'] as const;
export const MARGIN_LEFT_NUMBER_TYPES = ['length', 'percentage'] as const;
export const MARGIN_RIGHT_NUMBER_TYPES = ['length', 'percentage'] as const;
export const MARGIN_TOP_NUMBER_TYPES = ['length', 'percentage'] as const;
export const MASK_NUMBER_TYPES = ['angle', 'length', 'number', 'percentage', 'resolution'] as const;
export const MASK_BORDER_OUTSET_NUMBER_TYPES = ['length', 'number'] as const;
export const MASK_BORDER_SLICE_NUMBER_TYPES = ['number', 'percentage'] as const;
export const MASK_BORDER_SOURCE_NUMBER_TYPES = ['angle', 'length', 'number', 'percentage', 'resolution'] as const;
export const MASK_BORDER_WIDTH_NUMBER_TYPES = ['length', 'number', 'percentage'] as const;
export const MASK_IMAGE_NUMBER_TYPES = ['angle', 'length', 'number', 'percentage', 'resolution'] as const;
export const MASK_POSITION_NUMBER_TYPES = ['length', 'percentage'] as const;
export const MASK_SIZE_NUMBER_TYPES = ['length', 'percentage'] as const;
export const MATH_DEPTH_NUMBER_TYPES = ['integer'] as const;
export const MAX_HEIGHT_NUMBER_TYPES = ['length', 'percentage'] as const;
export const MAX_LINES_NUMBER_TYPES = ['integer'] as const;
export const MAX_WIDTH_NUMBER_TYPES = ['length', 'percentage'] as const;
export const MIN_HEIGHT_NUMBER_TYPES = ['length', 'percentage'] as const;
export const MIN_WIDTH_NUMBER_TYPES = ['length', 'percentage'] as const;
export const OBJECT_POSITION_NUMBER_TYPES = ['length', 'percentage'] as const;
export const OFFSET_ANCHOR_NUMBER_TYPES = ['length', 'percentage'] as const;
export const OFFSET_DISTANCE_NUMBER_TYPES = ['length', 'percentage'] as const;
export const OFFSET_PATH_NUMBER_TYPES = ['angle', 'length', 'percentage'] as const;
export const OFFSET_POSITION_NUMBER_TYPES = ['length', 'percentage'] as const;
export const OFFSET_ROTATE_NUMBER_TYPES = ['angle'] as const;
export const OPACITY_NUMBER_TYPES = ['number', 'percentage'] as const;
export const ORDER_NUMBER_TYPES = ['integer'] as const;
export const ORPHANS_NUMBER_TYPES = ['integer'] as const;
export const OUTLINE_COLOR_NUMBER_TYPES = ['angle', 'number', 'percentage'] as const;
export const OUTLINE_OFFSET_NUMBER_TYPES = ['length'] as const;
export const OUTLINE_WIDTH_NUMBER_TYPES = ['length'] as const;
export const OVERFLOW_CLIP_MARGIN_NUMBER_TYPES = ['length'] as const;
export const PADDING_NUMBER_TYPES = ['length', 'percentage'] as const;
export const PADDING_BOTTOM_NUMBER_TYPES = ['length', 'percentage'] as const;
export const PADDING_LEFT_NUMBER_TYPES = ['length', 'percentage'] as const;
export const PADDING_RIGHT_NUMBER_TYPES = ['length', 'percentage'] as const;
export const PADDING_TOP_NUMBER_TYPES = ['length', 'percentage'] as const;
export const PAUSE_AFTER_NUMBER_TYPES = ['time'] as const;
export const PAUSE_BEFORE_NUMBER_TYPES = ['time'] as const;
export const PERSPECTIVE_NUMBER_TYPES = ['length'] as const;
export const PERSPECTIVE_ORIGIN_NUMBER_TYPES = ['length', 'percentage'] as const;
export const R_NUMBER_TYPES = ['length', 'percentage'] as const;
export const REST_AFTER_NUMBER_TYPES = ['time'] as const;
export const REST_BEFORE_NUMBER_TYPES = ['time'] as const;
export const RIGHT_NUMBER_TYPES = ['length', 'percentage'] as const;
export const ROTATE_NUMBER_TYPES = ['angle', 'number'] as const;
export const ROW_GAP_NUMBER_TYPES = ['length', 'percentage'] as const;
export const RX_NUMBER_TYPES = ['length', 'percentage'] as const;
export const RY_NUMBER_TYPES = ['length', 'percentage'] as const;
export const SCALE_NUMBER_TYPES = ['number', 'percentage'] as const;
export const SCROLL_MARGIN_NUMBER_TYPES = ['length'] as const;
export const SCROLL_MARGIN_BLOCK_NUMBER_TYPES = ['length'] as const;
export const SCROLL_MARGIN_BLOCK_END_NUMBER_TYPES = ['length'] as const;
export const SCROLL_MARGIN_BLOCK_START_NUMBER_TYPES = ['length'] as const;
export const SCROLL_MARGIN_BOTTOM_NUMBER_TYPES = ['length'] as const;
export const SCROLL_MARGIN_INLINE_NUMBER_TYPES = ['length'] as const;
export const SCROLL_MARGIN_INLINE_END_NUMBER_TYPES = ['length'] as const;
export const SCROLL_MARGIN_INLINE_START_NUMBER_TYPES = ['length'] as const;
export const SCROLL_MARGIN_LEFT_NUMBER_TYPES = ['length'] as const;
export const SCROLL_MARGIN_RIGHT_NUMBER_TYPES = ['length'] as const;
export const SCROLL_MARGIN_TOP_NUMBER_TYPES = ['length'] as const;
export const SCROLL_PADDING_NUMBER_TYPES = ['length', 'percentage'] as const;
export const SCROLL_PADDING_BLOCK_NUMBER_TYPES = ['length', 'percentage'] as const;
export const SCROLL_PADDING_BLOCK_END_NUMBER_TYPES = ['length', 'percentage'] as const;
export const SCROLL_PADDING_BLOCK_START_NUMBER_TYPES = ['length', 'percentage'] as const;
export const SCROLL_PADDING_BOTTOM_NUMBER_TYPES = ['length', 'percentage'] as const;
export const SCROLL_PADDING_INLINE_NUMBER_TYPES = ['length', 'percentage'] as const;
export const SCROLL_PADDING_INLINE_END_NUMBER_TYPES = ['length', 'percentage'] as const;
export const SCROLL_PADDING_INLINE_START_NUMBER_TYPES = ['length', 'percentage'] as const;
export const SCROLL_PADDING_LEFT_NUMBER_TYPES = ['length', 'percentage'] as const;
export const SCROLL_PADDING_RIGHT_NUMBER_TYPES = ['length', 'percentage'] as const;
export const SCROLL_PADDING_TOP_NUMBER_TYPES = ['length', 'percentage'] as const;
export const SCROLL_SNAP_COORDINATE_NUMBER_TYPES = ['length', 'percentage'] as const;
export const SCROLL_SNAP_DESTINATION_NUMBER_TYPES = ['length', 'percentage'] as const;
export const SCROLL_SNAP_POINTS_X_NUMBER_TYPES = ['length', 'percentage'] as const;
export const SCROLL_SNAP_POINTS_Y_NUMBER_TYPES = ['length', 'percentage'] as const;
export const SCROLLBAR_COLOR_NUMBER_TYPES = ['angle', 'number', 'percentage'] as const;
export const SHAPE_IMAGE_THRESHOLD_NUMBER_TYPES = ['number', 'percentage'] as const;
export const SHAPE_MARGIN_NUMBER_TYPES = ['length', 'percentage'] as const;
export const SHAPE_OUTSIDE_NUMBER_TYPES = ['angle', 'length', 'number', 'percentage', 'resolution'] as const;
export const STROKE_NUMBER_TYPES = ['angle', 'number', 'percentage'] as const;
export const STROKE_DASHARRAY_NUMBER_TYPES = ['length', 'number', 'percentage'] as const;
export const STROKE_DASHOFFSET_NUMBER_TYPES = ['length', 'number', 'percentage'] as const;
export const STROKE_MITERLIMIT_NUMBER_TYPES = ['number'] as const;
export const STROKE_WIDTH_NUMBER_TYPES = ['length', 'number', 'percentage'] as const;
export const TAB_SIZE_NUMBER_TYPES = ['integer', 'length'] as const;
export const TEXT_COMBINE_UPRIGHT_NUMBER_TYPES = ['integer'] as const;
export const TEXT_DECORATION_COLOR_NUMBER_TYPES = ['angle', 'number', 'percentage'] as const;
export const TEXT_DECORATION_THICKNESS_NUMBER_TYPES = ['length', 'percentage'] as const;
export const TEXT_EMPHASIS_COLOR_NUMBER_TYPES = ['angle', 'number', 'percentage'] as const;
export const TEXT_INDENT_NUMBER_TYPES = ['length', 'percentage'] as const;
export const TEXT_SHADOW_NUMBER_TYPES = ['angle', 'length', 'number', 'percentage'] as const;
export const TEXT_SIZE_ADJUST_NUMBER_TYPES = ['percentage'] as const;
export const TEXT_UNDERLINE_OFFSET_NUMBER_TYPES = ['length', 'percentage'] as const;
export const TOP_NUMBER_TYPES = ['length', 'percentage'] as const;
export const TRANSFORM_NUMBER_TYPES = ['angle', 'length', 'number', 'percentage'] as const;
export const TRANSFORM_ORIGIN_NUMBER_TYPES = ['length', 'percentage'] as const;
export const TRANSITION_NUMBER_TYPES = ['integer', 'number', 'time'] as const;
export const TRANSITION_DELAY_NUMBER_TYPES = ['time'] as const;
export const TRANSITION_DURATION_NUMBER_TYPES = ['time'] as const;
export const TRANSITION_TIMING_FUNCTION_NUMBER_TYPES = ['integer', 'number'] as const;
export const TRANSLATE_NUMBER_TYPES = ['length', 'percentage'] as const;
export const VERTICAL_ALIGN_NUMBER_TYPES = ['length', 'percentage'] as const;
export const VIEW_TIMELINE_INSET_NUMBER_TYPES = ['length', 'percentage'] as const;
export const VOICE_BALANCE_NUMBER_TYPES = ['number'] as const;
export const VOICE_DURATION_NUMBER_TYPES = ['time'] as const;
export const VOICE_FAMILY_NUMBER_TYPES = ['integer'] as const;
export const VOICE_PITCH_NUMBER_TYPES = ['frequency', 'percentage'] as const;
export const VOICE_RANGE_NUMBER_TYPES = ['frequency', 'percentage'] as const;
export const VOICE_RATE_NUMBER_TYPES = ['percentage'] as const;
export const WIDOWS_NUMBER_TYPES = ['integer'] as const;
export const WIDTH_NUMBER_TYPES = ['length', 'percentage'] as const;
export const WORD_SPACING_NUMBER_TYPES = ['length'] as const;
export const X_NUMBER_TYPES = ['length', 'percentage'] as const;
export const Y_NUMBER_TYPES = ['length', 'percentage'] as const;
export const Z_INDEX_NUMBER_TYPES = ['integer'] as const;
export const ZOOM_NUMBER_TYPES = ['number', 'percentage'] as const;

// ==================== 属性单位类型 ====================

export type AccentColorUnit = '%' | 'deg' | 'grad' | 'rad' | 'turn' | 'unitless';
export type AccentColorUnitCategory = 'angle' | 'percentage' | 'unitless';
export type AnimationUnit = 'unitless';
export type AnimationUnitCategory = 'unitless';
export type AnimationDelayUnit = 'ms' | 's';
export type AnimationDelayUnitCategory = 'time';
export type AnimationDurationUnit = 'ms' | 's';
export type AnimationDurationUnitCategory = 'time';
export type AnimationIterationCountUnit = 'unitless';
export type AnimationIterationCountUnitCategory = 'unitless';
export type AnimationRangeEndUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type AnimationRangeEndUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type AnimationRangeStartUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type AnimationRangeStartUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type AnimationTimingFunctionUnit = 'unitless';
export type AnimationTimingFunctionUnitCategory = 'unitless';
export type AspectRatioUnit = 'unitless';
export type AspectRatioUnitCategory = 'unitless';
export type AzimuthUnit = 'deg' | 'grad' | 'rad' | 'turn';
export type AzimuthUnitCategory = 'angle';
export type BackdropFilterUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'deg' | 'dvh' | 'dvw' | 'em' | 'ex' | 'grad' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rad' | 'rem' | 'rlh' | 'svh' | 'svw' | 'turn' | 'unitless' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type BackdropFilterUnitCategory = 'angle' | 'fontRelative' | 'percentage' | 'physical' | 'pixel' | 'unitless';
export type BackgroundUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'deg' | 'dpcm' | 'dpi' | 'dppx' | 'dvh' | 'dvw' | 'em' | 'ex' | 'grad' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rad' | 'rem' | 'rlh' | 'svh' | 'svw' | 'turn' | 'unitless' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw' | 'x';
export type BackgroundUnitCategory = 'angle' | 'fontRelative' | 'percentage' | 'physical' | 'pixel' | 'resolution' | 'unitless';
export type BackgroundColorUnit = '%' | 'deg' | 'grad' | 'rad' | 'turn' | 'unitless';
export type BackgroundColorUnitCategory = 'angle' | 'percentage' | 'unitless';
export type BackgroundImageUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'deg' | 'dpcm' | 'dpi' | 'dppx' | 'dvh' | 'dvw' | 'em' | 'ex' | 'grad' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rad' | 'rem' | 'rlh' | 'svh' | 'svw' | 'turn' | 'unitless' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw' | 'x';
export type BackgroundImageUnitCategory = 'angle' | 'fontRelative' | 'percentage' | 'physical' | 'pixel' | 'resolution' | 'unitless';
export type BackgroundPositionUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type BackgroundPositionUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type BackgroundPositionXUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type BackgroundPositionXUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type BackgroundPositionYUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type BackgroundPositionYUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type BackgroundSizeUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type BackgroundSizeUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type BaselineShiftUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'unitless' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type BaselineShiftUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel' | 'unitless';
export type BorderUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'deg' | 'dvh' | 'dvw' | 'em' | 'ex' | 'grad' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rad' | 'rem' | 'rlh' | 'svh' | 'svw' | 'turn' | 'unitless' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type BorderUnitCategory = 'angle' | 'fontRelative' | 'percentage' | 'physical' | 'pixel' | 'unitless';
export type BorderBlockUnit = '%' | 'deg' | 'grad' | 'rad' | 'turn' | 'unitless';
export type BorderBlockUnitCategory = 'angle' | 'percentage' | 'unitless';
export type BorderBlockEndUnit = '%' | 'deg' | 'grad' | 'rad' | 'turn' | 'unitless';
export type BorderBlockEndUnitCategory = 'angle' | 'percentage' | 'unitless';
export type BorderBlockStartUnit = '%' | 'deg' | 'grad' | 'rad' | 'turn' | 'unitless';
export type BorderBlockStartUnitCategory = 'angle' | 'percentage' | 'unitless';
export type BorderBottomUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'deg' | 'dvh' | 'dvw' | 'em' | 'ex' | 'grad' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rad' | 'rem' | 'rlh' | 'svh' | 'svw' | 'turn' | 'unitless' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type BorderBottomUnitCategory = 'angle' | 'fontRelative' | 'percentage' | 'physical' | 'pixel' | 'unitless';
export type BorderBottomLeftRadiusUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type BorderBottomLeftRadiusUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type BorderBottomRightRadiusUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type BorderBottomRightRadiusUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type BorderBottomWidthUnit = 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type BorderBottomWidthUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type BorderColorUnit = '%' | 'deg' | 'grad' | 'rad' | 'turn' | 'unitless';
export type BorderColorUnitCategory = 'angle' | 'percentage' | 'unitless';
export type BorderEndEndRadiusUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type BorderEndEndRadiusUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type BorderEndStartRadiusUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type BorderEndStartRadiusUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type BorderImageOutsetUnit = 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'unitless' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type BorderImageOutsetUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel' | 'unitless';
export type BorderImageSliceUnit = '%' | 'unitless';
export type BorderImageSliceUnitCategory = 'percentage' | 'unitless';
export type BorderImageSourceUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'deg' | 'dpcm' | 'dpi' | 'dppx' | 'dvh' | 'dvw' | 'em' | 'ex' | 'grad' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rad' | 'rem' | 'rlh' | 'svh' | 'svw' | 'turn' | 'unitless' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw' | 'x';
export type BorderImageSourceUnitCategory = 'angle' | 'fontRelative' | 'percentage' | 'physical' | 'pixel' | 'resolution' | 'unitless';
export type BorderImageWidthUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'unitless' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type BorderImageWidthUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel' | 'unitless';
export type BorderInlineUnit = '%' | 'deg' | 'grad' | 'rad' | 'turn' | 'unitless';
export type BorderInlineUnitCategory = 'angle' | 'percentage' | 'unitless';
export type BorderInlineEndUnit = '%' | 'deg' | 'grad' | 'rad' | 'turn' | 'unitless';
export type BorderInlineEndUnitCategory = 'angle' | 'percentage' | 'unitless';
export type BorderInlineStartUnit = '%' | 'deg' | 'grad' | 'rad' | 'turn' | 'unitless';
export type BorderInlineStartUnitCategory = 'angle' | 'percentage' | 'unitless';
export type BorderLeftUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'deg' | 'dvh' | 'dvw' | 'em' | 'ex' | 'grad' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rad' | 'rem' | 'rlh' | 'svh' | 'svw' | 'turn' | 'unitless' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type BorderLeftUnitCategory = 'angle' | 'fontRelative' | 'percentage' | 'physical' | 'pixel' | 'unitless';
export type BorderLeftColorUnit = '%' | 'deg' | 'grad' | 'rad' | 'turn' | 'unitless';
export type BorderLeftColorUnitCategory = 'angle' | 'percentage' | 'unitless';
export type BorderLeftWidthUnit = 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type BorderLeftWidthUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type BorderRadiusUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type BorderRadiusUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type BorderRightUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'deg' | 'dvh' | 'dvw' | 'em' | 'ex' | 'grad' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rad' | 'rem' | 'rlh' | 'svh' | 'svw' | 'turn' | 'unitless' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type BorderRightUnitCategory = 'angle' | 'fontRelative' | 'percentage' | 'physical' | 'pixel' | 'unitless';
export type BorderRightColorUnit = '%' | 'deg' | 'grad' | 'rad' | 'turn' | 'unitless';
export type BorderRightColorUnitCategory = 'angle' | 'percentage' | 'unitless';
export type BorderRightWidthUnit = 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type BorderRightWidthUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type BorderSpacingUnit = 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type BorderSpacingUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type BorderStartEndRadiusUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type BorderStartEndRadiusUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type BorderStartStartRadiusUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type BorderStartStartRadiusUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type BorderTopUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'deg' | 'dvh' | 'dvw' | 'em' | 'ex' | 'grad' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rad' | 'rem' | 'rlh' | 'svh' | 'svw' | 'turn' | 'unitless' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type BorderTopUnitCategory = 'angle' | 'fontRelative' | 'percentage' | 'physical' | 'pixel' | 'unitless';
export type BorderTopColorUnit = '%' | 'deg' | 'grad' | 'rad' | 'turn' | 'unitless';
export type BorderTopColorUnitCategory = 'angle' | 'percentage' | 'unitless';
export type BorderTopLeftRadiusUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type BorderTopLeftRadiusUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type BorderTopRightRadiusUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type BorderTopRightRadiusUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type BorderTopWidthUnit = 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type BorderTopWidthUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type BorderWidthUnit = 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type BorderWidthUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type BottomUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type BottomUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type BoxFlexUnit = 'unitless';
export type BoxFlexUnitCategory = 'unitless';
export type BoxFlexGroupUnit = 'unitless';
export type BoxFlexGroupUnitCategory = 'unitless';
export type BoxOrdinalGroupUnit = 'unitless';
export type BoxOrdinalGroupUnitCategory = 'unitless';
export type BoxShadowUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'deg' | 'dvh' | 'dvw' | 'em' | 'ex' | 'grad' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rad' | 'rem' | 'rlh' | 'svh' | 'svw' | 'turn' | 'unitless' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type BoxShadowUnitCategory = 'angle' | 'fontRelative' | 'percentage' | 'physical' | 'pixel' | 'unitless';
export type CaretColorUnit = '%' | 'deg' | 'grad' | 'rad' | 'turn' | 'unitless';
export type CaretColorUnitCategory = 'angle' | 'percentage' | 'unitless';
export type ClipUnit = 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type ClipUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type ClipPathUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type ClipPathUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type ColorUnit = '%' | 'deg' | 'grad' | 'rad' | 'turn' | 'unitless';
export type ColorUnitCategory = 'angle' | 'percentage' | 'unitless';
export type ColumnCountUnit = 'unitless';
export type ColumnCountUnitCategory = 'unitless';
export type ColumnGapUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type ColumnGapUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type ColumnRuleColorUnit = '%' | 'deg' | 'grad' | 'rad' | 'turn' | 'unitless';
export type ColumnRuleColorUnitCategory = 'angle' | 'percentage' | 'unitless';
export type ColumnWidthUnit = 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type ColumnWidthUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type ContainIntrinsicBlockSizeUnit = 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type ContainIntrinsicBlockSizeUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type ContainIntrinsicHeightUnit = 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type ContainIntrinsicHeightUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type ContainIntrinsicInlineSizeUnit = 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type ContainIntrinsicInlineSizeUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type ContainIntrinsicSizeUnit = 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type ContainIntrinsicSizeUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type ContainIntrinsicWidthUnit = 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type ContainIntrinsicWidthUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type ContentUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'deg' | 'dpcm' | 'dpi' | 'dppx' | 'dvh' | 'dvw' | 'em' | 'ex' | 'grad' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rad' | 'rem' | 'rlh' | 'svh' | 'svw' | 'turn' | 'unitless' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw' | 'x';
export type ContentUnitCategory = 'angle' | 'fontRelative' | 'percentage' | 'physical' | 'pixel' | 'resolution' | 'unitless';
export type CounterIncrementUnit = 'unitless';
export type CounterIncrementUnitCategory = 'unitless';
export type CounterResetUnit = 'unitless';
export type CounterResetUnitCategory = 'unitless';
export type CounterSetUnit = 'unitless';
export type CounterSetUnitCategory = 'unitless';
export type CursorUnit = 'unitless';
export type CursorUnitCategory = 'unitless';
export type CxUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type CxUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type CyUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type CyUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type FillUnit = '%' | 'deg' | 'grad' | 'rad' | 'turn' | 'unitless';
export type FillUnitCategory = 'angle' | 'percentage' | 'unitless';
export type FillOpacityUnit = 'unitless';
export type FillOpacityUnitCategory = 'unitless';
export type FilterUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'deg' | 'dvh' | 'dvw' | 'em' | 'ex' | 'grad' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rad' | 'rem' | 'rlh' | 'svh' | 'svw' | 'turn' | 'unitless' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type FilterUnitCategory = 'angle' | 'fontRelative' | 'percentage' | 'physical' | 'pixel' | 'unitless';
export type FlexGrowUnit = 'unitless';
export type FlexGrowUnitCategory = 'unitless';
export type FlexShrinkUnit = 'unitless';
export type FlexShrinkUnitCategory = 'unitless';
export type FontFeatureSettingsUnit = 'unitless';
export type FontFeatureSettingsUnitCategory = 'unitless';
export type FontSizeUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type FontSizeUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type FontSizeAdjustUnit = 'unitless';
export type FontSizeAdjustUnitCategory = 'unitless';
export type FontSmoothUnit = 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type FontSmoothUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type FontStretchUnit = '%';
export type FontStretchUnitCategory = 'percentage';
export type FontStyleUnit = 'deg' | 'grad' | 'rad' | 'turn';
export type FontStyleUnitCategory = 'angle';
export type FontVariationSettingsUnit = 'unitless';
export type FontVariationSettingsUnitCategory = 'unitless';
export type FontWeightUnit = 'unitless';
export type FontWeightUnitCategory = 'unitless';
export type GlyphOrientationHorizontalUnit = 'deg' | 'grad' | 'rad' | 'turn';
export type GlyphOrientationHorizontalUnitCategory = 'angle';
export type GlyphOrientationVerticalUnit = 'deg' | 'grad' | 'rad' | 'turn';
export type GlyphOrientationVerticalUnitCategory = 'angle';
export type GridAreaUnit = 'unitless';
export type GridAreaUnitCategory = 'unitless';
export type GridAutoColumnsUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'fr' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type GridAutoColumnsUnitCategory = 'flex' | 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type GridAutoRowsUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'fr' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type GridAutoRowsUnitCategory = 'flex' | 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type GridColumnUnit = 'unitless';
export type GridColumnUnitCategory = 'unitless';
export type GridColumnEndUnit = 'unitless';
export type GridColumnEndUnitCategory = 'unitless';
export type GridColumnGapUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type GridColumnGapUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type GridColumnStartUnit = 'unitless';
export type GridColumnStartUnitCategory = 'unitless';
export type GridRowUnit = 'unitless';
export type GridRowUnitCategory = 'unitless';
export type GridRowEndUnit = 'unitless';
export type GridRowEndUnitCategory = 'unitless';
export type GridRowGapUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type GridRowGapUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type GridRowStartUnit = 'unitless';
export type GridRowStartUnitCategory = 'unitless';
export type GridTemplateUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'fr' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type GridTemplateUnitCategory = 'flex' | 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type GridTemplateColumnsUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'fr' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'unitless' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type GridTemplateColumnsUnitCategory = 'flex' | 'fontRelative' | 'percentage' | 'physical' | 'pixel' | 'unitless';
export type GridTemplateRowsUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'fr' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'unitless' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type GridTemplateRowsUnitCategory = 'flex' | 'fontRelative' | 'percentage' | 'physical' | 'pixel' | 'unitless';
export type HeightUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type HeightUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type HyphenateLimitCharsUnit = 'unitless';
export type HyphenateLimitCharsUnitCategory = 'unitless';
export type ImageOrientationUnit = 'deg' | 'grad' | 'rad' | 'turn';
export type ImageOrientationUnitCategory = 'angle';
export type ImageResolutionUnit = 'dpcm' | 'dpi' | 'dppx' | 'x';
export type ImageResolutionUnitCategory = 'resolution';
export type InitialLetterUnit = 'unitless';
export type InitialLetterUnitCategory = 'unitless';
export type KerningUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'unitless' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type KerningUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel' | 'unitless';
export type LeftUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type LeftUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type LetterSpacingUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type LetterSpacingUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type LineClampUnit = 'unitless';
export type LineClampUnitCategory = 'unitless';
export type LineHeightUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'unitless' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type LineHeightUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel' | 'unitless';
export type LineHeightStepUnit = 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type LineHeightStepUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type ListStyleImageUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'deg' | 'dpcm' | 'dpi' | 'dppx' | 'dvh' | 'dvw' | 'em' | 'ex' | 'grad' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rad' | 'rem' | 'rlh' | 'svh' | 'svw' | 'turn' | 'unitless' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw' | 'x';
export type ListStyleImageUnitCategory = 'angle' | 'fontRelative' | 'percentage' | 'physical' | 'pixel' | 'resolution' | 'unitless';
export type MarginUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type MarginUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type MarginBottomUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type MarginBottomUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type MarginLeftUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type MarginLeftUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type MarginRightUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type MarginRightUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type MarginTopUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type MarginTopUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type MaskUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'deg' | 'dpcm' | 'dpi' | 'dppx' | 'dvh' | 'dvw' | 'em' | 'ex' | 'grad' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rad' | 'rem' | 'rlh' | 'svh' | 'svw' | 'turn' | 'unitless' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw' | 'x';
export type MaskUnitCategory = 'angle' | 'fontRelative' | 'percentage' | 'physical' | 'pixel' | 'resolution' | 'unitless';
export type MaskBorderOutsetUnit = 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'unitless' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type MaskBorderOutsetUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel' | 'unitless';
export type MaskBorderSliceUnit = '%' | 'unitless';
export type MaskBorderSliceUnitCategory = 'percentage' | 'unitless';
export type MaskBorderSourceUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'deg' | 'dpcm' | 'dpi' | 'dppx' | 'dvh' | 'dvw' | 'em' | 'ex' | 'grad' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rad' | 'rem' | 'rlh' | 'svh' | 'svw' | 'turn' | 'unitless' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw' | 'x';
export type MaskBorderSourceUnitCategory = 'angle' | 'fontRelative' | 'percentage' | 'physical' | 'pixel' | 'resolution' | 'unitless';
export type MaskBorderWidthUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'unitless' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type MaskBorderWidthUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel' | 'unitless';
export type MaskImageUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'deg' | 'dpcm' | 'dpi' | 'dppx' | 'dvh' | 'dvw' | 'em' | 'ex' | 'grad' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rad' | 'rem' | 'rlh' | 'svh' | 'svw' | 'turn' | 'unitless' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw' | 'x';
export type MaskImageUnitCategory = 'angle' | 'fontRelative' | 'percentage' | 'physical' | 'pixel' | 'resolution' | 'unitless';
export type MaskPositionUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type MaskPositionUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type MaskSizeUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type MaskSizeUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type MathDepthUnit = 'unitless';
export type MathDepthUnitCategory = 'unitless';
export type MaxHeightUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type MaxHeightUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type MaxLinesUnit = 'unitless';
export type MaxLinesUnitCategory = 'unitless';
export type MaxWidthUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type MaxWidthUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type MinHeightUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type MinHeightUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type MinWidthUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type MinWidthUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type ObjectPositionUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type ObjectPositionUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type OffsetAnchorUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type OffsetAnchorUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type OffsetDistanceUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type OffsetDistanceUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type OffsetPathUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'deg' | 'dvh' | 'dvw' | 'em' | 'ex' | 'grad' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rad' | 'rem' | 'rlh' | 'svh' | 'svw' | 'turn' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type OffsetPathUnitCategory = 'angle' | 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type OffsetPositionUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type OffsetPositionUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type OffsetRotateUnit = 'deg' | 'grad' | 'rad' | 'turn';
export type OffsetRotateUnitCategory = 'angle';
export type OpacityUnit = '%' | 'unitless';
export type OpacityUnitCategory = 'percentage' | 'unitless';
export type OrderUnit = 'unitless';
export type OrderUnitCategory = 'unitless';
export type OrphansUnit = 'unitless';
export type OrphansUnitCategory = 'unitless';
export type OutlineColorUnit = '%' | 'deg' | 'grad' | 'rad' | 'turn' | 'unitless';
export type OutlineColorUnitCategory = 'angle' | 'percentage' | 'unitless';
export type OutlineOffsetUnit = 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type OutlineOffsetUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type OutlineWidthUnit = 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type OutlineWidthUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type OverflowClipMarginUnit = 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type OverflowClipMarginUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type PaddingUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type PaddingUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type PaddingBottomUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type PaddingBottomUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type PaddingLeftUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type PaddingLeftUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type PaddingRightUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type PaddingRightUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type PaddingTopUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type PaddingTopUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type PauseAfterUnit = 'ms' | 's';
export type PauseAfterUnitCategory = 'time';
export type PauseBeforeUnit = 'ms' | 's';
export type PauseBeforeUnitCategory = 'time';
export type PerspectiveUnit = 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type PerspectiveUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type PerspectiveOriginUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type PerspectiveOriginUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type RUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type RUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type RestAfterUnit = 'ms' | 's';
export type RestAfterUnitCategory = 'time';
export type RestBeforeUnit = 'ms' | 's';
export type RestBeforeUnitCategory = 'time';
export type RightUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type RightUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type RotateUnit = 'deg' | 'grad' | 'rad' | 'turn' | 'unitless';
export type RotateUnitCategory = 'angle' | 'unitless';
export type RowGapUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type RowGapUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type RxUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type RxUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type RyUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type RyUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type ScaleUnit = '%' | 'unitless';
export type ScaleUnitCategory = 'percentage' | 'unitless';
export type ScrollMarginUnit = 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type ScrollMarginUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type ScrollMarginBlockUnit = 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type ScrollMarginBlockUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type ScrollMarginBlockEndUnit = 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type ScrollMarginBlockEndUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type ScrollMarginBlockStartUnit = 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type ScrollMarginBlockStartUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type ScrollMarginBottomUnit = 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type ScrollMarginBottomUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type ScrollMarginInlineUnit = 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type ScrollMarginInlineUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type ScrollMarginInlineEndUnit = 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type ScrollMarginInlineEndUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type ScrollMarginInlineStartUnit = 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type ScrollMarginInlineStartUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type ScrollMarginLeftUnit = 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type ScrollMarginLeftUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type ScrollMarginRightUnit = 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type ScrollMarginRightUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type ScrollMarginTopUnit = 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type ScrollMarginTopUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type ScrollPaddingUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type ScrollPaddingUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type ScrollPaddingBlockUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type ScrollPaddingBlockUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type ScrollPaddingBlockEndUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type ScrollPaddingBlockEndUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type ScrollPaddingBlockStartUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type ScrollPaddingBlockStartUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type ScrollPaddingBottomUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type ScrollPaddingBottomUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type ScrollPaddingInlineUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type ScrollPaddingInlineUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type ScrollPaddingInlineEndUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type ScrollPaddingInlineEndUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type ScrollPaddingInlineStartUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type ScrollPaddingInlineStartUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type ScrollPaddingLeftUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type ScrollPaddingLeftUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type ScrollPaddingRightUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type ScrollPaddingRightUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type ScrollPaddingTopUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type ScrollPaddingTopUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type ScrollSnapCoordinateUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type ScrollSnapCoordinateUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type ScrollSnapDestinationUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type ScrollSnapDestinationUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type ScrollSnapPointsXUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type ScrollSnapPointsXUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type ScrollSnapPointsYUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type ScrollSnapPointsYUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type ScrollbarColorUnit = '%' | 'deg' | 'grad' | 'rad' | 'turn' | 'unitless';
export type ScrollbarColorUnitCategory = 'angle' | 'percentage' | 'unitless';
export type ShapeImageThresholdUnit = '%' | 'unitless';
export type ShapeImageThresholdUnitCategory = 'percentage' | 'unitless';
export type ShapeMarginUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type ShapeMarginUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type ShapeOutsideUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'deg' | 'dpcm' | 'dpi' | 'dppx' | 'dvh' | 'dvw' | 'em' | 'ex' | 'grad' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rad' | 'rem' | 'rlh' | 'svh' | 'svw' | 'turn' | 'unitless' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw' | 'x';
export type ShapeOutsideUnitCategory = 'angle' | 'fontRelative' | 'percentage' | 'physical' | 'pixel' | 'resolution' | 'unitless';
export type StrokeUnit = '%' | 'deg' | 'grad' | 'rad' | 'turn' | 'unitless';
export type StrokeUnitCategory = 'angle' | 'percentage' | 'unitless';
export type StrokeDasharrayUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'unitless' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type StrokeDasharrayUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel' | 'unitless';
export type StrokeDashoffsetUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'unitless' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type StrokeDashoffsetUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel' | 'unitless';
export type StrokeMiterlimitUnit = 'unitless';
export type StrokeMiterlimitUnitCategory = 'unitless';
export type StrokeWidthUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'unitless' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type StrokeWidthUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel' | 'unitless';
export type TabSizeUnit = 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'unitless' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type TabSizeUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel' | 'unitless';
export type TextCombineUprightUnit = 'unitless';
export type TextCombineUprightUnitCategory = 'unitless';
export type TextDecorationColorUnit = '%' | 'deg' | 'grad' | 'rad' | 'turn' | 'unitless';
export type TextDecorationColorUnitCategory = 'angle' | 'percentage' | 'unitless';
export type TextDecorationThicknessUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type TextDecorationThicknessUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type TextEmphasisColorUnit = '%' | 'deg' | 'grad' | 'rad' | 'turn' | 'unitless';
export type TextEmphasisColorUnitCategory = 'angle' | 'percentage' | 'unitless';
export type TextIndentUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type TextIndentUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type TextShadowUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'deg' | 'dvh' | 'dvw' | 'em' | 'ex' | 'grad' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rad' | 'rem' | 'rlh' | 'svh' | 'svw' | 'turn' | 'unitless' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type TextShadowUnitCategory = 'angle' | 'fontRelative' | 'percentage' | 'physical' | 'pixel' | 'unitless';
export type TextSizeAdjustUnit = '%';
export type TextSizeAdjustUnitCategory = 'percentage';
export type TextUnderlineOffsetUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type TextUnderlineOffsetUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type TopUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type TopUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type TransformUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'deg' | 'dvh' | 'dvw' | 'em' | 'ex' | 'grad' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rad' | 'rem' | 'rlh' | 'svh' | 'svw' | 'turn' | 'unitless' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type TransformUnitCategory = 'angle' | 'fontRelative' | 'percentage' | 'physical' | 'pixel' | 'unitless';
export type TransformOriginUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type TransformOriginUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type TransitionUnit = 'ms' | 's' | 'unitless';
export type TransitionUnitCategory = 'time' | 'unitless';
export type TransitionDelayUnit = 'ms' | 's';
export type TransitionDelayUnitCategory = 'time';
export type TransitionDurationUnit = 'ms' | 's';
export type TransitionDurationUnitCategory = 'time';
export type TransitionTimingFunctionUnit = 'unitless';
export type TransitionTimingFunctionUnitCategory = 'unitless';
export type TranslateUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type TranslateUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type VerticalAlignUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type VerticalAlignUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type ViewTimelineInsetUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type ViewTimelineInsetUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type VoiceBalanceUnit = 'unitless';
export type VoiceBalanceUnitCategory = 'unitless';
export type VoiceDurationUnit = 'ms' | 's';
export type VoiceDurationUnitCategory = 'time';
export type VoiceFamilyUnit = 'unitless';
export type VoiceFamilyUnitCategory = 'unitless';
export type VoicePitchUnit = '%' | 'Hz' | 'kHz';
export type VoicePitchUnitCategory = 'frequency' | 'percentage';
export type VoiceRangeUnit = '%' | 'Hz' | 'kHz';
export type VoiceRangeUnitCategory = 'frequency' | 'percentage';
export type VoiceRateUnit = '%';
export type VoiceRateUnitCategory = 'percentage';
export type WidowsUnit = 'unitless';
export type WidowsUnitCategory = 'unitless';
export type WidthUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type WidthUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type WordSpacingUnit = 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type WordSpacingUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type XUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type XUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type YUnit = '%' | 'Q' | 'cap' | 'ch' | 'cm' | 'dvh' | 'dvw' | 'em' | 'ex' | 'ic' | 'in' | 'lh' | 'lvh' | 'lvw' | 'mm' | 'pc' | 'pt' | 'px' | 'rem' | 'rlh' | 'svh' | 'svw' | 'vb' | 'vh' | 'vi' | 'vmax' | 'vmin' | 'vw';
export type YUnitCategory = 'fontRelative' | 'percentage' | 'physical' | 'pixel';
export type ZIndexUnit = 'unitless';
export type ZIndexUnitCategory = 'unitless';
export type ZoomUnit = '%' | 'unitless';
export type ZoomUnitCategory = 'percentage' | 'unitless';

// ==================== 属性配置类 ====================

export class AccentColorConfig {
  static readonly DEFAULT_KEYWORDS = [...ACCENT_COLOR_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...ACCENT_COLOR_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class AlignContentConfig {
  static readonly DEFAULT_KEYWORDS = [...ALIGN_CONTENT_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class AlignItemsConfig {
  static readonly DEFAULT_KEYWORDS = [...ALIGN_ITEMS_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class AlignSelfConfig {
  static readonly DEFAULT_KEYWORDS = [...ALIGN_SELF_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class AlignTracksConfig {
  static readonly DEFAULT_KEYWORDS = [...ALIGN_TRACKS_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class AlignmentBaselineConfig {
  static readonly DEFAULT_KEYWORDS = [...ALIGNMENT_BASELINE_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class AllConfig {
  static readonly DEFAULT_KEYWORDS = [...ALL_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class AnchorNameConfig {
  static readonly DEFAULT_KEYWORDS = [...ANCHOR_NAME_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class AnchorScopeConfig {
  static readonly DEFAULT_KEYWORDS = [...ANCHOR_SCOPE_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class AnimationConfig {
  static readonly DEFAULT_KEYWORDS = [...ANIMATION_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...ANIMATION_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class AnimationCompositionConfig {
  static readonly DEFAULT_KEYWORDS = [...ANIMATION_COMPOSITION_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class AnimationDelayConfig {
  static readonly DEFAULT_NUMBER_TYPES = [...ANIMATION_DELAY_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class AnimationDirectionConfig {
  static readonly DEFAULT_KEYWORDS = [...ANIMATION_DIRECTION_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class AnimationDurationConfig {
  static readonly DEFAULT_NUMBER_TYPES = [...ANIMATION_DURATION_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class AnimationFillModeConfig {
  static readonly DEFAULT_KEYWORDS = [...ANIMATION_FILL_MODE_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class AnimationIterationCountConfig {
  static readonly DEFAULT_KEYWORDS = [...ANIMATION_ITERATION_COUNT_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...ANIMATION_ITERATION_COUNT_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class AnimationNameConfig {
  static readonly DEFAULT_KEYWORDS = [...ANIMATION_NAME_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class AnimationPlayStateConfig {
  static readonly DEFAULT_KEYWORDS = [...ANIMATION_PLAY_STATE_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class AnimationRangeConfig {
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class AnimationRangeEndConfig {
  static readonly DEFAULT_KEYWORDS = [...ANIMATION_RANGE_END_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...ANIMATION_RANGE_END_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class AnimationRangeStartConfig {
  static readonly DEFAULT_KEYWORDS = [...ANIMATION_RANGE_START_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...ANIMATION_RANGE_START_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class AnimationTimelineConfig {
  static readonly DEFAULT_KEYWORDS = [...ANIMATION_TIMELINE_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class AnimationTimingFunctionConfig {
  static readonly DEFAULT_KEYWORDS = [...ANIMATION_TIMING_FUNCTION_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...ANIMATION_TIMING_FUNCTION_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class AppearanceConfig {
  static readonly DEFAULT_KEYWORDS = [...APPEARANCE_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class AspectRatioConfig {
  static readonly DEFAULT_KEYWORDS = [...ASPECT_RATIO_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...ASPECT_RATIO_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class AzimuthConfig {
  static readonly DEFAULT_KEYWORDS = [...AZIMUTH_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...AZIMUTH_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BackdropFilterConfig {
  static readonly DEFAULT_KEYWORDS = [...BACKDROP_FILTER_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...BACKDROP_FILTER_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BackfaceVisibilityConfig {
  static readonly DEFAULT_KEYWORDS = [...BACKFACE_VISIBILITY_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BackgroundConfig {
  static readonly DEFAULT_KEYWORDS = [...BACKGROUND_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...BACKGROUND_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BackgroundAttachmentConfig {
  static readonly DEFAULT_KEYWORDS = [...BACKGROUND_ATTACHMENT_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BackgroundBlendModeConfig {
  static readonly DEFAULT_KEYWORDS = [...BACKGROUND_BLEND_MODE_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BackgroundClipConfig {
  static readonly DEFAULT_KEYWORDS = [...BACKGROUND_CLIP_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BackgroundColorConfig {
  static readonly DEFAULT_KEYWORDS = [...BACKGROUND_COLOR_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...BACKGROUND_COLOR_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BackgroundImageConfig {
  static readonly DEFAULT_KEYWORDS = [...BACKGROUND_IMAGE_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...BACKGROUND_IMAGE_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BackgroundOriginConfig {
  static readonly DEFAULT_KEYWORDS = [...BACKGROUND_ORIGIN_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BackgroundPositionConfig {
  static readonly DEFAULT_KEYWORDS = [...BACKGROUND_POSITION_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...BACKGROUND_POSITION_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BackgroundPositionXConfig {
  static readonly DEFAULT_KEYWORDS = [...BACKGROUND_POSITION_X_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...BACKGROUND_POSITION_X_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BackgroundPositionYConfig {
  static readonly DEFAULT_KEYWORDS = [...BACKGROUND_POSITION_Y_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...BACKGROUND_POSITION_Y_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BackgroundRepeatConfig {
  static readonly DEFAULT_KEYWORDS = [...BACKGROUND_REPEAT_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BackgroundSizeConfig {
  static readonly DEFAULT_KEYWORDS = [...BACKGROUND_SIZE_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...BACKGROUND_SIZE_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BaselineShiftConfig {
  static readonly DEFAULT_KEYWORDS = [...BASELINE_SHIFT_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...BASELINE_SHIFT_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BehaviorConfig {
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BlockSizeConfig {
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BorderConfig {
  static readonly DEFAULT_KEYWORDS = [...BORDER_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...BORDER_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BorderBlockConfig {
  static readonly DEFAULT_KEYWORDS = [...BORDER_BLOCK_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...BORDER_BLOCK_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BorderBlockColorConfig {
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BorderBlockEndConfig {
  static readonly DEFAULT_KEYWORDS = [...BORDER_BLOCK_END_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...BORDER_BLOCK_END_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BorderBlockEndColorConfig {
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BorderBlockEndStyleConfig {
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BorderBlockEndWidthConfig {
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BorderBlockStartConfig {
  static readonly DEFAULT_KEYWORDS = [...BORDER_BLOCK_START_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...BORDER_BLOCK_START_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BorderBlockStartColorConfig {
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BorderBlockStartStyleConfig {
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BorderBlockStartWidthConfig {
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BorderBlockStyleConfig {
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BorderBlockWidthConfig {
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BorderBottomConfig {
  static readonly DEFAULT_KEYWORDS = [...BORDER_BOTTOM_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...BORDER_BOTTOM_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BorderBottomColorConfig {
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BorderBottomLeftRadiusConfig {
  static readonly DEFAULT_NUMBER_TYPES = [...BORDER_BOTTOM_LEFT_RADIUS_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BorderBottomRightRadiusConfig {
  static readonly DEFAULT_NUMBER_TYPES = [...BORDER_BOTTOM_RIGHT_RADIUS_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BorderBottomStyleConfig {
  static readonly DEFAULT_KEYWORDS = [...BORDER_BOTTOM_STYLE_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BorderBottomWidthConfig {
  static readonly DEFAULT_KEYWORDS = [...BORDER_BOTTOM_WIDTH_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...BORDER_BOTTOM_WIDTH_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BorderCollapseConfig {
  static readonly DEFAULT_KEYWORDS = [...BORDER_COLLAPSE_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BorderColorConfig {
  static readonly DEFAULT_KEYWORDS = [...BORDER_COLOR_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...BORDER_COLOR_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BorderEndEndRadiusConfig {
  static readonly DEFAULT_NUMBER_TYPES = [...BORDER_END_END_RADIUS_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BorderEndStartRadiusConfig {
  static readonly DEFAULT_NUMBER_TYPES = [...BORDER_END_START_RADIUS_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BorderImageConfig {
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BorderImageOutsetConfig {
  static readonly DEFAULT_NUMBER_TYPES = [...BORDER_IMAGE_OUTSET_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BorderImageRepeatConfig {
  static readonly DEFAULT_KEYWORDS = [...BORDER_IMAGE_REPEAT_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BorderImageSliceConfig {
  static readonly DEFAULT_KEYWORDS = [...BORDER_IMAGE_SLICE_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...BORDER_IMAGE_SLICE_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BorderImageSourceConfig {
  static readonly DEFAULT_KEYWORDS = [...BORDER_IMAGE_SOURCE_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...BORDER_IMAGE_SOURCE_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BorderImageWidthConfig {
  static readonly DEFAULT_KEYWORDS = [...BORDER_IMAGE_WIDTH_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...BORDER_IMAGE_WIDTH_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BorderInlineConfig {
  static readonly DEFAULT_KEYWORDS = [...BORDER_INLINE_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...BORDER_INLINE_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BorderInlineColorConfig {
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BorderInlineEndConfig {
  static readonly DEFAULT_KEYWORDS = [...BORDER_INLINE_END_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...BORDER_INLINE_END_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BorderInlineEndColorConfig {
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BorderInlineEndStyleConfig {
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BorderInlineEndWidthConfig {
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BorderInlineStartConfig {
  static readonly DEFAULT_KEYWORDS = [...BORDER_INLINE_START_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...BORDER_INLINE_START_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BorderInlineStartColorConfig {
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BorderInlineStartStyleConfig {
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BorderInlineStartWidthConfig {
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BorderInlineStyleConfig {
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BorderInlineWidthConfig {
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BorderLeftConfig {
  static readonly DEFAULT_KEYWORDS = [...BORDER_LEFT_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...BORDER_LEFT_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BorderLeftColorConfig {
  static readonly DEFAULT_KEYWORDS = [...BORDER_LEFT_COLOR_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...BORDER_LEFT_COLOR_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BorderLeftStyleConfig {
  static readonly DEFAULT_KEYWORDS = [...BORDER_LEFT_STYLE_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BorderLeftWidthConfig {
  static readonly DEFAULT_KEYWORDS = [...BORDER_LEFT_WIDTH_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...BORDER_LEFT_WIDTH_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BorderRadiusConfig {
  static readonly DEFAULT_NUMBER_TYPES = [...BORDER_RADIUS_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BorderRightConfig {
  static readonly DEFAULT_KEYWORDS = [...BORDER_RIGHT_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...BORDER_RIGHT_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BorderRightColorConfig {
  static readonly DEFAULT_KEYWORDS = [...BORDER_RIGHT_COLOR_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...BORDER_RIGHT_COLOR_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BorderRightStyleConfig {
  static readonly DEFAULT_KEYWORDS = [...BORDER_RIGHT_STYLE_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BorderRightWidthConfig {
  static readonly DEFAULT_KEYWORDS = [...BORDER_RIGHT_WIDTH_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...BORDER_RIGHT_WIDTH_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BorderSpacingConfig {
  static readonly DEFAULT_NUMBER_TYPES = [...BORDER_SPACING_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BorderStartEndRadiusConfig {
  static readonly DEFAULT_NUMBER_TYPES = [...BORDER_START_END_RADIUS_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BorderStartStartRadiusConfig {
  static readonly DEFAULT_NUMBER_TYPES = [...BORDER_START_START_RADIUS_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BorderStyleConfig {
  static readonly DEFAULT_KEYWORDS = [...BORDER_STYLE_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BorderTopConfig {
  static readonly DEFAULT_KEYWORDS = [...BORDER_TOP_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...BORDER_TOP_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BorderTopColorConfig {
  static readonly DEFAULT_KEYWORDS = [...BORDER_TOP_COLOR_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...BORDER_TOP_COLOR_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BorderTopLeftRadiusConfig {
  static readonly DEFAULT_NUMBER_TYPES = [...BORDER_TOP_LEFT_RADIUS_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BorderTopRightRadiusConfig {
  static readonly DEFAULT_NUMBER_TYPES = [...BORDER_TOP_RIGHT_RADIUS_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BorderTopStyleConfig {
  static readonly DEFAULT_KEYWORDS = [...BORDER_TOP_STYLE_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BorderTopWidthConfig {
  static readonly DEFAULT_KEYWORDS = [...BORDER_TOP_WIDTH_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...BORDER_TOP_WIDTH_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BorderWidthConfig {
  static readonly DEFAULT_KEYWORDS = [...BORDER_WIDTH_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...BORDER_WIDTH_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BottomConfig {
  static readonly DEFAULT_KEYWORDS = [...BOTTOM_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...BOTTOM_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BoxAlignConfig {
  static readonly DEFAULT_KEYWORDS = [...BOX_ALIGN_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BoxDecorationBreakConfig {
  static readonly DEFAULT_KEYWORDS = [...BOX_DECORATION_BREAK_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BoxDirectionConfig {
  static readonly DEFAULT_KEYWORDS = [...BOX_DIRECTION_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BoxFlexConfig {
  static readonly DEFAULT_NUMBER_TYPES = [...BOX_FLEX_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BoxFlexGroupConfig {
  static readonly DEFAULT_NUMBER_TYPES = [...BOX_FLEX_GROUP_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BoxLinesConfig {
  static readonly DEFAULT_KEYWORDS = [...BOX_LINES_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BoxOrdinalGroupConfig {
  static readonly DEFAULT_NUMBER_TYPES = [...BOX_ORDINAL_GROUP_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BoxOrientConfig {
  static readonly DEFAULT_KEYWORDS = [...BOX_ORIENT_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BoxPackConfig {
  static readonly DEFAULT_KEYWORDS = [...BOX_PACK_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BoxShadowConfig {
  static readonly DEFAULT_KEYWORDS = [...BOX_SHADOW_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...BOX_SHADOW_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BoxSizingConfig {
  static readonly DEFAULT_KEYWORDS = [...BOX_SIZING_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BreakAfterConfig {
  static readonly DEFAULT_KEYWORDS = [...BREAK_AFTER_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BreakBeforeConfig {
  static readonly DEFAULT_KEYWORDS = [...BREAK_BEFORE_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class BreakInsideConfig {
  static readonly DEFAULT_KEYWORDS = [...BREAK_INSIDE_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class CaptionSideConfig {
  static readonly DEFAULT_KEYWORDS = [...CAPTION_SIDE_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class CaretConfig {
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class CaretColorConfig {
  static readonly DEFAULT_KEYWORDS = [...CARET_COLOR_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...CARET_COLOR_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class CaretShapeConfig {
  static readonly DEFAULT_KEYWORDS = [...CARET_SHAPE_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ClearConfig {
  static readonly DEFAULT_KEYWORDS = [...CLEAR_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ClipConfig {
  static readonly DEFAULT_KEYWORDS = [...CLIP_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...CLIP_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ClipPathConfig {
  static readonly DEFAULT_KEYWORDS = [...CLIP_PATH_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...CLIP_PATH_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ClipRuleConfig {
  static readonly DEFAULT_KEYWORDS = [...CLIP_RULE_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ColorConfig {
  static readonly DEFAULT_KEYWORDS = [...COLOR_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...COLOR_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ColorInterpolationFiltersConfig {
  static readonly DEFAULT_KEYWORDS = [...COLOR_INTERPOLATION_FILTERS_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ColorSchemeConfig {
  static readonly DEFAULT_KEYWORDS = [...COLOR_SCHEME_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ColumnCountConfig {
  static readonly DEFAULT_KEYWORDS = [...COLUMN_COUNT_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...COLUMN_COUNT_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ColumnFillConfig {
  static readonly DEFAULT_KEYWORDS = [...COLUMN_FILL_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ColumnGapConfig {
  static readonly DEFAULT_KEYWORDS = [...COLUMN_GAP_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...COLUMN_GAP_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ColumnRuleConfig {
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ColumnRuleColorConfig {
  static readonly DEFAULT_KEYWORDS = [...COLUMN_RULE_COLOR_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...COLUMN_RULE_COLOR_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ColumnRuleStyleConfig {
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ColumnRuleWidthConfig {
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ColumnSpanConfig {
  static readonly DEFAULT_KEYWORDS = [...COLUMN_SPAN_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ColumnWidthConfig {
  static readonly DEFAULT_KEYWORDS = [...COLUMN_WIDTH_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...COLUMN_WIDTH_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ColumnsConfig {
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ContainConfig {
  static readonly DEFAULT_KEYWORDS = [...CONTAIN_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ContainIntrinsicBlockSizeConfig {
  static readonly DEFAULT_KEYWORDS = [...CONTAIN_INTRINSIC_BLOCK_SIZE_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...CONTAIN_INTRINSIC_BLOCK_SIZE_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ContainIntrinsicHeightConfig {
  static readonly DEFAULT_KEYWORDS = [...CONTAIN_INTRINSIC_HEIGHT_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...CONTAIN_INTRINSIC_HEIGHT_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ContainIntrinsicInlineSizeConfig {
  static readonly DEFAULT_KEYWORDS = [...CONTAIN_INTRINSIC_INLINE_SIZE_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...CONTAIN_INTRINSIC_INLINE_SIZE_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ContainIntrinsicSizeConfig {
  static readonly DEFAULT_KEYWORDS = [...CONTAIN_INTRINSIC_SIZE_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...CONTAIN_INTRINSIC_SIZE_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ContainIntrinsicWidthConfig {
  static readonly DEFAULT_KEYWORDS = [...CONTAIN_INTRINSIC_WIDTH_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...CONTAIN_INTRINSIC_WIDTH_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ContainerConfig {
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ContainerNameConfig {
  static readonly DEFAULT_KEYWORDS = [...CONTAINER_NAME_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ContainerTypeConfig {
  static readonly DEFAULT_KEYWORDS = [...CONTAINER_TYPE_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ContentConfig {
  static readonly DEFAULT_KEYWORDS = [...CONTENT_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...CONTENT_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ContentVisibilityConfig {
  static readonly DEFAULT_KEYWORDS = [...CONTENT_VISIBILITY_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class CounterIncrementConfig {
  static readonly DEFAULT_KEYWORDS = [...COUNTER_INCREMENT_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...COUNTER_INCREMENT_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class CounterResetConfig {
  static readonly DEFAULT_KEYWORDS = [...COUNTER_RESET_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...COUNTER_RESET_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class CounterSetConfig {
  static readonly DEFAULT_KEYWORDS = [...COUNTER_SET_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...COUNTER_SET_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class CueConfig {
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class CueAfterConfig {
  static readonly DEFAULT_KEYWORDS = [...CUE_AFTER_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class CueBeforeConfig {
  static readonly DEFAULT_KEYWORDS = [...CUE_BEFORE_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class CursorConfig {
  static readonly DEFAULT_KEYWORDS = [...CURSOR_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...CURSOR_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class CxConfig {
  static readonly DEFAULT_NUMBER_TYPES = [...CX_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class CyConfig {
  static readonly DEFAULT_NUMBER_TYPES = [...CY_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class DConfig {
  static readonly DEFAULT_KEYWORDS = [...D_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class DirectionConfig {
  static readonly DEFAULT_KEYWORDS = [...DIRECTION_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class DisplayConfig {
  static readonly DEFAULT_KEYWORDS = [...DISPLAY_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class DominantBaselineConfig {
  static readonly DEFAULT_KEYWORDS = [...DOMINANT_BASELINE_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class EmptyCellsConfig {
  static readonly DEFAULT_KEYWORDS = [...EMPTY_CELLS_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class FieldSizingConfig {
  static readonly DEFAULT_KEYWORDS = [...FIELD_SIZING_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class FillConfig {
  static readonly DEFAULT_KEYWORDS = [...FILL_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...FILL_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class FillOpacityConfig {
  static readonly DEFAULT_NUMBER_TYPES = [...FILL_OPACITY_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class FillRuleConfig {
  static readonly DEFAULT_KEYWORDS = [...FILL_RULE_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class FilterConfig {
  static readonly DEFAULT_KEYWORDS = [...FILTER_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...FILTER_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class FlexConfig {
  static readonly DEFAULT_KEYWORDS = [...FLEX_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class FlexBasisConfig {
  static readonly DEFAULT_KEYWORDS = [...FLEX_BASIS_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class FlexDirectionConfig {
  static readonly DEFAULT_KEYWORDS = [...FLEX_DIRECTION_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class FlexFlowConfig {
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class FlexGrowConfig {
  static readonly DEFAULT_NUMBER_TYPES = [...FLEX_GROW_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class FlexShrinkConfig {
  static readonly DEFAULT_NUMBER_TYPES = [...FLEX_SHRINK_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class FlexWrapConfig {
  static readonly DEFAULT_KEYWORDS = [...FLEX_WRAP_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class FloatConfig {
  static readonly DEFAULT_KEYWORDS = [...FLOAT_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class FontConfig {
  static readonly DEFAULT_KEYWORDS = [...FONT_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class FontFamilyConfig {
  static readonly DEFAULT_KEYWORDS = [...FONT_FAMILY_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class FontFeatureSettingsConfig {
  static readonly DEFAULT_KEYWORDS = [...FONT_FEATURE_SETTINGS_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...FONT_FEATURE_SETTINGS_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class FontKerningConfig {
  static readonly DEFAULT_KEYWORDS = [...FONT_KERNING_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class FontLanguageOverrideConfig {
  static readonly DEFAULT_KEYWORDS = [...FONT_LANGUAGE_OVERRIDE_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class FontOpticalSizingConfig {
  static readonly DEFAULT_KEYWORDS = [...FONT_OPTICAL_SIZING_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class FontPaletteConfig {
  static readonly DEFAULT_KEYWORDS = [...FONT_PALETTE_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class FontSizeConfig {
  static readonly DEFAULT_KEYWORDS = [...FONT_SIZE_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...FONT_SIZE_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class FontSizeAdjustConfig {
  static readonly DEFAULT_KEYWORDS = [...FONT_SIZE_ADJUST_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...FONT_SIZE_ADJUST_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class FontSmoothConfig {
  static readonly DEFAULT_KEYWORDS = [...FONT_SMOOTH_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...FONT_SMOOTH_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class FontStretchConfig {
  static readonly DEFAULT_KEYWORDS = [...FONT_STRETCH_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...FONT_STRETCH_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class FontStyleConfig {
  static readonly DEFAULT_KEYWORDS = [...FONT_STYLE_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...FONT_STYLE_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class FontSynthesisConfig {
  static readonly DEFAULT_KEYWORDS = [...FONT_SYNTHESIS_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class FontSynthesisPositionConfig {
  static readonly DEFAULT_KEYWORDS = [...FONT_SYNTHESIS_POSITION_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class FontSynthesisSmallCapsConfig {
  static readonly DEFAULT_KEYWORDS = [...FONT_SYNTHESIS_SMALL_CAPS_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class FontSynthesisStyleConfig {
  static readonly DEFAULT_KEYWORDS = [...FONT_SYNTHESIS_STYLE_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class FontSynthesisWeightConfig {
  static readonly DEFAULT_KEYWORDS = [...FONT_SYNTHESIS_WEIGHT_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class FontVariantConfig {
  static readonly DEFAULT_KEYWORDS = [...FONT_VARIANT_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class FontVariantAlternatesConfig {
  static readonly DEFAULT_KEYWORDS = [...FONT_VARIANT_ALTERNATES_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class FontVariantCapsConfig {
  static readonly DEFAULT_KEYWORDS = [...FONT_VARIANT_CAPS_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class FontVariantEastAsianConfig {
  static readonly DEFAULT_KEYWORDS = [...FONT_VARIANT_EAST_ASIAN_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class FontVariantEmojiConfig {
  static readonly DEFAULT_KEYWORDS = [...FONT_VARIANT_EMOJI_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class FontVariantLigaturesConfig {
  static readonly DEFAULT_KEYWORDS = [...FONT_VARIANT_LIGATURES_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class FontVariantNumericConfig {
  static readonly DEFAULT_KEYWORDS = [...FONT_VARIANT_NUMERIC_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class FontVariantPositionConfig {
  static readonly DEFAULT_KEYWORDS = [...FONT_VARIANT_POSITION_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class FontVariationSettingsConfig {
  static readonly DEFAULT_KEYWORDS = [...FONT_VARIATION_SETTINGS_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...FONT_VARIATION_SETTINGS_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class FontWeightConfig {
  static readonly DEFAULT_KEYWORDS = [...FONT_WEIGHT_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...FONT_WEIGHT_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ForcedColorAdjustConfig {
  static readonly DEFAULT_KEYWORDS = [...FORCED_COLOR_ADJUST_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class GapConfig {
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class GlyphOrientationHorizontalConfig {
  static readonly DEFAULT_NUMBER_TYPES = [...GLYPH_ORIENTATION_HORIZONTAL_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class GlyphOrientationVerticalConfig {
  static readonly DEFAULT_NUMBER_TYPES = [...GLYPH_ORIENTATION_VERTICAL_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class GridConfig {
  static readonly DEFAULT_KEYWORDS = [...GRID_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class GridAreaConfig {
  static readonly DEFAULT_KEYWORDS = [...GRID_AREA_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...GRID_AREA_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class GridAutoColumnsConfig {
  static readonly DEFAULT_KEYWORDS = [...GRID_AUTO_COLUMNS_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...GRID_AUTO_COLUMNS_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class GridAutoFlowConfig {
  static readonly DEFAULT_KEYWORDS = [...GRID_AUTO_FLOW_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class GridAutoRowsConfig {
  static readonly DEFAULT_KEYWORDS = [...GRID_AUTO_ROWS_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...GRID_AUTO_ROWS_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class GridColumnConfig {
  static readonly DEFAULT_KEYWORDS = [...GRID_COLUMN_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...GRID_COLUMN_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class GridColumnEndConfig {
  static readonly DEFAULT_KEYWORDS = [...GRID_COLUMN_END_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...GRID_COLUMN_END_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class GridColumnGapConfig {
  static readonly DEFAULT_NUMBER_TYPES = [...GRID_COLUMN_GAP_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class GridColumnStartConfig {
  static readonly DEFAULT_KEYWORDS = [...GRID_COLUMN_START_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...GRID_COLUMN_START_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class GridGapConfig {
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class GridRowConfig {
  static readonly DEFAULT_KEYWORDS = [...GRID_ROW_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...GRID_ROW_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class GridRowEndConfig {
  static readonly DEFAULT_KEYWORDS = [...GRID_ROW_END_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...GRID_ROW_END_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class GridRowGapConfig {
  static readonly DEFAULT_NUMBER_TYPES = [...GRID_ROW_GAP_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class GridRowStartConfig {
  static readonly DEFAULT_KEYWORDS = [...GRID_ROW_START_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...GRID_ROW_START_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class GridTemplateConfig {
  static readonly DEFAULT_KEYWORDS = [...GRID_TEMPLATE_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...GRID_TEMPLATE_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class GridTemplateAreasConfig {
  static readonly DEFAULT_KEYWORDS = [...GRID_TEMPLATE_AREAS_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class GridTemplateColumnsConfig {
  static readonly DEFAULT_KEYWORDS = [...GRID_TEMPLATE_COLUMNS_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...GRID_TEMPLATE_COLUMNS_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class GridTemplateRowsConfig {
  static readonly DEFAULT_KEYWORDS = [...GRID_TEMPLATE_ROWS_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...GRID_TEMPLATE_ROWS_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class HangingPunctuationConfig {
  static readonly DEFAULT_KEYWORDS = [...HANGING_PUNCTUATION_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class HeightConfig {
  static readonly DEFAULT_KEYWORDS = [...HEIGHT_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...HEIGHT_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class HyphenateCharacterConfig {
  static readonly DEFAULT_KEYWORDS = [...HYPHENATE_CHARACTER_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class HyphenateLimitCharsConfig {
  static readonly DEFAULT_KEYWORDS = [...HYPHENATE_LIMIT_CHARS_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...HYPHENATE_LIMIT_CHARS_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class HyphensConfig {
  static readonly DEFAULT_KEYWORDS = [...HYPHENS_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ImageOrientationConfig {
  static readonly DEFAULT_KEYWORDS = [...IMAGE_ORIENTATION_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...IMAGE_ORIENTATION_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ImageRenderingConfig {
  static readonly DEFAULT_KEYWORDS = [...IMAGE_RENDERING_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ImageResolutionConfig {
  static readonly DEFAULT_KEYWORDS = [...IMAGE_RESOLUTION_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...IMAGE_RESOLUTION_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ImeModeConfig {
  static readonly DEFAULT_KEYWORDS = [...IME_MODE_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class InitialLetterConfig {
  static readonly DEFAULT_KEYWORDS = [...INITIAL_LETTER_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...INITIAL_LETTER_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class InitialLetterAlignConfig {
  static readonly DEFAULT_KEYWORDS = [...INITIAL_LETTER_ALIGN_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class InlineSizeConfig {
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class InputSecurityConfig {
  static readonly DEFAULT_KEYWORDS = [...INPUT_SECURITY_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class InsetConfig {
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class InsetBlockConfig {
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class InsetBlockEndConfig {
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class InsetBlockStartConfig {
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class InsetInlineConfig {
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class InsetInlineEndConfig {
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class InsetInlineStartConfig {
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class InterpolateSizeConfig {
  static readonly DEFAULT_KEYWORDS = [...INTERPOLATE_SIZE_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class IsolationConfig {
  static readonly DEFAULT_KEYWORDS = [...ISOLATION_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class JustifyContentConfig {
  static readonly DEFAULT_KEYWORDS = [...JUSTIFY_CONTENT_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class JustifyItemsConfig {
  static readonly DEFAULT_KEYWORDS = [...JUSTIFY_ITEMS_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class JustifySelfConfig {
  static readonly DEFAULT_KEYWORDS = [...JUSTIFY_SELF_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class JustifyTracksConfig {
  static readonly DEFAULT_KEYWORDS = [...JUSTIFY_TRACKS_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class KerningConfig {
  static readonly DEFAULT_KEYWORDS = [...KERNING_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...KERNING_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class LeftConfig {
  static readonly DEFAULT_KEYWORDS = [...LEFT_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...LEFT_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class LetterSpacingConfig {
  static readonly DEFAULT_KEYWORDS = [...LETTER_SPACING_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...LETTER_SPACING_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class LineBreakConfig {
  static readonly DEFAULT_KEYWORDS = [...LINE_BREAK_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class LineClampConfig {
  static readonly DEFAULT_KEYWORDS = [...LINE_CLAMP_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...LINE_CLAMP_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class LineHeightConfig {
  static readonly DEFAULT_KEYWORDS = [...LINE_HEIGHT_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...LINE_HEIGHT_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class LineHeightStepConfig {
  static readonly DEFAULT_NUMBER_TYPES = [...LINE_HEIGHT_STEP_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ListStyleConfig {
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ListStyleImageConfig {
  static readonly DEFAULT_KEYWORDS = [...LIST_STYLE_IMAGE_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...LIST_STYLE_IMAGE_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ListStylePositionConfig {
  static readonly DEFAULT_KEYWORDS = [...LIST_STYLE_POSITION_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ListStyleTypeConfig {
  static readonly DEFAULT_KEYWORDS = [...LIST_STYLE_TYPE_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class MarginConfig {
  static readonly DEFAULT_KEYWORDS = [...MARGIN_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...MARGIN_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class MarginBlockConfig {
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class MarginBlockEndConfig {
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class MarginBlockStartConfig {
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class MarginBottomConfig {
  static readonly DEFAULT_KEYWORDS = [...MARGIN_BOTTOM_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...MARGIN_BOTTOM_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class MarginInlineConfig {
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class MarginInlineEndConfig {
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class MarginInlineStartConfig {
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class MarginLeftConfig {
  static readonly DEFAULT_KEYWORDS = [...MARGIN_LEFT_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...MARGIN_LEFT_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class MarginRightConfig {
  static readonly DEFAULT_KEYWORDS = [...MARGIN_RIGHT_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...MARGIN_RIGHT_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class MarginTopConfig {
  static readonly DEFAULT_KEYWORDS = [...MARGIN_TOP_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...MARGIN_TOP_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class MarginTrimConfig {
  static readonly DEFAULT_KEYWORDS = [...MARGIN_TRIM_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class MarkerConfig {
  static readonly DEFAULT_KEYWORDS = [...MARKER_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class MarkerEndConfig {
  static readonly DEFAULT_KEYWORDS = [...MARKER_END_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class MarkerMidConfig {
  static readonly DEFAULT_KEYWORDS = [...MARKER_MID_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class MarkerStartConfig {
  static readonly DEFAULT_KEYWORDS = [...MARKER_START_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class MaskConfig {
  static readonly DEFAULT_KEYWORDS = [...MASK_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...MASK_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class MaskBorderConfig {
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class MaskBorderModeConfig {
  static readonly DEFAULT_KEYWORDS = [...MASK_BORDER_MODE_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class MaskBorderOutsetConfig {
  static readonly DEFAULT_NUMBER_TYPES = [...MASK_BORDER_OUTSET_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class MaskBorderRepeatConfig {
  static readonly DEFAULT_KEYWORDS = [...MASK_BORDER_REPEAT_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class MaskBorderSliceConfig {
  static readonly DEFAULT_KEYWORDS = [...MASK_BORDER_SLICE_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...MASK_BORDER_SLICE_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class MaskBorderSourceConfig {
  static readonly DEFAULT_KEYWORDS = [...MASK_BORDER_SOURCE_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...MASK_BORDER_SOURCE_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class MaskBorderWidthConfig {
  static readonly DEFAULT_KEYWORDS = [...MASK_BORDER_WIDTH_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...MASK_BORDER_WIDTH_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class MaskClipConfig {
  static readonly DEFAULT_KEYWORDS = [...MASK_CLIP_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class MaskCompositeConfig {
  static readonly DEFAULT_KEYWORDS = [...MASK_COMPOSITE_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class MaskImageConfig {
  static readonly DEFAULT_KEYWORDS = [...MASK_IMAGE_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...MASK_IMAGE_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class MaskModeConfig {
  static readonly DEFAULT_KEYWORDS = [...MASK_MODE_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class MaskOriginConfig {
  static readonly DEFAULT_KEYWORDS = [...MASK_ORIGIN_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class MaskPositionConfig {
  static readonly DEFAULT_KEYWORDS = [...MASK_POSITION_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...MASK_POSITION_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class MaskRepeatConfig {
  static readonly DEFAULT_KEYWORDS = [...MASK_REPEAT_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class MaskSizeConfig {
  static readonly DEFAULT_KEYWORDS = [...MASK_SIZE_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...MASK_SIZE_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class MaskTypeConfig {
  static readonly DEFAULT_KEYWORDS = [...MASK_TYPE_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class MasonryAutoFlowConfig {
  static readonly DEFAULT_KEYWORDS = [...MASONRY_AUTO_FLOW_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class MathDepthConfig {
  static readonly DEFAULT_KEYWORDS = [...MATH_DEPTH_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...MATH_DEPTH_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class MathShiftConfig {
  static readonly DEFAULT_KEYWORDS = [...MATH_SHIFT_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class MathStyleConfig {
  static readonly DEFAULT_KEYWORDS = [...MATH_STYLE_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class MaxBlockSizeConfig {
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class MaxHeightConfig {
  static readonly DEFAULT_KEYWORDS = [...MAX_HEIGHT_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...MAX_HEIGHT_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class MaxInlineSizeConfig {
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class MaxLinesConfig {
  static readonly DEFAULT_KEYWORDS = [...MAX_LINES_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...MAX_LINES_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class MaxWidthConfig {
  static readonly DEFAULT_KEYWORDS = [...MAX_WIDTH_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...MAX_WIDTH_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class MinBlockSizeConfig {
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class MinHeightConfig {
  static readonly DEFAULT_KEYWORDS = [...MIN_HEIGHT_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...MIN_HEIGHT_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class MinInlineSizeConfig {
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class MinWidthConfig {
  static readonly DEFAULT_KEYWORDS = [...MIN_WIDTH_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...MIN_WIDTH_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class MixBlendModeConfig {
  static readonly DEFAULT_KEYWORDS = [...MIX_BLEND_MODE_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ObjectFitConfig {
  static readonly DEFAULT_KEYWORDS = [...OBJECT_FIT_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ObjectPositionConfig {
  static readonly DEFAULT_KEYWORDS = [...OBJECT_POSITION_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...OBJECT_POSITION_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class OffsetConfig {
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class OffsetAnchorConfig {
  static readonly DEFAULT_KEYWORDS = [...OFFSET_ANCHOR_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...OFFSET_ANCHOR_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class OffsetDistanceConfig {
  static readonly DEFAULT_NUMBER_TYPES = [...OFFSET_DISTANCE_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class OffsetPathConfig {
  static readonly DEFAULT_KEYWORDS = [...OFFSET_PATH_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...OFFSET_PATH_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class OffsetPositionConfig {
  static readonly DEFAULT_KEYWORDS = [...OFFSET_POSITION_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...OFFSET_POSITION_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class OffsetRotateConfig {
  static readonly DEFAULT_KEYWORDS = [...OFFSET_ROTATE_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...OFFSET_ROTATE_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class OpacityConfig {
  static readonly DEFAULT_NUMBER_TYPES = [...OPACITY_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class OrderConfig {
  static readonly DEFAULT_NUMBER_TYPES = [...ORDER_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class OrphansConfig {
  static readonly DEFAULT_NUMBER_TYPES = [...ORPHANS_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class OutlineConfig {
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class OutlineColorConfig {
  static readonly DEFAULT_KEYWORDS = [...OUTLINE_COLOR_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...OUTLINE_COLOR_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class OutlineOffsetConfig {
  static readonly DEFAULT_NUMBER_TYPES = [...OUTLINE_OFFSET_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class OutlineStyleConfig {
  static readonly DEFAULT_KEYWORDS = [...OUTLINE_STYLE_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class OutlineWidthConfig {
  static readonly DEFAULT_KEYWORDS = [...OUTLINE_WIDTH_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...OUTLINE_WIDTH_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class OverflowConfig {
  static readonly DEFAULT_KEYWORDS = [...OVERFLOW_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class OverflowAnchorConfig {
  static readonly DEFAULT_KEYWORDS = [...OVERFLOW_ANCHOR_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class OverflowBlockConfig {
  static readonly DEFAULT_KEYWORDS = [...OVERFLOW_BLOCK_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class OverflowClipBoxConfig {
  static readonly DEFAULT_KEYWORDS = [...OVERFLOW_CLIP_BOX_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class OverflowClipMarginConfig {
  static readonly DEFAULT_KEYWORDS = [...OVERFLOW_CLIP_MARGIN_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...OVERFLOW_CLIP_MARGIN_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class OverflowInlineConfig {
  static readonly DEFAULT_KEYWORDS = [...OVERFLOW_INLINE_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class OverflowWrapConfig {
  static readonly DEFAULT_KEYWORDS = [...OVERFLOW_WRAP_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class OverflowXConfig {
  static readonly DEFAULT_KEYWORDS = [...OVERFLOW_X_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class OverflowYConfig {
  static readonly DEFAULT_KEYWORDS = [...OVERFLOW_Y_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class OverlayConfig {
  static readonly DEFAULT_KEYWORDS = [...OVERLAY_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class OverscrollBehaviorConfig {
  static readonly DEFAULT_KEYWORDS = [...OVERSCROLL_BEHAVIOR_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class OverscrollBehaviorBlockConfig {
  static readonly DEFAULT_KEYWORDS = [...OVERSCROLL_BEHAVIOR_BLOCK_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class OverscrollBehaviorInlineConfig {
  static readonly DEFAULT_KEYWORDS = [...OVERSCROLL_BEHAVIOR_INLINE_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class OverscrollBehaviorXConfig {
  static readonly DEFAULT_KEYWORDS = [...OVERSCROLL_BEHAVIOR_X_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class OverscrollBehaviorYConfig {
  static readonly DEFAULT_KEYWORDS = [...OVERSCROLL_BEHAVIOR_Y_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class PaddingConfig {
  static readonly DEFAULT_NUMBER_TYPES = [...PADDING_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class PaddingBlockConfig {
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class PaddingBlockEndConfig {
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class PaddingBlockStartConfig {
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class PaddingBottomConfig {
  static readonly DEFAULT_NUMBER_TYPES = [...PADDING_BOTTOM_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class PaddingInlineConfig {
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class PaddingInlineEndConfig {
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class PaddingInlineStartConfig {
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class PaddingLeftConfig {
  static readonly DEFAULT_NUMBER_TYPES = [...PADDING_LEFT_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class PaddingRightConfig {
  static readonly DEFAULT_NUMBER_TYPES = [...PADDING_RIGHT_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class PaddingTopConfig {
  static readonly DEFAULT_NUMBER_TYPES = [...PADDING_TOP_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class PageConfig {
  static readonly DEFAULT_KEYWORDS = [...PAGE_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class PageBreakAfterConfig {
  static readonly DEFAULT_KEYWORDS = [...PAGE_BREAK_AFTER_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class PageBreakBeforeConfig {
  static readonly DEFAULT_KEYWORDS = [...PAGE_BREAK_BEFORE_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class PageBreakInsideConfig {
  static readonly DEFAULT_KEYWORDS = [...PAGE_BREAK_INSIDE_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class PaintOrderConfig {
  static readonly DEFAULT_KEYWORDS = [...PAINT_ORDER_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class PauseConfig {
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class PauseAfterConfig {
  static readonly DEFAULT_KEYWORDS = [...PAUSE_AFTER_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...PAUSE_AFTER_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class PauseBeforeConfig {
  static readonly DEFAULT_KEYWORDS = [...PAUSE_BEFORE_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...PAUSE_BEFORE_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class PerspectiveConfig {
  static readonly DEFAULT_KEYWORDS = [...PERSPECTIVE_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...PERSPECTIVE_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class PerspectiveOriginConfig {
  static readonly DEFAULT_KEYWORDS = [...PERSPECTIVE_ORIGIN_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...PERSPECTIVE_ORIGIN_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class PlaceContentConfig {
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class PlaceItemsConfig {
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class PlaceSelfConfig {
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class PointerEventsConfig {
  static readonly DEFAULT_KEYWORDS = [...POINTER_EVENTS_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class PositionConfig {
  static readonly DEFAULT_KEYWORDS = [...POSITION_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class PositionAnchorConfig {
  static readonly DEFAULT_KEYWORDS = [...POSITION_ANCHOR_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class PositionAreaConfig {
  static readonly DEFAULT_KEYWORDS = [...POSITION_AREA_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class PositionTryConfig {
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class PositionTryFallbacksConfig {
  static readonly DEFAULT_KEYWORDS = [...POSITION_TRY_FALLBACKS_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class PositionTryOrderConfig {
  static readonly DEFAULT_KEYWORDS = [...POSITION_TRY_ORDER_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class PositionVisibilityConfig {
  static readonly DEFAULT_KEYWORDS = [...POSITION_VISIBILITY_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class PrintColorAdjustConfig {
  static readonly DEFAULT_KEYWORDS = [...PRINT_COLOR_ADJUST_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class QuotesConfig {
  static readonly DEFAULT_KEYWORDS = [...QUOTES_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class RConfig {
  static readonly DEFAULT_NUMBER_TYPES = [...R_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ResizeConfig {
  static readonly DEFAULT_KEYWORDS = [...RESIZE_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class RestConfig {
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class RestAfterConfig {
  static readonly DEFAULT_KEYWORDS = [...REST_AFTER_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...REST_AFTER_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class RestBeforeConfig {
  static readonly DEFAULT_KEYWORDS = [...REST_BEFORE_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...REST_BEFORE_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class RightConfig {
  static readonly DEFAULT_KEYWORDS = [...RIGHT_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...RIGHT_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class RotateConfig {
  static readonly DEFAULT_KEYWORDS = [...ROTATE_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...ROTATE_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class RowGapConfig {
  static readonly DEFAULT_KEYWORDS = [...ROW_GAP_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...ROW_GAP_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class RubyAlignConfig {
  static readonly DEFAULT_KEYWORDS = [...RUBY_ALIGN_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class RubyMergeConfig {
  static readonly DEFAULT_KEYWORDS = [...RUBY_MERGE_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class RubyPositionConfig {
  static readonly DEFAULT_KEYWORDS = [...RUBY_POSITION_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class RxConfig {
  static readonly DEFAULT_NUMBER_TYPES = [...RX_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class RyConfig {
  static readonly DEFAULT_NUMBER_TYPES = [...RY_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ScaleConfig {
  static readonly DEFAULT_KEYWORDS = [...SCALE_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...SCALE_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ScrollBehaviorConfig {
  static readonly DEFAULT_KEYWORDS = [...SCROLL_BEHAVIOR_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ScrollMarginConfig {
  static readonly DEFAULT_NUMBER_TYPES = [...SCROLL_MARGIN_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ScrollMarginBlockConfig {
  static readonly DEFAULT_NUMBER_TYPES = [...SCROLL_MARGIN_BLOCK_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ScrollMarginBlockEndConfig {
  static readonly DEFAULT_NUMBER_TYPES = [...SCROLL_MARGIN_BLOCK_END_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ScrollMarginBlockStartConfig {
  static readonly DEFAULT_NUMBER_TYPES = [...SCROLL_MARGIN_BLOCK_START_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ScrollMarginBottomConfig {
  static readonly DEFAULT_NUMBER_TYPES = [...SCROLL_MARGIN_BOTTOM_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ScrollMarginInlineConfig {
  static readonly DEFAULT_NUMBER_TYPES = [...SCROLL_MARGIN_INLINE_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ScrollMarginInlineEndConfig {
  static readonly DEFAULT_NUMBER_TYPES = [...SCROLL_MARGIN_INLINE_END_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ScrollMarginInlineStartConfig {
  static readonly DEFAULT_NUMBER_TYPES = [...SCROLL_MARGIN_INLINE_START_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ScrollMarginLeftConfig {
  static readonly DEFAULT_NUMBER_TYPES = [...SCROLL_MARGIN_LEFT_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ScrollMarginRightConfig {
  static readonly DEFAULT_NUMBER_TYPES = [...SCROLL_MARGIN_RIGHT_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ScrollMarginTopConfig {
  static readonly DEFAULT_NUMBER_TYPES = [...SCROLL_MARGIN_TOP_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ScrollPaddingConfig {
  static readonly DEFAULT_KEYWORDS = [...SCROLL_PADDING_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...SCROLL_PADDING_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ScrollPaddingBlockConfig {
  static readonly DEFAULT_KEYWORDS = [...SCROLL_PADDING_BLOCK_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...SCROLL_PADDING_BLOCK_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ScrollPaddingBlockEndConfig {
  static readonly DEFAULT_KEYWORDS = [...SCROLL_PADDING_BLOCK_END_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...SCROLL_PADDING_BLOCK_END_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ScrollPaddingBlockStartConfig {
  static readonly DEFAULT_KEYWORDS = [...SCROLL_PADDING_BLOCK_START_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...SCROLL_PADDING_BLOCK_START_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ScrollPaddingBottomConfig {
  static readonly DEFAULT_KEYWORDS = [...SCROLL_PADDING_BOTTOM_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...SCROLL_PADDING_BOTTOM_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ScrollPaddingInlineConfig {
  static readonly DEFAULT_KEYWORDS = [...SCROLL_PADDING_INLINE_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...SCROLL_PADDING_INLINE_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ScrollPaddingInlineEndConfig {
  static readonly DEFAULT_KEYWORDS = [...SCROLL_PADDING_INLINE_END_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...SCROLL_PADDING_INLINE_END_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ScrollPaddingInlineStartConfig {
  static readonly DEFAULT_KEYWORDS = [...SCROLL_PADDING_INLINE_START_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...SCROLL_PADDING_INLINE_START_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ScrollPaddingLeftConfig {
  static readonly DEFAULT_KEYWORDS = [...SCROLL_PADDING_LEFT_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...SCROLL_PADDING_LEFT_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ScrollPaddingRightConfig {
  static readonly DEFAULT_KEYWORDS = [...SCROLL_PADDING_RIGHT_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...SCROLL_PADDING_RIGHT_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ScrollPaddingTopConfig {
  static readonly DEFAULT_KEYWORDS = [...SCROLL_PADDING_TOP_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...SCROLL_PADDING_TOP_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ScrollSnapAlignConfig {
  static readonly DEFAULT_KEYWORDS = [...SCROLL_SNAP_ALIGN_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ScrollSnapCoordinateConfig {
  static readonly DEFAULT_KEYWORDS = [...SCROLL_SNAP_COORDINATE_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...SCROLL_SNAP_COORDINATE_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ScrollSnapDestinationConfig {
  static readonly DEFAULT_KEYWORDS = [...SCROLL_SNAP_DESTINATION_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...SCROLL_SNAP_DESTINATION_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ScrollSnapPointsXConfig {
  static readonly DEFAULT_KEYWORDS = [...SCROLL_SNAP_POINTS_X_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...SCROLL_SNAP_POINTS_X_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ScrollSnapPointsYConfig {
  static readonly DEFAULT_KEYWORDS = [...SCROLL_SNAP_POINTS_Y_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...SCROLL_SNAP_POINTS_Y_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ScrollSnapStopConfig {
  static readonly DEFAULT_KEYWORDS = [...SCROLL_SNAP_STOP_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ScrollSnapTypeConfig {
  static readonly DEFAULT_KEYWORDS = [...SCROLL_SNAP_TYPE_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ScrollSnapTypeXConfig {
  static readonly DEFAULT_KEYWORDS = [...SCROLL_SNAP_TYPE_X_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ScrollSnapTypeYConfig {
  static readonly DEFAULT_KEYWORDS = [...SCROLL_SNAP_TYPE_Y_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ScrollTimelineConfig {
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ScrollTimelineAxisConfig {
  static readonly DEFAULT_KEYWORDS = [...SCROLL_TIMELINE_AXIS_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ScrollTimelineNameConfig {
  static readonly DEFAULT_KEYWORDS = [...SCROLL_TIMELINE_NAME_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ScrollbarColorConfig {
  static readonly DEFAULT_KEYWORDS = [...SCROLLBAR_COLOR_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...SCROLLBAR_COLOR_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ScrollbarGutterConfig {
  static readonly DEFAULT_KEYWORDS = [...SCROLLBAR_GUTTER_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ScrollbarWidthConfig {
  static readonly DEFAULT_KEYWORDS = [...SCROLLBAR_WIDTH_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ShapeImageThresholdConfig {
  static readonly DEFAULT_NUMBER_TYPES = [...SHAPE_IMAGE_THRESHOLD_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ShapeMarginConfig {
  static readonly DEFAULT_NUMBER_TYPES = [...SHAPE_MARGIN_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ShapeOutsideConfig {
  static readonly DEFAULT_KEYWORDS = [...SHAPE_OUTSIDE_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...SHAPE_OUTSIDE_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ShapeRenderingConfig {
  static readonly DEFAULT_KEYWORDS = [...SHAPE_RENDERING_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class SpeakConfig {
  static readonly DEFAULT_KEYWORDS = [...SPEAK_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class SpeakAsConfig {
  static readonly DEFAULT_KEYWORDS = [...SPEAK_AS_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class SrcConfig {
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class StrokeConfig {
  static readonly DEFAULT_KEYWORDS = [...STROKE_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...STROKE_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class StrokeDasharrayConfig {
  static readonly DEFAULT_KEYWORDS = [...STROKE_DASHARRAY_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...STROKE_DASHARRAY_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class StrokeDashoffsetConfig {
  static readonly DEFAULT_NUMBER_TYPES = [...STROKE_DASHOFFSET_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class StrokeLinecapConfig {
  static readonly DEFAULT_KEYWORDS = [...STROKE_LINECAP_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class StrokeLinejoinConfig {
  static readonly DEFAULT_KEYWORDS = [...STROKE_LINEJOIN_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class StrokeMiterlimitConfig {
  static readonly DEFAULT_NUMBER_TYPES = [...STROKE_MITERLIMIT_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class StrokeOpacityConfig {
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class StrokeWidthConfig {
  static readonly DEFAULT_NUMBER_TYPES = [...STROKE_WIDTH_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class TabSizeConfig {
  static readonly DEFAULT_NUMBER_TYPES = [...TAB_SIZE_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class TableLayoutConfig {
  static readonly DEFAULT_KEYWORDS = [...TABLE_LAYOUT_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class TextAlignConfig {
  static readonly DEFAULT_KEYWORDS = [...TEXT_ALIGN_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class TextAlignLastConfig {
  static readonly DEFAULT_KEYWORDS = [...TEXT_ALIGN_LAST_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class TextAnchorConfig {
  static readonly DEFAULT_KEYWORDS = [...TEXT_ANCHOR_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class TextCombineUprightConfig {
  static readonly DEFAULT_KEYWORDS = [...TEXT_COMBINE_UPRIGHT_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...TEXT_COMBINE_UPRIGHT_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class TextDecorationConfig {
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class TextDecorationColorConfig {
  static readonly DEFAULT_KEYWORDS = [...TEXT_DECORATION_COLOR_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...TEXT_DECORATION_COLOR_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class TextDecorationLineConfig {
  static readonly DEFAULT_KEYWORDS = [...TEXT_DECORATION_LINE_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class TextDecorationSkipConfig {
  static readonly DEFAULT_KEYWORDS = [...TEXT_DECORATION_SKIP_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class TextDecorationSkipInkConfig {
  static readonly DEFAULT_KEYWORDS = [...TEXT_DECORATION_SKIP_INK_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class TextDecorationStyleConfig {
  static readonly DEFAULT_KEYWORDS = [...TEXT_DECORATION_STYLE_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class TextDecorationThicknessConfig {
  static readonly DEFAULT_KEYWORDS = [...TEXT_DECORATION_THICKNESS_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...TEXT_DECORATION_THICKNESS_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class TextEmphasisConfig {
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class TextEmphasisColorConfig {
  static readonly DEFAULT_KEYWORDS = [...TEXT_EMPHASIS_COLOR_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...TEXT_EMPHASIS_COLOR_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class TextEmphasisPositionConfig {
  static readonly DEFAULT_KEYWORDS = [...TEXT_EMPHASIS_POSITION_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class TextEmphasisStyleConfig {
  static readonly DEFAULT_KEYWORDS = [...TEXT_EMPHASIS_STYLE_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class TextIndentConfig {
  static readonly DEFAULT_KEYWORDS = [...TEXT_INDENT_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...TEXT_INDENT_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class TextJustifyConfig {
  static readonly DEFAULT_KEYWORDS = [...TEXT_JUSTIFY_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class TextOrientationConfig {
  static readonly DEFAULT_KEYWORDS = [...TEXT_ORIENTATION_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class TextOverflowConfig {
  static readonly DEFAULT_KEYWORDS = [...TEXT_OVERFLOW_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class TextRenderingConfig {
  static readonly DEFAULT_KEYWORDS = [...TEXT_RENDERING_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class TextShadowConfig {
  static readonly DEFAULT_KEYWORDS = [...TEXT_SHADOW_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...TEXT_SHADOW_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class TextSizeAdjustConfig {
  static readonly DEFAULT_KEYWORDS = [...TEXT_SIZE_ADJUST_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...TEXT_SIZE_ADJUST_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class TextSpacingTrimConfig {
  static readonly DEFAULT_KEYWORDS = [...TEXT_SPACING_TRIM_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class TextTransformConfig {
  static readonly DEFAULT_KEYWORDS = [...TEXT_TRANSFORM_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class TextUnderlineOffsetConfig {
  static readonly DEFAULT_KEYWORDS = [...TEXT_UNDERLINE_OFFSET_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...TEXT_UNDERLINE_OFFSET_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class TextUnderlinePositionConfig {
  static readonly DEFAULT_KEYWORDS = [...TEXT_UNDERLINE_POSITION_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class TextWrapConfig {
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class TextWrapModeConfig {
  static readonly DEFAULT_KEYWORDS = [...TEXT_WRAP_MODE_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class TextWrapStyleConfig {
  static readonly DEFAULT_KEYWORDS = [...TEXT_WRAP_STYLE_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class TimelineScopeConfig {
  static readonly DEFAULT_KEYWORDS = [...TIMELINE_SCOPE_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class TopConfig {
  static readonly DEFAULT_KEYWORDS = [...TOP_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...TOP_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class TouchActionConfig {
  static readonly DEFAULT_KEYWORDS = [...TOUCH_ACTION_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class TransformConfig {
  static readonly DEFAULT_KEYWORDS = [...TRANSFORM_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...TRANSFORM_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class TransformBoxConfig {
  static readonly DEFAULT_KEYWORDS = [...TRANSFORM_BOX_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class TransformOriginConfig {
  static readonly DEFAULT_KEYWORDS = [...TRANSFORM_ORIGIN_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...TRANSFORM_ORIGIN_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class TransformStyleConfig {
  static readonly DEFAULT_KEYWORDS = [...TRANSFORM_STYLE_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class TransitionConfig {
  static readonly DEFAULT_KEYWORDS = [...TRANSITION_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...TRANSITION_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class TransitionBehaviorConfig {
  static readonly DEFAULT_KEYWORDS = [...TRANSITION_BEHAVIOR_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class TransitionDelayConfig {
  static readonly DEFAULT_NUMBER_TYPES = [...TRANSITION_DELAY_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class TransitionDurationConfig {
  static readonly DEFAULT_NUMBER_TYPES = [...TRANSITION_DURATION_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class TransitionPropertyConfig {
  static readonly DEFAULT_KEYWORDS = [...TRANSITION_PROPERTY_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class TransitionTimingFunctionConfig {
  static readonly DEFAULT_KEYWORDS = [...TRANSITION_TIMING_FUNCTION_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...TRANSITION_TIMING_FUNCTION_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class TranslateConfig {
  static readonly DEFAULT_KEYWORDS = [...TRANSLATE_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...TRANSLATE_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class UnicodeBidiConfig {
  static readonly DEFAULT_KEYWORDS = [...UNICODE_BIDI_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class UnicodeRangeConfig {
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class UserSelectConfig {
  static readonly DEFAULT_KEYWORDS = [...USER_SELECT_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class VectorEffectConfig {
  static readonly DEFAULT_KEYWORDS = [...VECTOR_EFFECT_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class VerticalAlignConfig {
  static readonly DEFAULT_KEYWORDS = [...VERTICAL_ALIGN_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...VERTICAL_ALIGN_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ViewTimelineConfig {
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ViewTimelineAxisConfig {
  static readonly DEFAULT_KEYWORDS = [...VIEW_TIMELINE_AXIS_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ViewTimelineInsetConfig {
  static readonly DEFAULT_KEYWORDS = [...VIEW_TIMELINE_INSET_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...VIEW_TIMELINE_INSET_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ViewTimelineNameConfig {
  static readonly DEFAULT_KEYWORDS = [...VIEW_TIMELINE_NAME_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ViewTransitionNameConfig {
  static readonly DEFAULT_KEYWORDS = [...VIEW_TRANSITION_NAME_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class VisibilityConfig {
  static readonly DEFAULT_KEYWORDS = [...VISIBILITY_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class VoiceBalanceConfig {
  static readonly DEFAULT_KEYWORDS = [...VOICE_BALANCE_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...VOICE_BALANCE_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class VoiceDurationConfig {
  static readonly DEFAULT_KEYWORDS = [...VOICE_DURATION_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...VOICE_DURATION_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class VoiceFamilyConfig {
  static readonly DEFAULT_KEYWORDS = [...VOICE_FAMILY_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...VOICE_FAMILY_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class VoicePitchConfig {
  static readonly DEFAULT_KEYWORDS = [...VOICE_PITCH_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...VOICE_PITCH_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class VoiceRangeConfig {
  static readonly DEFAULT_KEYWORDS = [...VOICE_RANGE_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...VOICE_RANGE_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class VoiceRateConfig {
  static readonly DEFAULT_KEYWORDS = [...VOICE_RATE_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...VOICE_RATE_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class VoiceStressConfig {
  static readonly DEFAULT_KEYWORDS = [...VOICE_STRESS_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class VoiceVolumeConfig {
  static readonly DEFAULT_KEYWORDS = [...VOICE_VOLUME_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class WhiteSpaceConfig {
  static readonly DEFAULT_KEYWORDS = [...WHITE_SPACE_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class WhiteSpaceCollapseConfig {
  static readonly DEFAULT_KEYWORDS = [...WHITE_SPACE_COLLAPSE_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class WhiteSpaceTrimConfig {
  static readonly DEFAULT_KEYWORDS = [...WHITE_SPACE_TRIM_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class WidowsConfig {
  static readonly DEFAULT_NUMBER_TYPES = [...WIDOWS_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class WidthConfig {
  static readonly DEFAULT_KEYWORDS = [...WIDTH_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...WIDTH_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class WillChangeConfig {
  static readonly DEFAULT_KEYWORDS = [...WILL_CHANGE_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class WordBreakConfig {
  static readonly DEFAULT_KEYWORDS = [...WORD_BREAK_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class WordSpacingConfig {
  static readonly DEFAULT_KEYWORDS = [...WORD_SPACING_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...WORD_SPACING_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class WordWrapConfig {
  static readonly DEFAULT_KEYWORDS = [...WORD_WRAP_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class WritingModeConfig {
  static readonly DEFAULT_KEYWORDS = [...WRITING_MODE_KEYWORDS];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class XConfig {
  static readonly DEFAULT_NUMBER_TYPES = [...X_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class YConfig {
  static readonly DEFAULT_NUMBER_TYPES = [...Y_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ZIndexConfig {
  static readonly DEFAULT_KEYWORDS = [...Z_INDEX_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...Z_INDEX_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

export class ZoomConfig {
  static readonly DEFAULT_KEYWORDS = [...ZOOM_KEYWORDS];
  static readonly DEFAULT_NUMBER_TYPES = [...ZOOM_NUMBER_TYPES];
  keywords: string[] | null = null;
  numberTypes: NumberTypeName[] | null = null;
}

// ==================== 属性名映射 ====================

export const cssPropertyNameMap = {
  accentColor: 'accent-color',
  alignContent: 'align-content',
  alignItems: 'align-items',
  alignSelf: 'align-self',
  alignTracks: 'align-tracks',
  alignmentBaseline: 'alignment-baseline',
  all: 'all',
  anchorName: 'anchor-name',
  anchorScope: 'anchor-scope',
  animation: 'animation',
  animationComposition: 'animation-composition',
  animationDelay: 'animation-delay',
  animationDirection: 'animation-direction',
  animationDuration: 'animation-duration',
  animationFillMode: 'animation-fill-mode',
  animationIterationCount: 'animation-iteration-count',
  animationName: 'animation-name',
  animationPlayState: 'animation-play-state',
  animationRange: 'animation-range',
  animationRangeEnd: 'animation-range-end',
  animationRangeStart: 'animation-range-start',
  animationTimeline: 'animation-timeline',
  animationTimingFunction: 'animation-timing-function',
  appearance: 'appearance',
  aspectRatio: 'aspect-ratio',
  azimuth: 'azimuth',
  backdropFilter: 'backdrop-filter',
  backfaceVisibility: 'backface-visibility',
  background: 'background',
  backgroundAttachment: 'background-attachment',
  backgroundBlendMode: 'background-blend-mode',
  backgroundClip: 'background-clip',
  backgroundColor: 'background-color',
  backgroundImage: 'background-image',
  backgroundOrigin: 'background-origin',
  backgroundPosition: 'background-position',
  backgroundPositionX: 'background-position-x',
  backgroundPositionY: 'background-position-y',
  backgroundRepeat: 'background-repeat',
  backgroundSize: 'background-size',
  baselineShift: 'baseline-shift',
  behavior: 'behavior',
  blockSize: 'block-size',
  border: 'border',
  borderBlock: 'border-block',
  borderBlockColor: 'border-block-color',
  borderBlockEnd: 'border-block-end',
  borderBlockEndColor: 'border-block-end-color',
  borderBlockEndStyle: 'border-block-end-style',
  borderBlockEndWidth: 'border-block-end-width',
  borderBlockStart: 'border-block-start',
  borderBlockStartColor: 'border-block-start-color',
  borderBlockStartStyle: 'border-block-start-style',
  borderBlockStartWidth: 'border-block-start-width',
  borderBlockStyle: 'border-block-style',
  borderBlockWidth: 'border-block-width',
  borderBottom: 'border-bottom',
  borderBottomColor: 'border-bottom-color',
  borderBottomLeftRadius: 'border-bottom-left-radius',
  borderBottomRightRadius: 'border-bottom-right-radius',
  borderBottomStyle: 'border-bottom-style',
  borderBottomWidth: 'border-bottom-width',
  borderCollapse: 'border-collapse',
  borderColor: 'border-color',
  borderEndEndRadius: 'border-end-end-radius',
  borderEndStartRadius: 'border-end-start-radius',
  borderImage: 'border-image',
  borderImageOutset: 'border-image-outset',
  borderImageRepeat: 'border-image-repeat',
  borderImageSlice: 'border-image-slice',
  borderImageSource: 'border-image-source',
  borderImageWidth: 'border-image-width',
  borderInline: 'border-inline',
  borderInlineColor: 'border-inline-color',
  borderInlineEnd: 'border-inline-end',
  borderInlineEndColor: 'border-inline-end-color',
  borderInlineEndStyle: 'border-inline-end-style',
  borderInlineEndWidth: 'border-inline-end-width',
  borderInlineStart: 'border-inline-start',
  borderInlineStartColor: 'border-inline-start-color',
  borderInlineStartStyle: 'border-inline-start-style',
  borderInlineStartWidth: 'border-inline-start-width',
  borderInlineStyle: 'border-inline-style',
  borderInlineWidth: 'border-inline-width',
  borderLeft: 'border-left',
  borderLeftColor: 'border-left-color',
  borderLeftStyle: 'border-left-style',
  borderLeftWidth: 'border-left-width',
  borderRadius: 'border-radius',
  borderRight: 'border-right',
  borderRightColor: 'border-right-color',
  borderRightStyle: 'border-right-style',
  borderRightWidth: 'border-right-width',
  borderSpacing: 'border-spacing',
  borderStartEndRadius: 'border-start-end-radius',
  borderStartStartRadius: 'border-start-start-radius',
  borderStyle: 'border-style',
  borderTop: 'border-top',
  borderTopColor: 'border-top-color',
  borderTopLeftRadius: 'border-top-left-radius',
  borderTopRightRadius: 'border-top-right-radius',
  borderTopStyle: 'border-top-style',
  borderTopWidth: 'border-top-width',
  borderWidth: 'border-width',
  bottom: 'bottom',
  boxAlign: 'box-align',
  boxDecorationBreak: 'box-decoration-break',
  boxDirection: 'box-direction',
  boxFlex: 'box-flex',
  boxFlexGroup: 'box-flex-group',
  boxLines: 'box-lines',
  boxOrdinalGroup: 'box-ordinal-group',
  boxOrient: 'box-orient',
  boxPack: 'box-pack',
  boxShadow: 'box-shadow',
  boxSizing: 'box-sizing',
  breakAfter: 'break-after',
  breakBefore: 'break-before',
  breakInside: 'break-inside',
  captionSide: 'caption-side',
  caret: 'caret',
  caretColor: 'caret-color',
  caretShape: 'caret-shape',
  clear: 'clear',
  clip: 'clip',
  clipPath: 'clip-path',
  clipRule: 'clip-rule',
  color: 'color',
  colorInterpolationFilters: 'color-interpolation-filters',
  colorScheme: 'color-scheme',
  columnCount: 'column-count',
  columnFill: 'column-fill',
  columnGap: 'column-gap',
  columnRule: 'column-rule',
  columnRuleColor: 'column-rule-color',
  columnRuleStyle: 'column-rule-style',
  columnRuleWidth: 'column-rule-width',
  columnSpan: 'column-span',
  columnWidth: 'column-width',
  columns: 'columns',
  contain: 'contain',
  containIntrinsicBlockSize: 'contain-intrinsic-block-size',
  containIntrinsicHeight: 'contain-intrinsic-height',
  containIntrinsicInlineSize: 'contain-intrinsic-inline-size',
  containIntrinsicSize: 'contain-intrinsic-size',
  containIntrinsicWidth: 'contain-intrinsic-width',
  container: 'container',
  containerName: 'container-name',
  containerType: 'container-type',
  content: 'content',
  contentVisibility: 'content-visibility',
  counterIncrement: 'counter-increment',
  counterReset: 'counter-reset',
  counterSet: 'counter-set',
  cue: 'cue',
  cueAfter: 'cue-after',
  cueBefore: 'cue-before',
  cursor: 'cursor',
  cx: 'cx',
  cy: 'cy',
  d: 'd',
  direction: 'direction',
  display: 'display',
  dominantBaseline: 'dominant-baseline',
  emptyCells: 'empty-cells',
  fieldSizing: 'field-sizing',
  fill: 'fill',
  fillOpacity: 'fill-opacity',
  fillRule: 'fill-rule',
  filter: 'filter',
  flex: 'flex',
  flexBasis: 'flex-basis',
  flexDirection: 'flex-direction',
  flexFlow: 'flex-flow',
  flexGrow: 'flex-grow',
  flexShrink: 'flex-shrink',
  flexWrap: 'flex-wrap',
  float: 'float',
  font: 'font',
  fontFamily: 'font-family',
  fontFeatureSettings: 'font-feature-settings',
  fontKerning: 'font-kerning',
  fontLanguageOverride: 'font-language-override',
  fontOpticalSizing: 'font-optical-sizing',
  fontPalette: 'font-palette',
  fontSize: 'font-size',
  fontSizeAdjust: 'font-size-adjust',
  fontSmooth: 'font-smooth',
  fontStretch: 'font-stretch',
  fontStyle: 'font-style',
  fontSynthesis: 'font-synthesis',
  fontSynthesisPosition: 'font-synthesis-position',
  fontSynthesisSmallCaps: 'font-synthesis-small-caps',
  fontSynthesisStyle: 'font-synthesis-style',
  fontSynthesisWeight: 'font-synthesis-weight',
  fontVariant: 'font-variant',
  fontVariantAlternates: 'font-variant-alternates',
  fontVariantCaps: 'font-variant-caps',
  fontVariantEastAsian: 'font-variant-east-asian',
  fontVariantEmoji: 'font-variant-emoji',
  fontVariantLigatures: 'font-variant-ligatures',
  fontVariantNumeric: 'font-variant-numeric',
  fontVariantPosition: 'font-variant-position',
  fontVariationSettings: 'font-variation-settings',
  fontWeight: 'font-weight',
  forcedColorAdjust: 'forced-color-adjust',
  gap: 'gap',
  glyphOrientationHorizontal: 'glyph-orientation-horizontal',
  glyphOrientationVertical: 'glyph-orientation-vertical',
  grid: 'grid',
  gridArea: 'grid-area',
  gridAutoColumns: 'grid-auto-columns',
  gridAutoFlow: 'grid-auto-flow',
  gridAutoRows: 'grid-auto-rows',
  gridColumn: 'grid-column',
  gridColumnEnd: 'grid-column-end',
  gridColumnGap: 'grid-column-gap',
  gridColumnStart: 'grid-column-start',
  gridGap: 'grid-gap',
  gridRow: 'grid-row',
  gridRowEnd: 'grid-row-end',
  gridRowGap: 'grid-row-gap',
  gridRowStart: 'grid-row-start',
  gridTemplate: 'grid-template',
  gridTemplateAreas: 'grid-template-areas',
  gridTemplateColumns: 'grid-template-columns',
  gridTemplateRows: 'grid-template-rows',
  hangingPunctuation: 'hanging-punctuation',
  height: 'height',
  hyphenateCharacter: 'hyphenate-character',
  hyphenateLimitChars: 'hyphenate-limit-chars',
  hyphens: 'hyphens',
  imageOrientation: 'image-orientation',
  imageRendering: 'image-rendering',
  imageResolution: 'image-resolution',
  imeMode: 'ime-mode',
  initialLetter: 'initial-letter',
  initialLetterAlign: 'initial-letter-align',
  inlineSize: 'inline-size',
  inputSecurity: 'input-security',
  inset: 'inset',
  insetBlock: 'inset-block',
  insetBlockEnd: 'inset-block-end',
  insetBlockStart: 'inset-block-start',
  insetInline: 'inset-inline',
  insetInlineEnd: 'inset-inline-end',
  insetInlineStart: 'inset-inline-start',
  interpolateSize: 'interpolate-size',
  isolation: 'isolation',
  justifyContent: 'justify-content',
  justifyItems: 'justify-items',
  justifySelf: 'justify-self',
  justifyTracks: 'justify-tracks',
  kerning: 'kerning',
  left: 'left',
  letterSpacing: 'letter-spacing',
  lineBreak: 'line-break',
  lineClamp: 'line-clamp',
  lineHeight: 'line-height',
  lineHeightStep: 'line-height-step',
  listStyle: 'list-style',
  listStyleImage: 'list-style-image',
  listStylePosition: 'list-style-position',
  listStyleType: 'list-style-type',
  margin: 'margin',
  marginBlock: 'margin-block',
  marginBlockEnd: 'margin-block-end',
  marginBlockStart: 'margin-block-start',
  marginBottom: 'margin-bottom',
  marginInline: 'margin-inline',
  marginInlineEnd: 'margin-inline-end',
  marginInlineStart: 'margin-inline-start',
  marginLeft: 'margin-left',
  marginRight: 'margin-right',
  marginTop: 'margin-top',
  marginTrim: 'margin-trim',
  marker: 'marker',
  markerEnd: 'marker-end',
  markerMid: 'marker-mid',
  markerStart: 'marker-start',
  mask: 'mask',
  maskBorder: 'mask-border',
  maskBorderMode: 'mask-border-mode',
  maskBorderOutset: 'mask-border-outset',
  maskBorderRepeat: 'mask-border-repeat',
  maskBorderSlice: 'mask-border-slice',
  maskBorderSource: 'mask-border-source',
  maskBorderWidth: 'mask-border-width',
  maskClip: 'mask-clip',
  maskComposite: 'mask-composite',
  maskImage: 'mask-image',
  maskMode: 'mask-mode',
  maskOrigin: 'mask-origin',
  maskPosition: 'mask-position',
  maskRepeat: 'mask-repeat',
  maskSize: 'mask-size',
  maskType: 'mask-type',
  masonryAutoFlow: 'masonry-auto-flow',
  mathDepth: 'math-depth',
  mathShift: 'math-shift',
  mathStyle: 'math-style',
  maxBlockSize: 'max-block-size',
  maxHeight: 'max-height',
  maxInlineSize: 'max-inline-size',
  maxLines: 'max-lines',
  maxWidth: 'max-width',
  minBlockSize: 'min-block-size',
  minHeight: 'min-height',
  minInlineSize: 'min-inline-size',
  minWidth: 'min-width',
  mixBlendMode: 'mix-blend-mode',
  objectFit: 'object-fit',
  objectPosition: 'object-position',
  offset: 'offset',
  offsetAnchor: 'offset-anchor',
  offsetDistance: 'offset-distance',
  offsetPath: 'offset-path',
  offsetPosition: 'offset-position',
  offsetRotate: 'offset-rotate',
  opacity: 'opacity',
  order: 'order',
  orphans: 'orphans',
  outline: 'outline',
  outlineColor: 'outline-color',
  outlineOffset: 'outline-offset',
  outlineStyle: 'outline-style',
  outlineWidth: 'outline-width',
  overflow: 'overflow',
  overflowAnchor: 'overflow-anchor',
  overflowBlock: 'overflow-block',
  overflowClipBox: 'overflow-clip-box',
  overflowClipMargin: 'overflow-clip-margin',
  overflowInline: 'overflow-inline',
  overflowWrap: 'overflow-wrap',
  overflowX: 'overflow-x',
  overflowY: 'overflow-y',
  overlay: 'overlay',
  overscrollBehavior: 'overscroll-behavior',
  overscrollBehaviorBlock: 'overscroll-behavior-block',
  overscrollBehaviorInline: 'overscroll-behavior-inline',
  overscrollBehaviorX: 'overscroll-behavior-x',
  overscrollBehaviorY: 'overscroll-behavior-y',
  padding: 'padding',
  paddingBlock: 'padding-block',
  paddingBlockEnd: 'padding-block-end',
  paddingBlockStart: 'padding-block-start',
  paddingBottom: 'padding-bottom',
  paddingInline: 'padding-inline',
  paddingInlineEnd: 'padding-inline-end',
  paddingInlineStart: 'padding-inline-start',
  paddingLeft: 'padding-left',
  paddingRight: 'padding-right',
  paddingTop: 'padding-top',
  page: 'page',
  pageBreakAfter: 'page-break-after',
  pageBreakBefore: 'page-break-before',
  pageBreakInside: 'page-break-inside',
  paintOrder: 'paint-order',
  pause: 'pause',
  pauseAfter: 'pause-after',
  pauseBefore: 'pause-before',
  perspective: 'perspective',
  perspectiveOrigin: 'perspective-origin',
  placeContent: 'place-content',
  placeItems: 'place-items',
  placeSelf: 'place-self',
  pointerEvents: 'pointer-events',
  position: 'position',
  positionAnchor: 'position-anchor',
  positionArea: 'position-area',
  positionTry: 'position-try',
  positionTryFallbacks: 'position-try-fallbacks',
  positionTryOrder: 'position-try-order',
  positionVisibility: 'position-visibility',
  printColorAdjust: 'print-color-adjust',
  quotes: 'quotes',
  r: 'r',
  resize: 'resize',
  rest: 'rest',
  restAfter: 'rest-after',
  restBefore: 'rest-before',
  right: 'right',
  rotate: 'rotate',
  rowGap: 'row-gap',
  rubyAlign: 'ruby-align',
  rubyMerge: 'ruby-merge',
  rubyPosition: 'ruby-position',
  rx: 'rx',
  ry: 'ry',
  scale: 'scale',
  scrollBehavior: 'scroll-behavior',
  scrollMargin: 'scroll-margin',
  scrollMarginBlock: 'scroll-margin-block',
  scrollMarginBlockEnd: 'scroll-margin-block-end',
  scrollMarginBlockStart: 'scroll-margin-block-start',
  scrollMarginBottom: 'scroll-margin-bottom',
  scrollMarginInline: 'scroll-margin-inline',
  scrollMarginInlineEnd: 'scroll-margin-inline-end',
  scrollMarginInlineStart: 'scroll-margin-inline-start',
  scrollMarginLeft: 'scroll-margin-left',
  scrollMarginRight: 'scroll-margin-right',
  scrollMarginTop: 'scroll-margin-top',
  scrollPadding: 'scroll-padding',
  scrollPaddingBlock: 'scroll-padding-block',
  scrollPaddingBlockEnd: 'scroll-padding-block-end',
  scrollPaddingBlockStart: 'scroll-padding-block-start',
  scrollPaddingBottom: 'scroll-padding-bottom',
  scrollPaddingInline: 'scroll-padding-inline',
  scrollPaddingInlineEnd: 'scroll-padding-inline-end',
  scrollPaddingInlineStart: 'scroll-padding-inline-start',
  scrollPaddingLeft: 'scroll-padding-left',
  scrollPaddingRight: 'scroll-padding-right',
  scrollPaddingTop: 'scroll-padding-top',
  scrollSnapAlign: 'scroll-snap-align',
  scrollSnapCoordinate: 'scroll-snap-coordinate',
  scrollSnapDestination: 'scroll-snap-destination',
  scrollSnapPointsX: 'scroll-snap-points-x',
  scrollSnapPointsY: 'scroll-snap-points-y',
  scrollSnapStop: 'scroll-snap-stop',
  scrollSnapType: 'scroll-snap-type',
  scrollSnapTypeX: 'scroll-snap-type-x',
  scrollSnapTypeY: 'scroll-snap-type-y',
  scrollTimeline: 'scroll-timeline',
  scrollTimelineAxis: 'scroll-timeline-axis',
  scrollTimelineName: 'scroll-timeline-name',
  scrollbarColor: 'scrollbar-color',
  scrollbarGutter: 'scrollbar-gutter',
  scrollbarWidth: 'scrollbar-width',
  shapeImageThreshold: 'shape-image-threshold',
  shapeMargin: 'shape-margin',
  shapeOutside: 'shape-outside',
  shapeRendering: 'shape-rendering',
  speak: 'speak',
  speakAs: 'speak-as',
  src: 'src',
  stroke: 'stroke',
  strokeDasharray: 'stroke-dasharray',
  strokeDashoffset: 'stroke-dashoffset',
  strokeLinecap: 'stroke-linecap',
  strokeLinejoin: 'stroke-linejoin',
  strokeMiterlimit: 'stroke-miterlimit',
  strokeOpacity: 'stroke-opacity',
  strokeWidth: 'stroke-width',
  tabSize: 'tab-size',
  tableLayout: 'table-layout',
  textAlign: 'text-align',
  textAlignLast: 'text-align-last',
  textAnchor: 'text-anchor',
  textCombineUpright: 'text-combine-upright',
  textDecoration: 'text-decoration',
  textDecorationColor: 'text-decoration-color',
  textDecorationLine: 'text-decoration-line',
  textDecorationSkip: 'text-decoration-skip',
  textDecorationSkipInk: 'text-decoration-skip-ink',
  textDecorationStyle: 'text-decoration-style',
  textDecorationThickness: 'text-decoration-thickness',
  textEmphasis: 'text-emphasis',
  textEmphasisColor: 'text-emphasis-color',
  textEmphasisPosition: 'text-emphasis-position',
  textEmphasisStyle: 'text-emphasis-style',
  textIndent: 'text-indent',
  textJustify: 'text-justify',
  textOrientation: 'text-orientation',
  textOverflow: 'text-overflow',
  textRendering: 'text-rendering',
  textShadow: 'text-shadow',
  textSizeAdjust: 'text-size-adjust',
  textSpacingTrim: 'text-spacing-trim',
  textTransform: 'text-transform',
  textUnderlineOffset: 'text-underline-offset',
  textUnderlinePosition: 'text-underline-position',
  textWrap: 'text-wrap',
  textWrapMode: 'text-wrap-mode',
  textWrapStyle: 'text-wrap-style',
  timelineScope: 'timeline-scope',
  top: 'top',
  touchAction: 'touch-action',
  transform: 'transform',
  transformBox: 'transform-box',
  transformOrigin: 'transform-origin',
  transformStyle: 'transform-style',
  transition: 'transition',
  transitionBehavior: 'transition-behavior',
  transitionDelay: 'transition-delay',
  transitionDuration: 'transition-duration',
  transitionProperty: 'transition-property',
  transitionTimingFunction: 'transition-timing-function',
  translate: 'translate',
  unicodeBidi: 'unicode-bidi',
  unicodeRange: 'unicode-range',
  userSelect: 'user-select',
  vectorEffect: 'vector-effect',
  verticalAlign: 'vertical-align',
  viewTimeline: 'view-timeline',
  viewTimelineAxis: 'view-timeline-axis',
  viewTimelineInset: 'view-timeline-inset',
  viewTimelineName: 'view-timeline-name',
  viewTransitionName: 'view-transition-name',
  visibility: 'visibility',
  voiceBalance: 'voice-balance',
  voiceDuration: 'voice-duration',
  voiceFamily: 'voice-family',
  voicePitch: 'voice-pitch',
  voiceRange: 'voice-range',
  voiceRate: 'voice-rate',
  voiceStress: 'voice-stress',
  voiceVolume: 'voice-volume',
  whiteSpace: 'white-space',
  whiteSpaceCollapse: 'white-space-collapse',
  whiteSpaceTrim: 'white-space-trim',
  widows: 'widows',
  width: 'width',
  willChange: 'will-change',
  wordBreak: 'word-break',
  wordSpacing: 'word-spacing',
  wordWrap: 'word-wrap',
  writingMode: 'writing-mode',
  x: 'x',
  y: 'y',
  zIndex: 'z-index',
  zoom: 'zoom',
} as const;

export type CssPropertyCamelName = keyof typeof cssPropertyNameMap;
export type CssPropertyKebabName = typeof cssPropertyNameMap[CssPropertyCamelName];

// ==================== 属性配置映射 ====================

export class CssPropertyConfigMap {
  accentColor = new AccentColorConfig();
  alignContent = new AlignContentConfig();
  alignItems = new AlignItemsConfig();
  alignSelf = new AlignSelfConfig();
  alignTracks = new AlignTracksConfig();
  alignmentBaseline = new AlignmentBaselineConfig();
  all = new AllConfig();
  anchorName = new AnchorNameConfig();
  anchorScope = new AnchorScopeConfig();
  animation = new AnimationConfig();
  animationComposition = new AnimationCompositionConfig();
  animationDelay = new AnimationDelayConfig();
  animationDirection = new AnimationDirectionConfig();
  animationDuration = new AnimationDurationConfig();
  animationFillMode = new AnimationFillModeConfig();
  animationIterationCount = new AnimationIterationCountConfig();
  animationName = new AnimationNameConfig();
  animationPlayState = new AnimationPlayStateConfig();
  animationRange = new AnimationRangeConfig();
  animationRangeEnd = new AnimationRangeEndConfig();
  animationRangeStart = new AnimationRangeStartConfig();
  animationTimeline = new AnimationTimelineConfig();
  animationTimingFunction = new AnimationTimingFunctionConfig();
  appearance = new AppearanceConfig();
  aspectRatio = new AspectRatioConfig();
  azimuth = new AzimuthConfig();
  backdropFilter = new BackdropFilterConfig();
  backfaceVisibility = new BackfaceVisibilityConfig();
  background = new BackgroundConfig();
  backgroundAttachment = new BackgroundAttachmentConfig();
  backgroundBlendMode = new BackgroundBlendModeConfig();
  backgroundClip = new BackgroundClipConfig();
  backgroundColor = new BackgroundColorConfig();
  backgroundImage = new BackgroundImageConfig();
  backgroundOrigin = new BackgroundOriginConfig();
  backgroundPosition = new BackgroundPositionConfig();
  backgroundPositionX = new BackgroundPositionXConfig();
  backgroundPositionY = new BackgroundPositionYConfig();
  backgroundRepeat = new BackgroundRepeatConfig();
  backgroundSize = new BackgroundSizeConfig();
  baselineShift = new BaselineShiftConfig();
  behavior = new BehaviorConfig();
  blockSize = new BlockSizeConfig();
  border = new BorderConfig();
  borderBlock = new BorderBlockConfig();
  borderBlockColor = new BorderBlockColorConfig();
  borderBlockEnd = new BorderBlockEndConfig();
  borderBlockEndColor = new BorderBlockEndColorConfig();
  borderBlockEndStyle = new BorderBlockEndStyleConfig();
  borderBlockEndWidth = new BorderBlockEndWidthConfig();
  borderBlockStart = new BorderBlockStartConfig();
  borderBlockStartColor = new BorderBlockStartColorConfig();
  borderBlockStartStyle = new BorderBlockStartStyleConfig();
  borderBlockStartWidth = new BorderBlockStartWidthConfig();
  borderBlockStyle = new BorderBlockStyleConfig();
  borderBlockWidth = new BorderBlockWidthConfig();
  borderBottom = new BorderBottomConfig();
  borderBottomColor = new BorderBottomColorConfig();
  borderBottomLeftRadius = new BorderBottomLeftRadiusConfig();
  borderBottomRightRadius = new BorderBottomRightRadiusConfig();
  borderBottomStyle = new BorderBottomStyleConfig();
  borderBottomWidth = new BorderBottomWidthConfig();
  borderCollapse = new BorderCollapseConfig();
  borderColor = new BorderColorConfig();
  borderEndEndRadius = new BorderEndEndRadiusConfig();
  borderEndStartRadius = new BorderEndStartRadiusConfig();
  borderImage = new BorderImageConfig();
  borderImageOutset = new BorderImageOutsetConfig();
  borderImageRepeat = new BorderImageRepeatConfig();
  borderImageSlice = new BorderImageSliceConfig();
  borderImageSource = new BorderImageSourceConfig();
  borderImageWidth = new BorderImageWidthConfig();
  borderInline = new BorderInlineConfig();
  borderInlineColor = new BorderInlineColorConfig();
  borderInlineEnd = new BorderInlineEndConfig();
  borderInlineEndColor = new BorderInlineEndColorConfig();
  borderInlineEndStyle = new BorderInlineEndStyleConfig();
  borderInlineEndWidth = new BorderInlineEndWidthConfig();
  borderInlineStart = new BorderInlineStartConfig();
  borderInlineStartColor = new BorderInlineStartColorConfig();
  borderInlineStartStyle = new BorderInlineStartStyleConfig();
  borderInlineStartWidth = new BorderInlineStartWidthConfig();
  borderInlineStyle = new BorderInlineStyleConfig();
  borderInlineWidth = new BorderInlineWidthConfig();
  borderLeft = new BorderLeftConfig();
  borderLeftColor = new BorderLeftColorConfig();
  borderLeftStyle = new BorderLeftStyleConfig();
  borderLeftWidth = new BorderLeftWidthConfig();
  borderRadius = new BorderRadiusConfig();
  borderRight = new BorderRightConfig();
  borderRightColor = new BorderRightColorConfig();
  borderRightStyle = new BorderRightStyleConfig();
  borderRightWidth = new BorderRightWidthConfig();
  borderSpacing = new BorderSpacingConfig();
  borderStartEndRadius = new BorderStartEndRadiusConfig();
  borderStartStartRadius = new BorderStartStartRadiusConfig();
  borderStyle = new BorderStyleConfig();
  borderTop = new BorderTopConfig();
  borderTopColor = new BorderTopColorConfig();
  borderTopLeftRadius = new BorderTopLeftRadiusConfig();
  borderTopRightRadius = new BorderTopRightRadiusConfig();
  borderTopStyle = new BorderTopStyleConfig();
  borderTopWidth = new BorderTopWidthConfig();
  borderWidth = new BorderWidthConfig();
  bottom = new BottomConfig();
  boxAlign = new BoxAlignConfig();
  boxDecorationBreak = new BoxDecorationBreakConfig();
  boxDirection = new BoxDirectionConfig();
  boxFlex = new BoxFlexConfig();
  boxFlexGroup = new BoxFlexGroupConfig();
  boxLines = new BoxLinesConfig();
  boxOrdinalGroup = new BoxOrdinalGroupConfig();
  boxOrient = new BoxOrientConfig();
  boxPack = new BoxPackConfig();
  boxShadow = new BoxShadowConfig();
  boxSizing = new BoxSizingConfig();
  breakAfter = new BreakAfterConfig();
  breakBefore = new BreakBeforeConfig();
  breakInside = new BreakInsideConfig();
  captionSide = new CaptionSideConfig();
  caret = new CaretConfig();
  caretColor = new CaretColorConfig();
  caretShape = new CaretShapeConfig();
  clear = new ClearConfig();
  clip = new ClipConfig();
  clipPath = new ClipPathConfig();
  clipRule = new ClipRuleConfig();
  color = new ColorConfig();
  colorInterpolationFilters = new ColorInterpolationFiltersConfig();
  colorScheme = new ColorSchemeConfig();
  columnCount = new ColumnCountConfig();
  columnFill = new ColumnFillConfig();
  columnGap = new ColumnGapConfig();
  columnRule = new ColumnRuleConfig();
  columnRuleColor = new ColumnRuleColorConfig();
  columnRuleStyle = new ColumnRuleStyleConfig();
  columnRuleWidth = new ColumnRuleWidthConfig();
  columnSpan = new ColumnSpanConfig();
  columnWidth = new ColumnWidthConfig();
  columns = new ColumnsConfig();
  contain = new ContainConfig();
  containIntrinsicBlockSize = new ContainIntrinsicBlockSizeConfig();
  containIntrinsicHeight = new ContainIntrinsicHeightConfig();
  containIntrinsicInlineSize = new ContainIntrinsicInlineSizeConfig();
  containIntrinsicSize = new ContainIntrinsicSizeConfig();
  containIntrinsicWidth = new ContainIntrinsicWidthConfig();
  container = new ContainerConfig();
  containerName = new ContainerNameConfig();
  containerType = new ContainerTypeConfig();
  content = new ContentConfig();
  contentVisibility = new ContentVisibilityConfig();
  counterIncrement = new CounterIncrementConfig();
  counterReset = new CounterResetConfig();
  counterSet = new CounterSetConfig();
  cue = new CueConfig();
  cueAfter = new CueAfterConfig();
  cueBefore = new CueBeforeConfig();
  cursor = new CursorConfig();
  cx = new CxConfig();
  cy = new CyConfig();
  d = new DConfig();
  direction = new DirectionConfig();
  display = new DisplayConfig();
  dominantBaseline = new DominantBaselineConfig();
  emptyCells = new EmptyCellsConfig();
  fieldSizing = new FieldSizingConfig();
  fill = new FillConfig();
  fillOpacity = new FillOpacityConfig();
  fillRule = new FillRuleConfig();
  filter = new FilterConfig();
  flex = new FlexConfig();
  flexBasis = new FlexBasisConfig();
  flexDirection = new FlexDirectionConfig();
  flexFlow = new FlexFlowConfig();
  flexGrow = new FlexGrowConfig();
  flexShrink = new FlexShrinkConfig();
  flexWrap = new FlexWrapConfig();
  float = new FloatConfig();
  font = new FontConfig();
  fontFamily = new FontFamilyConfig();
  fontFeatureSettings = new FontFeatureSettingsConfig();
  fontKerning = new FontKerningConfig();
  fontLanguageOverride = new FontLanguageOverrideConfig();
  fontOpticalSizing = new FontOpticalSizingConfig();
  fontPalette = new FontPaletteConfig();
  fontSize = new FontSizeConfig();
  fontSizeAdjust = new FontSizeAdjustConfig();
  fontSmooth = new FontSmoothConfig();
  fontStretch = new FontStretchConfig();
  fontStyle = new FontStyleConfig();
  fontSynthesis = new FontSynthesisConfig();
  fontSynthesisPosition = new FontSynthesisPositionConfig();
  fontSynthesisSmallCaps = new FontSynthesisSmallCapsConfig();
  fontSynthesisStyle = new FontSynthesisStyleConfig();
  fontSynthesisWeight = new FontSynthesisWeightConfig();
  fontVariant = new FontVariantConfig();
  fontVariantAlternates = new FontVariantAlternatesConfig();
  fontVariantCaps = new FontVariantCapsConfig();
  fontVariantEastAsian = new FontVariantEastAsianConfig();
  fontVariantEmoji = new FontVariantEmojiConfig();
  fontVariantLigatures = new FontVariantLigaturesConfig();
  fontVariantNumeric = new FontVariantNumericConfig();
  fontVariantPosition = new FontVariantPositionConfig();
  fontVariationSettings = new FontVariationSettingsConfig();
  fontWeight = new FontWeightConfig();
  forcedColorAdjust = new ForcedColorAdjustConfig();
  gap = new GapConfig();
  glyphOrientationHorizontal = new GlyphOrientationHorizontalConfig();
  glyphOrientationVertical = new GlyphOrientationVerticalConfig();
  grid = new GridConfig();
  gridArea = new GridAreaConfig();
  gridAutoColumns = new GridAutoColumnsConfig();
  gridAutoFlow = new GridAutoFlowConfig();
  gridAutoRows = new GridAutoRowsConfig();
  gridColumn = new GridColumnConfig();
  gridColumnEnd = new GridColumnEndConfig();
  gridColumnGap = new GridColumnGapConfig();
  gridColumnStart = new GridColumnStartConfig();
  gridGap = new GridGapConfig();
  gridRow = new GridRowConfig();
  gridRowEnd = new GridRowEndConfig();
  gridRowGap = new GridRowGapConfig();
  gridRowStart = new GridRowStartConfig();
  gridTemplate = new GridTemplateConfig();
  gridTemplateAreas = new GridTemplateAreasConfig();
  gridTemplateColumns = new GridTemplateColumnsConfig();
  gridTemplateRows = new GridTemplateRowsConfig();
  hangingPunctuation = new HangingPunctuationConfig();
  height = new HeightConfig();
  hyphenateCharacter = new HyphenateCharacterConfig();
  hyphenateLimitChars = new HyphenateLimitCharsConfig();
  hyphens = new HyphensConfig();
  imageOrientation = new ImageOrientationConfig();
  imageRendering = new ImageRenderingConfig();
  imageResolution = new ImageResolutionConfig();
  imeMode = new ImeModeConfig();
  initialLetter = new InitialLetterConfig();
  initialLetterAlign = new InitialLetterAlignConfig();
  inlineSize = new InlineSizeConfig();
  inputSecurity = new InputSecurityConfig();
  inset = new InsetConfig();
  insetBlock = new InsetBlockConfig();
  insetBlockEnd = new InsetBlockEndConfig();
  insetBlockStart = new InsetBlockStartConfig();
  insetInline = new InsetInlineConfig();
  insetInlineEnd = new InsetInlineEndConfig();
  insetInlineStart = new InsetInlineStartConfig();
  interpolateSize = new InterpolateSizeConfig();
  isolation = new IsolationConfig();
  justifyContent = new JustifyContentConfig();
  justifyItems = new JustifyItemsConfig();
  justifySelf = new JustifySelfConfig();
  justifyTracks = new JustifyTracksConfig();
  kerning = new KerningConfig();
  left = new LeftConfig();
  letterSpacing = new LetterSpacingConfig();
  lineBreak = new LineBreakConfig();
  lineClamp = new LineClampConfig();
  lineHeight = new LineHeightConfig();
  lineHeightStep = new LineHeightStepConfig();
  listStyle = new ListStyleConfig();
  listStyleImage = new ListStyleImageConfig();
  listStylePosition = new ListStylePositionConfig();
  listStyleType = new ListStyleTypeConfig();
  margin = new MarginConfig();
  marginBlock = new MarginBlockConfig();
  marginBlockEnd = new MarginBlockEndConfig();
  marginBlockStart = new MarginBlockStartConfig();
  marginBottom = new MarginBottomConfig();
  marginInline = new MarginInlineConfig();
  marginInlineEnd = new MarginInlineEndConfig();
  marginInlineStart = new MarginInlineStartConfig();
  marginLeft = new MarginLeftConfig();
  marginRight = new MarginRightConfig();
  marginTop = new MarginTopConfig();
  marginTrim = new MarginTrimConfig();
  marker = new MarkerConfig();
  markerEnd = new MarkerEndConfig();
  markerMid = new MarkerMidConfig();
  markerStart = new MarkerStartConfig();
  mask = new MaskConfig();
  maskBorder = new MaskBorderConfig();
  maskBorderMode = new MaskBorderModeConfig();
  maskBorderOutset = new MaskBorderOutsetConfig();
  maskBorderRepeat = new MaskBorderRepeatConfig();
  maskBorderSlice = new MaskBorderSliceConfig();
  maskBorderSource = new MaskBorderSourceConfig();
  maskBorderWidth = new MaskBorderWidthConfig();
  maskClip = new MaskClipConfig();
  maskComposite = new MaskCompositeConfig();
  maskImage = new MaskImageConfig();
  maskMode = new MaskModeConfig();
  maskOrigin = new MaskOriginConfig();
  maskPosition = new MaskPositionConfig();
  maskRepeat = new MaskRepeatConfig();
  maskSize = new MaskSizeConfig();
  maskType = new MaskTypeConfig();
  masonryAutoFlow = new MasonryAutoFlowConfig();
  mathDepth = new MathDepthConfig();
  mathShift = new MathShiftConfig();
  mathStyle = new MathStyleConfig();
  maxBlockSize = new MaxBlockSizeConfig();
  maxHeight = new MaxHeightConfig();
  maxInlineSize = new MaxInlineSizeConfig();
  maxLines = new MaxLinesConfig();
  maxWidth = new MaxWidthConfig();
  minBlockSize = new MinBlockSizeConfig();
  minHeight = new MinHeightConfig();
  minInlineSize = new MinInlineSizeConfig();
  minWidth = new MinWidthConfig();
  mixBlendMode = new MixBlendModeConfig();
  objectFit = new ObjectFitConfig();
  objectPosition = new ObjectPositionConfig();
  offset = new OffsetConfig();
  offsetAnchor = new OffsetAnchorConfig();
  offsetDistance = new OffsetDistanceConfig();
  offsetPath = new OffsetPathConfig();
  offsetPosition = new OffsetPositionConfig();
  offsetRotate = new OffsetRotateConfig();
  opacity = new OpacityConfig();
  order = new OrderConfig();
  orphans = new OrphansConfig();
  outline = new OutlineConfig();
  outlineColor = new OutlineColorConfig();
  outlineOffset = new OutlineOffsetConfig();
  outlineStyle = new OutlineStyleConfig();
  outlineWidth = new OutlineWidthConfig();
  overflow = new OverflowConfig();
  overflowAnchor = new OverflowAnchorConfig();
  overflowBlock = new OverflowBlockConfig();
  overflowClipBox = new OverflowClipBoxConfig();
  overflowClipMargin = new OverflowClipMarginConfig();
  overflowInline = new OverflowInlineConfig();
  overflowWrap = new OverflowWrapConfig();
  overflowX = new OverflowXConfig();
  overflowY = new OverflowYConfig();
  overlay = new OverlayConfig();
  overscrollBehavior = new OverscrollBehaviorConfig();
  overscrollBehaviorBlock = new OverscrollBehaviorBlockConfig();
  overscrollBehaviorInline = new OverscrollBehaviorInlineConfig();
  overscrollBehaviorX = new OverscrollBehaviorXConfig();
  overscrollBehaviorY = new OverscrollBehaviorYConfig();
  padding = new PaddingConfig();
  paddingBlock = new PaddingBlockConfig();
  paddingBlockEnd = new PaddingBlockEndConfig();
  paddingBlockStart = new PaddingBlockStartConfig();
  paddingBottom = new PaddingBottomConfig();
  paddingInline = new PaddingInlineConfig();
  paddingInlineEnd = new PaddingInlineEndConfig();
  paddingInlineStart = new PaddingInlineStartConfig();
  paddingLeft = new PaddingLeftConfig();
  paddingRight = new PaddingRightConfig();
  paddingTop = new PaddingTopConfig();
  page = new PageConfig();
  pageBreakAfter = new PageBreakAfterConfig();
  pageBreakBefore = new PageBreakBeforeConfig();
  pageBreakInside = new PageBreakInsideConfig();
  paintOrder = new PaintOrderConfig();
  pause = new PauseConfig();
  pauseAfter = new PauseAfterConfig();
  pauseBefore = new PauseBeforeConfig();
  perspective = new PerspectiveConfig();
  perspectiveOrigin = new PerspectiveOriginConfig();
  placeContent = new PlaceContentConfig();
  placeItems = new PlaceItemsConfig();
  placeSelf = new PlaceSelfConfig();
  pointerEvents = new PointerEventsConfig();
  position = new PositionConfig();
  positionAnchor = new PositionAnchorConfig();
  positionArea = new PositionAreaConfig();
  positionTry = new PositionTryConfig();
  positionTryFallbacks = new PositionTryFallbacksConfig();
  positionTryOrder = new PositionTryOrderConfig();
  positionVisibility = new PositionVisibilityConfig();
  printColorAdjust = new PrintColorAdjustConfig();
  quotes = new QuotesConfig();
  r = new RConfig();
  resize = new ResizeConfig();
  rest = new RestConfig();
  restAfter = new RestAfterConfig();
  restBefore = new RestBeforeConfig();
  right = new RightConfig();
  rotate = new RotateConfig();
  rowGap = new RowGapConfig();
  rubyAlign = new RubyAlignConfig();
  rubyMerge = new RubyMergeConfig();
  rubyPosition = new RubyPositionConfig();
  rx = new RxConfig();
  ry = new RyConfig();
  scale = new ScaleConfig();
  scrollBehavior = new ScrollBehaviorConfig();
  scrollMargin = new ScrollMarginConfig();
  scrollMarginBlock = new ScrollMarginBlockConfig();
  scrollMarginBlockEnd = new ScrollMarginBlockEndConfig();
  scrollMarginBlockStart = new ScrollMarginBlockStartConfig();
  scrollMarginBottom = new ScrollMarginBottomConfig();
  scrollMarginInline = new ScrollMarginInlineConfig();
  scrollMarginInlineEnd = new ScrollMarginInlineEndConfig();
  scrollMarginInlineStart = new ScrollMarginInlineStartConfig();
  scrollMarginLeft = new ScrollMarginLeftConfig();
  scrollMarginRight = new ScrollMarginRightConfig();
  scrollMarginTop = new ScrollMarginTopConfig();
  scrollPadding = new ScrollPaddingConfig();
  scrollPaddingBlock = new ScrollPaddingBlockConfig();
  scrollPaddingBlockEnd = new ScrollPaddingBlockEndConfig();
  scrollPaddingBlockStart = new ScrollPaddingBlockStartConfig();
  scrollPaddingBottom = new ScrollPaddingBottomConfig();
  scrollPaddingInline = new ScrollPaddingInlineConfig();
  scrollPaddingInlineEnd = new ScrollPaddingInlineEndConfig();
  scrollPaddingInlineStart = new ScrollPaddingInlineStartConfig();
  scrollPaddingLeft = new ScrollPaddingLeftConfig();
  scrollPaddingRight = new ScrollPaddingRightConfig();
  scrollPaddingTop = new ScrollPaddingTopConfig();
  scrollSnapAlign = new ScrollSnapAlignConfig();
  scrollSnapCoordinate = new ScrollSnapCoordinateConfig();
  scrollSnapDestination = new ScrollSnapDestinationConfig();
  scrollSnapPointsX = new ScrollSnapPointsXConfig();
  scrollSnapPointsY = new ScrollSnapPointsYConfig();
  scrollSnapStop = new ScrollSnapStopConfig();
  scrollSnapType = new ScrollSnapTypeConfig();
  scrollSnapTypeX = new ScrollSnapTypeXConfig();
  scrollSnapTypeY = new ScrollSnapTypeYConfig();
  scrollTimeline = new ScrollTimelineConfig();
  scrollTimelineAxis = new ScrollTimelineAxisConfig();
  scrollTimelineName = new ScrollTimelineNameConfig();
  scrollbarColor = new ScrollbarColorConfig();
  scrollbarGutter = new ScrollbarGutterConfig();
  scrollbarWidth = new ScrollbarWidthConfig();
  shapeImageThreshold = new ShapeImageThresholdConfig();
  shapeMargin = new ShapeMarginConfig();
  shapeOutside = new ShapeOutsideConfig();
  shapeRendering = new ShapeRenderingConfig();
  speak = new SpeakConfig();
  speakAs = new SpeakAsConfig();
  src = new SrcConfig();
  stroke = new StrokeConfig();
  strokeDasharray = new StrokeDasharrayConfig();
  strokeDashoffset = new StrokeDashoffsetConfig();
  strokeLinecap = new StrokeLinecapConfig();
  strokeLinejoin = new StrokeLinejoinConfig();
  strokeMiterlimit = new StrokeMiterlimitConfig();
  strokeOpacity = new StrokeOpacityConfig();
  strokeWidth = new StrokeWidthConfig();
  tabSize = new TabSizeConfig();
  tableLayout = new TableLayoutConfig();
  textAlign = new TextAlignConfig();
  textAlignLast = new TextAlignLastConfig();
  textAnchor = new TextAnchorConfig();
  textCombineUpright = new TextCombineUprightConfig();
  textDecoration = new TextDecorationConfig();
  textDecorationColor = new TextDecorationColorConfig();
  textDecorationLine = new TextDecorationLineConfig();
  textDecorationSkip = new TextDecorationSkipConfig();
  textDecorationSkipInk = new TextDecorationSkipInkConfig();
  textDecorationStyle = new TextDecorationStyleConfig();
  textDecorationThickness = new TextDecorationThicknessConfig();
  textEmphasis = new TextEmphasisConfig();
  textEmphasisColor = new TextEmphasisColorConfig();
  textEmphasisPosition = new TextEmphasisPositionConfig();
  textEmphasisStyle = new TextEmphasisStyleConfig();
  textIndent = new TextIndentConfig();
  textJustify = new TextJustifyConfig();
  textOrientation = new TextOrientationConfig();
  textOverflow = new TextOverflowConfig();
  textRendering = new TextRenderingConfig();
  textShadow = new TextShadowConfig();
  textSizeAdjust = new TextSizeAdjustConfig();
  textSpacingTrim = new TextSpacingTrimConfig();
  textTransform = new TextTransformConfig();
  textUnderlineOffset = new TextUnderlineOffsetConfig();
  textUnderlinePosition = new TextUnderlinePositionConfig();
  textWrap = new TextWrapConfig();
  textWrapMode = new TextWrapModeConfig();
  textWrapStyle = new TextWrapStyleConfig();
  timelineScope = new TimelineScopeConfig();
  top = new TopConfig();
  touchAction = new TouchActionConfig();
  transform = new TransformConfig();
  transformBox = new TransformBoxConfig();
  transformOrigin = new TransformOriginConfig();
  transformStyle = new TransformStyleConfig();
  transition = new TransitionConfig();
  transitionBehavior = new TransitionBehaviorConfig();
  transitionDelay = new TransitionDelayConfig();
  transitionDuration = new TransitionDurationConfig();
  transitionProperty = new TransitionPropertyConfig();
  transitionTimingFunction = new TransitionTimingFunctionConfig();
  translate = new TranslateConfig();
  unicodeBidi = new UnicodeBidiConfig();
  unicodeRange = new UnicodeRangeConfig();
  userSelect = new UserSelectConfig();
  vectorEffect = new VectorEffectConfig();
  verticalAlign = new VerticalAlignConfig();
  viewTimeline = new ViewTimelineConfig();
  viewTimelineAxis = new ViewTimelineAxisConfig();
  viewTimelineInset = new ViewTimelineInsetConfig();
  viewTimelineName = new ViewTimelineNameConfig();
  viewTransitionName = new ViewTransitionNameConfig();
  visibility = new VisibilityConfig();
  voiceBalance = new VoiceBalanceConfig();
  voiceDuration = new VoiceDurationConfig();
  voiceFamily = new VoiceFamilyConfig();
  voicePitch = new VoicePitchConfig();
  voiceRange = new VoiceRangeConfig();
  voiceRate = new VoiceRateConfig();
  voiceStress = new VoiceStressConfig();
  voiceVolume = new VoiceVolumeConfig();
  whiteSpace = new WhiteSpaceConfig();
  whiteSpaceCollapse = new WhiteSpaceCollapseConfig();
  whiteSpaceTrim = new WhiteSpaceTrimConfig();
  widows = new WidowsConfig();
  width = new WidthConfig();
  willChange = new WillChangeConfig();
  wordBreak = new WordBreakConfig();
  wordSpacing = new WordSpacingConfig();
  wordWrap = new WordWrapConfig();
  writingMode = new WritingModeConfig();
  x = new XConfig();
  y = new YConfig();
  zIndex = new ZIndexConfig();
  zoom = new ZoomConfig();
}
