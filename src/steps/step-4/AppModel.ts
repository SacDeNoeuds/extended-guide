import { JsonPlaceholderApi } from '../../setup/Api'
import { createSignal, ReadonlySignal } from "../../setup/Signal"
import { createTodoPageModel, TodoPageModel } from "./TodoPageModel"

type ActivePage =
  | { name: "NotFound" }
  | { name: "Todos"; createModel: () => TodoPageModel }

export interface AppModel {
  activePage: ReadonlySignal<ActivePage>

  // later this will be handled by routing/history
  changePage: (name: ActivePage["name"]) => void
}

type Deps = {
  api: JsonPlaceholderApi
}

export function createAppModel({ api }: Deps): AppModel {
  const activePage = createSignal<ActivePage>({
    name: "Todos",
    createModel: () => createTodoPageModel({ api }),
  })

  return {
    activePage,
    changePage(name) {
      switch (name) {
        case "NotFound":
          return activePage.set({ name })
        case "Todos":
          return activePage.set({
            name,
            createModel: () => createTodoPageModel({ api }),
          })
      }
    },
  }
}
