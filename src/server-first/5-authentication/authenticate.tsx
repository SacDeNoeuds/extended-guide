/* @jsxImportSource hono/jsx */
import * as x from 'unhoax'
import { respondWith } from '../definition/response'

export type Authenticate<Name> = (headers: Headers) => Promise<{ name: Name }>

export function makeAuthenticate<Name>(
  schema: x.Schema<Name>,
): Authenticate<Name> {
  return async function authenticate(headers) {
    const name = schema.parse(headers.get('Authorization'))
    if (name.success) return { name: name.value }
    throw respondWith
      .status(401)
      .html(<div style="color: red">We don’t know you…</div>)
  }
}
