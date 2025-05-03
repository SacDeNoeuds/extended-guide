# What is documentation? 📖

It goes down to its **purpose: Sharing knowledge with other people** (or our future self).

## Lifetime – How long will the knowledge be valid?

<small>Paraphrasing folks from _living documentation_ here</small>

A certain knowledge will stay true/valid for a certain time. We can roughly split into big categories:

- **Constant knowledge** (or almost constant), stays valid for a long time.
  - Someone’s birth date _never_ changes.
  - Someone’s first name will change very rarely during their life.
  - The name of a country, very few changes in history.
- **Often-changing knowledge**
  - Someone’s home
  - Someone’s tastes or job
  - Presidents in countries holding elections every 5 years
- **Ever-changing knowledge**
  - Someone’s age
  - Someone’s income
  - The location of a function in the codebase

## Target audience – Who is this knowledge for

If I take the example of the IT world, it can be other developers and/or business people, let's recap the audience (non exhaustive list):

- Developers
- QA
- Product owners/managers
- Customer success/relationship managers.
- Sales (business people)
- Marketing (business people)
- C-level

## How to document?

We have to adopt various strategies depending the lifetime and target audience.

<table>
<tr>
  <th style="text-align: center">Knowledge Lifetime</th>
  <th style="text-align: center">For Developers</th>
  <th style="text-align: center">For Business<br><small>PM, sales, marketing, …</small></th>
</tr>
<tr>
  <th style="text-align: center">Constant<br><small>Forever true</small></th>
  <td colspan="2" style="text-align: center">Any manual documentation tool</td>
</tr>
<tr>
  <th style="text-align: center">Often-changing<br><small>Valid for 10+ iterations</small></th>
  <td style="text-align: center">JSDoc<br>Auto-generated docs</td>
  <td style="text-align: center">Auto-generated docs</td>
</tr>
<tr>
  <th style="text-align: center">Ever-changing<br><small>Less than 10 iterations</small></th>
  <td style="text-align: center" colspan="2">Conversations</td>
</tr>
</table>

More on auto-generating documentation based on whether we talk about [a library](../libraries/documenting-and-testing.md) or [a full product 🚧](TODO).

The idea is always the same: find the source of truth, generate documentation from it.
