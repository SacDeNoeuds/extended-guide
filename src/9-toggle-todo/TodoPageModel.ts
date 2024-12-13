import { JsonPlaceholderApi, Todo } from '@/setup/Api'
import { createRemoteAction, RemoteAction } from '@/setup/RemoteAction'
import { effect } from '@/setup/Signal'

export interface TodoPageModel {
  getTodoList: RemoteAction<Todo[]>
  toggleTodo: RemoteAction<Todo, [todo: Todo]>

  dispose: () => void
}

export function makeTodoPageModel(api: JsonPlaceholderApi): TodoPageModel {
  const getTodoList = createRemoteAction(api.getTodos.bind(api))

  const toggleTodo = createRemoteAction((todo: Todo) => {
    return api.patchTodo(todo.id, { completed: !todo.completed })
  })

  return {
    getTodoList,
    toggleTodo,
    dispose: registerEffects(),
  }

  function registerEffects() {
    const dispose = effect(() => {
      const data = toggleTodo.data.get()
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
