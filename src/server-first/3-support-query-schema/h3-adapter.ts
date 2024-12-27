import {
  createApp,
  createRouter,
  defineEventHandler,
  getQuery,
  readBody,
  toNodeListener,
} from 'h3'
import { createServer } from 'node:http'
import { ServerAdapter } from './server-adapter'
import { Handler, HandlerOutput } from './handler'

export const createH3NodeServer: ServerAdapter = (options: {
  handlers: Handler[]
  port: number
}) => {
  const app = createApp({ debug: true })
  const router = createRouter()

  // mount the router on a base path using app.use('/base', router)
  app.use(router)

  for (const { handle, ...route } of options.handlers) {
    const routerFn = route.method === 'GET' ? router.get : router.post

    routerFn.call(
      router, // provide `router` to unbounded router method
      route.path,
      defineEventHandler(async (event) => {
        const result = await handle({
          query: getQuery(event),
          headers: event.headers,
          body: event.headers.has('content-type')
            ? await readBody(event)
            : undefined,
          params: event.context.params ?? {},
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

function makeResponse(result: HandlerOutput) {
  const headers = new Headers(result.headers)
  headers.set('content-type', 'text/html')

  return new Response(result.body.toString(), {
    status: result.status,
    headers,
  })
}
