import { greetHandler, greetRoute } from './greet-handler-2'
import { serveH3NodeApp } from './h3-adapter-2'

async function createServer() {
  const port = 6600
  await serveH3NodeApp({
    port,
    router: [{ route: greetRoute, handler: greetHandler }],
  })
  console.info('Server listening on port', port)
}

createServer().catch(console.error)
