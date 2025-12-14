/**
 * Icon Component Export
 * 
 * Exports the Icon component and related types.
 */

import Icon from './Icon.ovs'
import type { App } from 'vue'

// Export component
export { Icon }
export default Icon

// Export types
export * from './icon'

// Install function for Vue.use()
export const CuIcon = Object.assign(Icon, {
  install: (app: App) => {
    app.component('CuIcon', Icon)
  }
})
