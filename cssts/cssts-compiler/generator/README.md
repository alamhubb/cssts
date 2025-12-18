# 数据生成脚本

此目录包含从 csstree 生成 CSS 数据的脚本。

## 脚本列表

### generate-property-data.ts

从 csstree 提取 CSS 属性的 keywords 和 numberTypes 数据。

**功能**：
- 遍历 csstree 中的所有 CSS 属性
- 提取每个属性的 keywords（关键字）
- 提取每个属性的 numberTypes（数值类型）
- 只有当属性有 keywords 时才包含 keywords 字段
- 只有当属性有 numberTypes 时才包含 numberTypes 字段

**输出**：`src/data/property.ts`

**运行方式**：
```bash
npx tsx generator/generate-property-data.ts
```

**注意**：脚本已移动到 `generator/generate-property-data.ts`

**输出示例**：
```typescript
export const PROPERTY_DATA: PropertyInfo[] = [
  {
    name: 'width',
    numberTypes: ['length', 'percentage'],
  },
  {
    name: 'display',
    keywords: ['block', 'inline', 'flex', 'grid', ...],
  },
  {
    name: 'animation',
    keywords: ['alternate', 'ease', ...],
    numberTypes: ['integer', 'number'],
  },
];
```

## 生成统计

最后一次生成的统计信息：
- 总属性数：521
- 有 keywords 的属性：384
- 有 numberTypes 的属性：236
- 同时有两者的属性：174

## 联合类型处理

### 设计决策：展开联合类型

脚本会将 CSS 中的联合类型（如 `length-percentage`）展开成单个类型的数组。

**示例**：
```typescript
// csstree 中的原始定义
width: <length-percentage>

// 生成的数据
{
  name: 'width',
  numberTypes: ['length', 'percentage']  // 联合类型被展开
}
```

### 为什么这样做？

1. **原子类生成的实际行为**：在 `atom-generator.ts` 中，生成器通过 `NUMBER_TYPE_UNITS` 映射表查找每个 numberType 对应的单位列表。联合类型（如 `'length-percentage'`）在映射表中不存在，无法被查找。

2. **等价性**：展开后的 `['length', 'percentage']` 和原始的 `'length-percentage'` 在生成原子类时产生**完全相同的结果**：
   - 都会生成 length 类型的所有单位（px, em, rem 等）
   - 都会生成 percentage 类型的单位（%）

3. **简化处理**：展开联合类型使得生成器逻辑更简单，不需要特殊处理联合类型的情况。

### 映射表参考

```typescript
const UNION_TYPE_MAP: Record<string, string[]> = {
  'length-percentage': ['length', 'percentage'],
  'angle-percentage': ['angle', 'percentage'],
  'time-percentage': ['time', 'percentage'],
  'frequency-percentage': ['frequency', 'percentage'],
};
```

## 使用场景

这些数据用于：
1. 生成属性配置类的默认值
2. 验证属性是否支持某种类型的值
3. 为生成器提供属性元数据
