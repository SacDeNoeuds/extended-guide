import { defineConfig } from 'vitepress'

const isGithubActions = process.env.GITHUB_ACTIONS === 'true'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Model View Demo',
  description: 'A series on how to model-view to stay free any framework',
  srcDir: './guides',
  base: isGithubActions ? '/model-view-demo/' : undefined,
  outDir: './docs',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'GitHub',
        link: 'https://github.com/SacDeNoeuds/model-view-demo',
      },
    ],

    sidebar: [
      {
        text: 'Setup',
        items: [{ text: 'The Json Placeholder API', link: '/1-json-api.html' }],
      },
      {
        text: 'Defining the models',
        items: [
          { text: 'The RemoteData concept', link: '/2-remote-data.html' },
          { text: 'The reactivity system', link: '/3-reactivity-system.html' },
          { text: 'The RemoteAction concept', link: '/4-remote-action.html' },
          { text: 'Defining our AppModel', link: '/5-app-model.html' },
        ],
      },
      {
        text: 'Rendering the AppModel',
        items: [
          { text: 'With React components', link: '/6-react-app.html' },
          { text: 'With Vue components', link: '/7-vue-app.html' },
          {
            text: 'Rendering the React & Vue apps',
            link: '/8-rendering-the-apps.html',
          },
        ],
      },
      {
        text: 'Adding Features',
        items: [
          { text: 'Toggle a todo', link: '/9-toggle-a-todo.html' },
          { text: 'Update a todo title', link: '/10-update-a-todo-title.html' },
          { text: 'Delete a todo', link: '/11-delete-a-todo.html' },
        ],
      },
      {
        text: 'Modularization',
        items: [{ text: 'Forms 🚧', link: '/12-forms.html' }],
      },
    ],

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/SacDeNoeuds/model-view-demo',
      },
    ],
  },
})
