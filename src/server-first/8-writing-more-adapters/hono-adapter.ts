import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { ServerAdapter } from '../7-grocery-list-project/server-adapter'

// See https://hono.dev/docs/getting-started/nodejs
export const createHonoNodeServer: ServerAdapter = ({ handlers, port }) => {
  const app = new Hono()

  for (const { handle, ...route } of handlers) {
    const routerFn = route.method === 'GET' ? app.get : app.post

    routerFn.bind(app)(route.path, async (c) => {
      return handle({
        body: await c.req.parseBody(),
        headers: new Headers(c.req.header()),
        params: c.req.param(),
        query: c.req.query(),
      })
    })
  }

  return new Promise<unknown>((resolve) => {
    serve({ fetch: app.fetch, port }, resolve)
  })
}
