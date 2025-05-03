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

Finally, it **prevents accidental comparisons**: In our case, before branding my types, I was able to compare `listName` and `itemName` because both are strings, which is would be a particularly suspicious to do, right?

Now that this specificity is enforced via the TypeScript type system, any comparison will be raised by TS:

```ts
import type { Branded } from '…'

type ListName = Branded<string, 'ListName'>
type ItemName = Branded<string, 'ItemName'>

declare const listName: ListName
declare const itemName: ItemName

listName === itemName // fails -> "the types have no overlap"
```

---

Next I will dive into the other side of the same coin: specifying constraints.
