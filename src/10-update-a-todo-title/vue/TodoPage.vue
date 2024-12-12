<script setup lang="ts">
  import { onMounted, onUnmounted } from 'vue'
  import { signalRef } from '@/7-vue-app/signalRef'
  import TodoCheckboxList from './TodoCheckboxList.vue'
  import { TodoPageModel } from '../TodoPageModel'
  import RemoteData from '@/7-vue-app/RemoteData.vue'

  const props = defineProps<{ model: TodoPageModel }>()
  const model = props.model

  const todoList = signalRef(model.getTodoList.data)
  const canPatchAnyTodo = signalRef(model.canPatchAnyTodo)

  // fetch the todos on mount.
  onMounted(() => void model.getTodoList.trigger())

  onUnmounted(model.dispose)
</script>

<template>
  <div>
    <p>Todo Page in Vue</p>
    <RemoteData :data="todoList">
      <template #success="{ value }">
        <TodoCheckboxList
          :todos="value"
          :disabled="!canPatchAnyTodo"
          @toggle="model.toggleTodo"
          @title-changed="model.changeTodoTitle"
        />
      </template>
    </RemoteData>
  </div>
</template>
