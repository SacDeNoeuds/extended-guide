import { PathParameters } from '../definition/PathParameters'
import { HttpMethod } from '../definition/html-route'
import { Handler, HandlerInput, HandlerOutput } from './handler'

function createHandlerBuilder(method: HttpMethod) {
  return <Path extends `/${string}`>(path: Path) => {
    const builder: HandlerBuilder<Path, PathParameters<Path>> = {
      handleWith(handle) {
        return {
          method,
          path,
          handle,
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
  handleWith(
    handler: (
      input: HandlerInput<Params, Query, Body>,
    ) => Promise<HandlerOutput>,
  ): Handler<Path, Params, Query, Body>
}
