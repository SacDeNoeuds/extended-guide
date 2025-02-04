export class HttpError {
  constructor(
    readonly code: number,
    readonly message: string,
    readonly cause?: unknown,
  ) {}

  static fromCode(code: number) {
    return (options: { message: string; cause?: unknown }) =>
      new HttpError(code, options.message, options.cause)
  }
}

export const BadRequest = HttpError.fromCode(400)
export const Unauthorized = HttpError.fromCode(401)
export const Forbidden = HttpError.fromCode(403)
export const NotFound = HttpError.fromCode(404)
export const Conflict = HttpError.fromCode(409)
export const InternalServerError = HttpError.fromCode(500)
