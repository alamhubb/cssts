import { transformCssTs } from 'cssts-compiler'
import { SlimeMappingConverter } from 'slime-generator'

const source = [
  'const baseStyle = css { colorRed, displayFlex }',
  'const derivedStyle = css { baseStyle, backgroundBlue }',
  '',
].join('\n')

const result = transformCssTs(source)

if (!result.code.trim()) {
  throw new Error('CSSTS transform must produce TypeScript service code')
}

for (const expected of [
  'import "virtual:cssts.css"',
  'import {cssts} from "cssts-ts"',
  'import {csstsAtom} from "virtual:csstsAtom"',
  'cssts.merge',
  'csstsAtom.colorRed',
  'csstsAtom.displayFlex',
  'csstsAtom.backgroundBlue',
  'baseStyle',
]) {
  if (!result.code.includes(expected)) {
    throw new Error(`CSSTS transform output missing ${expected}: ${result.code}`)
  }
}

if (!result.hasStyles) {
  throw new Error('CSSTS transform must report used atom styles')
}

if (!result.mapping.length) {
  throw new Error('CSSTS transform must preserve source mappings for Volar')
}

const converted = SlimeMappingConverter.convertMappings(result.mapping)
if (!converted.length) {
  throw new Error('CSSTS transform mappings must convert to Volar offsets')
}

for (const mapping of converted) {
  if (
    !Number.isFinite(mapping.original.offset) ||
    !Number.isFinite(mapping.original.length) ||
    mapping.original.length <= 0 ||
    !Number.isFinite(mapping.generated.offset) ||
    !Number.isFinite(mapping.generated.length) ||
    mapping.generated.length <= 0
  ) {
    throw new Error(`CSSTS transform produced invalid mapping: ${JSON.stringify(mapping)}`)
  }
}

console.log('test-transform-output passed')
