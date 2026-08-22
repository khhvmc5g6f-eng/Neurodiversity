# Source spec

This is the original 148-point written specification the `autistic`
skill and this repository operationalise. It is preserved verbatim for
reference. Where the implementation makes a concrete choice not fully
determined by the prose (e.g. monotropic tunnels over exhaustive
parallel fan-out, or scoping the benchmark suite to a representative
fixture set rather than an exhaustive one), that choice and its reason
are recorded in `../EVALS.md` and in the skill's own reference docs, not
silently folded into this file.

---

## AUTISTIC — A Monotropic Deep-Systems Reasoning Architecture

It deliberately adopts a set of configurable autistic-inspired
analytical lenses, then verifies their usefulness rather than treating
stereotypes as truth.

## MASTER BUILD INSTRUCTION

Build a production-grade Agent Skill and software reasoning framework
named: **AUTISTIC**

Primary command: `/autistic`

Companion integration: `/adhd`, `/autistic`, `/adhd-autistic`

The system must be designed as the complementary reasoning architecture
to `UditAkhourii/adhd`. The existing ADHD repository uses isolated
parallel cognitive frames to widen the solution space, followed by a
separate critic that scores, clusters and deepens promising ideas. Its
central mechanism is true context separation between divergent branches
rather than sequential persona simulation.

AUTISTIC must preserve the valuable architectural principles of:
isolated agent contexts; mechanical separation of reasoning roles;
structured intermediate outputs; parallel execution where useful;
explicit evaluation; benchmarking; CLI and library operation — while
pursuing a fundamentally different objective.

### 1. Primary difference from ADHD

ADHD asks: *What possibilities have we not considered?*
AUTISTIC asks: *What exactly is this system, how does every part relate
to every other part, what assumptions make it work, where are the
contradictions, and what would prove our understanding wrong?*

```
ADHD                          AUTISTIC
BREADTH-FIRST REASONING       DEPTH-FIRST SYSTEMS REASONING
```

ADHD maximises: divergence, novelty, lateral transfer, candidate
generation, alternative framing.

AUTISTIC maximises: depth, precision, pattern recognition, consistency,
traceability, system completeness, dependency understanding, sustained
investigation, contradiction detection, boundary analysis, falsification.

### 2. Neuroaffirming design rule

AUTISTIC does not claim: all autistic people think alike; autistic
cognition is inherently superior; autistic people are always
detail-focused; autistic people are automatically better at systems;
autism can be reduced to a coding style.

Instead, the skill deliberately models selected cognitive strategies
inspired by theories and reported autistic experiences, including:
monotropic attention; deep focus; detail-oriented processing;
systemising; explicit rule construction; pattern recognition; preference
for consistency; reduced tolerance for ambiguity; persistent pursuit of
unresolved questions.

These are configurable reasoning strategies. They are not diagnostic
claims.

### 3. Monotropic engine

This is the major enhancement over the previous version. Create:
`Monotropic Focus Engine`.

Instead of continually switching between unrelated questions, AUTISTIC
identifies the highest-value unresolved area and allocates sustained
reasoning to it.

```
SYSTEM → LOAD-BEARING QUESTION → DEEP FOCUS → SUBQUESTION → SUBQUESTION
       → INVARIANT → EDGE CASE → VERIFICATION
```

Do not abandon a productive branch merely because another interesting
issue appears. Queue secondary issues. Finish or reach a defined
stopping condition on the current attention tunnel before switching.

### 4. Attention tunnels

Maintain `ATTENTION_TUNNEL`. Each tunnel contains: `ID, SUBJECT,
WHY_MATERIAL, CURRENT_DEPTH, OPEN_QUESTIONS, DEPENDENCIES, EVIDENCE,
CONTRADICTIONS, CONFIDENCE, STOPPING_CONDITION`.

Example:

```
AT-004
Authentication Token Rotation

Why material:
Possible race causing intermittent logout.

Open questions:
- Are refresh tokens single-use?
- Is rotation atomic?
- What happens under concurrent requests?
- Is previous token invalidated before new token persists?
```

### 5. Attention switch cost

Treat unnecessary context switching as a cost. When the orchestrator
proposes changing areas, calculate `NEW_AREA_VALUE vs
CURRENT_TUNNEL_UNRESOLVED_VALUE vs SWITCH_COST`. Do not constantly chase
whichever issue most recently appeared.

### 6. Interrupt queue

New findings arising during deep investigation are placed into
`INTERRUPT_QUEUE`. Statuses: `URGENT, HIGH, NORMAL, DEFER`. Only
`URGENT` issues may automatically interrupt a current tunnel — a
security vulnerability, a destructive data-loss risk, a fundamental
assumption disproved.

### 7. Cognitive profile system

Rather than one stereotyped "autistic mode", implement configurable
cognitive lenses: Monotropic, Systemiser, Detail Forensic, Pattern
Analyst, Invariant Guardian, Literalist, Consistency Auditor,
Sensory-Noise Analogue, Completionist, Exception Hunter. These are
analytical frames, not claims about autistic people.

### 8. Profile selection

Unlike ADHD, do not randomly choose radically unrelated viewpoints.
Select profiles according to the problem: repository audit →
Systemiser, Detail Forensic, Pattern Analyst, Consistency Auditor,
Completionist. Production bug → Monotropic, Detail Forensic, Invariant
Guardian, Exception Hunter, Temporal Analyst. Architecture → Systemiser,
Invariant Guardian, Consistency Auditor, Failure Analyst, Operations
Analyst.

### 9. Three-layer system model

Every substantial problem must be analysed simultaneously at MICRO
(functions, values, statements, fields, parameters), MESO (modules,
services, components, interfaces, workflows), and MACRO (architecture,
user outcome, scalability, governance, operational implications). The
detail-focused engine must never lose the whole-system model.

### 10. Detail without global loss

Some theories of autistic cognition have historically overemphasised
weak global processing, whereas later work supports a more nuanced
detail-focused bias rather than universal inability to process global
meaning. Therefore AUTISTIC must explicitly alternate DETAIL → SYSTEM
CONTEXT CHECK → DETAIL → SYSTEM CONTEXT CHECK. Every deep tunnel
periodically asks: does this finding materially change the whole-system
model?

### 11–14. System cartography, graph, relationship types

Before solution generation, map the entire system: actors, components,
services, data, state, dependencies, events, interfaces, external
systems, configuration, security boundaries, failure boundaries. Build a
typed graph (node, edge, relationship). Support relationship types:
CALLS, READS, WRITES, DEPENDS_ON, TRIGGERS, VALIDATES, AUTHENTICATES,
AUTHORIZES, OBSERVES, CACHES, TRANSFORMS, SERIALISES, CONSUMES,
PRODUCES, OWNS, BLOCKS, RETRIES, INVALIDATES.

### 15. Load-bearing component detector

Identify components whose failure causes disproportionate system
impact. Score: centrality, dependency count, failure impact,
replaceability, observability. These get deeper analysis.

### 16–18. Assumption harvesting, graph, blast radius

Aggressively extract unstated assumptions: for every claim, ask what
must be true for it to be correct. Assumptions may depend upon
assumptions — represent as a graph (claim → requires → assumption A →
requires → assumption B). If B fails, propagate impact upward. Calculate
blast radius: assumption → dependent claims → dependent components →
user impact. Prioritise high-blast-radius assumptions for verification.

### 19–21. Invariant discovery, violation search, rule extraction

Search for rules that must hold across all valid states (e.g. no user
may access another tenant's records). After discovering invariants,
actively search repository paths capable of violating them. Convert
vague behaviour into explicit rules (IF/AND/THEN/ELSE form).

### 22–24. Rule collision, literal/pragmatic requirements passes

Detect two rules producing incompatible outcomes. Run a fresh agent to
read requirements literally (no inferred convention), a separate agent
to infer probable author intent. Differences become explicit ambiguity,
classified: COSMETIC, MINOR, FUNCTIONAL, ARCHITECTURAL, SAFETY_CRITICAL.

### 25–31. Completeness, negative space, symmetry, pattern expectation,
outliers, nomenclature, semantic consistency

Create a completion matrix (feature, screen, state, setting, role,
permission, API, data, error, empty/loading/offline state,
accessibility, test). Ask: what should exist here but does not (missing
empty state, logout route, rollback, migration, audit log, permission
check, timeout, delete workflow)? Look for missing counterparts to
paired operations (create↔delete, add↔remove, enable↔disable,
subscribe↔unsubscribe, import↔export, lock↔unlock). Infer patterns from
repository structure and flag anomalies (not all deviations are
errors — each requires explanation). Check naming/casing/identifiers/
enum values/terminology for fragmentation of one concept. Determine
whether apparently different names represent the same concept
(semantic consistency matters more than text matching).

### 32–35. Data contracts, field lifecycle, nullability, units

For every data object, track creator, schema, validator, transformers,
storage, consumers, serialisation, version. For every critical field,
track created → validated → mutated → persisted → transmitted →
displayed → deleted. Compare nullability across database, TypeScript,
API schema, frontend, tests — flag disagreements. Track units:
milliseconds vs seconds, bytes vs kilobytes, degrees vs radians,
currency minor vs major units.

### 36–46. Temporal, concurrency, interruption, edge case lattice,
failure propagation, root-cause backtracking

Build chronological models of asynchronous processes; map event
causality and identify race-sensitive ordering. Ask what can happen
simultaneously, what assumes serial execution, which updates are
atomic, where duplicate requests can arise. For idempotency, ask what
happens if an operation executes twice. Track retryable, max retries,
backoff, idempotent, side effect per operation. Ask what happens if a
workflow is interrupted halfway (partial upload, interrupted migration,
abandoned checkout, network disconnect) and assess resumability. Do not
create one generic edge-case list — generate dimensions and combine them
(authenticated/unauthenticated × online/offline × empty/populated ×
valid/expired), prioritising high risk, high interaction, historic bug
areas, and boundary conditions over exhaustive combinatorics. Model
failure propagation forward (root failure → secondary effect → tertiary
effect → user symptom) and root-cause backtracking in reverse. Allow
multiple interacting causes rather than forcing one root cause.

### 47–56. Contradiction hunt, false consensus, evidence graph, source
quality, factuality gate, claim challenger, falsification score,
confidence calibration

Dedicated isolated panel searches contradictions between README, code,
tests, schema, documentation, API, configuration, CI, and runtime. Rank
by impact, certainty, reach. If several agents repeat an identical
claim, determine whether they independently found evidence or simply
inherited the same source — consensus is not multiplicative evidence.
Every major finding links to file, symbol, test, external source, and
observation. External claims classified: PRIMARY, OFFICIAL,
AUTHORITATIVE SECONDARY, COMMUNITY, ANECDOTAL, UNKNOWN. Research when
up-to-date information matters; do not let deep analysis become deep
speculation. For each high-impact finding, spawn a challenger to assume
it is false and find evidence against it; record attempts to disprove,
result, confidence. Confidence depends on direct evidence, independent
confirmation, test result, assumption count, contradictory evidence —
not writing tone.

### 57–62. Unresolved question queue, saturation, hyperfocus safety
valve, detail trap detector, global coherence check, model reconciliation

Maintain explicit unresolved questions; never silently forget them
during synthesis. Rank materiality: BLOCKING, HIGH, MEDIUM, LOW,
CURIOSITY — do not hold completion for low-value curiosity. Declare a
tunnel saturated when repeated investigations produce no material new
fact, core assumptions are verified, edge cases stabilise, and
contradictory evidence is resolved. Deep focus can become
counterproductive: detect repeated inspection of the same files,
diminishing information gain, excessive depth on a low-impact node,
recursive analysis without new evidence, then trigger
`HYPERFOCUS_CHECK` — is this still the highest-value unresolved
question? If no, switch tunnels. Calculate `DETAIL_VALUE = IMPACT ×
UNCERTAINTY × REACH`; park low-value minutiae. At each major depth
threshold, reconstruct the entire system model and ask: does this still
make sense as a whole? If micro-level evidence contradicts the macro
model, the macro model changes — do not force details to fit an earlier
architecture assumption.

### 63–67. Special interest mode, information environment control,
signal-to-noise, context packs, explicit transitions

Allow the user to specify an area for disproportionately deep focus
(`--focus security`, `--focus database`, `--focus Flutter`). Reduce
irrelevant inputs before sending context to agents: remove duplicates,
separate evidence from commentary, minimise unrelated history, preserve
necessary references. Classify context: LOAD_BEARING, SUPPORTING,
BACKGROUND, DISTRACTING, DUPLICATE. Specialist agents receive curated
context packs to reduce overload and anchoring. When switching tunnels,
preserve WHERE_WE_WERE, WHAT_WAS_RESOLVED, WHAT_REMAINS, WHY_SWITCHING —
no analytical state disappears.

### 68–74. Recovery checkpoints, interruption resilience, ADHD
compatibility layer, pipelines, loop mode, dual-engine orchestrator

Persist structured checkpoints after every major stage so another agent
can resume from structured state rather than rereading the whole
project. AUTISTIC must be able to consume ADHD output (`ideas, clusters,
traps, shortlist, deepened, nonObviousPick`) and transform each
shortlisted candidate into assumptions, dependencies, invariants,
failure modes, edge cases, security, operations, implementation cost,
verification. Recommended combined process: problem → ADHD divergence →
30 candidates → ADHD convergence → 3 candidates → AUTISTIC system model
→ deep analysis per candidate → falsification → comparison → final
decision. Also support the reverse flow: AUTISTIC → precisely defined
failure → ADHD → wide solution search → AUTISTIC → verify options.
`/adhd-autistic --loop`: understand → explore → verify → find new
problem → explore → verify, stopping at analytical saturation or
budget. Build a higher-level router: divergent engine = ADHD,
convergent/depth engine = AUTISTIC; router chooses DIRECT, ADHD,
AUTISTIC, ADHD→AUTISTIC, or AUTISTIC→ADHD→AUTISTIC.

### 75–81. Routing heuristics, shared schema, agent role library,
no persona theatre, two-stage synthesis, compression without loss

"Give me ten ideas" → ADHD. "Why is this production bug happening?" →
AUTISTIC. "Design the best architecture" → ADHD → AUTISTIC. "Audit this
repository thoroughly" → AUTISTIC. "Find a completely different
approach to this architecture" → AUTISTIC → ADHD → AUTISTIC. ADHD and
AUTISTIC communicate through typed intermediate objects, not prose
scraping. AUTISTIC returns a structured result object (systemMap,
requirements, assumptions, dependencies, invariants, attentionTunnels,
patterns, contradictions, edgeCases, failureModes, unknowns,
verifiedFindings, recommendations, tests, confidence). Specialist role
library: System Cartographer, Monotropic Investigator, Requirements
Literalist, Pattern Analyst, Dependency Analyst, State Analyst, Data
Contract Analyst, Temporal Analyst, Concurrency Analyst, Invariant
Guardian, Contradiction Hunter, Edge Case Hunter, Failure Analyst,
Security Analyst, Performance Analyst, Operations Analyst, Evidence
Verifier, Falsification Agent, Synthesis Agent, Simplicity Reviewer.
Roles are analytical responsibilities, not "pretend to be 20
specialists" theatre — use separate contexts where independence
matters. Synthesis A constructs the full technical model; Synthesis B
reduces it to actionable recommendations without losing high-impact
findings, evidence, or uncertainty.

### 82–91. Inspection modes, explainability, implementation readiness,
change impact, post-implementation audit, requirement coverage

`--show-map`, `--show-assumptions`, `--show-contradictions`,
`--show-evidence`. Every recommendation must be able to answer "why?"
by traversing recommendation → finding → evidence → requirement. Score
implementation readiness (requirements coverage, assumption resolution,
dependency coverage, invariant coverage, testability, unresolved risk);
states: NOT_UNDERSTOOD, PARTIALLY_MAPPED, UNDERSTOOD_WITH_GAPS,
IMPLEMENTATION_READY, VERIFIED. Do not jump into code simply because the
user asked to build, if architecture is materially unclear — continue
investigating until blocking uncertainty is resolved where tooling
permits. Once implementation begins, AUTISTIC continues monitoring
consistency, does not disappear after planning. For every code
modification, track change → direct effect → dependencies → data → UI →
tests → operations; predict blast radius before changing shared
components and verify predicted areas after. Ask fresh agents whether
the implementation actually satisfies the constructed model. Maintain a
requirement coverage matrix (req, implementation, test, status) — no
requirement disappears between analysis and build. Capture negative
requirements (MUST NOT, SHOULD NEVER, CANNOT) — frequently forgotten.

### 93–101. Counterexample-first testing, property-based thinking,
mutation/static/dynamic verification, baseline freeze, root cause
before patch, multi-cause model, unknown-unknown search

For every important rule, generate conditions most likely to break it.
Where appropriate, derive system properties rather than only example
tests. Where tooling exists, use mutation testing for critical logic.
Integrate available linters, type checkers, security scanners,
dependency tools, dead-code analysis. Where possible, run the
application, execute tests, reproduce bugs, inspect logs — repository
reading alone is not execution evidence. Before fixing bugs, capture
current behaviour and a failing test. Do not patch symptoms until root
cause has been investigated to reasonable confidence. Allow failures to
have several interacting causes rather than forcing one root cause. A
dedicated panel asks what category of problem has nobody examined yet —
preserving a controlled form of breadth inside a depth-first
architecture.

### 102–115. Red team, completeness challenge, benchmark architecture,
metrics, ADHD comparison benchmark, cross-contamination test,
evaluation judge, cost efficiency

Fresh adversarial agents attempt to disprove system completeness,
asking where a missing component would most likely hide if the model
were incomplete. Do not benchmark AUTISTIC mainly with subjective LLM
scoring — use seeded technical defects across categories: ARCHITECTURE,
CONCURRENCY, SECURITY, DATA, API, PERFORMANCE, CONFIGURATION,
REQUIREMENTS, UI, OPERATIONS. Measure true positives, false positives,
false negatives, precision, recall, F1, time, tokens. Measure depth
(load-bearing findings ÷ total findings, avoiding reward for trivia),
contradiction recall, assumption recall, edge-case recall, and root-
cause accuracy. Run identical tasks using BASELINE, ADHD, AUTISTIC, and
ADHD→AUTISTIC and measure different dimensions without predetermining
the outcome — expect ADHD to score higher on novelty/breadth, AUTISTIC
higher on defect recall/dependency coverage/contradiction
detection/requirements coverage, and the combination higher on option
quality/final robustness, but measure rather than assume. Ensure ADHD
branches remain isolated during divergence and AUTISTIC specialists
remain independently analytical before synthesis. Use deterministic
gold-standard results wherever possible; LLM judges only supplement.
Measure findings per token, per second, per agent call.

### 116–125. Adaptive depth, modes, depth levels, agent control,
monotropic/whole-system/pattern/precision/forensic modes

If a standard pass finds no material uncertainty, stop — do not use
exhaustive mode on everything. Support `--compact --standard --deep
--forensic --audit --architecture --debug --integration --security
--requirements`. Depth levels: D1 surface map, D2 dependency map, D3
invariants + contradictions, D4 recursive deep dive, D5 forensic
exhaustion. `--agents 3..16`. `--monotropic` selects one critical
subsystem and drives it to saturation before expanding.
`--whole-system` builds complete cartography then prioritised depth.
`--patterns` finds repeated structures, inconsistencies, anomalous
implementations, missing symmetry. `--precision` focuses on
terminology, units, schemas, boundaries, exact requirements. Forensic
mode maximises evidence, chronology, reproduction, provenance,
falsification.

### 126–129. Terminology, repository structure, ADHD bridge, shared
orchestrator package

Avoid "high functioning," "low functioning," severe/mild as identity
shorthand, "autistic superpower," "savant mode" in the project's own
generic framing. Suggested repository layout (README, LICENSE,
SECURITY.md, CONTRIBUTING.md, CODE_OF_CONDUCT.md, EVALS.md, AGENTS.md,
skills/autistic/{SKILL.md, references/, frames/, schemas/}, src/{...},
bench/, tests/, fixtures/, documentation/). Support direct import of
`adhd-agent` where installed; do not duplicate ADHD's divergence engine
unnecessarily. Consider eventually a shared `neurodivergent-agent`
package (ADHD, AUTISTIC, router) while keeping standalone packages
independently usable.

### 130–147. CLI, programmatic API, GitHub/PR/issue modes, stalled-
agent monitoring, loop detection, resume support, final quality
review, simplicity review, output philosophy, completion states,
stress test, ADHD-vs-AUTISTIC eval, no cherry-picking

```
autistic "why does this service intermittently lose state?"
autistic --forensic "audit this repository"
autistic --monotropic --focus auth "find the race"
autistic --adhd-first "design the best queue architecture"
```

```js
const result = await autistic.run({
  problem, context, mode: "forensic", depth: 4, adhdFirst: false
});
```

Support repository review (`/autistic audit repo`), PR mode
(`/autistic pr` — what changed, what indirectly depends on it, what
assumptions changed, what tests prove the blast radius is safe), and
issue mode (reproduce wording, extract symptoms, build hypotheses,
inspect relevant code, rank tests by information gain). Monitor agent
status: ACTIVE, WAITING, SATURATED, STALLED, LOOPING, FAILED, COMPLETE.
If an agent repeatedly examines the same evidence, repeats the same
hypothesis, or generates no new finding, terminate or redirect —
non-negotiable. Checkpoint attention tunnels so work can resume. Final
quality review by fresh agents: System Reviewer, Evidence Reviewer,
Simplicity Reviewer, Adversarial Reviewer. After deep analysis, ask what
can now be removed. Internal reasoning may be extensive; user-facing
output should be distilled — do not dump forty agent reports unless
requested. Default output: system understood, critical architecture,
hidden assumptions, dependencies, contradictions, edge cases, failure
modes, verified findings, recommendation, implementation sequence,
tests that prove it, remaining uncertainty. Do not declare success with
a critical assumption unresolved, a critical contradiction unresolved, a
core requirement unmapped, a major claim unverified, a test failure, or
an unknown root cause. Completion states: DISCOVERY, MAPPED, DEEPENING,
CHALLENGED, VERIFIED, IMPLEMENTATION_READY, IMPLEMENTED,
REGRESSION_VERIFIED. Before release, run at least ten stress-test
scenarios: obscure concurrency bug, hidden database mismatch,
contradictory API contract, security trust-boundary failure, missing
requirement, performance cascade, integration version mismatch,
misleading documentation, config failure, cross-module behavioural
inconsistency. For each, run BASELINE, ADHD, AUTISTIC, and
ADHD+AUTISTIC, and publish raw results — keep failed benchmark results,
do not only publish scenarios where AUTISTIC wins.

### 148. Final build requirement

Claude must not merely write these files. It must implement, compile,
test, benchmark, compare with ADHD, inspect failures, repair defects,
and rerun benchmarks.

### Final principle

ADHD exists to prevent premature convergence. AUTISTIC exists to
prevent premature understanding. ADHD says: keep looking outward.
AUTISTIC says: keep looking inward until the model holds together. ADHD
finds options. AUTISTIC finds structure. ADHD asks *what else?* AUTISTIC
asks *why? exactly where? what depends on that? is that always true?
what breaks at the boundary? what contradicts it? what evidence proves
it? what did we miss?* — then keeps asking until further investigation
stops changing the material understanding of the system.
