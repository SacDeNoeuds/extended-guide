import {
  ActiveGroceryList,
  ArchivedGroceryList,
  GroceryList,
  ItemName,
  ItemQuantity,
  ListName,
} from './grocery-list'
import { MemberId } from './member'

export type CreateList = (
  name: ListName,
  memberId: MemberId,
) => ActiveGroceryList

export type RenameList = (
  list: ActiveGroceryList,
  newName: ListName,
) => GroceryList
export type ArchiveList = (list: ActiveGroceryList) => ArchivedGroceryList

// managing membership
/**
 * Likely via a invitation link.
 * Only active lists are considered, why joining an archived one?
 */
export type JoinList = (
  list: ActiveGroceryList,
  memberId: MemberId,
) => ActiveGroceryList

/** One can exit active or archived lists, it does not matter */
export type ExitList = (list: GroceryList, memberId: MemberId) => GroceryList

// managing items
export type AddListItem = (
  list: ActiveGroceryList,
  itemName: ItemName,
  quantity: ItemQuantity,
) => ActiveGroceryList

/** Set the `newQuantity` to 0 to remove an item */
export type EditListItemQuantity = (
  list: ActiveGroceryList,
  itemName: ItemName,
  newQuantity: ItemQuantity,
) => ActiveGroceryList
