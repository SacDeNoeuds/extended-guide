/** @jsxImportSource hono/jsx */
import { GroceryList } from '../grocery-list'

type Props = {
  groceryLists: GroceryList[]
}
export function UnorderedGroceryLists({ groceryLists }: Props) {
  return groceryLists.length === 0 ? (
    <div>You don’t have any list yet.</div>
  ) : (
    <ul class="grocery-lists">
      {groceryLists.map((groceryList) => (
        <li>
          {groceryList.name} ({groceryList.items.size} items) &nbsp;
          <form
            method="post"
            action={`/archive-list/${groceryList.name}`}
            style="display: inline"
          >
            <button>Archive</button>
          </form>
        </li>
      ))}
    </ul>
  )
}
