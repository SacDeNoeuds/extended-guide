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

## OOP, that traitor

To me, Object-Oriented Programming is a paradigm imported by the video game industry because it suited them there. But it does not suit regular business in my opinion.

I can endure the immutability performance overhead in exchange for predictability and peace of mind. The trade-off is easily made.

Yet, because OOP is such a major standard and TypeScript adoption is young (in comparison), there is not much documentation regarding how to model a system in TypeScript using function/data-oriented programming.

That is the subject of this guide. How about we [get started](./1-branded-types.md)?
