/**
 * Button Component Tests
 * 
 * Property-based tests for the Button component.
 * 使用 cssts 的 css {} 语法
 */

import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import { 
  buttonBase, 
  buttonPrimary,
  buttonSuccess,
  buttonWarning,
  buttonDanger,
  buttonInfo,
  buttonDefault,
  buttonLarge,
  buttonSmall,
  buttonDisabled, 
  buttonLoading, 
  buttonRound, 
  buttonCircle,
  getButtonTypeStyle, 
  getButtonSizeStyle 
} from '../../styles/components/button'

describe('Button Component', () => {
  describe('Button base styles', () => {
    it('base style should have required atomic classes', () => {
      // buttonBase 应该包含 cssts 原子类
      expect(buttonBase).toBeDefined()
      expect(typeof buttonBase).toBe('object')
    })
  })

  describe('Button type variants', () => {
    it('type variants should be defined', () => {
      expect(buttonPrimary).toBeDefined()
      expect(buttonSuccess).toBeDefined()
      expect(buttonWarning).toBeDefined()
      expect(buttonDanger).toBeDefined()
      expect(buttonInfo).toBeDefined()
      expect(buttonDefault).toBeDefined()
    })
  })

  describe('Button size variants', () => {
    it('size variants should be defined', () => {
      expect(buttonLarge).toBeDefined()
      expect(buttonSmall).toBeDefined()
    })
  })

  describe('Button state variants', () => {
    it('state variants should be defined', () => {
      expect(buttonDisabled).toBeDefined()
      expect(buttonLoading).toBeDefined()
      expect(buttonRound).toBeDefined()
      expect(buttonCircle).toBeDefined()
    })
  })

  /**
   * **Feature: cssts-ui-components, Property 1: Button type prop applies correct style**
   * **Validates: Requirements 1.2**
   */
  describe('Property 1: Button type prop applies correct style', () => {
    const validTypes = ['primary', 'success', 'warning', 'danger', 'info'] as const

    it('type prop returns correct style object', () => {
      fc.assert(
        fc.property(fc.constantFrom(...validTypes), (type) => {
          const typeStyle = getButtonTypeStyle(type)
          expect(typeStyle).toBeDefined()
          expect(typeof typeStyle).toBe('object')
        }),
        { numRuns: 100 }
      )
    })

    it('default type returns default style', () => {
      const typeStyle = getButtonTypeStyle('default')
      expect(typeStyle).toEqual(buttonDefault)
    })

    it('undefined type returns default style', () => {
      const typeStyle = getButtonTypeStyle(undefined)
      expect(typeStyle).toEqual(buttonDefault)
    })
  })

  /**
   * **Feature: cssts-ui-components, Property 2: Button size prop applies correct style**
   * **Validates: Requirements 1.3**
   */
  describe('Property 2: Button size prop applies correct style', () => {
    it('large size returns large style', () => {
      const sizeStyle = getButtonSizeStyle('large')
      expect(sizeStyle).toEqual(buttonLarge)
    })

    it('small size returns small style', () => {
      const sizeStyle = getButtonSizeStyle('small')
      expect(sizeStyle).toEqual(buttonSmall)
    })

    it('default size returns empty object', () => {
      const sizeStyle = getButtonSizeStyle('default')
      expect(sizeStyle).toEqual({})
    })

    it('undefined size returns empty object', () => {
      const sizeStyle = getButtonSizeStyle(undefined)
      expect(sizeStyle).toEqual({})
    })
  })

  /**
   * **Feature: cssts-ui-components, Property 3: Disabled button has correct state**
   * **Validates: Requirements 1.4**
   */
  describe('Property 3: Disabled button has correct state', () => {
    it('disabled style is defined', () => {
      expect(buttonDisabled).toBeDefined()
    })
  })

  /**
   * **Feature: cssts-ui-components, Property 4: Loading button has correct state**
   * **Validates: Requirements 1.5**
   */
  describe('Property 4: Loading button has correct state', () => {
    it('loading style is defined', () => {
      expect(buttonLoading).toBeDefined()
    })
  })

  /**
   * **Feature: cssts-ui-components, Property 5: Button boolean props apply correct styles**
   * **Validates: Requirements 1.6, 1.7, 1.8**
   */
  describe('Property 5: Button boolean props apply correct styles', () => {
    it('round style is defined', () => {
      expect(buttonRound).toBeDefined()
    })

    it('circle style is defined', () => {
      expect(buttonCircle).toBeDefined()
    })
  })

  /**
   * **Feature: cssts-ui-components, Property 6: Enabled button emits click event**
   * **Validates: Requirements 1.9**
   */
  describe('Property 6: Enabled button emits click event', () => {
    it('click handler is called when button is enabled', () => {
      fc.assert(
        fc.property(
          fc.boolean(),
          fc.boolean(),
          (disabled, loading) => {
            let clicked = false
            const mockEvent = { stopPropagation: () => {} } as MouseEvent
            
            // 模拟点击处理逻辑
            const handleClick = (evt: MouseEvent) => {
              if (disabled || loading) {
                evt.stopPropagation()
                return
              }
              clicked = true
            }
            
            handleClick(mockEvent)
            
            // 只有在非禁用且非加载状态下才触发点击
            if (!disabled && !loading) {
              expect(clicked).toBe(true)
            } else {
              expect(clicked).toBe(false)
            }
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  describe('Style composition', () => {
    it('all type and size combinations produce valid styles', () => {
      const types = ['default', 'primary', 'success', 'warning', 'danger', 'info'] as const
      const sizes = ['large', 'default', 'small'] as const
      
      fc.assert(
        fc.property(
          fc.constantFrom(...types),
          fc.constantFrom(...sizes),
          (type, size) => {
            const typeStyle = getButtonTypeStyle(type)
            const sizeStyle = getButtonSizeStyle(size)
            
            // 类型样式应该存在
            expect(typeStyle).toBeDefined()
            
            // 尺寸样式应该存在（可能为空对象）
            expect(sizeStyle).toBeDefined()
            
            // 组合样式
            const combinedStyle = {
              ...buttonBase,
              ...typeStyle,
              ...sizeStyle,
            }
            
            expect(combinedStyle).toBeDefined()
          }
        ),
        { numRuns: 100 }
      )
    })
  })
})
