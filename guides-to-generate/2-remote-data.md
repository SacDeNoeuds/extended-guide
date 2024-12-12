# The remote data concept

## First Approach

Let’s consider our list of `Todo`. Its fetch state can be represented as:

```ts
type RemoteTodo = 'pending' | Error | Todo[]
```

This works perfectly, let’s make it generic:

```ts
type RemoteData<T> = 'pending' | Error | T

type RemoteTodo = RemoteData<Todo[]> // ✅
```

Okay, but now it is flawed. What happens if we do:
```ts
type ApprovalStatus = 'pending' | 'approved'
type Test = RemoteData<ApprovalStatus>
// type Test = 'pending' | Error | 'approved'
```

Therefore we need to be more specific.

## Refining the definition

Since we are here, there are other problems:
- the `pending` state might take some `progress`
- we might trigger the action later and not at the start (form submission for instance), therefore it will not be `pending` straight away but something like `notSent` or `initial`.

We can leverage a discriminated union for that:
<!-- include [code:ts] ./setup/RemoteData.ts -->

The final type could still be polished a bit, it is good enough for the demo.

To go further, the pending state could have a `stale` value for instance, in case of refetching data.

---

Now that we have our beautiful type, we will need our state to _evolve_ over time. Our states will transition to
```
initial -> pending -> (failure (Error) | success (T)) -> pending (refetch) -> …
```

There goes the [reactivity system](./3-reactivity-system.md) 🙌
