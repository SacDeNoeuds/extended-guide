/** @jsxImportSource hono/jsx */
import { RouteHandler } from './handle-route'
import { HtmlRoute } from '../definition/html-route'
import * as x from 'unhoax'
import { delay } from '@/utils/delay'

export const greetRoute = {
  method: 'POST',
  path: '/hello',
  body: x.object({
    name: x.literal('John', 'Michelle'),
  }),
} as const satisfies HtmlRoute
type GreetRoute = typeof greetRoute

export const greetHandler: RouteHandler<GreetRoute> = {
  handle: async ({ body }) => {
    await delay(500) // mimic DB access.
    return {
      status: 200,
      body: <div style="color: blue">Hello, {body.name}</div>,
    }
  },
  handleInvalidBody: async (error) => {
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
