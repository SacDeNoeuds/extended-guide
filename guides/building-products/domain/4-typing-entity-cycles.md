# Encoding entity cycles in the type system

A grocery list can be archived or active.

These cycles _can_ – and **should** – be represented in the type system. For instance here, I will represent an `ActiveGroceryList` and an `ArchivedGroceryList`.

This will help me (later) to accept only certain behaviors and prevent invalid operations like archiving an already archived list. Just using the type system. Convinced? Let’s go:

## Encoding the `GroceryList` cycles in the type system

Let’s add some `status` property to our `GroceryList`.

In TypeScript, to enumerate different non-overlapping types, we use **unions** and **discriminants**. Here I will use the discriminant `state` to differentiate the different status we can have.

<!-- include [code:ts] ./domain/4-typing-entity-cycles/grocery-list.ts -->

## More complex stuff – the cycles of a trip

Let’s say my company allows your users to create trips, which my will sell and operate on their behalf. According to the business, here’s the flow:

1. Brief (collect trip info)
2. Launch (sell, marketing)
3. Operate (manage guests, departures, arrivals, etc.)
4. Done (collect feedback on how the trip went).

The trip can be archived at `Brief` and `Launch` but not after.

Our type system can represent this flow:

<!-- include [code:ts] ./domain/4-typing-entity-cycles/trip.ts -->

Let’s test our type-encoded stages:

<!-- include [code:ts] ./domain/4-typing-entity-cycles/trip-tests.ts -->

Boom! Type-safety at its maximum 😎.
