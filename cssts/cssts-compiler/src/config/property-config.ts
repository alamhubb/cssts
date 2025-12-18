/**
 * CSS 属性配置（自动生成）
 */

import { ALL_COLORS, type AllColorValue } from './colors';
import type { NumberTypeName, UnitCategoryName } from './units';
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
  keywords: (AccentColorKeyword | AllColorValue)[] = [...ACCENT_COLOR_KEYWORDS, ...ALL_COLORS];
  numberTypes: NumberTypeName[] = [...ACCENT_COLOR_NUMBER_TYPES];
}

export class AlignContentConfig {
  keywords: AlignContentKeyword[] = [...ALIGN_CONTENT_KEYWORDS];
}

export class AlignItemsConfig {
  keywords: AlignItemsKeyword[] = [...ALIGN_ITEMS_KEYWORDS];
}

export class AlignSelfConfig {
  keywords: AlignSelfKeyword[] = [...ALIGN_SELF_KEYWORDS];
}

export class AlignTracksConfig {
  keywords: AlignTracksKeyword[] = [...ALIGN_TRACKS_KEYWORDS];
}

export class AlignmentBaselineConfig {
  keywords: AlignmentBaselineKeyword[] = [...ALIGNMENT_BASELINE_KEYWORDS];
}

export class AllConfig {
  keywords: AllKeyword[] = [...ALL_KEYWORDS];
}

export class AnchorNameConfig {
  keywords: AnchorNameKeyword[] = [...ANCHOR_NAME_KEYWORDS];
}

export class AnchorScopeConfig {
  keywords: AnchorScopeKeyword[] = [...ANCHOR_SCOPE_KEYWORDS];
}

export class AnimationConfig {
  keywords: AnimationKeyword[] = [...ANIMATION_KEYWORDS];
  numberTypes: NumberTypeName[] = [...ANIMATION_NUMBER_TYPES];
}

export class AnimationCompositionConfig {
  keywords: AnimationCompositionKeyword[] = [...ANIMATION_COMPOSITION_KEYWORDS];
}

export class AnimationDelayConfig {
  numberTypes: NumberTypeName[] = [...ANIMATION_DELAY_NUMBER_TYPES];
}

export class AnimationDirectionConfig {
  keywords: AnimationDirectionKeyword[] = [...ANIMATION_DIRECTION_KEYWORDS];
}

export class AnimationDurationConfig {
  numberTypes: NumberTypeName[] = [...ANIMATION_DURATION_NUMBER_TYPES];
}

export class AnimationFillModeConfig {
  keywords: AnimationFillModeKeyword[] = [...ANIMATION_FILL_MODE_KEYWORDS];
}

export class AnimationIterationCountConfig {
  keywords: AnimationIterationCountKeyword[] = [...ANIMATION_ITERATION_COUNT_KEYWORDS];
  numberTypes: NumberTypeName[] = [...ANIMATION_ITERATION_COUNT_NUMBER_TYPES];
}

export class AnimationNameConfig {
  keywords: AnimationNameKeyword[] = [...ANIMATION_NAME_KEYWORDS];
}

export class AnimationPlayStateConfig {
  keywords: AnimationPlayStateKeyword[] = [...ANIMATION_PLAY_STATE_KEYWORDS];
}

export class AnimationRangeConfig {
}

export class AnimationRangeEndConfig {
  keywords: AnimationRangeEndKeyword[] = [...ANIMATION_RANGE_END_KEYWORDS];
  numberTypes: NumberTypeName[] = [...ANIMATION_RANGE_END_NUMBER_TYPES];
}

export class AnimationRangeStartConfig {
  keywords: AnimationRangeStartKeyword[] = [...ANIMATION_RANGE_START_KEYWORDS];
  numberTypes: NumberTypeName[] = [...ANIMATION_RANGE_START_NUMBER_TYPES];
}

export class AnimationTimelineConfig {
  keywords: AnimationTimelineKeyword[] = [...ANIMATION_TIMELINE_KEYWORDS];
}

export class AnimationTimingFunctionConfig {
  keywords: AnimationTimingFunctionKeyword[] = [...ANIMATION_TIMING_FUNCTION_KEYWORDS];
  numberTypes: NumberTypeName[] = [...ANIMATION_TIMING_FUNCTION_NUMBER_TYPES];
}

export class AppearanceConfig {
  keywords: AppearanceKeyword[] = [...APPEARANCE_KEYWORDS];
}

export class AspectRatioConfig {
  keywords: AspectRatioKeyword[] = [...ASPECT_RATIO_KEYWORDS];
  numberTypes: NumberTypeName[] = [...ASPECT_RATIO_NUMBER_TYPES];
}

export class AzimuthConfig {
  keywords: AzimuthKeyword[] = [...AZIMUTH_KEYWORDS];
  numberTypes: NumberTypeName[] = [...AZIMUTH_NUMBER_TYPES];
}

export class BackdropFilterConfig {
  keywords: (BackdropFilterKeyword | AllColorValue)[] = [...BACKDROP_FILTER_KEYWORDS, ...ALL_COLORS];
  numberTypes: NumberTypeName[] = [...BACKDROP_FILTER_NUMBER_TYPES];
}

export class BackfaceVisibilityConfig {
  keywords: BackfaceVisibilityKeyword[] = [...BACKFACE_VISIBILITY_KEYWORDS];
}

export class BackgroundConfig {
  keywords: (BackgroundKeyword | AllColorValue)[] = [...BACKGROUND_KEYWORDS, ...ALL_COLORS];
  numberTypes: NumberTypeName[] = [...BACKGROUND_NUMBER_TYPES];
}

export class BackgroundAttachmentConfig {
  keywords: BackgroundAttachmentKeyword[] = [...BACKGROUND_ATTACHMENT_KEYWORDS];
}

export class BackgroundBlendModeConfig {
  keywords: BackgroundBlendModeKeyword[] = [...BACKGROUND_BLEND_MODE_KEYWORDS];
}

export class BackgroundClipConfig {
  keywords: BackgroundClipKeyword[] = [...BACKGROUND_CLIP_KEYWORDS];
}

export class BackgroundColorConfig {
  keywords: (BackgroundColorKeyword | AllColorValue)[] = [...BACKGROUND_COLOR_KEYWORDS, ...ALL_COLORS];
  numberTypes: NumberTypeName[] = [...BACKGROUND_COLOR_NUMBER_TYPES];
}

export class BackgroundImageConfig {
  keywords: (BackgroundImageKeyword | AllColorValue)[] = [...BACKGROUND_IMAGE_KEYWORDS, ...ALL_COLORS];
  numberTypes: NumberTypeName[] = [...BACKGROUND_IMAGE_NUMBER_TYPES];
}

export class BackgroundOriginConfig {
  keywords: BackgroundOriginKeyword[] = [...BACKGROUND_ORIGIN_KEYWORDS];
}

export class BackgroundPositionConfig {
  keywords: BackgroundPositionKeyword[] = [...BACKGROUND_POSITION_KEYWORDS];
  numberTypes: NumberTypeName[] = [...BACKGROUND_POSITION_NUMBER_TYPES];
}

export class BackgroundPositionXConfig {
  keywords: BackgroundPositionXKeyword[] = [...BACKGROUND_POSITION_X_KEYWORDS];
  numberTypes: NumberTypeName[] = [...BACKGROUND_POSITION_X_NUMBER_TYPES];
}

export class BackgroundPositionYConfig {
  keywords: BackgroundPositionYKeyword[] = [...BACKGROUND_POSITION_Y_KEYWORDS];
  numberTypes: NumberTypeName[] = [...BACKGROUND_POSITION_Y_NUMBER_TYPES];
}

export class BackgroundRepeatConfig {
  keywords: BackgroundRepeatKeyword[] = [...BACKGROUND_REPEAT_KEYWORDS];
}

export class BackgroundSizeConfig {
  keywords: BackgroundSizeKeyword[] = [...BACKGROUND_SIZE_KEYWORDS];
  numberTypes: NumberTypeName[] = [...BACKGROUND_SIZE_NUMBER_TYPES];
}

export class BaselineShiftConfig {
  keywords: BaselineShiftKeyword[] = [...BASELINE_SHIFT_KEYWORDS];
  numberTypes: NumberTypeName[] = [...BASELINE_SHIFT_NUMBER_TYPES];
}

export class BehaviorConfig {
}

export class BlockSizeConfig {
}

export class BorderConfig {
  keywords: (BorderKeyword | AllColorValue)[] = [...BORDER_KEYWORDS, ...ALL_COLORS];
  numberTypes: NumberTypeName[] = [...BORDER_NUMBER_TYPES];
}

export class BorderBlockConfig {
  keywords: (BorderBlockKeyword | AllColorValue)[] = [...BORDER_BLOCK_KEYWORDS, ...ALL_COLORS];
  numberTypes: NumberTypeName[] = [...BORDER_BLOCK_NUMBER_TYPES];
}

export class BorderBlockColorConfig {
}

export class BorderBlockEndConfig {
  keywords: (BorderBlockEndKeyword | AllColorValue)[] = [...BORDER_BLOCK_END_KEYWORDS, ...ALL_COLORS];
  numberTypes: NumberTypeName[] = [...BORDER_BLOCK_END_NUMBER_TYPES];
}

export class BorderBlockEndColorConfig {
}

export class BorderBlockEndStyleConfig {
}

export class BorderBlockEndWidthConfig {
}

export class BorderBlockStartConfig {
  keywords: (BorderBlockStartKeyword | AllColorValue)[] = [...BORDER_BLOCK_START_KEYWORDS, ...ALL_COLORS];
  numberTypes: NumberTypeName[] = [...BORDER_BLOCK_START_NUMBER_TYPES];
}

export class BorderBlockStartColorConfig {
}

export class BorderBlockStartStyleConfig {
}

export class BorderBlockStartWidthConfig {
}

export class BorderBlockStyleConfig {
}

export class BorderBlockWidthConfig {
}

export class BorderBottomConfig {
  keywords: (BorderBottomKeyword | AllColorValue)[] = [...BORDER_BOTTOM_KEYWORDS, ...ALL_COLORS];
  numberTypes: NumberTypeName[] = [...BORDER_BOTTOM_NUMBER_TYPES];
}

export class BorderBottomColorConfig {
}

export class BorderBottomLeftRadiusConfig {
  numberTypes: NumberTypeName[] = [...BORDER_BOTTOM_LEFT_RADIUS_NUMBER_TYPES];
}

export class BorderBottomRightRadiusConfig {
  numberTypes: NumberTypeName[] = [...BORDER_BOTTOM_RIGHT_RADIUS_NUMBER_TYPES];
}

export class BorderBottomStyleConfig {
  keywords: BorderBottomStyleKeyword[] = [...BORDER_BOTTOM_STYLE_KEYWORDS];
}

export class BorderBottomWidthConfig {
  keywords: BorderBottomWidthKeyword[] = [...BORDER_BOTTOM_WIDTH_KEYWORDS];
  numberTypes: NumberTypeName[] = [...BORDER_BOTTOM_WIDTH_NUMBER_TYPES];
}

export class BorderCollapseConfig {
  keywords: BorderCollapseKeyword[] = [...BORDER_COLLAPSE_KEYWORDS];
}

export class BorderColorConfig {
  keywords: (BorderColorKeyword | AllColorValue)[] = [...BORDER_COLOR_KEYWORDS, ...ALL_COLORS];
  numberTypes: NumberTypeName[] = [...BORDER_COLOR_NUMBER_TYPES];
}

export class BorderEndEndRadiusConfig {
  numberTypes: NumberTypeName[] = [...BORDER_END_END_RADIUS_NUMBER_TYPES];
}

export class BorderEndStartRadiusConfig {
  numberTypes: NumberTypeName[] = [...BORDER_END_START_RADIUS_NUMBER_TYPES];
}

export class BorderImageConfig {
}

export class BorderImageOutsetConfig {
  numberTypes: NumberTypeName[] = [...BORDER_IMAGE_OUTSET_NUMBER_TYPES];
}

export class BorderImageRepeatConfig {
  keywords: BorderImageRepeatKeyword[] = [...BORDER_IMAGE_REPEAT_KEYWORDS];
}

export class BorderImageSliceConfig {
  keywords: BorderImageSliceKeyword[] = [...BORDER_IMAGE_SLICE_KEYWORDS];
  numberTypes: NumberTypeName[] = [...BORDER_IMAGE_SLICE_NUMBER_TYPES];
}

export class BorderImageSourceConfig {
  keywords: (BorderImageSourceKeyword | AllColorValue)[] = [...BORDER_IMAGE_SOURCE_KEYWORDS, ...ALL_COLORS];
  numberTypes: NumberTypeName[] = [...BORDER_IMAGE_SOURCE_NUMBER_TYPES];
}

export class BorderImageWidthConfig {
  keywords: BorderImageWidthKeyword[] = [...BORDER_IMAGE_WIDTH_KEYWORDS];
  numberTypes: NumberTypeName[] = [...BORDER_IMAGE_WIDTH_NUMBER_TYPES];
}

export class BorderInlineConfig {
  keywords: (BorderInlineKeyword | AllColorValue)[] = [...BORDER_INLINE_KEYWORDS, ...ALL_COLORS];
  numberTypes: NumberTypeName[] = [...BORDER_INLINE_NUMBER_TYPES];
}

export class BorderInlineColorConfig {
}

export class BorderInlineEndConfig {
  keywords: (BorderInlineEndKeyword | AllColorValue)[] = [...BORDER_INLINE_END_KEYWORDS, ...ALL_COLORS];
  numberTypes: NumberTypeName[] = [...BORDER_INLINE_END_NUMBER_TYPES];
}

export class BorderInlineEndColorConfig {
}

export class BorderInlineEndStyleConfig {
}

export class BorderInlineEndWidthConfig {
}

export class BorderInlineStartConfig {
  keywords: (BorderInlineStartKeyword | AllColorValue)[] = [...BORDER_INLINE_START_KEYWORDS, ...ALL_COLORS];
  numberTypes: NumberTypeName[] = [...BORDER_INLINE_START_NUMBER_TYPES];
}

export class BorderInlineStartColorConfig {
}

export class BorderInlineStartStyleConfig {
}

export class BorderInlineStartWidthConfig {
}

export class BorderInlineStyleConfig {
}

export class BorderInlineWidthConfig {
}

export class BorderLeftConfig {
  keywords: (BorderLeftKeyword | AllColorValue)[] = [...BORDER_LEFT_KEYWORDS, ...ALL_COLORS];
  numberTypes: NumberTypeName[] = [...BORDER_LEFT_NUMBER_TYPES];
}

export class BorderLeftColorConfig {
  keywords: (BorderLeftColorKeyword | AllColorValue)[] = [...BORDER_LEFT_COLOR_KEYWORDS, ...ALL_COLORS];
  numberTypes: NumberTypeName[] = [...BORDER_LEFT_COLOR_NUMBER_TYPES];
}

export class BorderLeftStyleConfig {
  keywords: BorderLeftStyleKeyword[] = [...BORDER_LEFT_STYLE_KEYWORDS];
}

export class BorderLeftWidthConfig {
  keywords: BorderLeftWidthKeyword[] = [...BORDER_LEFT_WIDTH_KEYWORDS];
  numberTypes: NumberTypeName[] = [...BORDER_LEFT_WIDTH_NUMBER_TYPES];
}

export class BorderRadiusConfig {
  numberTypes: NumberTypeName[] = [...BORDER_RADIUS_NUMBER_TYPES];
}

export class BorderRightConfig {
  keywords: (BorderRightKeyword | AllColorValue)[] = [...BORDER_RIGHT_KEYWORDS, ...ALL_COLORS];
  numberTypes: NumberTypeName[] = [...BORDER_RIGHT_NUMBER_TYPES];
}

export class BorderRightColorConfig {
  keywords: (BorderRightColorKeyword | AllColorValue)[] = [...BORDER_RIGHT_COLOR_KEYWORDS, ...ALL_COLORS];
  numberTypes: NumberTypeName[] = [...BORDER_RIGHT_COLOR_NUMBER_TYPES];
}

export class BorderRightStyleConfig {
  keywords: BorderRightStyleKeyword[] = [...BORDER_RIGHT_STYLE_KEYWORDS];
}

export class BorderRightWidthConfig {
  keywords: BorderRightWidthKeyword[] = [...BORDER_RIGHT_WIDTH_KEYWORDS];
  numberTypes: NumberTypeName[] = [...BORDER_RIGHT_WIDTH_NUMBER_TYPES];
}

export class BorderSpacingConfig {
  numberTypes: NumberTypeName[] = [...BORDER_SPACING_NUMBER_TYPES];
}

export class BorderStartEndRadiusConfig {
  numberTypes: NumberTypeName[] = [...BORDER_START_END_RADIUS_NUMBER_TYPES];
}

export class BorderStartStartRadiusConfig {
  numberTypes: NumberTypeName[] = [...BORDER_START_START_RADIUS_NUMBER_TYPES];
}

export class BorderStyleConfig {
  keywords: BorderStyleKeyword[] = [...BORDER_STYLE_KEYWORDS];
}

export class BorderTopConfig {
  keywords: (BorderTopKeyword | AllColorValue)[] = [...BORDER_TOP_KEYWORDS, ...ALL_COLORS];
  numberTypes: NumberTypeName[] = [...BORDER_TOP_NUMBER_TYPES];
}

export class BorderTopColorConfig {
  keywords: (BorderTopColorKeyword | AllColorValue)[] = [...BORDER_TOP_COLOR_KEYWORDS, ...ALL_COLORS];
  numberTypes: NumberTypeName[] = [...BORDER_TOP_COLOR_NUMBER_TYPES];
}

export class BorderTopLeftRadiusConfig {
  numberTypes: NumberTypeName[] = [...BORDER_TOP_LEFT_RADIUS_NUMBER_TYPES];
}

export class BorderTopRightRadiusConfig {
  numberTypes: NumberTypeName[] = [...BORDER_TOP_RIGHT_RADIUS_NUMBER_TYPES];
}

export class BorderTopStyleConfig {
  keywords: BorderTopStyleKeyword[] = [...BORDER_TOP_STYLE_KEYWORDS];
}

export class BorderTopWidthConfig {
  keywords: BorderTopWidthKeyword[] = [...BORDER_TOP_WIDTH_KEYWORDS];
  numberTypes: NumberTypeName[] = [...BORDER_TOP_WIDTH_NUMBER_TYPES];
}

export class BorderWidthConfig {
  keywords: BorderWidthKeyword[] = [...BORDER_WIDTH_KEYWORDS];
  numberTypes: NumberTypeName[] = [...BORDER_WIDTH_NUMBER_TYPES];
}

export class BottomConfig {
  keywords: BottomKeyword[] = [...BOTTOM_KEYWORDS];
  numberTypes: NumberTypeName[] = [...BOTTOM_NUMBER_TYPES];
}

export class BoxAlignConfig {
  keywords: BoxAlignKeyword[] = [...BOX_ALIGN_KEYWORDS];
}

export class BoxDecorationBreakConfig {
  keywords: BoxDecorationBreakKeyword[] = [...BOX_DECORATION_BREAK_KEYWORDS];
}

export class BoxDirectionConfig {
  keywords: BoxDirectionKeyword[] = [...BOX_DIRECTION_KEYWORDS];
}

export class BoxFlexConfig {
  numberTypes: NumberTypeName[] = [...BOX_FLEX_NUMBER_TYPES];
}

export class BoxFlexGroupConfig {
  numberTypes: NumberTypeName[] = [...BOX_FLEX_GROUP_NUMBER_TYPES];
}

export class BoxLinesConfig {
  keywords: BoxLinesKeyword[] = [...BOX_LINES_KEYWORDS];
}

export class BoxOrdinalGroupConfig {
  numberTypes: NumberTypeName[] = [...BOX_ORDINAL_GROUP_NUMBER_TYPES];
}

export class BoxOrientConfig {
  keywords: BoxOrientKeyword[] = [...BOX_ORIENT_KEYWORDS];
}

export class BoxPackConfig {
  keywords: BoxPackKeyword[] = [...BOX_PACK_KEYWORDS];
}

export class BoxShadowConfig {
  keywords: (BoxShadowKeyword | AllColorValue)[] = [...BOX_SHADOW_KEYWORDS, ...ALL_COLORS];
  numberTypes: NumberTypeName[] = [...BOX_SHADOW_NUMBER_TYPES];
}

export class BoxSizingConfig {
  keywords: BoxSizingKeyword[] = [...BOX_SIZING_KEYWORDS];
}

export class BreakAfterConfig {
  keywords: BreakAfterKeyword[] = [...BREAK_AFTER_KEYWORDS];
}

export class BreakBeforeConfig {
  keywords: BreakBeforeKeyword[] = [...BREAK_BEFORE_KEYWORDS];
}

export class BreakInsideConfig {
  keywords: BreakInsideKeyword[] = [...BREAK_INSIDE_KEYWORDS];
}

export class CaptionSideConfig {
  keywords: CaptionSideKeyword[] = [...CAPTION_SIDE_KEYWORDS];
}

export class CaretConfig {
}

export class CaretColorConfig {
  keywords: (CaretColorKeyword | AllColorValue)[] = [...CARET_COLOR_KEYWORDS, ...ALL_COLORS];
  numberTypes: NumberTypeName[] = [...CARET_COLOR_NUMBER_TYPES];
}

export class CaretShapeConfig {
  keywords: CaretShapeKeyword[] = [...CARET_SHAPE_KEYWORDS];
}

export class ClearConfig {
  keywords: ClearKeyword[] = [...CLEAR_KEYWORDS];
}

export class ClipConfig {
  keywords: ClipKeyword[] = [...CLIP_KEYWORDS];
  numberTypes: NumberTypeName[] = [...CLIP_NUMBER_TYPES];
}

export class ClipPathConfig {
  keywords: ClipPathKeyword[] = [...CLIP_PATH_KEYWORDS];
  numberTypes: NumberTypeName[] = [...CLIP_PATH_NUMBER_TYPES];
}

export class ClipRuleConfig {
  keywords: ClipRuleKeyword[] = [...CLIP_RULE_KEYWORDS];
}

export class ColorConfig {
  keywords: (ColorKeyword | AllColorValue)[] = [...COLOR_KEYWORDS, ...ALL_COLORS];
  numberTypes: NumberTypeName[] = [...COLOR_NUMBER_TYPES];
}

export class ColorInterpolationFiltersConfig {
  keywords: ColorInterpolationFiltersKeyword[] = [...COLOR_INTERPOLATION_FILTERS_KEYWORDS];
}

export class ColorSchemeConfig {
  keywords: ColorSchemeKeyword[] = [...COLOR_SCHEME_KEYWORDS];
}

export class ColumnCountConfig {
  keywords: ColumnCountKeyword[] = [...COLUMN_COUNT_KEYWORDS];
  numberTypes: NumberTypeName[] = [...COLUMN_COUNT_NUMBER_TYPES];
}

export class ColumnFillConfig {
  keywords: ColumnFillKeyword[] = [...COLUMN_FILL_KEYWORDS];
}

export class ColumnGapConfig {
  keywords: ColumnGapKeyword[] = [...COLUMN_GAP_KEYWORDS];
  numberTypes: NumberTypeName[] = [...COLUMN_GAP_NUMBER_TYPES];
}

export class ColumnRuleConfig {
}

export class ColumnRuleColorConfig {
  keywords: (ColumnRuleColorKeyword | AllColorValue)[] = [...COLUMN_RULE_COLOR_KEYWORDS, ...ALL_COLORS];
  numberTypes: NumberTypeName[] = [...COLUMN_RULE_COLOR_NUMBER_TYPES];
}

export class ColumnRuleStyleConfig {
}

export class ColumnRuleWidthConfig {
}

export class ColumnSpanConfig {
  keywords: ColumnSpanKeyword[] = [...COLUMN_SPAN_KEYWORDS];
}

export class ColumnWidthConfig {
  keywords: ColumnWidthKeyword[] = [...COLUMN_WIDTH_KEYWORDS];
  numberTypes: NumberTypeName[] = [...COLUMN_WIDTH_NUMBER_TYPES];
}

export class ColumnsConfig {
}

export class ContainConfig {
  keywords: ContainKeyword[] = [...CONTAIN_KEYWORDS];
}

export class ContainIntrinsicBlockSizeConfig {
  keywords: ContainIntrinsicBlockSizeKeyword[] = [...CONTAIN_INTRINSIC_BLOCK_SIZE_KEYWORDS];
  numberTypes: NumberTypeName[] = [...CONTAIN_INTRINSIC_BLOCK_SIZE_NUMBER_TYPES];
}

export class ContainIntrinsicHeightConfig {
  keywords: ContainIntrinsicHeightKeyword[] = [...CONTAIN_INTRINSIC_HEIGHT_KEYWORDS];
  numberTypes: NumberTypeName[] = [...CONTAIN_INTRINSIC_HEIGHT_NUMBER_TYPES];
}

export class ContainIntrinsicInlineSizeConfig {
  keywords: ContainIntrinsicInlineSizeKeyword[] = [...CONTAIN_INTRINSIC_INLINE_SIZE_KEYWORDS];
  numberTypes: NumberTypeName[] = [...CONTAIN_INTRINSIC_INLINE_SIZE_NUMBER_TYPES];
}

export class ContainIntrinsicSizeConfig {
  keywords: ContainIntrinsicSizeKeyword[] = [...CONTAIN_INTRINSIC_SIZE_KEYWORDS];
  numberTypes: NumberTypeName[] = [...CONTAIN_INTRINSIC_SIZE_NUMBER_TYPES];
}

export class ContainIntrinsicWidthConfig {
  keywords: ContainIntrinsicWidthKeyword[] = [...CONTAIN_INTRINSIC_WIDTH_KEYWORDS];
  numberTypes: NumberTypeName[] = [...CONTAIN_INTRINSIC_WIDTH_NUMBER_TYPES];
}

export class ContainerConfig {
}

export class ContainerNameConfig {
  keywords: ContainerNameKeyword[] = [...CONTAINER_NAME_KEYWORDS];
}

export class ContainerTypeConfig {
  keywords: ContainerTypeKeyword[] = [...CONTAINER_TYPE_KEYWORDS];
}

export class ContentConfig {
  keywords: (ContentKeyword | AllColorValue)[] = [...CONTENT_KEYWORDS, ...ALL_COLORS];
  numberTypes: NumberTypeName[] = [...CONTENT_NUMBER_TYPES];
}

export class ContentVisibilityConfig {
  keywords: ContentVisibilityKeyword[] = [...CONTENT_VISIBILITY_KEYWORDS];
}

export class CounterIncrementConfig {
  keywords: CounterIncrementKeyword[] = [...COUNTER_INCREMENT_KEYWORDS];
  numberTypes: NumberTypeName[] = [...COUNTER_INCREMENT_NUMBER_TYPES];
}

export class CounterResetConfig {
  keywords: CounterResetKeyword[] = [...COUNTER_RESET_KEYWORDS];
  numberTypes: NumberTypeName[] = [...COUNTER_RESET_NUMBER_TYPES];
}

export class CounterSetConfig {
  keywords: CounterSetKeyword[] = [...COUNTER_SET_KEYWORDS];
  numberTypes: NumberTypeName[] = [...COUNTER_SET_NUMBER_TYPES];
}

export class CueConfig {
}

export class CueAfterConfig {
  keywords: CueAfterKeyword[] = [...CUE_AFTER_KEYWORDS];
}

export class CueBeforeConfig {
  keywords: CueBeforeKeyword[] = [...CUE_BEFORE_KEYWORDS];
}

export class CursorConfig {
  keywords: CursorKeyword[] = [...CURSOR_KEYWORDS];
  numberTypes: NumberTypeName[] = [...CURSOR_NUMBER_TYPES];
}

export class CxConfig {
  numberTypes: NumberTypeName[] = [...CX_NUMBER_TYPES];
}

export class CyConfig {
  numberTypes: NumberTypeName[] = [...CY_NUMBER_TYPES];
}

export class DConfig {
  keywords: DKeyword[] = [...D_KEYWORDS];
}

export class DirectionConfig {
  keywords: DirectionKeyword[] = [...DIRECTION_KEYWORDS];
}

export class DisplayConfig {
  keywords: DisplayKeyword[] = [...DISPLAY_KEYWORDS];
}

export class DominantBaselineConfig {
  keywords: DominantBaselineKeyword[] = [...DOMINANT_BASELINE_KEYWORDS];
}

export class EmptyCellsConfig {
  keywords: EmptyCellsKeyword[] = [...EMPTY_CELLS_KEYWORDS];
}

export class FieldSizingConfig {
  keywords: FieldSizingKeyword[] = [...FIELD_SIZING_KEYWORDS];
}

export class FillConfig {
  keywords: (FillKeyword | AllColorValue)[] = [...FILL_KEYWORDS, ...ALL_COLORS];
  numberTypes: NumberTypeName[] = [...FILL_NUMBER_TYPES];
}

export class FillOpacityConfig {
  numberTypes: NumberTypeName[] = [...FILL_OPACITY_NUMBER_TYPES];
}

export class FillRuleConfig {
  keywords: FillRuleKeyword[] = [...FILL_RULE_KEYWORDS];
}

export class FilterConfig {
  keywords: (FilterKeyword | AllColorValue)[] = [...FILTER_KEYWORDS, ...ALL_COLORS];
  numberTypes: NumberTypeName[] = [...FILTER_NUMBER_TYPES];
}

export class FlexConfig {
  keywords: FlexKeyword[] = [...FLEX_KEYWORDS];
}

export class FlexBasisConfig {
  keywords: FlexBasisKeyword[] = [...FLEX_BASIS_KEYWORDS];
}

export class FlexDirectionConfig {
  keywords: FlexDirectionKeyword[] = [...FLEX_DIRECTION_KEYWORDS];
}

export class FlexFlowConfig {
}

export class FlexGrowConfig {
  numberTypes: NumberTypeName[] = [...FLEX_GROW_NUMBER_TYPES];
}

export class FlexShrinkConfig {
  numberTypes: NumberTypeName[] = [...FLEX_SHRINK_NUMBER_TYPES];
}

export class FlexWrapConfig {
  keywords: FlexWrapKeyword[] = [...FLEX_WRAP_KEYWORDS];
}

export class FloatConfig {
  keywords: FloatKeyword[] = [...FLOAT_KEYWORDS];
}

export class FontConfig {
  keywords: FontKeyword[] = [...FONT_KEYWORDS];
}

export class FontFamilyConfig {
  keywords: FontFamilyKeyword[] = [...FONT_FAMILY_KEYWORDS];
}

export class FontFeatureSettingsConfig {
  keywords: FontFeatureSettingsKeyword[] = [...FONT_FEATURE_SETTINGS_KEYWORDS];
  numberTypes: NumberTypeName[] = [...FONT_FEATURE_SETTINGS_NUMBER_TYPES];
}

export class FontKerningConfig {
  keywords: FontKerningKeyword[] = [...FONT_KERNING_KEYWORDS];
}

export class FontLanguageOverrideConfig {
  keywords: FontLanguageOverrideKeyword[] = [...FONT_LANGUAGE_OVERRIDE_KEYWORDS];
}

export class FontOpticalSizingConfig {
  keywords: FontOpticalSizingKeyword[] = [...FONT_OPTICAL_SIZING_KEYWORDS];
}

export class FontPaletteConfig {
  keywords: FontPaletteKeyword[] = [...FONT_PALETTE_KEYWORDS];
}

export class FontSizeConfig {
  keywords: FontSizeKeyword[] = [...FONT_SIZE_KEYWORDS];
  numberTypes: NumberTypeName[] = [...FONT_SIZE_NUMBER_TYPES];
}

export class FontSizeAdjustConfig {
  keywords: FontSizeAdjustKeyword[] = [...FONT_SIZE_ADJUST_KEYWORDS];
  numberTypes: NumberTypeName[] = [...FONT_SIZE_ADJUST_NUMBER_TYPES];
}

export class FontSmoothConfig {
  keywords: FontSmoothKeyword[] = [...FONT_SMOOTH_KEYWORDS];
  numberTypes: NumberTypeName[] = [...FONT_SMOOTH_NUMBER_TYPES];
}

export class FontStretchConfig {
  keywords: FontStretchKeyword[] = [...FONT_STRETCH_KEYWORDS];
  numberTypes: NumberTypeName[] = [...FONT_STRETCH_NUMBER_TYPES];
}

export class FontStyleConfig {
  keywords: FontStyleKeyword[] = [...FONT_STYLE_KEYWORDS];
  numberTypes: NumberTypeName[] = [...FONT_STYLE_NUMBER_TYPES];
}

export class FontSynthesisConfig {
  keywords: FontSynthesisKeyword[] = [...FONT_SYNTHESIS_KEYWORDS];
}

export class FontSynthesisPositionConfig {
  keywords: FontSynthesisPositionKeyword[] = [...FONT_SYNTHESIS_POSITION_KEYWORDS];
}

export class FontSynthesisSmallCapsConfig {
  keywords: FontSynthesisSmallCapsKeyword[] = [...FONT_SYNTHESIS_SMALL_CAPS_KEYWORDS];
}

export class FontSynthesisStyleConfig {
  keywords: FontSynthesisStyleKeyword[] = [...FONT_SYNTHESIS_STYLE_KEYWORDS];
}

export class FontSynthesisWeightConfig {
  keywords: FontSynthesisWeightKeyword[] = [...FONT_SYNTHESIS_WEIGHT_KEYWORDS];
}

export class FontVariantConfig {
  keywords: FontVariantKeyword[] = [...FONT_VARIANT_KEYWORDS];
}

export class FontVariantAlternatesConfig {
  keywords: FontVariantAlternatesKeyword[] = [...FONT_VARIANT_ALTERNATES_KEYWORDS];
}

export class FontVariantCapsConfig {
  keywords: FontVariantCapsKeyword[] = [...FONT_VARIANT_CAPS_KEYWORDS];
}

export class FontVariantEastAsianConfig {
  keywords: FontVariantEastAsianKeyword[] = [...FONT_VARIANT_EAST_ASIAN_KEYWORDS];
}

export class FontVariantEmojiConfig {
  keywords: FontVariantEmojiKeyword[] = [...FONT_VARIANT_EMOJI_KEYWORDS];
}

export class FontVariantLigaturesConfig {
  keywords: FontVariantLigaturesKeyword[] = [...FONT_VARIANT_LIGATURES_KEYWORDS];
}

export class FontVariantNumericConfig {
  keywords: FontVariantNumericKeyword[] = [...FONT_VARIANT_NUMERIC_KEYWORDS];
}

export class FontVariantPositionConfig {
  keywords: FontVariantPositionKeyword[] = [...FONT_VARIANT_POSITION_KEYWORDS];
}

export class FontVariationSettingsConfig {
  keywords: FontVariationSettingsKeyword[] = [...FONT_VARIATION_SETTINGS_KEYWORDS];
  numberTypes: NumberTypeName[] = [...FONT_VARIATION_SETTINGS_NUMBER_TYPES];
}

export class FontWeightConfig {
  keywords: FontWeightKeyword[] = [...FONT_WEIGHT_KEYWORDS];
  numberTypes: NumberTypeName[] = [...FONT_WEIGHT_NUMBER_TYPES];
}

export class ForcedColorAdjustConfig {
  keywords: ForcedColorAdjustKeyword[] = [...FORCED_COLOR_ADJUST_KEYWORDS];
}

export class GapConfig {
}

export class GlyphOrientationHorizontalConfig {
  numberTypes: NumberTypeName[] = [...GLYPH_ORIENTATION_HORIZONTAL_NUMBER_TYPES];
}

export class GlyphOrientationVerticalConfig {
  numberTypes: NumberTypeName[] = [...GLYPH_ORIENTATION_VERTICAL_NUMBER_TYPES];
}

export class GridConfig {
  keywords: GridKeyword[] = [...GRID_KEYWORDS];
}

export class GridAreaConfig {
  keywords: GridAreaKeyword[] = [...GRID_AREA_KEYWORDS];
  numberTypes: NumberTypeName[] = [...GRID_AREA_NUMBER_TYPES];
}

export class GridAutoColumnsConfig {
  keywords: GridAutoColumnsKeyword[] = [...GRID_AUTO_COLUMNS_KEYWORDS];
  numberTypes: NumberTypeName[] = [...GRID_AUTO_COLUMNS_NUMBER_TYPES];
}

export class GridAutoFlowConfig {
  keywords: GridAutoFlowKeyword[] = [...GRID_AUTO_FLOW_KEYWORDS];
}

export class GridAutoRowsConfig {
  keywords: GridAutoRowsKeyword[] = [...GRID_AUTO_ROWS_KEYWORDS];
  numberTypes: NumberTypeName[] = [...GRID_AUTO_ROWS_NUMBER_TYPES];
}

export class GridColumnConfig {
  keywords: GridColumnKeyword[] = [...GRID_COLUMN_KEYWORDS];
  numberTypes: NumberTypeName[] = [...GRID_COLUMN_NUMBER_TYPES];
}

export class GridColumnEndConfig {
  keywords: GridColumnEndKeyword[] = [...GRID_COLUMN_END_KEYWORDS];
  numberTypes: NumberTypeName[] = [...GRID_COLUMN_END_NUMBER_TYPES];
}

export class GridColumnGapConfig {
  numberTypes: NumberTypeName[] = [...GRID_COLUMN_GAP_NUMBER_TYPES];
}

export class GridColumnStartConfig {
  keywords: GridColumnStartKeyword[] = [...GRID_COLUMN_START_KEYWORDS];
  numberTypes: NumberTypeName[] = [...GRID_COLUMN_START_NUMBER_TYPES];
}

export class GridGapConfig {
}

export class GridRowConfig {
  keywords: GridRowKeyword[] = [...GRID_ROW_KEYWORDS];
  numberTypes: NumberTypeName[] = [...GRID_ROW_NUMBER_TYPES];
}

export class GridRowEndConfig {
  keywords: GridRowEndKeyword[] = [...GRID_ROW_END_KEYWORDS];
  numberTypes: NumberTypeName[] = [...GRID_ROW_END_NUMBER_TYPES];
}

export class GridRowGapConfig {
  numberTypes: NumberTypeName[] = [...GRID_ROW_GAP_NUMBER_TYPES];
}

export class GridRowStartConfig {
  keywords: GridRowStartKeyword[] = [...GRID_ROW_START_KEYWORDS];
  numberTypes: NumberTypeName[] = [...GRID_ROW_START_NUMBER_TYPES];
}

export class GridTemplateConfig {
  keywords: GridTemplateKeyword[] = [...GRID_TEMPLATE_KEYWORDS];
  numberTypes: NumberTypeName[] = [...GRID_TEMPLATE_NUMBER_TYPES];
}

export class GridTemplateAreasConfig {
  keywords: GridTemplateAreasKeyword[] = [...GRID_TEMPLATE_AREAS_KEYWORDS];
}

export class GridTemplateColumnsConfig {
  keywords: GridTemplateColumnsKeyword[] = [...GRID_TEMPLATE_COLUMNS_KEYWORDS];
  numberTypes: NumberTypeName[] = [...GRID_TEMPLATE_COLUMNS_NUMBER_TYPES];
}

export class GridTemplateRowsConfig {
  keywords: GridTemplateRowsKeyword[] = [...GRID_TEMPLATE_ROWS_KEYWORDS];
  numberTypes: NumberTypeName[] = [...GRID_TEMPLATE_ROWS_NUMBER_TYPES];
}

export class HangingPunctuationConfig {
  keywords: HangingPunctuationKeyword[] = [...HANGING_PUNCTUATION_KEYWORDS];
}

export class HeightConfig {
  keywords: HeightKeyword[] = [...HEIGHT_KEYWORDS];
  numberTypes: NumberTypeName[] = [...HEIGHT_NUMBER_TYPES];
}

export class HyphenateCharacterConfig {
  keywords: HyphenateCharacterKeyword[] = [...HYPHENATE_CHARACTER_KEYWORDS];
}

export class HyphenateLimitCharsConfig {
  keywords: HyphenateLimitCharsKeyword[] = [...HYPHENATE_LIMIT_CHARS_KEYWORDS];
  numberTypes: NumberTypeName[] = [...HYPHENATE_LIMIT_CHARS_NUMBER_TYPES];
}

export class HyphensConfig {
  keywords: HyphensKeyword[] = [...HYPHENS_KEYWORDS];
}

export class ImageOrientationConfig {
  keywords: ImageOrientationKeyword[] = [...IMAGE_ORIENTATION_KEYWORDS];
  numberTypes: NumberTypeName[] = [...IMAGE_ORIENTATION_NUMBER_TYPES];
}

export class ImageRenderingConfig {
  keywords: ImageRenderingKeyword[] = [...IMAGE_RENDERING_KEYWORDS];
}

export class ImageResolutionConfig {
  keywords: ImageResolutionKeyword[] = [...IMAGE_RESOLUTION_KEYWORDS];
  numberTypes: NumberTypeName[] = [...IMAGE_RESOLUTION_NUMBER_TYPES];
}

export class ImeModeConfig {
  keywords: ImeModeKeyword[] = [...IME_MODE_KEYWORDS];
}

export class InitialLetterConfig {
  keywords: InitialLetterKeyword[] = [...INITIAL_LETTER_KEYWORDS];
  numberTypes: NumberTypeName[] = [...INITIAL_LETTER_NUMBER_TYPES];
}

export class InitialLetterAlignConfig {
  keywords: InitialLetterAlignKeyword[] = [...INITIAL_LETTER_ALIGN_KEYWORDS];
}

export class InlineSizeConfig {
}

export class InputSecurityConfig {
  keywords: InputSecurityKeyword[] = [...INPUT_SECURITY_KEYWORDS];
}

export class InsetConfig {
}

export class InsetBlockConfig {
}

export class InsetBlockEndConfig {
}

export class InsetBlockStartConfig {
}

export class InsetInlineConfig {
}

export class InsetInlineEndConfig {
}

export class InsetInlineStartConfig {
}

export class InterpolateSizeConfig {
  keywords: InterpolateSizeKeyword[] = [...INTERPOLATE_SIZE_KEYWORDS];
}

export class IsolationConfig {
  keywords: IsolationKeyword[] = [...ISOLATION_KEYWORDS];
}

export class JustifyContentConfig {
  keywords: JustifyContentKeyword[] = [...JUSTIFY_CONTENT_KEYWORDS];
}

export class JustifyItemsConfig {
  keywords: JustifyItemsKeyword[] = [...JUSTIFY_ITEMS_KEYWORDS];
}

export class JustifySelfConfig {
  keywords: JustifySelfKeyword[] = [...JUSTIFY_SELF_KEYWORDS];
}

export class JustifyTracksConfig {
  keywords: JustifyTracksKeyword[] = [...JUSTIFY_TRACKS_KEYWORDS];
}

export class KerningConfig {
  keywords: KerningKeyword[] = [...KERNING_KEYWORDS];
  numberTypes: NumberTypeName[] = [...KERNING_NUMBER_TYPES];
}

export class LeftConfig {
  keywords: LeftKeyword[] = [...LEFT_KEYWORDS];
  numberTypes: NumberTypeName[] = [...LEFT_NUMBER_TYPES];
}

export class LetterSpacingConfig {
  keywords: LetterSpacingKeyword[] = [...LETTER_SPACING_KEYWORDS];
  numberTypes: NumberTypeName[] = [...LETTER_SPACING_NUMBER_TYPES];
}

export class LineBreakConfig {
  keywords: LineBreakKeyword[] = [...LINE_BREAK_KEYWORDS];
}

export class LineClampConfig {
  keywords: LineClampKeyword[] = [...LINE_CLAMP_KEYWORDS];
  numberTypes: NumberTypeName[] = [...LINE_CLAMP_NUMBER_TYPES];
}

export class LineHeightConfig {
  keywords: LineHeightKeyword[] = [...LINE_HEIGHT_KEYWORDS];
  numberTypes: NumberTypeName[] = [...LINE_HEIGHT_NUMBER_TYPES];
}

export class LineHeightStepConfig {
  numberTypes: NumberTypeName[] = [...LINE_HEIGHT_STEP_NUMBER_TYPES];
}

export class ListStyleConfig {
}

export class ListStyleImageConfig {
  keywords: (ListStyleImageKeyword | AllColorValue)[] = [...LIST_STYLE_IMAGE_KEYWORDS, ...ALL_COLORS];
  numberTypes: NumberTypeName[] = [...LIST_STYLE_IMAGE_NUMBER_TYPES];
}

export class ListStylePositionConfig {
  keywords: ListStylePositionKeyword[] = [...LIST_STYLE_POSITION_KEYWORDS];
}

export class ListStyleTypeConfig {
  keywords: ListStyleTypeKeyword[] = [...LIST_STYLE_TYPE_KEYWORDS];
}

export class MarginConfig {
  keywords: MarginKeyword[] = [...MARGIN_KEYWORDS];
  numberTypes: NumberTypeName[] = [...MARGIN_NUMBER_TYPES];
}

export class MarginBlockConfig {
}

export class MarginBlockEndConfig {
}

export class MarginBlockStartConfig {
}

export class MarginBottomConfig {
  keywords: MarginBottomKeyword[] = [...MARGIN_BOTTOM_KEYWORDS];
  numberTypes: NumberTypeName[] = [...MARGIN_BOTTOM_NUMBER_TYPES];
}

export class MarginInlineConfig {
}

export class MarginInlineEndConfig {
}

export class MarginInlineStartConfig {
}

export class MarginLeftConfig {
  keywords: MarginLeftKeyword[] = [...MARGIN_LEFT_KEYWORDS];
  numberTypes: NumberTypeName[] = [...MARGIN_LEFT_NUMBER_TYPES];
}

export class MarginRightConfig {
  keywords: MarginRightKeyword[] = [...MARGIN_RIGHT_KEYWORDS];
  numberTypes: NumberTypeName[] = [...MARGIN_RIGHT_NUMBER_TYPES];
}

export class MarginTopConfig {
  keywords: MarginTopKeyword[] = [...MARGIN_TOP_KEYWORDS];
  numberTypes: NumberTypeName[] = [...MARGIN_TOP_NUMBER_TYPES];
}

export class MarginTrimConfig {
  keywords: MarginTrimKeyword[] = [...MARGIN_TRIM_KEYWORDS];
}

export class MarkerConfig {
  keywords: MarkerKeyword[] = [...MARKER_KEYWORDS];
}

export class MarkerEndConfig {
  keywords: MarkerEndKeyword[] = [...MARKER_END_KEYWORDS];
}

export class MarkerMidConfig {
  keywords: MarkerMidKeyword[] = [...MARKER_MID_KEYWORDS];
}

export class MarkerStartConfig {
  keywords: MarkerStartKeyword[] = [...MARKER_START_KEYWORDS];
}

export class MaskConfig {
  keywords: (MaskKeyword | AllColorValue)[] = [...MASK_KEYWORDS, ...ALL_COLORS];
  numberTypes: NumberTypeName[] = [...MASK_NUMBER_TYPES];
}

export class MaskBorderConfig {
}

export class MaskBorderModeConfig {
  keywords: MaskBorderModeKeyword[] = [...MASK_BORDER_MODE_KEYWORDS];
}

export class MaskBorderOutsetConfig {
  numberTypes: NumberTypeName[] = [...MASK_BORDER_OUTSET_NUMBER_TYPES];
}

export class MaskBorderRepeatConfig {
  keywords: MaskBorderRepeatKeyword[] = [...MASK_BORDER_REPEAT_KEYWORDS];
}

export class MaskBorderSliceConfig {
  keywords: MaskBorderSliceKeyword[] = [...MASK_BORDER_SLICE_KEYWORDS];
  numberTypes: NumberTypeName[] = [...MASK_BORDER_SLICE_NUMBER_TYPES];
}

export class MaskBorderSourceConfig {
  keywords: (MaskBorderSourceKeyword | AllColorValue)[] = [...MASK_BORDER_SOURCE_KEYWORDS, ...ALL_COLORS];
  numberTypes: NumberTypeName[] = [...MASK_BORDER_SOURCE_NUMBER_TYPES];
}

export class MaskBorderWidthConfig {
  keywords: MaskBorderWidthKeyword[] = [...MASK_BORDER_WIDTH_KEYWORDS];
  numberTypes: NumberTypeName[] = [...MASK_BORDER_WIDTH_NUMBER_TYPES];
}

export class MaskClipConfig {
  keywords: MaskClipKeyword[] = [...MASK_CLIP_KEYWORDS];
}

export class MaskCompositeConfig {
  keywords: MaskCompositeKeyword[] = [...MASK_COMPOSITE_KEYWORDS];
}

export class MaskImageConfig {
  keywords: (MaskImageKeyword | AllColorValue)[] = [...MASK_IMAGE_KEYWORDS, ...ALL_COLORS];
  numberTypes: NumberTypeName[] = [...MASK_IMAGE_NUMBER_TYPES];
}

export class MaskModeConfig {
  keywords: MaskModeKeyword[] = [...MASK_MODE_KEYWORDS];
}

export class MaskOriginConfig {
  keywords: MaskOriginKeyword[] = [...MASK_ORIGIN_KEYWORDS];
}

export class MaskPositionConfig {
  keywords: MaskPositionKeyword[] = [...MASK_POSITION_KEYWORDS];
  numberTypes: NumberTypeName[] = [...MASK_POSITION_NUMBER_TYPES];
}

export class MaskRepeatConfig {
  keywords: MaskRepeatKeyword[] = [...MASK_REPEAT_KEYWORDS];
}

export class MaskSizeConfig {
  keywords: MaskSizeKeyword[] = [...MASK_SIZE_KEYWORDS];
  numberTypes: NumberTypeName[] = [...MASK_SIZE_NUMBER_TYPES];
}

export class MaskTypeConfig {
  keywords: MaskTypeKeyword[] = [...MASK_TYPE_KEYWORDS];
}

export class MasonryAutoFlowConfig {
  keywords: MasonryAutoFlowKeyword[] = [...MASONRY_AUTO_FLOW_KEYWORDS];
}

export class MathDepthConfig {
  keywords: MathDepthKeyword[] = [...MATH_DEPTH_KEYWORDS];
  numberTypes: NumberTypeName[] = [...MATH_DEPTH_NUMBER_TYPES];
}

export class MathShiftConfig {
  keywords: MathShiftKeyword[] = [...MATH_SHIFT_KEYWORDS];
}

export class MathStyleConfig {
  keywords: MathStyleKeyword[] = [...MATH_STYLE_KEYWORDS];
}

export class MaxBlockSizeConfig {
}

export class MaxHeightConfig {
  keywords: MaxHeightKeyword[] = [...MAX_HEIGHT_KEYWORDS];
  numberTypes: NumberTypeName[] = [...MAX_HEIGHT_NUMBER_TYPES];
}

export class MaxInlineSizeConfig {
}

export class MaxLinesConfig {
  keywords: MaxLinesKeyword[] = [...MAX_LINES_KEYWORDS];
  numberTypes: NumberTypeName[] = [...MAX_LINES_NUMBER_TYPES];
}

export class MaxWidthConfig {
  keywords: MaxWidthKeyword[] = [...MAX_WIDTH_KEYWORDS];
  numberTypes: NumberTypeName[] = [...MAX_WIDTH_NUMBER_TYPES];
}

export class MinBlockSizeConfig {
}

export class MinHeightConfig {
  keywords: MinHeightKeyword[] = [...MIN_HEIGHT_KEYWORDS];
  numberTypes: NumberTypeName[] = [...MIN_HEIGHT_NUMBER_TYPES];
}

export class MinInlineSizeConfig {
}

export class MinWidthConfig {
  keywords: MinWidthKeyword[] = [...MIN_WIDTH_KEYWORDS];
  numberTypes: NumberTypeName[] = [...MIN_WIDTH_NUMBER_TYPES];
}

export class MixBlendModeConfig {
  keywords: MixBlendModeKeyword[] = [...MIX_BLEND_MODE_KEYWORDS];
}

export class ObjectFitConfig {
  keywords: ObjectFitKeyword[] = [...OBJECT_FIT_KEYWORDS];
}

export class ObjectPositionConfig {
  keywords: ObjectPositionKeyword[] = [...OBJECT_POSITION_KEYWORDS];
  numberTypes: NumberTypeName[] = [...OBJECT_POSITION_NUMBER_TYPES];
}

export class OffsetConfig {
}

export class OffsetAnchorConfig {
  keywords: OffsetAnchorKeyword[] = [...OFFSET_ANCHOR_KEYWORDS];
  numberTypes: NumberTypeName[] = [...OFFSET_ANCHOR_NUMBER_TYPES];
}

export class OffsetDistanceConfig {
  numberTypes: NumberTypeName[] = [...OFFSET_DISTANCE_NUMBER_TYPES];
}

export class OffsetPathConfig {
  keywords: OffsetPathKeyword[] = [...OFFSET_PATH_KEYWORDS];
  numberTypes: NumberTypeName[] = [...OFFSET_PATH_NUMBER_TYPES];
}

export class OffsetPositionConfig {
  keywords: OffsetPositionKeyword[] = [...OFFSET_POSITION_KEYWORDS];
  numberTypes: NumberTypeName[] = [...OFFSET_POSITION_NUMBER_TYPES];
}

export class OffsetRotateConfig {
  keywords: OffsetRotateKeyword[] = [...OFFSET_ROTATE_KEYWORDS];
  numberTypes: NumberTypeName[] = [...OFFSET_ROTATE_NUMBER_TYPES];
}

export class OpacityConfig {
  numberTypes: NumberTypeName[] = [...OPACITY_NUMBER_TYPES];
}

export class OrderConfig {
  numberTypes: NumberTypeName[] = [...ORDER_NUMBER_TYPES];
}

export class OrphansConfig {
  numberTypes: NumberTypeName[] = [...ORPHANS_NUMBER_TYPES];
}

export class OutlineConfig {
}

export class OutlineColorConfig {
  keywords: (OutlineColorKeyword | AllColorValue)[] = [...OUTLINE_COLOR_KEYWORDS, ...ALL_COLORS];
  numberTypes: NumberTypeName[] = [...OUTLINE_COLOR_NUMBER_TYPES];
}

export class OutlineOffsetConfig {
  numberTypes: NumberTypeName[] = [...OUTLINE_OFFSET_NUMBER_TYPES];
}

export class OutlineStyleConfig {
  keywords: OutlineStyleKeyword[] = [...OUTLINE_STYLE_KEYWORDS];
}

export class OutlineWidthConfig {
  keywords: OutlineWidthKeyword[] = [...OUTLINE_WIDTH_KEYWORDS];
  numberTypes: NumberTypeName[] = [...OUTLINE_WIDTH_NUMBER_TYPES];
}

export class OverflowConfig {
  keywords: OverflowKeyword[] = [...OVERFLOW_KEYWORDS];
}

export class OverflowAnchorConfig {
  keywords: OverflowAnchorKeyword[] = [...OVERFLOW_ANCHOR_KEYWORDS];
}

export class OverflowBlockConfig {
  keywords: OverflowBlockKeyword[] = [...OVERFLOW_BLOCK_KEYWORDS];
}

export class OverflowClipBoxConfig {
  keywords: OverflowClipBoxKeyword[] = [...OVERFLOW_CLIP_BOX_KEYWORDS];
}

export class OverflowClipMarginConfig {
  keywords: OverflowClipMarginKeyword[] = [...OVERFLOW_CLIP_MARGIN_KEYWORDS];
  numberTypes: NumberTypeName[] = [...OVERFLOW_CLIP_MARGIN_NUMBER_TYPES];
}

export class OverflowInlineConfig {
  keywords: OverflowInlineKeyword[] = [...OVERFLOW_INLINE_KEYWORDS];
}

export class OverflowWrapConfig {
  keywords: OverflowWrapKeyword[] = [...OVERFLOW_WRAP_KEYWORDS];
}

export class OverflowXConfig {
  keywords: OverflowXKeyword[] = [...OVERFLOW_X_KEYWORDS];
}

export class OverflowYConfig {
  keywords: OverflowYKeyword[] = [...OVERFLOW_Y_KEYWORDS];
}

export class OverlayConfig {
  keywords: OverlayKeyword[] = [...OVERLAY_KEYWORDS];
}

export class OverscrollBehaviorConfig {
  keywords: OverscrollBehaviorKeyword[] = [...OVERSCROLL_BEHAVIOR_KEYWORDS];
}

export class OverscrollBehaviorBlockConfig {
  keywords: OverscrollBehaviorBlockKeyword[] = [...OVERSCROLL_BEHAVIOR_BLOCK_KEYWORDS];
}

export class OverscrollBehaviorInlineConfig {
  keywords: OverscrollBehaviorInlineKeyword[] = [...OVERSCROLL_BEHAVIOR_INLINE_KEYWORDS];
}

export class OverscrollBehaviorXConfig {
  keywords: OverscrollBehaviorXKeyword[] = [...OVERSCROLL_BEHAVIOR_X_KEYWORDS];
}

export class OverscrollBehaviorYConfig {
  keywords: OverscrollBehaviorYKeyword[] = [...OVERSCROLL_BEHAVIOR_Y_KEYWORDS];
}

export class PaddingConfig {
  numberTypes: NumberTypeName[] = [...PADDING_NUMBER_TYPES];
}

export class PaddingBlockConfig {
}

export class PaddingBlockEndConfig {
}

export class PaddingBlockStartConfig {
}

export class PaddingBottomConfig {
  numberTypes: NumberTypeName[] = [...PADDING_BOTTOM_NUMBER_TYPES];
}

export class PaddingInlineConfig {
}

export class PaddingInlineEndConfig {
}

export class PaddingInlineStartConfig {
}

export class PaddingLeftConfig {
  numberTypes: NumberTypeName[] = [...PADDING_LEFT_NUMBER_TYPES];
}

export class PaddingRightConfig {
  numberTypes: NumberTypeName[] = [...PADDING_RIGHT_NUMBER_TYPES];
}

export class PaddingTopConfig {
  numberTypes: NumberTypeName[] = [...PADDING_TOP_NUMBER_TYPES];
}

export class PageConfig {
  keywords: PageKeyword[] = [...PAGE_KEYWORDS];
}

export class PageBreakAfterConfig {
  keywords: PageBreakAfterKeyword[] = [...PAGE_BREAK_AFTER_KEYWORDS];
}

export class PageBreakBeforeConfig {
  keywords: PageBreakBeforeKeyword[] = [...PAGE_BREAK_BEFORE_KEYWORDS];
}

export class PageBreakInsideConfig {
  keywords: PageBreakInsideKeyword[] = [...PAGE_BREAK_INSIDE_KEYWORDS];
}

export class PaintOrderConfig {
  keywords: PaintOrderKeyword[] = [...PAINT_ORDER_KEYWORDS];
}

export class PauseConfig {
}

export class PauseAfterConfig {
  keywords: PauseAfterKeyword[] = [...PAUSE_AFTER_KEYWORDS];
  numberTypes: NumberTypeName[] = [...PAUSE_AFTER_NUMBER_TYPES];
}

export class PauseBeforeConfig {
  keywords: PauseBeforeKeyword[] = [...PAUSE_BEFORE_KEYWORDS];
  numberTypes: NumberTypeName[] = [...PAUSE_BEFORE_NUMBER_TYPES];
}

export class PerspectiveConfig {
  keywords: PerspectiveKeyword[] = [...PERSPECTIVE_KEYWORDS];
  numberTypes: NumberTypeName[] = [...PERSPECTIVE_NUMBER_TYPES];
}

export class PerspectiveOriginConfig {
  keywords: PerspectiveOriginKeyword[] = [...PERSPECTIVE_ORIGIN_KEYWORDS];
  numberTypes: NumberTypeName[] = [...PERSPECTIVE_ORIGIN_NUMBER_TYPES];
}

export class PlaceContentConfig {
}

export class PlaceItemsConfig {
}

export class PlaceSelfConfig {
}

export class PointerEventsConfig {
  keywords: PointerEventsKeyword[] = [...POINTER_EVENTS_KEYWORDS];
}

export class PositionConfig {
  keywords: PositionKeyword[] = [...POSITION_KEYWORDS];
}

export class PositionAnchorConfig {
  keywords: PositionAnchorKeyword[] = [...POSITION_ANCHOR_KEYWORDS];
}

export class PositionAreaConfig {
  keywords: PositionAreaKeyword[] = [...POSITION_AREA_KEYWORDS];
}

export class PositionTryConfig {
}

export class PositionTryFallbacksConfig {
  keywords: PositionTryFallbacksKeyword[] = [...POSITION_TRY_FALLBACKS_KEYWORDS];
}

export class PositionTryOrderConfig {
  keywords: PositionTryOrderKeyword[] = [...POSITION_TRY_ORDER_KEYWORDS];
}

export class PositionVisibilityConfig {
  keywords: PositionVisibilityKeyword[] = [...POSITION_VISIBILITY_KEYWORDS];
}

export class PrintColorAdjustConfig {
  keywords: PrintColorAdjustKeyword[] = [...PRINT_COLOR_ADJUST_KEYWORDS];
}

export class QuotesConfig {
  keywords: QuotesKeyword[] = [...QUOTES_KEYWORDS];
}

export class RConfig {
  numberTypes: NumberTypeName[] = [...R_NUMBER_TYPES];
}

export class ResizeConfig {
  keywords: ResizeKeyword[] = [...RESIZE_KEYWORDS];
}

export class RestConfig {
}

export class RestAfterConfig {
  keywords: RestAfterKeyword[] = [...REST_AFTER_KEYWORDS];
  numberTypes: NumberTypeName[] = [...REST_AFTER_NUMBER_TYPES];
}

export class RestBeforeConfig {
  keywords: RestBeforeKeyword[] = [...REST_BEFORE_KEYWORDS];
  numberTypes: NumberTypeName[] = [...REST_BEFORE_NUMBER_TYPES];
}

export class RightConfig {
  keywords: RightKeyword[] = [...RIGHT_KEYWORDS];
  numberTypes: NumberTypeName[] = [...RIGHT_NUMBER_TYPES];
}

export class RotateConfig {
  keywords: RotateKeyword[] = [...ROTATE_KEYWORDS];
  numberTypes: NumberTypeName[] = [...ROTATE_NUMBER_TYPES];
}

export class RowGapConfig {
  keywords: RowGapKeyword[] = [...ROW_GAP_KEYWORDS];
  numberTypes: NumberTypeName[] = [...ROW_GAP_NUMBER_TYPES];
}

export class RubyAlignConfig {
  keywords: RubyAlignKeyword[] = [...RUBY_ALIGN_KEYWORDS];
}

export class RubyMergeConfig {
  keywords: RubyMergeKeyword[] = [...RUBY_MERGE_KEYWORDS];
}

export class RubyPositionConfig {
  keywords: RubyPositionKeyword[] = [...RUBY_POSITION_KEYWORDS];
}

export class RxConfig {
  numberTypes: NumberTypeName[] = [...RX_NUMBER_TYPES];
}

export class RyConfig {
  numberTypes: NumberTypeName[] = [...RY_NUMBER_TYPES];
}

export class ScaleConfig {
  keywords: ScaleKeyword[] = [...SCALE_KEYWORDS];
  numberTypes: NumberTypeName[] = [...SCALE_NUMBER_TYPES];
}

export class ScrollBehaviorConfig {
  keywords: ScrollBehaviorKeyword[] = [...SCROLL_BEHAVIOR_KEYWORDS];
}

export class ScrollMarginConfig {
  numberTypes: NumberTypeName[] = [...SCROLL_MARGIN_NUMBER_TYPES];
}

export class ScrollMarginBlockConfig {
  numberTypes: NumberTypeName[] = [...SCROLL_MARGIN_BLOCK_NUMBER_TYPES];
}

export class ScrollMarginBlockEndConfig {
  numberTypes: NumberTypeName[] = [...SCROLL_MARGIN_BLOCK_END_NUMBER_TYPES];
}

export class ScrollMarginBlockStartConfig {
  numberTypes: NumberTypeName[] = [...SCROLL_MARGIN_BLOCK_START_NUMBER_TYPES];
}

export class ScrollMarginBottomConfig {
  numberTypes: NumberTypeName[] = [...SCROLL_MARGIN_BOTTOM_NUMBER_TYPES];
}

export class ScrollMarginInlineConfig {
  numberTypes: NumberTypeName[] = [...SCROLL_MARGIN_INLINE_NUMBER_TYPES];
}

export class ScrollMarginInlineEndConfig {
  numberTypes: NumberTypeName[] = [...SCROLL_MARGIN_INLINE_END_NUMBER_TYPES];
}

export class ScrollMarginInlineStartConfig {
  numberTypes: NumberTypeName[] = [...SCROLL_MARGIN_INLINE_START_NUMBER_TYPES];
}

export class ScrollMarginLeftConfig {
  numberTypes: NumberTypeName[] = [...SCROLL_MARGIN_LEFT_NUMBER_TYPES];
}

export class ScrollMarginRightConfig {
  numberTypes: NumberTypeName[] = [...SCROLL_MARGIN_RIGHT_NUMBER_TYPES];
}

export class ScrollMarginTopConfig {
  numberTypes: NumberTypeName[] = [...SCROLL_MARGIN_TOP_NUMBER_TYPES];
}

export class ScrollPaddingConfig {
  keywords: ScrollPaddingKeyword[] = [...SCROLL_PADDING_KEYWORDS];
  numberTypes: NumberTypeName[] = [...SCROLL_PADDING_NUMBER_TYPES];
}

export class ScrollPaddingBlockConfig {
  keywords: ScrollPaddingBlockKeyword[] = [...SCROLL_PADDING_BLOCK_KEYWORDS];
  numberTypes: NumberTypeName[] = [...SCROLL_PADDING_BLOCK_NUMBER_TYPES];
}

export class ScrollPaddingBlockEndConfig {
  keywords: ScrollPaddingBlockEndKeyword[] = [...SCROLL_PADDING_BLOCK_END_KEYWORDS];
  numberTypes: NumberTypeName[] = [...SCROLL_PADDING_BLOCK_END_NUMBER_TYPES];
}

export class ScrollPaddingBlockStartConfig {
  keywords: ScrollPaddingBlockStartKeyword[] = [...SCROLL_PADDING_BLOCK_START_KEYWORDS];
  numberTypes: NumberTypeName[] = [...SCROLL_PADDING_BLOCK_START_NUMBER_TYPES];
}

export class ScrollPaddingBottomConfig {
  keywords: ScrollPaddingBottomKeyword[] = [...SCROLL_PADDING_BOTTOM_KEYWORDS];
  numberTypes: NumberTypeName[] = [...SCROLL_PADDING_BOTTOM_NUMBER_TYPES];
}

export class ScrollPaddingInlineConfig {
  keywords: ScrollPaddingInlineKeyword[] = [...SCROLL_PADDING_INLINE_KEYWORDS];
  numberTypes: NumberTypeName[] = [...SCROLL_PADDING_INLINE_NUMBER_TYPES];
}

export class ScrollPaddingInlineEndConfig {
  keywords: ScrollPaddingInlineEndKeyword[] = [...SCROLL_PADDING_INLINE_END_KEYWORDS];
  numberTypes: NumberTypeName[] = [...SCROLL_PADDING_INLINE_END_NUMBER_TYPES];
}

export class ScrollPaddingInlineStartConfig {
  keywords: ScrollPaddingInlineStartKeyword[] = [...SCROLL_PADDING_INLINE_START_KEYWORDS];
  numberTypes: NumberTypeName[] = [...SCROLL_PADDING_INLINE_START_NUMBER_TYPES];
}

export class ScrollPaddingLeftConfig {
  keywords: ScrollPaddingLeftKeyword[] = [...SCROLL_PADDING_LEFT_KEYWORDS];
  numberTypes: NumberTypeName[] = [...SCROLL_PADDING_LEFT_NUMBER_TYPES];
}

export class ScrollPaddingRightConfig {
  keywords: ScrollPaddingRightKeyword[] = [...SCROLL_PADDING_RIGHT_KEYWORDS];
  numberTypes: NumberTypeName[] = [...SCROLL_PADDING_RIGHT_NUMBER_TYPES];
}

export class ScrollPaddingTopConfig {
  keywords: ScrollPaddingTopKeyword[] = [...SCROLL_PADDING_TOP_KEYWORDS];
  numberTypes: NumberTypeName[] = [...SCROLL_PADDING_TOP_NUMBER_TYPES];
}

export class ScrollSnapAlignConfig {
  keywords: ScrollSnapAlignKeyword[] = [...SCROLL_SNAP_ALIGN_KEYWORDS];
}

export class ScrollSnapCoordinateConfig {
  keywords: ScrollSnapCoordinateKeyword[] = [...SCROLL_SNAP_COORDINATE_KEYWORDS];
  numberTypes: NumberTypeName[] = [...SCROLL_SNAP_COORDINATE_NUMBER_TYPES];
}

export class ScrollSnapDestinationConfig {
  keywords: ScrollSnapDestinationKeyword[] = [...SCROLL_SNAP_DESTINATION_KEYWORDS];
  numberTypes: NumberTypeName[] = [...SCROLL_SNAP_DESTINATION_NUMBER_TYPES];
}

export class ScrollSnapPointsXConfig {
  keywords: ScrollSnapPointsXKeyword[] = [...SCROLL_SNAP_POINTS_X_KEYWORDS];
  numberTypes: NumberTypeName[] = [...SCROLL_SNAP_POINTS_X_NUMBER_TYPES];
}

export class ScrollSnapPointsYConfig {
  keywords: ScrollSnapPointsYKeyword[] = [...SCROLL_SNAP_POINTS_Y_KEYWORDS];
  numberTypes: NumberTypeName[] = [...SCROLL_SNAP_POINTS_Y_NUMBER_TYPES];
}

export class ScrollSnapStopConfig {
  keywords: ScrollSnapStopKeyword[] = [...SCROLL_SNAP_STOP_KEYWORDS];
}

export class ScrollSnapTypeConfig {
  keywords: ScrollSnapTypeKeyword[] = [...SCROLL_SNAP_TYPE_KEYWORDS];
}

export class ScrollSnapTypeXConfig {
  keywords: ScrollSnapTypeXKeyword[] = [...SCROLL_SNAP_TYPE_X_KEYWORDS];
}

export class ScrollSnapTypeYConfig {
  keywords: ScrollSnapTypeYKeyword[] = [...SCROLL_SNAP_TYPE_Y_KEYWORDS];
}

export class ScrollTimelineConfig {
}

export class ScrollTimelineAxisConfig {
  keywords: ScrollTimelineAxisKeyword[] = [...SCROLL_TIMELINE_AXIS_KEYWORDS];
}

export class ScrollTimelineNameConfig {
  keywords: ScrollTimelineNameKeyword[] = [...SCROLL_TIMELINE_NAME_KEYWORDS];
}

export class ScrollbarColorConfig {
  keywords: (ScrollbarColorKeyword | AllColorValue)[] = [...SCROLLBAR_COLOR_KEYWORDS, ...ALL_COLORS];
  numberTypes: NumberTypeName[] = [...SCROLLBAR_COLOR_NUMBER_TYPES];
}

export class ScrollbarGutterConfig {
  keywords: ScrollbarGutterKeyword[] = [...SCROLLBAR_GUTTER_KEYWORDS];
}

export class ScrollbarWidthConfig {
  keywords: ScrollbarWidthKeyword[] = [...SCROLLBAR_WIDTH_KEYWORDS];
}

export class ShapeImageThresholdConfig {
  numberTypes: NumberTypeName[] = [...SHAPE_IMAGE_THRESHOLD_NUMBER_TYPES];
}

export class ShapeMarginConfig {
  numberTypes: NumberTypeName[] = [...SHAPE_MARGIN_NUMBER_TYPES];
}

export class ShapeOutsideConfig {
  keywords: (ShapeOutsideKeyword | AllColorValue)[] = [...SHAPE_OUTSIDE_KEYWORDS, ...ALL_COLORS];
  numberTypes: NumberTypeName[] = [...SHAPE_OUTSIDE_NUMBER_TYPES];
}

export class ShapeRenderingConfig {
  keywords: ShapeRenderingKeyword[] = [...SHAPE_RENDERING_KEYWORDS];
}

export class SpeakConfig {
  keywords: SpeakKeyword[] = [...SPEAK_KEYWORDS];
}

export class SpeakAsConfig {
  keywords: SpeakAsKeyword[] = [...SPEAK_AS_KEYWORDS];
}

export class SrcConfig {
}

export class StrokeConfig {
  keywords: (StrokeKeyword | AllColorValue)[] = [...STROKE_KEYWORDS, ...ALL_COLORS];
  numberTypes: NumberTypeName[] = [...STROKE_NUMBER_TYPES];
}

export class StrokeDasharrayConfig {
  keywords: StrokeDasharrayKeyword[] = [...STROKE_DASHARRAY_KEYWORDS];
  numberTypes: NumberTypeName[] = [...STROKE_DASHARRAY_NUMBER_TYPES];
}

export class StrokeDashoffsetConfig {
  numberTypes: NumberTypeName[] = [...STROKE_DASHOFFSET_NUMBER_TYPES];
}

export class StrokeLinecapConfig {
  keywords: StrokeLinecapKeyword[] = [...STROKE_LINECAP_KEYWORDS];
}

export class StrokeLinejoinConfig {
  keywords: StrokeLinejoinKeyword[] = [...STROKE_LINEJOIN_KEYWORDS];
}

export class StrokeMiterlimitConfig {
  numberTypes: NumberTypeName[] = [...STROKE_MITERLIMIT_NUMBER_TYPES];
}

export class StrokeOpacityConfig {
}

export class StrokeWidthConfig {
  numberTypes: NumberTypeName[] = [...STROKE_WIDTH_NUMBER_TYPES];
}

export class TabSizeConfig {
  numberTypes: NumberTypeName[] = [...TAB_SIZE_NUMBER_TYPES];
}

export class TableLayoutConfig {
  keywords: TableLayoutKeyword[] = [...TABLE_LAYOUT_KEYWORDS];
}

export class TextAlignConfig {
  keywords: TextAlignKeyword[] = [...TEXT_ALIGN_KEYWORDS];
}

export class TextAlignLastConfig {
  keywords: TextAlignLastKeyword[] = [...TEXT_ALIGN_LAST_KEYWORDS];
}

export class TextAnchorConfig {
  keywords: TextAnchorKeyword[] = [...TEXT_ANCHOR_KEYWORDS];
}

export class TextCombineUprightConfig {
  keywords: TextCombineUprightKeyword[] = [...TEXT_COMBINE_UPRIGHT_KEYWORDS];
  numberTypes: NumberTypeName[] = [...TEXT_COMBINE_UPRIGHT_NUMBER_TYPES];
}

export class TextDecorationConfig {
}

export class TextDecorationColorConfig {
  keywords: (TextDecorationColorKeyword | AllColorValue)[] = [...TEXT_DECORATION_COLOR_KEYWORDS, ...ALL_COLORS];
  numberTypes: NumberTypeName[] = [...TEXT_DECORATION_COLOR_NUMBER_TYPES];
}

export class TextDecorationLineConfig {
  keywords: TextDecorationLineKeyword[] = [...TEXT_DECORATION_LINE_KEYWORDS];
}

export class TextDecorationSkipConfig {
  keywords: TextDecorationSkipKeyword[] = [...TEXT_DECORATION_SKIP_KEYWORDS];
}

export class TextDecorationSkipInkConfig {
  keywords: TextDecorationSkipInkKeyword[] = [...TEXT_DECORATION_SKIP_INK_KEYWORDS];
}

export class TextDecorationStyleConfig {
  keywords: TextDecorationStyleKeyword[] = [...TEXT_DECORATION_STYLE_KEYWORDS];
}

export class TextDecorationThicknessConfig {
  keywords: TextDecorationThicknessKeyword[] = [...TEXT_DECORATION_THICKNESS_KEYWORDS];
  numberTypes: NumberTypeName[] = [...TEXT_DECORATION_THICKNESS_NUMBER_TYPES];
}

export class TextEmphasisConfig {
}

export class TextEmphasisColorConfig {
  keywords: (TextEmphasisColorKeyword | AllColorValue)[] = [...TEXT_EMPHASIS_COLOR_KEYWORDS, ...ALL_COLORS];
  numberTypes: NumberTypeName[] = [...TEXT_EMPHASIS_COLOR_NUMBER_TYPES];
}

export class TextEmphasisPositionConfig {
  keywords: TextEmphasisPositionKeyword[] = [...TEXT_EMPHASIS_POSITION_KEYWORDS];
}

export class TextEmphasisStyleConfig {
  keywords: TextEmphasisStyleKeyword[] = [...TEXT_EMPHASIS_STYLE_KEYWORDS];
}

export class TextIndentConfig {
  keywords: TextIndentKeyword[] = [...TEXT_INDENT_KEYWORDS];
  numberTypes: NumberTypeName[] = [...TEXT_INDENT_NUMBER_TYPES];
}

export class TextJustifyConfig {
  keywords: TextJustifyKeyword[] = [...TEXT_JUSTIFY_KEYWORDS];
}

export class TextOrientationConfig {
  keywords: TextOrientationKeyword[] = [...TEXT_ORIENTATION_KEYWORDS];
}

export class TextOverflowConfig {
  keywords: TextOverflowKeyword[] = [...TEXT_OVERFLOW_KEYWORDS];
}

export class TextRenderingConfig {
  keywords: TextRenderingKeyword[] = [...TEXT_RENDERING_KEYWORDS];
}

export class TextShadowConfig {
  keywords: (TextShadowKeyword | AllColorValue)[] = [...TEXT_SHADOW_KEYWORDS, ...ALL_COLORS];
  numberTypes: NumberTypeName[] = [...TEXT_SHADOW_NUMBER_TYPES];
}

export class TextSizeAdjustConfig {
  keywords: TextSizeAdjustKeyword[] = [...TEXT_SIZE_ADJUST_KEYWORDS];
  numberTypes: NumberTypeName[] = [...TEXT_SIZE_ADJUST_NUMBER_TYPES];
}

export class TextSpacingTrimConfig {
  keywords: TextSpacingTrimKeyword[] = [...TEXT_SPACING_TRIM_KEYWORDS];
}

export class TextTransformConfig {
  keywords: TextTransformKeyword[] = [...TEXT_TRANSFORM_KEYWORDS];
}

export class TextUnderlineOffsetConfig {
  keywords: TextUnderlineOffsetKeyword[] = [...TEXT_UNDERLINE_OFFSET_KEYWORDS];
  numberTypes: NumberTypeName[] = [...TEXT_UNDERLINE_OFFSET_NUMBER_TYPES];
}

export class TextUnderlinePositionConfig {
  keywords: TextUnderlinePositionKeyword[] = [...TEXT_UNDERLINE_POSITION_KEYWORDS];
}

export class TextWrapConfig {
}

export class TextWrapModeConfig {
  keywords: TextWrapModeKeyword[] = [...TEXT_WRAP_MODE_KEYWORDS];
}

export class TextWrapStyleConfig {
  keywords: TextWrapStyleKeyword[] = [...TEXT_WRAP_STYLE_KEYWORDS];
}

export class TimelineScopeConfig {
  keywords: TimelineScopeKeyword[] = [...TIMELINE_SCOPE_KEYWORDS];
}

export class TopConfig {
  keywords: TopKeyword[] = [...TOP_KEYWORDS];
  numberTypes: NumberTypeName[] = [...TOP_NUMBER_TYPES];
}

export class TouchActionConfig {
  keywords: TouchActionKeyword[] = [...TOUCH_ACTION_KEYWORDS];
}

export class TransformConfig {
  keywords: TransformKeyword[] = [...TRANSFORM_KEYWORDS];
  numberTypes: NumberTypeName[] = [...TRANSFORM_NUMBER_TYPES];
}

export class TransformBoxConfig {
  keywords: TransformBoxKeyword[] = [...TRANSFORM_BOX_KEYWORDS];
}

export class TransformOriginConfig {
  keywords: TransformOriginKeyword[] = [...TRANSFORM_ORIGIN_KEYWORDS];
  numberTypes: NumberTypeName[] = [...TRANSFORM_ORIGIN_NUMBER_TYPES];
}

export class TransformStyleConfig {
  keywords: TransformStyleKeyword[] = [...TRANSFORM_STYLE_KEYWORDS];
}

export class TransitionConfig {
  keywords: TransitionKeyword[] = [...TRANSITION_KEYWORDS];
  numberTypes: NumberTypeName[] = [...TRANSITION_NUMBER_TYPES];
}

export class TransitionBehaviorConfig {
  keywords: TransitionBehaviorKeyword[] = [...TRANSITION_BEHAVIOR_KEYWORDS];
}

export class TransitionDelayConfig {
  numberTypes: NumberTypeName[] = [...TRANSITION_DELAY_NUMBER_TYPES];
}

export class TransitionDurationConfig {
  numberTypes: NumberTypeName[] = [...TRANSITION_DURATION_NUMBER_TYPES];
}

export class TransitionPropertyConfig {
  keywords: TransitionPropertyKeyword[] = [...TRANSITION_PROPERTY_KEYWORDS];
}

export class TransitionTimingFunctionConfig {
  keywords: TransitionTimingFunctionKeyword[] = [...TRANSITION_TIMING_FUNCTION_KEYWORDS];
  numberTypes: NumberTypeName[] = [...TRANSITION_TIMING_FUNCTION_NUMBER_TYPES];
}

export class TranslateConfig {
  keywords: TranslateKeyword[] = [...TRANSLATE_KEYWORDS];
  numberTypes: NumberTypeName[] = [...TRANSLATE_NUMBER_TYPES];
}

export class UnicodeBidiConfig {
  keywords: UnicodeBidiKeyword[] = [...UNICODE_BIDI_KEYWORDS];
}

export class UnicodeRangeConfig {
}

export class UserSelectConfig {
  keywords: UserSelectKeyword[] = [...USER_SELECT_KEYWORDS];
}

export class VectorEffectConfig {
  keywords: VectorEffectKeyword[] = [...VECTOR_EFFECT_KEYWORDS];
}

export class VerticalAlignConfig {
  keywords: VerticalAlignKeyword[] = [...VERTICAL_ALIGN_KEYWORDS];
  numberTypes: NumberTypeName[] = [...VERTICAL_ALIGN_NUMBER_TYPES];
}

export class ViewTimelineConfig {
}

export class ViewTimelineAxisConfig {
  keywords: ViewTimelineAxisKeyword[] = [...VIEW_TIMELINE_AXIS_KEYWORDS];
}

export class ViewTimelineInsetConfig {
  keywords: ViewTimelineInsetKeyword[] = [...VIEW_TIMELINE_INSET_KEYWORDS];
  numberTypes: NumberTypeName[] = [...VIEW_TIMELINE_INSET_NUMBER_TYPES];
}

export class ViewTimelineNameConfig {
  keywords: ViewTimelineNameKeyword[] = [...VIEW_TIMELINE_NAME_KEYWORDS];
}

export class ViewTransitionNameConfig {
  keywords: ViewTransitionNameKeyword[] = [...VIEW_TRANSITION_NAME_KEYWORDS];
}

export class VisibilityConfig {
  keywords: VisibilityKeyword[] = [...VISIBILITY_KEYWORDS];
}

export class VoiceBalanceConfig {
  keywords: VoiceBalanceKeyword[] = [...VOICE_BALANCE_KEYWORDS];
  numberTypes: NumberTypeName[] = [...VOICE_BALANCE_NUMBER_TYPES];
}

export class VoiceDurationConfig {
  keywords: VoiceDurationKeyword[] = [...VOICE_DURATION_KEYWORDS];
  numberTypes: NumberTypeName[] = [...VOICE_DURATION_NUMBER_TYPES];
}

export class VoiceFamilyConfig {
  keywords: VoiceFamilyKeyword[] = [...VOICE_FAMILY_KEYWORDS];
  numberTypes: NumberTypeName[] = [...VOICE_FAMILY_NUMBER_TYPES];
}

export class VoicePitchConfig {
  keywords: VoicePitchKeyword[] = [...VOICE_PITCH_KEYWORDS];
  numberTypes: NumberTypeName[] = [...VOICE_PITCH_NUMBER_TYPES];
}

export class VoiceRangeConfig {
  keywords: VoiceRangeKeyword[] = [...VOICE_RANGE_KEYWORDS];
  numberTypes: NumberTypeName[] = [...VOICE_RANGE_NUMBER_TYPES];
}

export class VoiceRateConfig {
  keywords: VoiceRateKeyword[] = [...VOICE_RATE_KEYWORDS];
  numberTypes: NumberTypeName[] = [...VOICE_RATE_NUMBER_TYPES];
}

export class VoiceStressConfig {
  keywords: VoiceStressKeyword[] = [...VOICE_STRESS_KEYWORDS];
}

export class VoiceVolumeConfig {
  keywords: VoiceVolumeKeyword[] = [...VOICE_VOLUME_KEYWORDS];
}

export class WhiteSpaceConfig {
  keywords: WhiteSpaceKeyword[] = [...WHITE_SPACE_KEYWORDS];
}

export class WhiteSpaceCollapseConfig {
  keywords: WhiteSpaceCollapseKeyword[] = [...WHITE_SPACE_COLLAPSE_KEYWORDS];
}

export class WhiteSpaceTrimConfig {
  keywords: WhiteSpaceTrimKeyword[] = [...WHITE_SPACE_TRIM_KEYWORDS];
}

export class WidowsConfig {
  numberTypes: NumberTypeName[] = [...WIDOWS_NUMBER_TYPES];
}

export class WidthConfig {
  keywords: WidthKeyword[] = [...WIDTH_KEYWORDS];
  numberTypes: NumberTypeName[] = [...WIDTH_NUMBER_TYPES];
}

export class WillChangeConfig {
  keywords: WillChangeKeyword[] = [...WILL_CHANGE_KEYWORDS];
}

export class WordBreakConfig {
  keywords: WordBreakKeyword[] = [...WORD_BREAK_KEYWORDS];
}

export class WordSpacingConfig {
  keywords: WordSpacingKeyword[] = [...WORD_SPACING_KEYWORDS];
  numberTypes: NumberTypeName[] = [...WORD_SPACING_NUMBER_TYPES];
}

export class WordWrapConfig {
  keywords: WordWrapKeyword[] = [...WORD_WRAP_KEYWORDS];
}

export class WritingModeConfig {
  keywords: WritingModeKeyword[] = [...WRITING_MODE_KEYWORDS];
}

export class XConfig {
  numberTypes: NumberTypeName[] = [...X_NUMBER_TYPES];
}

export class YConfig {
  numberTypes: NumberTypeName[] = [...Y_NUMBER_TYPES];
}

export class ZIndexConfig {
  keywords: ZIndexKeyword[] = [...Z_INDEX_KEYWORDS];
  numberTypes: NumberTypeName[] = [...Z_INDEX_NUMBER_TYPES];
}

export class ZoomConfig {
  keywords: ZoomKeyword[] = [...ZOOM_KEYWORDS];
  numberTypes: NumberTypeName[] = [...ZOOM_NUMBER_TYPES];
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

  constructor(options?: Partial<CssPropertyConfigMap>) {
    if (options) {
      Object.assign(this, options);
    }
  }
}
