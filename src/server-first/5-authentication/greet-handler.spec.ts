import { describe, expect, it } from 'vitest'
import { makeGreetHandler } from './greet-handler'
import { x } from 'unhoax'
import { makeAuthenticate } from './authenticate'

describe('greetHandler – with authentication', () => {
  const authenticate = makeAuthenticate(x.literal('John', 'Michelle'))
  const greetHandler = makeGreetHandler({ authenticate })

  it('fails with 400 when no authorization provided', async () => {
    const result = await greetHandler
      .handle({
        params: {},
        body: undefined,
        query: {},
        headers: new Headers(),
      })
      .catch((err) => err)

    expect(result.status).toBe(401)
    expect(await result.text()).toBe(
      '<div style="color: red">We don’t know you…</div>',
    )
  })

  it('fails with 400 when authorization is incorrect', async () => {
    const result = await greetHandler
      .handle({
        params: {},
        body: undefined,
        query: {},
        headers: new Headers({ authorization: 'Jack' }),
      })
      .catch((err) => err)

    expect(result.status).toBe(401)
    expect(await result.text()).toBe(
      '<div style="color: red">We don’t know you…</div>',
    )
  })

  it('responds with 200 & a blue div', async () => {
    const result = await greetHandler.handle({
      params: {},
      body: undefined,
      query: {},
      headers: new Headers({ authorization: 'John' }),
    })
    expect(result.status).toBe(200)
    expect(await result.text()).toBe(
      '<div style="color: blue">Hello, John</div>',
    )
  })
})
