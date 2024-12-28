---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: Extended guide on how to web project
  text: A collection of fully working examples
  tagline: In different environments ; client-side, server-side, multi-page apps, single-page apps, …
  actions:
    - theme: brand
      text: Get Started
      link: /server-first/

features:
  - title: Multi-page app / server-first approach
    details: Particularly relevant for project like back-offices, we will bet into the platform and use shiny HTML/CSS features to enhance user experiences.
  - title: Single-page app / local-first approach
    details: Particularly relevant for projects requiring offline capabilities, we will see how to implement frontend project with <em>decoupled</em> frameworks.
  - title: Using front & back frameworks in a <em>decoupled</em> way
    details: Frameworks are great at what they do. Depending on them to run your business is less so great. Let’s find the sweet spot.
  - title: Fully working & iterative example
    details: We will add features over time, like authentication, toggling a todo, changing its title or deleting it.
---

## What this guide is about

This is a walkthrough writing high-paced quality software by using frameworks in a decoupled way. In this page I start with observations and detail how I curate dependencies. Then I will dig into writing framework-decoupled software.

> [!NOTE]
> You want to get started straight away? Check out the [Get Started](#get-started) section.

## Introduction – The starting point

> [!WARNING]
> ⚠️ These series are still work-in-progress 🚧

Across my jobs & experiences in the web (and JS) world, I have seen the traditional cycles of project development:
1. High pace, the first 2-3 years
2. Moderate pace, the next 2-3 years
3. Low pace, the rest of project life
4. Unmaintainable: abandon ship and start again ; go back to step 1.

And to me, the pace-killer is – drum roll 🥁 – migrations. Either frameworks releasing major upgrades, either rewrites from framework A to framework B because framework A is unmaintained – or has been for years, hello sails.js 👋 – or has lost traction – hello Backbone, Ember, … 👋.

> [!INFO]
> Each tool or technology comes with a cost. Of maintenance.

I have read this, experienced it. Which led to ask myself: how avoidable is that? At what cost? I investigated.

### Language choices

Most languages have major version releases: Python, Go (v2 will come someday 🥱), PHP, …

Yet the *web platform* – HTML, CSS & JS – is designed to be breaking-change-free. A weakness for some, a strength for me.

### Databases

A DB can be narrowed down to 2 operations: read and write.<br>
Every DB solution allows to write.<br>
Their differentiator is on how data can be accessed (read): indexation.

Then you have boring technology like SQL or key-value stores like Redis. Tested by time, large communities and good support.

And you have more esoteric technologies like MongoDB/DynamoDB or ElasticSearch/Algolia in their times. Requires to learn new paradigms, potentially professional support only.

NB: I like learning new stuff, but you know what I like better? Learning stuff I can re-use.

Some data will be essential to your project, choose wisely.

### Hosting

Thankfully we have Docker now, therefore it has become uncommon to upgrade personally OS versions. Although it may still happen, I will not dig into this.

### Frameworks

Let’s start with 2 definitions – yes, they come from me 🤓:

> **Web Platform**: A technology which decided to **never introduce breaking changes**.<br>
> **Web Framework**: A technology which **introduce breaking changes ~ once every 2 to 5 years**.

If I rephrase that:<br>
Let’s say you are working at a company whose first project was bootstrapped 3 or 5 years ago. What are the chances that you have migrated – or need to migrate – one of your frameworks?

To me it’s near 100%. In that way, the JavaScript world is particularly contradictory:

1. The **web platform** decided at its very beginning it would **never introduce breaking changes**. Websites from the 2000s are still up & running!<br>Although it may have some drawbacks (like keeping `null` and `undefined` 😒), this **philosophy drove trust**, thus **wide adoption**.
2. The **web frameworks**, on the contrary, have introduced _countless_ breaking changes, inducing migrations and impacted teams on their way to delivering features, therefore driving less revenue. Either that or your framework is too newbie 😄.

Because the **web platform** is so stable and gaining tons of features, I want to bet on it.

The worst bet I am making now is using TypeScript, considering it is on the verge to became an actual web standard.

### What the dep? The ones I worry about

An IT project will have frontends (web/mobile apps), backends, databases, potentially in different languages. Which means we start this game with already our share of major upgrades:
- Language upgrades
- Database upgrades
- OS upgrades (my linux server from 18.04 to 20.04 then 22.04, …)
- Provider plan changes
- Development tool upgrades: vite/rollup/TypeScript/Capacitor/Netlify/CloudflareWorkers/GCP/…

That already represent a certain amount of maintenance work, doesn’t it?

My main goal now is to diminish the number of other major – breaking – upgrades I will encounter. For that I have a few strategies.

### Red flags 🚩

#### 🚩 1. _diminish as much as possible_ the number of dependencies

It seems obvious, but I still see some projects where `object-assign` or `pad-left` are installed.

#### 🚩 2. Avoid framework satellites

vue-\*, react-\*, express-\*, you get the drill.

Routing or i18n do not require Vue nor React.<br>
Parsing a request body does not require Express nor Fastify.<br>
I could go on for a while.

Any library like this you install will couple you further to the parent framework: The parent framework has a major version release? Your satellite library will have one too. 2+ major upgrades for the price of 1, yey 🙌

There is **no good reason to install a framework satellite**, hiding behind ~the ease of use~ your laziness will not help.

Bottom line: favor framework-agnostic libraries, best-in-class are those with adapters like fullcalendar, body-parser, i18next/FormatJS/Fluent, floating-ui, etc….

#### 🚩 3. Avoid libraries bringing their own standards

`fp-ts`, `effect`, `ramda`, `Angular`, `NestJS`, etc… Using such libraries makes you _completely_ tied to them by giving capabilities other libs don’t. That is their key to keep you in ; There’s no going back.

Abstractions are good but favor your own, or smaller ones. Unless you facade everything, creating your own std library with a patchwork of tools, why not.

### Yellow flags ⚠️

#### ⚠️ 1. Native APIs duplicates

The web platform is improving super fast, making some (parts of) libraries stale: lodash, underscore, MoutJS, Ramda, BigJS (-> bigint), …

To fill web platform gaps, favor polyfills if possible (see polyfill.io), smaller libraries otherwise (like [just-*](https://github.com/angus-c/just) collection).

#### ⚠️ 2. Lots of major versions in short amount of time

Check out the npm `versions` tab. Why: I don't want to be dependent on someone changing their mind. React I look at you, but not only.

Let’s compare:

React has released 4 major versions in 9 years (completely changing paradigms twice).<br>
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

#### ⚠️ 3. Libraries encouraging hard-to-test code practices

For instance: tanstack query or form, 😒. When I look at their usage, there’s no way to test anything outside the framework world ; Big 🟡 flag.

### The green flags ✅ – libraries I am fine using

Libraries which are framework-agnostic and a small API surface. For example:
- fuse.js (fzf-js, …): I would encourage to add them to an `array` std, however the API is simple. If I ever need to migrate that, it will take me less than a day. Especially if part of my std (facaded).
- floating-ui
- [is-email](https://www.npmjs.com/package/is-email)
- [just-*](https://github.com/angus-c/just), just-pipe, just-omit, just-pick. Facaded in an std.
- [qs-esm](https://www.npmjs.com/package/qs-esm)

### Final word: we will need frameworks & libraries

That being said, we cannot avoid installing some of those.
However, we can **choose** framework-free dependencies. This is a pre-requisite to be able to use frameworks in a decoupled way.

## Get Started

For demo purposes, we will build a Grocery List project. Here’s the roadmap:
- [Building the product using the server-first approach](./server-first/index.md) – AKA multi-page app
- [Building the product using the local-first approach](./spa-client-side/index.md) – AKA single-page app
- Take the detour through [modeling the domain](./domain/index.md) if you are interested in Domain-Driven Design
- Traditional SPA + API – 🚧

The cool thing about this project is that both approaches are relevant, it all goes down to your expectations.

I hope you will enjoy this series,<br>
Have a nice journey 👋

## A bit of background

**Over my _first_ 5 years** as web developer, I went through 3+ big migrations ; migrations which takes something like weeks or months … on the web platform that **never introduces breaking changes**, WTF ??

Then I got into some architecture "good practices" like inversion of control to abstract away stuff like databases. you may recognize by names like "Repository", "Stores", "Clean Architecture", "Hexagonal Architecture", "Domain-Driven Design", ….

It has proven to work fine. Then I figured: could we apply these kind of practices for frameworks too? How hard would it be? So I tried.

That was the starting point of re-thinking web development at project-level, and I asked myself:
- What if I could migrate my frontend framework in days?
- What if I could migrate my backend framework in one function?

This series is the result of my experiments.

My thinking led me to other understandings regarding web project in general, see below if you are interested.

<details>
<summary><strong>How I would web project now</strong></summary>

So far, I identified 2 families of web projects: **local-first** and **server-first**.<br>
**Local-first** matches needs for offline capacities, which incidentally allows to port websites to mobile apps – and vice-versa.<br>
**Server-first** matches any other project. Here I am especially finger-pointing back-offices.

Bare in mind that local-first and server-first can also be *combined*. You may have server-first website for a back-office ***and*** a local-first app under a sub-path.<br>
In any case, a unit of business (business rules, domain, …) should exist in one place only: server-side for server-first ; client-side for local-first – you better trust your client devices ⚠️.

> [!NOTE]
> There is a special case for event-sourcing, I will not dig into that for 2 reasons:
> 1. It’s a rabbit hole subject
> 2. It’s – at the moment – way out my league.

I would argue – now – that server-first should be the default.<br>
If I rephrase that: you should have an **extremely good reason** to start a single-page app project, offline needs is one of them.

</details>


---

Made by [SacDeNoeuds](https://github.com/SacDeNoeuds) with ❤️<br>
Writing 🍝 code since 2016
