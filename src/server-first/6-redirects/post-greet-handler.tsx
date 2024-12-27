/** @jsxImportSource hono/jsx */
import { delay } from '@/utils/delay'
import { HtmlRoute } from '../definition/html-route'
import { RouteHandler } from './handle-route'

export const postGreetRoute = {
  method: 'POST',
  path: '/hello/:name',
} as const satisfies HtmlRoute
type PostGreetRoute = typeof postGreetRoute

export const postGreetHandler: RouteHandler<PostGreetRoute> = {
  handle: async ({ params }) => {
    await delay(500) // mimic DB access.
    return {
      status: 303,
      location: `/hello/${params.name}`,
    }
  },
}
