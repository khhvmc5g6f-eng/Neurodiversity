# AUTISTIC

**Deep Systems Reasoning for Agents**

*Explore wider. Understand deeper. Build better.*

![AUTISTIC — Deep Systems Reasoning for Agents. A dual illustration contrasting divergent exploration (divergent thinking, wide exploration, creative connections, alternative ideas, break patterns, find the unseen) with depth-first understanding (deep system analysis, pattern recognition, contradiction detection, dependency mapping, invariant discovery, edge-case hunting, truth and verification). Two minds, one unstoppable system.](docs/banner.png)

AUTISTIC is a depth-first systems-reasoning Agent Skill for coding
agents. Where a breadth-first ideation loop widens the solution space —
isolated parallel cognitive frames generate options, then a critic
scores, clusters, and deepens the survivors — AUTISTIC is a depth-first
systems-reasoning loop: it builds a system map, then drives sustained,
ranked, single-tunnel focus through assumptions, invariants,
contradictions, and edge cases — with a hard "hyperfocus" limiter so
depth never becomes tunnel vision — until the model of the system stops
changing materially.

```
DIVERGENT                         AUTISTIC
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

Divergent ideation exists to prevent **premature convergence**.
AUTISTIC exists to prevent **premature understanding**. Divergence keeps
looking outward. AUTISTIC keeps looking inward until the model holds
together.

## Author's note

> I'm a certified autistic adult, and coding — especially staying with a
> single hard problem long enough to actually understand it, instead of
> bouncing off it — is something I've genuinely struggled with. I built
> AUTISTIC to give myself (and Claude) a disciplined way to do that: pick
> the one question that actually matters, stay on it until it's really
> resolved, and not lose the whole-system picture while doing it. It's a
> tool built out of my own struggle with this, for anyone else who wants
> the same kind of sustained, structured depth from their coding agent.
>
> — Owen

This is the author's own self-description, in their own words. It is
separate from — and does not change — the neuroaffirming design rule
below, which governs how *this project* talks about autistic people and
autistic cognition in general.

## Neuroaffirming design rule

This project does not claim that all autistic people think alike, that
autistic cognition is inherently superior, that autistic people are
always detail-focused, or that autism reduces to a coding style. It
models a configurable set of analytical strategies inspired by
monotropism and reported autistic experience — sustained single-channel
attention, detail-oriented processing, systemising, explicit rule
construction, reduced tolerance for ambiguity, persistent pursuit of
unresolved questions — as reasoning tools, not diagnostic claims. The
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

No install is required to read the reasoning — it's a Markdown skill
that drives Claude's own `Agent` tool calls for isolated parallel
branches where independence matters. AUTISTIC deliberately doesn't
build its own divergence engine — see the divergence bridge below. Full
operational detail: [`skills/autistic/SKILL.md`](skills/autistic/SKILL.md).

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

## Divergence bridge

AUTISTIC can consume a divergent-ideation skill's
`{ideas, clusters, traps, shortlist, deepened, nonObviousPick}` output
directly and verify each shortlisted candidate in depth, or hand
AUTISTIC's own precisely-defined failures back to a divergent phase
when depth has diagnosed a dead end but not a way forward. See
[`skills/autistic/references/divergence-bridge.md`](skills/autistic/references/divergence-bridge.md)
for the routing table and both pipeline directions.

## Benchmarks

Raw, non-cherry-picked results from running BASELINE / DIVERGENT /
AUTISTIC / DIVERGENT→AUTISTIC against a seeded-defect fixture suite
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
│   │                  debugging, verification, divergence-bridge,
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
