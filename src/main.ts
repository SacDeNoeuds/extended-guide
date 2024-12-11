import { AppRenderer, createAppModel } from './models/AppModel'
import { apiDefaults } from './setup/Api'
import { effect } from './setup/Signal'

apiDefaults.preflightDelayInMs = 1000
const appRendererSelect = document.getElementById('app-renderer') as HTMLSelectElement | null
if (!appRendererSelect) throw new Error('pff, no select really?')


appRendererSelect.value = 'react'
const appModel = createAppModel(appRendererSelect.value as AppRenderer)

appRendererSelect.addEventListener('change', () => {
  appModel.renderer.set(appRendererSelect.value as AppRenderer)
})

const rootNode = document.getElementById('root')
if (!rootNode) throw new Error('where is my root??')

const renderer: Record<AppRenderer, () => Promise<void>> = {
  react: async () => {
    const [React, ReactDOM, { App }] = await Promise.all([
      import('react'),
      import('react-dom/client'),
      import('./steps/step-6-react/App'),
    ])
    const root = ReactDOM.createRoot(rootNode)
    root.render(React.createElement(App, { model: appModel }))
  },
  vue: async () => {
    const [{ createApp }, { default: App }] = await Promise.all([
      import('vue'),
      import('./steps/step-7-vue/App.vue')
    ])
    const app = createApp(App, { model: appModel })
    app.mount(rootNode)
  },
  solid: async () => {
    console.info('render Solid app')
  },
}
  
effect(() => {
  const target = appModel.renderer.get()
  requestAnimationFrame(() => {
    rootNode.replaceChildren()
    const render = renderer[target]
    requestAnimationFrame(() => {
      render()
    })
  })
})
