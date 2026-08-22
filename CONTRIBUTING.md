# Contributing

## What this project is

A single Claude Code Agent Skill (`skills/autistic/`) plus reference
docs, JSON schemas, and a benchmark suite that scores it mechanically
against seeded defects. There is no build step and no compiled
artifact — the skill *is* the Markdown.

## Making a change to the skill

1. Edit `skills/autistic/SKILL.md` or the relevant file under
   `references/`, `frames/`, or `schemas/`.
2. Keep the frontmatter's `description` accurate — it's what a Claude
   Code session uses to decide whether the skill applies at all. If the
   change shifts when the skill should or shouldn't trigger, update the
   pre-flight gate in `SKILL.md` and the description together.
3. If the change affects the result or tunnel shape, update the
   matching JSON Schema under `schemas/` in the same change — the schema
   is documentation of the contract, not an afterthought.
4. Re-run the relevant benchmark fixtures (`bench/`) before and after —
   see `bench/README.md`. A change that regresses recall on a fixture
   category needs a reason in the PR description, not just a passing
   glance.
5. Sync `~/.claude/skills/autistic/` from `skills/autistic/` if you're
   testing locally against a live Claude Code session — the two are not
   automatically linked.
6. If you rename, move, or delete a `references/`/`frames/`/`schemas/`
   file, run `node skills/autistic/check-links.js` — it checks every
   internal cross-reference the skill's own docs make to each other and
   fails loudly on a broken one. CI runs it on every push, but it's
   faster to catch locally before opening a PR.

## Scope discipline

This skill is deliberately narrower than the full 148-point source spec
in `documentation/SOURCE-SPEC.md` — some sections (exhaustive mutation
testing integration, a standalone TS/CLI package, a full 10-category ×
10-scenario stress suite) were explicitly deferred at first build. If
you're picking one of those up, say so in the PR and update
`documentation/SOURCE-SPEC.md`'s framing note plus `EVALS.md`'s
"deferred" section rather than silently expanding scope.

## Reporting a false positive / false negative

Benchmark disagreements are the most useful bug reports this project can
get. Open an issue with: the fixture ID, the run condition (BASELINE /
ADHD / AUTISTIC / ADHD→AUTISTIC), the planted defect ID from the
fixture's `ground-truth.json`, and whether the skill missed it (false
negative) or reported something not actually planted (false positive).

## Code of conduct

See `CODE_OF_CONDUCT.md`. In short: this project explicitly avoids
"high functioning" / "low functioning" / "autistic superpower" framing
in its own generic language (see `AGENTS.md`); hold contributions to the
same standard, while respecting that any individual is free to describe
themselves however they choose.
