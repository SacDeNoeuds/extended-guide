import { getHelloWorld, getHelloWorldRoute } from './get-hello-world'
import { serveH3NodeApp } from './h3-adapter'

async function createServer() {
  const port = 6600
  await serveH3NodeApp({
    port,
    handlers: [{ route: getHelloWorldRoute, handle: getHelloWorld }],
  })
  console.info('Server listening on port', port)
}

createServer().catch(console.error)
