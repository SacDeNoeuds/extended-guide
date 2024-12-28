import { makeFakeAuthenticate } from './authenticate'
import { makeHomeHandler } from './get/home'
import { makeGroceryListInMemoryRepository } from './grocery-list-in-memory-repo'
import { createH3NodeServer } from './h3-adapter'
import { makeArchiveGroceryListHandler } from './post/archive-grocery-list'
import { makeCreateGroceryListHandler } from './post/create-grocery-list'

async function createServer() {
  const port = 6600
  const authenticate = makeFakeAuthenticate()
  const repository = makeGroceryListInMemoryRepository()

  await createH3NodeServer({
    port,
    handlers: [
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
    ],
  })
  console.info('Server listening on port', port)
}

createServer().catch(console.error)
