# Real-world journey

That was all very theoretical, let’s confront it to a more realistic world.

Let’s take back our grocery list and add 3 features:

- Creating a grocery list
- Listing grocery lists
- Deleting a grocery list

Those 3 features will consist of a home page with a list for which each item will have an "archive" button, and a form to add a new grocery list.<br>
In terms of handlers, that means:

1. `GET /` to display the home page
2. `POST /create-list` to create a new grocery list
3. `POST /archive-list/:listName` to archive a grocery list – we can only use HTML form methods, thus no `DELETE`.

For demo purposes, I will cheat regarding the authentication and use the query parameter `memberId` when getting the home page.

## Defining the domain

Here it is quite simple, I will settle for just one file:

<!-- include [code:ts] ./server-first/7-grocery-list-project/grocery-list.ts -->

<details>
<summary>I also wrote an in-memory repository to get us started</summary>

<!-- include [code:ts] ./server-first/7-grocery-list-project/grocery-list-in-memory-repo.ts -->

</details>

## Home page

<!-- include [code:tsx] ./server-first/7-grocery-list-project/get/home.tsx -->

## Create grocery list handler

<!-- include [code:tsx] ./server-first/7-grocery-list-project/post/create-grocery-list.tsx -->

## Archive grocery list handler

<!-- include [code:tsx] ./server-first/7-grocery-list-project/post/archive-grocery-list.tsx -->

## End-to-End Testing

```sh
npx tsx ./src/server-first/7-grocery-list-project/server.ts
```

Let’s test our handlers, head to http://localhost:6600/?memberId=John

It looks like it all works like a charm 😘

## Curious about the components?

There you go:

<details>
<summary>UnorderedGroceryLists.tsx</summary>

<!-- include [code:tsx] ./server-first/7-grocery-list-project/components/UnorderedGroceryLists.tsx -->

</details>

<details>
<summary>GroceryListForm.tsx</summary>

<!-- include [code:tsx] ./server-first/7-grocery-list-project/components/GroceryListForm.tsx -->

</details>

<details>
<summary>Html.tsx</summary>

<!-- include [code:tsx] ./server-first/7-grocery-list-project/components/Html.tsx -->

</details>
