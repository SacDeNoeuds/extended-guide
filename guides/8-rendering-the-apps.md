# Rendering our React & Vue apps

## The HTML

I will use an HTML select to choose between Vue & React, and re-render upon select change.

```html
// src/index.html

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Model View Demo</title>
  <link rel="stylesheet" href="./main.css">
</head>
<body>
  <header>
    <label>
      App Renderer:&nbsp;
      <select id="app-renderer" value="vue">
        <option value="react">React</option>
        <option value="vue">Vue</option>
        <option value="solid" disabled>Solid</option>
      </select>
    </label>
    <span>·</span>
    <label>
      Api Preflight Delay:&nbsp;
      <select id="api-delay">
        <option value="0">None</option>
        <option value="100">100ms</option>
        <option value="500">500ms</option>
        <option value="1000">1s</option>
      </select>
    </label>
  </header>

  <main>
    <div id="root"></div>
  </main>

  <footer>
    <span>Made with ❤️ by</span><a href="https://github.com/SacDeNoeuds">SacDeNoeuds</a>
  </footer>
  <script type="module" src="./main.ts"></script>
</body>
</html>
```

## The rendering process

We will create a function for each engine: React & Vue, and another one to switch between the engines.

```ts
// src/render-app-8.ts

import { makeAppModel } from './5-app-model/AppModel'
import { JsonPlaceholderFetchApi } from './setup/Api.fetch'

const rootNode = document.getElementById('root') as HTMLElement
if (!rootNode) throw new Error('where is my root??')

const appModel = makeAppModel(JsonPlaceholderFetchApi)

export async function renderApp(kind: string) {
  // clear the root node
  rootNode.replaceChildren()

  switch (kind) {
    case "react":
      return renderReactApp()
    case "vue":
      return renderVueApp()
    default:
      throw new Error(`unknown app kind "${kind}"`)
  }
}

async function renderReactApp() {
  const [React, ReactDOM, { App }] = await Promise.all([
    import("react"),
    import("react-dom/client"),
    import("./6-react-app/App"),
  ])
  const root = ReactDOM.createRoot(rootNode)
  root.render(React.createElement(App, { model: appModel }))
}

async function renderVueApp() {
  const [{ createApp }, { default: App }] = await Promise.all([
    import('vue'),
    import('./7-vue-app/App.vue')
  ])
  const app = createApp(App, { model: appModel })
  app.mount(rootNode)
}
```

## The entry point – main.ts

Now our main is very simple: we get the value from the select and render the corresponding app.

When the select value changes, we re-render the app.

```ts
// src/main.ts

import { renderApp } from "./render-app-11"
import { apiDefaults } from "./setup/Api"
// import { renderApp } from './render-app-10'
// import { renderApp } from './render-app-9'
// import { renderApp } from './render-app-8'

const selectElement = document.getElementById("app-renderer")
if (!(selectElement instanceof HTMLSelectElement)) throw new Error("mmh…")

const searchParams = new URLSearchParams(window.location.search)

// let’s enforce a default value for testing
selectElement.value = searchParams.get("renderer") ?? "vue"
selectElement.addEventListener("change", () => {
  void renderApp(selectElement.value)
})

const apiDelaySelect = document.getElementById("api-delay") as HTMLSelectElement
apiDelaySelect.value = String(apiDefaults.preflightDelayInMs)
apiDelaySelect.addEventListener("change", () => {
  apiDefaults.preflightDelayInMs = parseInt(apiDelaySelect.value)
})

void renderApp(selectElement.value)
```

## Testing the whole thing

```sh
npm start
```

Tada 🎉

---

Going further:
- [Toggle a todo](./9-toggle-a-todo.md)
- [Update a todo title](./10-update-a-todo-title.md)
- [Delete a todo](./11-delete-a-todo.md)