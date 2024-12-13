<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { signalRef } from '@/7-vue-app/signalRef'
import RemoteData from '@/7-vue-app/RemoteData.vue'
import TodoCheckboxList from './TodoCheckboxList.vue'
import { TodoPageModel } from '../TodoPageModel'
import ConfirmActionDialog from './ConfirmActionDialog.vue'

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

    <ConfirmActionDialog :action="model.deleteTodo">
      <template #default="{ value: [todo] }">
        You are about to delete "{{ todo.title }}", continue?
      </template>
    </ConfirmActionDialog>

    <RemoteData :data="todoList">
      <template #success="{ value }">
        <TodoCheckboxList
          :todos="value"
          :disabled="!canPatchAnyTodo"
          @toggle="model.toggleTodo"
          @title-changed="model.changeTodoTitle"
          @delete="(todo) => model.deleteTodo.ask(todo)"
        />
      </template>
    </RemoteData>
  </div>
</template>
