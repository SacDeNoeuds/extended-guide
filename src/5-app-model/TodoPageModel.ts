import { JsonPlaceholderApi, Todo } from '@/setup/Api'
import { createRemoteAction, RemoteAction } from '@/setup/RemoteAction'

export interface TodoPageModel {
  getTodoList: RemoteAction<Todo[]>
}

export function makeTodoPageModel(api: JsonPlaceholderApi): TodoPageModel {
  const getTodoList = createRemoteAction(api.getTodos.bind(api))

  return {
    getTodoList,
  }
}
