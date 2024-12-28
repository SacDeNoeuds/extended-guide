/* @jsxImportSource hono/jsx */

export type Authenticate<Id> = (headers: Headers) => Promise<{ id: Id }>

export function makeFakeAuthenticate<Id>(id: Id): Authenticate<Id> {
  return async function authenticate(headers) {
    return { id }
  }
}
