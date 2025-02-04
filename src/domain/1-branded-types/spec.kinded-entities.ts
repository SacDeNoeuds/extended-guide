export interface ActiveGroceryList {
  kind: 'ActiveGroceryList'
  id: string
}
export interface ArchivedGroceryList extends Omit<ActiveGroceryList, 'kind'> {
  kind: 'ArchivedGroceryList'
  archivedAt: Date | null
}

declare function archiveList(list: ActiveGroceryList): ArchivedGroceryList

declare const archivedList: ArchivedGroceryList
// @ts-expect-error
archiveList(archivedList)
