export interface GroceryList {
  id: string
  state: State
}

type State = ActiveState | ArchivedState
type ActiveState = { name: 'active' }
type ArchivedState = { name: 'archived'; date: Date }

export interface ActiveGroceryList extends Omit<GroceryList, 'state'> {
  state: ActiveState
}
export interface ArchivedGroceryList extends Omit<GroceryList, 'state'> {
  state: ArchivedState
}

declare function archiveList(list: ActiveGroceryList): ArchivedGroceryList

declare const archivedList: ArchivedGroceryList
// @ts-expect-error
archiveList(archivedList)
