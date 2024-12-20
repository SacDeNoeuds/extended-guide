import * as x from 'unhoax'
import type { PathParameters } from './PathParameters'
import type { RouteLike } from './route'
import type { Or } from './types'

export type RouteHandler<R extends RouteLike> = (
  input: RouteHandlerInput<R>,
) => Promise<RouteHandlerOutput<R['response'], R['errors']>>

export interface RouteHandlerInput<R extends RouteLike> {
  route: R
  params: Or<x.TypeOf<R['params']>, PathParameters<R['path']>>
  query: x.TypeOf<R['query']>
  body: x.TypeOf<NonNullable<R['body']>['schema']>
  request: Request
}

export type RouteResponse<R extends RouteLike['response']> = R extends {
  body: x.Schema<infer Body>
}
  ? { status: R['status']; headers?: HeadersInit; body: Body }
  : R extends { status: 307 | 308 }
    ? { status: R['status']; headers?: HeadersInit; location: string }
    : { status: R['status']; headers?: HeadersInit }

type RouteErrorResponse<E extends Record<PropertyKey, any>> = {
  [Status in keyof E]: E[Status] extends { body: x.Schema<infer Body> }
    ? { status: Status; body: Body; headers?: HeadersInit }
    : never
}[keyof E]

export type RouteHandlerOutput<
  R extends RouteLike['response'],
  E extends RouteLike['errors'],
> = RouteResponse<R> | RouteErrorResponse<NonNullable<E>>

export function handleRoutes<Routes extends Record<string, RouteLike>>(
  routes: Routes,
  handlers: {
    [K in keyof Routes]: RouteHandler<Routes[K]>
  },
) {
  return Object.fromEntries(
    Object.entries(routes).map(([name, route]) => [
      name,
      { route, handler: handlers[name] },
    ]),
  ) as unknown as {
    [K in keyof Routes]: { route: Routes[K]; handler: RouteHandler<Routes[K]> }
  }
}
