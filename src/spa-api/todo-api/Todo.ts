import pipe from 'just-pipe'
import { x } from 'unhoax'

export interface Todo {
  userId: number
  id: number
  title: string
  completed: boolean
}

export interface TodoPatch extends Partial<Pick<Todo, 'title' | 'completed'>> {}

export const TodoSchema = x.object<Todo>({
  id: x.number,
  userId: x.number,
  title: x.string,
  completed: x.boolean,
})

export const TodoPatchSchema: x.Schema<TodoPatch> = x.partial(
  x.object({
    title: TodoSchema.props.title,
    completed: TodoSchema.props.completed,
  }),
)

export const numberFromString = pipe(
  x.string,
  x.map(Number),
  x.refine('NumberFromString', (n) => !Number.isNaN(n)),
)
