import fs from 'node:fs'
import path from 'node:path'

const languageRoot = path.join(__dirname, '..')
const workspaceRoot = path.join(languageRoot, '..')

const languageConfigPath = path.join(languageRoot, 'qin.config.js')
const compilerConfigPath = path.join(workspaceRoot, 'cssts', 'cssts-compiler', 'qin.config.js')
const parserPath = path.join(workspaceRoot, 'cssts', 'cssts-compiler', 'src', 'parser', 'CssTsParser.ts')
const adapterPath = path.join(workspaceRoot, 'cssts', 'cssts-compiler', 'src', 'parser', 'generated-runtime-adapter.ts')
const transformPath = path.join(workspaceRoot, 'cssts', 'cssts-compiler', 'src', 'transform', 'index.ts')

const languageConfig = fs.readFileSync(languageConfigPath, 'utf-8')
const compilerConfig = fs.readFileSync(compilerConfigPath, 'utf-8')
const parserSource = fs.readFileSync(parserPath, 'utf-8')
const adapterSource = fs.readFileSync(adapterPath, 'utf-8')
const transformSource = fs.readFileSync(transformPath, 'utf-8')

function requireIncludes(source: string, needle: string, label: string) {
  if (!source.includes(needle)) {
    throw new Error(`${label} must include ${needle}`)
  }
}

requireIncludes(languageConfig, 'parser: "@qin/generated-qin-parser-ts"', 'cssts-language qin.config.js')
requireIncludes(compilerConfig, 'parser: "@qin/generated-qin-parser-ts"', 'cssts-compiler qin.config.js')
requireIncludes(parserSource, 'from "@qin/generated-qin-parser-ts"', 'CssTsParser.ts')
requireIncludes(parserSource, 'normalizeGeneratedTokens', 'CssTsParser.ts')
requireIncludes(parserSource, 'extends SlimeParser', 'CssTsParser.ts')
requireIncludes(parserSource, 'this.Or(', 'CssTsParser.ts')
requireIncludes(adapterSource, 'normalizeGeneratedCst', 'generated-runtime-adapter.ts')
requireIncludes(adapterSource, 'javaListToArray', 'generated-runtime-adapter.ts')
requireIncludes(transformSource, 'normalizeGeneratedCst(parser.Program())', 'transform/index.ts')

if (parserSource.includes('alt:')) {
  throw new Error('CssTsParser.ts must use generated parser Or semantics, not legacy { alt } alternatives')
}

console.log('test-generated-parser-chain passed')
