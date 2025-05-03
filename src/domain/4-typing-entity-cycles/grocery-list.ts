type ArchivedStatus = { state: 'archived'; date: Date }
type ActiveStatus = { state: 'active' }

export interface GroceryList {
  id: string
  // …
  status: ArchivedStatus | ActiveStatus
}

export type ArchivedGroceryList = GroceryList & { status: ArchivedStatus }
export type ActiveGroceryList = GroceryList & { status: ActiveStatus }

// Let’s try it:
declare function archiveList(list: ActiveGroceryList): ArchivedGroceryList

declare const archivedList: ArchivedGroceryList
archiveList(archivedList) // fails: Type '"archived"' is not assignable to type '"active"'

declare const activeList: ActiveGroceryList
const result = archiveList(activeList) // passes
result // ArchivedGroceryList
