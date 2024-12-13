<script setup lang="ts">
  import { onMounted } from 'vue'
  import { TodoPageModel } from '../5-app-model/TodoPageModel'
  import { signalRef } from './signalRef'
  import RemoteData from './RemoteData.vue'
  import TodoUnorderedList from './TodoUnorderedList.vue'

  const props = defineProps<{ model: TodoPageModel }>()
  const model = props.model

  const todos = signalRef(model.getTodoList.data)

  // fetch the todos on mount.
  onMounted(() => void model.getTodoList.trigger())
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
