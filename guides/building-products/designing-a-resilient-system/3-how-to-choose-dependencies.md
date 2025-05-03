## How to choose dependencies

An IT project will have graphical interfaces – AKA§ frontends: web/mobile apps –, backends, databases, potentially in different languages. Which means we start this game with already our share of major upgrades:

- Language upgrades
- Database upgrades
- OS upgrades (my linux server from 18.04 to 20.04 then 22.04, …)
- Provider plan changes – AWS, CF Workers, Google Maps or Mapbox, Mixpanel, etc.
- Development tool upgrades: vite/rollup/TypeScript/Capacitor/Netlify/CloudflareWorkers/GCP/…

That already represents a sure amount of maintenance work, doesn’t it?

My main goal now is to diminish the number of other major – breaking – upgrades I will encounter. For that I have a few strategies.

## What the dep? – Red flags 🚩

### 🚩 1. _diminish as much as possible_ the number of dependencies

It seems obvious, but I still see some projects where `object-assign` or `pad-left` are installed.

### 🚩 2. Avoid framework satellites

vue-\*, react-\*, express-\*, you get the drill.

Routing or i18n do not require Vue nor React.<br>
Parsing a request body does not require Express nor Fastify.<br>
I could go on for a while.

Any library like this you install will couple you further to the parent framework: The parent framework has a major version release? Your satellite library will have one too. 2+ major upgrades for the price of 1, yey 🙌

There is **no good reason to install a framework satellite**, hiding behind ~~your laziness~~ the ease of use will not help.

Bottom line: favor framework-agnostic libraries, best-in-class are those with adapters like fullcalendar, body-parser, i18next/FormatJS/Fluent, floating-ui, etc….

### 🚩 3. Avoid libraries bringing their own standards

`fp-ts`, `effect`, `ramda`, `Angular`, `NestJS`, etc… Using such libraries makes you _completely_ tied to them by giving capabilities other libs don’t. That is their key to keep you in ; There’s no going back.

Abstractions are good but favor your own, or smaller ones. Unless you facade everything, creating your own std library with a patchwork of tools, why not.

## Yellow flags ⚠️

### ⚠️ 1. Native APIs duplicates

The web platform is improving super fast, making some (parts of) libraries stale: lodash, underscore, MoutJS, Ramda, BigJS (-> bigint), …

To fill web platform gaps, favor polyfills if possible (see polyfill.io), smaller libraries otherwise (like [just-\*](https://github.com/angus-c/just) collection).

### ⚠️ 2. Lots of major versions in short amount of time

Check out the npm `versions` tab. Why: I don't want to be dependent on someone changing their mind. React I look at you, but not only.

Let’s compare:

React has released 4 major versions in 9 years (completely changing paradigms twice).<br>
Anguar has released 18 major versions in 9 years, including Angular v1 -> v2<br>
Vue has released 3 major versions in 9 years.<br>
Svelte has released 5 major versions in 8 years (changing completely paradigms for v5).<br>
Solid has released 1 major version in 3 years.

i18next has released 24 major versions in 11 years.<br>
@formatjs/intl has released 3 major versions in 4 years.<br>

This gives you an idea of the pace.

These numbers should only serve as warnings, make the decision by reading Migration Guides and/or changelogs..

1. Breaking changes are overall anecdotic -> ✅.
2. Breaking changes include paradigms shifts **once** -> ⚠️, check for how long the last shift has lasted.
3. Breaking changes include paradigms shifts **more than once** -> big ⚠️.
4. No changelog nor migration guide -> 🚩.

### ⚠️ 3. Libraries encouraging hard-to-test code practices

For instance: tanstack query or form, 😒. When I look at their usage, there’s no way to test anything outside the framework world ; Big 🟡 flag.

## The green flags ✅ – libraries I am fine using

Libraries which are framework-agnostic and have a small API surface. For example:

- fuse.js (fzf-js, …): I would encourage to add them to an `array` std, however the API is simple. If I ever need to migrate that, it will take me less than a day. Especially if part of my std (facaded).
- floating-ui
- [is-email](https://www.npmjs.com/package/is-email)
- [just-\*](https://github.com/angus-c/just), just-pipe, just-omit, just-pick. Facaded in an std.
- [qs-esm](https://www.npmjs.com/package/qs-esm)

## Final word: we will need frameworks & libraries

That being said, we cannot avoid installing some of those.
However, we can **choose** framework-free dependencies and to facade our frameworks. This is a pre-requisite to be able to use frameworks in a decoupled way.

Which leads to …

## Golden Rules

I want to introduce two **golden rules**:

1. **Never** mention a technology when defining concepts
2. **Always** mention the technology when implementing concepts

##### A `Cache` example

```ts
// library/cache/definition.ts
export interface Cache<T> {
  get(key: string): T
  set(key: string, value: T): void
}

// library/cache/redis.ts
export function makeRedisCache<T>({ connectionString, … }): Cache<T> { … }
```

##### A `NaturalSearchEngine` example

```ts
// library/natural-search-engine/definition.ts
export interface NaturalSearchEngine<T> {
  feed(documents: T[]): Promise<void>
  search(query: string): Promise<SearchResult<T>>
}
interface SearchResult<T> {
  score: number
  value: T
}

// library/natural-search-engine/typesense.ts
export function makeTypeSenseNaturalSearchEngine<T>({ url, … }): NaturalSearchEngine<T> {}
```
