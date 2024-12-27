import { describe, expect, it } from 'vitest'
import { greetHandler } from './greet-handler'

describe('greetHandler – with query', () => {
  it('fails with 400 when query is invalid', async () => {
    const result = await greetHandler.handle({
      params: {},
      body: undefined,
      query: { name: 'Toto' },
      headers: new Headers(),
    })
    expect(result.status).toBe(400)
    expect(result.body.toString()).toBe(
      '<div style="color: red">Name must be “John” or “Michelle”</div>',
    )
  })

  it('responds with 200 & a blue div', async () => {
    const result = await greetHandler.handle({
      params: {},
      body: undefined,
      query: { name: 'John' },
      headers: new Headers(),
    })
    expect(result.status).toBe(200)
    expect(result.body.toString()).toBe(
      '<div style="color: blue">Hello, John</div>',
    )
  })
})
