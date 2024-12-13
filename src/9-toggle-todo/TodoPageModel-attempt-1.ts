import { JsonPlaceholderApi, Todo } from '@/setup/Api'
import { createRemoteAction, RemoteAction } from '@/setup/RemoteAction'

export interface TodoPageModel {
  getTodoList: RemoteAction<Todo[]>
  toggleTodo: RemoteAction<Todo, [todo: Todo]>
}

export function makeTodoPageModel(api: JsonPlaceholderApi): TodoPageModel {
  const getTodoList = createRemoteAction(api.getTodos.bind(api))

  const toggleTodo = createRemoteAction((todo: Todo) => {
    return api.patchTodo(todo.id, { completed: !todo.completed })
  })

  return {
    getTodoList,
    toggleTodo,
  }
}
