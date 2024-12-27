/** @jsxImportSource hono/jsx */
import { delay } from '@/utils/delay'
import * as x from 'unhoax'
import { HandlerBuilder } from './handler-builder'

export const greetHandler = HandlerBuilder.post('/hello')
  .body({ name: x.literal('John', 'Michelle') }, () => ({
    status: 400,
    body: <div style="color: red">Name must be “John” or “Michelle”</div>,
  }))
  .handleWith(async ({ body }) => {
    await delay(150) // mimic DB access.

    return {
      status: 200,
      body: <div style="color: blue">Hello, {body.name}</div>,
    }
  })