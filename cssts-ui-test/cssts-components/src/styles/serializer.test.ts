/**
 * Style Serializer Tests
 * 
 * Property-based tests for style serialization round-trip consistency.
 */

import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import { serializeStyle, parseStyle, stylesEqual, type StyleObject } from './serializer'

describe('Style Serializer', () => {
  describe('serializeStyle', () => {
    it('should return empty string for empty object', () => {
      expect(serializeStyle({})).toBe('')
    })

    it('should return empty string for null/undefined', () => {
      expect(serializeStyle(null as any)).toBe('')
      expect(serializeStyle(undefined as any)).toBe('')
    })

    it('should only include truthy values', () => {
      const style = {
        'class-a': true,
        'class-b': false,
        'class-c': true,
      }
      expect(serializeStyle(style)).toBe('class-a class-c')
    })

    it('should sort class names alphabetically', () => {
      const style = {
        'zebra': true,
        'apple': true,
        'mango': true,
      }
      expect(serializeStyle(style)).toBe('apple mango zebra')
    })
  })

  describe('parseStyle', () => {
    it('should return empty object for empty string', () => {
      expect(parseStyle('')).toEqual({})
    })

    it('should return empty object for null/undefined', () => {
      expect(parseStyle(null as any)).toEqual({})
      expect(parseStyle(undefined as any)).toEqual({})
    })

    it('should parse space-separated class names', () => {
      expect(parseStyle('class-a class-b class-c')).toEqual({
        'class-a': true,
        'class-b': true,
        'class-c': true,
      })
    })

    it('should handle multiple spaces', () => {
      expect(parseStyle('class-a   class-b')).toEqual({
        'class-a': true,
        'class-b': true,
      })
    })
  })

  describe('stylesEqual', () => {
    it('should return true for equivalent styles', () => {
      const a = { 'class-a': true, 'class-b': true }
      const b = { 'class-b': true, 'class-a': true }
      expect(stylesEqual(a, b)).toBe(true)
    })

    it('should return false for different styles', () => {
      const a = { 'class-a': true }
      const b = { 'class-b': true }
      expect(stylesEqual(a, b)).toBe(false)
    })

    it('should ignore falsy values', () => {
      const a = { 'class-a': true, 'class-b': false }
      const b = { 'class-a': true }
      expect(stylesEqual(a, b)).toBe(true)
    })
  })

  /**
   * **Feature: cssts-ui-components, Property 13: Style serialization round-trip consistency**
   * **Validates: Requirements 6.3**
   * 
   * For any valid CssCls style object, serializing then parsing SHALL produce
   * an equivalent object (same keys with true values).
   */
  describe('Property 13: Style serialization round-trip consistency', () => {
    // Generate valid CSS class names (alphanumeric with hyphens)
    const cssClassNameArb = fc.stringOf(
      fc.constantFrom(
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
        'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-'
      ),
      { minLength: 1, maxLength: 30 }
    ).filter(s => /^[a-z]/.test(s)) // Must start with a letter

    // Generate style objects with valid class names
    const styleObjectArb = fc.dictionary(cssClassNameArb, fc.boolean())

    it('round-trip: serialize then parse produces equivalent object', () => {
      fc.assert(
        fc.property(styleObjectArb, (style) => {
          const serialized = serializeStyle(style)
          const parsed = parseStyle(serialized)
          
          // Extract only truthy keys from original
          const expectedKeys = Object.keys(style)
            .filter(k => style[k] === true)
            .sort()
          
          // Extract keys from parsed
          const parsedKeys = Object.keys(parsed).sort()
          
          // They should be equal
          expect(parsedKeys).toEqual(expectedKeys)
          
          // All parsed values should be true
          parsedKeys.forEach(key => {
            expect(parsed[key]).toBe(true)
          })
        }),
        { numRuns: 100 }
      )
    })

    it('round-trip: stylesEqual confirms equivalence', () => {
      fc.assert(
        fc.property(styleObjectArb, (style) => {
          const serialized = serializeStyle(style)
          const parsed = parseStyle(serialized)
          
          // The parsed result should be equivalent to the original (truthy keys only)
          const truthyOriginal: StyleObject = {}
          Object.keys(style).forEach(k => {
            if (style[k] === true) {
              truthyOriginal[k] = true
            }
          })
          
          expect(stylesEqual(parsed, truthyOriginal)).toBe(true)
        }),
        { numRuns: 100 }
      )
    })

    it('serialization is deterministic', () => {
      fc.assert(
        fc.property(styleObjectArb, (style) => {
          const serialized1 = serializeStyle(style)
          const serialized2 = serializeStyle(style)
          expect(serialized1).toBe(serialized2)
        }),
        { numRuns: 100 }
      )
    })
  })
})
