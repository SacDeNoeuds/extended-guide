/** @jsx React.createElement */
import React from "react"
import { RemoteData } from "../setup/RemoteData"

interface Props<T> {
  data: RemoteData<T>
  initial?: () => React.ReactNode
  pending?: (progress?: number) => React.ReactNode
  failure?: (error: Error) => React.ReactNode
  success: (value: T) => React.ReactNode
}
export function RemoteData<T>({
  data,
  initial = () => <div>Waiting for data to be loaded</div>,
  pending = () => <div>Loading...</div>,
  failure = (error) => <div>Error: {error.message}</div>,
  success,
}: Props<T>) {
  return <>
    {data.state === 'initial' && initial()}
    {data.state === 'pending' && pending(data.progress)}
    {data.state === 'failure' && failure(data.error)}
    {data.state === 'success' && success(data.value)}
  </>
}
