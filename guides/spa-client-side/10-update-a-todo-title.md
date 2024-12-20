# Rename a todo title

## Updating the `TodoPageModel`

We can leverage a generic `patchTodo` action and use for both toggling a todo and changing a todo’s title:

<!-- diff [code:ts] ./spa-client-side/10-update-a-todo-title/TodoPageModel.ts ./spa-client-side/9-toggle-todo/TodoPageModel.ts -->

## Updating the React components

Now let’s update our `TodoCheckboxList` component to add an input:

<!-- diff [code:tsx] ./spa-client-side/10-update-a-todo-title/react/TodoCheckboxList.tsx ./spa-client-side/9-toggle-todo/react/TodoCheckboxList.tsx -->

## Updating the Vue components

Same, let’s update our `TodoCheckboxList` component to add an input:

<!-- diff [code:vue] ./spa-client-side/10-update-a-todo-title/vue/TodoCheckboxList.vue ./spa-client-side/9-toggle-todo/vue/TodoCheckboxList.vue -->

---

Next step: [delete a todo](./11-delete-a-todo.md)
