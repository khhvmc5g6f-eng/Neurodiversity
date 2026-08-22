# Simplicity taxonomy (Simplicity Reviewer)

## Why this exists, and why it runs last

Simplicity Reviewer was described only as "now that we understand
everything important, what can be removed?" — true as far as it goes,
but with no categories to check against, same gap as the other lenses.
Grounded in the standard, long-established code-smell catalogue
(Fowler's *Refactoring*), not invented fresh. Lower severity than the
other taxonomies deliberately: this is a quality pass, not a
defect-finding one, and it must run **only after** synthesis, never
before — simplifying before understanding hides complexity instead of
removing it.

## The taxonomy: simplification categories

Walk these against the system now that Phase 0–4 have actually built a
model of it — not as a first pass, and not as a substitute for
understanding what a piece of complexity is actually for before
recommending its removal:

| Category | The question, asked literally |
|---|---|
| **Speculative generality** | Is this abstraction (interface, config option, plugin point) actually used by more than one caller, or was it built for a future that hasn't arrived? |
| **Duplicate logic** | Does the same rule/check/transformation appear in more than one place, able to drift out of sync? |
| **Unnecessary indirection** | Does a value pass through a chain of wrapper functions/objects that don't transform it, just relay it? |
| **Dead code** | Is there a branch, function, or flag that's unreachable or never actually selected given real inputs? |
| **Over-parameterization** | Does a function accept parameters that every real caller passes the same value for? |
| **Premature configurability** | Is something made configurable (an env var, a feature flag, a strategy pattern) that has exactly one value in practice? |

## Hypothesis, then evidence

Same discipline: each candidate simplification is a hypothesis until
checked — **confirmed** (traced every call site/usage and it really is
unused/duplicated/dead), **ruled out** (a real second caller or a real
planned near-term use was found), or **unresolved** (can't confirm
usage from what's in scope, e.g. an exported public API whose external
callers aren't visible).

## Scope discipline

This lens looks for what to *remove*, not what to add — don't let it
drift into proposing new abstractions or "cleaner" reorganizations,
which is a different kind of work with its own risk/reward the skill
hasn't verified. And never recommend removing something whose usage is
genuinely unresolved — "confirmed unused" and "couldn't find a caller
in what I looked at" are different confidence levels, and only the
former belongs in a recommendation.
