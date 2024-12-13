import { TodoApi, Todo } from '@/setup/TodoApi'
import { createRemoteAction, RemoteAction } from '@/setup/RemoteAction'
import { computed, effect, ReadonlySignal } from '@/setup/Signal'

export interface TodoPageModel {
  getTodoList: RemoteAction<Todo[]>
  canPatchAnyTodo: ReadonlySignal<boolean>

  toggleTodo: (todo: Todo) => Promise<void>
  changeTodoTitle: (todo: Todo, title: string) => Promise<void>

  dispose: () => void
}

export function makeTodoPageModel(api: TodoApi): TodoPageModel {
  const getTodoList = createRemoteAction(api.getTodos.bind(api))

  const patchTodo = createRemoteAction(api.patchTodo.bind(api))

  return {
    getTodoList,
    canPatchAnyTodo: computed(() => patchTodo.data.get().state !== 'pending'),
    toggleTodo: (todo) => {
      return patchTodo.trigger(todo.id, { completed: !todo.completed })
    },
    changeTodoTitle: (todo, title) => {
      return patchTodo.trigger(todo.id, { title })
    },
    dispose: registerEffects(),
  }

  function registerEffects() {
    const dispose = effect(() => {
      const data = patchTodo.data.get()
      if (data.state !== 'success') return
      // update the current todo list:
      getTodoList.data.update((list) => {
        if (list.state !== 'success') return list

        // replace the todo in the list by the patched todo
        const nextList = list.value.map((todo) => {
          return todo.id === data.value.id ? data.value : todo
        })

        return { state: 'success', value: nextList }
      })
    })
    return dispose
  }
}
