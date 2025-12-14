/**
 * CssCls Style Merge Tests
 * 
 * Property-based tests for the $cls style merge function.
 */

import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import { $cls, type ClassObject } from './CssCls'

describe('$cls Style Merge Function', () => {
  describe('Basic functionality', () => {
    it('should return empty object for no arguments', () => {
      expect($cls()).toEqual({})
    })

    it('should return empty object for falsy values', () => {
      expect($cls(null, undefined, false, 0, '')).toEqual({})
    })

    it('should handle string input', () => {
      expect($cls('class-a')).toEqual({ 'class-a': true })
    })

    it('should handle object input', () => {
      expect($cls({ 'class-a': true, 'class-b': true })).toEqual({
        'class-a': true,
        'class-b': true,
      })
    })

    it('should ignore false values in objects', () => {
      expect($cls({ 'class-a': true, 'class-b': false })).toEqual({
        'class-a': true,
      })
    })

    it('should handle array input', () => {
      expect($cls(['class-a', 'class-b'])).toEqual({
        'class-a': true,
        'class-b': true,
      })
    })

    it('should merge multiple objects', () => {
      expect($cls({ 'class-a': true }, { 'class-b': true })).toEqual({
        'class-a': true,
        'class-b': true,
      })
    })

    it('should handle conditional styles', () => {
      const isDisabled = true
      const isLoading = false
      expect($cls(
        { 'base': true },
        isDisabled && { 'is-disabled': true },
        isLoading && { 'is-loading': true }
      )).toEqual({
        'base': true,
        'is-disabled': true,
      })
    })

    it('should handle nested objects', () => {
      const nestedStyle = {
        wrapper: { 'cu-button': true, 'cu-inline-flex': true },
      }
      expect($cls(nestedStyle.wrapper)).toEqual({
        'cu-button': true,
        'cu-inline-flex': true,
      })
    })
  })

  /**
   * **Feature: cssts-ui-components, Property 12: Style merge function combines styles correctly**
   * **Validates: Requirements 4.3**
   * 
   * For any set of style objects passed to $cls(), the result SHALL contain
   * all truthy class names from all input objects, with later objects
   * overriding earlier ones for same keys.
   */
  describe('Property 12: Style merge function combines styles correctly', () => {
    // Generate valid CSS class names
    const cssClassNameArb = fc.stringOf(
      fc.constantFrom(
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
        'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-'
      ),
      { minLength: 1, maxLength: 20 }
    ).filter(s => /^[a-z]/.test(s))

    // Generate style objects
    const styleObjectArb = fc.dictionary(cssClassNameArb, fc.boolean())

    it('merging preserves all truthy keys from all inputs', () => {
      fc.assert(
        fc.property(
          fc.array(styleObjectArb, { minLength: 1, maxLength: 5 }),
          (styles) => {
            const result = $cls(...styles)
            
            // Collect all truthy keys from all input styles
            const expectedKeys = new Set<string>()
            styles.forEach(style => {
              Object.keys(style).forEach(key => {
                if (style[key] === true) {
                  expectedKeys.add(key)
                }
              })
            })
            
            // Result should contain exactly these keys
            const resultKeys = new Set(Object.keys(result))
            expect(resultKeys).toEqual(expectedKeys)
            
            // All result values should be true
            Object.values(result).forEach(val => {
              expect(val).toBe(true)
            })
          }
        ),
        { numRuns: 100 }
      )
    })

    it('merging is associative for disjoint keys', () => {
      fc.assert(
        fc.property(
          styleObjectArb,
          styleObjectArb,
          (style1, style2) => {
            // Merge in different orders
            const result1 = $cls(style1, style2)
            const result2 = $cls(style2, style1)
            
            // For truthy keys, both should have the same result
            const keys1 = Object.keys(result1).sort()
            const keys2 = Object.keys(result2).sort()
            expect(keys1).toEqual(keys2)
          }
        ),
        { numRuns: 100 }
      )
    })

    it('falsy values are always ignored', () => {
      fc.assert(
        fc.property(
          styleObjectArb,
          fc.constantFrom(null, undefined, false, 0, ''),
          (style, falsyValue) => {
            const withFalsy = $cls(style, falsyValue as any)
            const withoutFalsy = $cls(style)
            
            expect(withFalsy).toEqual(withoutFalsy)
          }
        ),
        { numRuns: 100 }
      )
    })

    it('string inputs are converted to { string: true }', () => {
      fc.assert(
        fc.property(
          cssClassNameArb,
          (className) => {
            const result = $cls(className)
            expect(result).toEqual({ [className]: true })
          }
        ),
        { numRuns: 100 }
      )
    })

    it('array inputs are flattened correctly', () => {
      fc.assert(
        fc.property(
          fc.array(cssClassNameArb, { minLength: 1, maxLength: 5 }),
          (classNames) => {
            const fromArray = $cls(classNames)
            const fromSpread = $cls(...classNames)
            
            expect(fromArray).toEqual(fromSpread)
          }
        ),
        { numRuns: 100 }
      )
    })

    it('conditional styles work correctly', () => {
      fc.assert(
        fc.property(
          styleObjectArb,
          styleObjectArb,
          fc.boolean(),
          (baseStyle, conditionalStyle, condition) => {
            const result = $cls(baseStyle, condition && conditionalStyle)
            
            // Base style truthy keys should always be present
            Object.keys(baseStyle).forEach(key => {
              if (baseStyle[key] === true) {
                expect(result[key]).toBe(true)
              }
            })
            
            // Conditional style keys should only be present if condition is true
            if (condition) {
              Object.keys(conditionalStyle).forEach(key => {
                if (conditionalStyle[key] === true) {
                  expect(result[key]).toBe(true)
                }
              })
            }
          }
        ),
        { numRuns: 100 }
      )
    })
  })
})
