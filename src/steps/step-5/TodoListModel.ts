import { createTodoFormModel } from '../../models/TodoFormModel'
import { JsonPlaceholderApi, Todo } from '../../setup/Api'
import { createRemoteAction, RemoteAction } from '../../setup/RemoteAction'
import { RemoteData } from '../../setup/RemoteData'
import { ReadonlySignal, Signal } from '../../setup/Signal'
import { TodoFormModel } from '../step-2/TodoFormModel'
import { DeleteTodoModel, createDeleteTodoModel } from '../step-3/DeleteTodoModel'

export interface TodoListModel {
  data: ReadonlySignal<RemoteData<Todo[]>>
  getTodos(): Promise<void>; // trigger the fetch

  deleteTodo: DeleteTodoModel
  openTodoForm(todo: Todo): void;

  toggleTodoAction: RemoteAction<void, [todo: Todo]>
}

type Deps = {
  api: JsonPlaceholderApi
  todoForm: Signal<TodoFormModel | undefined>
}
export function createTodoListModel({ api, todoForm }: Deps): TodoListModel {
  const action = createRemoteAction(() => api.getTodos())

  return {
    data: action.data,
    deleteTodo: createDeleteTodoModel({ api }),
    toggleTodoAction: createRemoteAction(toggleTodo),

    async getTodos() {
      await action.trigger()
    },

    openTodoForm(todo) {
      const form = createTodoFormModel({
        initialValues: { title: todo.title, completed: todo.completed },
        saveTodo: (values) => api.patchTodo(todo.id, values),
      })
      todoForm.set(form)
    },
  }

  async function toggleTodo(todo: Todo) {
    await api.patchTodo(todo.id, { completed: !todo.completed })
  }
}