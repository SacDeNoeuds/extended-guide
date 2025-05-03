# What is a bug? 🐛

## Feature-related

As mentioned initially: It is something not working as expected. It can fail on any [aspect of a feature](./1-what-is-a-feature.md#the-5-aspects-of-a-feature):

- Behavior: we need to refine our design.
- Usability: The feature cannot be accessed properly
  - A delete button hidden under an overlay
  - An API route not responding.
- Compatibility: feature does not work on a certain platform we are supposed to support.
  - it works on Chrome but not Firefox.
  - it works on Node.js v22 but not v18.
- Performance: the team list is taking 30s to load.
- Security: Someone managed to inject SQL 😱.

And finally, let’s add a final one:

## Defects – feature-unrelated

Those are developer mistakes or infrastructure issues:

- Syntax errors at runtime, like `TypeError`
- DB cannot connect
