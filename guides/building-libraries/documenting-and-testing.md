# Documenting & testing a library

I will assume the library is written in TypeScript.

## Documenting

I recommend to **document everything by example** using JSDoc `@example` comments. It enables in-editor intellisense _and_ generating documentation websites.

## Testing

Those comments need to be certified as always-true, I suggest using [generate-jsdoc-example-tests](https://www.npmjs.com/package/generate-jsdoc-example-tests) (which I built).

It allows to generate test files from JSDoc examples and adapt to your favorite test-runner.

What I recommend:

- Write testable JSDoc `@example` comments.
- Write tests for remaining edge-cases if necessary. I would argue that edge cases can also be part of the examples.

## Deploying a documentation

Once you have written all your JSDoc comments, your library is ready to be parsed by a documentation generator.

You can use [TypeDoc](https://typedoc.org) + [typedoc-plugin-markdown](https://typedoc-plugin-markdown.org/) + [vitepress](https://vitepress.dev) or [TSDoc](https://tsdoc.org) + [vitepress](https://vitepress.dev).

And finally, using GitLab or GitHub pages is usually enough.
