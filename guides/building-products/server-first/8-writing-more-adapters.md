# Writing more adapters

I sold you the fact it would be easy to write adapters for any framework. How about we verify that instead of just taking my word?

## Express

<!-- include [code:ts] ./server-first/8-writing-more-adapters/express-adapter.ts -->

## Hapi.js

<!-- include [code:ts] ./server-first/8-writing-more-adapters/hapi-adapter.ts -->

## Hono

<!-- include [code:ts] ./server-first/8-writing-more-adapters/hono-adapter.ts -->

## Exposing them all

<!-- include [code:ts] ./server-first/8-writing-more-adapters/servers.ts -->

```sh
$: npx tsx src/server-first/8-writing-more-adapters/servers.ts
Hono    server listening on http://localhost:6001
Express server listening on http://localhost:6002
Hapi    server listening on http://localhost:6003
```

Yey, let’s test'hem all … it took me some (back-ported) adjustments, but here we go. All good ✅ 💪
