/* @jsxImportSource hono/jsx */
import { respondWith } from '@/server-first/definition/response'
import * as cookie from 'cookie'
import * as x from 'unhoax'
import { Authenticate } from '../authenticate'
import { GroceryListForm } from '../components/GroceryListForm'
import { Html } from '../components/Html'
import { UnorderedGroceryLists } from '../components/UnorderedGroceryLists'
import { GroceryList, GroceryListRepository } from '../grocery-list'
import { HandlerBuilder } from '../handler-builder'

type Ports = {
  authenticate: Authenticate<GroceryList['memberId']>
  listGroceryLists: GroceryListRepository['listByMemberId']
}

export function makeHomeHandler(ports: Ports) {
  return HandlerBuilder.get('/')
    .query({ memberId: x.optional(x.string) }, () => {
      throw new Error('this should not happen')
    })
    .handleWith(async ({ query, cookies }) => {
      const memberId = query.memberId || (await ports.authenticate(cookies)).id
      const groceryLists = await ports.listGroceryLists(memberId)

      const authCookie = cookie.serialize('id', memberId, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 30,
      })
      return respondWith.headers({ 'Set-Cookie': authCookie }).html(
        <Html>
          <UnorderedGroceryLists groceryLists={groceryLists} />
          <GroceryListForm action="/create-list" submitLabel="Create" />
        </Html>,
      )
    })
}
