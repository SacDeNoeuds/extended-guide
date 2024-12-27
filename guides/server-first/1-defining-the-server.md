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

<!-- include [code:ts] ./server-first/1-defining-the-server/greet-handler.tsx -->

## The server and its adapter

A server is solely router – a collection of route and handlers – exposed on a port:

<!-- include [code:ts] ./server-first/1-defining-the-server/router.ts -->

Now let’s implement the adapter:

<!-- include [code:ts] ./server-first/1-defining-the-server/h3-adapter.ts -->

And finally let’s define our server and boot it using the h3 adapter:

<!-- include [code:ts] ./server-first/1-defining-the-server/server.ts -->

## Testing

```sh
npx tsx ./src/server-first/1-defining-the-server/server.ts
```

And open your browser at http://localhost:6600/hello/John

All good!
