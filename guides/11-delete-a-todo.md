# Delete a todo

A deletion usually involves a confirmation step. Let’s model that first.

## `RemoteActionToConfirm<T, Args>`

The only difference with `RemoteAction<T>` is that we will add an intermediary step. `trigger(…)` will not execute anything yet and wait for a `confirm()`-ation or `cancel()`-ation.

```ts
// src/11-delete-a-todo/RemoteActionToConfirm.ts

import { RemoteAction } from '@/setup/RemoteAction'
import { RemoteData } from '@/setup/RemoteData'
import { createSignal, ReadonlySignal, Signal } from '@/setup/Signal'

export interface RemoteActionToConfirm<T, Args extends any[]> {
  readonly data: ReadonlySignal<RemoteData<T>>
  readonly pendingApproval: Signal<Args | undefined>
  ask: (...args: Args) => void
  cancel: () => void
  confirm: () => Promise<void>
}

export function requireConfirmation<T, Args extends any[]>(
  action: RemoteAction<T, Args>,
): RemoteActionToConfirm<T, Args> {
  return {
    data: action.data,
    pendingApproval: createSignal<Args | undefined>(undefined),
    ask(...args) {
      this.pendingApproval.set(args)
    },
    cancel() {
      this.pendingApproval.set(undefined)
    },
    async confirm() {
      const args = this.pendingApproval.get()
      if (!args) return // or throw?
      await action.trigger(...args)
      if (action.data.get().state === 'success') {
        this.pendingApproval.set(undefined)
      }
    }
  }
}
```

Great, now let’s test it properly:

```ts
// src/11-delete-a-todo/RemoteActionToConfirm.spec.ts

import { beforeAll, describe, expect, it } from 'vitest'
import { requireConfirmation } from './RemoteActionToConfirm'
import { createRemoteAction } from '@/setup/RemoteAction'

const updateCount = (_count: number) => Promise.resolve()
const make = (updateCount: (count: number) => Promise<void>) => {
  const action = createRemoteAction(updateCount)
  const actionToConfirm = requireConfirmation(action)
  return actionToConfirm
}

describe('RemoteActionToConfirm', () => {
  it('starts as initial', () => {
    const actionToConfirm = make(updateCount)
    expect(actionToConfirm.data.get()).toEqual({ state: 'initial' })
  })
  
  it('waits for confirmation', () => {
    const actionToConfirm = make(updateCount)
    actionToConfirm.ask(12)
    expect(actionToConfirm.data.get()).toEqual({ state: 'initial' })
    expect(actionToConfirm.pendingApproval.get()).toEqual([12])
  })

  it('cancels action', () => {
    const actionToConfirm = make(updateCount)
    actionToConfirm.ask(12)
    actionToConfirm.cancel()
    expect(actionToConfirm.data.get()).toEqual({ state: 'initial' })
    expect(actionToConfirm.pendingApproval.get()).toEqual(undefined)
  })

  describe('confirmation', () => {
    describe('when action succeeds', () => {
      const actionToConfirm = make(updateCount)
      actionToConfirm.ask(12)
      beforeAll(() => actionToConfirm.confirm())
  
      it('reports success', () => {
        expect(actionToConfirm.data.get()).toEqual({ state: 'success' })
      })

      it('removes data to confirm', () => {
        expect(actionToConfirm.pendingApproval.get()).toEqual(undefined)
      })
    })

    describe('when action fails', () => {
      const error = new Error('oops')
      const actionToConfirm = make(() => Promise.reject(error))
      actionToConfirm.ask(12)
      beforeAll(() => actionToConfirm.confirm())
  
      it('reports failure', () => {
        expect(actionToConfirm.data.get()).toEqual({ state: 'failure', error })
      })

      it('keeps data to confirm', () => {
        expect(actionToConfirm.pendingApproval.get()).toEqual([12])
      })
    })
  })
})
```

## Updating the `TodoPageModel`

We need to update the `TodoPageModel` to include a `deleteTodo(id)` action, and remove the deleted todo from the list upon deletion success.

For readability, define all the effects in a dedicated `registerEffects` function which returns a `dispose` function.

```ts
// src/11-delete-a-todo/TodoPageModel.ts

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
```

## Updating React components

Let’s add the delete button to the checkbox list:

```tsx
// src/11-delete-a-todo/react/TodoCheckboxList.tsx

/** @jsx React.createElement */
import React from "react"
import { Todo } from "../../setup/Api"

interface Props {
  todos: Todo[]
  onToggle: (todo: Todo) => unknown
  onTitleChanged: (todo: Todo, title: string) => unknown
  onDelete: (todo: Todo) => unknown
  disabled: boolean
}
export function TodoCheckboxList({
  todos,
  onToggle,
  onTitleChanged,
  onDelete,
  disabled,
}: Props) {
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
          &emsp;
          <input
            type="text"
            disabled={disabled}
            defaultValue={todo.title}
            onBlur={(event) => {
              const nextTitle = event.target.value
              if (nextTitle === todo.title) return
              return onTitleChanged(todo, nextTitle)
            }}
          />
          &emsp;
          <button type="button" onClick={() => onDelete(todo)} disabled={disabled}>
            🗑️
          </button>
        </div>
      ))}
    </div>
  )
}
```

Now that we did, let’s create a `ConfirmActionDialog` to handle any `RemoteActionToConfirm`:

```tsx
// src/11-delete-a-todo/react/ConfirmActionDialog.tsx

/** @jsx React.createElement */
import React from "react"
import { RemoteActionToConfirm } from "@/setup/RemoteActionToConfirm"
import { useSignal } from '@/6-react-app/useSignal'

interface Props<T, Args extends any[]> {
  action: RemoteActionToConfirm<T, Args>
  children: (...args: Args) => React.ReactNode
}

export function ConfirmActionDialog<T, Args extends any[]>({
  action,
  children,
}: Props<T, Args>) {
  const data = useSignal(action.data)
  const pendingApproval = useSignal(action.pendingApproval)

  return (
    <dialog open={!!pendingApproval}>
      <header>Confirm</header>

      <div>{pendingApproval && children(...pendingApproval)}</div>

      <footer>
        <button type="button" onClick={() => action.cancel()}>
          Cancel
        </button>

        <button
          type="button"
          onClick={() => action.confirm()}
          disabled={data.state === "pending"}
        >
          Confirm
        </button>
      </footer>
    </dialog>
  )
}
```

Now we can render it like so in our `TodoPage` component:

```tsx
// TodoPage.tsx

<ConfirmActionDialog action={model.deleteTodo}>
  {(todo) => <>You are about to delete "{todo.title}", continue?</>}
</ConfirmActionDialog>
```

## Updating Vue components

Let’s add the delete button to the checkbox list:

```vue
// src/11-delete-a-todo/vue/TodoCheckboxList.vue

<script setup lang="ts">
  import { Todo } from '@/setup/Api'

  const props = defineProps<{
    todos: Todo[]
    disabled: boolean
  }>()
  const emit = defineEmits<{
    toggle: [todo: Todo]
    titleChanged: [todo: Todo, title: string]
    delete: [todo: Todo]
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
      &emsp;
      <button
        type="button"
        @click="emit('delete', todo)"
        :disabled="props.disabled"
      >
        🗑️
      </button>
    </div>
  </div>
</template>
```

Now that we did, let’s create a `ConfirmActionDialog` to handle any `RemoteActionToConfirm`:

```vue
// src/11-delete-a-todo/vue/ConfirmActionDialog.vue

<script setup lang="ts" generic="T, Args extends any[]">
import { signalRef } from '@/7-vue-app/signalRef'
import { RemoteActionToConfirm } from '../RemoteActionToConfirm'

  const props = defineProps<{
    action: RemoteActionToConfirm<T, Args>
  }>()

  const pendingApproval = signalRef(props.action.pendingApproval)
  const data = signalRef(props.action.data)
</script>

<template>
  <dialog :open="!!pendingApproval">
    <header>Confirm</header>

    <slot v-if="pendingApproval" :value="pendingApproval"></slot>

    <footer>
      <button type="button" @click="() => action.cancel()">
        Cancel
      </button>

      <button
        type="button"
        @click="() => action.confirm()"
        :disabled="data.state === 'pending'"
      >
        Confirm
      </button>
    </footer>
  </dialog>
</template>
```

Now we can render it like so in our `TodoPage` component:

```tsx
// TodoPage.vue

<ConfirmActionDialog action={model.deleteTodo}>
  {(todo) => <>You are about to delete "{todo.title}", continue?</>}
</ConfirmActionDialog>
```

---

Congrats, you have reached the end of the series!

I hope everything got crystal clear and you are fully familiar with the concepts in this guide.

If you have any feedback or suggestions, you can open an issue on [GitHub](https://github.com/SacDeNoeuds/model-view-demo/issues) or [create a PR](https://github.com/SacDeNoeuds/model-view-demo/pulls) ❤️.
