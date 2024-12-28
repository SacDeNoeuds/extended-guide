/* @jsxImportSource hono/jsx */
import { respondWith } from '../definition/response'
import { Html } from './components/Html'

export type Authenticate<Id> = (
  cookies: Record<string, string>,
) => Promise<{ id: Id }>

export function makeFakeAuthenticate(): Authenticate<string> {
  return async function fakeAuthenticate(cookies) {
    const { id } = cookies
    if (id) return { id }

    throw respondWith.status(401).html(
      <Html>
        <p>You are not authenticated</p>
      </Html>,
    )
  }
}
