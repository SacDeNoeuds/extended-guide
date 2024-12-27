/** @jsxImportSource hono/jsx */
import { delay } from '@/utils/delay'
import { HtmlRoute } from '../definition/html-route'
import { RouteHandler } from './handle-route'

export const getGreetRoute = {
  method: 'GET',
  path: '/hello/:name',
} as const satisfies HtmlRoute
type GreetRoute = typeof getGreetRoute

export const getGreetHandler: RouteHandler<GreetRoute> = {
  handle: async ({ params }) => {
    await delay(500) // mimic DB access.
    return {
      status: 200,
      body: <div style="color: blue">Hello, {params.name}</div>,
    }
  },
}
