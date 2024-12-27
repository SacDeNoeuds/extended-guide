import * as x from 'unhoax'
import { PathParameters } from '../definition/PathParameters'
import { HtmlRoute } from '../definition/html-route'
import { Simplify } from '../definition/types'

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

type HandleInvalid = (error: x.ParseError) => Promise<HtmlHandlerOutput>

type InvalidParamsHandler<R extends HtmlRoute> =
  // If "params" is a schema, force to provide an `handleInvalidParams` function
  R['params'] extends x.Schema<any, any>
    ? { handleInvalidParams: HandleInvalid }
    : {}

type InvalidQueryHandler<R extends HtmlRoute> =
  // If "query" is a schema, force to provide an `handleInvalidQuery` function
  R['query'] extends x.Schema<any, any>
    ? { handleInvalidQuery: HandleInvalid }
    : {}

type InvalidBodyHandler<R extends HtmlRoute> =
  // If "body" is a schema, force to provide an `handleInvalidBody` function
  R['body'] extends x.Schema<any, any>
    ? { handleInvalidBody: HandleInvalid }
    : {}

export type RouteHandler<R extends HtmlRoute, Context = {}> = Extract<
  Simplify<
    { handle: HandleRoute<R, Context> } & InvalidParamsHandler<R> &
      InvalidQueryHandler<R> &
      InvalidBodyHandler<R>
  >,
  RouteHandlerShape<any>
>
export type RouteHandlerShape<Context = {}> = {
  handle: HandleRoute<any, Context>
  handleInvalidParams?: HandleInvalid
  handleInvalidQuery?: HandleInvalid
  handleInvalidBody?: HandleInvalid
}
