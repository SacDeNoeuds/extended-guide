<script setup lang="ts">
import { AppModel } from '../../models/AppModel'
import { signalRef } from './signalRef'
import TodoPage from './TodoPage.vue'

  const props = defineProps<{ model: AppModel }>()
  const model = props.model

  const activePage = signalRef(model.activePage)
</script>

<template>
  <p>Vue App</p>
  <p v-if="activePage.name === 'NotFound'">Page Not Found</p>
  <TodoPage
    v-if="activePage.name === 'Todos'"
    :model="activePage.createModel()"
  />
</template>