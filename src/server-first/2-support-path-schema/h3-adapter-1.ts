import { createApp, createRouter, defineEventHandler } from 'h3'
import { createServer } from 'node:http'
import { toNodeListener } from 'h3'
import { Router } from '../1-defining-the-server/router'
import { HtmlHandlerOutput } from './handle-route'

export function serveH3NodeApp(options: { handlers: Router; port: number }) {
  const app = createApp({ debug: true })
  const router = createRouter()
  app.use(router) // mount the router on a base path using app.use('/base', router)

  for (const { route, handle } of options.handlers) {
    // FIXME: handle POST requests.
    if (route.method === 'POST') throw new Error('unimplemented')

    router.get(
      route.path,
      defineEventHandler(async (event) => {
        const uncheckedParams = event.context.params ?? {}
        const params = route.params
          ? route.params.parse(uncheckedParams)
          : ({ success: true, value: uncheckedParams } as const)

        // What to do here??
        if (!params.success) return new Response(undefined, { status: 400 })

        const result = await handle({
          query: {} as any, // FIXME: parse from route schema.
          headers: event.headers,
          body: undefined,
          params,
        })

        return makeResponse(result)
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

function makeResponse(result: HtmlHandlerOutput) {
  const headers = new Headers(result.headers)
  headers.set('content-type', 'text/html')

  return new Response(result.body.toString(), {
    status: result.status,
    headers,
  })
}
