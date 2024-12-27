/** @jsxImportSource hono/jsx */
import { RouteHandler } from './handle-route'
import { HtmlRoute } from '../definition/html-route'
import * as x from 'unhoax'
import { delay } from '@/utils/delay'

export const greetRoute = {
  method: 'GET',
  path: '/hello/:name',
  params: x.object({
    name: x.literal('John', 'Michelle'),
  }),
} as const satisfies HtmlRoute
type GreetRoute = typeof greetRoute

export const greetHandler: RouteHandler<GreetRoute> = {
  handle: async ({ params }) => {
    await delay(500) // mimic DB access.
    return {
      status: 200,
      body: <div style="color: blue">Hello, {params.name}</div>,
    }
  },
  handleInvalidParams: async (error) => {
    return {
      status: 400,
      body: (
        <div style="color: red">
          Invalid name, expected "John" or "Michelle"
        </div>
      ),
    }
  },
}
