import * as x from 'unhoax'
import { MimeType, MimeTypeName } from './MimeType'

// add any other method as required.
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

export type RouteLike = {
  method: HttpMethod
  path: `/${string}`
  summary?: string
  params?: x.Schema<unknown, Record<string, string>>
  query?: x.Schema<unknown, Record<string, string | string[]>>
  body?: {
    contentType: MimeType
    schema: x.Schema<unknown>
  }
  responses: {
    [Key in 200 | 201]?: { [Key in MimeTypeName]?: x.Schema<unknown> }
  } & {
    [Key in 204 | 307 | 308]?: {}
  } & {
    [Key in 400 | 401 | 403 | 404 | 409 | 500]?: x.Schema<unknown>
  }
}

export function defineRoute<R extends RouteLike>(route: R): R {
  return route
}
