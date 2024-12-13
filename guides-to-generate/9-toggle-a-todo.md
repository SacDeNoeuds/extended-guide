# Toggle a Todo

## Model

We can add a `toggleTodo` action on our `TodoPageModel`:

<!-- diff-between [code:ts] ./9-toggle-todo/TodoPageModel-attempt-1.ts ./5-app-model/TodoPageModel.ts -->

Great, now let’s update the list upon toggle-todo-success:

<!-- diff-between [code:ts] ./9-toggle-todo/TodoPageModel.ts ./9-toggle-todo/TodoPageModel-attempt-1.ts -->

## Updating the React components

Now instead of an unordered list, we will render a checkbox list:

<!-- include [code:tsx] ./9-toggle-todo/react/TodoCheckboxList.tsx -->

Let’s update our `TodoPage` component to render a checkbox list:

<!-- include [code:tsx] ./9-toggle-todo/react/TodoPage.tsx -->

## Updating the Vue components

The checkbox list components:

<!-- include [code:vue] ./9-toggle-todo/vue/TodoCheckboxList.vue -->

The `TodoPage` component:

<!-- include [code:vue] ./9-toggle-todo/vue/TodoPage.vue -->

---

Next step: [update a todo title](./10-update-a-todo-title.md)