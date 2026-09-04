# Temporal, concurrency, and failure-propagation reasoning

## Temporal system model & event causality

For any process involving async behavior, build a chronological model
before reasoning about root cause:

```
EVENT A --causes--> EVENT B --eventually triggers--> EVENT C
```

Mark edges that assume serial execution but could, under load or retry,
happen out of order or concurrently. Race-sensitive ordering is usually
invisible in a static read of the code — it only shows up once you lay
events on a timeline and ask "what if B and C's triggers fire in the
other order, or simultaneously?"

## Concurrency panel

Dedicated pass, one isolated agent, asking specifically:

- What can happen simultaneously that the code implicitly assumes
  happens one at a time?
- Which state updates are actually atomic, and which only *look*
  atomic because the non-atomic window is usually short?
- Where can duplicate requests arise (retries, double-clicks, at-least-
  once delivery), and what happens if the same operation runs twice?

**Idempotency**: for every externally repeatable operation, what happens
if it executes twice? **Retry analysis**: for every retryable operation,
track `retryable? / max_retries / backoff / idempotent? / side_effect?`
— an operation that's retried but not idempotent and has a side effect
is a near-guaranteed bug, not a theoretical one.

**Interruption & resumability**: what happens if a long-running workflow
is interrupted halfway (partial upload, interrupted migration,
abandoned checkout, network disconnect)? Can it resume safely, or does
it need to detect and clean up a half-done state? This is the technical
analogue of the monotropic-switching-cost metaphor — treat it literally,
not just as inspiration.

## Failure propagation & root-cause backtracking

Model failures in both directions, and use whichever direction the
available evidence supports:

```
Forward:  ROOT_FAILURE → SECONDARY_EFFECT → TERTIARY_EFFECT → USER_SYMPTOM
Backward: USER_SYMPTOM ← IMMEDIATE_FAILURE ← UPSTREAM_FAILURE ← ROOT_CONDITION
```

**Multi-cause model.** Don't force a single root cause when the evidence
actually supports an interaction between causes (e.g. a race condition
that only manifests under a specific cache-eviction pattern under a
specific load shape — three "causes," none of which is individually
sufficient). Forcing a single-cause narrative here produces a fix that
addresses one contributing factor and leaves the bug intact.

## Baseline freeze & root cause before patch

Before fixing a bug: capture the current failing behavior and a failing
test that reproduces it. Investigate root cause to reasonable confidence
before patching — a patch applied to a symptom without a root-cause
finding is itself a hard-failure-state condition (`ROOT CAUSE UNKNOWN`)
per SKILL.md, even if the patch happens to make the symptom go away.

## Dynamic verification beats static reading

Where tooling allows: run the application, execute the tests, actually
reproduce the bug, inspect real logs. Repository reading alone is
evidence about what the code *says*, not what it *does* — treat a
finding based only on static reading as lower-confidence than one
confirmed by execution, and say so explicitly in the confidence
calibration rather than letting both look equally certain.
