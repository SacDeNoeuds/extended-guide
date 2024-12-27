import { handleGreet, greetRoute } from './greet-handler'
import { serveH3NodeApp } from './h3-adapter'

async function createServer() {
  const port = 6600
  await serveH3NodeApp({
    port,
    handlers: [{ route: greetRoute, handle: handleGreet }],
  })
  console.info('Server listening on port', port)
}

createServer().catch(console.error)
