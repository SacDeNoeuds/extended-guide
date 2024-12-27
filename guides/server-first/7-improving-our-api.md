# Improving our API

Although our API works, so far it got pretty ugly. If we want to use it on a daily basis, we need to polish it.

I will start with how I want it to look like.

## Expressing the desired API

### Simple handler

```tsx
const handler = defineHtmlHandler('GET /test').handle(async () => {
  return {
    status: 200,
    body: <div>Test</div>,
  }
})
```

### With input schemas

```tsx
const handler = defineHtmlHandler('POST /test/:id')
  .withParams({ id: numberFromString }, () => {
    return { status: 400, body: <div>Invalid id</div> }
  })
  .withBody({ name: x.string }, () => {
    return { status: 400, body: <div>Expected a name as string</div> }
  })
  .handle(async ({ body }) => {
    return {
      status: 200,
      body: <div>Hello {body.name}</div>,
    }
  })
```

### With context (ie: authentication)

```tsx
type AuthenticationContext = { name: 'John' | 'Michelle' }

const handler = defineHtmlHandler('GET /test/:id')
  // …
  .handle<AuthenticationContext>(async ({ context }) => {
    return {
      status: 200,
      body: <div>Hello, {context.name}</div>,
    }
  })
```

## Implementing the desired API

Since I will use a builder pattern, I only care about the output. In my case, I only need an object containing a `route`, a `handle` function and eventually some error handlers for invalid query/params/body.<br>
By being backed by the builder pattern, I can loosen drastically the type-safety:

<!-- diff [code:ts] ./server-first/7-improving-our-api/handle-route.ts ./server-first/6-redirects/handle-route.ts -->

### Implementing the router builder

<!-- include [code:ts] ./server-first/7-improving-our-api/define-html-handler.ts -->

### Let’s see it in action:

<!-- include [code:tsx] ./server-first/7-improving-our-api/greet-handler.tsx -->

## Improving the middleware API

### The desired API

<!-- include [code:tsx] ./server-first/7-improving-our-api/authenticated.tsx -->

### Implementing the middleware factory

<!-- include [code:ts] ./server-first/7-improving-our-api/define-middleware.ts -->

### See the usage in the server

<!-- diff [code:ts] ./server-first/7-improving-our-api/server.ts ./server-first/5-authentication/server.ts -->

## Testing

```sh
npx tsx ./src/server-first/7-improving-our-api/server.ts
```

Let’s test our various use cases:

```sh
# without authorization in the header
$ curl 'http://localhost:6600/hello/Toto'
<div style="color: red">We don’t know you…</div>%

# with auth:
$ curl -H 'Authorization: AyeAye' 'http://localhost:6600/hello/Toto'
<div>Name must be ”John” or ”Michelle”</div>%

# with auth and right 'name':
$ curl -H 'Authorization: AyeAye' 'http://localhost:6600/hello/John'
<div>Query must contain a ”from”</div>%

# with auth and right 'name' and right 'from':
$ curl -H 'Authorization: AyeAye' 'http://localhost:6600/hello/John?from=Mary'
<div style="color: blue">Hello, John. Greeting coming from Mary</div>%
```

All good ✅
