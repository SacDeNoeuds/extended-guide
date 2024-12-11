import { describe, expect, it } from 'vitest'
import { createRemoteAction } from './RemoteAction'

describe('createRemoteAction', () => {
  it('starts as initial', () => {
    const action = createRemoteAction(() => Promise.resolve([]))
    expect(action.data.get()).toEqual({ state: 'initial' })
  })

  it('turns to "pending" when fetching', async () => {
    let resolve = () => {}
    const action = createRemoteAction(() => {
      return new Promise<void>((r) => {
        resolve = r
      })
    })
    action.trigger()
    expect(action.data.get()).toEqual({ state: 'pending' })
    resolve()
  })
  
  it('reports failures', async () => {
    const error = new Error('oops')
    const action = createRemoteAction(() => Promise.reject(error))
    await action.trigger()
    expect(action.data.get()).toEqual({ state: 'failure', error })
  })

  it('presents data', async () => {
    const data = { foo: 'bar' }
    const action = createRemoteAction(async () => data)
    await action.trigger()
    expect(action.data.get()).toEqual({ state: 'success', value: data })
  })

  it('takes arguments into account', async () => {
    const action = createRemoteAction(async (count: number) => count)
    await action.trigger(12)
    expect(action.data.get()).toEqual({ state: 'success', value: 12 })
  })
})