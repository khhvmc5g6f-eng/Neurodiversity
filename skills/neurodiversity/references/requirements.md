# Requirements: literalist/pragmatist passes, ambiguity, completeness, negative space

## Literal vs pragmatic requirements passes

Run these as two separate, isolated agent calls — not one agent asked to
consider both angles, since the value is in genuine independence.

**Literalist agent instruction:**
> Read these requirements literally. Do not fill gaps using industry
> convention, common sense, or "obviously what they meant." Identify
> every place wording is ambiguous, underspecified, or could be read
> more than one way by a strict reading. Output the literal reading and
> the exact wording that creates each gap.

**Pragmatist agent instruction:**
> Read these requirements as an experienced engineer would, inferring
> reasonable intent from context, domain convention, and what similar
> systems do. Output your best-guess interpretation of what the author
> probably meant, for the same wording the literalist agent was given.

Diff the two outputs. Every place they disagree is an **explicit
ambiguity** — not a bug in either agent, a genuine gap the requirements
left open. Classify each:

```
COSMETIC MINOR FUNCTIONAL ARCHITECTURAL SAFETY_CRITICAL
```

`ARCHITECTURAL` and `SAFETY_CRITICAL` ambiguities are blocking findings
(see SKILL.md hard failure states) — do not proceed to implementation
planning with one unresolved.

## Rule extraction

Convert vague behavioral statements into explicit conditionals before
trusting them. Example:

> Vague: "Users can generally edit their bookings."
>
> Explicit:
> ```
> IF booking.owner == currentUser
> AND booking.status ∈ {draft, confirmed}
> AND now < booking.cutoff
> THEN editing = permitted
> ELSE editing = denied
> ```

Once multiple rules are extracted, run a **collision check**: do any two
rules, both individually correct, produce contradictory outcomes for the
same state? This is a distinct pass from the contradiction hunt in
`verification.md` — this one operates on derived rules, not on raw
source disagreements.

## Negative requirements

Capture `MUST NOT / SHOULD NEVER / CANNOT` statements explicitly and
track them alongside positive requirements in the coverage matrix.
These are the ones most often silently dropped between spec and
implementation, precisely because nothing needs to be *built* to satisfy
them, so nothing forces them into a task list.

## Completeness engine & negative space

Build a completion matrix appropriate to what's being audited. For an
application:

```
FEATURE SCREEN STATE SETTING ROLE PERMISSION API DATA ERROR
EMPTY_STATE LOADING_STATE OFFLINE_STATE ACCESSIBILITY TEST
```

Then ask the core NEURODIVERSITY question the completeness engine exists to
answer: **what should exist here but doesn't?** Concretely check for:
missing empty/loading/offline states, no logout route, no rollback, no
migration, no audit log, no permission check, no timeout, no delete
workflow.

**Symmetry analysis**: where the system has a paired operation, check
the counterpart actually exists and behaves consistently:

```
CREATE ↔ DELETE     ADD ↔ REMOVE       ENABLE ↔ DISABLE
SUBSCRIBE ↔ UNSUBSCRIBE   IMPORT ↔ EXPORT   LOCK ↔ UNLOCK
```

A missing counterpart is a finding, not automatically a bug — some
asymmetries are intentional (e.g. no "un-send" for an email). Each one
still needs an explicit explanation before being dismissed; an
asymmetry with no documented reason is exactly the kind of thing this
pass exists to surface.

## Requirement coverage matrix

Track every requirement (positive and negative) through to
implementation and test:

```
REQ | IMPLEMENTATION | TEST | STATUS
```

No requirement should disappear silently between the analysis phase and
the build phase — if implementation began and a requirement has no row,
that's a hard-failure-state finding (`CORE REQUIREMENT UNMAPPED`), not a
footnote.
