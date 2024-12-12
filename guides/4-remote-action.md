## Remote Action

The concept on top of [`RemoteData`](./2-remote-data.md) and [reactivity](./3-reactivity-system.md).

Let’s define it first.

By taking an async function (the action), it should:
- be able to trigger the action.
- hold the state of the action (remote data + reactivity).

By expressing it this way, we can dive into implementation:

```ts
// src/setup/RemoteAction.ts

import { RemoteData } from "./RemoteData"
import { createSignal, Signal } from "./Signal"

export interface RemoteAction<T, Args extends any[] = []> {
  data: Signal<RemoteData<T>>
  trigger: (...args: Args) => Promise<void>
}

export function createRemoteAction<T, Args extends any[]>(
  action: (...args: Args) => Promise<T>,
): RemoteAction<T, Args> {
  const data = createSignal<RemoteData<T>>({ state: "initial" })
  return {
    data,
    async trigger(...args) {
      data.set({ state: "pending" })
      return action(...args)
        .then((value) => data.set({ state: "success", value }))
        .catch((error) => data.set({ state: "failure", error }))
    },
  }
}
```

To make sure it behaves as we expect, let’s write a test:

```ts
// src/setup/RemoteAction.spec.ts

import { describe, expect, it } from 'vitest'
import { createRemoteAction } from './RemoteAction'

describe('createRemoteAction', () => {
  it('starts as initial', () => {
    const action = createRemoteAction(() => Promise.resolve([]))
    expect(action.data.get()).toEqual({ state: 'initial' })
  })

  it('turns to "pending" when fetching', async () => {
    let resolve = () => {}
    const action = createRemoteAction(() => {
      return new Promise<void>((r) => {
        resolve = r
      })
    })
    action.trigger()
    expect(action.data.get()).toEqual({ state: 'pending' })
    resolve()
  })
  
  it('reports failures', async () => {
    const error = new Error('oops')
    const action = createRemoteAction(() => Promise.reject(error))
    await action.trigger()
    expect(action.data.get()).toEqual({ state: 'failure', error })
  })

  it('presents data', async () => {
    const data = { foo: 'bar' }
    const action = createRemoteAction(async () => data)
    await action.trigger()
    expect(action.data.get()).toEqual({ state: 'success', value: data })
  })

  it('takes arguments into account', async () => {
    const action = createRemoteAction(async (count: number) => count)
    await action.trigger(12)
    expect(action.data.get()).toEqual({ state: 'success', value: 12 })
  })
})
```

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
