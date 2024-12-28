import { Handler } from './handler'

/**
 * The server adapter listens straight away and resolves when listening.
 */
export type ServerAdapter = (options: {
  handlers: Handler[]
  port: number
}) => Promise<unknown>
