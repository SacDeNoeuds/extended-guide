import { createSignal, ReadonlySignal, Signal } from "../../setup/Signal"
import { RemoteAction } from "./RemoteAction"
import { RemoteData } from "./RemoteData"

export interface RemoteActionToConfirm<T, Args extends any[]> {
  readonly data: ReadonlySignal<RemoteData<T>>
  readonly pendingApproval: Signal<Args | undefined>
  ask: (...args: Args) => void
  cancel: () => void
  confirm: () => Promise<void>
}

export function requireConfirmation<T, Args extends any[]>(
  action: RemoteAction<T, Args>,
): RemoteActionToConfirm<T, Args> {
  return {
    data: action.data,
    pendingApproval: createSignal<Args | undefined>(undefined),
    ask(...args) {
      this.pendingApproval.set(args)
    },
    cancel() {
      this.pendingApproval.set(undefined)
    },
    async confirm() {
      const args = this.pendingApproval.get()
      if (!args) return // or throw?
      await action.trigger(...args)
      if (action.data.get().state === 'success') {
        this.pendingApproval.set(undefined)
      }
    }
  }
}
