# Redefining our models

## Grocery list

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
```

## Member

```ts
import type { Branded } from '…'

export interface Member {
  id: MemberId
  name: MemberName
}
export type MemberId = Branded<string, 'MemberId'>
export type MemberName = Branded<string, 'MemberName'>
```

<details>
  <summary>Domain-Driven Design Definitions</summary>

> [!TIP]
> DDD definitions: If you crossed the concepts of "value object" and "entity" and did not get the difference, here it is:
>
> 1. Value objects: `ListName`, `ItemName`, `ItemQuantity`… -> 2 list names are equal if their values are equal. ListName "toto" === ListName "toto".
> 2. Entities: `GroceryList`, `Member`. -> 2 members are identical if their `memberId` is the same. Entities have cycles, they evolve over time.

</details>
