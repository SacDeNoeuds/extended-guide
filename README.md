# Model View Demo

Demoing how to implement agnostic models and pipe them to view libraries like Vue, React, Svelte &amp; Solid… and whatever comes next.

## Introduction

The model-view approach applies to any frontend application, as long as you have some client-side scripting and rendering.

Conceptually the model-view pattern is way simpler than it looks, yet diving into it is trickier than it seems IMO, which is why I am writing these series.

There are different flavors, AKA level of details one put in their model, therefore I’ll give mine straight away: To me, the model is about data and behavior _only_, as a result there are no classes or UI-related data in there.

Basically, **the model should contain 2 things only**:

- Data to be displayed
- Interactions, in the shape of functions/methods.

The data will change over time, therefore most of the data will be reactive.

## Dive In – The guides

1. [Json Placeholder API setup](./guides/1-json-api.md)
2. [Remote data concept](./guides/2-remote-data.md)
3. [Setup the reactivity system](./guides/3-reactivity-system.md)
4. [Remote action concept](./guides/4-remote-action.md)
5. [Defining the app model](./guides/5-app-model.md)
6. [Using the App Model in React](./guides/6-react-app.md)
7. [Using the App Model in Vue](./guides/7-vue-app.md)
8. [Rendering the React & Vue apps](./guides/8-rendering-the-apps.md)
9. [Going further – Toggle a todo](./guides/9-toggle-a-todo.md)
10. [Going further – Update a todo title](./guides/10-update-a-todo-title.md)
11. [Going further – Delete a todo](./guides/11-delete-a-todo.md)
