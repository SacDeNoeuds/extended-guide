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
import { x } from 'unhoax'
import { Branded } from 'path/to/branded'
import { castAs } from '@/domain/cast-as'

export type ItemName = Branded<string, 'ItemName'>

export const itemNameSchema = pipe(
  x.string,
  x.size({ min: 1, max: 70, reason: 'ItemNameSize' }), // avoid all infinity problems
  x.map(castAs<string, ItemName>),
)

// Now I can validate my boundaries:
const itemName = itemNameSchema.parse('Pastas')
itemName // { success: true, value: ItemName }
```

## `ItemQuantity` constraints using schemas

```ts
import pipe from 'just-pipe'
import { x } from 'unhoax'
import { Branded } from 'path/to/branded'
import { castAs } from '@/domain/cast-as'

export type ItemQuantity = Branded<number, 'ItemQuantity'>

export const itemQuantitySchema = pipe(
  x.number,
  x.min(0.01, 'ItemQuantity'),
  x.map(castAs<number, ItemQuantity>),
)

// Now I can validate my boundaries:
const quantity = itemQuantitySchema.parse(12)
quantity // { success: true, value: ItemQuantity }
```

## Can I do better?

Now I incorporated a schema library into my system. It’s no drama, but I can do better. There is an emerging standard called [Standard Schema](https://standardschema.dev/), it allows to use any library implementing this standard and make them interchangeable.
