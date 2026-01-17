/**
 * 完整测试：TestCsstsPlugin.vue 的 token 映射覆盖率
 * 使用 CSSTS 编译器检查源码中的每一个 token 是否有对应的映射
 */
import { SlimeMappingConverter } from 'slime-generator'
import { transformCssTs } from 'cssts-compiler'

// TestCsstsPlugin.vue 的 script 内容
const sourceCode = `import { ref } from 'vue'

// 测试 CSSTS 语法
const count = ref(0)

// 使用 css { } 语法定义样式
const buttonStyle = css { displayFlex, alignItemsCenter, px16, py8, bgBlue500, textWhite, rounded }

// 悬停样式
const hoverStyle = css { bgBlue600, cursorPointer }

function increment() {
  count.value++
}`

console.log('=== TestCsstsPlugin.vue CSSTS 代码测试 ===\n')
console.log('源代码长度:', sourceCode.length, '字符')
console.log()

// 1. 使用 CSSTS 编译器转换
console.log('=== 1. CSSTS 编译 ===')
const result = transformCssTs(sourceCode)
console.log('生成代码长度:', result.code.length, '字符')
console.log('原始 mapping 数量:', result.mapping.length)

// 2. 转换为 EnhancedMapping 格式
const offsets = SlimeMappingConverter.convertMappings(result.mapping)
console.log('有效 mapping 数量:', offsets.length)

// 3. 构建 mapping 的源码 offset 索引
console.log('\n=== 2. 源码覆盖分析 ===')

const mappedOffsets = new Set<number>()
offsets.forEach(m => {
    for (let i = m.original.offset; i < m.original.offset + m.original.length; i++) {
        mappedOffsets.add(i)
    }
})

// 4. 按字符位置检查未覆盖区域（排除空白和注释）
console.log('\n=== 3. 未覆盖区域检查 ===')

// 识别注释区域
const commentRanges: { start: number, end: number }[] = []
let i = 0
while (i < sourceCode.length) {
    if (sourceCode.substring(i, i + 2) === '//') {
        const start = i
        while (i < sourceCode.length && sourceCode[i] !== '\n') i++
        commentRanges.push({ start, end: i })
    } else if (sourceCode.substring(i, i + 2) === '/*') {
        const start = i
        i += 2
        while (i < sourceCode.length && sourceCode.substring(i, i + 2) !== '*/') i++
        i += 2
        commentRanges.push({ start, end: i })
    } else {
        i++
    }
}

// 检查一个位置是否在注释中
const isInComment = (pos: number) => {
    return commentRanges.some(r => pos >= r.start && pos < r.end)
}

// 找出所有未被 mapping 覆盖的非空白、非注释区域
const uncoveredRanges: { start: number, end: number, text: string }[] = []
let inUncovered = false
let uncoveredStart = 0

for (let i = 0; i < sourceCode.length; i++) {
    const char = sourceCode[i]
    const isWhitespace = /\s/.test(char)
    const inComment = isInComment(i)

    if (!mappedOffsets.has(i) && !isWhitespace && !inComment) {
        if (!inUncovered) {
            inUncovered = true
            uncoveredStart = i
        }
    } else {
        if (inUncovered) {
            inUncovered = false
            const text = sourceCode.substring(uncoveredStart, i)
            uncoveredRanges.push({ start: uncoveredStart, end: i, text })
        }
    }
}
if (inUncovered) {
    uncoveredRanges.push({
        start: uncoveredStart,
        end: sourceCode.length,
        text: sourceCode.substring(uncoveredStart)
    })
}

console.log('未覆盖区域数量:', uncoveredRanges.length)
uncoveredRanges.forEach((range, i) => {
    console.log(`[${i}] 位置 ${range.start}-${range.end}: "${range.text}"`)
})

// 5. 输出 mapping 详情
console.log('\n=== 4. Mapping 详情 ===')
offsets.forEach((m, i) => {
    const sourceText = sourceCode.substring(m.original.offset, m.original.offset + m.original.length)
    const genText = result.code.substring(m.generated.offset, m.generated.offset + m.generated.length)
    console.log(`[${i}] 源: "${sourceText}" (${m.original.offset}) -> 生成: "${genText}" (${m.generated.offset})`)
})

// 6. 计算覆盖率
console.log('\n=== 5. 覆盖率统计 ===')

// 计算非空白、非注释字符数
let totalMeaningful = 0
let coveredMeaningful = 0

for (let i = 0; i < sourceCode.length; i++) {
    const char = sourceCode[i]
    const isWhitespace = /\s/.test(char)
    const inComment = isInComment(i)

    if (!isWhitespace && !inComment) {
        totalMeaningful++
        if (mappedOffsets.has(i)) {
            coveredMeaningful++
        }
    }
}

const coverageRate = (coveredMeaningful / totalMeaningful * 100).toFixed(2)

console.log(`源码有意义字符数: ${totalMeaningful}`)
console.log(`被映射字符数: ${coveredMeaningful}`)
console.log(`覆盖率: ${coverageRate}%`)

// 7. 生成代码预览
console.log('\n=== 6. 生成代码预览 ===')
console.log(result.code)
