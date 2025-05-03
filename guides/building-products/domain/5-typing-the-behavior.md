# Typing the behavior

This is becoming interesting.

Now that we encoded our entity cycles in the [type system](./4-typing-entity-cycles.md), we can define the possible behaviors ; our business logic.

## Managing the grocery list directly

```ts
// See? Creating a grocery list will always return me an ActiveGroceryList.
export function createGroceryList(
  name: ListName,
  memberId: MemberId,
): ActiveGroceryList { … }

// Here, I apparently allow renaming any grocery list, archived or active.
export function renameGroceryList(
  list: GroceryList,
  newName: ListName,
): GroceryList { … }

// As mentioned, I can only archived an active grocery list.
export function archiveGroceryList(
  list: ActiveGroceryList,
): ArchivedGroceryList {…}
//
```

## Managing grocery list members

```ts
/**
 * Likely via a invitation link.
 * Only active lists are considered, why joining an archived one?
 */
export function joinGroceryList = (
  list: ActiveGroceryList,
  memberId: MemberId,
): ActiveGroceryList { … }

/** One can exit active or archived lists, it does not matter */
export function exitGroceryList(
  list: GroceryList,
  memberId: MemberId,
): GroceryList { … }
```

## Adding items to our grocery list

```ts
// The list needs to be active to receive updates
export function addGroceryListItem(
  groceryList: ActiveGroceryList,
  itemName: ItemName,
  quantity: ItemQuantity,
): ActiveGroceryList { … }

/**
 * The list needs to be active to receive updates
 * Set the `newQuantity` to 0 to remove an item
 */
export function editGroceryListItemQuantity(
  groceryList: ActiveGroceryList,
  itemName: ItemName,
  newQuantity: ItemQuantity,
): ActiveGroceryList {…}
```

## Taking a step back

If you noticed, it is all completely synchronous. I do not need a persistence layer to express my system’s behavior.

> [!NOTE]
> From a DDD standpoint, the collection of these synchronous use-cases corresponds to the **aggregate root** of my `GroceryList`.
