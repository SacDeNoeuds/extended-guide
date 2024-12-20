export type RemoteData<T> =
  | { state: 'initial' }
  | { state: 'pending'; progress?: number }
  | { state: 'failure'; error: Error }
  | { state: 'success'; value: T }
