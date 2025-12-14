/**
 * Button Component Export
 * 
 * Exports the Button component and related types.
 */

import Button from './Button.ovs'
import type { App } from 'vue'

// Export component
export { Button }
export default Button

// Export types
export * from './button'
export * from './use-button'

// Install function for Vue.use()
export const CuButton = Object.assign(Button, {
  install: (app: App) => {
    app.component('CuButton', Button)
  }
})
