import { ReadonlySignal } from '../setup/Signal'

export type AppRoute =
  | { name: 'NotFound' }
  | { name: 'TodoPage', make: () => TodoPageModel }

export interface AppModel {
  route: ReadonlySignal<AppRoute>
  goToTodos: () => void
}

type TodoPageModel = unknown // ?
