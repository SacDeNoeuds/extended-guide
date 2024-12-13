import { beforeAll, describe, expect, it } from 'vitest'
import { createRemoteAction } from './RemoteAction'
import { requireConfirmation } from './RemoteActionToConfirm'

const updateCount = (_count: number) => Promise.resolve()
const make = (updateCount: (count: number) => Promise<void>) => {
  const action = createRemoteAction(updateCount)
  const actionToConfirm = requireConfirmation(action)
  return actionToConfirm
}

describe('RemoteActionToConfirm', () => {
  it('starts as initial', () => {
    const actionToConfirm = make(updateCount)
    expect(actionToConfirm.data.get()).toEqual({ state: 'initial' })
  })

  it('waits for confirmation', () => {
    const actionToConfirm = make(updateCount)
    actionToConfirm.ask(12)
    expect(actionToConfirm.data.get()).toEqual({ state: 'initial' })
    expect(actionToConfirm.pendingApproval.get()).toEqual([12])
  })

  it('cancels action', () => {
    const actionToConfirm = make(updateCount)
    actionToConfirm.ask(12)
    actionToConfirm.cancel()
    expect(actionToConfirm.data.get()).toEqual({ state: 'initial' })
    expect(actionToConfirm.pendingApproval.get()).toEqual(undefined)
  })

  describe('confirmation', () => {
    describe('when action succeeds', () => {
      const actionToConfirm = make(updateCount)
      actionToConfirm.ask(12)
      beforeAll(() => actionToConfirm.confirm())

      it('reports success', () => {
        expect(actionToConfirm.data.get()).toEqual({ state: 'success' })
      })

      it('removes data to confirm', () => {
        expect(actionToConfirm.pendingApproval.get()).toEqual(undefined)
      })
    })

    describe('when action fails', () => {
      const error = new Error('oops')
      const actionToConfirm = make(() => Promise.reject(error))
      actionToConfirm.ask(12)
      beforeAll(() => actionToConfirm.confirm())

      it('reports failure', () => {
        expect(actionToConfirm.data.get()).toEqual({ state: 'failure', error })
      })

      it('keeps data to confirm', () => {
        expect(actionToConfirm.pendingApproval.get()).toEqual([12])
      })
    })
  })
})
