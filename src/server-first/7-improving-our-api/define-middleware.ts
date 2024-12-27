import { HtmlRoute } from '../definition/html-route'
import {
  HtmlHandlerInput,
  HtmlHandlerOutput,
  RouteHandler,
} from './handle-route'

export function defineMiddleware<
  ContextProvidedByMiddleware,
  ContextNeededByMiddleware extends Record<string, any> = {},
>(
  provideContext: (
    input: HtmlHandlerInput<HtmlRoute, ContextNeededByMiddleware>,
  ) => Promise<
    { status: 'OK'; value: ContextProvidedByMiddleware } | HtmlHandlerOutput
  >,
) {
  return <HandlerContext>(
    handler: RouteHandler<
      // Use `Extract` to make sure the HandlerContext at least asks for
      // the context provided by the middleware.
      // ie: if the handler needs `{ token: string }` but the middleware
      // is providing `{ bearer: string }`, we need to make sure type-checking fails
      Extract<HandlerContext, ContextProvidedByMiddleware> &
        ContextNeededByMiddleware
    >,
  ): RouteHandler<
    Omit<
      HandlerContext & ContextNeededByMiddleware,
      keyof ContextProvidedByMiddleware
    >
  > => {
    return {
      ...handler,
      async handle(input) {
        const contextOrResult = await provideContext(input as any)
        if (contextOrResult.status !== 'OK') return contextOrResult // output

        return handler.handle({
          ...input,
          context: { ...input.context, ...contextOrResult.value } as any,
        })
      },
    }
  }
}
