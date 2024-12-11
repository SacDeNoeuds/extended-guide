import { createSignal, ReadonlySignal, Signal } from '../../setup/Signal'
import { createRemoteAction } from './RemoteAction'
import { RemoteData } from './RemoteData'

export interface TodoFormModel {
  values: {
    [Key in keyof TodoFormValues]: Signal<TodoFormValues[Key]>
  }
  submitState: ReadonlySignal<RemoteData<void>>
  submit: () => Promise<void>
}

export interface TodoFormValues {
  title: string
  completed: boolean
}

type Deps = {
  initialValues?: TodoFormValues
  saveTodo: (values: TodoFormValues) => Promise<void>
}

export function createTodoFormModel({ initialValues, saveTodo }: Deps): TodoFormModel {
  const submitAction = createRemoteAction(saveTodo)
  return {
    values: {
      title: createSignal(initialValues?.title ?? ''),
      completed: createSignal(initialValues?.completed ?? false),
    },
    submitState: submitAction.data,
    async submit() {
      await saveTodo({
        title: this.values.title.get(),
        completed: this.values.completed.get(),
      })
    }
  }
}
