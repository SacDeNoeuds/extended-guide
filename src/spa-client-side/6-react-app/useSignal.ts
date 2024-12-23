import { useEffect, useState } from 'react'
import { effect, ReadonlySignal } from '@/spa-client-side/setup/Signal'

export function useSignal<T>(signal: ReadonlySignal<T>): T {
  const [state, setState] = useState(signal.get())

  useEffect(() => {
    const dispose = effect(() => {
      setState(signal.get())
    })
    return dispose
  }, [signal])

  return state
}
