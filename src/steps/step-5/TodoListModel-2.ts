import { createTodoFormModel } from "../../models/TodoFormModel"
import { JsonPlaceholderApi, Todo } from "../../setup/Api"
import { createRemoteAction, RemoteAction } from "../../setup/RemoteAction"
import { RemoteData } from "../../setup/RemoteData"
import { effect, ReadonlySignal, Signal } from "../../setup/Signal"
import { TodoFormModel } from "../step-2/TodoFormModel"
import {
  DeleteTodoModel,
  createDeleteTodoModel,
} from "../step-3/DeleteTodoModel"

export interface TodoListModel {
  data: ReadonlySignal<RemoteData<Todo[]>>
  getTodos(): Promise<void> // trigger the fetch

  deleteTodo: DeleteTodoModel
  openTodoForm(todo: Todo): void

  toggleTodoAction: RemoteAction<void, [todo: Todo]>

  dispose(): void
}

type Deps = {
  api: JsonPlaceholderApi
  todoForm: Signal<TodoFormModel | undefined>
}
export function createTodoListModel({ api, todoForm }: Deps): TodoListModel {
  const action = createRemoteAction(() => api.getTodos())
  const deleteTodo = createDeleteTodoModel({ api })

  const effects = [
    effect(() => {
      const deleteData = deleteTodo.action.data.get()
      if (deleteData.state !== "success") return
      // run client-side updates, or just refetch the list:
      void action.trigger()
    }),
  ]

  return {
    data: action.data,
    deleteTodo,
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

    dispose() {
      effects.forEach((dispose) => dispose())
    },
  }

  async function toggleTodo(todo: Todo) {
    await api.patchTodo(todo.id, { completed: !todo.completed })
  }
}
