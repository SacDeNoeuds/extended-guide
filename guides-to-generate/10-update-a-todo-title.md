# Rename a todo title

## Updating the `TodoPageModel`

We can leverage a generic `patchTodo` action and use for both toggling a todo and changing a todo’s title:

<!-- include [code:ts] ./10-update-a-todo-title/TodoPageModel.ts -->

## Updating the React components

Now let’s update our `TodoCheckboxList` component to add an input:

<!-- include [code:tsx] ./10-update-a-todo-title/react/TodoCheckboxList.tsx -->

## Updating the Vue components

Same, let’s update our `TodoCheckboxList` component to add an input:

<!-- include [code:vue] ./10-update-a-todo-title/vue/TodoCheckboxList.vue -->

---

Next step: [delete a todo](./11-delete-a-todo.md)
