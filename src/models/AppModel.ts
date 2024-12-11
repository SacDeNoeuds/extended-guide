import { JsonPlaceholderFetchApi } from '../setup/Api.fetch'
import { createSignal, ReadonlySignal, Signal } from '../setup/Signal'
import { createTodoPageModel, TodoPageModel } from "./TodoPageModel"

type ActivePage =
  | { name: "NotFound" }
  | { name: "Todos"; createModel: () => TodoPageModel }

export interface AppModel {
  renderer: Signal<AppRenderer>
  activePage: ReadonlySignal<ActivePage>

  // later this will be handled by routing/history
  changePage: (nextPage: ActivePage) => void
}

export type AppRenderer = 'react' | 'vue' | 'solid'

export function createAppModel(defaultRenderer: AppRenderer): AppModel {
  const api = JsonPlaceholderFetchApi
  const activePage = createSignal<ActivePage>({
    name: "Todos",
    createModel: () => createTodoPageModel({ api }),
  })

  return {
    activePage,
    renderer: createSignal(defaultRenderer),
    changePage(nextPage) {
      activePage.set(nextPage)
    }
  }
}
