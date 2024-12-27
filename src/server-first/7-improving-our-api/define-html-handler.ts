import { HtmlRoute, HttpMethod } from '../definition/html-route'
import {
  HandleRoute,
  HtmlHandlerOutput,
  RouteHandler,
  RouteHandlerShape,
} from './handle-route'
import * as x from 'unhoax'

export function defineHtmlHandler<M extends HttpMethod, P extends `/${string}`>(
  entry: `${M} ${P}`,
) {
  const [method, path] = entry.split(' ') as [HttpMethod, `/${string}`]
  const route: HtmlRoute = { method, path }
  const handler: Omit<RouteHandlerShape, 'handle'> = {}

  const builder: HandlerBuilder<any> = {
    withParams(props, onInvalid) {
      route.params = x.object(props)
      handler.handleInvalidParams = onInvalid
      return builder as any
    },
    withQuery(props, onInvalid) {
      route.query = x.object(props)
      handler.handleInvalidQuery = onInvalid
      return builder as any
    },
    withBody(props, onInvalid) {
      route.body = x.object(props)
      handler.handleInvalidBody = onInvalid
      return builder as any
    },
    handle(handle) {
      return {
        route,
        handler: {
          ...handler,
          handle,
        } as RouteHandlerShape<any>,
      }
    },
  }
  return builder as HandlerBuilder<{ method: M; path: P }>
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
  handle<Context = {}>(
    handle: HandleRoute<R, Context>,
  ): {
    route: R
    handler: RouteHandler<R, Context>
  }
}
