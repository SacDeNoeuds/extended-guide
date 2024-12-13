import { TodoApi, Todo } from '@/setup/TodoApi'
import { createRemoteAction, RemoteAction } from '@/setup/RemoteAction'

export interface TodoPageModel {
  getTodoList: RemoteAction<Todo[]>
}

export function makeTodoPageModel(api: TodoApi): TodoPageModel {
  const getTodoList = createRemoteAction(api.getTodos.bind(api))

  return {
    getTodoList,
  }
}
