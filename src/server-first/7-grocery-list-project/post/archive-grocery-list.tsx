/* @jsxImportSource hono/jsx */
import { respondWith } from '@/server-first/definition/response'
import { Authenticate } from '../authenticate'
import { GroceryList, GroceryListRepository } from '../grocery-list'
import { HandlerBuilder } from '../handler-builder'

type Ports = {
  authenticate: Authenticate<GroceryList['memberId']>
  archiveGroceryList: GroceryListRepository['archive']
}

export function makeArchiveGroceryListHandler(ports: Ports) {
  return HandlerBuilder.post('/archive-list/:listName').handleWith(
    async ({ cookies, params }) => {
      const member = await ports.authenticate(cookies)

      await ports.archiveGroceryList(member.id, params.listName)

      return respondWith.seeOther('/')
    },
  )
}
