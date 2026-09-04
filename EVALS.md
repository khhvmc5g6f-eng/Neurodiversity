# EVALS

Raw results from the seeded-defect benchmark suite in `bench/`. Numbers
here are computed mechanically (`bench/harness/score.js`, regex
ID-matching against a planted-defect ground truth, no LLM judge) and
are published as-is, including the parts that don't flatter NEURODIVERSITY —
see "no cherry-picking" in `AGENTS.md` and `CONTRIBUTING.md`. If you
re-run `node bench/harness/score.js`, you should get exactly these
numbers back from the committed `bench/results/*.json`.

## Methodology

12 fixtures: 10 bug-finding fixtures (one per category from the source
spec's stress-test list, §105/§145 — concurrency, data, API, security,
requirements, performance, integration, documentation, configuration,
architecture) plus 2 open-ended architecture-design fixtures added in a
second pass specifically to test the combined condition on the problem
type it's actually built for ("design the best X" rather than "find
what's wrong with X"). Each fixture is a short, self-contained scenario
(`bench/fixtures/*/problem.md`) with a `ground-truth.json` answer key
(not shown to the agents): 3 planted defects per bug-finding fixture, 6
required design considerations per design fixture. Each ground-truth
entry gives a set of regex patterns, any of which counts as a hit.

Four conditions were run per fixture, 48 runs total:

- **baseline** — plain review / plain proposal, no method, no framing.
- **adhd** — one agent following ADHD's divergent→convergent loop
  (multiple vantage points, then score/cluster/converge).
- **neurodiversity** — one agent following NEURODIVERSITY's depth-first process
  (map → rank load-bearing questions → drive the top one to a
  conclusion with evidence → check contradictions/requirements/
  concurrency/units → falsify each candidate before keeping it).
- **adhd-neurodiversity** — one agent running both stages in sequence: a
  divergent pass, then a depth-first verification pass over its own
  candidates.

**Known simplification, stated plainly:** each condition ran as *one*
agent's own single-turn reasoning following the written process, not
the true multi-agent isolated-context fan-out either skill's real
`SKILL.md` specifies (separate Agent calls per frame/profile with
context isolation). This measures whether the *reasoning strategy*
changes output quality, not the added value of the isolation
infrastructure itself — a real gap between what's benchmarked here and
what the skills do end-to-end. One early ADHD run did spawn real
isolated sub-agents on its own initiative and got stuck in a
coordination loop trying to relay their outputs back to itself; that
run's raw sub-agent outputs were kept and converged manually (see
`bench/results/data-nullability-mismatch/adhd.json`) rather than
discarded, and the incident itself is left in this repo's session
record rather than smoothed over.

**Scoring**: a defect/consideration counts as a true positive (TP) if
any of its ground-truth regex patterns matches (case-insensitive
substring) any reported finding for that run. Unmatched ones are false
negatives (FN). Reported findings that matched none of a fixture's
ground-truth entries count as false positives (FP) — a coarse proxy: a
finding can be a genuinely good, real observation that simply wasn't
one of the ones we planted/required, and this scoring has no way to
distinguish "wrong" from "correct but not what we were counting."

## Changelog

- **v1** (initial): 10 bug-finding fixtures, 40 runs.
- **v1.1** (scorer correction, same raw data): manually inspecting near
  misses found 2 ground-truth entries (`REQ-1`, `REQ-2` in
  `requirements-missing-refund-policy`; `ARCH-3` in
  `architecture-soft-delete-inconsistency`) whose regex patterns were
  too narrow to match findings that were, on reading, clearly on-target
  (e.g. "the spec never says whether, or under what conditions, a
  refund should occur" is obviously REQ-1+REQ-2, but matched none of
  the original patterns). These were widened *before* adding any new
  fixtures or re-running any agent — the same frozen `bench/results/*`
  findings were rescored, nothing was regenerated. `summary.v1-original-patterns.json`
  is kept in `bench/results/` alongside the current `summary.json` so
  the before/after is auditable, not just asserted.
- **v2** (this version): added the 2 design fixtures, 8 more runs, 48
  total.

## Reading the `adhd`/`adhd→neurodiversity` conditions after the Phase D merge (2026-09-04)

Every result below predates NEURODIVERSITY absorbing its own
divergent-ideation phase (`references/divergence.md`) — at the time
these runs were generated, `neurodiversity` meant depth-first phases
only, and `adhd→neurodiversity` meant two separate skills handed off to
each other. That distinction no longer exists in the shipped skill:
`neurodiversity` alone now runs Phase D internally whenever Routing
calls for it, which is conceptually closer to what `adhd→neurodiversity`
used to require two skills to do. The numbers below are kept as an
honest historical record of the two-skill-orchestration measurement,
not silently reinterpreted — but they should not be read as "solo
NEURODIVERSITY now scores 0.583," because solo NEURODIVERSITY no longer means
what it meant when this run was generated. A fresh benchmark run under
the merged architecture is the correct next step before any claim about
whether the merge preserved, improved on, or fell short of the old
combined score.

## Aggregate results (v2: 48 runs, 12 fixtures × 4 conditions, 42 ground-truth entries total — pre-Phase-D-merge, see note above)

| Condition | TP | FP | FN | Precision | Recall | F1 | Total findings reported |
|---|---|---|---|---|---|---|---|
| baseline | 38 | 78 | 4 | 0.328 | 0.905 | 0.481 | 116 |
| adhd | 36 | 54 | 6 | 0.400 | 0.857 | 0.545 | 90 |
| neurodiversity | 35 | 43 | 7 | **0.449** | 0.833 | 0.583 | 78 |
| adhd→neurodiversity | 36 | 44 | 6 | 0.450 | 0.857 | **0.590** | 80 |

For comparison, the original 10-fixture / pre-widening numbers
(`bench/results/summary.v1-original-patterns.json`):

| Condition | TP | FP | FN | Precision | Recall | F1 |
|---|---|---|---|---|---|---|
| baseline | 26 | 59 | 4 | 0.306 | 0.867 | 0.452 |
| adhd | 24 | 36 | 6 | 0.400 | 0.800 | 0.533 |
| neurodiversity | 22 | 26 | 8 | 0.458 | 0.733 | 0.564 |
| adhd→neurodiversity | 24 | 31 | 6 | 0.436 | 0.800 | 0.565 |

The ranking by F1 is stable across the correction (baseline < adhd <
neurodiversity ≈ adhd→neurodiversity in both) — the scorer fix moved absolute
numbers up for everyone roughly proportionally, it didn't flip a
result. That's the check that mattered before trusting the fix.

## What this actually shows

**Baseline has the highest recall, not NEURODIVERSITY.** This directly
contradicts one specific expectation in the source spec (§112: "NEURODIVERSITY
higher on defect recall"). The mechanism is visible in the raw counts:
baseline reported 116 findings total across 12 fixtures (a shotgun
approach — plain review/proposal with no filtering step), NEURODIVERSITY
reported 78. With a fixed number of real ground-truth entries to hit, a
strategy that reports everything plausible-sounding will accidentally
clip more of them by volume alone, at a steep precision cost (0.328 vs
0.449). NEURODIVERSITY's falsification step (SKILL.md Phase 4 / the benchmark
prompt's step 5) is explicitly designed to drop candidates that don't
survive scrutiny — that's working as intended, and it trades some
recall for precision.

**NEURODIVERSITY wins decisively on precision.** A reviewer or downstream
agent consuming these findings has to sift through fewer wrong ones per
real one (0.449 true positives per reported finding vs baseline's
0.328) — the concern NEURODIVERSITY's own architecture is explicitly built to
address (§141: don't dump unreadable output; hard-failure-states around
unverified claims).

**The combined ADHD→NEURODIVERSITY condition has the best overall F1 (0.590),
and the gap is not just noise — it's concentrated exactly where the
architecture predicts it should be.** Split by fixture type:

| Fixture type | Condition | TP | FP | FN | Precision | Recall | F1 |
|---|---|---|---|---|---|---|---|
| 10 bug-finding fixtures | baseline | 28 | 57 | 2 | 0.329 | 0.933 | 0.487 |
| 10 bug-finding fixtures | adhd | 26 | 35 | 4 | 0.426 | 0.867 | 0.571 |
| 10 bug-finding fixtures | neurodiversity | 25 | 24 | 5 | 0.510 | 0.833 | 0.633 |
| 10 bug-finding fixtures | adhd→neurodiversity | 25 | 30 | 5 | 0.455 | 0.833 | 0.588 |
| 2 design fixtures | baseline | 10 | 21 | 2 | 0.323 | 0.833 | 0.465 |
| 2 design fixtures | adhd | 10 | 19 | 2 | 0.345 | 0.833 | 0.488 |
| 2 design fixtures | neurodiversity | 10 | 19 | 2 | 0.345 | 0.833 | 0.488 |
| 2 design fixtures | adhd→neurodiversity | 11 | 14 | 1 | **0.440** | **0.917** | **0.595** |

On the 10 bug-finding fixtures, **NEURODIVERSITY alone is the best condition**
(F1 0.633) and the combined condition is actually a bit worse than
NEURODIVERSITY alone (0.588) — divergence before depth adds noise (more FP)
without adding recall on a problem type that's already well-served by
a single ranked, falsified investigation. On the 2 design fixtures,
**the combined condition wins outright on every metric** — highest
precision, highest recall, highest F1, clearly ahead of the other three
which are statistically indistinguishable from each other (0.465-0.488
F1). This is exactly the shape the source spec's routing table predicts
(`skills/neurodiversity/references/adhd-bridge.md`: "design the best
architecture for X" → ADHD → NEURODIVERSITY) — and it's the first result in
this file that isn't just "NEURODIVERSITY wins," which is itself worth
noting: the benchmark is capable of showing ADHD/combined winning when
the problem actually calls for it, not just confirming NEURODIVERSITY by
construction.

**Known limitation of mechanical regex scoring, worth stating plainly:**
even after the v1.1 correction described above, the scorer is still
strict substring/regex matching, not semantic matching. It will keep
under-counting some correct findings that use unanticipated phrasing,
which means every recall/precision number in this file is closer to a
floor than a precise measurement. We fixed the two clearest,
highest-confidence cases (patterns missed by findings from *every*
condition, not just one) and stopped there deliberately — going further
starts to trade "fixing a bug" for "tuning the test," which is exactly
what the no-cherry-picking rule exists to prevent.

## Per-fixture breakdown

| Fixture | Condition | TP | FP | FN | Reported |
|---|---|---|---|---|---|
| api-contract-mismatch | baseline | 3 | 3 | 0 | 6 |
| api-contract-mismatch | adhd | 2 | 3 | 1 | 5 |
| api-contract-mismatch | neurodiversity | 2 | 0 | 1 | 2 |
| api-contract-mismatch | adhd-neurodiversity | 2 | 1 | 1 | 3 |
| architecture-soft-delete-inconsistency | baseline | 3 | 4 | 0 | 7 |
| architecture-soft-delete-inconsistency | adhd | 2 | 4 | 1 | 6 |
| architecture-soft-delete-inconsistency | neurodiversity | 3 | 3 | 0 | 5 |
| architecture-soft-delete-inconsistency | adhd-neurodiversity | 2 | 5 | 1 | 7 |
| concurrency-token-refresh | baseline | 3 | 7 | 0 | 10 |
| concurrency-token-refresh | adhd | 3 | 2 | 0 | 4 |
| concurrency-token-refresh | neurodiversity | 3 | 2 | 0 | 3 |
| concurrency-token-refresh | adhd-neurodiversity | 3 | 1 | 0 | 3 |
| configuration-stale-override | baseline | 3 | 6 | 0 | 9 |
| configuration-stale-override | adhd | 3 | 4 | 0 | 7 |
| configuration-stale-override | neurodiversity | 1 | 4 | 2 | 5 |
| configuration-stale-override | adhd-neurodiversity | 3 | 3 | 0 | 6 |
| data-nullability-mismatch | baseline | 3 | 4 | 0 | 6 |
| data-nullability-mismatch | adhd | 3 | 3 | 0 | 6 |
| data-nullability-mismatch | neurodiversity | 3 | 2 | 0 | 4 |
| data-nullability-mismatch | adhd-neurodiversity | 3 | 2 | 0 | 4 |
| design-multiregion-collab-editing | baseline | 4 | 12 | 2 | 15 |
| design-multiregion-collab-editing | adhd | 4 | 10 | 2 | 14 |
| design-multiregion-collab-editing | neurodiversity | 4 | 11 | 2 | 13 |
| design-multiregion-collab-editing | adhd-neurodiversity | 5 | 7 | 1 | 11 |
| design-order-fulfillment-queue | baseline | 6 | 9 | 0 | 14 |
| design-order-fulfillment-queue | adhd | 6 | 9 | 0 | 13 |
| design-order-fulfillment-queue | neurodiversity | 6 | 8 | 0 | 13 |
| design-order-fulfillment-queue | adhd-neurodiversity | 6 | 7 | 0 | 11 |
| documentation-misleading-ratelimit | baseline | 2 | 4 | 1 | 6 |
| documentation-misleading-ratelimit | adhd | 2 | 3 | 1 | 5 |
| documentation-misleading-ratelimit | neurodiversity | 2 | 2 | 1 | 4 |
| documentation-misleading-ratelimit | adhd-neurodiversity | 2 | 3 | 1 | 5 |
| integration-webhook-version-mismatch | baseline | 2 | 5 | 1 | 6 |
| integration-webhook-version-mismatch | adhd | 2 | 5 | 1 | 7 |
| integration-webhook-version-mismatch | neurodiversity | 3 | 3 | 0 | 5 |
| integration-webhook-version-mismatch | adhd-neurodiversity | 2 | 5 | 1 | 7 |
| performance-cascade-dashboard | baseline | 3 | 9 | 0 | 12 |
| performance-cascade-dashboard | adhd | 3 | 4 | 0 | 7 |
| performance-cascade-dashboard | neurodiversity | 2 | 4 | 1 | 6 |
| performance-cascade-dashboard | adhd-neurodiversity | 3 | 3 | 0 | 6 |
| requirements-missing-refund-policy | baseline | 3 | 8 | 0 | 11 |
| requirements-missing-refund-policy | adhd | 3 | 2 | 0 | 4 |
| requirements-missing-refund-policy | neurodiversity | 3 | 2 | 0 | 4 |
| requirements-missing-refund-policy | adhd-neurodiversity | 2 | 5 | 1 | 7 |
| security-trust-boundary | baseline | 3 | 7 | 0 | 10 |
| security-trust-boundary | adhd | 3 | 5 | 0 | 8 |
| security-trust-boundary | neurodiversity | 3 | 2 | 0 | 5 |
| security-trust-boundary | adhd-neurodiversity | 3 | 2 | 0 | 5 |

`concurrency-token-refresh`, `security-trust-boundary`, and
`api-contract-mismatch` show the cleanest NEURODIVERSITY win: equal or
near-equal recall to baseline at a fraction of the false-positive
volume. `configuration-stale-override` is NEURODIVERSITY's single worst
result (tp=1, fn=2) — its single-turn falsification pass over-pruned on
that fixture specifically; worth a closer look if extending this suite,
since it's the one case where NEURODIVERSITY clearly underperformed baseline
on recall for no visible good reason (unlike the aggregate recall gap,
which has a clear volume-tradeoff explanation).

## Deferred from the source spec

Not run in this pass, honestly flagged rather than silently skipped
(see `AGENTS.md` → Deferred scope):

- **A benchmark run under the post-Phase-D-merge architecture** (see the
  note above the Aggregate results table) — every number in this file
  measures the pre-merge two-skill design. Re-running the 2 design
  fixtures (and ideally a few of the 10 bug-finding ones, to check
  Phase D isn't spuriously triggered on non-ideation asks) against the
  merged skill, as a new `neurodiversity` condition, is the right next
  step before making any comparative claim about the merge.
- The full 10×10 category-by-scenario stress matrix (§145) — this pass
  used 1 bug-finding fixture per category (10 total) plus 2 design
  fixtures, not 10 per category.
- Mutation testing and static-analysis tool integration (§95-96) is now
  specified concretely in the skill itself
  (`skills/neurodiversity/references/tooling.md` — per-ecosystem dispatch
  table for Stryker/PIT/mutmut/cargo-mutants, Semgrep MCP preference,
  Schemathesis/oasdiff for contract verification), but **the benchmark
  fixtures don't exercise it** — they're small pasted-code scenarios
  with no real toolchain to invoke, not full repos with a package
  manifest and test suite.
- A true multi-agent isolated-context run of each condition (see
  Methodology above) — what's measured here is the reasoning strategy,
  not the full isolation-infrastructure benefit.
- A standalone TS/CLI package benchmark run outside Claude Code.
- Further semantic-scoring work beyond the v1.1 correction (see "Known
  limitation" above) — an LLM-judge supplemental pass, used only to
  *flag* candidate near-misses for human review per the source spec's
  own "LLM judges only supplement" principle (§114), would be the
  correct next step rather than further hand-widening of regexes.
- **Token/time cost measurement (§106, §115: "measure findings per
  token, per second, per agent call")** — this was a genuine silent
  gap, not previously listed here despite this file's own
  no-silent-gaps principle. Raw per-run token/duration data existed at
  the time every run in this suite was generated but was never
  captured into the results format or reported. `bench/harness/score.js`
  now supports optional `tokensUsed`/`durationMs` fields per result
  file and computes `findingsPerToken`/`findingsPerSecond` when a
  condition's runs all report them — but every run currently checked
  into `bench/results/` predates this field and has neither. Backfilling
  plausible-looking numbers from memory would violate this project's own
  no-fabrication standard, so the aggregate table above still has no
  real cost-efficiency figures. This stays deferred until a future
  benchmark run captures the data live, not silently, this time.

## Reproducing

```bash
node bench/harness/score.js
```

Recomputes `bench/results/summary.json` from the checked-in per-run
`bench/results/<fixture>/<condition>.json` files and prints the
aggregate table. CI (`.github/workflows/ci.yml`) runs this in
`--verify-only` mode on every push to catch scoring drift.
