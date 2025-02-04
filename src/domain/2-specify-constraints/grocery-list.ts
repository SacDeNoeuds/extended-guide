import { Branded } from '../branded'
import { MemberId } from './member'
import * as x from 'unhoax'

export type GroceryList = ActiveGroceryList | ArchivedGroceryList

export interface ActiveGroceryList {
  kind: 'ActiveGroceryList'

  id: ListId
  name: ListName
  items: Map<ItemName, ItemQuantity>
  memberIds: Set<MemberId>
}

export interface ArchivedGroceryList extends Omit<ActiveGroceryList, 'kind'> {
  kind: 'ArchivedGroceryList'
  archivedAt: ArchivedAt
}

export type ListId = Branded<string, 'ListId'>
export type ListName = Branded<string, 'ListName'>
export type ArchivedAt = Branded<Date, 'ArchivedAt'>
export type ItemName = Branded<string, 'ItemName'>
export type ItemQuantity = Branded<number, 'ItemQuantity'>

const activeListSchema = x.object<ActiveGroceryList>({
  kind: x.literal('ActiveGroceryList'),
  id: listIdSchema,
  listName: listNameSchema,
  items: x.Map(itemNameSchema, itemQuantitySchema),
  memberIds: x.Set(memberIdSchema),
})
