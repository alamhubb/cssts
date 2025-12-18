# 文档修复记录

## 修复内容

### 伪类分隔符错误修复

**问题**：文档中说"双美元符号"但实际代码示例中使用的是单个美元符号 `$`

**正确用法**：伪类分隔符应该是**两个美元符号** `$$`

**修复的文件**：
- `README.md` - 修复了所有伪类分隔符示例

**修复前**：
```typescript
// ❌ 错误
const btn$hover$active = css { cursorPointer }
```

**修复后**：
```typescript
// ✅ 正确
const btn$$hover$$active = css { cursorPointer }
```

### 修复的具体位置

1. **README.md - 第 12-22 行**
   - 修复了"⚠️ 重要"部分的伪类分隔符示例
   - 从单 `$` 改为双 `$$`

2. **README.md - 第 65-76 行**
   - 修复了"核心设计"部分的代码示例
   - 从 `clickable$hover$active` 改为 `clickable$$hover$$active`

3. **README.md - 第 111-115 行**
   - 修复了 `parseStyleName` 示例
   - 从单 `$` 改为双 `$$`

4. **README.md - 第 166-173 行**
   - 修复了"伪类语法"部分的代码示例
   - 从单 `$` 改为双 `$$`

---

## 验证

所有文档已验证，伪类分隔符现在统一使用**两个美元符号** `$$`：

- ✅ README.md - 已修复
- ✅ CONFIG.md - 无此错误
- ✅ QUICK_START.md - 无此错误
- ✅ DOCS.md - 无此错误
- ✅ CONFIGURATION_SUMMARY.md - 无此错误

---

## 正确的伪类语法

```typescript
// 使用两个美元符号分隔伪类
const element$$pseudo1$$pseudo2 = css { ... }

// 示例
const btn$$hover$$active = css { cursorPointer }
const link$$visited$$hover = css { colorPurple }
const input$$focus$$disabled = css { opacityHalf }
```

---

## 配置

伪类分隔符配置：
```typescript
CSSTS_CONFIG.PSEUDO_SEPARATOR = '$$'  // 两个美元符号
```

