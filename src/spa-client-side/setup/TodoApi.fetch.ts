import { delayApiCall } from './api-latency'
import { TodoApi } from './TodoApi'

export const todoFetchApi: TodoApi = {
  async getTodo(id) {
    await delayApiCall()
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
    )
    return response.json()
  },

  async getTodos() {
    await delayApiCall()
    const response = await fetch('https://jsonplaceholder.typicode.com/todos')
    return response.json()
  },

  async patchTodo(id, data) {
    await delayApiCall()
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
    await delayApiCall()
    await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'DELETE',
    })
  },
}
