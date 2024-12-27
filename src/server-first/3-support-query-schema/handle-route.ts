import * as x from 'unhoax'
import { PathParameters } from '../definition/PathParameters'
import { HtmlRoute } from '../definition/html-route'
import { Simplify } from '../definition/types'

export interface HtmlHandlerInput<R extends HtmlRoute> {
  headers: Headers
  params: R['params'] extends x.Schema<infer Params>
    ? Params
    : PathParameters<R['path']>
  query: x.TypeOf<NonNullable<R['query']>>
  body: x.TypeOf<NonNullable<R['body']>>
}

export interface HtmlHandlerOutput {
  status: number
  headers?: HeadersInit
  body: {
    // we only need something serializable to a string.
    toString(): string
  }
}

export type HandleRoute<R extends HtmlRoute> = (
  input: HtmlHandlerInput<R>,
) => Promise<HtmlHandlerOutput>

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

export type RouteHandler<R extends HtmlRoute> = Extract<
  Simplify<
    { handle: HandleRoute<R> } & InvalidParamsHandler<R> &
      InvalidQueryHandler<R>
  >,
  RouteHandlerShape
>
export type RouteHandlerShape = {
  handle: HandleRoute<any>
  handleInvalidParams?: HandleInvalid
  handleInvalidQuery?: HandleInvalid
}
