import { makeAuthenticated } from './authenticated'
import { greetHandler } from './greet-handler'
import { serveH3NodeApp } from './h3-adapter'
import * as x from 'unhoax'

async function createServer() {
  const port = 6600
  const authenticated = makeAuthenticated(x.string)

  await serveH3NodeApp({
    port,
    router: [authenticated(greetHandler)],
  })
  console.info('Server listening on port', port)
}

createServer().catch(console.error)
