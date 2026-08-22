# Monotropism, hyperfocus, and why AUTISTIC is depth-first

## The theory, briefly, and its limits

Monotropism is an autistic-led theory of attention (Dinah Murray, Wenn
Lawson, and later Fergus Murray / the National Autistic Society's
write-up of it) proposing that attention tends to pull toward a smaller
number of interests at a time, with more resources per channel, rather
than spreading evenly and switching cheaply between many. It is offered
by its own proponents as a theory of *attention distribution*, not a
universal description of autistic cognition — plenty of autistic people
do not recognise themselves in it, and non-autistic people can be highly
monotropic too. Older "weak central coherence" framings — the idea that
autistic cognition is inherently worse at global/whole-picture
processing — have been substantially revised by later work toward a more
specific *detail-focused processing bias* rather than an inability to
process global meaning (see e.g. Happé & Frith's later writing on weak
coherence).

This skill borrows the *mechanism* — sustained single-channel focus with
deliberate, costed switching — as an engineering strategy, and borrows
the corrective from the later research — detail focus must not come at
the cost of the global model — as a hard requirement (Phase 2, step 4 in
SKILL.md). It does not assert that this is how autistic people in
general think, and it does not need to be true as a claim about autistic
cognition to be useful as a reasoning architecture.

## Why this matters for the skill's design, concretely

Two failure modes sit on either side of this mechanism, and the skill is
built to avoid both:

1. **Context-switch thrash** (the failure breadth-first divergent-
   ideation agents fall into when misapplied to depth work): jumping to whatever
   the most recently discovered issue is, never finishing an
   investigation, producing a wide shallow list of "concerns" with no
   verified root cause. The Monotropic Focus Engine's ranking step
   (`DETAIL_VALUE = impact × uncertainty × reach`) and the interrupt
   queue (`URGENT/HIGH/NORMAL/DEFER`, only `URGENT` preempts) exist
   specifically to prevent this.
2. **Hyperfocus tunnel vision**: the opposite failure. Depth without a
   stopping condition burns the whole budget on the seventeenth
   subtlety of a minor helper function while a load-bearing question —
   or a fire — sits untouched. This is the more autistic-analysis-
   specific risk and the reason the **hyperfocus safety valve** in
   SKILL.md Phase 2 is written as a hard gate ("non-negotiable"), not a
   suggestion.

## Hyperfocus safety valve — operational detail

Trigger `HYPERFOCUS_CHECK` when *any* of these hold for the active
tunnel:

- The last two subquestion tiers re-examined the same file, function, or
  piece of evidence without producing a new fact.
- Information gain is diminishing: the last tier's findings did not
  change confidence, did not surface a new dependency, and did not
  change the system map.
- The tunnel's subject scored low on load-bearing weight in Phase 0 (a
  leaf node, not a hub) and depth has already exceeded 3 tiers.
- The reasoning has become recursive — restating the same open question
  in different words rather than narrowing it.

`HYPERFOCUS_CHECK` asks one question: *is this still the highest-value
unresolved question in the whole investigation, compared against
everything currently in the candidate list and interrupt queue?* If no,
close the tunnel at its current depth (log
`WHERE_WE_WERE/WHAT_WAS_RESOLVED/WHAT_REMAINS/WHY_SWITCHING`) and open
the next-ranked one. This is symmetric with divergent ideation's own
anti-pattern of "convergence disguised as divergence" — here the
matching failure is "depth disguised as progress."

## Detail-value scoring

`DETAIL_VALUE = IMPACT × UNCERTAINTY × REACH`, each roughly 0–3:

- **Impact**: how much does correctness/safety/user outcome depend on
  this being right?
- **Uncertainty**: how far are we from confident, evidenced knowledge of
  it right now?
- **Reach**: how many other claims, components, or findings depend on
  this one (blast radius)?

Low-`DETAIL_VALUE` minutiae get parked, not investigated — note them in
the interrupt queue at `DEFER` rather than silently dropping them, since
"parked" must stay recoverable, not forgotten.

## Terminology this project avoids

Per the neuroaffirming design rule: no "high functioning" / "low
functioning" as identity shorthand in the skill's own generic framing,
no "autistic superpower," no "savant mode," no claim that all autistic
people share one cognitive style. Where the project's own author
describes themself in first person (see the repo README's author's
note), that is their own self-identification and is quoted as given —
this rule governs how the *skill* talks about autistic people in
general, not how a real person is allowed to describe themself.
