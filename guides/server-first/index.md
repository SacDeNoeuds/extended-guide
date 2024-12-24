---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: How to server-first
  text: with a fully working example
  tagline: Building a Todo app using a multi-page app approach.
  actions:
    - theme: brand
      text: Get Started
      link: ./1-defining-the-server.md

features:
  - title: Modeling an HTML server
    details: We define ourselves what a server is, in Vanilla JS – and TS.
      This will allow us to write adapters for any kind of backend framework.
  - title: Using frameworks
    details: Frameworks are good at what they do, we will write adapters to pipe our server matching <em>our</em> definition into a framework adapter. Namely Express, h3 and Hapi to showcase very different frameworks.
  - title: Betting on the Web Platform
    details: The web platform is becoming incredibly good recently, after big updates in the EcmaScript world, now it’s HTML/CSS’s turn to gain a lot of features like CSS nesting, popover API and more.
  - title: Adding features over time
    details: We will adopt an iterative approach, building features on top of other features.
---

## Introduction

I will not try to model _exactly_ what a server is. A lot of people – very likely waaay smarter than I – already did an extraordinarily good job at this: check out the [Open API](https://swagger.io/docs/) collective if you are interested. But beware you will still get cruel migrations 😅 (OpenAPI is v3 at the time of writing).

I will focus solely on what matters to _our_ situation: modeling a server containing _only_ HTML route handlers.

## Why modeling _just_ an HTML server?

Why not aiming at universality?

1. Because it is difficult.
2. Because it is **not my concern**. It is a language or framework concern (NodeJS/Express). Defining more than _I_ need is a trap. **Defining just what I need is key**.

> But, but… it is not future-proof: you can’t build a JSON API for instance!

Yes it is, yes you can. By defining another concept: the JSON API one, and I suggest you circle back to OpenAPI, cf the [intro](#introduction). We use both differently, so let’s define JSON APIs and an HTML servers differently.<br>
Sounds too simple, too good to be true? It is that simple, it is that good: **the price to pay is to define your 💩, your API surface**. **Exhaustiveness is a trap**: you have to **be exhaustive for _your project_, not for the world**. My concern right now is HTML route handlers, nothing else.

Differentiating concepts gives me flexibility: I only need to write one adapter per definition. I may have 1 to 3 definitions of big stuff like an HTML server, that’s a decent amount of adapters to write in my opinion.

And in the end it will empower me to:

1. support more stuff by extending our definitions as needs arise.
2. switch the technology by writing another adapter – typically in case of performance issues.
3. Most importantly: Absorb framework migrations in a dedicated place, the adapters.

Ready to get started? Let’s [define an HTML server](./1-defining-the-server.html).

We will move forward step-by-step and refine our definition as needs arise (GET, POST, cookie-based authentication, …)
