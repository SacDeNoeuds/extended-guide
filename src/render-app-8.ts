import { makeAppModel } from './5-app-model/AppModel'
import { JsonPlaceholderFetchApi } from './setup/Api.fetch'

const rootNode = document.getElementById('root') as HTMLElement
if (!rootNode) throw new Error('where is my root??')

const appModel = makeAppModel(JsonPlaceholderFetchApi)

export async function renderApp(kind: string) {
  // clear the root node
  rootNode.replaceChildren()

  switch (kind) {
    case 'react':
      return renderReactApp()
    case 'vue':
      return renderVueApp()
    default:
      throw new Error(`unknown app kind "${kind}"`)
  }
}

async function renderReactApp() {
  const [React, ReactDOM, { App }] = await Promise.all([
    import('react'),
    import('react-dom/client'),
    import('./6-react-app/App'),
  ])
  const root = ReactDOM.createRoot(rootNode)
  root.render(React.createElement(App, { model: appModel }))
}

async function renderVueApp() {
  const [{ createApp }, { default: App }] = await Promise.all([
    import('vue'),
    import('./7-vue-app/App.vue'),
  ])
  const app = createApp(App, { model: appModel })
  app.mount(rootNode)
}
