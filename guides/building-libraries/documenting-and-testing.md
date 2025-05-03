# Documenting & testing a library

I will assume the library is written in TypeScript.

## Documenting

I recommend to **document everything by example** using JSDoc `@example` comments. It enables in-editor intellisense _and_ generating documentation websites.

For instance:

````ts
/**
 * @example
 * ```ts
 * const date = new Date('2025-05-01')
 * assert(formatDate(date) === 'May 1, 2025')
 * ```
 */
export function formatDate(date: Date) { … }
````

However, this kind of documentation can become obsolete in a glimpse. We can enforce its validity by testing JSDoc `@example` comments, see the [testing section](#testing) below 😁.

## Testing

JSDoc `@example` comments need to be certified as always-true. I suggest using [generate-jsdoc-example-tests](https://www.npmjs.com/package/generate-jsdoc-example-tests) (disclaimer: I built it).

It allows to generate test files from JSDoc `@example`, adapted to your favorite test-runner.

What I recommend:

- Write testable JSDoc `@example` comments with `assert`ions or `expect`ations.
- Write tests for remaining edge-cases if necessary. I would argue that edge cases can also be part of the examples.

## Deploying a documentation

Once you have written all your JSDoc comments, your library is ready to be parsed by a documentation generator.

My strategy is to adopt intermediary steps: **Source code -> Markdown -> HTML**.

It gives me flexibility ; I can change the markdown generator and my markdown website separately, depending on new products reaching the market.

#### Source Code -> Markdown:

1. [TypeDoc](https://typedoc.org) with [typedoc-plugin-markdown](https://typedoc-plugin-markdown.org/)
2. [TSDoc](https://tsdoc.org) with [API Extractor](https://api-extractor.com/) and [API Documenter Markdown](https://api-extractor.com/pages/commands/api-documenter_markdown/)

#### Markdown -> HTML:

- [VitePress](https://vitepress.dev)
- [Docusaurus](https://docusaurus.io)
- [Docsify](https://docsify.js.org)

#### HTML hosts

- GitLab pages
- GitHub pages
- Netlify
- …

Static hosting providers are legion, honestly.
