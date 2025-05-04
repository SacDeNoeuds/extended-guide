import { x } from 'unhoax'
import { PathParameters } from '../definition/PathParameters'
import { HttpMethod } from '../definition/html-route'
import { Handler, HandlerInput } from './handler'

function createHandlerBuilder(method: HttpMethod) {
  return <Path extends `/${string}`>(path: Path) => {
    let paramsGuard: GuardConfig | undefined
    let queryGuard: GuardConfig | undefined

    const builder: HandlerBuilder<Path, PathParameters<Path>> = {
      params(props, onInvalid) {
        paramsGuard = { schema: x.object(props), onInvalid }
        return builder as any
      },

      query(props, onInvalid) {
        queryGuard = { schema: x.object(props), onInvalid }
        return builder as any
      },

      handleWith(handle) {
        return {
          method,
          path,
          handle: async (input) => {
            const params = guardWith(paramsGuard, input.params, input.params)
            if (!params.success) return params.error

            const query = guardWith(queryGuard, input.query, {})
            if (!query.success) return query.error

            return handle({
              ...input,
              params: params.value as any,
              query: query.value as any,
            })
          },
        }
      },
    }
    return builder
  }
}

export const HandlerBuilder = {
  get: createHandlerBuilder('GET'),
  post: createHandlerBuilder('POST'),
}

interface HandlerBuilder<
  Path,
  Params,
  Query = Record<string, any>,
  Body = undefined,
> {
  params<P extends Record<string, any>>(
    props: x.PropsOf<P>,
    onInvalid: OnInvalid,
  ): HandlerBuilder<Path, P, Query, Body>

  query<Q extends Record<string, any>>(
    props: x.PropsOf<Q>,
    onInvalid: OnInvalid,
  ): HandlerBuilder<Path, Params, Q, Body>

  handleWith(
    handler: (input: HandlerInput<Params, Query, Body>) => Promise<Response>,
  ): Handler<Path, Params, Query, Body>
}

type OnInvalid = (error: x.ParseError) => Response | Promise<Response>

interface GuardConfig {
  schema: x.Schema<unknown>
  onInvalid: OnInvalid
}
type GuardResult =
  | { success: false; error: Response | Promise<Response> }
  | { success: true; value: unknown }

function guardWith<F>(
  config: GuardConfig | undefined,
  value: unknown,
  fallback: F,
): GuardResult {
  if (!config) return { success: true, value: fallback }
  const result = config.schema.parse(value)
  return result.success
    ? result
    : { success: false, error: config.onInvalid(result.error) }
}
