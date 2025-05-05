# Documenting for the business

You need documentation for newcomers, or anyone losing sight of a specific matter for a long time, even you when you come back from holidays! But how?

Cf the [documentation introduction](../../back-to-basics/5-what-is-documentation.md), we are referring to knowledge targeted at business people and often-changing (at least).

Keeping documentation in sync with the actual code can be a nightmare. With the AI era upon us, we could try to leverage AI to read the source code and generate documentation based on it.

But I would **not** recommend that: the AI, no matter how good it is, will never speak the business language like a business person. It doesn’t know your language.

And if it wants to guess it from the developer code, you then expect that the developer was perfect at translating business language into code…

## What do we need to document?

Essentially, we need to document exactly 3 things:

1. The concepts we use – our entities
2. The behavior – our domain
3. The usability – where is this behavior exposed? API, UI, …

### 1. The concepts we use – our entities

I generate [JSON-Schema](https://json-schema.org/) from my entities, like real `.json` files at the root of the domain. These JSON-Schemas can be re-used to generate markdown.

Another option could be to use [TypeDoc](https://typedoc.org/) or [TSDoc](https://tsdoc.org/) but to me the output remains particularly developer-oriented.<br>
And it would lack constraints like "min length", "max items", "string format", and so on.

### 2. The behavior – our domain

#### Using Cucumber/Gherkin

_Provided_ I can write good acceptance tests [cf anti-patterns](https://cucumber.io/docs/guides/anti-patterns) – which a big "_provided_" –, Gherkin is an excellent tool to reconcile source code and documentation. It bridges the gap between acceptance test -> code -> documentation.

[@cucumber/gherkin-utils](https://github.com/cucumber/gherkin-utils) can be used to generate markdown from Gherkin feature files.

[VitePress](https://vitepress.vuejs.org/) can be used to generate a website from this markdown. Bonus: you can add a search feature from day #1, there’s a local search plugin. For more advanced use cases, they support other providers.

### 3. The usability – where is this behavior exposed?

#### APIs

Use [OpenAPI](https://swagger.io/specification/). It is great and the industry standard, cross-language.<br>
For TypeScript developers, check out [ts-rest](https://github.com/ts-rest/ts-rest).

#### UIs

This one is tricky and I don’t have any fixed answer at the moment.
