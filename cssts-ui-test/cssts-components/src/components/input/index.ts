/**
 * Input Component Export
 * 
 * Exports the Input component and related types.
 */

import Input from './Input.ovs'
import type { App } from 'vue'

// Export component
export { Input }
export default Input

// Export types
export * from './input'
export * from './use-input'

// Install function for Vue.use()
export const CuInput = Object.assign(Input, {
  install: (app: App) => {
    app.component('CuInput', Input)
  }
})
