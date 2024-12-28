/* @jsxImportSource hono/jsx */
import { html } from 'hono/html'
import { Child } from 'hono/jsx'

export function Html({ children }: { children: Child }) {
  return (
    <>
      {html`<!DOCTYPE html>`}
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>Grocery List</title>
        </head>
        <body>{children}</body>
      </html>
    </>
  )
}
