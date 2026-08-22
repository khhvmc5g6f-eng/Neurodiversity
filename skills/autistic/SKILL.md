---
name: autistic
description: Depth-first systems reasoning for coding agents. Builds a system map, then drives sustained monotropic focus through one load-bearing question at a time — assumptions, invariants, contradictions, edge cases — until the model of the system stops changing materially. Use on /autistic, "AUTISTIC mode", repository audits, production bugs with no known root cause, architecture review, or "why does this happen" questions. Skip for syntax, lookups, bugs with an already-known root cause, or closed phrasing ("quick", "standard", "just fix"). Full pre-flight gate is in the skill body. Complementary to a breadth-first divergent-ideation skill, if one is installed — see the bridge section below.
license: MIT
---

# AUTISTIC

Deep Systems Reasoning for Agents

Divergent ideation prevents premature convergence: it keeps looking
outward for options you haven't considered. AUTISTIC prevents premature
understanding: it keeps looking inward until the model of the system
holds together. Divergence finds options. AUTISTIC finds structure.
Divergence asks *what else?* AUTISTIC asks *why, exactly where, what
depends on that, is that always true, what breaks at the boundary, what
contradicts it, what evidence proves it, what did we miss?* — then keeps
asking until further investigation stops changing the material
understanding of the system.

## Neuroaffirming design rule

This skill does not claim autistic people think alike, that autistic
cognition is inherently superior, or that autism reduces to a coding
style. It models a configurable set of analytical strategies inspired by
monotropism and reported autistic experience — sustained single-channel
attention, detail-oriented processing, systemising, explicit rule
construction, reduced tolerance for ambiguity, persistent pursuit of
unresolved questions — as reasoning tools, not diagnostic claims. See
`references/monotropism.md` before extending this skill's framing.

## Pre-flight (run before Phase 0)

This skill is expensive: a system map plus one or more sustained
investigation tunnels, each potentially several Agent calls deep. Do not
pay that cost when a direct answer is better.

**Step 1. Explicit invocation check.** If the user typed `/autistic` or
explicitly asked for AUTISTIC mode, "deep-dive this", "audit this
repository", or "run AUTISTIC on this" — skip the rest of this section
and go to Phase 0. The user opted in.

**Step 2. Self-judge (only if Step 1 did not match).** Ask three
questions. If any answer is no, abort and answer directly.

1. **Is the failure or system non-obvious?** If the root cause is already
   known, or the question has one canonical answer, abort.
2. **Is depth actually valuable here?** Production bugs with no known
   cause, architecture/consistency audits, "why does X happen"
   questions, pre-merge repository review = yes. A one-line fix, a
   lookup, a syntax question = no.
3. **Did the user avoid closed phrasing?** "quick", "just", "standard
   fix", "one-liner" signal they want the direct answer. Abort on those.

If all three pass, proceed to Phase 0.

## Routing: AUTISTIC vs divergent ideation vs combined

| Ask | Route |
|---|---|
| "Give me options / ideas / alternatives" | Divergent ideation only |
| "Why is this happening" / "audit this" / "what's wrong" | AUTISTIC only |
| "Design the best architecture for X" | Divergent → AUTISTIC |
| "This design is fundamentally broken, find another approach" | AUTISTIC → Divergent → AUTISTIC |

Full heuristics and the shared JSON handoff shape are in
`references/divergence-bridge.md`. Default to AUTISTIC only unless the
ask is explicitly about generating or choosing between options.

## Phase 0 — System Cartography

Before any deep dive, check for a memory ledger and prefer real tools
over manual reading:

- If `.autistic/memory.json` exists in the target repo, load it —
  prior invariants/contradictions/assumptions are evidence, not
  settled fact; re-verify what this run actually touches. Full
  behavior: `references/memory.md`.
- Prefer a real call-graph/dependency tool (an MCP server via
  `ToolSearch`, or a CLI tool shelled out to) over inferring the graph
  from reading files. Full dispatch order: `references/tooling.md`.

Then map the system. Spawn one **System Cartographer** Agent call (or
do it inline for small scope) that returns the system graph — do not
skip this even under time pressure; every later phase depends on it.

Capture, as a typed graph (`schemas/system-map.schema.json`):

- **Nodes**: actors, components, services, data stores, external systems,
  configuration, security boundaries, failure boundaries.
- **Edges**, typed as one of: `CALLS READS WRITES DEPENDS_ON TRIGGERS
  VALIDATES AUTHENTICATES AUTHORIZES OBSERVES CACHES TRANSFORMS
  SERIALISES CONSUMES PRODUCES OWNS BLOCKS RETRIES INVALIDATES`.

Security boundaries specifically: capture the obvious ones (an actual
auth check/middleware) *and* run the implicit-boundary checklist —
external input reaching a sensitive sink with no labeled check nearby
is still a boundary, and its missing check is itself a finding, not a
reason to skip it. Full checklist: `references/architecture.md`.

Score each node for **load-bearing weight**: `centrality +
dependency_count + failure_impact − replaceability − observability`
(rough, relative ranking is enough — this is a triage signal, not a
precise metric). High-scoring nodes get deeper attention later.

Three layers must all be populated, not just the one that's easiest:

- **MICRO** — functions, values, fields, parameters.
- **MESO** — modules, services, interfaces, workflows.
- **MACRO** — architecture, user outcome, scale, operational shape.

## Phase 1 — Cognitive profile selection

Do not use one generic "autistic mode." Select 3–5 profiles from
`frames/cognitive-profiles.md` based on the problem shape (selection
heuristics are in `frames/profile-selection.md`). Typical picks:

| Problem shape | Profiles |
|---|---|
| Repository audit | Systemiser, Detail Forensic, Pattern Analyst, Consistency Auditor, Completionist |
| Production bug, no known cause | Monotropic, Detail Forensic, Invariant Guardian, Exception Hunter, Temporal Analyst |
| Architecture review | Systemiser, Invariant Guardian, Consistency Auditor, Failure Analyst, Operations Analyst |
| Requirements review | Literalist, Completionist, Consistency Auditor |

Each selected profile becomes the lens for one specialist Agent call
against the system map (or against a scoped subsystem for deep tunnels).
Use isolated Agent contexts per profile where independence matters —
this is a mechanical separation of roles, not one shared agent asked to
"pretend to be five specialists."

## Phase 2 — Monotropic Focus Engine

This is the core mechanism. Do not skip between unrelated questions.
Identify the highest-value unresolved area and drive it to saturation
before switching.

1. From Phase 0/1 findings, list candidate **load-bearing questions** —
   unresolved issues whose resolution would materially change the
   system model (high blast radius, high uncertainty, high reach).
2. Rank by `DETAIL_VALUE = impact × uncertainty × reach`. Open the
   highest-value one as an **attention tunnel**
   (`schemas/tunnel.schema.json`):

   ```
   ID, SUBJECT, WHY_MATERIAL, CURRENT_DEPTH, OPEN_QUESTIONS,
   DEPENDENCIES, EVIDENCE, CONTRADICTIONS, CONFIDENCE, STOPPING_CONDITION
   ```

3. Drive it deep: subquestion → subquestion → invariant → edge case →
   verification. Spawn one focused Agent call per subquestion tier,
   feeding it only the tunnel's own accumulated context (a **context
   pack** — see `references/verification.md`), not the whole
   investigation history.
4. Every 2–3 tiers of depth, run a **global coherence check**: does this
   finding materially change the whole-system model from Phase 0? If
   yes, update the system map before continuing. Micro-level evidence
   that contradicts the macro model wins — the macro model changes, not
   the evidence.
5. New findings unrelated to the current tunnel go into the
   **interrupt queue** at `URGENT / HIGH / NORMAL / DEFER`. Only
   `URGENT` (security vulnerability, destructive data-loss risk, a
   fundamental assumption just disproved) may interrupt the current
   tunnel. Everything else waits.
6. **Saturate, then switch.** A tunnel is saturated when repeated
   investigation produces no material new fact, core assumptions are
   verified, edge cases have stabilised, and contradictory evidence is
   resolved (or explicitly logged as unresolved with a materiality
   rating). On saturation, log `WHERE_WE_WERE / WHAT_WAS_RESOLVED /
   WHAT_REMAINS / WHY_SWITCHING`, then open the next-highest-value
   tunnel from the interrupt queue or candidate list.

### Hyperfocus safety valve (non-negotiable)

Deep focus can become counterproductive. Before continuing depth on any
tunnel, check for: repeated inspection of the same file/evidence,
diminishing information gain across the last 2 tiers, excessive depth on
a low-load-bearing node, or recursive analysis producing no new
evidence. If any apply, run `HYPERFOCUS_CHECK`: *is this still the
highest-value unresolved question in the whole investigation?* If no,
switch tunnels — do not let one fascinating subtlety in a minor helper
absorb the budget while a load-bearing question sits open. Full detail
in `references/monotropism.md`.

## Phase 3 — Cross-cutting passes

Run these as their own isolated Agent calls, scoped to what Phase 0–2
actually surfaced (don't run all of them exhaustively on trivial scope):

- **Assumption harvesting**: for every material claim, what must be true
  for it to hold? Build the assumption graph; prioritise by blast radius
  (dependent claims → dependent components → user impact).
- **Invariant discovery + violation search**: walk the invariant-class
  taxonomy (state, referential/uniqueness, conservation, temporal,
  resource-bound, mutual-exclusion) against Phase 0's data stores and
  state machines — not an unstructured "look for violations." See
  `references/invariant-taxonomy.md`.
- **Requirements literalist + pragmatist passes**: one agent reads
  requirements literally with no inferred convention; a second infers
  likely intent. Differences become explicit ambiguity, classified
  `COSMETIC / MINOR / FUNCTIONAL / ARCHITECTURAL / SAFETY_CRITICAL`.
- **Negative space / completeness**: what should exist here but doesn't?
  Missing empty/loading/offline states, missing counterpart operations
  (create↔delete, subscribe↔unsubscribe), missing permission checks.
- **Contradiction hunt**: search README vs code vs tests vs schema vs
  docs vs config vs runtime for disagreements. Weight by impact ×
  certainty × reach. Where a documented contract can be verified by a
  real tool (a contract test, an OpenAPI diff, a schema validator)
  rather than by reading the doc and the code side by side, use it —
  see `references/tooling.md`.
- **Static analysis**: prefer a connected static-analysis MCP (Semgrep)
  or the target repo's own configured linter over a purely manual read
  — see `references/tooling.md`.
- **Threat taxonomy (STRIDE)**: for security-focused audits, or any
  `security_boundary` node Phase 0 scored as load-bearing, walk
  Spoofing/Tampering/Repudiation/Information-disclosure/Denial-of-
  service/Elevation-of-privilege systematically against it — a
  hypothesis per category, checked against evidence like any other
  candidate finding, not a creative-attacker roleplay. See
  `references/threat-taxonomy.md`.
- **Failure mode analysis (FMEA)**: for "production bug, no known
  cause" runs, or any load-bearing node from Phase 0, walk crash/hang,
  timeout, resource exhaustion, silent corruption, partial failure,
  cascading failure, dependency failure, config/data drift
  systematically — score confirmed modes severity × occurrence ×
  detectability. See `references/failure-mode-taxonomy.md`.
- **Production readiness (Operations Analyst)**: for architecture
  reviews and pre-release audits, walk monitoring/alerting,
  capacity/scaling, rollback safety, dependency-failure handling,
  on-call/runbooks, disaster recovery, and SLOs against load-bearing
  components. See `references/production-readiness.md`.
- **Mutation testing**: for `--forensic` runs or an explicit request,
  on load-bearing logic identified in Phase 0 only (expensive; not a
  `--standard`-mode default) — dispatch to the ecosystem's tool
  (Stryker/PIT/mutmut/cargo-mutants) per `references/tooling.md`.
- **Claim challenger / falsification**: for each high-impact finding,
  spawn a fresh agent instructed to assume it's false and find evidence
  against it. Record `attempts_to_disprove / result / confidence`.

Details and prompts for each pass: `references/requirements.md`,
`references/patterns.md`, `references/verification.md`,
`references/debugging.md`, `references/tooling.md`,
`references/threat-taxonomy.md`, `references/invariant-taxonomy.md`,
`references/failure-mode-taxonomy.md`, `references/production-readiness.md`.

## Resilience: a stalled or failed specialist call

Any Agent call in Phases 0–3 can fail outright (API/tool error), stall
(no useful output), or loop (repeats the same evidence/hypothesis with
no new fact — see the hyperfocus valve, which covers the same symptom
for the *content* of a tunnel; this covers the *mechanics* of the call
itself). Track status per call: `ACTIVE / WAITING / SATURATED /
STALLED / LOOPING / FAILED / COMPLETE`. This is a hard rule, not a
suggestion — a coordination failure in one specialist call must never
silently abort the whole run:

1. On failure or a stall/loop detection, **retry once** with the same
   scoped context pack (not the whole investigation history — the
   point of a context pack is a clean retry, not a bigger one).
2. If the retry also fails/stalls/loops, **do not retry again and do
   not let it block the run.** Log it as an unresolved question at
   `HIGH` materiality (it was load-bearing enough to open a tunnel or
   spawn a pass in the first place) in the interrupt queue / unknowns
   list, and continue with the next-highest-value tunnel or pass.
3. Never ask a specialist agent to relay another agent's output back
   through a chain of `SendMessage` calls instead of just producing its
   own result — that's a coordination pattern, not a reasoning one, and
   it's a demonstrated failure mode (see `EVALS.md`'s methodology notes
   in the companion repo for a concrete instance). If a call's own
   result is needed by another call, pass the *data*, not an
   instruction to go fetch it from a third agent.
4. Report unresolved-due-to-tooling-failure findings honestly in the
   output's remaining-uncertainty section — do not present a run that
   hit two failed specialist calls as if it were a clean, complete pass.

## Completion discipline: run the accepted scope through, quietly

Once a scope is accepted — explicit invocation, or scope confirmed with
the user up front for something large enough to warrant it — drive the
investigation through to completion in one continuous run. Do not stop
partway to post a progress update and ask "should I keep going?" That
is a different thing from reporting a genuinely `URGENT` interrupt or a
hard failure state, and conflating the two reintroduces the exact
premature-stopping failure this skill exists to prevent.

Concretely:

- If Phase 2/3 surface more load-bearing questions than first
  estimated, open the next tunnel and keep going — that's still the
  accepted scope, not new scope needing re-approval.
- Spawn further specialist/tunnel Agent calls yourself, per Phases 1–3's
  own mechanics, rather than serializing the run back through the user
  for permission to continue.
- **Don't narrate internal mechanics as they happen.** Cartography
  calls, profile selection, each individual tunnel/pass Agent call —
  none of that needs a step-by-step "now checking X" / "now spawning Y"
  commentary while it's running. Silence between steps is the point,
  not a gap to fill with progress narration; a wall of narrated steps
  is just as noisy as constant check-ins, only harder to object to
  because it never explicitly asks anything. Surface only: one line at
  the start acknowledging scope, the distilled result from the Output
  shape section at the end, and — only if one actually occurs — an
  `URGENT` interrupt or a genuine decision point that needs the user's
  input. Everything else stays internal to Synthesis A's working
  document.
- A hard-failure-state condition is a reason to keep investigating that
  specific item — exhaust the Resilience retry-then-log rule and the
  hyperfocus valve's tunnel-switching before treating anything as
  genuinely stuck — not a reason to stop the whole run and hand it back
  half-done.
- **This changes when to check in, not what "complete" means.** Phase
  4's hard failure states still apply exactly as written: a hard
  failure state is resolved through further work or explicitly logged
  with a materiality rating in the output — never silently dropped,
  and never quietly waved through as "done" just to end the run sooner.
  Running to completion without interruption and being honest about
  what's still unresolved are not in tension; weakening the second to
  get more of the first would defeat the point of this skill entirely.
- **One thing this cannot override**: a genuinely destructive or
  high-consequence action (the kind covered by the platform's own
  risk-based confirmation rules — irreversible operations, spending
  money, sending messages on the user's behalf, and the like) still
  needs the user's explicit authorization when it comes up. That's a
  platform-level boundary, not a skill preference, and no instruction
  in this file changes it.

Interim "here's my progress so far" narration — whether phrased as a
check-in question or as step-by-step commentary with no question
attached — is what this section removes. It does not remove the
honesty in the final report, and it does not remove the platform's own
confirmation requirements for genuinely risky actions.

## Phase 4 — Synthesis (two-stage)

**Synthesis A**: construct the full technical model — every finding,
evidence link, confidence score, unresolved question. This can be long;
it's the working document, not the output.

**Synthesis B**: compress it into the user-facing result. Preserve
high-impact findings, evidence, uncertainty, and recommendations; drop
low-value analytical detail unless the user asked for `--show-*` output
(see Modes). Confidence is calibrated from direct evidence, independent
confirmation, test results, and assumption/contradiction count — never
from writing tone.

**Memory write**: update `.autistic/memory.json` in the target repo
with this run's confirmed invariants/contradictions/assumptions (not
speculative `unknowns`). Increment `confirmedRuns` for anything
re-verified rather than duplicating it; mark anything this run's
evidence overturned as `superseded`, don't silently overwrite it. Full
behavior: `references/memory.md`. Skip this step only when the target
isn't a real repo AUTISTIC can write into (e.g. a pasted snippet).

### Hard failure states — do not declare success if

`CRITICAL ASSUMPTION UNRESOLVED · CRITICAL CONTRADICTION UNRESOLVED ·
CORE REQUIREMENT UNMAPPED · MAJOR CLAIM UNVERIFIED · TEST FAILURE ·
ROOT CAUSE UNKNOWN`

If implementation was requested but architecture is materially unclear,
do not start writing code just because it was asked for — say what's
still unresolved and continue investigating first, within what tooling
allows.

## Output shape

Render in this order, distilled — internal reasoning may span many
tunnels, the output should not:

1. **System understood.** One paragraph: what this is, in the model's
   own terms.
2. **Critical architecture.** The load-bearing nodes and relationships
   that matter for this question.
3. **Hidden assumptions & dependencies.** The ones with real blast
   radius, not every assumption found.
4. **Contradictions & edge cases.** Weighted by impact, with evidence
   pointers (file/symbol/test), not raw dumps.
5. **Failure modes & verified findings.** What's confirmed vs still
   uncertain — with confidence, not tone.
6. **Recommendation & implementation sequence.** With the tests that
   would prove it.
7. **Remaining uncertainty.** Named explicitly. Never silently dropped —
   rank `BLOCKING / HIGH / MEDIUM / LOW / CURIOSITY`; don't hold the
   whole answer for a curiosity-level question.

## Modes

```
--compact   --standard   --deep   --forensic   --audit
--architecture   --debug   --integration   --security   --requirements
--monotropic          drive one subsystem to saturation before expanding
--whole-system        breadth-first cartography, then prioritised depth
--patterns             --precision
--focus <area>         disproportionate depth on one named area
--show-map --show-assumptions --show-contradictions --show-evidence
--agents 3..16
```

Depth levels: `D1` surface map · `D2` dependency map · `D3` invariants +
contradictions · `D4` recursive deep dive · `D5` forensic exhaustion.
Adaptive by default — if a standard pass finds no material uncertainty,
stop; don't run forensic mode on everything.

## Divergence bridge

AUTISTIC can consume a divergent-ideation skill's output directly
(`ideas / clusters / traps / shortlist / deepened / nonObviousPick`) and
turn each shortlisted candidate into assumptions, dependencies,
invariants, failure modes, edge cases, security/operations concerns,
cost, and a verification plan — see `references/divergence-bridge.md`
for the exact transform and the `--loop` cycle (`understand → explore →
verify → find new problem → …`, stopping at saturation).

## Anti-patterns

- **Premature understanding.** Declaring the system understood after one
  shallow pass because nothing *obviously* looked wrong. Absence of an
  obvious problem is not evidence of a correct model.
- **Detail without global loss** is the goal — but its failure mode is
  detail *with* global loss: three tiers into a tunnel with no coherence
  check back to the system map.
- **Persona theatre.** One shared agent narrating "as the Concurrency
  Analyst, I think..." is not isolation. Use separate Agent calls where
  independence matters.
- **Silent forgetting.** An open question that quietly disappears at
  synthesis time. Every unresolved question either gets a materiality
  rating in the output or an explicit reason it was dropped.
- **Hyperfocus without the valve.** See Phase 2. This is the mirror image
  of divergent ideation's own "convergence disguised as divergence"
  failure mode — here it's "depth disguised as progress."
- **Coordination theatre.** A specialist agent relaying another agent's
  output back through a chain of messages instead of producing its own
  result is not resilience, it's a stall waiting to happen. See
  "Resilience" above.
- **Trusting stale memory.** Loading `.autistic/memory.json` and
  treating it as still true without re-checking anything the current
  run actually touches. See `references/memory.md`.
- **Checking in instead of continuing.** Pausing mid-run to post a
  progress update and ask permission to keep investigating within
  already-accepted scope. See "Completion discipline" above — that's
  not the same thing as a genuine `URGENT` interrupt or an actually
  destructive action needing real authorization.

## Cost

Cartography (1) + profile selection (3–5 specialist calls) + one or more
monotropic tunnels (2–5 calls each, tunnel-dependent) + cross-cutting
passes (2–6 calls) + falsification (1 per high-impact finding) +
two-stage synthesis ≈ 12–30 Agent calls for a `--standard` run, more for
`--forensic`. Scale down with `--compact` or a narrow `--focus`.

## Companion library, benchmarks, and repo

Full spec, reference docs, cognitive-profile definitions, JSON schemas,
and the seeded-defect benchmark suite (raw results, not cherry-picked)
live at https://github.com/khhvmc5g6f-eng/autistic. If a breadth-first
divergent-ideation skill is installed locally, see
`references/divergence-bridge.md` for how AUTISTIC hands off to and
consumes its output. Real-tool integration for
cartography/static-analysis/mutation/contract verification:
`references/tooling.md`. Cross-run memory: `references/memory.md`.

## Source spec

This skill operationalises a 148-point written spec on depth-first
systems reasoning. The full prose is preserved in the repo's
`documentation/SOURCE-SPEC.md`. The implementation choices here
(monotropic tunnels over exhaustive parallel fan-out, mechanical
role separation, hyperfocus limiter as a hard gate rather than a
suggestion) follow from that spec and from benchmarking against a
lightweight-fan-out alternative — see `EVALS.md` in the repo.
