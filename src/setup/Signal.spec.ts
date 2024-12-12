import { afterAll, describe, expect, it } from 'vitest'
import { createSignal, effect } from './Signal.s-js'

const make = (initialCount = 0) => {
  return createSignal(
    { count: initialCount },
    { equals: (a, b) => a.count === b.count }
  )
}

describe('Signal', () => {
  it('gets the value', () => {
    const signal = make(0)
    expect(signal.get()).toEqual({ count: 0 })
  })

  it('sets the value', () => {
    const signal = make(0)
    signal.set({ count: 1 })
    expect(signal.get()).toEqual({ count: 1 })
  })

  it('updates the value', () => {
    const signal = make(0)
    signal.update(({ count }) => ({ count: count + 1 }))
    expect(signal.get()).toEqual({ count: 1 })
  })

  describe('reactivity', () => {
    const signal = make(0)
    let value = signal.get().count
    let cleaned = false;

    const dispose = effect(() => {
      value = signal.get().count
      return () => void (cleaned = true)
    })
    signal.set({ count: 1 })
    afterAll(dispose)

    it('listens to changes', () => {
      expect(value).toBe(1)
    })
  
    it('cleans up', () => {
      expect(cleaned).toBe(true)
    })
  })

  it('works with nested conditions', () => {
    const isOpened = createSignal(false)
    const name = createSignal('John')
    let value = 'Jack'
    const dispose = effect(() => {
      if (isOpened.get()) value = name.get()
    })
    name.set('Mary')
    expect(value).toBe('Jack')
    isOpened.set(true)
    expect(value).toBe('Mary')
    name.set('Ada')
    expect(value).toBe('Ada')
    dispose()
  })
})