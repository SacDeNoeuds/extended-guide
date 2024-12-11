# Model View Demo

Demoing how to implement agnostic models and pipe them to view libraries like Vue, React, Svelte &amp; Solid… and whatever comes next.

## Introduction

The model-view approach applies to any frontend application, as long as you have some client-side scripting and rendering. Could be in C & Qt as well as HTML/JS.

Conceptually the model-view pattern is way simpler than it looks, yet diving into it is trickier than it seems IMO, which is why I am writing these series.

There are different flavors, AKA level of details one put in their model, therefore I’ll give mine straight away: To me, the model is about data and behavior _only_, as a result there are no classes or UI-related data in there.

Basically, **the model should contain 2 things only**:
- Data to be displayed
- Interactions, in the shape of functions/methods.

The data will change over time, therefore most of the data will be reactive.

## Setup

### Step 1 – Define an agnostic reactivity system

First, I will *define* the `Signal` or `State` concept. By doing so, we will be in the position of swapping the implementation detail anytime at the cost of defining ourselves the API.

### Step 2 – Give the reactivity system an implementation

Let’s not re-invent the wheel and facade an existing library. We have a few options, especially since 2023 😅:
- [`s-js`](https://www.npmjs.com/package/s-js)
- [`@preact/signals-code`](https://www.npmjs.com/package/@preact/signals-core)
- [`solid-js`](https://www.npmjs.com/package/solid-js)
- The [polyfill](https://www.npmjs.com/package/signal-polyfill) of the [proposal](https://github.com/tc39/proposal-signals) – not production-ready

For the sake of poetry (NB: one of the first to push for signals), I will use S.js

```ts
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

// the implementation complies to type upper.
export { effect, createSignal } from './Signal.s-js'
```

Great, now because it will be at the root of our project, let’s write a bunch of tests to avoid bad surprises. Done ✅

<details>
  <summary>
    Here is the spec …
  </summary>

```ts
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

</details>

<details>
  <summary>
    … and here the facade
  </summary>

```ts
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

</details>


### Step 3 – Let’s build a simple API

I will use the [json placeholder mock API](https://jsonplaceholder.typicode.com/) to get and post data.

I will focus on the todo part: listing, toggling and maybe something else.

Done, including the `fetch` implementation ✅

```ts
export interface Todo {
  userId: number
  id: number
  title: string
  completed: boolean
}

export const apiDefaults = {
  /** used to slow down the api calls, to see the loading states */
  preflightDelayInMs: 0,
}

export interface JsonPlaceholderApi {
  getTodos: () => Promise<Todo[]>
  getTodo: (id: number) => Promise<Todo>
  patchTodo: (
    id: number,
    data: Partial<Pick<Todo, "title" | "completed">>,
  ) => Promise<void>
  deleteTodo: (id: number) => Promise<void>
}
```

## Models

I will take problems we usually face client-side: displaying data after fetching, upserting data and deleting data.

### Step 1 – `TodoList` model


```ts
import { JsonPlaceholderApi, Todo } from '../../setup/Api'
import { createSignal, ReadonlySignal } from '../../setup/Signal'

export interface TodoListModel {
  data: ReadonlySignal<'pending' | Error | Todo[]>
  getTodos(): Promise<void>; // trigger the fetch
}

type Deps = {
  api: JsonPlaceholderApi
}
export function createTodoListModel({ api }: Deps): TodoListModel {
  const data = createSignal<'pending' | Error | Todo[]>('pending')
  return {
    data,
    getTodos() {
      return api.getTodos()
        .then(data.set)
        .catch((cause) => {
          const error = new Error('Failed to get todos', { cause })
          data.set(error)
        })
    }
  }
}
```

Done ✅. Now that we have a highly testable model, let’s test it !

```ts
import { describe, expect, it } from 'vitest'
import { Todo } from '../../setup/Api'
import { createJsonPlaceholderInMemoryApi } from '../../setup/Api.InMemory'
import { createTodoListModel } from './TodoListModel-1'

const make = () => {
  const api = createJsonPlaceholderInMemoryApi()
  const todo: Todo = {
    id: 1,
    userId: 42,
    completed: false,
    title: 'Hello, world!',
  }
  api.createTodo(todo)

  return [createTodoListModel({ api }), { todo, api }] as const
}
describe('TodoListModel 1', () => {
  it('starts as pending', () => {
    const [model] = make()
    expect(model.data.get()).toBe('pending')
  })
  
  it('reports fetch failures', async () => {
    const [model, { api }] = make()
    const fetchError = new Error("fetch error!")
    api.getTodos = () => Promise.reject(fetchError)
    await model.getTodos()

    const err = model.data.get()
    expect(err).toBeInstanceOf(Error)
    expect((err as Error).cause).toBe(fetchError)
  })

  it('presents todos', async () => {
    const [model, { todo }] = make()
    await model.getTodos()
    expect(model.data.get()).toEqual([todo])
  })
})
```

Okay. It looks fairly obvious that we will need to fetch stuff pretty often, so let’s create a `RemoteData` model.

```ts
import { JsonPlaceholderApi, Todo } from '../../setup/Api'
import { ReadonlySignal } from '../../setup/Signal'
import { createRemoteAction, RemoteData } from './RemoteData'

export interface TodoListModel {
  data: ReadonlySignal<RemoteData<Todo[]>>
  getTodos(): Promise<void>; // trigger the fetch
}

type Deps = {
  api: JsonPlaceholderApi
}
export function createTodoListModel({ api }: Deps): TodoListModel {
  const action = createRemoteAction(() => api.getTodos())
  return {
    data: action.data,
    async getTodos() {
      await action.trigger()
    }
  }
}
```

Done ✅.
Let’s refactor our `TodoList` model. Great, let’s re-test… all good!

```ts
import { describe, expect, it } from 'vitest'
import { Todo } from '../../setup/Api'
import { createJsonPlaceholderInMemoryApi } from '../../setup/Api.InMemory'
import { createTodoListModel } from './TodoListModel-2'

const make = () => {
  const api = createJsonPlaceholderInMemoryApi()
  const todo: Todo = {
    id: 1,
    userId: 42,
    completed: false,
    title: 'Hello, world!',
  }
  api.createTodo(todo)

  return [createTodoListModel({ api }), { todo, api }] as const
}
describe('TodoListModel 2', () => {
  it('starts as initial', () => {
    const [model] = make()
    expect(model.data.get()).toEqual('pending')
  })
  
  it('reports fetch failures', async () => {
    const [model, { api }] = make()
    const fetchError = new Error("fetch error!")
    api.getTodos = () => Promise.reject(fetchError)
    await model.getTodos()

    expect(model.data.get()).toBe(fetchError)
  })

  it('presents todos', async () => {
    const [model, { todo }] = make()
    await model.getTodos()
    expect(model.data.get()).toEqual([todo])
  })
})
```

#### Step 2 – `TodoForm` model

Now we have a problem: we can’t provide arguments to our action trigger… Let’s fix that.

2nd problem: we start at `"pending"`, which is invalid: we did not send anything yet. Let’s add an `"initial"` state.

3rd problem: our abstraction is too trivial: if a successful value is `'pending'`, it will collide with the remote data `'pending'` state. Plus, a pending state might take some `Progress` info.

Let’s fix all those problems:

Let’s refine the `RemoteData<T>` type:

```ts
export type RemoteData<T> =
  | { state: 'initial' }
  | { state: 'pending', progress?: number }
  | { state: 'failure', error: Error }
  | { state: 'success', value: T }
```

Then let’s adapt the `RemoteAction<T>`:

```ts
import { createSignal, ReadonlySignal } from "../../setup/Signal"
import { RemoteData } from "./RemoteData"

export interface RemoteAction<T, Args extends any[]> {
  data: ReadonlySignal<RemoteData<T>>
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

Great, now let’s test it:

```ts
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

Ok, we can go back to that form model. Conceptually, the frontend will display fields the user can interact with, and submit the values with an optional validation step.

In that concept, you will notice there is **no mention** to **creation** or **update**. That is intended: a form **does not care** about that.

A form is simple: **give it** `initialValues` and `submit()` function, it will abstract everything away for you, including validation.

Because the `submit` function is provided by the parent, that is where you will decide whether it is creation or update.

```ts
import { createSignal, ReadonlySignal, Signal } from '../../setup/Signal'
import { createRemoteAction } from './RemoteAction'
import { RemoteData } from './RemoteData'

export interface TodoFormModel {
  values: {
    [Key in keyof TodoFormValues]: Signal<TodoFormValues[Key]>
  }
  submitState: ReadonlySignal<RemoteData<void>>
  submit: () => Promise<void>
}

export interface TodoFormValues {
  title: string
  completed: boolean
}

type Deps = {
  initialValues?: TodoFormValues
  saveTodo: (values: TodoFormValues) => Promise<void>
}

export function createTodoFormModel({ initialValues, saveTodo }: Deps): TodoFormModel {
  const submitAction = createRemoteAction(saveTodo)
  return {
    values: {
      title: createSignal(initialValues?.title ?? ''),
      completed: createSignal(initialValues?.completed ?? false),
    },
    submitState: submitAction.data,
    async submit() {
      await saveTodo({
        title: this.values.title.get(),
        completed: this.values.completed.get(),
      })
    }
  }
}
```

Done ✅, let’s test it:

```ts
import { describe, expect, it } from 'vitest'
import { createTodoFormModel, TodoFormValues } from './TodoFormModel'

const make = (initialValues?: TodoFormValues) => {
  const saved: TodoFormValues[] = []
  const saveTodo = async (values: TodoFormValues) => {
    saved.push(values)
  }
  const model = createTodoFormModel({ initialValues, saveTodo })
  return [model, { saveTodo, saved }] as const
}

describe('TodoFormModel', () => {
  it('initializes without initial values', () => {
    const [model] = make()
    expect(model.values.title.get()).toEqual('')
    expect(model.values.completed.get()).toEqual(false)
  })

  it('initializes with initial values', () => {
    const [model] = make({ title: 'Hello', completed: true })
    expect(model.values.title.get()).toEqual('Hello')
    expect(model.values.completed.get()).toEqual(true)
  })

  it('submits updated values', async () => {
    const [model, { saved }] = make()
    model.values.title.set('foo')
    model.values.completed.set(true)
    await model.submit()
    expect(saved).toEqual([{ title: 'foo', completed: true }])
  })
})
```

### Step 3 – `DeleteTodo` model

A deletion usually involves a confirmation step. Let’s model that first.

The only difference with `RemoteAction<T>` is that we will add an intermediary step. `trigger(…)` will not execute anything yet and wait for a `confirm()`-ation or `cancel()`-ation.

```ts
import { createSignal, ReadonlySignal, Signal } from "../../setup/Signal"
import { RemoteAction } from "./RemoteAction"
import { RemoteData } from "./RemoteData"

export interface RemoteActionToConfirm<T, Args extends any[]> {
  readonly data: ReadonlySignal<RemoteData<T>>
  readonly pendingApproval: Signal<Args | undefined>
  ask: (...args: Args) => void
  cancel: () => void
  confirm: () => Promise<void>
}

export function requireConfirmation<T, Args extends any[]>(
  action: RemoteAction<T, Args>,
): RemoteActionToConfirm<T, Args> {
  return {
    data: action.data,
    pendingApproval: createSignal<Args | undefined>(undefined),
    ask(...args) {
      this.pendingApproval.set(args)
    },
    cancel() {
      this.pendingApproval.set(undefined)
    },
    async confirm() {
      const args = this.pendingApproval.get()
      if (!args) return // or throw?
      await action.trigger(...args)
      if (action.data.get().state === 'success') {
        this.pendingApproval.set(undefined)
      }
    }
  }
}
```

Great, let’s test it:

```ts
import { beforeAll, describe, expect, it } from 'vitest'
import { createRemoteAction } from './RemoteAction'
import { requireConfirmation } from './RemoteActionToConfirm'

const updateCount = (_count: number) => Promise.resolve()
const make = (updateCount: (count: number) => Promise<void>) => {
  const action = createRemoteAction(updateCount)
  const actionToConfirm = requireConfirmation(action)
  return actionToConfirm
}

describe('RemoteActionToConfirm', () => {
  it('starts as initial', () => {
    const actionToConfirm = make(updateCount)
    expect(actionToConfirm.data.get()).toEqual({ state: 'initial' })
  })
  
  it('waits for confirmation', () => {
    const actionToConfirm = make(updateCount)
    actionToConfirm.ask(12)
    expect(actionToConfirm.data.get()).toEqual({ state: 'initial' })
    expect(actionToConfirm.pendingApproval.get()).toEqual([12])
  })

  it('cancels action', () => {
    const actionToConfirm = make(updateCount)
    actionToConfirm.ask(12)
    actionToConfirm.cancel()
    expect(actionToConfirm.data.get()).toEqual({ state: 'initial' })
    expect(actionToConfirm.pendingApproval.get()).toEqual(undefined)
  })

  describe('confirmation', () => {
    describe('when action succeeds', () => {
      const actionToConfirm = make(updateCount)
      actionToConfirm.ask(12)
      beforeAll(() => actionToConfirm.confirm())
  
      it('reports success', () => {
        expect(actionToConfirm.data.get()).toEqual({ state: 'success' })
      })

      it('removes data to confirm', () => {
        expect(actionToConfirm.pendingApproval.get()).toEqual(undefined)
      })
    })

    describe('when action fails', () => {
      const error = new Error('oops')
      const actionToConfirm = make(() => Promise.reject(error))
      actionToConfirm.ask(12)
      beforeAll(() => actionToConfirm.confirm())
  
      it('reports failure', () => {
        expect(actionToConfirm.data.get()).toEqual({ state: 'failure', error })
      })

      it('keeps data to confirm', () => {
        expect(actionToConfirm.pendingApproval.get()).toEqual([12])
      })
    })
  })
})
```

For the demo, we will allow to delete one todo at a time. For more complex use cases, you can use different approaches:
- Adding a `deleteTodos(ids)` – delete multiple todos at once with some selection.
- Updating `RemoteActionToConfirm` to handle concurrency, when a new action is asked but the previous one is not completed.

Now let’s implement that `DeleteTodoModel`.

```ts
import { JsonPlaceholderApi } from '../../setup/Api'
import { createRemoteAction } from './RemoteAction'
import { RemoteActionToConfirm, requireConfirmation } from './RemoteActionToConfirm'

export interface DeleteTodoModel {
  action: RemoteActionToConfirm<void, [number]>
}

type Deps = {
  api: JsonPlaceholderApi
}

export function createDeleteTodoModel({ api }: Deps): DeleteTodoModel {
  const action = createRemoteAction((id: number) => api.deleteTodo(id))
  return {
    action: requireConfirmation(action),
  }
}
```

Because there is solely a remote action to confirm in there, I will not even bother testing it considering `RemoteActionToConfirm` is tested.

### Step 4 – Writing the `App` model

Because yes, all this lives in an app after all. Let’s start with the `AppModel`:

```ts
import { JsonPlaceholderFetchApi } from "../../setup/Api.fetch"
import { createSignal, ReadonlySignal } from "../../setup/Signal"
import { createTodoPageModel, TodoPageModel } from "./TodoPageModel"

type ActivePage =
  | { name: "NotFound" }
  | { name: "Todos"; createModel: () => TodoPageModel }

export interface AppModel {
  activePage: ReadonlySignal<ActivePage>

  // later this will be handled by routing/history
  changePage: (name: ActivePage["name"]) => void
}

export function createAppModel(): AppModel {
  const api = JsonPlaceholderFetchApi
  const activePage = createSignal<ActivePage>({
    name: "Todos",
    createModel: () => createTodoPageModel({ api }),
  })

  return {
    activePage,
    changePage(name) {
      switch (name) {
        case "NotFound":
          return activePage.set({ name })
        case "Todos":
          return activePage.set({
            name,
            createModel: () => createTodoPageModel({ api }),
          })
      }
    },
  }
}
```

Then the `TodoPageModel`:

```ts
import { JsonPlaceholderApi } from "../../setup/Api"
import { TodoListModel } from "../step-1/TodoListModel-1"
import { createTodoListModel } from "../step-1/TodoListModel-2"

export interface TodoPageModel {
  components: {
    todoList: TodoListModel
  }
}

type Deps = {
  api: JsonPlaceholderApi
}
export function createTodoPageModel({ api }: Deps): TodoPageModel {
  return {
    components: {
      todoList: createTodoListModel({ api }),
    },
  }
}
```

… And finally let’s test it:

```ts
import { JsonPlaceholderFetchApi } from "../../setup/Api.fetch"
import { createSignal, ReadonlySignal } from "../../setup/Signal"
import { createTodoPageModel, TodoPageModel } from "./TodoPageModel"

type ActivePage =
  | { name: "NotFound" }
  | { name: "Todos"; createModel: () => TodoPageModel }

export interface AppModel {
  activePage: ReadonlySignal<ActivePage>

  // later this will be handled by routing/history
  changePage: (name: ActivePage["name"]) => void
}

export function createAppModel(): AppModel {
  const api = JsonPlaceholderFetchApi
  const activePage = createSignal<ActivePage>({
    name: "Todos",
    createModel: () => createTodoPageModel({ api }),
  })

  return {
    activePage,
    changePage(name) {
      switch (name) {
        case "NotFound":
          return activePage.set({ name })
        case "Todos":
          return activePage.set({
            name,
            createModel: () => createTodoPageModel({ api }),
          })
      }
    },
  }
}
```

### Step 5 – editing a todo item

From the list, I want to be able to change the title or toggle the todo. Fine! Let’s incorporate that to the `TodoListModel`:

Let’s consider those actions:
- delete todo item (click)
- toggle todo item (click)
- rename todo item (form)

I’ll add another constraint for the sake of demo: we can display only one todo form at a time.

```ts
import { createTodoFormModel } from '../../models/TodoFormModel'
import { JsonPlaceholderApi, Todo } from '../../setup/Api'
import { createRemoteAction, RemoteAction } from '../../setup/RemoteAction'
import { RemoteData } from '../../setup/RemoteData'
import { ReadonlySignal, Signal } from '../../setup/Signal'
import { TodoFormModel } from '../step-2/TodoFormModel'
import { DeleteTodoModel, createDeleteTodoModel } from '../step-3/DeleteTodoModel'

export interface TodoListModel {
  data: ReadonlySignal<RemoteData<Todo[]>>
  getTodos(): Promise<void>; // trigger the fetch

  deleteTodo: DeleteTodoModel
  openTodoForm(todo: Todo): void;

  toggleTodoAction: RemoteAction<void, [todo: Todo]>
}

type Deps = {
  api: JsonPlaceholderApi
  todoForm: Signal<TodoFormModel | undefined>
}
export function createTodoListModel({ api, todoForm }: Deps): TodoListModel {
  const action = createRemoteAction(() => api.getTodos())

  return {
    data: action.data,
    deleteTodo: createDeleteTodoModel({ api }),
    toggleTodoAction: createRemoteAction(toggleTodo),

    async getTodos() {
      await action.trigger()
    },

    openTodoForm(todo) {
      const form = createTodoFormModel({
        initialValues: { title: todo.title, completed: todo.completed },
        saveTodo: (values) => api.patchTodo(todo.id, values),
      })
      todoForm.set(form)
    },
  }

  async function toggleTodo(todo: Todo) {
    await api.patchTodo(todo.id, { completed: !todo.completed })
  }
}
```

Now let’s update the `TodoPageModel` to hoist a global todo form:

```ts
import { TodoFormModel } from "../../models/TodoFormModel"
import { JsonPlaceholderApi } from "../../setup/Api"
import { createSignal, Signal } from "../../setup/Signal"
import { createTodoListModel, TodoListModel } from "./TodoListModel"

export interface TodoPageModel {
  components: {
    todoList: TodoListModel
    todoForm: Signal<TodoFormModel | undefined>
  }
}

type Deps = {
  api: JsonPlaceholderApi
}
export function createTodoPageModel({ api }: Deps): TodoPageModel {
  const todoForm = createSignal<TodoFormModel | undefined>(undefined)
  return {
    components: {
      todoList: createTodoListModel({ api, todoForm }),
      todoForm,
    },
  }
}
```

… and there you go.

## Views

Excellent, we have everything in place, now we can focus on the view. Eventually using frameworks, which I will showcase as it is fairly common.

### Step 6 – With React

Let’s climb up the tree from the bottom, we means we will start with a `TodoList` component:

```tsx
/** @jsx React.createElement */
import React, { useEffect } from 'react'
import { TodoListModel } from '../../models/TodoListModel'
import { useSignal } from './useSignal'

interface Props {
  model: TodoListModel
}
export function TodoList({ model }: Props) {
  const data = useSignal(model.data)
  useEffect(() => {
    model.getTodos()
  }, [])
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {data.state === 'initial' && <p>Waiting for data to be loaded</p>}
      {data.state === 'pending' && (
        <p>Loading…</p>
      )}
      {data.state === 'failure' && (
        <p>Error: {data.error.message}</p>
      )}
      {data.state === 'success' && (
        <ul>
          {data.value.map((todo) => (
            <li key={todo.id}>
              {todo.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
```
Then `TodoPage` component:

```tsx
/** @jsx React.createElement */
import React from 'react'
import { TodoPageModel } from '../../models/TodoPageModel'
import { TodoList } from './TodoList-2'

interface Props {
  model: TodoPageModel
}

export function TodoPage({ model }: Props) {
  return (
    <div>
      <p>Todo Page in React</p>
      <TodoList model={model.components.todoList} />
    </div>
  )
}
```

… And finally the `App` component:

```tsx
/** @jsx React.createElement */
import React from "react"
import { AppModel } from "../../models/AppModel"
import { useSignal } from "./useSignal"
import { TodoPage } from "./TodoPage-2"

interface Props {
  model: AppModel
}

export function App({ model }: Props) {
  const activePage = useSignal(model.activePage)

  return (
    <>
      <p>React App</p>
      {activePage.name === "NotFound" && <p>Page Not Found</p>}
      {activePage.name === "Todos" && (
        <TodoPage model={activePage.createModel()} />
      )}
    </>
  )
}
```

### Step 7 – With Vue

We can repeat the _exact same process_ with Vue:

The `TodoList` component:

```vue
<script setup lang="ts">
import { onMounted } from 'vue'
import { TodoListModel } from '../../models/TodoListModel'
import { signalRef } from './signalRef'

  const props = defineProps<{ model: TodoListModel }>()
  const model = props.model

  const data = signalRef(model.data)
  onMounted(() => model.getTodos())
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 0.5rem">
    <p v-if="data.state === 'initial'">Waiting for data to be loaded</p>
    <p v-else-if="data.state === 'pending'">Loading…</p>
    <p v-else-if="data.state === 'failure'">
      Error: {{data.error.message}}
    </p>
    <ul v-else>
      <li v-for="todo in data.value">
        {{todo.title}}
      </li>
    </ul>
  </div>
</template>
```

The `TodoPage` component:

```vue
<script setup lang="ts">
import { TodoPageModel } from '../../models/TodoPageModel'
import TodoList from './TodoList.vue'

  const props = defineProps<{ model: TodoPageModel }>()
  const model = props.model
</script>

<template>
  <div>
    <p>Todo Page in Vue</p>
    <TodoList :model="model.components.todoList" />
  </div>
</template>
```

The `App` component:

```vue
<script setup lang="ts">
import { AppModel } from '../../models/AppModel'
import { signalRef } from './signalRef'
import TodoPage from './TodoPage.vue'

  const props = defineProps<{ model: AppModel }>()
  const model = props.model

  const activePage = signalRef(model.activePage)
</script>

<template>
  <p>Vue App</p>
  <p v-if="activePage.name === 'NotFound'">Page Not Found</p>
  <TodoPage
    v-if="activePage.name === 'Todos'"
    :model="activePage.createModel()"
  />
</template>
```

### Step ~8~ – With Solid

You’re starting to get the drill, aren’t you? I’ll stop adding frameworks here because you can do it on your own.

## Going Further

### Let’s refresh the list when a todo is deleted

In `TodoListModel`, we can run effects upon `deleteTodo` action state changes:

```ts
import { createTodoFormModel } from '../../models/TodoFormModel'
import { JsonPlaceholderApi, Todo } from '../../setup/Api'
import { createRemoteAction, RemoteAction } from '../../setup/RemoteAction'
import { RemoteData } from '../../setup/RemoteData'
import { ReadonlySignal, Signal } from '../../setup/Signal'
import { TodoFormModel } from '../step-2/TodoFormModel'
import { DeleteTodoModel, createDeleteTodoModel } from '../step-3/DeleteTodoModel'

export interface TodoListModel {
  data: ReadonlySignal<RemoteData<Todo[]>>
  getTodos(): Promise<void>; // trigger the fetch

  deleteTodo: DeleteTodoModel
  openTodoForm(todo: Todo): void;

  toggleTodoAction: RemoteAction<void, [todo: Todo]>
}

type Deps = {
  api: JsonPlaceholderApi
  todoForm: Signal<TodoFormModel | undefined>
}
export function createTodoListModel({ api, todoForm }: Deps): TodoListModel {
  const action = createRemoteAction(() => api.getTodos())

  return {
    data: action.data,
    deleteTodo: createDeleteTodoModel({ api }),
    toggleTodoAction: createRemoteAction(toggleTodo),

    async getTodos() {
      await action.trigger()
    },

    openTodoForm(todo) {
      const form = createTodoFormModel({
        initialValues: { title: todo.title, completed: todo.completed },
        saveTodo: (values) => api.patchTodo(todo.id, values),
      })
      todoForm.set(form)
    },
  }

  async function toggleTodo(todo: Todo) {
    await api.patchTodo(todo.id, { completed: !todo.completed })
  }
}
```

### Let’s add implement the `DeleteTodo` button

#### In React

Let’s start with a confirm-action modal which can take any `RemoteActionToConfirm`:

```tsx
/** @jsx React.createElement */
import React, { useEffect } from "react"
import { RemoteActionToConfirm } from "../../setup/RemoteActionToConfirm"
import { useSignal } from "./useSignal"

interface Props<T, Args extends any[]> {
  action: RemoteActionToConfirm<T, Args>
  children: (...args: Args) => React.ReactNode
}

export function ConfirmActionModal<T, Args extends any[]>({
  action,
  children,
}: Props<T, Args>) {
  const data = useSignal(action.data)
  const pendingApproval = useSignal(action.pendingApproval)

  return (
    <dialog open={!!pendingApproval}>
      <header>Confirm</header>

      <div>{pendingApproval && children(...pendingApproval)}</div>

      <footer>
        <button type="button" onClick={() => action.cancel()}>
          Cancel
        </button>

        <button
          type="button"
          onClick={() => action.confirm()}
          disabled={data.state === "pending"}
        >
          Confirm
        </button>
      </footer>
    </dialog>
  )
}
```

Then let’s use it in our `DeleteTodoButton`:

```tsx
/** @jsx React.createElement */
import React from "react"
import { DeleteTodoModel } from '../../models/DeleteTodoModel'
import { ConfirmActionModal } from './ConfirmActionModal'
import { Todo } from '../../setup/Api'

interface Props {
  todo: Todo;
  model: DeleteTodoModel
  children: React.ReactNode
}

export function DeleteTodoButton({ todo, model, children }: Props) {
  const action = model.action
  return (
    <button type="button" onClick={() => action.ask(todo)}>
      {children}
    </button>
  )
}
```

Great, now it can go into our `TodoList`:

```tsx
/** @jsx React.createElement */
import React, { useEffect } from "react"
import { TodoListModel } from "../../models/TodoListModel"
import { useSignal } from "./useSignal"
import { DeleteTodoButton } from './DeleteTodoButton'
import { ConfirmActionModal } from './ConfirmActionModal'

interface Props {
  model: TodoListModel
}
export function TodoList({ model }: Props) {
  const data = useSignal(model.data)

  useEffect(() => {
    model.getTodos()
  }, [])

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      {data.state === "initial" && <p>Waiting for data to be loaded</p>}
      {data.state === "pending" && <p>Loading…</p>}
      {data.state === "failure" && <p>Error: {data.error.message}</p>}
      {data.state === "success" && (
        <ul>
          {data.value.map((todo) => (
            <li
              key={todo.id}
              style={{
                display: "flex",
                gap: "0.5rem",
                justifyContent: "space-between",
              }}
            >
              <span>{todo.title}</span>
              <span style={{ display: 'flex', gap: '0.25rem' }}>
                <button type="button" onClick={() => model.openTodoForm(todo)}>
                  {'✏️'}
                </button>
                <DeleteTodoButton model={model.deleteTodo} todo={todo}>
                  {'×'}
                </DeleteTodoButton>
              </span>
            </li>
          ))}
        </ul>
      )}
      <ConfirmActionModal action={model.deleteTodo.action}>
        {(todo) => (
          <p>Are you sure you want to delete "{todo.title}"?</p>
        )}
      </ConfirmActionModal>
    </div>
  )
}
```

Awesome. Let’s add a `TodoForm`:

```tsx
/** @jsx React.createElement */
import React from "react"
import { AppModel } from "../../models/AppModel"
import { useSignal } from "./useSignal"
import { TodoFormModel } from "../../models/TodoFormModel"

interface Props {
  model: TodoFormModel
  id?: string
}

export function TodoForm({ id, model }: Props) {
  const title = useSignal(model.values.title)
  const completed = useSignal(model.values.completed)

  return (
    <form
      id={id}
      onSubmit={(event) => {
        event.preventDefault()
        model.submit()
      }}
    >
      <div>
        <label htmlFor="title-control">Title</label>
        <input
          type="text"
          id="title-control"
          value={title}
          onChange={(event) => {
            model.values.title.set(event.currentTarget.value)
          }}
        />
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            id="title-control"
            checked={completed}
            onChange={(event) => {
              model.values.completed.set(event.currentTarget.checked)
            }}
          />
          Done
        </label>
      </div>
    </form>
  )
}
```

Since I am displaying only one at a time, I will want it in a dialog:

```tsx
/** @jsx React.createElement */
import React, { useEffect } from "react"
import { useSignal } from "./useSignal"
import { TodoFormModel } from "../../models/TodoFormModel"
import { Signal } from "../../setup/Signal"
import { TodoForm } from "./TodoForm"

interface Props {
  model: Signal<TodoFormModel | undefined>
  formId: string
}

export function TodoFormModal({ formId, model }: Props) {
  const form = useSignal(model)

  return (
    <dialog open={!!form}>
      <header>Todo Form</header>
      {form && <TodoForm model={form} id={formId} />}
      <footer>
        <button type="button" onClick={() => model.set(undefined)}>
          Cancel
        </button>
        <button type="submit" form={formId}>
          Save
        </button>
      </footer>
    </dialog>
  )
}
```

Now I can incorporate it to my `TodoPage` component:

```tsx
/** @jsx React.createElement */
import React from "react"
import { TodoPageModel } from "../../models/TodoPageModel"
import { TodoList } from "./TodoList-2"
import { TodoFormModal } from "./TodoFormModal"

interface Props {
  model: TodoPageModel
}

export function TodoPage({ model }: Props) {
  return (
    <>
      <TodoFormModal formId="todo-form" model={model.components.todoForm} />
      <div>
        <p>Todo Page in React</p>
        <TodoList model={model.components.todoList} />
      </div>
    </>
  )
}
```

