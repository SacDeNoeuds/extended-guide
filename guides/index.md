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
      link: /spa-client-side/1-todo-api.html

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

## Introduction

> [!WARNING]
> ⚠️ These series are still work-in-progress 🚧

Let’s start with 2 definitions – yes, they come from me 🤓:

> **Web Platform**: A technology which decided to **never introduce breaking changes**.<br>
> **Web Framework**: A technology which **introduce breaking changes ~ once every 2 to 5 years**.

If I rephrase that:<br>
Let’s say you are working at a company whose first project was bootstrapped 3 or 5 years ago. What are the chances that you have migrated – or need to migrate – one of your frameworks?

To me it’s near 100%. In that way, the JavaScript world is particularly contradictory:

1. The **web platform** decided at its very beginning it would **never introduce breaking changes**. Websites from the 2000s are still up & running!<br>Although it may have some drawbacks (like keeping `null` and `undefined` 😒), this **philosophy drove trust**, thus **wide adoption**.
2. The **web frameworks**, on the contrary, have introduced _countless_ breaking changes, inducing migrations and impacted teams on their way to delivering features, therefore driving less revenue. Either that or your framework is too newbie 😄.

Because the **web platform** is so stable and gaining tons of features, I want to bet on it.

The only bet I am making now is using TypeScript, considering it is on the verge to became an actual web standard.

## A bit of background

Over my first 5 years as web developer, I went through 3+ migrations ; migrations which takes weeks or sometimes months … on the web platform that **never introduces breaking changes**, WTF ??

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

I would argue – now – that server-first should be the default.

</details>


## Get Started

For demo purposes, we will build a collaborative Todo product. Before anything, we will [model our product]() (if you are interested in Domain-Driven Design) by defining entities and use cases. Then here’s the roadmap:
- [Building the product using the server-first approach](./server-first/index.md) – AKA multi-page app
- [Building the product using the local-first approach](./spa-client-side/index.md) – AKA single-page app

The cool thing about this project is that both approaches are relevant, it all goes down to your expectations.

I hope you will enjoy this series,<br>
Have a nice journey 👋

---

Made by [SacDeNoeuds](https://github.com/SacDeNoeuds) with ❤️<br>
Writing 🍝 code since 2016
