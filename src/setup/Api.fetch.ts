import { apiDefaults, JsonPlaceholderApi } from './Api'
import { delay } from './delay'

export const JsonPlaceholderFetchApi: JsonPlaceholderApi = {
  async getTodo(id) {
    await delay(apiDefaults.preflightDelayInMs)
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
    )
    return response.json()
  },

  async getTodos() {
    await delay(apiDefaults.preflightDelayInMs)
    const response = await fetch('https://jsonplaceholder.typicode.com/todos')
    return response.json()
  },

  async patchTodo(id, data) {
    await delay(apiDefaults.preflightDelayInMs)
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
      {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      },
    )
    return response.json()
  },

  async deleteTodo(id) {
    await delay(apiDefaults.preflightDelayInMs)
    await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'DELETE',
    })
  },
}
