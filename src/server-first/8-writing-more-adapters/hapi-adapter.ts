import { Server } from '@hapi/hapi'
import { ServerAdapter } from '../7-grocery-list-project/server-adapter'

// See https://hapi.dev/tutorials/
export const createHapiNodeServer: ServerAdapter = ({ port, handlers }) => {
  const server = new Server({ port })

  for (const { handle, ...route } of handlers) {
    server.route({
      method: route.method,
      path: adaptPath(route.path),
      handler: async (request, h) => {
        const response = await handle({
          body: request.payload as Record<string, any> | undefined,
          headers: new Headers(request.headers),
          params: request.params,
          query: { ...request.query },
        })

        const hapiRes = h
          .response((await response.text()) || undefined)
          .code(response.status)
        response.headers.forEach((value, name) => hapiRes.header(name, value))
        return hapiRes
      },
    })
  }

  return server.start()
}

/**
 * transforms "/todo/:id" to "/todo/{id}"
 */
function adaptPath(path: string) {
  return path.replace(/:([^/]+)/g, '{$1}')
}
