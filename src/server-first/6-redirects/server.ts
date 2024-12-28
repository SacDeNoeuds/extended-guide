import { createH3NodeServer } from './h3-adapter'
import { getGreetHandler } from './get-greet-handler'
import { postGreetHandler } from './post-greet-handler'

async function createServer() {
  const port = 6600

  await createH3NodeServer({
    port,
    handlers: [getGreetHandler, postGreetHandler],
  })
  console.info('Server listening on port', port)
}

createServer().catch(console.error)
