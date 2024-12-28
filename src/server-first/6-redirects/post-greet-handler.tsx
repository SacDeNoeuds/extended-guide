/** @jsxImportSource hono/jsx */
import { delay } from '@/utils/delay'
import { HandlerBuilder } from './handler-builder'
import { respondWith } from '../definition/response'

export const postGreetHandler = HandlerBuilder.post('/hello/:name').handleWith(
  async ({ params, ...input }) => {
    await delay(150) // mimic DB access.

    return respondWith.seeOther(`/hello/${params.name}`)
  },
)
