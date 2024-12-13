export interface ReadonlySignal<T> {
  get: () => T
}

export interface Signal<T> extends ReadonlySignal<T> {
  set: (value: T) => void
  update: (updater: (value: T) => T) => void
}

type CreateSignalOptions<T> = {
  equals?: (a: T, b: T) => boolean
}

export type CreateSignal = <T>(
  initialValue: T,
  options?: CreateSignalOptions<T>,
) => Signal<T>

type Cleanup = () => void
type Dispose = () => void

export type Effect = (callback: () => void | Cleanup) => Dispose

/**
 * @example
 * ```ts
 * const price = createSignal(0)
 * const tax = createSignal(0.4)
 * const total = computed(() => price.get() * (1 + tax.get()))
 * ```
 */
export function computed<T>(compute: () => T): ReadonlySignal<T> {
  return {
    get: () => compute(),
  }
}

// the implementation complies to type definitions upper.
export { effect, createSignal } from './Signal.s-js'
