# Authentication

In its essence, authentication is merely a higher-order function: before executing the route handler function, we want to make sure the person is authenticated. Roughly, it looks like this:

```ts
declare function authenticated<R>(handler: HandleRoute<R>): HandleRoute<R>

// greet-handler.ts
const greetHandler: RouteHandler<GreetRoute> = {
  handle: async ({ account /* <- this should be injected */ }) => {},
  // …
}

// server.ts
serveH3NodeApp({
  router: [
    {
      route: greetRoute,
      handler: authenticated(greetHandler),
    },
  ],
})
```

> [!IMPORTANT]
> Why not `const greetHandler = authenticated({ … })`, why doing it in server.ts ?
>
> TL;DR: because of dependency inversion.
>
> Although `authenticated` is defined statically in this example, it will not be the case in a real application. Because authentication can occur via cookies, query params, or whatever. And because you might provide a different persistence layer (DB) per use-case for instance.

I obviously need to **inject** some inputs, so let’s define that.

## Adding a `Context` to the route handler input

<!-- diff [code:ts] ./server-first/5-authentication/handle-route.ts ./server-first/4-support-body-schema/handler-builder.ts -->

## Update our `greet` handler to require a `name` context

<!-- diff [code:tsx] ./server-first/5-authentication/greet-handler.tsx ./server-first/4-support-body-schema/greet-handler.tsx -->

## Implement the `authenticated` function

<!-- include [code:tsx] ./server-first/5-authentication/authenticated.tsx -->

## Update the server

<!-- diff [code:ts] ./server-first/5-authentication/server.ts ./server-first/4-support-body-schema/server.ts -->

## Testing

Great, we can boot the server:

```sh
npx tsx ./src/server-first/5-authentication/server.ts
```

Let’s test our various use-cases:

```sh
# Without authorization:
$ curl http://localhost:6600/hello
<div class="error" style="color: red">We don’t know you…</div>%

# With wrong authorization:
$ curl -H "authorization: Jack" http://localhost:6600/hello
<div class="error" style="color: red">We don’t know you…</div>%

# And with correct authorization:
$ curl -H "authorization: John" http://localhost:6600/hello
<div class="hello-world" style="color: blue">Hello, John</div>%
```

All good! ✅<br>
Only pure JS, highly testable and framework-free 😁

---

That was a lot of abstract work, we can leave aside the dummy routes and integration tests to focus on our product: the grocery list.
