/**
 * CssTs Runtime Type Definitions
 */

/** Style object - a record of class names to boolean values */
export type StyleObject = Record<string, boolean>

/** CssTs Runtime Interface */
export interface CsstsRuntime {
  /**
   * Merge multiple style objects into one
   */
  $cls(...styles: (StyleObject | false | null | undefined)[]): StyleObject
  
  /**
   * Replace a CSS property value in a style object
   */
  replace(target: string | StyleObject, oldAtomOrProp: string, newAtom: string): string | StyleObject
  
  /**
   * Batch replace CSS property values
   */
  replaceAll(target: string | StyleObject, replacements: Record<string, string>): string | StyleObject
  
  /**
   * Get CSS class name from atom name
   */
  getCssClassName(atomName: string): string
  
  /**
   * Get CSS property from atom name
   */
  getCssProperty(atomName: string): string | undefined
}

export type { CsstsRuntime }
