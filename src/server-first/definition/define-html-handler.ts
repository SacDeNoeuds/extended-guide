import { HtmlHandlerInput, HtmlHandlerOutput } from './handle-route'
import { HtmlRoute } from './html-route'

export function defineHtmlHandler<R extends HtmlRoute>(
  route: R,
  handler: {
    handle(input: HtmlHandlerInput<R>): Promise<HtmlHandlerOutput>
  },
) {
  return { route, handler }
}
