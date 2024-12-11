<script setup lang="ts">
import { onMounted } from 'vue'
import { TodoListModel } from '../../models/TodoListModel'
import { signalRef } from './signalRef'

  const props = defineProps<{ model: TodoListModel }>()
  const model = props.model

  const data = signalRef(model.data)
  onMounted(() => model.getTodos())
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 0.5rem">
    <p v-if="data.state === 'initial'">Waiting for data to be loaded</p>
    <p v-else-if="data.state === 'pending'">Loading…</p>
    <p v-else-if="data.state === 'failure'">
      Error: {{data.error.message}}
    </p>
    <ul v-else>
      <li v-for="todo in data.value">
        {{todo.title}}
      </li>
    </ul>
  </div>
</template>