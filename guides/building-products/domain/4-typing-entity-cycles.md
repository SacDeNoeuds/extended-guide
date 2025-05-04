# Encoding entity cycles in the type system

A grocery list can be archived or active.

These cycles _can_ – and **should** – be represented in the type system. For instance here, I will represent an `ActiveGroceryList` and an `ArchivedGroceryList`.

This will help me to constrain certain behaviors and prevent invalid operations like archiving an already archived list. Just using the type system. Convinced? Let’s go:

## Encoding the `GroceryList` cycles in the type system

<!-- include [code:ts] ./domain/4-typing-entity-cycles/grocery-list.ts -->

## More complex stuff – the cycles of a trip

Let’s say my company allows your users to create trips, which my will sell and operate on their behalf. According to the business, here’s the flow:

1. Brief (collect trip info)
2. Launch (sell, marketing)
3. Operate (manage guests, departures, arrivals, etc.)
4. Done (collect feedback on how the trip went).

### Step 1: Typing our entities according to their stages

In TypeScript, to enumerate different non-overlapping types, we use **unions** and **discriminants**. Here I will use the discriminant `stage` to differentiate the different status we can have.

<!-- include [code:ts] ./domain/4-typing-entity-cycles/trip.ts -->

### Step 2: Representing this flow using our staged entities

<!-- include [code:ts] ./domain/4-typing-entity-cycles/trip-behavior.ts -->

### Step 3: Testing our type-encoded stages

<!-- include [code:ts] ./domain/4-typing-entity-cycles/trip-tests.ts -->

🎉 Type-safety at its maximum.
