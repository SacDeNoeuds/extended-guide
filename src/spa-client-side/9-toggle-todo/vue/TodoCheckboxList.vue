<script setup lang="ts">
import { Todo } from '@/spa-client-side/setup/TodoApi'

const props = defineProps<{
  todos: Todo[]
  disabled: boolean
}>()
const emit = defineEmits<{
  toggle: [todo: Todo]
}>()
</script>

<template>
  <div class="todo-item">
    <label v-for="todo in props.todos" style="display: block">
      <input
        type="checkbox"
        :checked="todo.completed"
        :disabled="props.disabled"
        @change="emit('toggle', todo)"
      />
      <span>{{ todo.title }}</span>
    </label>
  </div>
</template>
