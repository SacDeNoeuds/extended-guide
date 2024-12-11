import { JsonPlaceholderApi } from '../../setup/Api'
import { createRemoteAction } from './RemoteAction'
import { RemoteActionToConfirm, requireConfirmation } from './RemoteActionToConfirm'

export interface DeleteTodoModel {
  action: RemoteActionToConfirm<void, [number]>
}

type Deps = {
  api: JsonPlaceholderApi
}

export function createDeleteTodoModel({ api }: Deps): DeleteTodoModel {
  const action = createRemoteAction((id: number) => api.deleteTodo(id))
  return {
    action: requireConfirmation(action),
  }
}