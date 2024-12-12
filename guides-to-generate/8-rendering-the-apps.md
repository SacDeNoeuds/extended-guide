# Rendering our React & Vue apps

## The HTML

I will use an HTML select to choose between Vue & React, and re-render upon select change.

<!-- include [code:html] ./index.html -->

## The rendering process

We will create a function for each engine: React & Vue, and another one to switch between the engines.

<!-- include [code:ts] ./render-app-8.ts -->

## The entry point – main.ts

Now our main is very simple: we get the value from the select and render the corresponding app.

When the select value changes, we re-render the app.

<!-- include [code:ts] ./main.ts -->

## Testing the whole

```sh
npm start
```

Tada 🎉

---

Going further:
- [Toggle a todo](./9-toggle-a-todo.md)
- [Update a todo title](./10-update-a-todo-title.md)
- [Delete a todo](./11-delete-a-todo.md)