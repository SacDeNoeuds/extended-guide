/** @jsxImportSource hono/jsx */
import { delay } from '@/utils/delay'
import { HandlerBuilder } from './handler-builder'
import { respondWith } from '../definition/response'

export const getGreetHandler = HandlerBuilder.get('/hello/:name').handleWith(
  async ({ params }) => {
    await delay(150) // mimic DB access.

    return respondWith.html(<div style="color: blue">Hello, {params.name}</div>)
  },
)
