# What is a feature? ✨

Understand "feature" as a "trait" or "characteristic" of our programs. That being said, the concept is still blurry. Let’s take examples:

- is "_listing the members of a team_" a feature? That’s a bit too shallow…
- is "_removing a team member from the team_" a feature? Well, still too shallow.

To have a clearer view, behavior-driven development can help us. Picture those [Cucumber/Gherkin examples](https://cucumber.io/docs/bdd/better-gherkin):

```gherkin
Feature: Subscribers see different articles based on their subscription level
Scenario: Free subscribers see only the free articles
  …
Scenario: Subscriber with a paid subscription can access both free and paid articles
  …
```

Now the mist is fading. Let’s break down our feature, we want to be able to:

- list team members
- add team members
- remove team members

Is "listing team members" sufficient on its own? Let’s say the business says "Well, team members can view the list, but only admins can edit the list".

There we have our features:

- Viewing team members
- Managing a team.

```gherkin
Feature: View team members
  Scenario: Get the list of team members
    …

Feature: An admin can manage their teams
  Scenario: Add a new team member
    …
  Scenario: Remove an existing team member
    …
```

## Anatomy of a feature

So it appears a feature is structured this way:

```txt
Feature – View team members
└── Scenario #1 – List team members
Feature – Admin can manage their teams
├── Scenario #2 – Add team member
└── Scenario #3 – Remove team member
```

Here it becomes obvious to me that `Scenario` is the exact synonym of `Use Case`.

## The 5 aspects of a feature

### 1. Behavior

A few examples of behavior – or constraints:

- Should I be able to add team-member from outside the company?
- Is there a limit to how many members a team can have?

### 2. Usability

You have a feature and that’s beautiful. Where is it exposed? A few examples:

- API route
- UI: Website, ChatBot, …
- CLI command (unlikely, here)
- Voice interface (Alexa, Google Home, …)

### 3. Compatibility

The code has to be able to run somewhere, ideally in as many runtimes as possible.
Some code will work only on NodeJS, Erlang VM, evergreen browsers, etc.

### 4. Performance

The code should be executed in a reasonable amount of time. This can be measured at various levels:

- Scenario test
- API route test
- Front-end rendering test
- End-to-end test

### 5. Security

We have to make sure that our features are invulnerable to SQL injections or XSS for instance.
Where to test that? It depends, sorry.

## Who is responsible of which aspect?

| Aspect                             | Who is responsible                                                                                             |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| [Behavior](#_1-behavior)           | All stakeholders:<br>- Developers<br>- Product owners (if any)<br>- QA (if any)<br>- **Customers** (if any 🤭) |
| [Usability](#_2-usability)         | Developers & Designers (for UIs)                                                                               |
| [Compatibility](#_3-compatibility) | Developers                                                                                                     |
| [Performance](#_4-performance)     | Developers & DevOps                                                                                            |
| [Security](#_5-security)           | Developers & DevOps                                                                                            |

Compatibility, performance and security involve exclusively technical people. Any bug on those are developers/devops shortcomings or mistakes.

However, behavior is the only aspect involving business stakeholders, because it is the part bringing the business value.

To build great features full business value – and prevent behavior from going hazardous –, we can rely on [User Stories](./2-what-is-a-user-story.md).
