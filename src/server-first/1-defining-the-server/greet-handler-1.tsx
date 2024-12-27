/** @jsxImportSource hono/jsx */
import { delay } from '@/utils/delay'
import { HtmlRoute } from '../definition/html-route'
import { HandleRoute } from './handle-route'

export const greetRoute = {
  method: 'GET',
  path: '/hello/:name',
} as const satisfies HtmlRoute
type GreetRoute = typeof greetRoute

export const handleGreet: HandleRoute<GreetRoute> = async ({ params }) => {
  await delay(150) // mimic DB access.
  return {
    status: 200,
    body: <div style="color: blue">Hello, {params.name}</div>,
  }
}
