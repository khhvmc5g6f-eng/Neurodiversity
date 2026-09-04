# Failure mode taxonomy (Failure Analyst)

## Why this exists

`debugging.md`'s failure propagation section has real structure for
*tracing* a failure once one is known (forward propagation, backward
root-cause search, multi-cause modeling) — but nothing for
*generating* candidate failure modes from scratch, the same gap STRIDE
closed for security. Failure Analyst is the primary lens for "production
bug, no known cause" (`frames/profile-selection.md`), a very common way
this skill gets invoked — a vague method here is a vague method exactly
where it costs the most.

## Grounded in FMEA, adapted for software honestly

This borrows Failure Mode and Effects Analysis (FMEA), the standard
engineering technique (formalized industry-wide, e.g. the AIAG-VDA
handbook) for systematically enumerating how a component can fail, how
severe each failure is, and how likely it'd go undetected. What's
adapted here is the *method* — enumerate failure modes per component,
score each — not a literal import of an automotive/hardware failure
catalogue, which doesn't transfer to software. The category list below
is software-specific; the scoring structure (severity × occurrence ×
detectability) is the genuine FMEA borrowing.

## The taxonomy: software failure modes

For every node Phase 0 scored as load-bearing, walk each mode
systematically:

| Failure mode | The question, asked literally |
|---|---|
| **Crash / hang** | Can this component die or block forever, and if it does, what happens to callers waiting on it? |
| **Timeout / slow response** | Can this degrade to unacceptably slow without actually failing, and does anything notice or bound that? |
| **Resource exhaustion** | Can this run out of memory, connections, disk, threads, or file handles under realistic load, and what happens at that point? |
| **Silent data corruption** | Can this produce a *wrong* result with no error signal at all — the most dangerous mode, because nothing prompts anyone to look? |
| **Partial failure** | If this performs multiple steps, can it complete some and not others, and is the resulting inconsistent state ever detected or reconciled? |
| **Cascading failure** | Does this component's failure propagate to force failures in things that depend on it, rather than degrading in isolation? |
| **Dependency failure** | If something this component depends on fails, is that handled explicitly, or does it just fail the same way the dependency did? |
| **Configuration / data drift** | Can this fail not because the code is wrong, but because config or data it relies on silently became stale or inconsistent? |

## Scoring: severity × occurrence × detectability

For each confirmed failure mode, score three dimensions (roughly 1–5,
relative ranking is enough — same triage-not-precision principle as
`architecture.md`'s load-bearing score):

- **Severity** — how bad is the outcome if this happens (data loss,
  wrong financial result, and silent corruption score high; a slow
  response with a clear error scores low)?
- **Occurrence** — how likely is this to actually happen, given real
  usage patterns and the evidence found (not a guess — cite what makes
  it likely or unlikely)?
- **Detectability** — how likely would this be caught *before* it
  causes user-visible harm (existing monitoring, tests, or review vs.
  nothing)? Score inversely: low detectability (nothing would catch
  it) is the dangerous end, same as classic FMEA's RPN convention.

`RPN (risk priority number) ≈ severity × occurrence × detectability⁻¹
direction` — the ranking signal for which failure modes matter most,
not a precise metric to defend to two decimal places.

## Hypothesis, then evidence

Same three-way discipline as every other systematic pass in this
skill:

- **Confirmed** — the failure mode is real, with a concrete path/
  evidence (no timeout on an external call, no reconciliation for a
  multi-step write, a dependency call with no error handling).
- **Ruled out** — a concrete mechanism prevents it (a real transaction,
  a real circuit breaker, a real idempotency check).
- **Unresolved** — plausible but not confirmable from what's in scope.

## Scope discipline

Walk all eight modes against the single highest load-bearing node for
a `--standard` pass; walk every load-bearing node for `--forensic` or
an explicit "why does this happen" production-bug investigation. Not
every mode applies to every node — a pure computation with no I/O has
no dependency-failure mode to check; skip what plainly doesn't apply
rather than padding output with cleared non-questions.
