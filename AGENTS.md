# AGENTS.md

Guidance for coding agents (including Claude Code itself) working in
this repository.

## What this repo is

A Claude Code Agent Skill (`skills/neurodiversity/`) that implements both
depth-first systems reasoning AND breadth-first divergent ideation
(Phase D, `references/divergence.md`), plus reference docs, JSON schemas
for its intermediate objects, and a mechanically-scored benchmark suite.
Fully self-sufficient as of the 2026-09-04 rename — it does not hand off
to another skill for any part of the process. (An earlier design used a
separate companion skill, `adhd`, for the breadth-first half; that
functionality was folded in directly rather than kept as an external
dependency — see `CHANGELOG.md`'s v0.10.0 entry.)

## Editing the skill

- `skills/neurodiversity/SKILL.md` is the operational document — it's what a
  Claude Code session actually reads when the skill triggers. Keep it
  tight; push detail into `references/` the way `SKILL.md` already
  points to them. A SKILL.md that grows past ~400 lines has usually
  absorbed content that belongs in a reference file.
- `references/*.md`, `frames/*.md` are prose the skill points to, not
  code — there's no build step, editing them takes effect the next time
  a session reads the skill.
- `schemas/*.json` are JSON Schema Draft-07. If you change a field
  NEURODIVERSITY's output actually uses (see `SKILL.md`'s Output shape and
  Phase 4), update the schema in the same change.

## Terminology this project avoids in its own voice

Per the neuroaffirming design rule (`README.md`, `SKILL.md`): no "high
functioning" / "low functioning" / severity labels as identity
shorthand, no "autistic superpower," no "savant mode," no claim that
autistic people share one cognitive style, in any file that speaks in
the project's own generic voice (SKILL.md, references/, frames/,
README's body). The single exception is the README's author's note,
which is a real person's own first-person self-description and is
quoted, not paraphrased into "the project's" voice.

## Benchmarking

`bench/` contains seeded-defect fixtures with a `ground-truth.json`
answer key per fixture (planted defects, not visible in the fixture
content itself) and a harness that runs BASELINE / ADHD / NEURODIVERSITY /
ADHD→NEURODIVERSITY conditions and scores mechanically (ID-matching against
the ground truth, not an LLM judge) into `bench/results/`. `EVALS.md`
publishes the aggregate numbers, including losses — do not edit
`EVALS.md` to remove an unfavorable result; add a new run instead and
let both stand with their run IDs.

**Stale as of the Phase D merge (2026-09-04):** these results measured
NEURODIVERSITY *without* its own divergent-ideation phase against a
separate ADHD skill, alone and combined. Now that Phase D is built into
NEURODIVERSITY directly, the `neurodiversity` condition alone should
approximate what `adhd-neurodiversity` used to require two skills to do.
The existing runs stay as an honest historical record of the
two-skill-orchestration numbers; a fresh benchmark run using the
current single-skill NEURODIVERSITY on the design fixtures is the right
next step before claiming the merge preserved or improved on the old
combined score, not an assumption either way.

## Deferred scope

The full 148-point source spec (`documentation/SOURCE-SPEC.md`)
describes more than this first build implements — notably a standalone
TS/CLI package (`src/*.ts`, `npm install -g`) and a full
10-category × 10-scenario stress suite. Mutation-testing and
static-analysis tool dispatch is specified concretely in
`skills/neurodiversity/references/tooling.md`, but is not exercised by the
benchmark (see `EVALS.md`). This build scoped to: the Claude Code Skill
itself (complete, including real-tool-integration guidance and a
cross-run memory ledger — `references/tooling.md`,
`references/memory.md`), and a 12-fixture benchmark suite (10
bug-finding + 2 design) covering the ten stress-test categories from
the spec at one fixture each plus two architecture-design fixtures (not
the full cross-product). See `EVALS.md`'s "Deferred" section for
exactly what ran and what didn't, and `CONTRIBUTING.md` for how to pick
up deferred scope without silently expanding it.
