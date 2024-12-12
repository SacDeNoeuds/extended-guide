# The `Vue` App

## The reactivity system adapter – `signalRef`

Because our `AppModel` is defined using our [reactivity system](./3-reactivity-system.md), we need to adapt it to Vue. Vue relies on the `ref` concept, so let’s adapt our signal:

```ts
// src/7-vue-app/signalRef.ts

import { onUnmounted, ref } from 'vue'
import { effect, ReadonlySignal } from '../setup/Signal'

export function signalRef<T>(signal: ReadonlySignal<T>) {
  const value = ref(signal.get())

  const dispose = effect(() => {
    value.value = signal.get()
  })
  
  onUnmounted(dispose)

  return value
}
```

As you can see, the adapter is quite simple.

## The `App` component

We will adapt the `route` signal to a Vue state, and handle both cases `NotFound` and `TodoListPage`.

```vue
// src/7-vue-app/App.vue

<script setup lang="ts">
  import { AppModel } from '../5-app-model/AppModel'
  import { signalRef } from './signalRef'
  import TodoPage from './TodoPage.vue'

  const props = defineProps<{ model: AppModel }>()
  const model = props.model

  const route = signalRef(model.route)
</script>

<template>
  <h2>Vue App</h2>
  <p v-if="route.name === 'NotFound'">
    Page Not Found
    <button type="button" @click="model.goToTodos">Go to todos</button>
  </p>
  <TodoPage
    v-if="route.name === 'TodoListPage'"
    :model="route.make()"
  />
</template>
```

## The `TodoPage` component

We will adapt the `todos` signal to a React state, and display the remote list of todos, leveraging a yet-to-create `<RemoteData />` component.

```vue
// src/7-vue-app/TodoPage.vue

<script setup lang="ts">
  import { onMounted } from 'vue'
  import { TodoPageModel } from '../5-app-model/TodoPageModel'
  import { signalRef } from './signalRef'
  import RemoteData from './RemoteData.vue'
  import TodoUnorderedList from './TodoUnorderedList.vue'

  const props = defineProps<{ model: TodoPageModel }>()
  const model = props.model

  const todos = signalRef(model.todos.data)

  // fetch the todos on mount.
  onMounted(() => void model.todos.trigger())
</script>

<template>
  <div>
    <p>Todo Page in Vue</p>
    <RemoteData :data="todos">
      <template #success="{ value }">
        <TodoUnorderedList :todos="value" />
      </template>
    </RemoteData>
  </div>
</template>
```

## The `TodoUnorderedList` component

This one is purely presentational, nothing much to say:

```vue
// src/7-vue-app/TodoUnorderedList.vue

<script setup lang="ts">
  import { Todo } from '../setup/Api'

  const props = defineProps<{ todos: Todo[] }>()
</script>

<template>
  <ul>
    <li v-for="todo in props.todos">{{ todo.title }}</li>
  </ul>
</template>
```

## And finally, the `RemoteData` component

This one is key for readability, it also enables the possibility to handle all the errors at a dedicated place, while still allowing customization.

```vue
// src/7-vue-app/RemoteData.vue

<script setup lang="ts" generic="T">
  import { RemoteData } from '../setup/RemoteData'

  defineProps<{ data: RemoteData<T> }>()
</script>

<template>
  <slot v-if="data.state === 'initial'" name="initial">
    <p>Waiting for data to be loaded</p>
  </slot>

  <slot v-else-if="data.state === 'pending'" name="pending">
    <p>Loading…</p>
  </slot>

  <slot v-else-if="data.state === 'failure'" name="failure" :error="data.error">
    <p>Error: {{ data.error.message }}</p>
  </slot>

  <slot v-else name="success" :value="data.value"></slot>
</template>
```

---

Excellent, everything is in place. We can now [render these apps](./8-rendering-the-apps.md) 😁