# Toggle a Todo

## Model

We can add a `toggleTodo` action on our `TodoPageModel`:

```ts
// src/9-toggle-todo/TodoPageModel-attempt-1.ts

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
```

Great, now let’s update the list upon toggle-todo-success:

```ts
// src/9-toggle-todo/TodoPageModel.ts

import { JsonPlaceholderApi, Todo } from "../setup/Api"
import { createRemoteAction, RemoteAction } from "../setup/RemoteAction"
import { effect } from "../setup/Signal"

export interface TodoPageModel {
  getTodoList: RemoteAction<Todo[]>
  toggleTodo: RemoteAction<Todo, [todo: Todo]>

  dispose: () => void
}

export function makeTodoPageModel(api: JsonPlaceholderApi): TodoPageModel {
  const getTodoList = createRemoteAction(() => api.getTodos())

  const toggleTodo = createRemoteAction((todo: Todo) => {
    return api.patchTodo(todo.id, { completed: !todo.completed })
  })

  const dispose = effect(() => {
    const data = toggleTodo.data.get()
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
    toggleTodo,
    dispose,
  }
}
```

## Updating the React components

Now instead of an unordered list, we will render a checkbox list:

```tsx
// src/9-toggle-todo/react/TodoCheckboxList.tsx

/** @jsx React.createElement */
import React from "react"
import { Todo } from "../../setup/Api"

interface Props {
  todos: Todo[]
  onToggle: (todo: Todo) => unknown
  disabled: boolean
}
export function TodoCheckboxList({ todos, onToggle, disabled }: Props) {
  return (
    <div>
      {todos.map((todo) => (
        <label key={todo.id} className='todo-item'>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo)}
            disabled={disabled}
          />
          <span>{todo.title}</span>
        </label>
      ))}
    </div>
  )
}
```

Let’s update our `TodoPage` component to render a checkbox list:

```tsx
// src/9-toggle-todo/react/TodoPage.tsx

/** @jsx React.createElement */
import React from 'react'
import { RemoteData } from '@/6-react-app/RemoteData'
import { useSignal } from '@/6-react-app/useSignal'
import { useEffect } from "react"
import { TodoPageModel } from '../TodoPageModel'
import { TodoCheckboxList } from "./TodoCheckboxList"

interface Props {
  model: TodoPageModel
}

export function TodoPage({ model }: Props) {
  const todoList = useSignal(model.getTodoList.data)
  const toggleData = useSignal(model.toggleTodo.data)

  // fetch the todo list on mount.
  useEffect(() => {
    void model.getTodoList.trigger()
    // explicitly mark the promise as non-awaiting with `void`
  }, [])

  // dispose on unmount.
  useEffect(() => model.dispose, [])

  return (
    <div>
      <p>Todo Page in React</p>
      <RemoteData
        data={todoList}
        success={(todos) => (
          <TodoCheckboxList
            todos={todos}
            onToggle={model.toggleTodo.trigger}
            disabled={toggleData.state === 'pending'}
          />
        )}
      />
    </div>
  )
}
```

## Updating the Vue components

The checkbox list components:

```tsx
// src/9-toggle-todo/vue/TodoCheckboxList.vue

<script setup lang="ts">
  import { Todo } from '@/setup/Api'

  const props = defineProps<{
    todos: Todo[]
    disabled: boolean
  }>()
  const emit = defineEmits<{
    toggle: [todo: Todo]
  }>()
</script>

<template>
  <div class='todo-item'>
    <label v-for="todo in props.todos" style="display: block;">
      <input type="checkbox" :checked="todo.completed" :disabled="props.disabled" @change="emit('toggle', todo)" />
      <span>{{ todo.title }}</span>
    </label>
  </div>
</template>
```

The `TodoPage` component:

```vue
// src/9-toggle-todo/vue/TodoPage.vue

<script setup lang="ts">
  import { onMounted, onUnmounted } from 'vue'
  import { signalRef } from '@/7-vue-app/signalRef'
  import TodoCheckboxList from './TodoCheckboxList.vue'
  import { TodoPageModel } from '../TodoPageModel'
  import RemoteData from '@/7-vue-app/RemoteData.vue'

  const props = defineProps<{ model: TodoPageModel }>()
  const model = props.model

  const todoList = signalRef(model.getTodoList.data)
  const toggleData = signalRef(model.toggleTodo.data)

  // fetch the todos on mount.
  onMounted(() => void model.getTodoList.trigger())

  onUnmounted(model.dispose)
</script>

<template>
  <div>
    <p>Todo Page in Vue</p>
    <RemoteData :data="todoList">
      <template #success="{ value }">
        <TodoCheckboxList
          :todos="value"
          :disabled="toggleData.state === 'pending'"
          @toggle="model.toggleTodo.trigger"
        />
      </template>
    </RemoteData>
  </div>
</template>
```

---

Next step: [update a todo title](./10-update-a-todo-title.md)