import { greetHandler } from './greet-handler'
import { createH3NodeServer } from './h3-adapter'

async function createServer() {
  const port = 6600
  await createH3NodeServer({
    port,
    handlers: [greetHandler],
  })
  console.info('Server listening on port', port)
}

createServer().catch(console.error)
