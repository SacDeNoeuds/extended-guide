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
      { text: 'server-first', link: '/server-first/' },
      { text: 'local-first', link: '/spa-client-side/' },
      {
        text: 'GitHub',
        link: 'https://github.com/SacDeNoeuds/extended-guide',
      },
    ],

    sidebar: [
      {
        text: 'Server First',
        items: [
          {
            text: 'Defining the server',
            link: '/server-first/1-defining-the-server.html',
          },
          {
            text: 'Support path schema',
            link: '/server-first/2-support-path-schema.html',
          },
          {
            text: 'Support query schema',
            link: '/server-first/3-support-query-schema.html',
          },
          {
            text: 'Support body schema',
            link: '/server-first/4-support-body-schema.html',
          },
          {
            text: 'Authentication',
            link: '/server-first/5-authentication.html',
          },
          {
            text: 'Redirects',
            link: '/server-first/6-redirects.html',
          },
          {
            text: 'Grocery List Project',
            link: '/server-first/7-grocery-list-project.html',
          },
          {
            text: 'Writing more adapters',
            link: '/server-first/8-writing-more-adapters.html',
          },
          {
            text: 'Going Further',
            link: '/server-first/9-going-further.html',
          },
        ],
      },
      {
        text: 'Local First',
        items: [
          {
            text: 'Setup',
            items: [
              {
                text: 'The Todo API',
                link: '/spa-client-side/1-todo-api.html',
              },
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
            items: [
              { text: 'Forms 🚧', link: '/spa-client-side/12-forms.html' },
            ],
          },
        ],
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
