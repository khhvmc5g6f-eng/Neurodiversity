# Neurodiversity Coding

[![CI](https://github.com/khhvmc5g6f-eng/Neurodiversity/actions/workflows/ci.yml/badge.svg)](https://github.com/khhvmc5g6f-eng/Neurodiversity/actions/workflows/ci.yml)
[![Licence: MIT](https://img.shields.io/badge/licence-MIT-blue)](LICENSE)

**Deep Systems Reasoning for Agents**

*Explore wider. Understand deeper. Build better.*

![Neurodiversity: Deep Systems Reasoning for Agents. One skill, two minds, limitless potential. Phase D is the divergent-thinking engine — explore the possibilities, wide exploration, creative connections, alternative ideas, break patterns, find the unseen. Phases 0-4 are the depth-first reasoning engine — understand the system, deep system analysis, pattern recognition, contradiction detection, dependency mapping, invariant discovery, edge-case hunting, truth and verification. Both live in one self-sufficient skill: explore widely, understand deeply, build better.](docs/banner.png)

NEURODIVERSITY is a self-sufficient systems-reasoning Agent Skill for coding
agents — both breadth-first divergent ideation and depth-first
verification, in one skill, with no dependency on any other skill for
either half. Phase D runs isolated parallel cognitive frames to widen
the solution space, then a critic scores, clusters, and deepens
whatever survives. Phases 0–4 build a system map first, then drive
sustained, ranked, single-tunnel focus through assumptions, invariants,
contradictions, and edge cases, with a hard "hyperfocus" limiter so
depth never turns into tunnel vision, and keep going until the model of
the system stops changing in any way that matters. Most asks need only
one half; a genuine design decision runs both, in sequence.

```
PHASE D                           PHASES 0-4
explore the possibilities         understand the system
divergent thinking                deep system analysis
wide exploration                  pattern recognition
creative connections              contradiction detection
alternative ideas                 dependency mapping
break patterns                    invariant discovery
find the unseen                   edge-case hunting
                                   truth & verification

ideas · options · novelty         truth · structure · clarity
alternatives · insight            precision · completeness
```

Phase D exists to stop **premature convergence**; Phases 0–4 exist to stop
**premature understanding**. One keeps looking outward. The other keeps
looking inward, until the model actually holds together. Both are one
skill's own two modes, not two skills coordinating.

## Author's note

> I'm a certified neurodiversity adult. Social situations have never come easy
> to me, but coding always has. It's one of the few places I can just
> settle in, focus, and feel like myself.
>
> I use AI a lot to help me engage with the world in a way that actually
> works for me, though I'll admit the sheer amount of information out
> there can get overwhelming fast.
>
> Staying with one hard problem long enough to really understand it,
> instead of bouncing off it the second something else grabs my
> attention, is something I've genuinely struggled with. I built
> NEURODIVERSITY to give myself (and Claude) a disciplined way to do that: pick
> the one question that actually matters, stay on it until it's really
> resolved, and don't lose the whole picture while doing it.
>
> It's a tool built out of my own struggle with all of this, for anyone
> else who wants the same kind of sustained, structured depth from their
> coding agent.
>
> — Owen

This is the author's own self-description, in their own words. It sits
apart from the neuroaffirming design rule below and doesn't change it —
that rule is about how *this project* talks about autistic people and
autistic cognition in general, not about the author personally.

## Neuroaffirming design rule

This project does not claim that all autistic people think alike, that
autistic cognition is inherently superior, that autistic people are
always detail-focused, or that autism reduces to a coding style. It
models a configurable set of analytical strategies inspired by
monotropism and reported autistic experience (sustained single-channel
attention, detail-oriented processing, systemising, explicit rule
construction, reduced tolerance for ambiguity, persistent pursuit of
unresolved questions) as reasoning tools, not diagnostic claims. The
name describes the reasoning architecture: sustained focus, explicit
structure, pattern consistency, and persistence until important
uncertainty has been resolved. See
[`skills/neurodiversity/references/monotropism.md`](skills/neurodiversity/references/monotropism.md)
for the theory this borrows from, its limits, and the terminology this
project deliberately avoids in its own generic framing (see
[`AGENTS.md`](AGENTS.md) for the full list).

## Install

Install the Agent Skill directly from GitHub with the GitHub CLI:

```bash
gh skill install khhvmc5g6f-eng/Neurodiversity neurodiversity
```

For Claude Code without `gh skill`, clone the repository first and copy the
skill directory:

```bash
git clone https://github.com/khhvmc5g6f-eng/Neurodiversity.git
cd Neurodiversity
mkdir -p ~/.claude/skills
cp -R skills/neurodiversity ~/.claude/skills/neurodiversity
```

Then in Claude Code:

```
/neurodiversity why is this service intermittently losing state?
/neurodiversity --forensic audit this repository
/neurodiversity --monotropic --focus auth find the race
```

You do not need to install anything to read the reasoning. It is a portable
Markdown Agent Skill. Runtimes without isolated subagents can execute the
same phases inline. Full operational detail:
[`skills/neurodiversity/SKILL.md`](skills/neurodiversity/SKILL.md).

## How it works, briefly

0. **Divergent Ideation (Phase D, when the ask calls for it)** — pick 5
   frames from a divergence-frame table (adversary, constraint-remover,
   inversion, extreme-budget, and more), spawn isolated parallel
   generator calls under each, then score, cluster, prune traps, and
   deepen the top survivors. Skipped entirely for audits and root-cause
   work — nothing to diverge on there.
1. **System Cartography** — map actors, components, data, dependencies,
   security/failure boundaries into a typed graph before anything else.
2. **Cognitive profile selection** — pick 3–5 analytical lenses
   (Systemiser, Detail Forensic, Invariant Guardian, Literalist,
   Completionist, ...) fitted to the problem shape, not rotated for
   variety.
3. **Monotropic Focus Engine** — rank candidate load-bearing questions
   by `impact × uncertainty × reach`, open one as an attention tunnel,
   and drive it — subquestion, subquestion, invariant, edge case,
   verification — to saturation before switching. A hard **hyperfocus
   safety valve** interrupts if depth stops producing new information on
   a question that isn't actually the highest-value one left.
4. **Cross-cutting passes** — assumption harvesting, invariant
   discovery, literal-vs-pragmatic requirements reading, negative-space
   completeness, contradiction hunting, and adversarial falsification of
   every high-impact finding.
5. **Two-stage synthesis** — a full technical model, then a distilled,
   evidence-linked, confidence-calibrated result. Nothing unresolved is
   silently dropped; it's ranked `BLOCKING → CURIOSITY` and reported.

For a design decision, Phase D's shortlist feeds directly into step 1 —
each candidate gets its own scoped System Cartography and depth pass,
compared on evidence, not on how exciting it seemed during ideation.

Two things run underneath all five phases: **tool-backed verification**
prefers a real call-graph MCP, static-analysis MCP, or CLI tool
(dependency-cruiser, Semgrep, Stryker/mutmut/cargo-mutants,
Schemathesis/oasdiff) over an LLM inferring the same thing from reading
files, wherever one is available
([`references/tooling.md`](skills/neurodiversity/references/tooling.md)); and
a **cross-run memory ledger** (`.neurodiversity/memory.json`, written into the
*target* repo being analysed) means a repeat audit doesn't re-derive
invariants and contradictions a previous run already confirmed
([`references/memory.md`](skills/neurodiversity/references/memory.md)).

Full architecture: [`skills/neurodiversity/references/`](skills/neurodiversity/references/).
Cognitive profiles: [`skills/neurodiversity/frames/`](skills/neurodiversity/frames/).
Typed schemas: [`skills/neurodiversity/schemas/`](skills/neurodiversity/schemas/).

## Benchmarks

Raw, non-cherry-picked results from running BASELINE / ADHD /
NEURODIVERSITY / ADHD→NEURODIVERSITY against a seeded-defect fixture suite
(concurrency, security, contradictory API contracts, missing
requirements, config failure, and more) are in [`EVALS.md`](EVALS.md).
The scoring is mechanical (planted defects matched against reported
findings), not an LLM judge, per the project's own evaluation
principles. **These runs predate Phase D's merge into NEURODIVERSITY** —
see `EVALS.md`'s own note on what that means for the `ADHD→NEURODIVERSITY`
comparison going forward.

## Repository layout

```
Neurodiversity/
├── README.md · LICENSE · SECURITY.md · CONTRIBUTING.md
├── CODE_OF_CONDUCT.md · EVALS.md · AGENTS.md
├── skills/neurodiversity/
│   ├── SKILL.md
│   ├── references/   architecture, monotropism, patterns, requirements,
│   │                  debugging, verification, divergence,
│   │                  tooling, memory, threat-taxonomy, invariant-taxonomy,
│   │                  failure-mode-taxonomy, production-readiness,
│   │                  edge-case-taxonomy, simplicity-taxonomy
│   ├── frames/        cognitive-profiles, profile-selection,
│   │                  divergence-frames
│   └── schemas/       result, tunnel, system-map, memory-ledger (JSON Schema)
├── bench/
│   ├── fixtures/      seeded-defect scenarios + ground-truth answer keys
│   ├── harness/       runner + mechanical scorer
│   └── results/       raw per-run output
└── documentation/
    └── SOURCE-SPEC.md the original 148-point spec, preserved verbatim
```

## Changelog

Every version, what changed, and where the project currently stands:
[`CHANGELOG.md`](CHANGELOG.md). Each version has a matching git tag —
`git checkout v0.4.0` gets you the skill exactly as it stood at that
point.

## License

MIT — see [`LICENSE`](LICENSE).
