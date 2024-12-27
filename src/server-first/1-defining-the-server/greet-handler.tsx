/** @jsxImportSource hono/jsx */
import { HandleRoute } from './handle-route'
import { HtmlRoute } from '../definition/html-route'
import { delay } from '@/utils/delay'

export const greetRoute = {
  method: 'GET',
  path: '/hello/:name',
} as const satisfies HtmlRoute
type GreetRoute = typeof greetRoute

export const handleGreet: HandleRoute<GreetRoute> = async ({ params }) => {
  await delay(500) // mimic DB access.
  return {
    status: 200,
    body: <div style="color: blue">Hello, {params.name}</div>,
  }
}
