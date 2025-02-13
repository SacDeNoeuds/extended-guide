import { TodoApi } from '@/spa-client-side/setup/TodoApi'
import { createSignal, ReadonlySignal } from '@/spa-client-side/setup/Signal'
import { makeTodoPageModel, TodoPageModel } from './TodoPageModel'

export type AppRoute =
  | { name: 'NotFound' }
  | { name: 'TodoListPage'; make: () => TodoPageModel }

export interface AppModel {
  route: ReadonlySignal<AppRoute>
  goToTodos: () => void
}

export function makeAppModel(api: TodoApi): AppModel {
  const route = createSignal<AppRoute>({ name: 'NotFound' })

  return {
    route,
    goToTodos: () =>
      route.set({
        name: 'TodoListPage',
        make: () => makeTodoPageModel(api),
      }),
  }
}
