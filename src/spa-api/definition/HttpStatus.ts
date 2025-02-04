export const HttpSuccessStatus = {
  Ok: 200,
  Created: 201,
  NoContent: 204,
} as const
export type HttpSuccessStatus = keyof typeof HttpSuccessStatus

export const HttpRedirectStatus = {
  /** @deprecated Use PermanentRedirect instead */
  MovedPermanently: 301,
  /** @deprecated Use TemporaryRedirect instead */
  Found: 302,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
} as const
export type HttpRedirectStatus = keyof typeof HttpRedirectStatus

export const HttpClientErrorStatus = {
  BadRequest: 400,
  Unauthorized: 401,
  Forbidden: 403,
  NotFound: 404,
  Conflict: 409,
} as const
export type HttpClientErrorStatus = keyof typeof HttpClientErrorStatus

export const HttpServerErrorStatus = {
  InternalServerError: 500,
} as const
export type HttpServerErrorStatus = keyof typeof HttpServerErrorStatus

export const HttpStatus = {
  ...HttpSuccessStatus,
  ...HttpRedirectStatus,
  ...HttpClientErrorStatus,
  ...HttpServerErrorStatus,
} as const

export type HttpStatus = keyof typeof HttpStatus
export type HttpStatusCode = (typeof HttpStatus)[HttpStatus]
