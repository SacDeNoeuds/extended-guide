# Rename a todo title

## Updating the `TodoPageModel`

We can leverage a generic `patchTodo` action and use for both toggling a todo and changing a todo’s title:

```ts
// src/10-update-a-todo-title/TodoPageModel.ts

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
```

## Updating the React components

Now let’s update our `TodoCheckboxList` component to add an input:

```tsx
// src/10-update-a-todo-title/react/TodoCheckboxList.tsx

/** @jsx React.createElement */
import React from "react"
import { Todo } from "../../setup/Api"

interface Props {
  todos: Todo[]
  onToggle: (todo: Todo) => unknown
  onTitleChanged: (todo: Todo, title: string) => unknown
  disabled: boolean
}
export function TodoCheckboxList({ todos, onToggle, onTitleChanged, disabled }: Props) {
  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id} className='todo-item'>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo)}
            disabled={disabled}
          />
          <input
            type="text"
            disabled={disabled}
            defaultValue={todo.title} onBlur={((event) => {
              const nextTitle = event.target.value
              if (nextTitle === todo.title) return
              return onTitleChanged(todo, nextTitle)
            })}
          />
        </div>
      ))}
    </div>
  )
}
```

## Updating the Vue components

Same, let’s update our `TodoCheckboxList` component to add an input:

```vue
// src/10-update-a-todo-title/vue/TodoCheckboxList.vue

<script setup lang="ts">
  import { Todo } from '@/setup/Api'

  const props = defineProps<{
    todos: Todo[]
    disabled: boolean
  }>()
  const emit = defineEmits<{
    toggle: [todo: Todo]
    titleChanged: [todo: Todo, title: string]
  }>()

  function maybeEmitTitleChanged(todo: Todo, event: FocusEvent) {
    const nextTitle = (event.target as HTMLInputElement).value
    if (nextTitle === todo.title) return
    emit('titleChanged', todo, nextTitle)
  }
</script>

<template>
  <div>
    <div v-for="todo in props.todos" class='todo-item'>
      <input
        type="checkbox"
        :checked="todo.completed"
        :disabled="props.disabled"
        @change="emit('toggle', todo)"
      />
      &emsp;
      <input
        type="text"
        :value="todo.title"
        :disabled="props.disabled"
        @blur="(event) => maybeEmitTitleChanged(todo, event)"
      />
    </div>
  </div>
</template>
```

---

Next step: [delete a todo](./11-delete-a-todo.md)
