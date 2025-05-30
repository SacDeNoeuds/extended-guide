import { TodoApi, Todo } from './TodoApi'

interface TodoInMemoryApi extends TodoApi {
  createTodo: (todo: Todo) => void
}

export function makeTodoInMemoryApi(): TodoInMemoryApi {
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
