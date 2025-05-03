# React App

## The reactivity system adapter – `useSignal`

Because our `AppModel` is defined using our [reactivity system](./3-reactivity-system.md), we need to adapt it to React:

<!-- include [code:ts] ./spa-client-side/6-react-app/useSignal.ts -->

As you can see, the adapter is quite simple.

Now we will dive further and further in the app component tree, starting from the top:

## The `App` component

We will adapt the `route` signal to a React state, and handle both cases `NotFound` and `TodoListPage`.

<!-- include [code:tsx] ./spa-client-side/6-react-app/App.tsx -->

## The `TodoPage` component

We will adapt the `todos` signal to a React state, and display the remote list of todos, leveraging a yet-to-create `<RemoteData />` component.

<!-- include [code:tsx] ./spa-client-side/6-react-app/TodoPage.tsx -->

## The `TodoUnorderedList` component

This one is purely presentational, nothing much to say:

<!-- include [code:tsx] ./spa-client-side/6-react-app/TodoUnorderedList.tsx -->

## And finally, the `RemoteData` component

This one is key for readability, it also enables the possibility to handle all the errors at a dedicated place, while still allowing customization.

<!-- include [code:tsx] ./spa-client-side/6-react-app/RemoteData.tsx -->

---

Great, we our React app, let’s implement the [Vue equivalent](./7-vue-app.md).
