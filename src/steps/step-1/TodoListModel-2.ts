import { JsonPlaceholderApi, Todo } from '../../setup/Api'
import { ReadonlySignal } from '../../setup/Signal'
import { createRemoteAction, RemoteData } from './RemoteData'

export interface TodoListModel {
  data: ReadonlySignal<RemoteData<Todo[]>>
  getTodos(): Promise<void>; // trigger the fetch
}

type Deps = {
  api: JsonPlaceholderApi
}
export function createTodoListModel({ api }: Deps): TodoListModel {
  const action = createRemoteAction(() => api.getTodos())
  return {
    data: action.data,
    async getTodos() {
      await action.trigger()
    }
  }
}