# The JsonPlaceholder-backed `TodoApi`

## The definition

> [!NOTE]
> Why is it so useful to _define_ the API instead of _implementing_ it directly?
>
> Because I can have multiple implementations of the same concept. we will use the `fetch` implementation for production and the in-memory one for tests.

<!-- include [code:ts] ./spa-client-side/setup/TodoApi.ts -->

<details>
<summary>Fetch implementation</summary>

For the fetch implementation, we will add a global delay to simulate a network delay and have time to observe loading states.

<!-- include [code:ts] ./spa-client-side/setup/TodoApi.fetch.ts -->

</details>

<details>
<summary>In-memory implementation</summary>

<!-- include [code:ts] ./spa-client-side/setup/TodoApi.InMemory.ts -->

</details>

---

Now that we have the API, let’s dig into the [remote data](./2-remote-data.md) concept to use the API.
