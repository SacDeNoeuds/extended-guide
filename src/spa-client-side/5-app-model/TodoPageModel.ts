import { TodoApi, Todo } from '@/spa-client-side/setup/TodoApi'
import {
  createRemoteAction,
  RemoteAction,
} from '@/spa-client-side/setup/RemoteAction'

export interface TodoPageModel {
  getTodoList: RemoteAction<Todo[]>
}

export function makeTodoPageModel(api: TodoApi): TodoPageModel {
  const getTodoList = createRemoteAction(api.getTodos.bind(api))

  return {
    getTodoList,
  }
}
