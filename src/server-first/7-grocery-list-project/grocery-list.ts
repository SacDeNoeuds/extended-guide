export type MemberId = string // FIXME: use branded type
export type ListName = string // FIXME: use branded type
export type ItemName = string // FIXME: use branded type

export interface GroceryList {
  memberId: MemberId
  name: ListName
  items: Map<ItemName, { quantity: number }>
}

export interface GroceryListRepository {
  listByMemberId: (memberId: MemberId) => Promise<GroceryList[]>
  archive: (memberId: MemberId, name: ListName) => Promise<void>
  create: (memberId: MemberId, name: ListName) => Promise<GroceryList>
}
