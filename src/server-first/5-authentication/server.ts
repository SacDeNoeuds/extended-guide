import { authenticated } from './authenticated'
import { greetHandler, greetRoute } from './greet-handler'
import { serveH3NodeApp } from './h3-adapter'
import * as x from 'unhoax'

async function createServer() {
  const port = 6600
  const johnOrMichelle = x.literal('John', 'Michelle')
  await serveH3NodeApp({
    port,
    router: [
      {
        route: greetRoute,
        // handler: greetHandler, // fails, context is not `{}`
        // handler: authenticated(x.literal('John', 'Jack'), greetHandler), // fails, the handler requires names to be 'Michelle' or 'John'
        handler: authenticated(johnOrMichelle, greetHandler),
      },
    ],
  })
  console.info('Server listening on port', port)
}

createServer().catch(console.error)
