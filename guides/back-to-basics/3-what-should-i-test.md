# What should I test?

> You only test what you want to work.
>
> – [Uncle Bob](https://blog.cleancoder.com/)

<!-- But the asterisk here is: manual testing _is_ testing. Which – we have to be honest –, we do a lot in startups, right? -->

To have a helicopter view, let’s get back to our 5 aspects of a feature:

1. [Behavior](./1-what-is-a-feature.md#_1-behavior)
2. [Usability](./1-what-is-a-feature.md#_2-usability)
3. [Compatibility](./1-what-is-a-feature.md#_3-compatibility)
4. [Performance](./1-what-is-a-feature.md#_4-performance)
5. [Security](./1-what-is-a-feature.md#_5-security)

Now who should test what? It circles back to the responsibility table. One should test what they are responsible for.

Let’s break them down one-by-one:

## 1. Behavior

Testers = Who’s responsible = business people.

**As technical persons we are a guide, not decision-makers**:<br>
We help the business people bring the business value in a safe & maintainable tech environment. We must only provide the field of possibilities, constraints and ideas regarding how we can help bringing the desired value.

Tests the business will write are **acceptance tests**:

> A test written by the business for the purpose of ensuring that the production code does what the business expects it to do. The authors of these tests are business people, or technical people who represent the business. i.e. Business Analysts, and QA.
>
> Source: [Uncle Bob’s blog](https://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html)

Because the writers are non-technical people, I would recommend to use [Cucumber/Gherkin](https://cucumber.io/) – more insights about where to put these files in the [architecture post](../building-products/designing-a-resilient-system/index.md).

**Golden rule: NEVER introduce technical terms (cf "we are a guide, not decision-makers")**. You let the business define concepts, you do NOT influence them, and certainly not define _any_ concept on their behalf.

<details>
<summary>Full Dive</summary>

The number of scenarios can rapidly grow 😅.

```gherkin
Feature: Get a list of team members
  As a team member
  I want to check my teammates contact info
  So that I can contact them in case of emergency

  Background:
    Given Mary is an A-team admin
    And Jack is an A-team member
    And Bob is a B-team member

  Scenario: A team member check the list of their teammates
    When Mary checks the A-team's members
    Then she sees Mary and Jack
    And it took less than 500ms # a demo of how to include performance testing

  Scenario: A team member fails checking another team's members
    When Bob checks the A-team's members
    Then Bob sees a "Not Found" error
```

And for admins:

```gherkin
Feature: Manage a team's members
  As a team admin
  I want to manage my team
  So that I am autonomous and do not need to spam support

  Background:
    Given Mary is an A-team admin
    And Jack is an A-team member
    And Bob is a B-team member

  Scenario: A team admin adds a new team member
    When Mary adds Bob
    Then the list contains Mary, Jack and Bob
    And it took less than 500ms # a demo of how to include performance testing

  Scenario: A team admin removes an existing team member
    When Mary removes Jack
    Then the list does not contain Jack
    But the list contains Mary

  Scenario: A team admin promotes a member as admin
    When Mary promotes Jack as team admin
    Then Jack becomes an A-team admin

  Scenario: A team admin revokes admin rights of a member
    When Mary promotes Jack as team admin
    And Mary revokes Jack's admin rights
    Then Jack is still an A-team member

  # Limitations
  Scenario: A team must have 1+ admin
    When Mary is the only team admin
    And Mary revokes Mary's admin rights
    Then Mary sees a "cannot remove last admin" error

  Scenario: A team admin adds a non-existent team member
    When Mary adds Freddy
    Then Mary sees an "unknown person" error

  Scenario: A team admin removes a non-existing team member
    When Mary removes Bob
    Then the list still contains Mary and Jack

  Scenario: A team has maximum 100 members
    Given the A-team has 98 random other team members
    When Mary adds Bob
    Then Mary gets a "team is full" error

  # Access control
  Scenario: A non-admin cannot add a new team member
    When Bob or Jack adds a new team member
    Then he sees a "Forbidden" error

  Scenario: A non-admin cannot remove a team member
    When Bob or Jack removes a team member
    Then he sees a "Forbidden" error
```

</details>

## 2. Usability

Testers = Who’s responsible = developers & designers (if there’s a UI).

For APIs, you have tools like [Vitest](https://vitest.dev/) or [Bruno](https://www.usebruno.com/) (open-source Postman-like).

For CLIs, manual tests are usually enough – unless you have a large surface, then I don’t know.

For UIs, I suggest exposing stories with [Storybook](https://storybook.js.org/). If you need automatic tests, you can use [Cypress](https://www.cypress.io/) or [Playwright](https://playwright.dev/).

Sometimes, you need to avoid regressions at all costs. For instance for a page containing overlays (tooltips, dialogs, etc.), you may need to make sure that a certain button is clickable on various devices and viewport sizes.<br>
For such cases, you can write (acceptance) tests using [Cucumber/Gherkin](https://cucumber.io/) again or [Playwright](https://playwright.dev/).

## 3. Compatibility

Testers = Who’s responsible = developers & QA.

For your backend runtime, running tests in the said runtime is already testing compatibility.<br>
For frontend, you can use [Playwright](https://playwright.dev/) or [Cypress](https://www.cypress.io/). Honestly, I don’t bother testing that kind of compatibility.

## 4. Performance

Testers = Who’s responsible = developers & QA.

Some ideas: add a timeout to your tests – 1 second for instance –, that should give you some nice warnings about potential problems.

Setting up observability using [OpenTelemetry](https://opentelemetry.io/) and adding error reporters like [Sentry](https://sentry.io/) or [Rollbar](https://rollbar.com/) are **an absolute must**.

## 5. Security

Testers = Who’s responsible = developers & QA.

<!-- How, I’m not exactly sure yet, so I will skip this for now. -->

Security’s scope is wide, there are lots of chapters to it and people specializing only in that area.

For frontend, you can start with [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP) to forbid dangerous APIs like `eval` or allow only trusted domains (thus excluding malicious domains).

For backend, you can start with your HTTP headers. People have even been sharing [cheatsheets](https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html).

Part of it lies in the choice of libraries (database clients, schema library, …) and tools (CloudFlare, S3 provider, …).

## Now what?

Good job 🏆! We have tested everything we could.

Does it prevent bugs from happening? Unfortunately… no. But [what is a bug?](./4-what-is-a-bug.md)
