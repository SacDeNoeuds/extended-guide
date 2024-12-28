import { makeFakeAuthenticate } from '../7-grocery-list-project/authenticate'
import { makeHomeHandler } from '../7-grocery-list-project/get/home'
import { makeGroceryListInMemoryRepository } from '../7-grocery-list-project/grocery-list-in-memory-repo'
import { makeArchiveGroceryListHandler } from '../7-grocery-list-project/post/archive-grocery-list'
import { makeCreateGroceryListHandler } from '../7-grocery-list-project/post/create-grocery-list'

export function makeHandlers() {
  const authenticate = makeFakeAuthenticate('John')
  const repository = makeGroceryListInMemoryRepository()

  return [
    makeHomeHandler({
      authenticate,
      listGroceryLists: repository.listByMemberId,
    }),
    makeArchiveGroceryListHandler({
      authenticate,
      archiveGroceryList: repository.archive,
    }),
    makeCreateGroceryListHandler({
      authenticate,
      createGroceryList: repository.create,
    }),
  ]
}
