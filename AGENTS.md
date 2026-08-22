# AGENTS.md

Guidance for coding agents (including Claude Code itself) working in
this repository.

## What this repo is

A Claude Code Agent Skill (`skills/autistic/`) that implements
depth-first systems reasoning, plus reference docs, JSON schemas for its
intermediate objects, and a mechanically-scored benchmark suite. It has
a companion, complementary skill, `adhd` (breadth-first ideation), which
this repo does not vendor — see `skills/autistic/references/adhd-bridge.md`.

## Editing the skill

- `skills/autistic/SKILL.md` is the operational document — it's what a
  Claude Code session actually reads when the skill triggers. Keep it
  tight; push detail into `references/` the way `SKILL.md` already
  points to them. A SKILL.md that grows past ~400 lines has usually
  absorbed content that belongs in a reference file.
- `references/*.md`, `frames/*.md` are prose the skill points to, not
  code — there's no build step, editing them takes effect the next time
  a session reads the skill.
- `schemas/*.json` are JSON Schema Draft-07. If you change a field
  AUTISTIC's output actually uses (see `SKILL.md`'s Output shape and
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
content itself) and a harness that runs BASELINE / ADHD / AUTISTIC /
ADHD→AUTISTIC conditions and scores mechanically (ID-matching against
the ground truth, not an LLM judge) into `bench/results/`. `EVALS.md`
publishes the aggregate numbers, including losses — do not edit
`EVALS.md` to remove an unfavorable result; add a new run instead and
let both stand with their run IDs.

## Deferred scope

The full 148-point source spec (`documentation/SOURCE-SPEC.md`)
describes more than this first build implements — notably a standalone
TS/CLI package (`src/*.ts`, `npm install -g`), mutation-testing
integration, and a full 10-category × 10-scenario stress suite. This
build scoped to: the Claude Code Skill itself (complete), and a 10-
fixture benchmark suite covering the ten stress-test categories from the
spec at one fixture each (not the full cross-product). See `EVALS.md`'s
"scope and honesty" section for exactly what ran and what didn't, and
`CONTRIBUTING.md` for how to pick up deferred scope without silently
expanding it.
