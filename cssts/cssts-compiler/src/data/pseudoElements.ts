import pseudoClassesJson from "./css-pseudo-classes.json"
import pseudoElementsJson from "./css-pseudo-elements.json"

export const csstsPseudoClasses: Set<string> = new Set(pseudoClassesJson.pseudoClasses.map(item => item.name))
export const csstsPseudoElements: Set<string> = new Set(pseudoElementsJson.pseudoElements.map(item => item.name))