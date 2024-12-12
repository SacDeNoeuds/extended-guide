<script setup lang="ts">
  import { signalRef } from '@/7-vue-app/signalRef'
  import { AppModel } from '../AppModel'
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