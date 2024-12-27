# Redirects

Dealing with redirects is pretty straightforward according to [MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Redirections).

## Statuses to support

My main use-case is to redirect after a form post, therefore I will focus on `303: See Other`.

> 303 – See Other
>
> **Method handling**: GET methods unchanged. Others changed to GET (body lost).
>
> **Typical use case**: Used to redirect after a PUT or a POST, so that refreshing the result page doesn't re-trigger the operation.

## Change the `RouteHandler` definition

We need to add a redirect as a possible handler output:

<!-- diff [code:ts] ./server-first/6-redirects/handle-route.ts ./server-first/5-authentication/handle-route.ts -->

## Update the H3 adapter

<!-- diff [code:ts] ./server-first/6-redirects/h3-adapter.ts ./server-first/5-authentication/h3-adapter.ts -->

## Adding a POST greet handler

<!-- include [code:tsx] ./server-first/6-redirects/post-greet-handler.tsx -->

## Register the POST handler in our server

<!-- diff [code:ts] ./server-first/6-redirects/server.ts ./server-first/4-support-body-schema/server.ts -->

## Testing

```sh
npx tsx ./src/server-first/6-redirects/server.ts
```

Let’s test our redirect handler:

```sh
$ curl -X POST http://localhost:6600/hello/Toto --verbose
* Host localhost:6600 was resolved.
* IPv6: ::1
* IPv4: 127.0.0.1
*   Trying [::1]:6600...
* Connected to localhost (::1) port 6600
> POST /hello/Toto HTTP/1.1
> Host: localhost:6600
> User-Agent: curl/8.7.1
> Accept: */*
>
* Request completely sent off
< HTTP/1.1 303 See Other
< location: /hello/Toto
< Date: Fri, 27 Dec 2024 10:27:52 GMT
< Connection: keep-alive
< Keep-Alive: timeout=5
< Content-Length: 0
<
* Connection #0 to host localhost left intact
```

All good ✅
