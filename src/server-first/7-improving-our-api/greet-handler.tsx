/* @jsxImportSource hono/jsx */
import { delay } from '@/utils/delay'
import * as x from 'unhoax'
import { defineHtmlHandler } from './define-html-handler'

const johnOrMichelle = x.literal('Michelle', 'John')

export const greetHandler = defineHtmlHandler('GET /hello/:name')
  .withParams({ name: johnOrMichelle }, async () => {
    return {
      status: 400,
      body: <div>Name must be “John” or “Michelle”</div>,
    }
  })
  .withQuery({ from: x.string }, async () => {
    return {
      status: 400,
      body: <div>Query must contain a “from”</div>,
    }
  })
  .handle<{ token: string }>(async ({ params, query, context }) => {
    await delay(500) // mimic DB access.
    return {
      status: 200,
      body: (
        <div style="color: blue">
          Hello, {params.name}. Greeting coming from {query.from}
          <small>Token: “{context.token}”</small>
        </div>
      ),
    }
  })
