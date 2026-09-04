# ADHD ↔ NEURODIVERSITY bridge

## Why a bridge, not a merger

ADHD maximises divergence: novelty, lateral transfer, candidate
generation. NEURODIVERSITY maximises depth: precision, dependency
understanding, contradiction detection, falsification. Neither
subsumes the other — a wide set of unverified options is not the same
deliverable as one deeply verified answer, and forcing them into a
single loop would strangle whichever phase went second (this is the
same reason ADHD itself keeps diverge and converge as strict separate
phases — see `~/.claude/skills/adhd/SKILL.md`).

## Shared handoff shape

ADHD's output object, unchanged:

```json
{
  "ideas": [...],
  "clusters": [...],
  "traps": [...],
  "shortlist": [...],
  "deepened": [...],
  "nonObviousPick": {...}
}
```

NEURODIVERSITY's result object (`../schemas/result-schema.json`):

```json
{
  "systemMap": {},
  "requirements": [],
  "assumptions": [],
  "dependencies": [],
  "invariants": [],
  "attentionTunnels": [],
  "patterns": [],
  "contradictions": [],
  "edgeCases": [],
  "failureModes": [],
  "unknowns": [],
  "verifiedFindings": [],
  "recommendations": [],
  "tests": [],
  "confidence": {}
}
```

Both are typed JSON, not prose — the bridge is a data transform, not a
re-reading of a paragraph summary.

## ADHD → NEURODIVERSITY: verify the wide set

```
PROBLEM → ADHD DIVERGENCE → 30 CANDIDATES → ADHD CONVERGENCE
        → 3 CANDIDATES → NEURODIVERSITY SYSTEM MODEL → DEEP ANALYSIS PER CANDIDATE
        → FALSIFICATION → COMPARISON → FINAL DECISION
```

For each of ADHD's shortlisted candidates, NEURODIVERSITY runs a scoped
version of Phase 0–4 against *that candidate as the proposed system*:
assumptions it requires, dependencies it introduces, invariants it must
preserve, failure modes, edge cases, security/operations concerns,
rough implementation cost, and a verification plan. The comparison
across candidates uses the same evidence-graph and confidence-
calibration machinery as any other NEURODIVERSITY output — a candidate that
"feels" more exciting from the ADHD phase gets no credit for that here.

## NEURODIVERSITY → ADHD → NEURODIVERSITY: escape a dead end

Used when NEURODIVERSITY finds a precisely-defined structural problem with no
obvious fix — the depth-first pass has done its job (the failure is
understood, not vague) but hasn't produced a way forward, which is
outside its job description.

```
NEURODIVERSITY → PRECISELY DEFINED FAILURE → ADHD → WIDE SOLUTION SEARCH
         → NEURODIVERSITY → VERIFY OPTIONS
```

The handoff artifact from the first NEURODIVERSITY pass to ADHD should be the
failure statement plus its evidence graph — ADHD's frames diverge more
usefully against a precisely stated problem than a vague one, so don't
hand off the raw tunnel transcript, hand off the distilled failure.

## Loop mode: `/adhd-neurodiversity --loop`

```
UNDERSTAND → EXPLORE → VERIFY → FIND NEW PROBLEM → EXPLORE → VERIFY → ...
```

`UNDERSTAND` and `VERIFY` are NEURODIVERSITY phases; `EXPLORE` is ADHD.
Stop the loop at analytical saturation (no phase in the last full cycle
changed the system model or shortlist materially) or at a pre-agreed
Agent-call budget — state which one triggered the stop in the output,
don't just stop silently.

## Routing heuristics (expanded from SKILL.md's table)

- "Give me ten ideas for X" → ADHD only. No depth requested yet.
- "Why is this production bug happening" → NEURODIVERSITY only. There's
  nothing to diverge on; the ask is for a correct explanation, not
  options.
- "Design the best architecture for X" → ADHD → NEURODIVERSITY. Generate wide,
  then verify the leading candidates deeply before committing.
- "Audit this repository thoroughly" → NEURODIVERSITY only. Divergence adds
  nothing to an audit; depth and coverage are the whole ask.
- "This architecture is fundamentally wrong, find a genuinely different
  approach" → NEURODIVERSITY → ADHD → NEURODIVERSITY. NEURODIVERSITY first to precisely
  state *why* it's wrong (so ADHD doesn't diverge against a vague
  complaint), then ADHD to search wide, then NEURODIVERSITY to verify.

When the ask doesn't clearly match a row, default to NEURODIVERSITY only —
it's the more conservative choice for anything that reads as
investigation rather than ideation.
