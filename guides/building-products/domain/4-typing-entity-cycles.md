# Encoding entity cycles in the type system

A grocery list can be archived or active.

These cycles _can_ – and **should** – be represented in the type system. For instance here, I will represent an `ActiveGroceryList` and an `ArchivedGroceryList`.

This will help me (later) to accept only certain behaviors and prevent invalid operations like archiving an already archived list. Just using the type system. Convinced? Let’s go:

## Encoding the `GroceryList` cycles in the type system

Let’s add some `status` property to our `GroceryList`.

In TypeScript, to enumerate different non-overlapping types, we use **unions** and **discriminants**. Here I will use the discriminant `state` to differentiate the different status we can have.

<!-- include [code:ts] ./domain/4-typing-entity-cycles/grocery-list.ts -->

Boom! Type-safety at its maximum 😎.
