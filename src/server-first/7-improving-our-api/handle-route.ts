import * as x from 'unhoax'
import { PathParameters } from '../definition/PathParameters'
import { HtmlRoute } from '../definition/html-route'

export interface HtmlHandlerInput<R extends HtmlRoute, Context> {
  headers: Headers
  params: R['params'] extends x.Schema<infer Params>
    ? Params
    : PathParameters<R['path']>
  query: x.TypeOf<NonNullable<R['query']>>
  body: x.TypeOf<NonNullable<R['body']>>
  context: Context
}

export interface HtmlHandlerOutput {
  status: 200 | 201 | 400 | 401 | 403 | 404 | 500
  headers?: HeadersInit
  body: {
    // we only need something serializable to a string.
    toString(): string
  }
}

export interface RedirectOutput {
  status: 303
  location: string
  headers?: HeadersInit
}

export type HandleRoute<R extends HtmlRoute, Context> = (
  input: HtmlHandlerInput<R, Context>,
) => Promise<HtmlHandlerOutput | RedirectOutput>

export type RouteHandler<Context = {}> = {
  route: HtmlRoute
  handle: HandleRoute<HtmlRoute, Context>
}
