# Toggle a Todo

## Updating the `TodoPageModel`

### Adding the `toggleTodo` action

We can add a `toggleTodo` action on our `TodoPageModel`:

<!-- diff [code:ts] ./spa-client-side/9-toggle-todo/TodoPageModel-attempt-1.ts ./spa-client-side/5-app-model/TodoPageModel.ts -->

### Updating the list upon toggle-todo-success

Great, now let’s update the list upon toggle-todo-success:

<!-- diff [code:ts] ./spa-client-side/9-toggle-todo/TodoPageModel.ts ./spa-client-side/9-toggle-todo/TodoPageModel-attempt-1.ts -->

## Updating the React components

Now instead of an unordered list, we will render a checkbox list:

<!-- diff [code:tsx] ./spa-client-side/9-toggle-todo/react/TodoCheckboxList.tsx ./spa-client-side/6-react-app/TodoUnorderedList.tsx -->

Let’s update our `TodoPage` component to render a checkbox list:

<!-- diff [code:tsx] ./spa-client-side/9-toggle-todo/react/TodoPage.tsx ./spa-client-side/6-react-app/TodoPage.tsx -->

## Updating the Vue components

The checkbox list components:

<!-- diff [code:vue] ./spa-client-side/9-toggle-todo/vue/TodoCheckboxList.vue ./spa-client-side/7-vue-app/TodoUnorderedList.vue -->

The `TodoPage` component:

<!-- diff [code:vue] ./spa-client-side/9-toggle-todo/vue/TodoPage.vue ./spa-client-side/7-vue-app/TodoPage.vue -->

---

Next step: [update a todo title](./10-update-a-todo-title.md)
