import S from 's-js'
import { CreateSignal, Effect } from './Signal'

export const createSignal: CreateSignal = (value, options) => {
  const signal = options?.equals
    ? S.value(value, options.equals)
    : S.data(value)
  return {
    get: signal,
    set: (nextValue) => signal(nextValue),
    update: (updater) => signal(updater(S.sample(signal))),
  }
}

export const effect: Effect = (callback) => {
  let disposeRef = () => {}
  const dispose = () => disposeRef()
  S.root((dispose) => {
    disposeRef = dispose
    S(() => {
      const cleanup = callback()
      if (typeof cleanup === 'function') S.cleanup(cleanup)
    })
  })
  return dispose
}
