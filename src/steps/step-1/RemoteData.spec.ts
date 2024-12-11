import { describe, expect, it } from 'vitest'
import { createRemoteAction } from './RemoteData'

describe('createRemoteAction', () => {
  it('starts as pending', () => {
    const action = createRemoteAction(() => Promise.resolve([]))
    expect(action.data.get()).toBe('pending')
  })
  
  it('reports failures', async () => {
    const error = new Error('oops')
    const action = createRemoteAction(() => Promise.reject(error))
    await action.trigger()
    expect(action.data.get()).toBe(error)
  })

  it('presents data', async () => {
    const data = { foo: 'bar' }
    const action = createRemoteAction(async () => data)
    await action.trigger()
    expect(action.data.get()).toBe(data)
  })
})