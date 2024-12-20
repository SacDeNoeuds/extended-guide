import { defineConfig } from 'vitepress'

const isGithubActions = process.env.GITHUB_ACTIONS === 'true'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Extended Guide',
  description: 'A series on how to model-view to stay free any framework',
  srcDir: './dist/guides',
  base: isGithubActions ? '/extended-guide/' : undefined,
  outDir: './dist/website',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/spa-client-side/' },
      {
        text: 'GitHub',
        link: 'https://github.com/SacDeNoeuds/extended-guide',
      },
    ],

    sidebar: [
      {
        text: 'Setup',
        items: [
          { text: 'The Todo API', link: '/spa-client-side/1-todo-api.html' },
        ],
      },
      {
        text: 'Defining the models',
        items: [
          {
            text: 'The RemoteData concept',
            link: '/spa-client-side/2-remote-data.html',
          },
          {
            text: 'The reactivity system',
            link: '/spa-client-side/3-reactivity-system.html',
          },
          {
            text: 'The RemoteAction concept',
            link: '/spa-client-side/4-remote-action.html',
          },
          {
            text: 'Defining our AppModel',
            link: '/spa-client-side/5-app-model.html',
          },
        ],
      },
      {
        text: 'Rendering the AppModel',
        items: [
          {
            text: 'With React components',
            link: '/spa-client-side/6-react-app.html',
          },
          {
            text: 'With Vue components',
            link: '/spa-client-side/7-vue-app.html',
          },
          {
            text: 'Rendering the React & Vue apps',
            link: '/spa-client-side/8-rendering-the-apps.html',
          },
        ],
      },
      {
        text: 'Adding Features',
        items: [
          {
            text: 'Toggle a todo',
            link: '/spa-client-side/9-toggle-a-todo.html',
          },
          {
            text: 'Update a todo title',
            link: '/spa-client-side/10-update-a-todo-title.html',
          },
          {
            text: 'Delete a todo',
            link: '/spa-client-side/11-delete-a-todo.html',
          },
        ],
      },
      {
        text: 'Modularization',
        items: [{ text: 'Forms 🚧', link: '/spa-client-side/12-forms.html' }],
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
