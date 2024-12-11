# Model View Demo

Demoing how to implement agnostic models and pipe them to view libraries like Vue, React, Svelte &amp; Solid… and whatever comes next.

## Introduction

The model-view approach applies to any frontend application, as long as you have some client-side scripting and rendering. Could be in C & Qt as well as HTML/JS.

Conceptually the model-view pattern is way simpler than it looks, yet diving into it is trickier than it seems IMO, which is why I am writing these series.

There are different flavors, AKA level of details one put in their model, therefore I’ll give mine straight away: To me, the model is about data and behavior _only_, as a result there are no classes or UI-related data in there.

Basically, **the model should contain 2 things only**:
- Data to be displayed
- Interactions, in the shape of functions/methods.

The data will change over time, therefore most of the data will be reactive.

## Setup

### Step 1 – Define an agnostic reactivity system

First, I will *define* the `Signal` or `State` concept. By doing so, we will be in the position of swapping the implementation detail anytime at the cost of defining ourselves the API.

### Step 2 – Give the reactivity system an implementation

Let’s not re-invent the wheel and facade an existing library. We have a few options, especially since 2023 😅:
- [`s-js`](https://www.npmjs.com/package/s-js)
- [`@preact/signals-code`](https://www.npmjs.com/package/@preact/signals-core)
- [`solid-js`](https://www.npmjs.com/package/solid-js)
- The [polyfill](https://www.npmjs.com/package/signal-polyfill) of the [proposal](https://github.com/tc39/proposal-signals) – not production-ready

For the sake of poetry (NB: one of the first to push for signals), I will use S.js

<!-- include [code:ts] ./setup/Signal.ts -->

Great, now because it will be at the root of our project, let’s write a bunch of tests to avoid bad surprises. Done ✅

<details>
  <summary>
    Here is the spec …
  </summary>

<!-- include [code:ts] ./setup/Signal.spec.ts -->

</details>

<details>
  <summary>
    … and here the facade
  </summary>

<!-- include [code:ts] ./setup/Signal.s-js.ts -->

</details>


### Step 3 – Let’s build a simple API

I will use the [json placeholder mock API](https://jsonplaceholder.typicode.com/) to get and post data.

I will focus on the todo part: listing, toggling and maybe something else.

Done, including the `fetch` implementation ✅

<!-- include [code:ts] ./setup/Api.ts -->

## Models

I will take problems we usually face client-side: displaying data after fetching, upserting data and deleting data.

### Step 1 – `TodoList` model


<!-- include [code:ts] ./steps/step-1/TodoListModel-1.ts -->

Done ✅. Now that we have a highly testable model, let’s test it !

<!-- include [code:ts] ./steps/step-1/TodoListModel-1.spec.ts -->

Okay. It looks fairly obvious that we will need to fetch stuff pretty often, so let’s create a `RemoteData` model.

<!-- include [code:ts] ./steps/step-1/RemoteData.ts -->

Done ✅.
Let’s refactor our `TodoList` model. Great, let’s re-test… all good!

<!-- include [code:ts] ./steps/step-1/TodoListModel-2.spec.ts -->

#### Step 2 – `TodoForm` model

Now we have a problem: we can’t provide arguments to our action trigger… Let’s fix that.

2nd problem: we start at `"pending"`, which is invalid: we did not send anything yet. Let’s add an `"initial"` state.

3rd problem: our abstraction is too trivial: if a successful value is `'pending'`, it will collide with the remote data `'pending'` state. Plus, a pending state might take some `Progress` info.

Let’s fix all those problems:

Let’s refine the `RemoteData<T>` type:

<!-- include [code:ts] ./steps/step-2/RemoteData.ts -->

Then let’s adapt the `RemoteAction<T>`:

<!-- include [code:ts] ./steps/step-2/RemoteAction.ts -->

Great, now let’s test it:

<!-- include [code:ts] ./steps/step-2/RemoteAction.spec.ts -->

Ok, we can go back to that form model. Conceptually, the frontend will display fields the user can interact with, and submit the values with an optional validation step.

In that concept, you will notice there is **no mention** to **creation** or **update**. That is intended: a form **does not care** about that.

A form is simple: **give it** `initialValues` and `submit()` function, it will abstract everything away for you, including validation.

Because the `submit` function is provided by the parent, that is where you will decide whether it is creation or update.

<!-- include [code:ts] ./steps/step-2/TodoFormModel.ts -->

Done ✅, let’s test it:

<!-- include [code:ts] ./steps/step-2/TodoFormModel.spec.ts -->

### Step 3 – `DeleteTodo` model

A deletion usually involves a confirmation step. Let’s model that first.

The only difference with `RemoteAction<T>` is that we will add an intermediary step. `trigger(…)` will not execute anything yet and wait for a `confirm()`-ation or `cancel()`-ation.

<!-- include [code:ts] ./steps/step-3/RemoteActionToConfirm.ts -->

Great, let’s test it:

<!-- include [code:ts] ./steps/step-3/RemoteActionToConfirm.spec.ts -->

For the demo, we will allow to delete one todo at a time. For more complex use cases, you can use different approaches:
- Adding a `deleteTodos(ids)` – delete multiple todos at once with some selection.
- Updating `RemoteActionToConfirm` to handle concurrency, when a new action is asked but the previous one is not completed.

Now let’s implement that `DeleteTodoModel`.

<!-- include [code:ts] ./steps/step-3/DeleteTodoModel.ts -->

Because there is solely a remote action to confirm in there, I will not even bother testing it considering `RemoteActionToConfirm` is tested.

### Step 4 – Writing the `App` model

Because yes, all this lives in an app after all. Let’s start with the `AppModel`:

<!-- include [code:ts] ./steps/step-4/AppModel.ts -->

Then the `TodoPageModel`:

<!-- include [code:ts] ./steps/step-4/TodoPageModel.ts -->

… And finally let’s test it:

<!-- include [code:ts] ./steps/step-4/AppModel.spec.ts -->

### Step 5 – editing a todo item

From the list, I want to be able to change the title or toggle the todo. Fine! Let’s incorporate that to the `TodoListModel`:

Let’s consider those actions:
- delete todo item (click)
- toggle todo item (click)
- rename todo item (form)

I’ll add another constraint for the sake of demo: we can display only one todo form at a time.

<!-- include [code:ts] ./steps/step-5/TodoListModel.ts -->

Now let’s update the `TodoPageModel` to hoist a global todo form:

<!-- include [code:ts] ./steps/step-5/TodoPageModel.ts -->

… and there you go.

## Views

Excellent, we have everything in place, now we can focus on the view. Eventually using frameworks, which I will showcase as it is fairly common.

### Step 6 – With React

Let’s climb up the tree from the bottom, we means we will start with a `TodoList` component:

<!-- include [code:tsx] ./steps/step-6-react/TodoList.tsx -->
Then `TodoPage` component:

<!-- include [code:tsx] ./steps/step-6-react/TodoPage.tsx -->

… And finally the `App` component:

<!-- include [code:tsx] ./steps/step-6-react/App.tsx -->

### Step 7 – With Vue

We can repeat the _exact same process_ with Vue:

The `TodoList` component:

<!-- include [code:vue] ./steps/step-7-vue/TodoList.vue -->

The `TodoPage` component:

<!-- include [code:vue] ./steps/step-7-vue/TodoPage.vue -->

The `App` component:

<!-- include [code:vue] ./steps/step-7-vue/App.vue -->

### Step ~8~ – With Solid

You’re starting to get the drill, aren’t you? I’ll stop adding frameworks here because you can do it on your own.

## Going Further

### Let’s refresh the list when a todo is deleted

In `TodoListModel`, we can run effects upon `deleteTodo` action state changes:

<!-- include [code:ts] ./steps/step-5/TodoListModel.ts -->

### Let’s add implement the `DeleteTodo` button

#### In React

Let’s start with a confirm-action modal which can take any `RemoteActionToConfirm`:

<!-- include [code:tsx] ./steps/step-6-react/ConfirmActionModal.tsx -->

Then let’s use it in our `DeleteTodoButton`:

<!-- include [code:tsx] ./steps/step-6-react/DeleteTodoButton.tsx -->

Great, now it can go into our `TodoList`:

<!-- include [code:tsx] ./steps/step-6-react/TodoList-2.tsx -->

Awesome. Let’s add a `TodoForm`:

<!-- include [code:tsx] ./steps/step-6-react/TodoForm.tsx -->

Since I am displaying only one at a time, I will want it in a dialog:

<!-- include [code:tsx] ./steps/step-6-react/TodoFormModal.tsx -->

Now I can incorporate it to my `TodoPage` component:

<!-- include [code:tsx] ./steps/step-6-react/TodoPage-2.tsx -->

