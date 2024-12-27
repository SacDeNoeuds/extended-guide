import { Todo, TodoPatch } from './Todo'

export interface TodoRepository {
  getList: (options: { after: Date; size: number }) => Promise<Todo[]>
  findById: (id: number) => Promise<Todo | undefined>
  update: (id: number, patch: TodoPatch) => Promise<Todo | undefined>
  delete: (id: number) => Promise<Todo | undefined>
}
