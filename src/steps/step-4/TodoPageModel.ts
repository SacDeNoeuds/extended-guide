import { JsonPlaceholderApi } from "../../setup/Api"
import { TodoListModel } from "../step-1/TodoListModel-1"
import { createTodoListModel } from "../step-1/TodoListModel-2"

export interface TodoPageModel {
  components: {
    todoList: TodoListModel
  }
}

type Deps = {
  api: JsonPlaceholderApi
}
export function createTodoPageModel({ api }: Deps): TodoPageModel {
  return {
    components: {
      todoList: createTodoListModel({ api }),
    },
  }
}
