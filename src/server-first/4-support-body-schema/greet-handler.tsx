/** @jsxImportSource hono/jsx */
import { delay } from '@/utils/delay'
import { x } from 'unhoax'
import { respondWith } from '../definition/response'
import { HandlerBuilder } from './handler-builder'

export const greetHandler = HandlerBuilder.post('/hello')
  .body({ name: x.literal('John', 'Michelle') }, () => {
    return respondWith
      .status(400)
      .html(<div style="color: red">Name must be “John” or “Michelle”</div>)
  })
  .handleWith(async ({ body }) => {
    await delay(150) // mimic DB access.

    return respondWith.html(<div style="color: blue">Hello, {body.name}</div>)
  })
