export interface Todo {
  userId: number
  id: number
  title: string
  completed: boolean
}

export const apiDefaults = {
  /** used to slow down the api calls, to see the loading states */
  preflightDelayInMs: 0,
}

export interface JsonPlaceholderApi {
  getTodos: () => Promise<Todo[]>
  getTodo: (id: number) => Promise<Todo>
  patchTodo: (
    id: number,
    data: Partial<Pick<Todo, "title" | "completed">>,
  ) => Promise<void>
  deleteTodo: (id: number) => Promise<void>
}
