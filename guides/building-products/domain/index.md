---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: Domain Modeling
  text: with a fully working example
  tagline: Modeling a Grocery List app
  actions:
    - theme: brand
      text: Get Started
      link: ./1-branded-types.md

features:
  - title: Modeling our system’s behavior
    details: Using synchronous logic, then the infrastructure sandwich.
  - title: Polyglot guide
    details: We will talk Domain-Driven Design, Hexagonal Architecture and probably a bit of Clean Architecture. Mostly in a function/data-oriented paradigm.
  - title: Pushing infrastructure/adapters to the edges
    details: We will represent <em>all</em> the business before even mounting an in-memory or database repository.
---

## What is domain and what is not?

Here is a simple decision tree:
Is it a concept that can live outside your company?

- Yes -> not domain
- No -> domain

## OOP, that traitor

To me, Object-Oriented Programming is a stale paradigm imported by the video game industry because it suited them there. This industry now uses the [entity component system](https://en.wikipedia.org/wiki/Entity_component_system). In my opinion, it does not suit regular business projects.

I can endure the immutability performance overhead in exchange for predictability and peace of mind. The trade-off is easily made.

Yet, because OOP is such a major standard and TypeScript adoption is young (in comparison to other languages), there is not much documentation regarding how to model a system in TypeScript using functional/data-oriented programming.

That is the subject of this guide. How about we [get started](./1-branded-types.md)?
