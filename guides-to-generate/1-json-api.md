# The JsonPlaceholder API

## The definition

> [!Note] Why is it so useful to _define_ it instead of _implementing_ it directly?
>
> Because I can have multiple implementations of the same concept. we will use the `fetch` implementation for production and the in-memory one for tests.

<!-- include [code:ts] ./setup/Api.ts -->


## `Fetch` implementation

For the fetch implementation, we will add a global delay to simulate a network delay and have time to observe loading states.
<!-- include [code:ts] ./setup/Api.fetch.ts -->

## `InMemory` implementation

<!-- include [code:ts] ./setup/Api.InMemory.ts -->

---

Now that we have the API, let’s dig into the [remote data](./2-remote-data.md) concept to use the API.
