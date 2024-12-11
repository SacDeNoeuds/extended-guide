import { createSignal, ReadonlySignal } from '../../setup/Signal'

export type RemoteData<T> = 'pending' | Error | T

export interface RemoteAction<T> {
  data: ReadonlySignal<RemoteData<T>>
  trigger: () => Promise<void>
}

export function createRemoteAction<T>(action: () => Promise<T>): RemoteAction<T> {
  const data = createSignal<RemoteData<T>>('pending')
  return {
    data,
    async trigger() {
      return action()
        .then((value) => data.set(value))
        .catch((error) => data.set(error))
    }
  }
}
