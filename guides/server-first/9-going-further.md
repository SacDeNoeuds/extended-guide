## Going further

To go further, you can write handlers to edit an item’s name, toggle it, etc…

## Conclusion

### Upsides

What we have achieved so far is great and can be considered a good trade-off depending on your needs. By adopting a server-first approach we:

- Deal with fresh data, reducing the probability of concurrency issue.
- Simplify our project by centralizing 1 project (backend+frontend) instead of 2.
- Use the browser for its known best strengths: dealing with HTML, http-only cookies, routing, loading states.
- Improve security by avoiding client-side scripting in general.
- Gave us room to adopt a [progressive enhancement](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement) approach.

### Downsides

- We lose offline capabilities.
- We propose a medium interactivity level, building dialog/stepper flows is more difficult for instance.

Of course both of these can be solved at page-level using micro-frontends, or at widget-level using custom elements / web components.
