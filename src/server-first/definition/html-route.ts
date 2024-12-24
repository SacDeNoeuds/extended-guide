import * as x from 'unhoax'

export type HttpMethod = 'GET' | 'POST'

export interface HtmlRoute {
  method: HttpMethod
  path: `/${string}`
  params?: x.Schema<any, Record<string, string>>
  query?: x.Schema<any>
  body?: x.Schema<any>
}
