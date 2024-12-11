import { delay } from './delay'

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
  patchTodo: (id: number, data: Partial<Pick<Todo, 'title' | 'completed'>>) => Promise<void>
  deleteTodo: (id: number) => Promise<void>
}

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
    await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    })
  },

  async deleteTodo(id) {
    await delay(apiDefaults.preflightDelayInMs)
    await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'DELETE',
    })
  },
}
