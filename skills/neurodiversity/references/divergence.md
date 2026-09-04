# Phase D — Divergent Ideation

NEURODIVERSITY is self-sufficient: when an ask calls for breadth (options,
alternatives, "what else could this be") as well as, or instead of,
depth, it runs Phase D internally rather than handing off to a separate
skill. Depth without breadth answers "is this one design correct";
breadth without depth answers "what are the candidates" — a repository
audit or root-cause investigation needs only depth (skip straight to
Phase 0), but a genuine design/architecture/naming decision needs both,
in that order.

## Why a separate phase, not a blended one

Generating candidates and critiquing them are different cognitive
modes, and running them together kills idea quality — the critic
suppresses the generator before it has produced anything worth
critiquing. Phase D keeps them strictly separate, mirroring the same
generator/critic split the rest of this skill already uses between
"harvest an assumption" and "verify it": **Diverge** (generation, no
evaluation) always completes fully before **Focus** (evaluation,
clustering, selection) begins.

## Diverge (no critic)

1. Pick 5 frames from `../frames/divergence-frames.md` for the stated
   problem P.
2. Spawn 5 **parallel, isolated** Agent calls, one per frame. Each call
   receives only: the problem statement, any context the user gave, and
   the chosen frame's vantage prompt. Nothing else — no shared context,
   no visibility into the other 4 calls' output.

   Instruction for each generator call:

   > You are generating candidates, not evaluating them. Produce 6 short,
   > distinct ideas under this vantage point. Each idea is one phrase or
   > one sentence. Do not rank, critique, or hedge. The first three
   > obvious answers anyone would give are excluded by construction —
   > this frame exists to reach past them. Output a JSON array only:
   > `[{"text": "...", "rationale": "..."}, ...]`

3. **Isolation is load-bearing, not incidental.** If one branch's output
   leaks into another branch's context, both branches anchor on it and
   the method degrades to one wider single thought instead of 5
   genuinely independent angles. Use separate Agent/Task calls for this
   exact reason — it's the same "mechanical role separation, not
   persona theatre" rule SKILL.md's Anti-patterns section already states
   for Phase 1's specialist profiles, applied to generation instead of
   analysis.

## Focus (critic on)

Runs only after every Diverge call has returned.

1. **Score.** Rate each candidate 0–10 on: novelty (distance from the
   obvious default), viability (could this actually ship), fit (does it
   address the stated problem). Flag any candidate that looks attractive
   but is a trap — hidden cost, false economy, doesn't actually scale,
   premature abstraction — with a one-line reason. A trap is a real,
   scored finding, not a discard; it stays visible in the output.
2. **Cluster.** Group the full candidate pool into 3–6 clusters by
   underlying angle, not surface keywords — label each cluster by what
   it's actually betting on ("remove the coordinator", "batch-and-defer",
   "push the decision to the edge"), not by which frame produced it.
3. **Shortlist.** Rank by `novelty × 0.35 + viability × 0.40 + fit ×
   0.25`, excluding flagged traps, and take the top 2–4. Mark the single
   most non-obvious-but-viable pick explicitly — the candidate a
   generic pass would have missed entirely.
4. **Deepen the shortlist.** For each shortlisted candidate, spawn one
   isolated Agent call producing: a 4–8 sentence sketch of how it would
   actually work, the load-bearing risk, the first concrete step a
   builder would take, and 3–5 child ideas (variations, hybrids, things
   it unlocks).

## Handing shortlisted candidates to depth (Phase D → Phase 0–4)

When the ask was "design the best approach for X" rather than pure
ideation, Phase D's shortlist feeds directly into System Cartography:
run a scoped Phase 0–4 pass against *each shortlisted candidate as the
proposed system* — the assumptions it requires, the dependencies it
introduces, the invariants it must preserve, its failure modes and edge
cases, security/operations concerns, and a verification plan. The
comparison across candidates uses the same evidence-graph and
confidence-calibration machinery as any other NEURODIVERSITY finding — a
candidate that scored well in Focus gets no extra credit for that once
depth analysis starts; only evidence counts from here on.

```
PROBLEM → DIVERGE (30 candidates) → FOCUS (shortlist of 2-4)
        → SYSTEM CARTOGRAPHY PER CANDIDATE → DEEP ANALYSIS
        → FALSIFICATION → COMPARISON → RECOMMENDATION
```

## Escaping a dead end (Phase 0–4 → Phase D → Phase 0–4)

Used when a depth-first pass has precisely characterized a structural
problem but produced no viable way forward — the failure is understood,
not vague, but a fix isn't falling out of further depth on the same
system. Hand the *distilled failure statement plus its evidence*, not
the raw tunnel transcript, into Phase D — frames diverge more usefully
against a precisely stated problem than a vague complaint. Then verify
the resulting shortlist through Phase 0–4 as above before recommending
anything.

```
DEPTH PASS → PRECISELY DEFINED FAILURE → DIVERGE → WIDE SOLUTION SEARCH
           → DEPTH PASS ON SHORTLIST → VERIFY → RECOMMENDATION
```

## Loop mode: `--diverge-loop`

```
UNDERSTAND → EXPLORE → VERIFY → FIND NEW PROBLEM → EXPLORE → VERIFY → ...
```

`UNDERSTAND` and `VERIFY` are ordinary depth phases; `EXPLORE` is Phase
D. Stop at analytical saturation — no phase in the last full cycle
changed the system model or shortlist materially — or at a pre-agreed
Agent-call budget; state explicitly which one triggered the stop, don't
just stop silently.

## Output shape (when Phase D ran)

Render as its own labeled section before the standard Output shape
(SKILL.md), in this order:

1. **Brief.** One or two lines confirming the problem and any reframe
   used.
2. **Wide set.** The full candidate pool grouped by cluster, each
   candidate as one short phrase with its score chip (`N7 V8 F9`).
3. **Converge.** The shortlist with the reason each made it, the
   non-obvious-but-viable pick marked explicitly, and traps listed
   separately with their one-line reason.
4. **Deepened candidates.** Sketch, load-bearing risk, first concrete
   step, and child ideas for each shortlisted candidate.
5. If Phase D fed into depth: continue directly into the standard
   Output shape, now scoped to comparing the deepened candidates.

Structured output populates `divergentOptions` in
`../schemas/result-schema.json` — an array, not prose, whether or not a
depth pass follows.

## Anti-patterns specific to Phase D

- **Convergence disguised as divergence.** Ten minor variations sharing
  one underlying assumption is not a wide candidate set — it's the same
  idea decorated five times. Check cluster labels for this before
  moving to Focus.
- **A pile with no convergence.** Thirty unsorted candidates is exactly
  as useless as one safe answer picked without exploration. Diverge
  wide, but always converge to a real, opinionated shortlist.
- **Refusing to commit.** "Here are twenty ideas, you choose" is a
  cop-out — Focus exists to take a position on what's actually
  promising, with reasons, not to hand the whole unsorted pool back.
- **Skipping isolation.** Writing 5 "branches" sequentially in one
  context, or letting one frame's output influence another's, produces
  a wider single thought, not 5 independent angles. Use real separate
  Agent/Task calls.
- **Letting Focus bleed into Diverge.** A generator call that hedges,
  ranks, or self-critiques mid-generation has already lost the point of
  keeping the phases separate — instruct against it explicitly, and
  discard any candidate set that comes back doing it rather than
  quietly accepting weaker output.
