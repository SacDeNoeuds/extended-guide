import { createExpressNodeServer } from './express-adapter'
import { makeHandlers } from './handlers'
import { createHapiNodeServer } from './hapi-adapter'
import { createHonoNodeServer } from './hono-adapter'

async function createServers() {
  const handlers = makeHandlers()
  await Promise.all([
    createHonoNodeServer({ port: 6001, handlers }),
    createExpressNodeServer({ port: 6002, handlers }),
    createHapiNodeServer({ port: 6003, handlers }),
  ])
  console.info(`Hono    server listening on http://localhost:6001`)
  console.info(`Express server listening on http://localhost:6002`)
  console.info(`Hapi    server listening on http://localhost:6003`)
}

createServers().catch(console.error)
