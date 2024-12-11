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