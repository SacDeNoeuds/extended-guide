---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: Designing a resilient web project
  text: A collection of fully working examples
  tagline: In different environments ; client-side, server-side, multi-page apps, single-page apps, …
  actions:
    - theme: brand
      text: Get Started
      link: /designing-a-resilient-system/

features:
  - title: Multi-page app / server-first approach
    details: Particularly relevant for project like back-offices, we will bet on the platform and use shiny HTML/CSS features to enhance user experiences.
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

Lots of people have dug into identifying pace-killers, in the literature it can be known as **software entropy**, a beautiful word to describe the **measure of chaos**.<br>
A great resource is _No Silver Bullet — Essence and Accidents of Software Engineering_ by Fred Brooks.

It is a full subject in itself and I will not dive into it here, only jump to conclusions. Two types of complexities are identified:
1. **Domain complexity**, which can be reduced by spending time on understanding matters and concising them to the maximum. **It is an exercise of concision**.
2. **Accidental complexity**, the one which is introduced but is not desired.

This accidental complexity can come from various places:
1. **Humans** coming with their understanding of the system and evolving it. Hence the importance of understanding the domain, again.
2. A constantly **changing environment**, bringing every decade and every year its share of super-mega tremendously innovative tools & technologies we adopt on the way.
3. **Intertwined domain and technologies**: if, to change the domain, you need to change the technology … you are kind of doomed: any technology upgrade/update might break your domain.

This observations lead to the following conclusions (that’s not from me):
- Decouple domain from technology
- Design your system to make it resilient to changes of technology AND domain

Designing a system like so has **many MANY** impacts on the architecture, and also embeds the idea that **deployment strategies** is a **detail** and should not in any case mold your system’s core.

Therefore, this series will focus on 2 major aspects: domain modeling and how to design a system resilient to changes. Then I will bootstrap projects to demonstrate how it plays over time.

## Get Started

For demo purposes, we will build a Grocery List project in various fashions. Here’s the roadmap:
- [Designing a resilient system](./designing-a-resilient-system/index.md) to make conscious technical choices
- [Domain modeling](./domain/index.md) to define concisely domain complexity
- [Building the product using the server-first approach](./server-first/index.md) – AKA multi-page app
- [Building the product using the local-first approach](./spa-client-side/index.md) – AKA single-page app
- Traditional SPA + API – if I find the time 🚧

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
