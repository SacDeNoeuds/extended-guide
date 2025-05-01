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

We have to make sure that our features or invulnerable to SQL injections or XSS for instance.
Where to test that? It depends, sorry.

## Full dive

The number of scenarios can rapidly grow 😅.

```gherkin
Feature: Get a list of team members
  As a team member
  I want to see my teammates
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
Feature: An admin can manage their teams
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

  # Access control
  Scenario: A non-admin cannot add a new team member
    When Bob or Jack adds a new team member
    Then he sees a "Forbidden" error

  Scenario: A non-admin cannot remove a team member
    When Bob or Jack removes a team member
    Then he sees a "Forbidden" error
```
