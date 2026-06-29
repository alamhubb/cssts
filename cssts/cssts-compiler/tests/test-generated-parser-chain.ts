import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'
import { pathToFileURL } from 'node:url'
import { CssTsParser } from '../src/index.ts'
import { SlimeJavascriptParser } from '@qin/generated-qin-parser-ts'
import { csstsInheritedSyntaxSource } from './generated-parser-chain-fixture.ts'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const require = createRequire(import.meta.url)
const compilerRoot = path.join(__dirname, '..')
const workspaceRoot = path.join(compilerRoot, '..', '..', '..')

const compilerConfigPath = path.join(compilerRoot, 'qin.config.js')
const compilerPackagePath = path.join(compilerRoot, 'package.json')
const parserPath = path.join(compilerRoot, 'src', 'parser', 'CssTsParser.ts')
const adapterPath = path.join(compilerRoot, 'src', 'parser', 'generated-runtime-adapter.ts')
const transformPath = path.join(compilerRoot, 'src', 'transform', 'index.ts')
const cstToAstPath = path.join(compilerRoot, 'src', 'factory', 'CssTsCstToAstUtils.ts')
const generatedParserPath = path.join(workspaceRoot, 'qin', 'packages', 'qin-language', 'generated', 'qin-parser-ts')

const compilerConfig = fs.readFileSync(compilerConfigPath, 'utf-8')
const compilerPackage = readJson(compilerPackagePath)
const generatedParserPackage = readJson(require.resolve('@qin/generated-qin-parser-ts/package.json'))
const parserSource = fs.readFileSync(parserPath, 'utf-8')
const adapterSource = fs.readFileSync(adapterPath, 'utf-8')
const transformSource = fs.readFileSync(transformPath, 'utf-8')
const cstToAstSource = fs.readFileSync(cstToAstPath, 'utf-8')

async function loadQinConfig(configPath: string): Promise<any> {
  const moduleUrl = pathToFileURL(configPath).href
  const module = await import(`${moduleUrl}?mtime=${fs.statSync(configPath).mtimeMs}`)
  return module.default
}

function readJson(filePath: string): any {
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
}

function requireEquals(actual: unknown, expected: unknown, label: string) {
  if (actual !== expected) {
    throw new Error(`${label} must be ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`)
  }
}

function requireDependency(packageJson: any, dependencyName: string, label: string) {
  const dependencies = packageJson.dependencies ?? {}
  if (typeof dependencies[dependencyName] !== 'string') {
    throw new Error(`${label} must depend on ${dependencyName}`)
  }
}

function requireNoDependency(packageJson: any, dependencyName: string, label: string) {
  const dependencySections = [
    packageJson.dependencies ?? {},
    packageJson.devDependencies ?? {},
    packageJson.peerDependencies ?? {},
    packageJson.optionalDependencies ?? {},
  ]
  if (dependencySections.some(section => typeof section[dependencyName] === 'string')) {
    throw new Error(`${label} must not depend on ${dependencyName}`)
  }
}

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

const compilerConfigObject = await loadQinConfig(compilerConfigPath)
const generatedParserTarget = compilerConfigObject.language?.parser

requireEquals(compilerConfigObject.name, compilerPackage.name, 'cssts-compiler qin.config.js name')
requireEquals(compilerConfigObject.version, compilerPackage.version, 'cssts-compiler qin.config.js version')
requireEquals(compilerConfigObject.entry, 'src/index.ts', 'cssts-compiler qin.config.js entry')
requireEquals(compilerConfigObject.scripts?.build, 'tsdown', 'cssts-compiler qin.config.js build script')
requireEquals(compilerConfigObject.scripts?.test, 'tsx tests/test-generated-parser-chain.ts && tsdown', 'cssts-compiler qin.config.js test script')
requireEquals(generatedParserTarget, '@qin/generated-qin-parser-ts', 'cssts-compiler language.parser')
requireEquals(generatedParserPackage.name, generatedParserTarget, 'resolved generated parser package name')
requireDependency(compilerPackage, generatedParserTarget, 'cssts-compiler package.json')
for (const unusedCompilerDependency of ['slime-generator', 'slime-token']) {
  requireNoDependency(compilerConfigObject, unusedCompilerDependency, 'cssts-compiler qin.config.js')
  requireNoDependency(compilerPackage, unusedCompilerDependency, 'cssts-compiler package.json')
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

const parser = new CssTsParser(csstsInheritedSyntaxSource)

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

if (!parser.parsedTokens.some((token: any) => token.tokenValue === 'interface')
  || !parser.parsedTokens.some((token: any) => token.tokenValue === 'ChainUser')
  || !parser.parsedTokens.some((token: any) => token.tokenValue === 'ChainPair')) {
  throw new Error('CssTsParser chain must preserve TypeScript interface and type alias declarations from the generated parser')
}

if (!parser.parsedTokens.some((token: any) => token.tokenValue === 'class')
  || !parser.parsedTokens.some((token: any) => token.tokenValue === 'ChainService')
  || !parser.parsedTokens.some((token: any) => token.tokenValue === 'constructor')) {
  throw new Error('CssTsParser chain must preserve class fields and constructor syntax from the generated parser')
}

if (!parser.parsedTokens.some((token: any) => token.tokenValue === 'destructuredName')
  || !parser.parsedTokens.some((token: any) => token.tokenValue === 'firstValue')) {
  throw new Error('CssTsParser chain must preserve destructuring declarations from the generated parser')
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

if (!parser.parsedTokens.some((token: any) => token.tokenValue === 'switch')
  || !parser.parsedTokens.some((token: any) => token.tokenValue === 'case')
  || !parser.parsedTokens.some((token: any) => token.tokenValue === 'default')
  || !parser.parsedTokens.some((token: any) => token.tokenValue === 'switchStatus')) {
  throw new Error('CssTsParser chain must preserve Qin switch/case/default syntax from the generated parser')
}

if (!parser.parsedTokens.some((token: any) => token.tokenValue === 'import')
  || !parser.parsedTokens.some((token: any) => token.tokenValue === 'meta')) {
  throw new Error('CssTsParser chain must preserve import.meta syntax from the generated parser')
}

if (!parser.parsedTokens.some((token: any) => String(token.tokenValue).includes('./dep.qin'))) {
  throw new Error('CssTsParser chain must preserve dynamic import syntax from the generated parser')
}

if (!parser.parsedTokens.some((token: any) => token.tokenName === 'QuestionDot' && token.tokenValue === '?.')
  || !parser.parsedTokens.some((token: any) => token.tokenValue === 'optionalName')
  || !parser.parsedTokens.some((token: any) => token.tokenValue === 'profile')) {
  throw new Error('CssTsParser chain must preserve optional chaining syntax from the generated parser')
}

if (!parser.parsedTokens.some((token: any) => token.tokenName === 'NullishCoalescing' && token.tokenValue === '??')
  || !parser.parsedTokens.some((token: any) => token.tokenValue === 'fallbackName')) {
  throw new Error('CssTsParser chain must preserve nullish coalescing syntax from the generated parser')
}

if (!parser.parsedTokens.some((token: any) => token.tokenName === 'TemplateHead' && String(token.tokenValue).includes('hello'))
  || !parser.parsedTokens.some((token: any) => token.tokenValue === 'templateName')) {
  throw new Error('CssTsParser chain must preserve template literal syntax from the generated parser')
}

if (!parser.parsedTokens.some((token: any) => token.tokenValue === 'css')) {
  throw new Error('CssTsParser chain must preserve CSSTS css expression syntax')
}

console.log('cssts-compiler generated parser chain smoke passed')
