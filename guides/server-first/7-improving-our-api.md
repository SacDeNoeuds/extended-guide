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

<!-- include [code:ts] ./server-first/7-improving-our-api/define-html-handler.ts -->

Let’s see it in action:

<!-- include [code:tsx] ./server-first/7-improving-our-api/greet-handler.tsx -->
