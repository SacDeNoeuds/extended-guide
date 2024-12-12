# The `AppModel`

## The `AppModel` first definition

We want to display the list of todos, let’s call it the `TodoPage`. So we will have 2 app routes: one for "not-found" and the other for the todo page. We will be able to add some over time very easily.

```ts
// src/5-app-model/AppModel-attempt-1.ts

import { ReadonlySignal } from '../setup/Signal'

export type AppRoute =
  | { name: 'NotFound' }
  | { name: 'TodoPage', make: () => TodoPageModel }

export interface AppModel {
  route: ReadonlySignal<AppRoute>
  goToTodos: () => void
}

type TodoPageModel = unknown // ?
```

## The `TodoPageModel` definition

Apparently, our app will need such a model, so let’s define it.

We know we will want to display a fetched list of todos.

And to display such a list, we will use the `JsonPlaceholderApi`.

```ts
// src/5-app-model/TodoPageModel.ts

import { JsonPlaceholderApi, Todo } from '../setup/Api'
import { createRemoteAction, RemoteAction } from '../setup/RemoteAction'

export interface TodoPageModel {
  todos: RemoteAction<Todo[]>
}

export function makeTodoPageModel(api: JsonPlaceholderApi): TodoPageModel {
  return {
    todos: createRemoteAction(() => api.getTodos()),
  }
}
```

## Going back to the `AppModel` to implement it

```ts
// src/5-app-model/AppModel.ts

import { JsonPlaceholderApi } from '../setup/Api'
import { createSignal, ReadonlySignal } from '../setup/Signal'
import { makeTodoPageModel, TodoPageModel } from './TodoPageModel'

export type AppRoute =
  | { name: 'NotFound' }
  | { name: 'TodoListPage', make: () => TodoPageModel }

export interface AppModel {
  route: ReadonlySignal<AppRoute>
  goToTodos: () => void
}

export function makeAppModel(api: JsonPlaceholderApi): AppModel {
  const route = createSignal<AppRoute>({ name: 'NotFound' })

  return {
    route,
    goToTodos: () => route.set({
      name: 'TodoListPage',
      make: () => makeTodoPageModel(api),
    }),
  }
}
```

---

Great, now that we have our app model defined and implemented, let’s display it !

We can start with [React]() then [Vue]()
