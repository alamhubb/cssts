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
const cstToAstPath = path.join(compilerRoot, 'src', 'factory', 'CssTsCstToAstUtils.ts')
const generatedParserPath = path.join(workspaceRoot, 'qin', 'packages', 'qin-language', 'generated', 'qin-parser-ts')

const compilerConfig = fs.readFileSync(compilerConfigPath, 'utf-8')
const parserSource = fs.readFileSync(parserPath, 'utf-8')
const adapterSource = fs.readFileSync(adapterPath, 'utf-8')
const transformSource = fs.readFileSync(transformPath, 'utf-8')
const cstToAstSource = fs.readFileSync(cstToAstPath, 'utf-8')

function requireIncludes(source: string, needle: string, label: string) {
  if (!source.includes(needle)) {
    throw new Error(`${label} must include ${needle}`)
  }
}

function requireExcludes(source: string, needle: string, label: string) {
  if (source.includes(needle)) {
    throw new Error(`${label} must not include ${needle}`)
  }
}

requireIncludes(compilerConfig, 'parser: "@qin/generated-qin-parser-ts"', 'cssts-compiler qin.config.js')
requireIncludes(compilerConfig, '"@qin/generated-qin-parser-ts": "file:../../../qin/packages/qin-language/generated/qin-parser-ts"', 'cssts-compiler qin.config.js')
requireIncludes(compilerConfig, 'test: "tsx tests/test-generated-parser-chain.ts && tsdown"', 'cssts-compiler qin.config.js')
for (const requiredCompilerDependency of ['"subhuti"', '"slime-ast"', '"slime-parser"']) {
  requireIncludes(compilerConfig, requiredCompilerDependency, 'cssts-compiler qin.config.js')
}
for (const unusedCompilerDependency of ['"slime-generator"', '"slime-token"']) {
  requireExcludes(compilerConfig, unusedCompilerDependency, 'cssts-compiler qin.config.js')
}
requireIncludes(parserSource, 'from "@qin/generated-qin-parser-ts"', 'CssTsParser.ts')
requireExcludes(parserSource, 'slime-parser', 'CssTsParser.ts')
requireIncludes(parserSource, 'normalizeGeneratedTokens', 'CssTsParser.ts')
requireIncludes(parserSource, 'extends QinParser', 'CssTsParser.ts')
requireIncludes(parserSource, 'this.Or(', 'CssTsParser.ts')
requireExcludes(parserSource, 'fallback', 'CssTsParser.ts')
requireIncludes(adapterSource, 'normalizeGeneratedCst', 'generated-runtime-adapter.ts')
requireIncludes(adapterSource, 'javaListToArray', 'generated-runtime-adapter.ts')
requireIncludes(transformSource, 'normalizeGeneratedCst(parser.Program())', 'transform/index.ts')
requireIncludes(transformSource, "import { registerSlimeCstToAstUtil } from 'slime-parser'", 'transform/index.ts')
requireIncludes(cstToAstSource, 'import { SlimeCstToAst, SlimeCstToAstUtils, registerSlimeCstToAstUtil } from "slime-parser"', 'CssTsCstToAstUtils.ts')
requireIncludes(cstToAstSource, 'extends SlimeCstToAst', 'CssTsCstToAstUtils.ts')

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
  'object NestedLabeler {',
  '  label(name: string, premium: boolean, active: boolean): string {',
  '    const base = "hello "',
  '    if (active) {',
  '      if (premium) {',
  '        const label = "vip "',
  '        return label + name',
  '      }',
  '      const standard = "std "',
  '      return standard + name',
  '    }',
  '    return base + name',
  '  }',
  '  risky(flag: boolean): string {',
  '    try {',
  '      if (flag) {',
  '        throw new Error("boom")',
  '      }',
  '      return "ok"',
  '    } catch (error) {',
  '      return "caught"',
  '    }',
  '  }',
  '  count(limit: number): number {',
  '    let total = 0',
  '    while (total < limit) {',
  '      total = total + 1',
  '    }',
  '    return total',
  '  }',
  '  sum(limit: number): number {',
  '    let total = 0',
  '    for (let i = 0; i < limit; i = i + 1) {',
  '      if (i == 2) {',
  '        continue',
  '      }',
  '      if (i == 5) {',
  '        break',
  '      }',
  '      total = total + i',
  '    }',
  '    return total',
  '  }',
  '  countAtLeastOnce(limit: number): number {',
  '    let i = 0',
  '    do {',
  '      i = i + 1',
  '    } while (i < limit)',
  '    return i',
  '  }',
  '  collect(values: List): number {',
  '    let total = 0',
  '    for (const item of values) {',
  '      total = total + item',
  '    }',
  '    return total',
  '  }',
  '}',
  'const moduleUrl = import.meta.url',
  'const loadedModule = import("./dep.qin")',
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

if (!parser.parsedTokens.some((token: any) => token.tokenValue === 'object')) {
  throw new Error('CssTsParser chain must preserve Qin object declaration syntax from the generated parser')
}

if (!parser.parsedTokens.some((token: any) => token.tokenValue === 'premium')
  || !parser.parsedTokens.some((token: any) => token.tokenValue === 'standard')) {
  throw new Error('CssTsParser chain must preserve nested Qin object method-body syntax from the generated parser')
}

if (!parser.parsedTokens.some((token: any) => token.tokenValue === 'try')
  || !parser.parsedTokens.some((token: any) => token.tokenValue === 'catch')
  || !parser.parsedTokens.some((token: any) => token.tokenValue === 'throw')) {
  throw new Error('CssTsParser chain must preserve Qin try/catch/throw syntax from the generated parser')
}

if (!parser.parsedTokens.some((token: any) => token.tokenValue === 'while')
  || !parser.parsedTokens.some((token: any) => token.tokenValue === 'total')
  || !parser.parsedTokens.some((token: any) => token.tokenValue === '=')) {
  throw new Error('CssTsParser chain must preserve Qin mutable while local and assignment syntax from the generated parser')
}

if (!parser.parsedTokens.some((token: any) => token.tokenValue === 'for')
  || !parser.parsedTokens.some((token: any) => token.tokenValue === 'continue')
  || !parser.parsedTokens.some((token: any) => token.tokenValue === 'break')) {
  throw new Error('CssTsParser chain must preserve Qin for/break/continue syntax from the generated parser')
}

if (!parser.parsedTokens.some((token: any) => token.tokenValue === 'do')
  || !parser.parsedTokens.some((token: any) => token.tokenValue === 'while')
  || !parser.parsedTokens.some((token: any) => token.tokenValue === 'countAtLeastOnce')) {
  throw new Error('CssTsParser chain must preserve Qin do-while syntax from the generated parser')
}

if (!parser.parsedTokens.some((token: any) => token.tokenValue === 'for')
  || !parser.parsedTokens.some((token: any) => token.tokenValue === 'of')
  || !parser.parsedTokens.some((token: any) => token.tokenValue === 'collect')
  || !parser.parsedTokens.some((token: any) => token.tokenValue === 'item')) {
  throw new Error('CssTsParser chain must preserve Qin for...of syntax from the generated parser')
}

if (!parser.parsedTokens.some((token: any) => token.tokenValue === 'import')
  || !parser.parsedTokens.some((token: any) => token.tokenValue === 'meta')) {
  throw new Error('CssTsParser chain must preserve import.meta syntax from the generated parser')
}

if (!parser.parsedTokens.some((token: any) => String(token.tokenValue).includes('./dep.qin'))) {
  throw new Error('CssTsParser chain must preserve dynamic import syntax from the generated parser')
}

if (!parser.parsedTokens.some((token: any) => token.tokenValue === 'css')) {
  throw new Error('CssTsParser chain must preserve CSSTS css expression syntax')
}

console.log('cssts-compiler generated parser chain smoke passed')
