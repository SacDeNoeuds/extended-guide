<script setup lang="ts" generic="T, Args extends any[]">
import { signalRef } from '@/spa-client-side/7-vue-app/signalRef'
import { RemoteActionToConfirm } from '../RemoteActionToConfirm'

const props = defineProps<{
  action: RemoteActionToConfirm<T, Args>
}>()

const pendingApproval = signalRef(props.action.pendingApproval)
const data = signalRef(props.action.data)
</script>

<template>
  <dialog :open="!!pendingApproval">
    <header>Confirm</header>

    <slot v-if="pendingApproval" :value="pendingApproval"></slot>

    <footer>
      <button type="button" @click="() => action.cancel()">Cancel</button>

      <button
        type="button"
        @click="() => action.confirm()"
        :disabled="data.state === 'pending'"
      >
        Confirm
      </button>
    </footer>
  </dialog>
</template>
