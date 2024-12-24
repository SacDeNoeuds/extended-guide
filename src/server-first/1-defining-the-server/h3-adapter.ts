import { createApp, createRouter, defineEventHandler, readBody } from 'h3'
import { Router } from './router'
import { createServer } from 'node:http'
import { toNodeListener } from 'h3'

export function serveH3NodeApp(options: { handlers: Router; port: number }) {
  const app = createApp({ debug: true })
  const router = createRouter()
  app.use(router) // mount the router on a base path using app.use('/base', router)

  for (const handler of options.handlers) {
    // FIXME: handle POST requests.
    if (handler.route.method === 'POST') throw new Error('unimplemented')

    router.get(
      handler.route.path,
      defineEventHandler(async (event) => {
        const result = await handler.handle({
          query: {} as any, // FIXME: parse from route schema.
          headers: event.headers,
          body: undefined,
          params: event.context.params ?? {}, // FIXME: parse from route schema if defined
        })

        const headers = new Headers(result.headers)
        headers.set('content-type', 'text/html')

        const response = new Response(result.body.toString(), {
          status: result.status,
          headers,
        })

        console.info('response', response)

        return event.respondWith(response)
      }),
    )
  }

  const server = createServer(toNodeListener(app))

  return new Promise<unknown>((resolve) => {
    server.listen(options.port, () => {
      resolve(server)
    })
  })
}
