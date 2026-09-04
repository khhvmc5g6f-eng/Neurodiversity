# Divergence frames

Fourteen vantage points for Phase D (Divergent Ideation — see
`../references/divergence.md`). Each is a reasoning strategy for
generating a wide, non-obvious candidate set, not a specialist analysis
lens — contrast with `cognitive-profiles.md`, whose profiles verify and
narrow rather than generate. Pick 5 per Phase D run using the selection
guidance below; each becomes the vantage prompt for one isolated,
parallel generator Agent call.

| Frame | Vantage prompt | Tags |
|---|---|---|
| **Constraint remover** | Name the constraint everyone here treats as fixed — the framework, the datastore, the request/response shape, the network itself. Imagine it doesn't exist. What becomes possible? | code, design, wild |
| **Adversary** | You are trying to break, exploit, or sabotage the obvious solution. Generate the failure paths, then invert each one into a design idea that closes it. | code, design |
| **Naive outsider** | You have never seen this domain's conventions and don't know what "normal" looks like here. Describe the unencumbered approach a smart newcomer would try first. | general, wild |
| **Physical systems engineer** | Re-ask this as a problem of latency, throughput, physical layout, and timing budget — as if it had to run on hardware with real constraints, not an abstract compute model. | code, wild |
| **Biological transplant** | Borrow a mechanism from a living system — immune response, swarm coordination, cellular signaling, evolutionary pressure — and force-fit it onto this problem, literally. | code, wild |
| **Logistics operator** | Borrow a mechanism from physical logistics — batching, hub-and-spoke, just-in-time, buffering, last-mile handoff — and apply it literally to this problem's data or control flow. | code, design |
| **Market maker** | Model this as a market: buyers, sellers, an auction, a clearing mechanism, price discovery. What does that structure suggest here? | design, wild |
| **Inversion** | State the opposite of the goal. Brainstorm how to guarantee that opposite outcome, then negate each answer back into a candidate for the real goal. | code, design, general |
| **Zero-budget extreme** | No budget, no team, one hour. What is the crudest version that still does the one load-bearing thing this needs to do? | code, general |
| **Unbounded extreme** | Unlimited compute, unlimited engineers, a decade. What does the maximalist version of this look like, with no near-term constraint at all? | design, wild |
| **Regulator / auditor** | You audit systems for compliance, traceability, and failure accountability. What here must be provable or refusable, and what design makes that possible? | design, general |
| **Emergent / decentralized** | There is no central coordinator — only many simple local agents following local rules. How would this problem solve itself without anyone directing it? | code, wild |
| **On-call engineer** | You are the person paged at 3am when this breaks. What design would mean this specific failure never pages anyone? | code, design |
| **Game designer** | Treat this as a game system: loops, rewards, friction, save-states, and the shortcuts a motivated player would find. What does that framing surface? | design, general |

## Picking frames

For code-shaped problems: 4 frames tagged `code` or `design`, plus at
least 1 tagged `wild` — the wild pick is what keeps the candidate set
from collapsing into minor variations of the obvious answer. For open
product/strategy problems: draw from all tags. Vary the specific picks
run to run rather than always reaching for the same 5 — unlike Phase 1's
profile selection (chosen for fit to the problem), Phase D selection is
chosen partly *for* variety, because the point of this phase is breadth,
not precision.

## Calibration

- **How wide?** Scale to stakes. A quick naming decision: 3 frames × 4
  ideas. A genuine product/architecture direction: 5 frames × 6-8 ideas.
  Default: 5 frames × 6 ideas ≈ 30 candidates.
- **How weird is too weird?** For serious decisions, keep wild-frame
  output clearly labeled as such so it doesn't read as a real proposal
  by accident. For open brainstorming, let it run looser — an absurd
  candidate earns its place if it seeds a viable one at the clustering
  step.
- **When has the space been mapped?** Stop diverging when new candidates
  start repeating the shape of ones already generated. Don't pad the
  count to hit a target number once the space is actually covered.
