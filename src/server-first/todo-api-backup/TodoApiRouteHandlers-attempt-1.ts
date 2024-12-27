import { NotFound } from '../definition/HttpError'
import { handleRoutes } from '../definition/route-handler'
import { todoApiRoutes } from './TodoApiRoutes'
import { TodoRepository } from './TodoRepository'

export function makeTodoApiRouteHandlers(repository: TodoRepository) {
  function TodoNotFoundById(id: number) {
    return NotFound({ message: `Todo with id ${id} not found` })
  }
  return handleRoutes(todoApiRoutes, {
    getTodos: async ({ query }) => {
      const list = await repository.getList({
        after: query.from,
        size: query.pageSize,
      })
      return { status: 200, body: list }
    },

    getTodo: async ({ params }) => {
      const todo = await repository.findById(params.id)
      if (todo) return { status: 200, body: todo }
      return {
        status: 404,
        body: TodoNotFoundById(params.id),
      }
    },

    patchTodo: async ({ params, body }) => {
      const updatedTodo = await repository.update(params.id, body)
      return updatedTodo
        ? { status: 200, body: updatedTodo }
        : { status: 404, body: TodoNotFoundById(params.id) }
    },

    deleteTodo: async ({ params }) => {
      const deleted = await repository.delete(params.id)
      return deleted
        ? { status: 204 }
        : { status: 404, body: TodoNotFoundById(params.id) }
    },
  })
}
