import { getGreetHandler, getGreetRoute } from './get-greet-handler'
import { serveH3NodeApp } from './h3-adapter'
import { postGreetHandler, postGreetRoute } from './post-greet-handler'

async function createServer() {
  const port = 6600
  await serveH3NodeApp({
    port,
    router: [
      { route: getGreetRoute, handler: getGreetHandler },
      { route: postGreetRoute, handler: postGreetHandler },
    ],
  })
  console.info('Server listening on port', port)
}

createServer().catch(console.error)
