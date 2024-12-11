<script setup lang="ts">
import { TodoPageModel } from '../../models/TodoPageModel'
import TodoList from './TodoList.vue'

  const props = defineProps<{ model: TodoPageModel }>()
  const model = props.model
</script>

<template>
  <div>
    <p>Todo Page in Vue</p>
    <TodoList :model="model.components.todoList" />
  </div>
</template>