/** @jsxImportSource hono/jsx */
import { delay } from '@/utils/delay'
import { HandlerBuilder } from './handler-builder'
import { respondWith } from '../definition/response'

export const greetHandler = HandlerBuilder.get('/hello/:name').handleWith(
  async ({ params }) => {
    await delay(150) // mimic DB access.

    return respondWith
      .headers({ 'x-server': 'Test' })
      .html(<div style="color: blue">Hello, {params.name}</div>)
  },
)
