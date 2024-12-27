import { RouteHandlerShape } from './handle-route'
import { HtmlRoute } from '../definition/html-route'

export type Router = Array<{ route: HtmlRoute; handler: RouteHandlerShape<{}> }>
