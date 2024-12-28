import {
  GroceryList,
  GroceryListRepository,
  ListName,
  MemberId,
} from './grocery-list'

export function makeGroceryListInMemoryRepository(): GroceryListRepository {
  const store = new Map<`${MemberId} ${ListName}`, GroceryList>()

  return {
    async listByMemberId(memberId) {
      return [...store.values()].filter((list) => list.memberId === memberId)
    },
    async archive(memberId, name) {
      store.delete(`${memberId} ${name}`)
    },
    async create(memberId, name) {
      const list = store.get(`${memberId} ${name}`)
      if (list) throw new Error(`List ${name} already exists`)
      const groceryList: GroceryList = {
        memberId,
        name,
        items: new Map(),
      }
      store.set(`${memberId} ${name}`, groceryList)
      return groceryList
    },
  }
}
