import { HttpMethod } from '../definition/html-route'

export interface Handler<
  Path = string,
  Params = Record<string, any>,
  Query = Record<string, any>,
  Body = undefined,
> {
  method: HttpMethod
  path: Path
  handle(input: HandlerInput<Params, Query, Body>): Promise<HandlerOutput>
}

export interface HandlerInput<Params, Query, Body> {
  headers: Headers
  params: Params
  query: Query
  body: Body
}

export interface HandlerOutput {
  status: number
  headers?: HeadersInit
  body: {
    // we only need something serializable to a string.
    toString(): string
  }
}
