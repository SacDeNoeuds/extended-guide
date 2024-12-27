import {
  createApp,
  createRouter,
  defineEventHandler,
  getQuery,
  readBody,
} from 'h3'
import { createServer } from 'node:http'
import { toNodeListener } from 'h3'
import { Router } from './router'
import { HtmlHandlerOutput } from './handle-route'

export function serveH3NodeApp(options: { router: Router; port: number }) {
  const app = createApp({ debug: true })
  const router = createRouter()
  app.use(router) // mount the router on a base path using app.use('/base', router)

  for (const { route, handler } of options.router) {
    const routerFn =
      route.method === 'GET'
        ? router.get.bind(router)
        : router.post.bind(router)

    routerFn(
      route.path,
      defineEventHandler(async (event) => {
        const uncheckedParams = event.context.params ?? {}
        const params = route.params
          ? route.params.parse(uncheckedParams)
          : ({ success: true, value: uncheckedParams } as const)

        if (!params.success)
          return makeResponse(await handler.handleInvalidParams!(params.error))

        const query = route.query
          ? route.query.parse(getQuery(event))
          : ({ success: true, value: {} } as const)

        if (!query.success)
          return makeResponse(await handler.handleInvalidQuery!(query.error))

        const body = route.body
          ? route.body.parse({ ...(await readBody(event)) })
          : ({ success: true, value: undefined } as const)

        if (!body.success)
          return makeResponse(await handler.handleInvalidBody!(body.error))

        const result = await handler.handle({
          query: query.value,
          headers: event.headers,
          body: body.value,
          params: params.value,
          context: {},
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
