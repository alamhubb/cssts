import { describe, expect, it } from 'vitest'
import { getCssClassName, getCssProperty, getCssValue, parseTsAtomName } from './index'

describe('CSSTS atom naming', () => {
  it('converts documented atom names to property_value classes', () => {
    expect(getCssClassName('displayFlex')).toBe('display_flex')
    expect(getCssClassName('paddingTop16px')).toBe('padding-top_16px')
    expect(getCssClassName('opacity0p9')).toBe('opacity_0\\.9')
    expect(getCssClassName('width50pct')).toBe('width_50\\%')
    expect(getCssClassName('zIndexN1')).toBe('z-index_-1')
    expect(getCssClassName('animationDuration150ms')).toBe('animation-duration_150ms')
  })

  it('exposes parsed property and value without guessing unknown atoms', () => {
    expect(parseTsAtomName('justifyContentCenter')).toEqual({
      property: 'justify-content',
      value: 'center',
    })
    expect(getCssProperty('fontSize14px')).toBe('font-size')
    expect(getCssValue('fontSize14px')).toBe('14px')
    expect(() => getCssClassName('madeUpAtom')).toThrow('Unknown CSSTS atom name')
  })
})
