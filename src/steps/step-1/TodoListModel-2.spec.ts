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