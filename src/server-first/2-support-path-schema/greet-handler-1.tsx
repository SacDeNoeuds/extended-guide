/** @jsxImportSource hono/jsx */
import { delay } from '@/utils/delay'
import { HandleRoute } from '../1-defining-the-server/handle-route'
import { HtmlRoute } from '../definition/html-route'
import * as x from 'unhoax'

export const greetRoute = {
  method: 'GET',
  path: '/hello/:name',
  params: x.object({
    name: x.literal('John', 'Michelle'),
  }),
} as const satisfies HtmlRoute
type GreetRoute = typeof greetRoute

export const handleGreet: HandleRoute<GreetRoute> = async ({ params }) => {
  await delay(500) // mimic DB access.
  return {
    status: 200,
    body: <div style="color: blue">Hello, {params.name}</div>,
  }
}
