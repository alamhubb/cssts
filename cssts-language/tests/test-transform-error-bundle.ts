import fs from 'node:fs'
import path from 'node:path'

const bundlePath = path.join(__dirname, '..', 'dist', 'language-server.cjs')
const bundle = fs.readFileSync(bundlePath, 'utf-8')

if (!bundle.includes('CSSTS transform failed')) {
  throw new Error('Expected language-server bundle to expose CSSTS transform failures')
}

const errorBranchStart = bundle.indexOf('logToFile("=== CSSTS Transform Error ===")')
const errorBranchEnd = bundle.indexOf('const offsets = transformError', errorBranchStart)
const errorBranch = errorBranchStart >= 0 && errorBranchEnd > errorBranchStart
  ? bundle.slice(errorBranchStart, errorBranchEnd)
  : ''

if (!errorBranch) {
  throw new Error('Expected language-server bundle to contain a CSSTS transform error branch')
}

if (errorBranch.includes('generatedCode = sourceCode')) {
  throw new Error('CSSTS transform failure must not fall back to identity source text')
}

if (!errorBranch.includes('generatedCode = createTransformErrorCode(e)')) {
  throw new Error('Expected CSSTS transform failure branch to emit explicit error code')
}

console.log('test-transform-error-bundle passed')
