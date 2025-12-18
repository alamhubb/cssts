# 配置系统总结

## 📋 配置系统概览

CSSTS 配置系统是一个**分层、灵活、对称**的配置框架，支持在多个维度上精确控制原子类的生成。

### 核心特性

✅ **分层配置** - 从属性到数值，逐层细化控制  
✅ **白名单/黑名单** - 灵活的包含/排除机制  
✅ **跨级别配置** - 支持跳过中间层级  
✅ **混合数组格式** - 字符串和对象混合  
✅ **对称设计** - Include 和 Exclude 配置对称  
✅ **系统默认** - 智能排除低频项  

---

## 🏗️ 配置架构

```
属性 (Properties)
  ↓
数值类型 (NumberTypes)
  ↓
单位分类 (UnitCategories)
  ↓
单位 (Units)
  ↓
数值 (Values)
```

### 配置层级

| 层级 | Include 类型 | Exclude 类型 | 说明 |
|------|------------|------------|------|
| **属性** | `CssPropertyCamelName[]` | `CssPropertyCamelName[]` | 选择生成哪些 CSS 属性 |
| **数值类型** | `NumberTypeConfigItem[]` | `NumberTypeExcludeItem[]` | 支持哪些数值类型（length、angle 等） |
| **单位分类** | `UnitCategoryConfigItem[]` | `UnitCategoryExcludeItem[]` | 支持哪些单位分类（pixel、percentage 等） |
| **单位** | `UnitConfigItem[]` | `UnitExcludeItem[]` | 支持哪些单位（px、em、rem 等） |
| **数值** | 通过 `step`、`presets` 配置 | N/A | 生成的具体数值 |

---

## 🔄 Include vs Exclude 对比

### Include 配置（支持嵌套 + 配置）

```typescript
// 字符串：启用整个项，使用默认配置
'length'

// 对象：启用并自定义配置
{ length: { pixel: { px: { step: 4 } } } }

// 跨级别：跳过中间层级
{ length: { px: { step: 4 } } }
```

**特点**：
- 支持嵌套对象
- 支持配置（step、max、presets 等）
- 支持跨级别配置
- 最底层是配置对象

### Exclude 配置（只排除名字）

```typescript
// 字符串：排除整个项
'angle'

// 对象：排除特定子项
{ time: ['ms', 's'] }

// 跨级别：排除特定分类下的单位
{ length: { pixel: ['px'] } }
```

**特点**：
- 支持嵌套对象
- 不支持配置（只有名字）
- 支持跨级别配置
- 最底层是字符串数组

---

## 📊 配置优先级

### 白名单 vs 黑名单

```
if (includeList && includeList.length > 0) {
  // 使用白名单（只包含指定的项）
  return includeList.includes(value)
} else {
  // 使用黑名单（排除指定的项）
  return !excludeList.includes(value)
}
```

### 系统级别默认

系统默认排除低频项，仅在 `exclude*` 为空时生效：

```typescript
SYSTEM_DEFAULT_EXCLUDED_UNIT_CATEGORIES = [
  'resolution',  // dpi, dpcm, dppx, x - 98% 用不到
  'physical',    // pt, pc, in, cm, mm, Q - 95% 用不到
  'flex',        // fr - Grid 用户较少
]
```

---

## 🎯 配置示例

### 示例 1：最小化配置

```typescript
const config = new CsstsConfig({
  includeProperties: ['width', 'height', 'margin', 'padding'],
  includeUnitCategories: ['pixel', 'percentage'],
  includeUnits: ['px', '%']
})
```

### 示例 2：排除低频项

```typescript
const config = new CsstsConfig({
  excludeNumberTypes: ['angle', 'frequency'],
  excludeUnitCategories: ['physical', 'flex']
})
```

### 示例 3：自定义数值范围

```typescript
const config = new CsstsConfig({
  includeUnits: [
    { px: { step: 4, max: 256 } },
    { em: { presets: [0.5, 1, 1.5, 2] } }
  ]
})
```

### 示例 4：跨级别配置

```typescript
const config = new CsstsConfig({
  includeNumberTypes: [
    { length: { px: { step: 4 } } },      // 完整三层
    { time: ['ms', 's'] }                  // 跨越 unitCategory 层级
  ]
})
```

---

## 📈 配置流程

```
1. 创建配置对象
   ↓
2. 指定 include/exclude 项
   ↓
3. 配置数值范围（可选）
   ↓
4. 运行生成器
   ↓
5. 验证生成结果
```

### 验证配置

```bash
# 生成 .d.ts 文件并查看统计
npx tsx src/generator-dts/index.ts

# 输出示例：
# 📊 Generation Statistics:
#    Total properties: 521
#    Properties with config: 262
#    Keyword atoms: 6886
#    Number atoms: 34953
```

---

## 🔑 关键概念

### 分层配置
从上到下逐层细化，每层都可以独立配置。

### 白名单/黑名单
- **白名单** - 只生成指定的项（优先级高）
- **黑名单** - 排除指定的项（白名单为空时生效）

### 跨级别配置
在配置中跳过中间层级，直接指定下一层的项。

### 混合数组格式
在同一个数组中混合字符串（使用默认）和对象（自定义配置）。

### 对称设计
Include 和 Exclude 配置在结构上对称，但 Include 支持配置，Exclude 不支持。

---

## 📚 支持的项目

### 数值类型 (NumberTypes)
- `length` - 长度
- `angle` - 角度
- `time` - 时间
- `frequency` - 频率
- `percentage` - 百分比
- `number` / `integer` - 数值
- `resolution` - 分辨率
- `flex` - 弹性

### 单位分类 (UnitCategories)
- `pixel` - 像素（px）
- `percentage` - 百分比和视口单位
- `fontRelative` - 相对字体单位
- `physical` - 物理长度单位
- `angle` - 角度单位
- `time` - 时间单位
- `frequency` - 频率单位
- `resolution` - 分辨率单位
- `flex` - 弹性单位
- `unitless` - 无单位数值

### 单位 (Units)
- 长度：px、em、rem、ch、ex、cap、ic、lh、rlh、%、vw、vh、vmin、vmax、svw、svh、lvw、lvh、dvw、dvh、vi、vb、cm、mm、in、pt、pc、Q
- 角度：deg、grad、rad、turn
- 时间：s、ms
- 频率：Hz、kHz
- 分辨率：dpi、dpcm、dppx、x
- 弹性：fr
- 无单位：unitless

---

## 💡 最佳实践

1. **从系统默认开始** - 系统已经排除了 98% 用不到的项
2. **优先使用白名单** - 明确指定需要的项比排除不需要的更清晰
3. **分层配置** - 在不同层级精确控制，避免过度配置
4. **使用预设值** - 对于常用的数值范围，使用预设值而不是步长
5. **测试生成结果** - 运行生成器验证配置是否符合预期

---

## 🔗 文档导航

- **[快速参考](./QUICK_START.md)** - 常见配置场景和代码示例
- **[完整指南](./CONFIG.md)** - 详细的配置说明
- **[文档索引](./DOCS.md)** - 所有文档的导航
- **[主 README](./README.md)** - 编译器概览

---

## 📝 配置类型

### CsstsConfig

```typescript
class CsstsConfig {
  // 属性配置
  includeProperties?: CssPropertyCamelName[]
  excludeProperties: CssPropertyCamelName[]

  // 数值类型配置
  includeNumberTypes?: NumberTypeConfigItem<NumberTypeName>[]
  excludeNumberTypes: NumberTypeExcludeItem<NumberTypeName>[]

  // 单位分类配置
  includeUnitCategories?: UnitCategoryConfigItem<UnitCategoryName>[]
  excludeUnitCategories: UnitCategoryExcludeItem<UnitCategoryName>[]

  // 单位配置
  includeUnits?: UnitConfigItem<UnitType>[]
  excludeUnits: UnitExcludeItem<UnitType>[]

  // 关键字/颜色配置
  includeKeywords?: KeywordValue[]
  excludeKeywords: KeywordValue[]
  includeColors?: AllColorValue[]
  excludeColors: AllColorValue[]

  // 伪类/伪元素配置
  includePseudoClasses?: PseudoClassName[]
  excludePseudoClasses: PseudoClassName[]
  includePseudoElements?: PseudoElementName[]
  excludePseudoElements: PseudoElementName[]

  // 其他配置
  customProperties: Record<string, CustomPropertyValue>
  progressiveRanges: ProgressiveRange[]
  properties: CssPropertyConfigMap
  pseudoClassStyles: PseudoClassStylesConfig
  pseudoElementStyles: PseudoElementStylesConfig
}
```

---

## 🎓 学习路径

### 初级
1. 阅读本文档了解基本概念
2. 查看 [快速参考](./QUICK_START.md) 中的基础配置
3. 运行生成器验证配置

### 中级
1. 学习白名单/黑名单的优先级
2. 尝试自定义单位的数值范围
3. 使用预设值精确控制生成的数值

### 高级
1. 掌握跨级别配置
2. 理解混合数组格式
3. 优化配置以获得最佳性能

---

## 📞 获取帮助

- 查看 [快速参考](./QUICK_START.md) 中的常见场景
- 阅读 [完整指南](./CONFIG.md) 中的详细说明
- 查看源代码中的注释和类型定义

