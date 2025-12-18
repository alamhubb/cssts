# CSS 生成脚本

此目录包含从 csstree 生成 CSS 数据和配置的脚本。这是唯一依赖 csstree 的地方，所有其他代码都从生成的数据中获取信息。

## 脚本概览

### 1. generator-data.ts

**阶段1：数据生成**

从 csstree 提取 CSS 属性的 keywords 和 numberTypes 数据。

**功能**：
- 遍历 csstree 中的所有 CSS 属性
- 提取每个属性的 keywords（关键字）和 numberTypes（数值类型）
- 生成原始数据文件

**输出**：
- `src/data/property.ts` - CSS 属性数据（不打包）

**运行方式**：
```bash
npx tsx generator/generator-data.ts
```

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
];
```

### 2. generator-config-type.ts

**阶段2：配置类型提示生成**

从 `src/data/property.ts` 生成用户配置时的类型提示文件。

**功能**：
- 读取属性数据
- 生成配置类型定义
- 提供 IDE 智能提示

**输出**：
- `src/config/colors.ts` - 颜色配置类型
- `src/config/keywords.ts` - 关键词配置类型
- `src/config/units.ts` - 单位配置类型
- `src/config/pseudo.ts` - 伪类/伪元素配置类型
- `src/config/property-config.ts` - 属性配置类型
- `src/config/index.ts` - 配置模块导出

**运行方式**：
```bash
npx tsx generator/generator-config-type.ts
```

**前置条件**：
必须先运行 `generator-data.ts` 生成 `src/data/property.ts`

## 执行顺序

```
1. npx tsx generator/generator-data.ts
   ↓
   生成 src/data/property.ts
   ↓
2. npx tsx generator/generator-config-type.ts
   ↓
   生成 src/config/ 下的所有类型定义
```

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

## 架构设计

### 依赖关系

```
generator-data.ts (依赖 csstree)
    ↓
src/data/property.ts
    ↓
generator-config-type.ts
    ↓
src/config/ (类型定义)
    ↓
src/ 中的其他代码（不依赖 csstree）
```

### 关键原则

1. **单一依赖点**：只有 `generator/` 目录中的脚本依赖 csstree
2. **数据驱动**：`src/` 中的所有代码从 `src/data/` 和 `src/custom/` 获取数据
3. **自动生成**：配置文件由脚本自动生成，不应手动修改
4. **分离关注**：
   - `generator-data.ts` - 只负责数据提取
   - `generator-config-type.ts` - 只负责类型生成

## 生成统计

最后一次生成的统计信息：
- 总属性数：521
- 有 keywords 的属性：384
- 有 numberTypes 的属性：236
- 同时有两者的属性：174

## 使用场景

这些生成的数据和类型用于：
1. 提供用户配置时的 IDE 智能提示
2. 验证属性是否支持某种类型的值
3. 为原子类生成器提供属性元数据
4. 提供类型安全的属性和关键字定义
