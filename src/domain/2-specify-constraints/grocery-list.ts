import { Branded } from '../branded'
import { MemberId } from './member'
import * as x from 'unhoax'

export interface GroceryList {
  id: ListId
  name: ListName
  items: Map<ItemName, ItemQuantity>
  memberIds: Set<MemberId>

  state: State
}
type State = ActiveState | ArchivedState
type ActiveState = { name: 'active' }
type ArchivedState = { name: 'archived'; date: Date }

export interface ActiveGroceryList extends Omit<GroceryList, 'state'> {
  state: ActiveState
}
export interface ArchivedGroceryList extends Omit<GroceryList, 'state'> {
  state: ArchivedState
}

export type ListId = Branded<string, 'ListId'>
export type ListName = Branded<string, 'ListName'>
export type ArchivedAt = Branded<Date, 'ArchivedAt'>
export type ItemName = Branded<string, 'ItemName'>
export type ItemQuantity = Branded<number, 'ItemQuantity'>

const activeStateSchema = x.object<ActiveState>({ name: x.literal('active') })

const activeListSchema = x.object<ActiveGroceryList>({
  id: listIdSchema,
  listName: listNameSchema,
  items: x.Map(itemNameSchema, itemQuantitySchema),
  memberIds: x.Set(memberIdSchema),
  state: activeStateSchema,
})
