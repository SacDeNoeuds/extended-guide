import express from 'express'
import bodyParser from 'body-parser'
import { ServerAdapter } from '../7-grocery-list-project/server-adapter'
import { IncomingHttpHeaders } from 'http'
import { ReadableStream } from 'node:stream/web'

// See http://expressjs.com/en/5x/api.html
export const createExpressNodeServer: ServerAdapter = ({ handlers, port }) => {
  const app = express()
  app.use(bodyParser.urlencoded({ extended: true }))

  for (const { handle, ...route } of handlers) {
    const routerFn = route.method === 'GET' ? app.get : app.post

    routerFn.bind(app)(route.path, async (req, res) => {
      const response = await handle({
        body: req.body,
        headers: getHeadersFromIncomingHttpHeaders(req.headers),
        params: req.params,
        query: req.query,
      })
      response.headers.forEach((value, name) => res.setHeader(name, value))
      response.body
        ? res.status(response.status).send(await response.text())
        : res.sendStatus(response.status)
    })
  }

  return new Promise<void>((resolve) => {
    app.listen(port, resolve)
  })
}

function getHeadersFromIncomingHttpHeaders(incoming: IncomingHttpHeaders) {
  const headers = new Headers()
  Object.entries(incoming).forEach(([name, value]) => {
    const values = Array.isArray(value) ? value : [value]
    values.forEach((value) => {
      if (value) headers.append(name, value)
    })
  })
  return headers
}
