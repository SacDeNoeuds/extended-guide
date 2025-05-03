---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: Designing a
  text: resilient system
  tagline: Putting technology to <em>our</em> service, not the other way around.
  actions:
    - theme: brand
      text: Get Started
      link: ./1-what-is-technology.md

features:
  - title: What is technology?
    details: An attempt to clarify what we bathe in.
  - title: Technical choices …
    details: … we can make to reduce accidental – technological – complexity.
  - title: How to choose dependencies
    details: A guide designed to help you stay free while still using cool stuff.
---

## Architecture – Anatomy of a software

A product is a collection of [features](../../back-to-basics/1-what-is-a-feature.md), exposed to various stakeholders like our customers (which may have different roles) or our internal teams (ie: for support).

Those features take place in a certain _system_ (our product). **This system** will constantly evolve over time, it **has to resilient by design**.

## Product architecture

<!-- TODO: expose the feature-oriented architecture I would like to see -->

```txt
my-great-product/
#
```

## A feature folder

- How should we store those features?
- What will those features depend on?

Here is a proposal:

```txt
manage-team/
├── behavior/
│   ├── manage-team.feature
│   └── manage-team.ts
└── usability/
    ├── api/
    │   ├── manage-team-api-contract.ts
    │   └── manage-team-api-handler.ts
    └── ui/
        ├── AddTeamMemberButton.php
        ├── AddTeamMemberButton.react.tsx
        ├── AddTeamMemberButton.solid.tsx
        ├── AddTeamMemberButton.vue
        ├── AddTeamMemberButton.react.tsx
        ├── RemoveTeamMemberButton.solid.tsx
        └── RemoveTeamMemberButton.vue
```

## Now that our architecture is in place

Ready to dive in? Let’s explore [the cost of technology](./1-what-is-technology.md).
