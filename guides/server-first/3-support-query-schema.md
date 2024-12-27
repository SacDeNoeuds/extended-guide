# Supporting query parameters schema

In the previous example, we reduced path parameters to "John" and "Michelle". We will use the same schema, for query parameters this time.

## Redefining our `greet` handlers

<!-- diff [code:ts] ./server-first/3-support-query-schema/greet-handler.tsx ./server-first/2-support-path-schema/greet-handler-2.tsx -->

## Define query validation in the route handler

<!-- diff [code:ts] ./server-first/3-support-query-schema/handle-route.ts ./server-first/2-support-path-schema/handle-route.ts -->

## Update the H3 adapter to support query validation

<!-- diff [code:ts] ./server-first/3-support-query-schema/h3-adapter.ts ./server-first/2-support-path-schema/h3-adapter-2.ts -->

## Testing

Now we can boot the server:

```sh
npx tsx ./src/server-first/3-support-query-schema/server.ts
```

Let’s test with "John" and "Jack":

```sh
$: curl 'http://localhost:6600/hello?name=John'
<div style="color: blue">Hello, John</div>%
# ✅

$: curl 'http://localhost:6600/hello?name=Jack'
<div style="color: red">Invalid name, expected "John" or "Michelle"</div>
# ✅
```

All good!
