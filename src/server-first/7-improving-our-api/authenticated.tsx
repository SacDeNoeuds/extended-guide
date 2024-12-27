/* @jsxImportSource hono/jsx */
import { defineMiddleware } from './define-middleware'
import * as x from 'unhoax'

export function makeAuthenticated<Token>(schema: x.Schema<Token>) {
  return defineMiddleware<{ token: Token }>(async ({ headers }) => {
    const data = schema.parse(headers.get('Authorization'))
    if (data.success) return { status: 'OK', value: { token: data.value } }
    return {
      status: 401,
      body: <div style="color: red">We don’t know you…</div>,
    }
  })
}
