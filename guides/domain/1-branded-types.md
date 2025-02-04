# First – trivial – attempt

So we want to model a grocery list. What do we know? Let’s start with the behavior:

1. I want to be able to create a list. Even multiple ones. They should have a name I can identify (as human). I can use that list for my home, for my work, for my holidays, etc.
2. I need to be able to share a specific list with peers, my partner, my family, my friends.
3. I need to add items to the list, then remove them when shopped.
4. I need to be able to archive a list when done.
5. Eventually, I would like to know who added what and when, and who shopped what and when. In short: tracing.

Great, things are a bit clearer now. Let’s start modeling our entities, and more importantly the behaviors:

```ts
// grocery-list.ts
export interface GroceryList {
  id: string // id for machines – readonly
  name: string // id for humans – editable
  archivedAt: Date | undefined
  items: Map<string, number> // Map<ItemName, ItemQuantity>
  memberIds: Set<string> // Set<MemberId>
}

// member.ts
export interface Member {
  id: string
  name: string
  email: string
}

/**
 * Sign in and Sign up are equivalent.
 * In case of sign up, the text before the email’s `@` is used as name.
 */
export type SignInWithMagicLink = (link: URL) => Promise<Member>
export type SendMagicLinkToSignIn = (email: string) => Promise<void>

export type ChangeMemberName = (
  id: Member['id'],
  newName: Member['name'],
) => Promise<Member>
```

## Flaws, flaws everywhere – The problems of simple types

Properties of type `string` are all considered identical by the compiler. Same for `number`, `Date`, etc.<br>
But is an item name equivalent to a list name, or to a member name? Absolutely not.<br>
Do they have the same constraints (length, casing, integer/float range, …) ? Probably not either.

## Branded types

A branded type is a way to increase specificity on primitives, it serves 3 purposes:

1. **Readability**: you no longer manipulate simple `string`s or `number`s but a `ListName`, `ItemName` or `ItemQuantity`. Those concepts are different and represented as such.
2. **Guarantee** that the type is correct and has been verified, usually at our system’s boundaries (API route handler or client for instance).
3. **Hints**: a branded type only exist in our safe domain world we defined, where every behavior is intended and predictable.

```ts
import type { Branded } from '…'

type ListName = Branded<string, 'ListName'>
type ItemName = Branded<string, 'ItemName'>

declare const listName: ListName
declare const itemName: ItemName

listName === itemName // fails -> "the types have no overlap"
```

## Redefining the models using branded types

```ts
import type { Branded } from '…'

export interface GroceryList {
  id: ListId
  name: ListName
  archivedAt: ArchivedAt
  items: Map<ItemName, ItemQuantity>
  memberIds: Set<MemberId>
}

export type ListId = Branded<string, 'ListId'>
export type ListName = Branded<string, 'ListName'>
export type ArchivedAt = Branded<Date, 'ArchivedAt'>
export type ItemName = Branded<string, 'ItemName'>
export type ItemQuantity = Branded<number, 'ItemQuantity'>

export interface Member {
  id: MemberId
  name: MemberName
}
export type MemberId = Branded<string, 'MemberId'>
export type MemberName = Branded<string, 'MemberName'>
```

> [!NOTE]
> DDD definitions: If you crossed the concepts of "value object" and "entity" and did not get the difference, here it is:
>
> 1. Value objects: `ListName`, `ItemName`, `ItemQuantity`… -> 2 list names are equal if their values are equal. ListName "toto" === ListName "toto".
> 2. Entities: `GroceryList`, `Member`. -> 2 members are identical if their `memberId` is the same. Entities have cycles, they evolve over time.

The cycles I am referring to _can_ – and **should** – be represented. For instance here, I will represent an `ActiveGroceryList` and an `ArchivedGroceryList`. That way I will be able.

## Modeling entity cycle

Take back the `GroceryList` concept. I have 2 versions of it which **cannot coexist**: `Active` and `Archived`. It cannot be both "archived" and "active".

```ts
export interface ActiveGroceryList {
  …
}
export interface ArchivedGroceryList extends ActiveGroceryList {
  archivedAt: Date // it becomes required
}
export type GroceryList = ActiveGroceryList | ArchivedGroceryList
```

… and we have a problem. Because TypeScript uses **structural typing**, `ActiveGroceryList` will be forbidden when `ArchivedGroceryList` is expected, but not the other way around:

```ts
declare function archiveList(list: ActiveGroceryList): ArchivedGroceryList

declare const archivedList: ArchivedGroceryList
archiveList(archivedList) // passing, but it should not !
```

To overcome this, we usually apply a **discriminant** – I tend to use `kind`:

```ts
export interface ActiveGroceryList {
  kind: 'ActiveGroceryList'
  …
}
export interface ArchivedGroceryList extends Omit<ActiveGroceryList, 'kind'> {
  kind: 'ArchivedGroceryList'
  archivedAt: Date
}

declare function archiveList(list: ActiveGroceryList): ArchivedGroceryList

declare const archivedList: ArchivedGroceryList
archiveList(archivedList) // now it fails 💪
```

> [!TIP]
> Always use the type name as discriminant content.<br>
> ie: if your type is `PremiumMember`, favor `kind: 'PremiumMember'` over anything else.

## Modeling the _behavior_

The most interesting part of our business logic. Below I will express my entities cycles.

```ts
// managing the list
export type CreateList = (
  name: ListName,
  memberId: MemberId,
) => ActiveGroceryList

export type RenameList = (
  list: ActiveGroceryList,
  newName: ListName,
) => GroceryList

export type ArchiveList = (list: ActiveGroceryList) => ArchivedGroceryList

// managing membership
/**
 * Likely via a invitation link.
 * Only active lists are considered, why joining an archived one?
 */
export type JoinList = (
  list: ActiveGroceryList,
  memberId: MemberId,
) => ActiveGroceryList

/** One can exit active or archived lists, it does not matter */
export type ExitList = (list: GroceryList, memberId: MemberId) => GroceryList

// managing items
export type AddListItem = (
  id: ListId,
  itemName: ItemName,
  quantity: ItemQuantity,
) => GroceryList

/** Set the `newQuantity` to 0 to remove an item */
export type EditListItemQuantity = (
  id: ListId,
  itemName: ItemName,
  newQuantity: ItemQuantity,
) => GroceryList
```

If you noticed, it is all completely synchronous. I do not need a persistence layer to express my system’s behavior.

> [!NOTE]
> From a DDD standpoint, the collection of these synchronous use-cases corresponds to the **aggregate root** of my `GroceryList`.

---

Next I will dive into the other side of the same coin: specifying constraints.
