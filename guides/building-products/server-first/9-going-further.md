## Going further

To go further, you can write handlers to edit an item’s name, toggle it, etc… Here are a few ideas:

- `GET /list/:name` to display the items of a grocery list and rename it.
- `POST /rename-list`
- `POST /rename-list-item/:listName`
- `POST /change-list-item-quantity/:listName`, use it to also remove items (quantity <= 0).

## Going super-further

- Make a list accept multiple members
- Serve static assets, add some styling
- Start playing with custom elements to enable progressive enhancement

## Conclusion

### Upsides

What we have achieved so far is great and can be considered a good trade-off depending on your needs. By adopting a server-first approach we:

- Deal with fresh data, reducing the probability of concurrency issues.
- Simplify our project by centralizing 1 project (backend+frontend) instead of 2.
- Use the browser for its known best strengths: dealing with HTML, http-only cookies, routing, loading states.
- Improve security by avoiding client-side scripting in general.
- Gave us room to adopt a [progressive enhancement](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement) approach.

### Downsides

- We lose offline capabilities.
- We propose a medium interactivity level, building dialog/stepper flows is more difficult for instance.

Both of these can be mitigated/solved at page-level using micro-frontends, or at widget-level using custom elements / web components.
