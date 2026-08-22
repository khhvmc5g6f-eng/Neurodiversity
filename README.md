# AUTISTIC

**Deep Systems Reasoning for Agents**

*Explore wider. Understand deeper. Build better.*

![Neurodiversity: Deep Systems Reasoning for Agents. Two minds, one system, limitless potential. ADHD is the divergent-thinking engine — explore the possibilities, wide exploration, creative connections, alternative ideas, break patterns, find the unseen. AUTISTIC is the depth-first reasoning engine — understand the system, deep system analysis, pattern recognition, contradiction detection, dependency mapping, invariant discovery, edge-case hunting, truth and verification. Bridge the gap, combine strengths: explore widely, understand deeply, build better.](docs/banner.png)

This repo is named **Neurodiversity Coding** because it's one half of
that pairing. AUTISTIC lives here. ADHD lives at
[`UditAkhourii/adhd`](https://github.com/UditAkhourii/adhd), and it's
never vendored in, only bridged to (see the ADHD bridge below).

AUTISTIC is a depth-first systems-reasoning Agent Skill for coding
agents, built as the complementary architecture to
[`UditAkhourii/adhd`](https://github.com/UditAkhourii/adhd). ADHD runs
a breadth-first ideation loop: isolated parallel cognitive frames widen
the solution space, then a critic scores, clusters, and deepens
whatever survives. AUTISTIC does the opposite. It builds a system map
first, then drives sustained, ranked, single-tunnel focus through
assumptions, invariants, contradictions, and edge cases, with a hard
"hyperfocus" limiter so depth never turns into tunnel vision, and it
keeps going until the model of the system stops changing in any way
that matters.

```
ADHD                              AUTISTIC
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

ADHD exists to stop **premature convergence**; AUTISTIC exists to stop
**premature understanding**. One keeps looking outward. The other keeps
looking inward, until the model actually holds together.

## Author's note

> I'm a certified autistic adult. Social situations have never come easy
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
> AUTISTIC to give myself (and Claude) a disciplined way to do that: pick
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
[`skills/autistic/references/monotropism.md`](skills/autistic/references/monotropism.md)
for the theory this borrows from, its limits, and the terminology this
project deliberately avoids in its own generic framing (see
[`AGENTS.md`](AGENTS.md) for the full list).

## Install (Claude Code Skill)

```bash
mkdir -p ~/.claude/skills
cp -R skills/autistic ~/.claude/skills/autistic
```

Then in Claude Code:

```
/autistic why is this service intermittently losing state?
/autistic --forensic audit this repository
/autistic --monotropic --focus auth find the race
```

You don't need to install anything to read the reasoning. It's a
Markdown skill that drives Claude's own `Agent` tool calls, the same
mechanism the [`adhd`](https://github.com/UditAkhourii/adhd) skill
uses for isolated parallel branches. AUTISTIC deliberately doesn't
duplicate ADHD's divergence engine; see the ADHD bridge below for how
the two actually connect. Full operational detail:
[`skills/autistic/SKILL.md`](skills/autistic/SKILL.md).

## How it works, briefly

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

Two things run underneath all five phases: **tool-backed verification**
prefers a real call-graph MCP, static-analysis MCP, or CLI tool
(dependency-cruiser, Semgrep, Stryker/mutmut/cargo-mutants,
Schemathesis/oasdiff) over an LLM inferring the same thing from reading
files, wherever one is available
([`references/tooling.md`](skills/autistic/references/tooling.md)); and
a **cross-run memory ledger** (`.autistic/memory.json`, written into the
*target* repo being analysed) means a repeat audit doesn't re-derive
invariants and contradictions a previous run already confirmed
([`references/memory.md`](skills/autistic/references/memory.md)).

Full architecture: [`skills/autistic/references/`](skills/autistic/references/).
Cognitive profiles: [`skills/autistic/frames/`](skills/autistic/frames/).
Typed schemas: [`skills/autistic/schemas/`](skills/autistic/schemas/).

## ADHD bridge

AUTISTIC can take ADHD's `{ideas, clusters, traps, shortlist,
deepened, nonObviousPick}` output directly and verify each shortlisted
candidate in depth. It can also hand its own precisely-defined failures
back to ADHD, for when depth has diagnosed a dead end but not found a
way forward. See
[`skills/autistic/references/adhd-bridge.md`](skills/autistic/references/adhd-bridge.md)
for the routing table and both pipeline directions.

## Benchmarks

Raw, non-cherry-picked results from running BASELINE / ADHD /
AUTISTIC / ADHD→AUTISTIC against a seeded-defect fixture suite
(concurrency, security, contradictory API contracts, missing
requirements, config failure, and more) are in [`EVALS.md`](EVALS.md).
The scoring is mechanical (planted defects matched against reported
findings), not an LLM judge, per the project's own evaluation
principles.

## Repository layout

```
autistic/
├── README.md · LICENSE · SECURITY.md · CONTRIBUTING.md
├── CODE_OF_CONDUCT.md · EVALS.md · AGENTS.md
├── skills/autistic/
│   ├── SKILL.md
│   ├── references/   architecture, monotropism, patterns, requirements,
│   │                  debugging, verification, adhd-bridge,
│   │                  tooling, memory, threat-taxonomy, invariant-taxonomy,
│   │                  failure-mode-taxonomy, production-readiness,
│   │                  edge-case-taxonomy, simplicity-taxonomy
│   ├── frames/        cognitive-profiles, profile-selection
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
