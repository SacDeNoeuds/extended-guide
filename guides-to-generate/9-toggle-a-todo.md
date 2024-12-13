# Toggle a Todo

## Updating the `TodoPageModel`

### Adding the `toggleTodo` action

We can add a `toggleTodo` action on our `TodoPageModel`:

<!-- diff-between [code:ts] ./9-toggle-todo/TodoPageModel-attempt-1.ts ./5-app-model/TodoPageModel.ts -->

### Updating the list upon toggle-todo-success

Great, now let’s update the list upon toggle-todo-success:

<!-- diff-between [code:ts] ./9-toggle-todo/TodoPageModel.ts ./9-toggle-todo/TodoPageModel-attempt-1.ts -->

## Updating the React components

Now instead of an unordered list, we will render a checkbox list:

<!-- diff-between [code:tsx] ./9-toggle-todo/react/TodoCheckboxList.tsx ./6-react-app/TodoUnorderedList.tsx -->

Let’s update our `TodoPage` component to render a checkbox list:

<!-- diff-between [code:tsx] ./9-toggle-todo/react/TodoPage.tsx ./6-react-app/TodoPage.tsx -->

## Updating the Vue components

The checkbox list components:

<!-- diff-between [code:vue] ./9-toggle-todo/vue/TodoCheckboxList.vue ./7-vue-app/TodoUnorderedList.vue -->

The `TodoPage` component:

<!-- diff-between [code:vue] ./9-toggle-todo/vue/TodoPage.vue ./7-vue-app/TodoPage.vue -->

---

Next step: [update a todo title](./10-update-a-todo-title.md)
