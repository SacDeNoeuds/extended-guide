import { TodoFormModel } from './TodoFormModel'
import { JsonPlaceholderApi } from '../setup/Api'
import { createSignal, Signal } from '../setup/Signal'
import { createTodoListModel, TodoListModel } from './TodoListModel'

export interface TodoPageModel {
  components: {
    todoList: TodoListModel
    todoForm: Signal<TodoFormModel | undefined>
  }
}

type Deps = {
  api: JsonPlaceholderApi
}
export function createTodoPageModel({ api }: Deps): TodoPageModel {
  const todoForm = createSignal<TodoFormModel | undefined>(undefined)
  return {
    components: {
      todoList: createTodoListModel({ api, todoForm }),
      todoForm
    },
  }
}
