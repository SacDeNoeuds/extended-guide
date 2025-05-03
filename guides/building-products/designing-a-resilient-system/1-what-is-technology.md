## The cost of technology

> [!IMPORTANT]
> Each tool or technology comes with a cost… of maintenance.

I have read this, experienced it. Which led to ask myself: how avoidable is that? At what cost? And what is "technology" anyway? I investigated.

## What is technology?

### Language

Most languages have major version releases: Python, Go (v2 will come someday 🥱), PHP, …

Yet the _web platform_ – HTML, CSS & JS – is designed to be breaking-change-free. A weakness for some, a strength for me.

It also has a big community of developers, re-assuring me that I can find fairly simply people to work with and at decent wages or rates. That’s also something to consider when building a product and a company.

### Databases

A DB can be narrowed down to 2 operations: read and write. Every DB allows to read & write.<br>
To me their main differentiator is on how data can be accessed (read): indexation.

You have boring technology like SQL or key-value stores like Redis. Tested by time, large communities and good support.

And you have more esoteric technologies like MongoDB/DynamoDB, BlockChain or ElasticSearch/Algolia in their times. They require to learn new paradigms, potentially only with professional support.<br>
NB: I like learning new stuff, but you know what I like better? Learning stuff I can re-use.

**Bottom line**: Data is essential to any project, choose wisely. But more importantly, use some kind of "data store" or "repository", whatever you call it as long as it exists.<br>
You can find samples in any of the projects in this series, for instance [here](../server-first/7-grocery-list-project.html#defining-the-domain).

### Deployment strategy / Hosting

Thankfully we have Docker now, therefore it has become uncommon to upgrade personally OS versions. Although it may still happen, I will not dig into this.

Whether you opt for microservices, monolith, VPS, I couldn’t care less.

Side note: when it comes to JS/TS, we even get blessed 😒 by new runtimes joining the dance 🕺, after NodeJS came Bun & Deno, and I suspect more are coming. This is some shift from thinking "My code will run on NodeJS" to "My code will run" 😅.

### Frameworks

To me, one big pace-killer is – drum roll 🥁 – library migrations. Either frameworks releasing major upgrades, either rewrites from framework A to framework B because framework A is unmaintained – or has been for years, hello sails.js 👋 – or has lost traction – hello Backbone, Ember, … 👋.

Let’s start with 2 definitions – yes, they come from me 🤓:

> **Web Platform**: A technology which decided to **never introduce breaking changes**.<br>**Web Framework**: A technology which **introduces breaking changes ~ once every 2 to 5 years**.

If I rephrase that:<br>
Let’s say you are working at a company whose first project was bootstrapped 3 or 5 years ago. What are the chances that you have migrated – or need to migrate – one of your frameworks?

To me it’s near 100%. In that way, the JavaScript world is particularly contradictory:

1. The **web platform** decided at its very beginning it would **never introduce breaking changes**. Websites from the 2000s are still up & running!<br>Although it may have some drawbacks (like keeping `null` and `undefined` 😒), this **philosophy drove trust**, thus **wide adoption**.
2. The **web frameworks**, on the contrary, have introduced _countless_ breaking changes, inducing migrations and impacted teams on their way to delivering features, therefore driving less revenue. Either that or your framework is too newbie 😄.

Because the **web platform** is so stable and gaining tons of features, I want to bet on it.

The biggest gamble I am making nowadays is using TypeScript, considering it is on the verge of becoming an actual web standard.
