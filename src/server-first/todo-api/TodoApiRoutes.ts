import * as x from 'unhoax'
import { HttpError } from '../definition/HttpError'
import { MimeType } from '../definition/MimeType'
import { defineRoute } from '../definition/route'
import { numberFromString, TodoPatchSchema, TodoSchema } from './Todo'

export const todoApiRoutes = {
  getTodos: defineRoute({
    method: 'GET',
    path: '/todos',
    query: x.object({
      from: x.date,
      pageSize: x.number,
    }),
    responses: {
      200: { Json: x.array(TodoSchema) },
    },
  }),

  getTodo: defineRoute({
    method: 'GET',
    path: '/todos/:id',
    params: x.object({ id: numberFromString }),
    responses: {
      200: { Json: TodoSchema },
      404: x.instanceOf(HttpError),
    },
  }),

  patchTodo: defineRoute({
    method: 'PATCH',
    path: '/todos/:id',
    params: x.object({ id: numberFromString }),
    body: { contentType: MimeType.Json, schema: TodoPatchSchema },
    responses: {
      200: { Json: TodoSchema },
      404: x.instanceOf(HttpError),
    },
  }),

  deleteTodo: defineRoute({
    method: 'DELETE',
    path: '/todos/:id',
    params: x.object({ id: numberFromString }),
    responses: {
      204: {},
      404: x.instanceOf(HttpError),
    },
  }),
}
