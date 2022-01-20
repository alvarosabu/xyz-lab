import { App } from 'vue'
import '/@/styles/main.css'
import 'virtual:windi.css'
import '@purge-icons/generated'

const modules = import.meta.globEager('./components/**/*.vue')
const components = Object.entries(modules)

// Export the components as a plugin
export default {
  // options is an array of components to be registered
  // e.g. ['c-button', 'c-modal']
  install(app: App, options: any) {
    console.log(modules)
    if (typeof options === 'undefined') {
      for (let [key, value] of components) {
        app.component(
          key.replace(/^.*[\\\/]/, '').replace('.vue', ''),
          value.default,
        )
      }
    } else {
      if (!(options instanceof Array)) {
        throw new TypeError('options must be an array')
      }

      for (let [key, value] of components) {
        const componentName = key.replace(/^.*[\\\/]/, '').replace('.vue', '')
        // register only components specified in the options
        if (options.includes(componentName)) {
          app.component(componentName, value.default)
        }
      }
    }
  },
}
