/** @jsxImportSource hono/jsx */
import { delay } from '@/utils/delay'
import { HandlerBuilder } from './handler-builder'

export const greetHandler = HandlerBuilder.get('/hello/:name').handleWith(
  async ({ params }) => {
    await delay(150) // mimic DB access.

    return {
      status: 200,
      body: <div style="color: blue">Hello, {params.name}</div>,
      headers: { 'x-server': 'Test' },
    }
  },
)
