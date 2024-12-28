/* @jsxImportSource hono/jsx */
import { respondWith } from '@/server-first/definition/response'
import pipe from 'just-pipe'
import * as x from 'unhoax'
import { Authenticate } from '../authenticate'
import { Html } from '../components/Html'
import { GroceryList, GroceryListRepository } from '../grocery-list'
import { HandlerBuilder } from '../handler-builder'

type Ports = {
  authenticate: Authenticate<GroceryList['memberId']>
  createGroceryList: GroceryListRepository['create']
}

export function makeCreateGroceryListHandler(ports: Ports) {
  return HandlerBuilder.post('/create-list')
    .body({ listName: pipe(x.string, x.nonEmpty()) }, () => {
      return respondWith.status(400).html(
        <Html>
          <div>A list name is required</div>
        </Html>,
      )
    })
    .handleWith(async ({ cookies, body }) => {
      const member = await ports.authenticate(cookies)

      await ports.createGroceryList(member.id, body.listName)

      return respondWith.seeOther('/')
    })
}
