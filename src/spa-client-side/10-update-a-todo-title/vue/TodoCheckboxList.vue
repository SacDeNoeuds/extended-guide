<script setup lang="ts">
import { Todo } from '@/spa-client-side/setup/TodoApi'

const props = defineProps<{
  todos: Todo[]
  disabled: boolean
}>()
const emit = defineEmits<{
  toggle: [todo: Todo]
  titleChanged: [todo: Todo, title: string]
}>()

function maybeEmitTitleChanged(todo: Todo, event: FocusEvent) {
  const nextTitle = (event.target as HTMLInputElement).value
  if (nextTitle === todo.title) return
  emit('titleChanged', todo, nextTitle)
}
</script>

<template>
  <div>
    <div v-for="todo in props.todos" class="todo-item">
      <input
        type="checkbox"
        :checked="todo.completed"
        :disabled="props.disabled"
        @change="emit('toggle', todo)"
      />
      <input
        type="text"
        :value="todo.title"
        :disabled="props.disabled"
        @blur="(event) => maybeEmitTitleChanged(todo, event)"
      />
    </div>
  </div>
</template>
