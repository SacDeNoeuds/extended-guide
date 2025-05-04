import { x } from 'unhoax'
import { PathParameters } from '../definition/PathParameters'
import { HtmlRoute } from '../definition/html-route'

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
