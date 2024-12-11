import { describe, expect, it } from 'vitest'
import { createAppModel } from './AppModel'

describe('AppModel', () => {
  const make = () => createAppModel()

  it('starts at TodoList page', () => {
    const model = make()
    expect(model.activePage.get().name).toBe("Todos")
  })

  it('changes to `NotFound`', () => {
    const model = make()
    model.changePage("NotFound")
    expect(model.activePage.get().name).toBe("NotFound")
  })
})