import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { CssTsParser } from '../src/index.ts'
import { SlimeJavascriptParser } from '@qin/generated-qin-parser-ts'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const compilerRoot = path.join(__dirname, '..')
const workspaceRoot = path.join(compilerRoot, '..', '..', '..')

const compilerConfigPath = path.join(compilerRoot, 'qin.config.js')
const parserPath = path.join(compilerRoot, 'src', 'parser', 'CssTsParser.ts')
const adapterPath = path.join(compilerRoot, 'src', 'parser', 'generated-runtime-adapter.ts')
const transformPath = path.join(compilerRoot, 'src', 'transform', 'index.ts')
const generatedParserPath = path.join(workspaceRoot, 'qin', 'packages', 'qin-language', 'generated', 'qin-parser-ts')

const compilerConfig = fs.readFileSync(compilerConfigPath, 'utf-8')
const parserSource = fs.readFileSync(parserPath, 'utf-8')
const adapterSource = fs.readFileSync(adapterPath, 'utf-8')
const transformSource = fs.readFileSync(transformPath, 'utf-8')

function requireIncludes(source: string, needle: string, label: string) {
  if (!source.includes(needle)) {
    throw new Error(`${label} must include ${needle}`)
  }
}

requireIncludes(compilerConfig, 'parser: "@qin/generated-qin-parser-ts"', 'cssts-compiler qin.config.js')
requireIncludes(compilerConfig, '"@qin/generated-qin-parser-ts": "file:../../../qin/packages/qin-language/generated/qin-parser-ts"', 'cssts-compiler qin.config.js')
requireIncludes(compilerConfig, 'test: "tsx tests/test-generated-parser-chain.ts && tsdown"', 'cssts-compiler qin.config.js')
requireIncludes(parserSource, 'from "@qin/generated-qin-parser-ts"', 'CssTsParser.ts')
requireIncludes(parserSource, 'normalizeGeneratedTokens', 'CssTsParser.ts')
requireIncludes(parserSource, 'extends SlimeParser', 'CssTsParser.ts')
requireIncludes(parserSource, 'this.Or(', 'CssTsParser.ts')
requireIncludes(adapterSource, 'normalizeGeneratedCst', 'generated-runtime-adapter.ts')
requireIncludes(adapterSource, 'javaListToArray', 'generated-runtime-adapter.ts')
requireIncludes(transformSource, 'normalizeGeneratedCst(parser.Program())', 'transform/index.ts')

if (!fs.existsSync(generatedParserPath)) {
  throw new Error(`CSSTS compiler must resolve the shared generated Qin parser package: ${generatedParserPath}`)
}

if (parserSource.includes('alt:')) {
  throw new Error('CssTsParser.ts must use generated parser Or semantics, not legacy { alt } alternatives')
}

if (compilerConfig.includes('npm run')) {
  throw new Error('cssts-compiler qin.config.js must run compiler tasks directly through Qin scripts, not npm run forwarding')
}

const inheritedSyntaxSource = [
  'const baseStyle = css { colorRed, displayFlex }',
  'const derivedStyle = css { baseStyle, backgroundBlue }',
  '',
].join('\n')
const parser = new CssTsParser(inheritedSyntaxSource)

if (!(parser instanceof SlimeJavascriptParser)) {
  throw new Error('CssTsParser must inherit the shared generated SlimeJavascriptParser export')
}

parser.Program()

if (!parser.parsedTokens.length) {
  throw new Error('CssTsParser must parse through the generated Qin/Slime -> CSSTS parser chain')
}

console.log('cssts-compiler generated parser chain smoke passed')
