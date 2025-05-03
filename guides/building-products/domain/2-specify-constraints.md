# Specifying constraints

If I take a look at `ItemName` or `ItemQuantity` from the previous example, there are going to be some constraints.

`ItemName`:

1. Non-empty. Accept 1 char though, people may have code names.
2. Max length? An item of 100+ char does not make sense. Let’s arbitrarily say `70` for now.

`ItemQuantity`:

- Positive, non-zero.
- Integers only? Maybe not, people may choose to buy 1.5 of flour, knowing it’s kg.

I could go on with the other values, but that will be long.

## `ItemName` constraints using schemas …

```ts
import pipe from 'just-pipe'
import * as x from 'unhoax'
import { Branded } from 'path/to/branded'
import { castAs } from '@/domain/cast-as'

export type ItemName = Branded<string, 'ItemName'>

export const itemQuantitySchema = pipe(
  x.number, // it could have been `x.integer`
  x.size({ min: 1, max: 70, reason: 'ItemNameSize' }),
  x.map((s) => s as ItemName), // now `s` is safe to cast.
  // or
  x.map(castAs<string, ItemName>),
)
```

## … without using schemas

Now I incorporated a schema library into my system. It’s no drama, but I can do better. What matters is that the API does not expose internals, here my schema library could be hidden from the final API:

```ts
// result.ts
export type Result<T, Err = unknown> =
  | { success: true; value: T }
  | { success: false; error: Err }

// ItemName.ts
export type ItemName = x.Branded<string, 'ItemName'>
const schema = pipe(
  x.string,
  x.size(…),
  x.map(castAt<string, ItemName>),
)

export function parseItemName(value: string): Result<ItemName> {
  const result = schema.parse(value)
  return result
  // Here the `result` is already of type `Result<ItemName>`, no need to retype it
}
// If I had to use a zod schema:
import { parseZodSchema } from '@/adapters/zod'

export function parseItemName(value: string): Result<ItemName> {
  return parseZodSchema(myZodSchema, value)
}
```

Let’s check:

```ts
import {
  type ItemName,
  parseItemName,
  /* nothing more is prompted ✅ */
} from './ItemName'
// all good!
```

## Defining the entity

Mmh. I will need that schema after all… locally. As long as my **grocery list module** does not expose schema internals, I’ll be fine:

<!-- TODO: -->

🚧
