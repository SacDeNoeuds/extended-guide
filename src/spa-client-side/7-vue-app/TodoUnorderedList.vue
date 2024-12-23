<script setup lang="ts">
import { Todo } from '@/spa-client-side/setup/TodoApi'

const props = defineProps<{ todos: Todo[] }>()
</script>

<template>
  <ul>
    <li v-for="todo in props.todos">{{ todo.title }}</li>
  </ul>
</template>
