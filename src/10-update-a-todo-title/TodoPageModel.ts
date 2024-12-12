import { RemoteData } from '@/setup/RemoteData'
import { JsonPlaceholderApi, Todo } from "../setup/Api"
import { createRemoteAction, RemoteAction } from "../setup/RemoteAction"
import { computed, effect, ReadonlySignal, Signal } from "@/setup/Signal"

export interface TodoPageModel {
  getTodoList: RemoteAction<Todo[]>
  canPatchAnyTodo: ReadonlySignal<boolean>

  toggleTodo: (todo: Todo) => Promise<void>
  changeTodoTitle: (todo: Todo, title: string) => Promise<void>

  dispose: () => void
}

export function makeTodoPageModel(api: JsonPlaceholderApi): TodoPageModel {
  const getTodoList = createRemoteAction(() => api.getTodos())

  const patchTodo = createRemoteAction(api.patchTodo.bind(api))

  const dispose = effect(() => {
    const data = patchTodo.data.get()
    if (data.state !== "success") return
    // update the current todo list:
    getTodoList.data.update((list) => {
      if (list.state !== "success") return list

      // replace the todo in the list by the patched todo
      const nextList = list.value.map((todo) => {
        return todo.id === data.value.id ? data.value : todo
      })

      return { state: "success", value: nextList }
    })
  })

  return {
    getTodoList,
    canPatchAnyTodo: computed(() => patchTodo.data.get().state !== 'pending'),
    toggleTodo: (todo) => {
      return patchTodo.trigger(todo.id, { completed: !todo.completed })
    },
    changeTodoTitle: (todo, title) => {
      return patchTodo.trigger(todo.id, { title })
    },
    dispose,
  }
}
