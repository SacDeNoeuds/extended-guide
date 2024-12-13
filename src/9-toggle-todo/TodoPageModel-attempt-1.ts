import { TodoApi, Todo } from '@/setup/TodoApi'
import { createRemoteAction, RemoteAction } from '@/setup/RemoteAction'

export interface TodoPageModel {
  getTodoList: RemoteAction<Todo[]>
  toggleTodo: RemoteAction<Todo, [todo: Todo]>
}

export function makeTodoPageModel(api: TodoApi): TodoPageModel {
  const getTodoList = createRemoteAction(api.getTodos.bind(api))

  const toggleTodo = createRemoteAction((todo: Todo) => {
    return api.patchTodo(todo.id, { completed: !todo.completed })
  })

  return {
    getTodoList,
    toggleTodo,
  }
}
