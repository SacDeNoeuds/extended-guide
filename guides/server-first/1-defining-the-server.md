## Our server needs – the requirements

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

<!-- include [code:ts] ./server-first/definition/html-handler.ts -->

## Our first route

We can start by defining _how_ we want to define our route:

<!-- src/server-first/1-defining-the-server/get-hello-world.tsx -->

## The server and its adapter

A server is solely router – a collection of route and handlers – exposed on a port:

<!-- src/server-first/1-defining-the-server/router.ts -->

Now let’s implement the adapter:

<!-- src/server-first/1-defining-the-server/h3-adapter.tsx -->

And finally let’s define our server and boot it using the h3 adapter:

<!-- src/server-first/1-defining-the-server/server.tsx -->

## Testing

```sh
npx tsx ./src/server-first/1-defining-the-server/server.ts
```

And open your browser at http://localhost:6600/hello/John

All good!

## Adding search parameter support

🚧

## Adding POST & body support

🚧

## Implement Express & Hapi adapters

🚧

---

That’s it, we can leave aside the dummy routes and integration tests to focus on our product: the grocery list.
