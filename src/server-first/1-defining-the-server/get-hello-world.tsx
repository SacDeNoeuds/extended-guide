/** @jsxImportSource hono/jsx */
import { HandleRoute } from '../definition/handle-route'
import { HtmlRoute } from '../definition/html-route'

export const getHelloWorldRoute = {
  method: 'GET',
  path: '/hello/:name',
} as const satisfies HtmlRoute
type GetHelloWorldRoute = typeof getHelloWorldRoute

export const getHelloWorld: HandleRoute<GetHelloWorldRoute> = async ({
  params,
}) => {
  await delay(500) // mimic DB access.
  return {
    status: 200,
    body: (
      <div class="hello-world" style="color: red">
        Hello, {params.name}
      </div>
    ),
  }
}

function delay(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms))
}
