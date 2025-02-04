import { Todo, TodoPatch } from './Todo'
import { TodoRepository } from './TodoRepository'

export function TodoInMemoryRepository(): TodoRepository {
  const store = new Map<number, Todo>()
  return {
    getList: async () => {
      return Array.from(store.values())
    },
    delete: async (id: number) => {
      const existing = store.get(id) ?? undefined
      store.delete(id)
      return existing
    },
    findById: async (id: number) => {
      return store.get(id) ?? undefined
    },
    update: async (id: number, patch: TodoPatch) => {
      const todo = store.get(id)
      if (!todo) return undefined
      const updated = { ...todo, ...patch }
      store.set(id, updated)
      return updated
    },
  }
}
