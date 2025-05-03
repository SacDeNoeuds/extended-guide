# Supporting body schema

By default, HTML bodies are url form encoded, which is the same shape as query parameters: `name=John&test=toto&…`.

Because bodies and queries are so close, I won’t cover body support and redirect you to the "[support query params](./3-support-query-schema.md)" guide instead.

## Closing word on server definition

Because we have a dedicated adapter now, it is extremely easy to test any new feature we need to add to our adapter.

If tomorrow I needed to accept form-data bodies, I can do it at adapter-level and test my adapter – and my adapter only!

---

Great, all that was nice but we are missing a pretty big piece: what about [authentication](./5-authentication.md)?
