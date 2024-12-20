---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: How to – server-first
  text: with a fully working example
  tagline: Building a collaborative Todo app using a multi-page app approach.
  actions:
    - theme: brand
      text: Get Started
      link: ./1-defining-the-server.md

features:
  - title: Modeling a server
    details: We define ourselves what a server is, in Vanilla JS – and TS.
      This control will allow us to write adapter for any kind of backend framework.
  - title: Using frameworks
    details: Frameworks are good at what they do, we will write adapters to pipe our server matching <em>our</em> definition into a framework adapter. Namely Express and h3.
  - title: Betting on the Web Platform
    details: The web platform is becoming incredibly good recently, after big updates in the EcmaScript world, now it’s HTML/CSS’s turn to gain a lot of features like CSS nesting, popover API and more.
  - title: Adding features over time
    details: We will adopt an iterative approach, building features on top of other features.
---

## Introduction

I will not try to model _exactly_ what a server is. A lot of people – very likely waaay smarter than I – already did an extraordinarily good job at this: check out the [Open API](https://swagger.io/docs/) collective if you are interested. But beware you will still get cruel migrations 😅 (OpenAPI is v3 at the time of writing).

I will focus solely on what matters to _our_ situation: modeling a server containing _only_ HTML route handlers.

Ready to [get started](./1-defining-the-server.html)?
