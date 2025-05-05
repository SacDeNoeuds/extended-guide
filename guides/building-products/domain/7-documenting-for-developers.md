# Documenting for developers

Cf the [documentation introduction](../../back-to-basics/5-what-is-documentation.md), we are referring to knowledge targeted at developers and ever-changing (at least).

Developers are interested in all the layers, from the helicopter view to the most micro detail.

The macro part is already documented via the [documentation for business](./6-documenting-for-business.md), so remain the details.

## High-level knowledge

To understand how things interconnect, use tools like [dependency-cruiser](https://github.com/sverweij/dependency-cruiser) or [Madge](https://madge.dev/). On one hand they let you forbid certain internal dependencies – which is awesome –, and on the other hand they can draw graphs of your modules. How awesome is that?

## Mid-level knowledge – Who is using that function outside my domain?

Use the "find references" IDE feature.

## Low-level

Use JSDoc `@example` comments. And certify them using [generate-jsdoc-example-tests](https://github.com/SacDeNoeuds/generate-jsdoc-example-tests).
