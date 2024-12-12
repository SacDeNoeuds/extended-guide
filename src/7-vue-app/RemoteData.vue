<script setup lang="ts" generic="T">
  import { RemoteData } from '../setup/RemoteData'

  defineProps<{ data: RemoteData<T> }>()
</script>

<template>
  <slot v-if="data.state === 'initial'" name="initial">
    <p>Waiting for data to be loaded</p>
  </slot>

  <slot v-else-if="data.state === 'pending'" name="pending">
    <p>Loading…</p>
  </slot>

  <slot v-else-if="data.state === 'failure'" name="failure" :error="data.error">
    <p>Error: {{ data.error.message }}</p>
  </slot>

  <slot v-else name="success" :value="data.value"></slot>
</template>
