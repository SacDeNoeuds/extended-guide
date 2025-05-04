export interface GroceryList {
  id: string
  // …
  archiveDate: Date | undefined
}

export type ArchivedGroceryList = GroceryList & { archiveDate: Date }
export type ActiveGroceryList = GroceryList & { archiveDate: undefined }

// Let’s try it:
declare function archiveList(list: ActiveGroceryList): ArchivedGroceryList

declare const archivedList: ArchivedGroceryList
archiveList(archivedList) // fails: Type '"archived"' is not assignable to type '"active"'

declare const activeList: ActiveGroceryList
const result = archiveList(activeList) // passes
result // ArchivedGroceryList
