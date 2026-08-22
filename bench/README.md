# bench/

Seeded-defect benchmark suite comparing BASELINE / ADHD / AUTISTIC /
ADHD→AUTISTIC. See [`../EVALS.md`](../EVALS.md) for results and
methodology; this file just covers the mechanics.

```
bench/
├── fixtures/<id>/
│   ├── problem.md          the scenario shown to agents (no defects marked)
│   └── ground-truth.json   planted defects + regex match patterns (not shown to agents)
├── harness/
│   └── score.js            mechanical scorer, no LLM judge
└── results/
    ├── <id>/<condition>.json   raw findings per (fixture, condition) run
    └── summary.json            recomputed aggregate + per-fixture report
```

## Running a fixture

There's no automated runner that calls out to Claude — each
(fixture, condition) pair in the current results was produced by
spawning one Claude Code Agent per pair with a prompt that points at
the fixture file and states the condition's process (see `EVALS.md`
methodology for the exact prompts used). To reproduce or extend:

1. Add a fixture: a new directory under `fixtures/` with `problem.md`
   (the scenario) and `ground-truth.json` (see an existing fixture for
   the schema — `defects: [{id, description, mustMatchAny: [regex...]}]`).
2. Run each condition against it (however you're driving Claude — the
   Agent tool, the CLI, etc.) and save the findings as
   `results/<id>/<condition>.json` in the shape `{"findings": ["...", ...]}`.
3. Re-score: `node harness/score.js`. This recomputes
   `results/summary.json` from every `results/*/*.json` file present.

## Scoring semantics

- **TP**: a ground-truth defect counts as found if any of its
  `mustMatchAny` regex patterns matches (case-insensitive) any reported
  finding string for that run.
- **FN**: a ground-truth defect with no matching finding.
- **FP**: a proxy, not a precise count — reported findings that matched
  none of the fixture's defects. A real, correct observation that
  simply wasn't one of the planted defects still counts as an FP here;
  see the "known limitation" note in `EVALS.md`.
- `--verify-only` (used by CI) recomputes and diffs against the
  committed `results/summary.json`, failing if they disagree — this
  catches accidental edits to result files that would silently change
  the published numbers without a corresponding `EVALS.md` update.

## Adding a fixture category

The current 10 fixtures cover one scenario per category from the source
spec's stress-test list (§145):
`concurrency · data · api · security · requirements · performance ·
integration · documentation · configuration · architecture`. The spec's
full stress suite calls for exhaustive coverage per category — this is
deliberately a first pass, not the ceiling. See `../AGENTS.md` →
"Deferred scope" before adding more; extend by picking up that scope
explicitly rather than silently, and update `EVALS.md`'s "Deferred"
section when you do.
