export interface Todo {
  userId: number
  id: number
  title: string
  completed: boolean
}

export interface TodoApi {
  getTodos: () => Promise<Todo[]>
  getTodo: (id: number) => Promise<Todo>
  patchTodo: (
    id: number,
    data: Partial<Pick<Todo, 'title' | 'completed'>>,
  ) => Promise<Todo>
  deleteTodo: (id: number) => Promise<void>
}
