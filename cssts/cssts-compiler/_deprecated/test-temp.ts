import { transformCssTs } from './src/transform/index.ts'

const code = `
export const baseStyles = css { displayFlex }
export const primary$$hover$$active = css { baseStyles, colorRed }
`

const context = { styles: new Set<string>() }
const result = transformCssTs(code, context)
console.log('=== Generated Code ===')
console.log(result.code)
console.log('\n=== Collected Styles ===')
console.log([...context.styles])
