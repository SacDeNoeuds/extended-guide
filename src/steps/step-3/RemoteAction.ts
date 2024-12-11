import { createSignal, ReadonlySignal } from "../../setup/Signal"
import { RemoteData } from "./RemoteData"

export interface RemoteAction<T, Args extends any[]> {
  data: ReadonlySignal<RemoteData<T>>
  trigger: (...args: Args) => Promise<void>
}

export function createRemoteAction<T, Args extends any[]>(
  action: (...args: Args) => Promise<T>,
): RemoteAction<T, Args> {
  const data = createSignal<RemoteData<T>>({ state: "initial" })
  return {
    data,
    async trigger(...args) {
      data.set({ state: "pending" })
      return action(...args)
        .then((value) => data.set({ state: "success", value }))
        .catch((error) => data.set({ state: "failure", error }))
    },
  }
}
