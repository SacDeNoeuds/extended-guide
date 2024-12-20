import { handleRoutes } from './definition/route-handler'
import { todoApiRoutes } from './todo-api/TodoApiRoutes'

export function createServer() {
  const handlers = handleRoutes(todoApiRoutes, {
    getTodos: async () => {},
    getTodo: async () => {},
    patchTodo: async () => {},
    deleteTodo: async () => {},
  })
}
