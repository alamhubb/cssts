import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'
import { pathToFileURL } from 'node:url'
import { CssTsParser } from 'cssts-compiler'
import { SlimeJavascriptParser } from '@qin/generated-qin-parser-ts'

const require = createRequire(import.meta.url)
const languageRoot = path.join(__dirname, '..')
const workspaceRoot = path.join(languageRoot, '..')

const languageConfigPath = path.join(languageRoot, 'qin.config.js')
const compilerConfigPath = path.join(workspaceRoot, 'cssts', 'cssts-compiler', 'qin.config.js')
const languagePackagePath = path.join(languageRoot, 'package.json')
const compilerPackagePath = path.join(workspaceRoot, 'cssts', 'cssts-compiler', 'package.json')
const parserPath = path.join(workspaceRoot, 'cssts', 'cssts-compiler', 'src', 'parser', 'CssTsParser.ts')
const adapterPath = path.join(workspaceRoot, 'cssts', 'cssts-compiler', 'src', 'parser', 'generated-runtime-adapter.ts')
const transformPath = path.join(workspaceRoot, 'cssts', 'cssts-compiler', 'src', 'transform', 'index.ts')

const languageConfig = fs.readFileSync(languageConfigPath, 'utf-8')
const compilerConfig = fs.readFileSync(compilerConfigPath, 'utf-8')
const languagePackage = readJson(languagePackagePath)
const compilerPackage = readJson(compilerPackagePath)
const generatedParserPackage = readJson(require.resolve('@qin/generated-qin-parser-ts/package.json'))
const parserSource = fs.readFileSync(parserPath, 'utf-8')
const adapterSource = fs.readFileSync(adapterPath, 'utf-8')
const transformSource = fs.readFileSync(transformPath, 'utf-8')

function requireIncludes(source: string, needle: string, label: string) {
  if (!source.includes(needle)) {
    throw new Error(`${label} must include ${needle}`)
  }
}

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
    throw new Error(`${label} must not depend directly on ${dependencyName}; use @qin/generated-qin-parser-ts through cssts-compiler`)
  }
}

async function main() {
  const languageConfigObject = await loadQinConfig(languageConfigPath)
  const compilerConfigObject = await loadQinConfig(compilerConfigPath)
  const generatedParserTarget = languageConfigObject.languageServer?.generatedParserTarget

  requireEquals(languageConfigObject.language?.parser, generatedParserTarget, 'cssts-language language.parser')
  requireEquals(compilerConfigObject.language?.parser, generatedParserTarget, 'cssts-compiler language.parser')
  requireEquals(generatedParserPackage.name, generatedParserTarget, 'resolved generated parser package name')
  requireDependency(languagePackage, generatedParserTarget, 'cssts-language package.json')
  requireDependency(compilerPackage, generatedParserTarget, 'cssts-compiler package.json')

  for (const legacyParserPackage of ['slime-ast', 'slime-parser', 'slime-token', 'subhuti']) {
    requireNoDependency(languageConfigObject, legacyParserPackage, 'cssts-language qin.config.js')
    requireNoDependency(languagePackage, legacyParserPackage, 'cssts-language package.json')
  }

  requireIncludes(languageConfig, 'parser: "@qin/generated-qin-parser-ts"', 'cssts-language qin.config.js')
  requireIncludes(compilerConfig, 'parser: "@qin/generated-qin-parser-ts"', 'cssts-compiler qin.config.js')
  requireIncludes(compilerConfig, 'build: "tsdown"', 'cssts-compiler qin.config.js')
  requireIncludes(compilerConfig, 'test: "tsx tests/test-generated-parser-chain.ts && tsdown"', 'cssts-compiler qin.config.js')
  requireIncludes(parserSource, 'from "@qin/generated-qin-parser-ts"', 'CssTsParser.ts')
  requireIncludes(parserSource, 'normalizeGeneratedTokens', 'CssTsParser.ts')
  requireIncludes(parserSource, 'extends QinParser', 'CssTsParser.ts')
  requireIncludes(parserSource, 'this.Or(', 'CssTsParser.ts')
  requireIncludes(adapterSource, 'normalizeGeneratedCst', 'generated-runtime-adapter.ts')
  requireIncludes(adapterSource, 'javaListToArray', 'generated-runtime-adapter.ts')
  requireIncludes(transformSource, 'normalizeGeneratedCst(parser.Program())', 'transform/index.ts')
  requireIncludes(adapterSource, 'normalizeGeneratedCst', 'generated-runtime-adapter.ts')
  requireIncludes(parserSource, 'extends QinParser', 'CssTsParser.ts')

  if (parserSource.includes('alt:')) {
    throw new Error('CssTsParser.ts must use generated parser Or semantics, not legacy { alt } alternatives')
  }

  if (compilerConfig.includes('npm run')) {
    throw new Error('cssts-compiler qin.config.js must run compiler tasks directly through Qin scripts, not npm run forwarding')
  }

  if (languageConfig.includes('npm run')) {
    throw new Error('cssts-language qin.config.js must run language tasks directly through Qin scripts, not npm run forwarding')
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
    '}',
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

  if (!parser.parsedTokens.some((token: any) => token.tokenValue === 'css')) {
    throw new Error('CssTsParser chain must preserve CSSTS css expression syntax')
  }

  console.log('test-generated-parser-chain passed')
}

main().catch(error => {
  console.error(error instanceof Error ? error.stack || error.message : String(error))
  process.exit(1)
})
