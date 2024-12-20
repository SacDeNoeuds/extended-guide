<script setup lang="ts">
import { Todo } from '@/setup/TodoApi'

const props = defineProps<{ todos: Todo[] }>()
</script>

<template>
  <ul>
    <li v-for="todo in props.todos">{{ todo.title }}</li>
  </ul>
</template>
