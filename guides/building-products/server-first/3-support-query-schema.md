# Supporting query parameters schema

In the previous example, we reduced path parameters to "John" and "Michelle". We will use the same schema, for query parameters this time.

## Redefining our `greet` handler

<!-- diff [code:ts] ./server-first/3-support-query-schema/greet-handler.tsx ./server-first/2-support-path-schema/greet-handler.tsx -->

## Define query validation in the `HandlerBuilder`

<!-- diff [code:ts] ./server-first/3-support-query-schema/handler-builder.ts ./server-first/2-support-path-schema/handler-builder.ts -->

## Unit Testing

<!-- diff [code:ts] ./server-first/3-support-query-schema/greet-handler.spec.ts ./server-first/2-support-path-schema/greet-handler.spec.ts -->

Result:

```sh
 ✓ server-first/3-support-query-schema/greet-handler.spec.ts (2)
   ✓ greetHandler – with query (2)
     ✓ fails with 400 when query is invalid
     ✓ responds with 200 & a blue div
```

## End-to-End Testing

Now we can boot the server:

```sh
npx tsx ./src/server-first/3-support-query-schema/server.ts
```

Let’s test with "John" and "Jack":

```sh
$ curl 'http://localhost:6600/hello?name=Jack'
<div style="color: red">Name must be “John” or “Michelle”</div>
# ✅

curl 'http://localhost:6600/hello?name=John'
<div style="color: blue">Hello, John</div>
# ✅
```

All good!
