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

export type CreateSignal = <T>(initialValue: T, options?: CreateSignalOptions<T>) => Signal<T>

type Cleanup = () => void
type Dispose = () => void

export type Effect = (callback: () => (void | Cleanup)) => Dispose

// the implementation complies to type upper.
export { effect, createSignal } from './Signal.s-js'

