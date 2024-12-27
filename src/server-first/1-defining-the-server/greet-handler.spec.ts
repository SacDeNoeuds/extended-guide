import { describe, expect, it } from 'vitest'
import { greetHandler } from './greet-handler-2'

describe('greetHandler – simple version', () => {
  it('responds with 200, a blue div & x-server header', async () => {
    const result = await greetHandler.handle({
      params: { name: 'Toto' },
      body: undefined,
      query: {},
      headers: new Headers(),
    })
    expect(result.status).toBe(200)
    expect(result.body.toString()).toBe(
      '<div style="color: blue">Hello, Toto</div>',
    )
    const headers = new Headers(result.headers)
    expect(headers.get('x-server')).toBe('Test')
  })
})
