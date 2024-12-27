import { HtmlRoute, HttpMethod } from '../definition/html-route'
import {
  HandleRoute,
  HtmlHandlerInput,
  HtmlHandlerOutput,
  RouteHandler,
} from './handle-route'
import * as x from 'unhoax'

export function defineHtmlHandler<M extends HttpMethod, P extends `/${string}`>(
  entry: `${M} ${P}`,
) {
  const [method, path] = entry.split(' ') as [HttpMethod, `/${string}`]
  const handler: Omit<RouteHandler, 'handle'> = {
    route: { method, path },
  }
  const expected: Partial<Record<'params' | 'query' | 'body', InputConfig>> = {}

  const builder: HandlerBuilder<any> = {
    withParams(props, onInvalid) {
      expected.params = { schema: x.object(props), onInvalid }
      return builder as any
    },
    withQuery(props, onInvalid) {
      expected.query = { schema: x.object(props), onInvalid }
      return builder as any
    },
    withBody(props, onInvalid) {
      expected.body = { schema: x.object(props), onInvalid }
      return builder as any
    },
    handle(handle) {
      return {
        ...handler,
        async handle(input: HtmlHandlerInput<HtmlRoute, any>) {
          const [err1, params] = checkInput(expected.params, input.params, {})
          if (err1) return err1

          const [err2, query] = checkInput(expected.query, input.query, {})
          if (err2) return err2

          const [err3, body] = checkInput(expected.body, input.body, undefined)
          if (err3) return err3

          return handle({
            ...input,
            query,
            params,
            body,
          })
        },
      } as any
    },
  }
  return builder as HandlerBuilder<{ method: M; path: P }>
}

type OnInvalid = (error: x.ParseError) => Promise<HtmlHandlerOutput>
type InputConfig = { schema: x.Schema<any>; onInvalid: OnInvalid }
function checkInput<F>(
  config: InputConfig | undefined,
  value: unknown,
  fallback: F,
):
  | [err: Promise<HtmlHandlerOutput>, value: undefined]
  | [err: undefined, value: unknown] {
  if (!config) return [undefined, fallback]
  const result = config.schema.parse(value)
  if (result.success === false)
    return [config.onInvalid(result.error), undefined]
  return [undefined, result.value]
}

interface HandlerBuilder<R extends HtmlRoute> {
  withParams<Params extends Record<string, any>>(
    props: x.PropsOf<Params>,
    onInvalid: (error: x.ParseError) => Promise<HtmlHandlerOutput>,
  ): HandlerBuilder<R & { params: x.Schema<Params, any> }>

  withQuery<Query extends Record<string, any>>(
    props: x.PropsOf<Query>,
    onInvalid: (error: x.ParseError) => Promise<HtmlHandlerOutput>,
  ): HandlerBuilder<R & { query: x.Schema<Query, any> }>

  withBody<Body extends Record<string, any>>(
    props: x.PropsOf<Body>,
    onInvalid: (error: x.ParseError) => Promise<HtmlHandlerOutput>,
  ): HandlerBuilder<R & { body: x.Schema<Body, any> }>

  handle<Context = {}>(handle: HandleRoute<R, Context>): RouteHandler<Context>
}
