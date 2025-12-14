/**
 * Style Serializer
 * 
 * Provides functions to serialize and parse CssTs style objects.
 * Used for debugging, testing, and style persistence.
 */

export type StyleObject = Record<string, boolean>

/**
 * Serialize a style object to a string representation.
 * 
 * The output is a space-separated list of class names, sorted alphabetically.
 * Only truthy values are included.
 * 
 * @example
 * serializeStyle({ 'cu-button': true, 'is-disabled': true, 'bg-primary': true })
 * // → "bg-primary cu-button is-disabled"
 * 
 * @param style - The style object to serialize
 * @returns A string representation of the style
 */
export function serializeStyle(style: StyleObject): string {
  if (!style || typeof style !== 'object') {
    return ''
  }
  
  return Object.keys(style)
    .filter(key => style[key] === true)
    .sort()
    .join(' ')
}

/**
 * Parse a serialized style string back to a style object.
 * 
 * @example
 * parseStyle("bg-primary cu-button is-disabled")
 * // → { 'bg-primary': true, 'cu-button': true, 'is-disabled': true }
 * 
 * @param str - The serialized style string
 * @returns A style object
 */
export function parseStyle(str: string): StyleObject {
  if (!str || typeof str !== 'string') {
    return {}
  }
  
  const result: StyleObject = {}
  
  str
    .split(' ')
    .filter(cls => cls.length > 0)
    .forEach(cls => {
      result[cls] = true
    })
  
  return result
}

/**
 * Check if two style objects are equivalent.
 * 
 * Two style objects are equivalent if they have the same truthy keys.
 * 
 * @param a - First style object
 * @param b - Second style object
 * @returns True if the style objects are equivalent
 */
export function stylesEqual(a: StyleObject, b: StyleObject): boolean {
  const aKeys = Object.keys(a).filter(k => a[k] === true).sort()
  const bKeys = Object.keys(b).filter(k => b[k] === true).sort()
  
  if (aKeys.length !== bKeys.length) {
    return false
  }
  
  return aKeys.every((key, index) => key === bKeys[index])
}

/**
 * Convert a style object to a CSS class string for use in Vue templates.
 * 
 * This is an alias for serializeStyle, provided for convenience.
 * 
 * @param style - The style object
 * @returns A space-separated class string
 */
export function toClassString(style: StyleObject): string {
  return serializeStyle(style)
}
