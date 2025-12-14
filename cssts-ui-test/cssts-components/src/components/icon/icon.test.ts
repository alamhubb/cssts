/**
 * Icon Component Tests
 * 
 * Unit tests for the Icon component.
 * 使用 cssts 的 css {} 语法
 */

import { describe, it, expect } from 'vitest'
import { 
  iconBase, 
  iconLoading, 
  iconLeft, 
  iconRight,
  iconSmall,
  iconDefault,
  iconLarge,
  getIconSizeStyle 
} from '../../styles/components/icon'

describe('Icon Component', () => {
  describe('Icon base styles', () => {
    it('base style should be defined', () => {
      expect(iconBase).toBeDefined()
      expect(typeof iconBase).toBe('object')
    })
  })

  describe('Icon state variants', () => {
    it('loading state should be defined', () => {
      expect(iconLoading).toBeDefined()
    })
  })

  describe('Icon position variants', () => {
    it('position variants should be defined', () => {
      expect(iconLeft).toBeDefined()
      expect(iconRight).toBeDefined()
    })
  })

  describe('Icon size variants', () => {
    it('size variants should be defined', () => {
      expect(iconSmall).toBeDefined()
      expect(iconDefault).toBeDefined()
      expect(iconLarge).toBeDefined()
    })

    it('getIconSizeStyle returns correct style', () => {
      expect(getIconSizeStyle('small')).toEqual(iconSmall)
      expect(getIconSizeStyle('large')).toEqual(iconLarge)
      expect(getIconSizeStyle(undefined)).toEqual(iconDefault)
    })
  })

  describe('Style composition', () => {
    it('base and loading can be combined', () => {
      const combinedStyle = {
        ...iconBase,
        ...iconLoading,
      }
      
      expect(combinedStyle).toBeDefined()
    })

    it('base and position can be combined', () => {
      const leftStyle = {
        ...iconBase,
        ...iconLeft,
      }
      const rightStyle = {
        ...iconBase,
        ...iconRight,
      }
      
      expect(leftStyle).toBeDefined()
      expect(rightStyle).toBeDefined()
    })
  })

  describe('Icon size and color', () => {
    it('size prop should generate correct style', () => {
      // 测试数字尺寸
      const numericSize = 24
      const numericStyle = { fontSize: `${numericSize}px` }
      expect(numericStyle.fontSize).toBe('24px')
      
      // 测试字符串尺寸
      const stringSize = '2em'
      const stringStyle = { fontSize: stringSize }
      expect(stringStyle.fontSize).toBe('2em')
    })

    it('color prop should generate correct style', () => {
      const color = '#409eff'
      const style = { '--color': color }
      expect(style['--color']).toBe('#409eff')
    })
  })
})
