import { JsonPlaceholderApi, Todo } from '../setup/Api'
import { createRemoteAction, RemoteAction } from '../setup/RemoteAction'

export interface TodoPageModel {
  todos: RemoteAction<Todo[]>
}

export function makeTodoPageModel(api: JsonPlaceholderApi): TodoPageModel {
  return {
    todos: createRemoteAction(() => api.getTodos()),
  }
}
