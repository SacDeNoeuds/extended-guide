# Our server needs – the requirements

- rendering HTML, I like JSX for that
- authentication via cookie headers
- monitoring -> at global level (adapter) or function level, no in-between.

## What is an HTML server?

An HTML server can queried in 2 ways: GETs and POSTs. Read & writes, command & queries, etc…

The inputs of an HTML request are:

- headers (cookies included)
- query parameters
- path parameters
- body (for posts), urlformencoded or form-data.

The outputs are:

- an HTML body (plain text + mime type).
- headers (cookies included).
- status code.

<!-- include [code:ts] ./server-first/definition/html-route.ts -->

<!-- include [code:ts] ./server-first/1-defining-the-server/handle-route.ts -->

## Our first route

We can start by defining _how_ we want to define our route:

<!-- include [code:ts] ./server-first/1-defining-the-server/greet-handler-1.tsx -->

## Refactoring

It looks like there’s a ton of plumbing in there: the usage is getting verbose and complicated. When stuff is optional, the _builder pattern_ can help graciously. Here’s how I would like to use it:

```tsx
export const greetHandler = HandlerBuilder
  .get('/hello/:name')
  .params(…, () => {}) // optional
  .query(schema, () => {}) // optional
  .body(…, () => {}) // optional
  .handle(async () => { … }) // builds the route and its handler.
```

Let’s see it in action for our first route:

<!-- include [code:ts] ./server-first/1-defining-the-server/greet-handler-2.tsx -->

Great, that looks **much** cleaner.

## `Response` utilities

Behind the scene I implemented response factories with the following API (yes I really like the builder pattern 😇):

```tsx
import { response } from '@/utils/response'

respondWith.status(201).html(<div>Hello!</div>) // Response
respondWith
  .status(201)
  .headers({ 'X-Server': 'Meeee' })
  .html(<div>Hello!</div>) // Response

// defaults to 200
respondWith.headers({ 'X-Server': 'Meeee' }).html(<div>Hello!</div>) // Response

respondWith.html(<div>Hello!</div>) // Response

// See Other = 303 redirect
respondWith.seeOther('/there/or/here')
```

<details>
<summary>Source Code</summary>

<!-- include [code:ts] ./server-first/definition/response.ts -->

</details>

## Unit test

Did you notice? I didn’t even need _anything_ to start testing!<br>
Since our handler is pure JS, it’s incredibly simple to test it:

<!-- include [code:ts] ./server-first/1-defining-the-server/greet-handler.spec.ts -->

Which outputs:

```sh
 ✓ server-first/1-defining-the-server/greet-handler.spec.ts (1) 514ms
   ✓ greetHandler – simple version (1) 514ms
     ✓ responds with 200, a blue div & x-server header 514ms
```

## Defining the adapter

A server is solely a collection of route handlers exposed on a port:

<!-- include [code:ts] ./server-first/1-defining-the-server/server-adapter.ts -->

## Implementing the H3 server adapter

<!-- include [code:ts] ./server-first/1-defining-the-server/h3-adapter.ts -->

## Boot the server using the H3 adapter

<!-- include [code:ts] ./server-first/1-defining-the-server/server.ts -->

## End-to-End Testing

```sh
npx tsx ./src/server-first/1-defining-the-server/server.ts
```

Let’s test it:

```sh
$ curl http://localhost:6600/hello/John
<div style="color: blue">Hello, John</div>%
# ✅
```

All good!
