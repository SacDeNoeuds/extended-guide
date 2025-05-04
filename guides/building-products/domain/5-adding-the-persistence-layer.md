# Adding the persistence layer

## The repository

```ts
export interface GroceryListRepository {
  findById: (id: GroceryListId) => Promise<GroceryList | undefined>
  set: (editor: MemberId, groceryList: GroceryList) => Promise<GroceryList>

  // add more methods later, as necessary. ie:
  listActive: () => Promise<ActiveGroceryList[]>
  listArchived: () => Promise<ArchivedGroceryList[]>
}
```

## The infrastructure sandwich

### Taking back the `archiveGroceryList` example

```ts
import * as domainApi from '@/domain/grocery-list/behavior'

interface Ports {
  repository: GroceryListRepository
}

type Errors =
  | 'alreadyArchived'
  | 'groceryListNotFound'
  | 'editorIsNotMember'

type ArchiveGroceryList = (editorId: MemberId, groceryListId: GroceryListId) =>
  Promise<Result<Errors, ArchivedGroceryList>>

export function makeArchiveGroceryList(ports: Ports): ArchiveGroceryList {
  return async (editorId, groceryListId) => {
    // collect information from the infra, namely our repository
    const groceryList = await ports.repository.findById(groceryListId)

    // execute the use case logic
    if (!groceryList) return Result.failure('groceryListNotFound')
    if (!groceryList.members.has(editorId))
      return Result.failure('editorIsNotMember')
    if (groceryList.archiveDate) return Result.failure('alreadyArchived')

    const archived = domainApi.archiveList(groceryList)

    // store the result in the infra, namely our repository
    await ports.repository.set(editorId, archived)

    return Result.success(archived)
}
```

There you go :D

Here I introduced the concept of `Result`, I invite you to visit the [Railway Programming](../../small-bits/2025-05-04-railway-programming.md) post.
