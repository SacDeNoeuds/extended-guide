# The reactivity system

## Step 1 – Define an agnostic reactivity system

> [!Important] Why defining an agnostic reactivity system?
> 
> Because it is the key to freedom. If you _own_ your reactivity system, you will be able to adapt it to _any framework_, making your code interoperable and highly resilient.

By _define_ the `Signal` or `State` concept, we will be in the position of swapping the implementation detail anytime. At the cost of defining ourselves the API, but in that case it is fairly trivial because there are plethora of libraries out there and even a proposal.

So here we go:
<!-- include [code:ts] ./setup/Signal.ts -->

## Step 2 – writing the spec

Let’s define what our reactivity system should comply to:

<!-- include [code:ts] ./setup/Signal.spec.ts -->

## Step 3 – The implementation

Let’s not re-invent the wheel and facade an existing library. We have a few options, especially since 2023 😅:
- [`s-js`](https://www.npmjs.com/package/s-js)
- [`@preact/signals-code`](https://www.npmjs.com/package/@preact/signals-core)
- [`solid-js`](https://www.npmjs.com/package/solid-js)
- The [polyfill](https://www.npmjs.com/package/signal-polyfill) of the [proposal](https://github.com/tc39/proposal-signals) – not production-ready

… and I am probably forgetting a ton of them.

For the sake of poetry, I will use S.js

<small>NB: one of the first to push for signals</small>

<!-- include [code:ts] ./setup/Signal.s-js.ts -->

---

Reactivity system: Done. Remote Data: Done. Next: [Remote Action](./4-remote-action.md) !
