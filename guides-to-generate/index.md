---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: Model View Demo Series
  text: A fully working example…
  tagline: …of how to implement using a model-view pattern.
  actions:
    - theme: brand
      text: Get Started
      link: /1-json-api.html

features:
  - title: Defining models
    details: Diving into cross-project abstractions like `RemoteData` and project-specific abstractions like `AppModel`.
  - title: Rendering models – views
    details: Using React and Vue to demo how easy it is to swap.
  - title: Adding features over time
    details: By adding features over time, like toggling a todo, changing its title or deleting it.
  - title: More on modularization
    details: 'We will dive into the 2 main problems we commonly face: forms & filtered tables'
---

## Foreword – What these guides do NOT address

This guide focuses on **client-side applications**. Whether you _need_ one or not is for you to decide. **Choose wisely**.<br>
In any case, using the model view approach is compatible with advanced techniques like server-side rendering if need be.

## Introduction

The model-view approach applies to any client-side application, precisely by decoupling behavior (model) and UI (view).<br>
Conceptually the model-view pattern is simple, yet diving into it is trickier than it seems IMO, which is why I am writing these series.

There are different flavors, AKA level of details one put in their model, therefore I’ll give mine straight away: To me, the model is about data and behavior _only_, as a result there are no CSS classes or UI-related data in there.

Basically, **the model should contain 2 things only**:

- Data to be displayed
- Interactions, in the shape of functions/methods.

The data will change over time, therefore most of the data will be reactive.

## Get Started

Head to [Json Placeholder API setup](./1-json-api.md).

I hope you will enjoy this series,<br>
Have a nice journey 👋

---

Made by [SacDeNoeuds](https://github.com/SacDeNoeuds) with ❤️<br>
Writing 🍝 code since 2016
