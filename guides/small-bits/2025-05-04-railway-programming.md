---
title: Railway Programming
date: 2022-05-04
---

# Railway Programming in TS

Railway programming is concept popularized by Scott Wlaschin in [F# for fun and profit](https://fsharpforfunandprofit.com/posts/recipe-part2/).<br>
I will not paraphrase what he explains, he explains it brilliantly and better than I would.

In TypeScript, there mainly 2 flavors: method chaining and piping. Let’s review them both.

Let’s say we want to compose together those functions, the idea is to:<br>
parse number -> multiply by 3 -> divide by 12

```ts
const divideBy = (divider: number) => (n: number) => {
  if (divider === 0) return Result.fail('cannot divide by zero')
  return n / divider
}
const multiplyBy = (factor: number) => (n: number) => n * factor

const parseNumber = (value: unknown) => {
  try {
    return Result.ok(parseInt(value))
  } catch {
    return Result.fail('invalid number')
  }
}
```

## Method chaining

<!-- prettier-ignore -->
```ts
const result = parseNumber('12345')
  .map(multiplyBy(3)) // multiplyBy cannot fail
  .flatMap(divideBy(12)) // `.flatMap` because `divideBy` returns a Result.
```

Libraries:

- [purify-ts](https://gigobyte.github.io/purify/adts/Either) – named as `Either`
- [@swan-io/boxed](https://boxed.cool/result)
- [neverthrow](https://www.npmjs.com/package/neverthrow)

Pros:

- For a lot of developers, method chaining is an intuitive API to use.
- Intellisense can guide us.

Cons:

- From my actual experience: you need to own the `Result` class. Any shortcoming on the API and you are doomed. Because you always need to transform to other types, and at some point we were lacking a transformation. You don’t have time to wait for a PR or fork stuff around.
- There _might_ be a performance overhead because we are re-creating `Result` object at every chained step.

## Piping

<!-- prettier-ignore -->
```ts
const result = pipe(
  '12345',
  parseNumber,
  multiplyBy(3),
  divideBy(12),
)
```

Libraries:

- [fp-ts](https://github.com/gcanti/fp-ts)
- A bunch of others I am too lazy to find back

Pros:

- Composability: we can transform anything to anything, and add our custom functions to the dance.
- No performance overhead, it’s just functions.

Cons:

- piping is mostly understood by functional developers only.
- Intellisense cannot really guide us.
