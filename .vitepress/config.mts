import { defineConfig, HeadConfig } from 'vitepress'

const isGithubActions = process.env.GITHUB_ACTIONS === 'true'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  head: [
    isGithubActions && [
      'script',
      {
        'data-goatcounter': 'https://sacdenoeuds.goatcounter.com/count',
        'async': 'true',
        'src': '//gc.zgo.at/count.js',
      },
    ],
  ].filter(Boolean) as HeadConfig[],
  title: 'Extended Guide',
  description: 'A series on how to model-view to stay free any framework',
  srcDir: './dist/guides',
  base: isGithubActions ? '/extended-guide/' : undefined,
  outDir: './dist/website',
  // ignore dead links because I point out to http://localhost:6600 at some point…
  ignoreDeadLinks: true,
  themeConfig: {
    nav: [
      { text: 'Back to basics', link: '/back-to-basics/' },
      {
        text: 'Building a library',
        link: '/building-libraries/',
      },
      {
        text: 'Building a product',
        link: '/building-products/designing-a-resilient-system/',
      },
      { text: 'server-first', link: '/building-products/server-first/' },
      { text: 'local-first', link: '/building-products/spa-client-side/' },
      {
        text: 'GitHub',
        link: 'https://github.com/SacDeNoeuds/extended-guide',
      },
    ],

    sidebar: [
      {
        text: 'Back to basics',
        link: '/back-to-basics/',
        items: [
          {
            text: 'What is a feature?',
            link: '/back-to-basics/1-what-is-a-feature.html',
          },
          {
            text: 'What is a user story?',
            link: '/back-to-basics/2-what-is-a-user-story.html',
          },
          {
            text: 'What should I test?',
            link: '/back-to-basics/3-what-should-i-test.html',
          },
          {
            text: 'What is a bug?',
            link: '/back-to-basics/4-what-is-a-bug.html',
          },
          {
            text: 'What is documentation?',
            link: '/back-to-basics/5-what-is-documentation.html',
          },
        ],
      },
      {
        text: 'Building a library',
        link: '/building-libraries/',
        items: [
          {
            text: 'Documenting & Testing',
            link: '/building-libraries/documenting-and-testing.html',
          },
        ],
      },
      {
        text: 'Building a product',
        items: [
          {
            text: 'Designing a resilient system',
            link: '/building-products/designing-a-resilient-system/',
            items: [
              {
                text: 'What is technology',
                link: '/building-products/designing-a-resilient-system/1-what-is-technology.html',
              },
              {
                text: 'The cost of technical choices',
                link: '/building-products/designing-a-resilient-system/2-technical-choices.html',
              },
              {
                text: 'How to choose dependencies',
                link: '/building-products/designing-a-resilient-system/3-how-to-choose-dependencies.html',
              },
            ],
          },
          {
            text: 'Domain Modeling',
            link: '/building-products/domain/',
            items: [
              {
                text: 'Branded types',
                link: '/building-products/domain/1-branded-types.html',
              },
              {
                text: 'Refining the models',
                link: '/building-products/domain/2-refining-the-models.html',
              },
              {
                text: 'Specifying constraints',
                link: '/building-products/domain/3-specifying-constraints.html',
              },
              {
                text: 'Typing entity cycles',
                link: '/building-products/domain/4-typing-entity-cycles.html',
              },
              {
                text: 'Adding the persistence layer',
                link: '/building-products/domain/5-adding-the-persistence-layer.html',
              },
              {
                text: 'Documenting for business',
                link: '/building-products/domain/6-documenting-for-business.html',
              },
              {
                text: 'Documenting for developers',
                link: '/building-products/domain/7-documenting-for-developers.html',
              },
            ],
          },
          {
            text: 'Server First',
            link: '/building-products/server-first/',
            items: [
              {
                text: 'Defining the server',
                link: '/building-products/server-first/1-defining-the-server.html',
              },
              {
                text: 'Support path schema',
                link: '/building-products/server-first/2-support-path-schema.html',
              },
              {
                text: 'Support query schema',
                link: '/building-products/server-first/3-support-query-schema.html',
              },
              {
                text: 'Support body schema',
                link: '/building-products/server-first/4-support-body-schema.html',
              },
              {
                text: 'Authentication',
                link: '/building-products/server-first/5-authentication.html',
              },
              {
                text: 'Redirects',
                link: '/building-products/server-first/6-redirects.html',
              },
              {
                text: 'Grocery List Project',
                link: '/building-products/server-first/7-grocery-list-project.html',
              },
              {
                text: 'Writing more adapters',
                link: '/building-products/server-first/8-writing-more-adapters.html',
              },
              {
                text: 'Going Further',
                link: '/building-products/server-first/9-going-further.html',
              },
            ],
          },
          {
            text: 'Local First',
            link: '/building-products/spa-client-side/',
            items: [
              {
                text: 'Setup',
                items: [
                  {
                    text: 'The Todo API',
                    link: '/building-products/spa-client-side/1-todo-api.html',
                  },
                ],
              },
              {
                text: 'Defining the models',
                items: [
                  {
                    text: 'The RemoteData concept',
                    link: '/building-products/spa-client-side/2-remote-data.html',
                  },
                  {
                    text: 'The reactivity system',
                    link: '/building-products/spa-client-side/3-reactivity-system.html',
                  },
                  {
                    text: 'The RemoteAction concept',
                    link: '/building-products/spa-client-side/4-remote-action.html',
                  },
                  {
                    text: 'Defining our AppModel',
                    link: '/building-products/spa-client-side/5-app-model.html',
                  },
                ],
              },
              {
                text: 'Rendering the AppModel',
                items: [
                  {
                    text: 'With React components',
                    link: '/building-products/spa-client-side/6-react-app.html',
                  },
                  {
                    text: 'With Vue components',
                    link: '/building-products/spa-client-side/7-vue-app.html',
                  },
                  {
                    text: 'Rendering the React & Vue apps',
                    link: '/building-products/spa-client-side/8-rendering-the-apps.html',
                  },
                ],
              },
              {
                text: 'Adding Features',
                items: [
                  {
                    text: 'Toggle a todo',
                    link: '/building-products/spa-client-side/9-toggle-a-todo.html',
                  },
                  {
                    text: 'Update a todo title',
                    link: '/building-products/spa-client-side/10-update-a-todo-title.html',
                  },
                  {
                    text: 'Delete a todo',
                    link: '/building-products/spa-client-side/11-delete-a-todo.html',
                  },
                ],
              },
              {
                text: 'Modularization',
                items: [
                  {
                    text: 'Forms 🚧',
                    link: '/building-products/spa-client-side/12-forms.html',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        text: 'Small bits',
        items: [
          {
            text: 'Non-violable states',
            link: '/small-bits/2025-05-03-non-violable-states.html',
          },
        ],
      },
    ],

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/SacDeNoeuds/extended-guide',
      },
    ],
  },
})
