import { onUnmounted, ref } from 'vue'
import { effect, ReadonlySignal } from '@/spa-client-side/setup/Signal'

export function signalRef<T>(signal: ReadonlySignal<T>) {
  const value = ref(signal.get())

  const dispose = effect(() => {
    value.value = signal.get()
  })

  onUnmounted(dispose)

  return value
}
