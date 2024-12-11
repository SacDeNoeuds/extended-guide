import S from 's-js'

export interface ReadonlySignal<T> {
  get: () => T
}

export interface Signal<T> extends ReadonlySignal<T> {
  set: (value: T) => void;
  update: (updater: (value: T) => T) => void
}

type CreateSignalOptions<T> = {
  equals?: (a: T, b: T) => boolean
}

export function createSignal<T>(value: T, options?: CreateSignalOptions<T>): Signal<T> {
  const signal = options?.equals ? S.value(value, options.equals) : S.data(value)
  return {
    get: signal,
    set: (nextValue) => signal(nextValue),
    update: (updater) => signal(updater(S.sample(signal)))
  }
}

export function readonly<T>(signal: Signal<T>): ReadonlySignal<T> {
  return { get: signal.get }
}

type Cleanup = () => void
type Dispose = () => void

export function effect(callback: () => (void | Cleanup)): Dispose {
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
