# Rename a todo title

## Updating the `TodoPageModel`

We can leverage a generic `patchTodo` action and use for both toggling a todo and changing a todo’s title:

<!-- diff-between [code:ts] ./10-update-a-todo-title/TodoPageModel.ts ./9-toggle-todo/TodoPageModel.ts -->

## Updating the React components

Now let’s update our `TodoCheckboxList` component to add an input:

<!-- diff-between [code:tsx] ./10-update-a-todo-title/react/TodoCheckboxList.tsx ./9-toggle-todo/react/TodoCheckboxList.tsx -->

## Updating the Vue components

Same, let’s update our `TodoCheckboxList` component to add an input:

<!-- diff-between [code:vue] ./10-update-a-todo-title/vue/TodoCheckboxList.vue ./9-toggle-todo/vue/TodoCheckboxList.vue -->

---

Next step: [delete a todo](./11-delete-a-todo.md)
