import { JsonPlaceholderApi, Todo } from "../setup/Api"
import { createRemoteAction, RemoteAction } from "../setup/RemoteAction"

export interface TodoPageModel {
  todoList: RemoteAction<Todo[]>
  toggleTodo: RemoteAction<Todo, [todo: Todo]>
}

export function makeTodoPageModel(api: JsonPlaceholderApi): TodoPageModel {
  return {
    todoList: createRemoteAction(() => api.getTodos()),
    toggleTodo: createRemoteAction((todo: Todo) => {
      return api.patchTodo(todo.id, { completed: !todo.completed })
    }),
  }
}
