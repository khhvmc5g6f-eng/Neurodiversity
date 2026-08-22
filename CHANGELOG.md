# Changelog

All notable changes to AUTISTIC are recorded here, newest first. Format
loosely follows [Keep a Changelog](https://keepachangelog.com/). Every
version below corresponds to a real git tag on this repo — `git checkout
v0.4.0`, for instance, gets you the skill exactly as it stood right
after the STRIDE threat-taxonomy pass was added, before anything later.

## Where things stand right now (v0.9.2)

A single Claude Code Agent Skill (`skills/autistic/`) implementing
depth-first systems reasoning, plus a mechanically-scored benchmark
suite (12 fixtures, seeded defects, no LLM judge) and supporting docs.
No compiled artifact, no build step, no standalone CLI yet — the skill
*is* the Markdown, installed by copying `skills/autistic/` into
`~/.claude/skills/`.

**What's real and working:**
- System cartography (explicit + inferred security boundaries) → 5
  systematic taxonomy-driven passes (STRIDE for security, FMEA for
  failure modes, design-by-contract classes for invariants, SRE
  production-readiness review for operations, boundary-value analysis
  for edge cases, Fowler's code-smell catalogue for simplification) →
  monotropic single-tunnel depth engine with a hard hyperfocus valve →
  two-stage synthesis conforming to a typed result schema.
- A divergence bridge to hand off to/consume from a breadth-first
  ideation skill, if one is installed — genericized, names nothing.
- Real-tool preference (MCP/CLI) over LLM-inferred data where available;
  a cross-run memory ledger written into the *target* repo being
  audited; resilience rules for a stalled/failed specialist call.
- CI-enforced internal consistency: every cross-reference this skill's
  own docs make to each other is checked to actually resolve.
- A benchmark that publishes losses, not just wins — baseline
  out-recalls AUTISTIC by volume alone, and that's stated plainly
  rather than hidden.

**Known, disclosed gaps** (see `AGENTS.md` → Deferred scope,
`EVALS.md` → Deferred from the source spec): no standalone TS/CLI
package; the full 10×10 stress matrix isn't run, only 1 fixture per
category; mutation-testing/contract-verification tooling is specified
but not exercised by the benchmark; token/time cost tracking exists in
the harness but no committed result yet has that data.

---

## v0.9.2 — 2026-08-22

- Rewrote the author's note in the README in the author's own further
  words: more personal, no em dashes, naming specific struggles with
  social interaction, why coding and AI both matter to them, and being
  overwhelmed by the sheer volume of information at times.

## v0.9.1 — 2026-08-22

- Author attribution corrected (LICENSE, README).
- Added this changelog, with a matching git tag per version so any
  point in the project's history is directly checkoutable.

## v0.9.0 — 2026-08-22

Final pass on the build session: closed every finding a self-review
council raised, plus the last two lenses that still lacked a concrete
method.

- Fixed a stale cost estimate (`SKILL.md`'s "12–30 Agent calls" hadn't
  been updated since 4 taxonomy passes were added; now ~25–50).
- Wired `schemas/result-schema.json` into Phase 4 directly, not just
  the divergence-bridge doc.
- Disclosed a real gap: token/time cost (called for by the original
  spec) was never tracked and, worse, wasn't even listed as deferred.
  Added real `tokensUsed`/`durationMs` support to the scorer for future
  runs rather than inventing historical numbers.
- Added the last two taxonomy-driven passes: boundary-value analysis
  (Exception Hunter) and Fowler's code-smell catalogue (Simplicity
  Reviewer, gated to run only after synthesis, never before).

## v0.8.0 — 2026-08-22

Removed every reference to other skills or repos whose code or ideas
this project drew on, on request. The functional design is unchanged —
only naming and attribution:

- The divergence-bridge concept, the benchmark's condition names (24
  result files renamed), and every prose mention were genericized.
  Tool citations (Semgrep, Stryker, established industry standards)
  stayed, since those are real integrations, not borrowed ideas.
- The original written spec (`documentation/SOURCE-SPEC.md`) was left
  untouched — it's preserved verbatim as the user's own prompt, not
  this project's own voice.
- Fixed a real bug in the reference-link checker itself, found while
  auditing: its regex silently skipped a class of internal links it
  claimed to check.

## v0.7.0 — 2026-08-22

A real code review of the repo's only substantial code file
(`bench/harness/score.js`) and its CI config — not the skill's prose,
the actual code. Fixed a crash-on-malformed-input case, removed
duplicated work, tightened an edge case, and added a CI check that the
skill's internal documentation links actually resolve (this skill
cross-references itself across dozens of files; nothing had verified
that before).

## v0.6.0 — 2026-08-22

A self-audit applying the same standard used for the security pass
(v0.4.0) to every other analytical lens in the skill. Found three more
with the same weakness — a name and a vague instruction, no concrete
method — and fixed each with a real, grounded framework: design-by-
contract invariant classes, Failure Mode and Effects Analysis (FMEA),
and an SRE production-readiness-review checklist.

## v0.5.0 — 2026-08-22

Two execution-discipline changes, both explicitly bounded so they
don't quietly weaken anything else: the skill now runs an accepted
scope through to completion without pausing to ask permission
mid-run, and it stays quiet about its own internal mechanics while
doing so — narrating only genuine findings, blockers, or the final
result. Hard failure states and any platform-level confirmation
requirement for a genuinely risky action are explicitly unaffected by
either change.

## v0.4.0 — 2026-08-22

A live stress test against several adversarial framings found one real
gap: the skill could verify or falsify a security claim already on the
table, but had no way to generate a candidate attack on its own. Fixed
with a systematic threat-taxonomy walk (STRIDE) against the system's
security boundaries — deliberately built as rule-based enumeration, not
a creative-persona roleplay, to stay consistent with the skill's own
depth-first character. Then closed the dependency that pass has on
cartography: added a checklist for detecting *implicit* security
boundaries (an unlabeled but sensitive input-to-sink path), verified
against a snippet with zero security-related keywords in it.

## v0.3.0 — 2026-08-22

Landscape research against comparable reasoning-agent tooling surfaced
three concrete additions: preferring a real MCP/CLI tool over an
LLM-inferred approximation wherever one is available (call graphs,
static analysis, mutation testing, contract verification), a cross-run
memory ledger so a repeat audit doesn't re-derive what a prior run
already confirmed, and a hard rule for a stalled or failed specialist
call (retry once, then log and continue — never abort the whole run).

## v0.2.0 — 2026-08-22

Fixed two ground-truth patterns in the benchmark that were too narrow
to match correctly-phrased findings (found across every condition, not
one — the same frozen results were rescored, nothing regenerated).
Added two open-ended architecture-design fixtures specifically to test
the combined divergent→depth-first condition on the kind of problem
it's actually built for, rather than only bug-finding tasks. Result:
depth-first reasoning alone wins on bug-finding, the combined approach
wins on open design decisions — the benchmark can show either winning,
not just confirm one by construction.

## v0.1.0 — 2026-08-22

Initial build. `skills/autistic/SKILL.md` plus reference docs, ten
cognitive profiles, JSON schemas for the skill's intermediate objects,
and a 10-fixture seeded-defect benchmark suite scored mechanically
(no LLM judge). Public repo, MIT licensed.
