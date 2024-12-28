import { HttpMethod } from '../definition/html-route'

export interface Handler<
  Path = string,
  Params = Record<string, any>,
  Query = Record<string, any>,
  Body = Record<string, any> | undefined,
> {
  method: HttpMethod
  path: Path
  handle(input: HandlerInput<Params, Query, Body>): Promise<Response>
}

export interface HandlerInput<Params, Query, Body> {
  headers: Headers
  params: Params
  query: Query
  body: Body
}
