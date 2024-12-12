# The `AppModel`

## The `AppModel` first definition

We want to display the list of todos, let’s call it the `TodoPage`. So we will have 2 app routes: one for "not-found" and the other for the todo page. We will be able to add some over time very easily.

<!-- include [code:ts] ./5-app-model/AppModel-attempt-1.ts -->

## The `TodoPageModel` definition

Apparently, our app will need such a model, so let’s define it.

We know we will want to display a fetched list of todos.

And to display such a list, we will use the `JsonPlaceholderApi`.

<!-- include [code:ts] ./5-app-model/TodoPageModel.ts -->

## Going back to the `AppModel` to implement it

<!-- include [code:ts] ./5-app-model/AppModel.ts -->

---

Great, now that we have our app model defined and implemented, let’s display it !

We can start with [React](./6-react-app.md) then [Vue](./7-vue-app.md)
