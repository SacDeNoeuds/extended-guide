# Technical choices – Use the right tool for your problem

The first step to reduce accidental complexity is to reduce 🥁 … technology. Well thanks captain Obvious – you’re welcome.

How can we reduce technology? By identifying our project needs and using tailored tools for them.

## A case against single page apps

How many single-page apps _do not **need**_ to be single page apps?<br>In other words, how many times the industry is using a bazooka to kill a bird?

I have built countless back-offices and public websites. Retrospectively, I might argue a good 90% of the **pages** (not whole websites) should have been something else, not single page apps.

Although building a single page app gives freedom to do anything, it comes with known costs:

1. Re-inventing wheels like client-side routing (whether it’s you or a library does not matter)
2. Dealing with unscoped CSS.
3. Complex DOM manipulation, involving DOM APIs and/or virtual DOM which are more expensive to run in terms of bandwidth and battery consumption.
4. Data fetching, usually fetching more data than needed or using an overhead like GraphQL.

And that’s not counting commonly-made mistakes, like shitty-crafty client-side caching or maintaining global store consistency (redux, vuex & co I see you).

What do we get in exchange:

1. Smoothness / speed / app-like navigation
2. Porting web app to mobile apps using NativeScript, Capacitor, etc.
3. Complex fine-tuned user experiences

Well, let’s address those so-called advantages.

### 1. Smoothness

It takes a pretty big blast most of the time due to network queries being sent all over the place and taking quite some time. Yes you navigated smoothly, but you had nothing to show straight away.

### 2. Porting web app to mobile

This can also be achieved using other approaches, [Turbo Native (PHP)](https://native.hotwired.dev/) stated their case.

And if you want to avoid WebViews, then you will have to rewrite some components anyway. So yeah, still not a win.

### 3. Complex fine-tuned user experiences

Those are terribly difficult to achieve, you better know what you are doing. In any case and depending on how complex your user flows are, you can do a lot using native CSS (ie: anchor tabs for forms with steppers), the [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API) for tooltips & dialogs, and custom elements / web components to fill the gaps anywhere needed.

And if _ever_ it is still not enough, then use some React/Vue/… **only for the pages you need, not your whole website**!

## Examples of good single page apps candidates

- Google Mail
- Figma
- Trello
- Spotify – the b2c portal to listen to music, not where professional upload their music
- …

## Conclusion

What justifies the cost of a single page app is:

1. A super-duper fine-tuned user experience, which you can bring at page level.
2. Offline capabilities, which comes with whole other set of problems.

Unless you work for big shorts, 1. can be avoided and only 2. remains. Your call.

### No more cases, your honor …

At least for now.
