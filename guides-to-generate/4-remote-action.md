## Remote Action

The concept on top of [`RemoteData`](./2-remote-data.md) and [reactivity](./3-reactivity-system.md).

Let’s define it first.

By taking an async function (the action), it should:
- be able to trigger the action.
- hold the state of the action (remote data + reactivity).

By expressing it this way, we can dive into implementation:

<!-- include [code:ts] ./setup/RemoteAction.ts -->

To make sure it behaves as we expect, let’s write a test:

<!-- include [code:ts] ./setup/RemoteAction.spec.ts -->

Aaand there we go, that was quick. If we test it with our API:

```ts
const getTodo = JsonPlaceholderFetchApi.getTodo.bind(JsonPlaceholderFetchApi)
const action = createRemoteAction(getTodo)

const action: RemoteAction<Todo, [todoId: number]>
// 🎉
```

---

Okay, we have everything we need to get started on our project 🎉.

Let’s dive into the [app model](./5-app-model.md)
