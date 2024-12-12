# React App

## The reactivity system adapter – `useSignal`

Because our `AppModel` is defined using our [reactivity system](./3-reactivity-system.md), we need to adapt it to React:

```ts
// src/./6-react-app/useSignal.ts
import { useEffect, useState } from 'react'
import { effect, ReadonlySignal } from '../setup/Signal'

export function useSignal<T>(signal: ReadonlySignal<T>): T {
  const [state, setState] = useState(signal.get())

  useEffect(() => {
    const dispose = effect(() => {
      setState(signal.get())
    })
    return dispose
  }, [signal])

  return state
}
```

As you can see, the adapter is quite simple.

Now we will dive further and further in the app component tree, starting at the top:

## The `App` component

We will adapt the `route` signal to a React state, and handle both cases `NotFound` and `TodoListPage`.

```tsx
// src/./6-react-app/App.tsx
/** @jsx React.createElement */
import React from "react"
import { AppModel } from "../5-app-model/AppModel"
import { useSignal } from "./useSignal"
import { TodoPage } from "./TodoPage"

interface Props {
  model: AppModel
}

export function App({ model }: Props) {
  const route = useSignal(model.route)

  return (
    <div>
      <h2>React App</h2>
      {route.name === "NotFound" && (
        <p>
          {"Page Not Found "}
          <button type="button" onClick={model.goToTodos}>
            {"Go to todos"}
          </button>
        </p>
      )}
      {route.name === "TodoListPage" && <TodoPage model={route.make()} />}
    </div>
  )
}
```

## The `TodoPage` component

We will adapt the `todos` signal to a React state, and display the remote list of todos, leveraging a yet-to-create `<RemoteData />` component.

```tsx
// src/./6-react-app/TodoPage.tsx
/** @jsx React.createElement */
import React, { useEffect } from "react"
import { TodoPageModel } from "../5-app-model/TodoPageModel"
import { useSignal } from "./useSignal"
import { RemoteData } from "./RemoteData"
import { TodoUnorderedList } from "./TodoUnorderedList"

interface Props {
  model: TodoPageModel
}

export function TodoPage({ model }: Props) {
  const todos = useSignal(model.todos.data)

  // fetch the todos on mount.
  useEffect(() => {
    void model.todos.trigger()
    // explicitly mark the promise as non-awaiting with `void`
  }, [])

  return (
    <div>
      <p>Todo Page in React</p>
      <RemoteData
        data={todos}
        success={(todos) => <TodoUnorderedList todos={todos} />}
      />
    </div>
  )
}
```

## The `TodoUnorderedList` component

This one is purely presentational, nothing much to say:

```tsx
// src/./6-react-app/TodoUnorderedList.tsx
/** @jsx React.createElement */
import React from "react"
import { Todo } from '../setup/Api'

interface Props {
  todos: Todo[]
}
export function TodoUnorderedList({ todos }: Props) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  )
}
```

## And finally, the `RemoteData` component

This one is key for readability, it also enables the possibility to handle all the errors at a dedicated place, while still allowing customization.

```tsx
// src/./6-react-app/RemoteData.tsx
/** @jsx React.createElement */
import React from "react"
import { RemoteData } from "../setup/RemoteData"

interface Props<T> {
  data: RemoteData<T>
  initial?: () => React.ReactNode
  pending?: (progress?: number) => React.ReactNode
  failure?: (error: Error) => React.ReactNode
  success: (value: T) => React.ReactNode
}
export function RemoteData<T>({
  data,
  initial = () => <div>Waiting for data to be loaded</div>,
  pending = () => <div>Loading...</div>,
  failure = (error) => <div>Error: {error.message}</div>,
  success,
}: Props<T>) {
  return <>
    {data.state === 'initial' && initial()}
    {data.state === 'pending' && pending(data.progress)}
    {data.state === 'failure' && failure(data.error)}
    {data.state === 'success' && success(data.value)}
  </>
}
```

---

Great, we our React app, let’s implement the [Vue equivalent](./7-vue-app.md).
