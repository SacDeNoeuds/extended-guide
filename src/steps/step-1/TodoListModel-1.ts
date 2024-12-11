import { JsonPlaceholderApi, Todo } from '../../setup/Api'
import { createSignal, ReadonlySignal } from '../../setup/Signal'

export interface TodoListModel {
  data: ReadonlySignal<'pending' | Error | Todo[]>
  getTodos(): Promise<void>; // trigger the fetch
}

type Deps = {
  api: JsonPlaceholderApi
}
export function createTodoListModel({ api }: Deps): TodoListModel {
  const data = createSignal<'pending' | Error | Todo[]>('pending')
  return {
    data,
    getTodos() {
      return api.getTodos()
        .then(data.set)
        .catch((cause) => {
          const error = new Error('Failed to get todos', { cause })
          data.set(error)
        })
    }
  }
}