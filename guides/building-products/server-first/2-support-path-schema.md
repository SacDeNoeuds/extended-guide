# Support path schema

In the previous example, we allowed to pass any path parameter. Now we will reduce the possibilities to "John" and "Michelle".

## Add the path parameters schema to our `greet` handler

The schema for that is `x.literal('John', 'Michelle')`, let’s enable support for that.

<!-- diff [code:tsx] ./server-first/2-support-path-schema/greet-handler.tsx ./server-first/1-defining-the-server/greet-handler-2.tsx -->

## Fixing the `HandlerBuilder`

<!-- diff [code:ts] ./server-first/2-support-path-schema/handler-builder.ts ./server-first/1-defining-the-server/handler-builder.ts -->

## Unit testing

<!-- include [code:ts] ./server-first/2-support-path-schema/greet-handler.spec.ts -->

Result:

```sh
 ✓ server-first/2-support-path-schema/greet-handler.spec.ts (2) 507ms
   ✓ greetHandler – with params (2) 507ms
     ✓ fails with 400 when params are invalid
     ✓ responds with 200 & a blue div 501ms
```

## End-to-End Testing

Ok we should be settled now, let’s run and test:

```sh
npx tsx ./src/server-first/2-support-path-schema/server.ts
```

```sh
$ curl http://localhost:6600/hello/Jack
<div style="color: red">Name must be “John” or “Michelle”</div>
# ✅

$ curl http://localhost:6600/hello/John
<div style="color: blue">Hello, John</div>
# ✅
```

Awesome, we have our first brick of validation!

Let’s support [query parameters](./3-support-query-schema.md) and [body](./4-support-body-schema.md)
