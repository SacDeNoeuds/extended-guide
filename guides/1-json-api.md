# The JsonPlaceholder API

## The definition

> [!Note] Why is it so useful to _define_ it instead of _implementing_ it directly?
>
> Because I can have multiple implementations of the same concept. we will use the `fetch` implementation for production and the in-memory one for tests.

```ts
// src/./setup/Api.ts
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
  ) => Promise<Todo>
  deleteTodo: (id: number) => Promise<void>
}
```


## `Fetch` implementation

For the fetch implementation, we will add a global delay to simulate a network delay and have time to observe loading states.
```ts
// src/./setup/Api.fetch.ts
import { apiDefaults, JsonPlaceholderApi } from './Api'
import { delay } from './delay'

export const JsonPlaceholderFetchApi: JsonPlaceholderApi = {
  async getTodo(id) {
    await delay(apiDefaults.preflightDelayInMs)
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
    return response.json()
  },

  async getTodos() {
    await delay(apiDefaults.preflightDelayInMs)
    const response = await fetch('https://jsonplaceholder.typicode.com/todos')
    return response.json()
  },

  async patchTodo(id, data) {
    await delay(apiDefaults.preflightDelayInMs)
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    })
    return response.json()
  },

  async deleteTodo(id) {
    await delay(apiDefaults.preflightDelayInMs)
    await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'DELETE',
    })
  },
}
```

## `InMemory` implementation

```ts
// src/./setup/Api.InMemory.ts
import { JsonPlaceholderApi, Todo } from './Api'

interface JsonPlaceholderInMemoryApi extends JsonPlaceholderApi {
  createTodo: (todo: Todo) => void
}

export function createJsonPlaceholderInMemoryApi(): JsonPlaceholderInMemoryApi {
  const store = new Map<number, Todo>()
  return {
    createTodo(todo: Todo) {
      store.set(todo.id, todo)
    },
    async getTodo(id) {
      const todo = store.get(id)
      if (!todo) throw new Error(`todo ${id} not found`)
      return todo
    },
  
    async getTodos() {
      return Array.from(store.values())
    },
  
    async patchTodo(id, data) {
      const nextTodo = { ...(await this.getTodo(id)), ...data }
      store.set(id, nextTodo)
      return nextTodo
    },
  
    async deleteTodo(id) {
      store.delete(id)
    },
  }
}
```

---

Now that we have the API, let’s dig into the [remote data](./2-remote-data.md) concept to use the API.
