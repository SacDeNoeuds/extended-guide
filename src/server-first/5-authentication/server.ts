import * as x from 'unhoax'
import { makeAuthenticate } from './authenticate'
import { makeGreetHandler } from './greet-handler'
import { createH3NodeServer } from './h3-adapter'

async function createServer() {
  const port = 6600
  const authenticate = makeAuthenticate(x.literal('John', 'Michelle'))

  await createH3NodeServer({
    port,
    handlers: [makeGreetHandler({ authenticate })],
  })
  console.info('Server listening on port', port)
}

createServer().catch(console.error)
