/* @jsxImportSource hono/jsx */
import { respondWith } from '@/server-first/definition/response'
import { Authenticate } from '../authenticate'
import { GroceryList, GroceryListRepository } from '../grocery-list'
import { HandlerBuilder } from '../handler-builder'
import { Html } from '../components/Html'
import { UnorderedGroceryLists } from '../components/UnorderedGroceryLists'
import { GroceryListForm } from '../components/GroceryListForm'

type Ports = {
  authenticate: Authenticate<GroceryList['memberId']>
  listGroceryLists: GroceryListRepository['listByMemberId']
}

export function makeHomeHandler(ports: Ports) {
  return HandlerBuilder.get('/').handleWith(async ({ headers }) => {
    const member = await ports.authenticate(headers)

    const groceryLists = await ports.listGroceryLists(member.id)

    return respondWith.html(
      <Html>
        <UnorderedGroceryLists groceryLists={groceryLists} />
        <GroceryListForm action="/create-list" submitLabel="Create" />
      </Html>,
    )
  })
}
