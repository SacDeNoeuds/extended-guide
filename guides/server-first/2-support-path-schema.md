# Support path schema

In the previous example, we allowed to pass any path parameter. Now we will reduce the possibilities to "John" and "Michelle".

## Add the path parameters schema to our `greet` handler

The schema for that is `x.literal('John', 'Michelle')`, let’s enable support for that.

<!-- diff [code:tsx] ./server-first/2-support-path-schema/greet-handler-1.tsx ./server-first/1-defining-the-server/greet-handler.tsx -->

## Parsing path parameters in the adapter

Great, so if I add support to my adapter, let’s see how it goes:

<!-- diff [code:ts] ./server-first/2-support-path-schema/h3-adapter-1.ts ./server-first/1-defining-the-server/h3-adapter.ts -->

Now I have a big problem: we allowed to specify a schema for the path parameters, but how do we handle errors? Our route handler does not specify that, so let’s refine it.

## Fixing the route handler definition

<!-- diff [code:ts] ./server-first/2-support-path-schema/handle-route.ts ./server-first/1-defining-the-server/handle-route.ts -->

## Fixing our `greet` handler

At this stage, our handler should fail type checking, we can update it:

<!-- diff [code:tsx] ./server-first/2-support-path-schema/greet-handler-2.tsx ./server-first/2-support-path-schema/greet-handler-1.tsx -->

## Rendering errors in the adapter

<!-- diff [code:ts] ./server-first/2-support-path-schema/h3-adapter-2.ts ./server-first/2-support-path-schema/h3-adapter-1.ts -->

## Testing

Ok we should be settled now, let’s run and test:

```sh
npx tsx ./src/server-first/2-support-path-schema/server.ts
```

```sh
$ curl http://localhost:6600/hello/John
<div style="color: blue">Hello, John</div>
# ✅

$ curl http://localhost:6600/hello/Jack
<div style="color: red">Invalid name, expected "John" or "Michelle"</div>
# ✅
```

Awesome, we have our first brick of validation!

Let’s support [query parameters](./3-support-query-schema.md) and [body](./4-support-body-schema.md)
