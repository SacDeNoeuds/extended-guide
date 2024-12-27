/** @jsxImportSource hono/jsx */
import { delay } from '@/utils/delay'
import { HtmlRoute } from '../definition/html-route'
import { RouteHandler } from './handle-route'

export const greetRoute = {
  method: 'GET',
  path: '/hello',
} as const satisfies HtmlRoute
type GreetRoute = typeof greetRoute

export const greetHandler: RouteHandler<
  GreetRoute,
  { name: 'John' | 'Michelle' }
> = {
  handle: async ({ context }) => {
    await delay(500) // mimic DB access.
    return {
      status: 200,
      body: <div style="color: blue">Hello, {context.name}</div>,
    }
  },
}
