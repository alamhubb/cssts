import fs from 'node:fs'
import path from 'node:path'

const languageRoot = path.join(__dirname, '..')
const workspaceRoot = path.join(languageRoot, '..')

const languageConfigPath = path.join(languageRoot, 'qin.config.js')
const compilerConfigPath = path.join(workspaceRoot, 'cssts', 'cssts-compiler', 'qin.config.js')
const parserPath = path.join(workspaceRoot, 'cssts', 'cssts-compiler', 'src', 'parser', 'CssTsParser.ts')

const languageConfig = fs.readFileSync(languageConfigPath, 'utf-8')
const compilerConfig = fs.readFileSync(compilerConfigPath, 'utf-8')
const parserSource = fs.readFileSync(parserPath, 'utf-8')

function requireIncludes(source: string, needle: string, label: string) {
  if (!source.includes(needle)) {
    throw new Error(`${label} must include ${needle}`)
  }
}

requireIncludes(languageConfig, 'parser: "@qin/generated-qin-parser-ts"', 'cssts-language qin.config.js')
requireIncludes(compilerConfig, 'parser: "@qin/generated-qin-parser-ts"', 'cssts-compiler qin.config.js')
requireIncludes(parserSource, 'from "@qin/generated-qin-parser-ts"', 'CssTsParser.ts')
requireIncludes(parserSource, 'extends SlimeParser', 'CssTsParser.ts')
requireIncludes(parserSource, 'this.Or(', 'CssTsParser.ts')

if (parserSource.includes('alt:')) {
  throw new Error('CssTsParser.ts must use generated parser Or semantics, not legacy { alt } alternatives')
}

console.log('test-generated-parser-chain passed')
