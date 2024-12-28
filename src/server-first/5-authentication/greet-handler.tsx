/** @jsxImportSource hono/jsx */
import { delay } from '@/utils/delay'
import { HandlerBuilder } from './handler-builder'
import { Authenticate } from './authenticate'
import { respondWith } from '../definition/response'

type Ports = {
  authenticate: Authenticate<'John' | 'Michelle'>
}

export const makeGreetHandler = (ports: Ports) => {
  return HandlerBuilder.get('/hello').handleWith(async ({ headers }) => {
    // will throw if unauthenticated
    const { name } = await ports.authenticate(headers)

    await delay(150) // mimic DB access.

    return respondWith.html(<div style="color: blue">Hello, {name}</div>)
  })
}
