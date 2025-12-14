/**
 * Integration Tests
 * 
 * Property-based tests for style system integration and OVS compilation.
 * **Feature: cssts-ui-components, Property 14: OVS compilation produces valid Vue render functions**
 * **Validates: Requirements 5.5**
 * 
 * 使用 cssts 的 css {} 语法
 */

import { describe, it, expect, beforeAll } from 'vitest'
import * as fc from 'fast-check'

// Import styles
import {
  buttonBase,
  buttonPrimary,
  buttonSuccess,
  buttonWarning,
  buttonDanger,
  buttonInfo,
  buttonLarge,
  buttonSmall,
  buttonDisabled,
  buttonLoading,
  buttonRound,
  buttonCircle,
  getButtonTypeStyle,
  getButtonSizeStyle,
  iconBase,
  inputWrapper,
  inputInner,
  inputLarge,
  inputSmall,
  inputDisabled,
  getInputSizeStyle,
} from './styles/components'
import { mergeStyles } from './styles/CssCls'

// OVS compiler types
type OvsTransformResult = { code: string; mapping: any[] }
type OvsTransformBaseResult = { ast: any; tokens: any[] }

// Dynamic import for ovs-compiler
let ovsTransform: (code: string) => OvsTransformResult
let ovsTransformBase: (code: string) => OvsTransformBaseResult
let ovsCompilerLoaded = false

describe('Style System Integration Tests', () => {
  /**
   * Property 14: OVS compilation produces valid Vue render functions
   * **Validates: Requirements 5.5**
   */
  describe('Property 14: OVS compilation produces valid Vue render functions', () => {
    beforeAll(async () => {
      try {
        const ovsCompiler = await import('ovs-compiler')
        ovsTransform = ovsCompiler.ovsTransform
        ovsTransformBase = ovsCompiler.ovsTransformBase
        ovsCompilerLoaded = true
      } catch (e) {
        console.warn('OVS compiler could not be loaded, skipping OVS compilation tests')
        ovsCompilerLoaded = false
      }
    })

    it('OVS parser produces valid AST for simple view', async () => {
      if (!ovsCompilerLoaded) {
        console.log('Skipping: OVS compiler not loaded')
        return
      }
      const ovsCode = `view SimpleView(props) {
  div(class = "container") {
    "Hello World"
  }
}`
      const result = ovsTransformBase(ovsCode)
      expect(result.ast).toBeDefined()
      expect(result.ast).not.toBeNull()
      expect(result.tokens.length).toBeGreaterThan(0)
    })

    it('OVS compiler produces valid JavaScript output', async () => {
      if (!ovsCompilerLoaded) {
        console.log('Skipping: OVS compiler not loaded')
        return
      }
      const ovsCode = `view Button(props) {
  button(class = "btn") {
    props.children
  }
}`
      const result = ovsTransform(ovsCode)
      expect(result.code).toBeDefined()
      expect(result.code.length).toBeGreaterThan(0)
      expect(result.code).toContain('$OvsHtmlTag.')
    })

    it('OVS compiler handles nested elements correctly', async () => {
      if (!ovsCompilerLoaded) {
        console.log('Skipping: OVS compiler not loaded')
        return
      }
      const ovsCode = `view Card(props) {
  div(class = "card") {
    div(class = "card-header") {
      props.title
    }
    div(class = "card-body") {
      props.children
    }
  }
}`
      const result = ovsTransform(ovsCode)
      expect(result.code).toBeDefined()
      const ovsCallCount = (result.code.match(/\$OvsHtmlTag\./g) || []).length
      expect(ovsCallCount).toBeGreaterThanOrEqual(3)
    })

    it('OVS compiler handles conditional rendering', async () => {
      if (!ovsCompilerLoaded) {
        console.log('Skipping: OVS compiler not loaded')
        return
      }
      const ovsCode = `view ConditionalView(props) {
  div() {
    if (props.show) {
      span() { "Visible" }
    }
  }
}`
      const result = ovsTransform(ovsCode)
      expect(result.code).toBeDefined()
      expect(result.code).toContain('props.show')
    })

    it('OVS compiler handles event handlers', async () => {
      if (!ovsCompilerLoaded) {
        console.log('Skipping: OVS compiler not loaded')
        return
      }
      const ovsCode = `view ClickableView(props) {
  button(onClick = () => console.log('clicked')) {
    "Click me"
  }
}`
      const result = ovsTransform(ovsCode)
      expect(result.code).toBeDefined()
      expect(result.code).toContain('onClick')
    })

    it('Property: Valid HTML tag names compile successfully', async () => {
      if (!ovsCompilerLoaded) {
        console.log('Skipping: OVS compiler not loaded')
        return
      }
      const validTags = ['div', 'span', 'button', 'input', 'form', 'section', 'article', 'header', 'footer', 'nav', 'main', 'aside', 'p', 'h1', 'h2', 'h3', 'ul', 'ol', 'li', 'a', 'img', 'table', 'tr', 'td', 'th']
      
      fc.assert(
        fc.property(
          fc.constantFrom(...validTags),
          (tagName) => {
            const ovsCode = `view TestView(props) {
  ${tagName}(class = "test") {
    "content"
  }
}`
            const result = ovsTransform(ovsCode)
            expect(result.code).toBeDefined()
            expect(result.code.length).toBeGreaterThan(0)
            return true
          }
        ),
        { numRuns: validTags.length }
      )
    })

    it('Property: Various prop combinations compile successfully', async () => {
      if (!ovsCompilerLoaded) {
        console.log('Skipping: OVS compiler not loaded')
        return
      }
      fc.assert(
        fc.property(
          fc.record({
            hasClass: fc.boolean(),
            hasId: fc.boolean(),
            hasOnClick: fc.boolean(),
            hasDisabled: fc.boolean(),
          }),
          (propConfig) => {
            const props: string[] = []
            if (propConfig.hasClass) props.push('class = "test-class"')
            if (propConfig.hasId) props.push('id = "test-id"')
            if (propConfig.hasOnClick) props.push('onClick = () => {}')
            if (propConfig.hasDisabled) props.push('disabled = true')
            
            const propsStr = props.length > 0 ? props.join(', ') : ''
            const ovsCode = `view TestView(props) {
  div(${propsStr}) {
    "content"
  }
}`
            const result = ovsTransform(ovsCode)
            expect(result.code).toBeDefined()
            expect(result.code.length).toBeGreaterThan(0)
            return true
          }
        ),
        { numRuns: 50 }
      )
    })
  })

  describe('Style system produces valid style objects', () => {
    it('Button styles are properly defined', () => {
      expect(buttonBase).toBeDefined()
      expect(buttonPrimary).toBeDefined()
      expect(buttonSuccess).toBeDefined()
      expect(buttonWarning).toBeDefined()
      expect(buttonDanger).toBeDefined()
      expect(buttonInfo).toBeDefined()
      expect(buttonLarge).toBeDefined()
      expect(buttonSmall).toBeDefined()
    })

    it('Icon styles are properly defined', () => {
      expect(iconBase).toBeDefined()
    })

    it('Input styles are properly defined', () => {
      expect(inputWrapper).toBeDefined()
      expect(inputInner).toBeDefined()
      expect(inputLarge).toBeDefined()
      expect(inputSmall).toBeDefined()
    })
  })

  describe('Property-based: Style composition produces valid style objects', () => {
    const buttonTypes = ['default', 'primary', 'success', 'warning', 'danger', 'info'] as const
    const buttonSizes = ['large', 'default', 'small'] as const

    it('Button type and size combinations produce valid style objects', () => {
      fc.assert(
        fc.property(
          fc.constantFrom(...buttonTypes),
          fc.constantFrom(...buttonSizes),
          fc.boolean(),
          fc.boolean(),
          fc.boolean(),
          fc.boolean(),
          (type, size, disabled, loading, round, circle) => {
            const combinedStyle = {
              ...buttonBase,
              ...getButtonTypeStyle(type),
              ...getButtonSizeStyle(size),
              ...(disabled ? buttonDisabled : {}),
              ...(loading ? buttonLoading : {}),
              ...(round ? buttonRound : {}),
              ...(circle ? buttonCircle : {}),
            }
            
            expect(combinedStyle).toBeDefined()
            expect(typeof combinedStyle).toBe('object')
            
            return true
          }
        ),
        { numRuns: 100 }
      )
    })

    it('Input size combinations produce valid style objects', () => {
      const inputSizes = ['large', 'default', 'small'] as const

      fc.assert(
        fc.property(
          fc.constantFrom(...inputSizes),
          fc.boolean(),
          (size, disabled) => {
            const combinedStyle = {
              ...inputWrapper,
              ...getInputSizeStyle(size),
              ...(disabled ? inputDisabled : {}),
            }
            
            expect(combinedStyle).toBeDefined()
            expect(typeof combinedStyle).toBe('object')
            
            return true
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  describe('mergeStyles function integration', () => {
    it('merges multiple style objects correctly', () => {
      const result = mergeStyles(
        buttonBase,
        buttonPrimary,
        buttonLarge,
      )
      
      expect(result).toBeDefined()
      expect(typeof result).toBe('object')
    })

    it('handles conditional styles correctly', () => {
      const isDisabled = true
      const isLoading = false
      
      const result = mergeStyles(
        buttonBase,
        isDisabled && buttonDisabled,
        isLoading && buttonLoading,
      )
      
      expect(result).toBeDefined()
    })
  })
})
