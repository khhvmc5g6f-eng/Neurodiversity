# EVALS

Raw results from the seeded-defect benchmark suite in `bench/`. Numbers
here are computed mechanically (`bench/harness/score.js`, regex
ID-matching against a planted-defect ground truth, no LLM judge) and
are published as-is, including the parts that don't flatter AUTISTIC —
see "no cherry-picking" in `AGENTS.md` and `CONTRIBUTING.md`. If you
re-run `node bench/harness/score.js`, you should get exactly these
numbers back from the committed `bench/results/*.json`.

## Methodology

10 fixtures, one per category from the source spec's stress-test list
(§105/§145): concurrency, data, API, security, requirements,
performance, integration, documentation, configuration, architecture.
Each fixture is a short, self-contained scenario (`bench/fixtures/*/problem.md`)
with 3 planted defects and a `ground-truth.json` answer key (not shown
to the agents) giving each defect a set of regex patterns any of which
counts as a hit.

Four conditions were run per fixture, 40 runs total:

- **baseline** — plain review, no method, no framing.
- **adhd** — one agent following ADHD's divergent→convergent loop
  (multiple vantage points, then score/cluster/converge) against "what
  could be wrong with this system."
- **autistic** — one agent following AUTISTIC's depth-first process
  (map → rank load-bearing questions → drive the top one to a
  conclusion with evidence → check contradictions/requirements/
  concurrency/units → falsify each candidate before keeping it).
- **adhd-autistic** — one agent running both stages in sequence: a
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

**Scoring**: a defect counts as a true positive (TP) if any of its
ground-truth regex patterns matches (case-insensitive substring) any
reported finding for that run. Unmatched defects are false negatives
(FN). Reported findings that matched no defect for that fixture count
as false positives (FP) — a coarse proxy: a finding can be a genuinely
good, real observation that simply wasn't one of the three defects we
planted, and this scoring has no way to distinguish "wrong" from
"correct but not what we were counting."

## Aggregate results (40 runs, 10 fixtures × 4 conditions, 30 planted defects total)

| Condition | TP | FP | FN | Precision | Recall | F1 | Total findings reported |
|---|---|---|---|---|---|---|---|
| baseline | 26 | 59 | 4 | 0.306 | 0.867 | 0.452 | 83 |
| adhd | 24 | 36 | 6 | 0.400 | 0.800 | 0.533 | 59 |
| autistic | 22 | 26 | 8 | **0.458** | 0.733 | 0.564 | 43 |
| adhd→autistic | 24 | 31 | 6 | 0.436 | 0.800 | **0.565** | 53 |

## What this actually shows

**Baseline has the highest recall, not AUTISTIC.** This directly
contradicts one specific expectation in the source spec (§112: "AUTISTIC
higher on defect recall"). The mechanism is visible in the raw counts:
baseline reported 83 findings total across 10 fixtures (a shotgun
approach — plain review with no filtering step), AUTISTIC reported 43.
With only 30 real planted defects to find, a strategy that reports
everything plausible-sounding will accidentally clip more of them by
volume alone, at a steep precision cost (0.306 vs 0.458). AUTISTIC's
falsification step (SKILL.md Phase 4 / the benchmark prompt's step 5)
is explicitly designed to drop candidates that don't survive scrutiny —
that's working as intended, and it trades some recall for precision.

**AUTISTIC and the combined condition win decisively on precision and
narrowly on F1.** Precision is the metric most directly connected to
the concern AUTISTIC's own architecture is built to address (§141,
"do not dump unreadable output" / hard-failure-states around unverified
claims) — a reviewer or downstream agent consuming these findings
has to sift through fewer wrong ones per real one (0.46 vs 0.31 true
positives per reported finding).

**The combined ADHD→AUTISTIC condition has the best F1 (0.565) but
barely beats AUTISTIC alone (0.564)** on this fixture set, and it does
so with more findings reported (53 vs 43) and lower precision. On these
bug-finding-shaped fixtures specifically, divergence before depth
didn't clearly outperform depth alone — plausible given these fixtures
are single, compact scenarios rather than the open architecture-choice
problems ADHD is built for (see the routing table in
`skills/autistic/references/adhd-bridge.md`); a fixture set built around
"design the best architecture for X"-shaped problems would likely show
a larger combined-condition advantage and is a natural next benchmark
to add.

**Known limitation of mechanical regex scoring, demonstrated:** for
`requirements-missing-refund-policy`, the adhd→autistic run's first
finding states in plain language that the requirements doc "contains
zero mention of refunds, payment, or money," which is a correct,
on-target match for ground-truth defect REQ-1 — but none of REQ-1's
regex patterns (`refund policy.*unspecified`, `no refund.*requirement`,
etc.) happen to match that exact phrasing, so it scored as a false
negative. This is a scorer-strictness artifact, not an agent miss, and
it affects all four conditions' recall roughly equally (regex patterns
were fixed before any run, at fixture-authoring time) rather than
favoring one condition — but it means every recall number in this table
is a floor, not a precise measurement. We did not loosen the patterns
after seeing this, per the no-cherry-picking rule; a v2 fixture pass
should instead widen `mustMatchAny` coverage per defect *before*
re-running.

## Per-fixture breakdown

| Fixture | Condition | TP | FP | FN | Reported |
|---|---|---|---|---|---|
| api-contract-mismatch | baseline | 3 | 3 | 0 | 6 |
| api-contract-mismatch | adhd | 2 | 3 | 1 | 5 |
| api-contract-mismatch | autistic | 2 | 0 | 1 | 2 |
| api-contract-mismatch | adhd-autistic | 2 | 1 | 1 | 3 |
| architecture-soft-delete-inconsistency | baseline | 2 | 5 | 1 | 7 |
| architecture-soft-delete-inconsistency | adhd | 2 | 4 | 1 | 6 |
| architecture-soft-delete-inconsistency | autistic | 2 | 4 | 1 | 5 |
| architecture-soft-delete-inconsistency | adhd-autistic | 2 | 5 | 1 | 7 |
| concurrency-token-refresh | baseline | 3 | 7 | 0 | 10 |
| concurrency-token-refresh | adhd | 3 | 2 | 0 | 4 |
| concurrency-token-refresh | autistic | 3 | 2 | 0 | 3 |
| concurrency-token-refresh | adhd-autistic | 3 | 1 | 0 | 3 |
| configuration-stale-override | baseline | 3 | 6 | 0 | 9 |
| configuration-stale-override | adhd | 3 | 4 | 0 | 7 |
| configuration-stale-override | autistic | 1 | 4 | 2 | 5 |
| configuration-stale-override | adhd-autistic | 3 | 3 | 0 | 6 |
| data-nullability-mismatch | baseline | 3 | 4 | 0 | 6 |
| data-nullability-mismatch | adhd | 3 | 3 | 0 | 6 |
| data-nullability-mismatch | autistic | 3 | 2 | 0 | 4 |
| data-nullability-mismatch | adhd-autistic | 3 | 2 | 0 | 4 |
| documentation-misleading-ratelimit | baseline | 2 | 4 | 1 | 6 |
| documentation-misleading-ratelimit | adhd | 2 | 3 | 1 | 5 |
| documentation-misleading-ratelimit | autistic | 2 | 2 | 1 | 4 |
| documentation-misleading-ratelimit | adhd-autistic | 2 | 3 | 1 | 5 |
| integration-webhook-version-mismatch | baseline | 2 | 5 | 1 | 6 |
| integration-webhook-version-mismatch | adhd | 2 | 5 | 1 | 7 |
| integration-webhook-version-mismatch | autistic | 3 | 3 | 0 | 5 |
| integration-webhook-version-mismatch | adhd-autistic | 2 | 5 | 1 | 7 |
| performance-cascade-dashboard | baseline | 3 | 9 | 0 | 12 |
| performance-cascade-dashboard | adhd | 3 | 4 | 0 | 7 |
| performance-cascade-dashboard | autistic | 2 | 4 | 1 | 6 |
| performance-cascade-dashboard | adhd-autistic | 3 | 3 | 0 | 6 |
| requirements-missing-refund-policy | baseline | 2 | 9 | 1 | 11 |
| requirements-missing-refund-policy | adhd | 1 | 3 | 2 | 4 |
| requirements-missing-refund-policy | autistic | 1 | 3 | 2 | 4 |
| requirements-missing-refund-policy | adhd-autistic | 1 | 6 | 2 | 7 |
| security-trust-boundary | baseline | 3 | 7 | 0 | 10 |
| security-trust-boundary | adhd | 3 | 5 | 0 | 8 |
| security-trust-boundary | autistic | 3 | 2 | 0 | 5 |
| security-trust-boundary | adhd-autistic | 3 | 2 | 0 | 5 |

Notice `requirements-missing-refund-policy` is the weak point across
every condition (TP never exceeds 2/3) — see the scoring-limitation note
above; a chunk of that is scorer strictness on REQ-1's phrasing, not a
real capability gap. `concurrency-token-refresh` and
`security-trust-boundary` show the cleanest AUTISTIC/combined win:
identical recall to baseline (all 3 defects found) at a fraction of the
false-positive volume (1-2 FP vs 7 FP for baseline).

## Deferred from the source spec

Not run in this pass, honestly flagged rather than silently skipped
(see `AGENTS.md` → Deferred scope):

- The full 10×10 category-by-scenario stress matrix (§145) — this pass
  used 1 fixture per category, 10 total, not 10 per category.
- Mutation testing, static analysis tool integration (§95-96).
- A true multi-agent isolated-context run of each condition (see
  Methodology above) — what's measured here is the reasoning strategy,
  not the full isolation-infrastructure benefit.
- A standalone TS/CLI package benchmark run outside Claude Code.
- ADHD-shaped ("design the best architecture") fixtures to test the
  combined condition on the problem type it's actually built for.

## Reproducing

```bash
node bench/harness/score.js
```

Recomputes `bench/results/summary.json` from the checked-in per-run
`bench/results/<fixture>/<condition>.json` files and prints the
aggregate table. CI (`.github/workflows/ci.yml`) runs this in
`--verify-only` mode on every push to catch scoring drift.
