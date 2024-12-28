function seeOther(location: string, headersInit?: HeadersInit) {
  const headers = new Headers(headersInit)
  headers.set('location', location)
  return new Response(undefined, { status: 303, headers })
}

function createResponseWithBody(
  status: number,
  headersInit: HeadersInit,
  body: StringLike,
  contentType: string,
) {
  const headers = new Headers(headersInit)
  headers.set('content-type', contentType)
  return new Response(body.toString(), { status, headers })
}

const htmlMimeType = 'text/html'

type StringLike = { toString(): string }

export const respondWith = {
  /**
   * 303 redirects to the given location.
   */
  seeOther,

  /**
   * @example with html
   * ```ts
   * respondWith.status(200).html(<div>Hello!</div>) // Response
   * ```
   *
   * @example with headers
   * ```ts
   * respondWith
   *   .status(200)
   *   .headers({ 'X-Server': 'Meeee' })
   *   .html(<div>Hello!</div>) // Response
   * ```
   */
  status: (status: number) => ({
    headers: (headersInit: HeadersInit) => ({
      html: (body: StringLike) =>
        createResponseWithBody(status, headersInit, body, htmlMimeType),
    }),
    html: (body: StringLike) =>
      createResponseWithBody(status, {}, body, htmlMimeType),
  }),
  /**
   * Defaults to 200
   * @example with headers
   * ```ts
   * respondWith
   *   .headers({ 'X-Server': 'Meeee' })
   *   .html(<div>Hello!</div>) // Response
   * ```
   */
  headers: (headersInit: HeadersInit) => ({
    html: (body: StringLike) =>
      createResponseWithBody(200, headersInit, body, htmlMimeType),
  }),
  /**
   * Defaults to 200
   * @example with headers
   * ```ts
   * respondWith.html(<div>Hello!</div>) // Response
   * ```
   */
  html: (body: StringLike) =>
    createResponseWithBody(200, {}, body, htmlMimeType),
}
