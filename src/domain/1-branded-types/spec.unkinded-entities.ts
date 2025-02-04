export interface ActiveGroceryList {
  id: string
}
export interface ArchivedGroceryList extends ActiveGroceryList {
  archivedAt: Date | null
}

declare function archiveList(list: ActiveGroceryList): ArchivedGroceryList

declare const archivedList: ArchivedGroceryList
archiveList(archivedList) // passing, but it should not !
