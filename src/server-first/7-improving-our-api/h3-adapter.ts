import {
  createApp,
  createRouter,
  defineEventHandler,
  getQuery,
  readBody,
  toNodeListener,
} from 'h3'
import { createServer } from 'node:http'
import { HtmlHandlerOutput, RedirectOutput, RouteHandler } from './handle-route'

export function serveH3NodeApp(options: {
  router: RouteHandler[]
  port: number
}) {
  const app = createApp({ debug: true })
  const router = createRouter()
  app.use(router) // mount the router on a base path using app.use('/base', router)

  for (const { route, ...handler } of options.router) {
    const routerFn =
      route.method === 'GET'
        ? router.get.bind(router)
        : router.post.bind(router)

    routerFn(
      route.path,
      defineEventHandler(async (event) => {
        const result = await handler.handle({
          params: event.context.params ?? {},
          query: getQuery(event),
          headers: event.headers,
          body: event.headers.has('content-type')
            ? await readBody(event)
            : undefined,
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

function makeResponse(result: HtmlHandlerOutput | RedirectOutput) {
  const headers = new Headers(result.headers)

  if (result.status === 303) {
    headers.set('Location', result.location)
    return new Response(null, { status: result.status, headers })
  }

  headers.set('content-type', 'text/html')

  return new Response(result.body.toString(), {
    status: result.status,
    headers,
  })
}
