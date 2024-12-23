import { HandleRoute } from '../definition/handle-route'
import { HtmlRoute } from '../definition/html-route'

export type Router = Array<{ route: HtmlRoute; handle: HandleRoute<any> }>
