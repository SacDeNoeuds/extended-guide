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

Now the mist is fading. Our feature was:

```gherkin
Feature: An admin can manage their teams
Scenario: See a list of team members
  …
Scenario: Add a new team member
  …
Scenario: Remove an existing team member
  …
```

There, we have it, our feature is "_Admin can manage their teams_".

## Anatomy of a feature

So it appears a feature is structured this way:

```txt
Feature – Admin can manage their teams
├── Scenario #1 – List team members, add, remove, etc… team members
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

We have to make sure that our features or invulnerable to SQL injections or XSS for instance.
Where to test that? It depends, sorry.
