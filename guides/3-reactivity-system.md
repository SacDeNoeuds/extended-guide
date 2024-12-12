# The reactivity system

## Step 1 – Define an agnostic reactivity system

> [!IMPORTANT]
> Why defining an agnostic reactivity system?
> 
> Because it is the key to freedom. If you _own_ your reactivity system, you will be able to adapt it to _any framework_, making your code interoperable and highly resilient.

By _define_ the `Signal` or `State` concept, we will be in the position of swapping the implementation detail anytime. At the cost of defining ourselves the API, but in that case it is fairly trivial because there are plethora of libraries out there and even a proposal.

So here we go:
```ts
// src/./setup/Signal.ts
export interface ReadonlySignal<T> {
  get: () => T
}

export interface Signal<T> extends ReadonlySignal<T> {
  set: (value: T) => void;
  update: (updater: (value: T) => T) => void
}

type CreateSignalOptions<T> = {
  equals?: (a: T, b: T) => boolean
}

export type CreateSignal = <T>(initialValue: T, options?: CreateSignalOptions<T>) => Signal<T>

type Cleanup = () => void
type Dispose = () => void

export type Effect = (callback: () => (void | Cleanup)) => Dispose

export function computed<T>(callback: () => T): ReadonlySignal<T> {
  return {
    get: () => callback(),
  }
}

// the implementation complies to type upper.
export { effect, createSignal } from './Signal.s-js'
```

## Step 2 – writing the spec

Let’s define what our reactivity system should comply to:

```ts
// src/./setup/Signal.spec.ts
import { afterAll, describe, expect, it } from 'vitest'
import { createSignal, effect } from './Signal.s-js'

describe('Signal', () => {
  const make = (initialCount = 0) => {
    return createSignal(
      { count: initialCount },
      { equals: (a, b) => a.count === b.count }
    )
  }
  it('gets the value', () => {
    const signal = make(0)
    expect(signal.get()).toEqual({ count: 0 })
  })

  it('sets the value', () => {
    const signal = make(0)
    signal.set({ count: 1 })
    expect(signal.get()).toEqual({ count: 1 })
  })

  it('updates the value', () => {
    const signal = make(0)
    signal.update(({ count }) => ({ count: count + 1 }))
    expect(signal.get()).toEqual({ count: 1 })
  })

  describe('reactivity', () => {
    const signal = make(0)
    let value = signal.get().count
    let cleaned = false;

    const dispose = effect(() => {
      value = signal.get().count
      return () => void (cleaned = true)
    })
    signal.set({ count: 1 })
    afterAll(dispose)

    it('listens to changes', () => {
      expect(value).toBe(1)
    })
  
    it('cleans up', () => {
      expect(cleaned).toBe(true)
    })
  })

  it('works with nested conditions', () => {
    const isOpened = createSignal(false)
    const name = createSignal('John')
    let value = 'Jack'
    const dispose = effect(() => {
      if (isOpened.get()) value = name.get()
    })
    name.set('Mary')
    expect(value).toBe('Jack')
    isOpened.set(true)
    expect(value).toBe('Mary')
    name.set('Ada')
    expect(value).toBe('Ada')
    dispose()
  })
})
```

## Step 3 – The implementation

Let’s not re-invent the wheel and facade an existing library. We have a few options, especially since 2023 😅:
- [`s-js`](https://www.npmjs.com/package/s-js)
- [`@preact/signals-code`](https://www.npmjs.com/package/@preact/signals-core)
- [`solid-js`](https://www.npmjs.com/package/solid-js)
- The [polyfill](https://www.npmjs.com/package/signal-polyfill) of the [proposal](https://github.com/tc39/proposal-signals) – not production-ready

… and I am probably forgetting a ton of them.

For the sake of poetry, I will use S.js

<small>NB: one of the first to push for signals</small>

```ts
// src/./setup/Signal.s-js.ts
import S from 's-js'
import { CreateSignal, Effect } from './Signal'

export const createSignal: CreateSignal = (value, options) => {
  const signal = options?.equals ? S.value(value, options.equals) : S.data(value)
  return {
    get: signal,
    set: (nextValue) => signal(nextValue),
    update: (updater) => signal(updater(S.sample(signal)))
  }
}

export const effect: Effect = (callback) => {
  let disposeRef = () => {}
  const dispose = () => disposeRef()
  S.root((dispose) => {
    disposeRef = dispose
    S(() => {
      const cleanup = callback()
      if (typeof cleanup === 'function') S.cleanup(cleanup)
    })
  })
  return dispose
}
```

---

Reactivity system: Done. Remote Data: Done. Next: [Remote Action](./4-remote-action.md) !
