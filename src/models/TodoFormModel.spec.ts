import { describe, expect, it } from 'vitest'
import { createTodoFormModel, TodoFormValues } from './TodoFormModel'

const make = (initialValues?: TodoFormValues) => {
  const saved: TodoFormValues[] = []
  const saveTodo = async (values: TodoFormValues) => {
    saved.push(values)
  }
  const model = createTodoFormModel({ initialValues, saveTodo })
  return [model, { saveTodo, saved }] as const
}

describe('TodoFormModel', () => {
  it('initializes without initial values', () => {
    const [model] = make()
    expect(model.values.title.get()).toEqual('')
    expect(model.values.completed.get()).toEqual(false)
  })

  it('initializes with initial values', () => {
    const [model] = make({ title: 'Hello', completed: true })
    expect(model.values.title.get()).toEqual('Hello')
    expect(model.values.completed.get()).toEqual(true)
  })

  it('submits updated values', async () => {
    const [model, { saved }] = make()
    model.values.title.set('foo')
    model.values.completed.set(true)
    await model.submit()
    expect(saved).toEqual([{ title: 'foo', completed: true }])
  })
})
