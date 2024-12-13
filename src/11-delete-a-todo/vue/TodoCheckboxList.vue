<script setup lang="ts">
import { Todo } from '@/setup/TodoApi'

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
