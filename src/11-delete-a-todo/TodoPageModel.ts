import { JsonPlaceholderApi, Todo } from "@/setup/Api"
import { createRemoteAction, RemoteAction } from "@/setup/RemoteAction"
import { computed, effect, ReadonlySignal } from "@/setup/Signal"
import { RemoteActionToConfirm, requireConfirmation } from "./RemoteActionToConfirm"

export interface TodoPageModel {
  getTodoList: RemoteAction<Todo[]>
  canPatchAnyTodo: ReadonlySignal<boolean>

  toggleTodo: (todo: Todo) => Promise<void>
  changeTodoTitle: (todo: Todo, title: string) => Promise<void>
  deleteTodo: RemoteActionToConfirm<Todo, [todo: Todo]>

  dispose: () => void
}

export function makeTodoPageModel(api: JsonPlaceholderApi): TodoPageModel {
  const getTodoList = createRemoteAction(() => api.getTodos())

  const patchTodo = createRemoteAction(api.patchTodo.bind(api))
  const deleteTodo = requireConfirmation(
    createRemoteAction(async (todo: Todo) => {
      await api.deleteTodo(todo.id)
      return todo
    }),
  )

  return {
    getTodoList,
    canPatchAnyTodo: computed(() => {
      return patchTodo.data.get().state !== "pending" &&
        deleteTodo.data.get().state !== 'pending'
    }),
    deleteTodo,
    toggleTodo: (todo) => {
      return patchTodo.trigger(todo.id, { completed: !todo.completed })
    },
    changeTodoTitle: (todo, title) => {
      return patchTodo.trigger(todo.id, { title })
    },
    dispose: registerEffects(),
  }

  function registerEffects() {
    const disposeEffectOnPatch = effect(() => {
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

    const disposeEffectOnDelete = effect(() => {
      const data = deleteTodo.data.get()
      if (data.state !== "success") return
      // update the current todo list:
      getTodoList.data.update((list) => {
        if (list.state !== "success") return list
        const nextList = list.value.filter((todo) => todo.id !== data.value.id)
        return { state: "success", value: nextList }
      })
    })
    
    return () => {
      disposeEffectOnPatch()
      disposeEffectOnDelete()
    }
  }
}
