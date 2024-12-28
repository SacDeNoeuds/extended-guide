/** @jsxImportSource hono/jsx */
import { delay } from '@/utils/delay'
import * as x from 'unhoax'
import { HandlerBuilder } from './handler-builder'
import { respondWith } from '../definition/response'

export const greetHandler = HandlerBuilder.get('/hello/:name')
  .params({ name: x.literal('John', 'Michelle') }, () => {
    return respondWith
      .status(400)
      .html(<div style="color: red">Name must be “John” or “Michelle”</div>)
  })
  .handleWith(async ({ params }) => {
    await delay(150) // mimic DB access.

    return respondWith.html(<div style="color: blue">Hello, {params.name}</div>)
  })
