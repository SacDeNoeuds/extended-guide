# The `Vue` App

## The reactivity system adapter – `signalRef`

Because our `AppModel` is defined using our [reactivity system](./3-reactivity-system.md), we need to adapt it to Vue. Vue relies on the `ref` concept, so let’s adapt our signal:

<!-- include [code:ts] ./spa-client-side/7-vue-app/signalRef.ts -->

As you can see, the adapter is quite simple.

## The `App` component

We will adapt the `route` signal to a Vue state, and handle both cases `NotFound` and `TodoListPage`.

<!-- include [code:vue] ./spa-client-side/7-vue-app/App.vue -->

## The `TodoPage` component

We will adapt the `todos` signal to a React state, and display the remote list of todos, leveraging a yet-to-create `<RemoteData />` component.

<!-- include [code:vue] ./spa-client-side/7-vue-app/TodoPage.vue -->

## The `TodoUnorderedList` component

This one is purely presentational, nothing much to say:

<!-- include [code:vue] ./spa-client-side/7-vue-app/TodoUnorderedList.vue -->

## And finally, the `RemoteData` component

This one is key for readability, it also enables the possibility to handle all the errors at a dedicated place, while still allowing customization.

<!-- include [code:vue] ./spa-client-side/7-vue-app/RemoteData.vue -->

---

Excellent, everything is in place. We can now [render these apps](./8-rendering-the-apps.md) 😁
