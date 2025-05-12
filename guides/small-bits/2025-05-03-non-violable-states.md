---
title: Non-violable states
date: 2025-05-03
---

# Non-violable states

Picture this code:

```ts
import { openModal, closeModal } from '@/modals'

let isModalOpened = false
let theModalContent: string | undefined

effect(() => {
  if (isModalOpened) {
    openModal(theModalContent)
  }
})

function onButtonClick() {
  isModalOpened = true
  theModalContent = 'Hello World'
}
function onEscapePressed() {
  isModalOpened = false
}
```

This code assumes the content has to be generated each time. It has 2 major flaws:

## 1st flaw – an action should always happen -> no `if`

This is what reactivity truly means: a state/signal value changed -> something must happen.

Here if `isModalOpened` switches to `true`, the modal is getting opened ; but if `isModalOpened` switches to `false`, nothing happens.

Let’s fix that:

<!-- prettier-ignore -->
```ts
effect(() => {
  if (isModalOpened) { // [!code --]
    openModal(theModalContent) // [!code --]
  } // [!code --]
  isModalOpened // [!code ++]
    ? openModal(theModalContent) // [!code ++]
    : closeModal() // [!code ++]
})
```

## 2nd flaw – this modal state is violable

I can have `isModalOpened = true` with `theModalContent = undefined`. That’s problematic, it literally means "I show a modal but I have nothing to show".

How can we make that state non-violable? I see 2 options:

### Option #1 – display the modal depending on whether we have some modal content

<!-- prettier-ignore -->
```ts
import { openModal, closeModal } from '@/modals'

let isModalOpened = false // [!code --]
let theModalContent: string | undefined

effect(() => {
  isModalOpened // [!code --]
  theModalContent // [!code ++]
    ? openModal(theModalContent)
    : closeModal()
})

function onButtonClick() {
  isModalOpened = true // [!code --]
  theModalContent = 'Hello World'
}
function onEscapePressed() {
  isModalOpened = false // [!code --]
  theModalContent = undefined // [!code ++]
}
```

Do you notice how we cannot make mistakes anymore?

- We have content to display, we have a modal
- We have no content to display, we don't have a modal

It also removed a lot of code. Double win 💪.

### Option #2 – a more verbose yet more explicit state

<!-- prettier-ignore -->
```ts
import { openModal, closeModal } from '@/modals'

let isModalOpened = false // [!code --]
let theModalContent: string | undefined // [!code --]

type MyModal = // [!code ++]
  | { isOpened: true, content: string } // [!code ++]
  | { isOpened: false } // [!code ++]
let myModal: MyModal = { isOpened: false } // [!code ++]

effect(() => {
  isModalOpened // [!code --]
    ? openModal(theModalContent) // [!code --]
  myModal.isOpened // [!code ++]
    ? openModal(myModal.content) // [!code ++]
    : closeModal()
})

function onButtonClick() {
  isModalOpened = true // [!code --]
  theModalContent = 'Hello World' // [!code --]
  myModal = { isOpened: true, content: 'Hello World' } // [!code ++]
}
function onEscapePressed() {
  isModalOpened = false // [!code --]
  myModal = { isOpened: false } // [!code ++]
}
```

Both examples are completely valid and non-violable.
