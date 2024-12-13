/** @jsx React.createElement */
import React from 'react'
import { RemoteActionToConfirm } from '@/setup/RemoteActionToConfirm'
import { useSignal } from '@/6-react-app/useSignal'

interface Props<T, Args extends any[]> {
  action: RemoteActionToConfirm<T, Args>
  children: (...args: Args) => React.ReactNode
}

export function ConfirmActionDialog<T, Args extends any[]>({
  action,
  children,
}: Props<T, Args>) {
  const data = useSignal(action.data)
  const pendingApproval = useSignal(action.pendingApproval)

  return (
    <dialog open={!!pendingApproval}>
      <header>Confirm</header>

      <div>{pendingApproval && children(...pendingApproval)}</div>

      <footer>
        <button type="button" onClick={() => action.cancel()}>
          Cancel
        </button>

        <button
          type="button"
          onClick={() => action.confirm()}
          disabled={data.state === 'pending'}
        >
          Confirm
        </button>
      </footer>
    </dialog>
  )
}
