/* @jsxImportSource hono/jsx */
import { HtmlRoute } from '../definition/html-route'
import { RouteHandler } from './handle-route'
import * as x from 'unhoax'

export function authenticated<
  Ctx extends { name: string },
  R extends HtmlRoute,
>(schema: x.Schema<Ctx['name'], any>, handler: RouteHandler<R, Ctx>) {
  return {
    ...handler,
    handle: async (input) => {
      const name = schema.parse(input.headers.get('Authorization'))

      if (name.success)
        return handler.handle({
          ...input,
          context: { ...input.context, name: name.value } as Ctx,
        })

      return {
        status: 401,
        body: <div style="color: red">We don’t know you…</div>,
      }
    },
  } as RouteHandler<R, Omit<Ctx, 'name'>>
}
