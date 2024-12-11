import { JsonPlaceholderApi, Todo } from '../setup/Api'
import { createRemoteAction } from '../setup/RemoteAction'
import { RemoteActionToConfirm, requireConfirmation } from '../setup/RemoteActionToConfirm'

export interface DeleteTodoModel {
  action: RemoteActionToConfirm<void, [Todo]>
}

type Deps = {
  api: JsonPlaceholderApi
}

export function createDeleteTodoModel({ api }: Deps): DeleteTodoModel {
  const action = createRemoteAction((todo: Todo) => api.deleteTodo(todo.id))
  return {
    action: requireConfirmation(action),
  }
}