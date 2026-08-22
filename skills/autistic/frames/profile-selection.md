# Profile selection heuristics

Unlike ADHD's frame picking (which deliberately varies to widen the
candidate pool), AUTISTIC selects profiles *for* the problem, not
against it. Don't rotate for variety's sake — a repository audit gets
the repository-audit set every time, because the set is chosen for fit,
not novelty.

| Problem shape | Profiles (in priority order) |
|---|---|
| Repository / pre-merge audit | Systemiser, Detail Forensic, Pattern Analyst, Consistency Auditor, Completionist |
| Production bug, root cause unknown | Monotropic, Detail Forensic, Invariant Guardian, Exception Hunter, + Temporal Analyst, Failure Analyst running the FMEA walk (failure-mode-taxonomy.md) |
| Architecture review / design decision | Systemiser, Invariant Guardian running the invariant-class walk (invariant-taxonomy.md), Consistency Auditor, + Failure Analyst (FMEA), Operations Analyst running the PRR walk (production-readiness.md) |
| Requirements review | Literalist, Completionist, Consistency Auditor |
| Security-focused pass | Invariant Guardian, Exception Hunter, + Security Analyst running the STRIDE walk (threat-taxonomy.md), Consistency Auditor |
| Data/schema audit | Pattern Analyst, Consistency Auditor, Detail Forensic (nullability, units — see patterns.md) |
| Large/noisy context (many files, long history) | Sensory-Noise Analogue first (to triage), then whichever set fits the triaged scope |

## How to pick when nothing matches exactly

1. Start from the closest row above.
2. Always include exactly one of `Monotropic` or `Systemiser` — the run
   needs either a depth anchor or a rule-extraction anchor, and running
   without either tends to produce a list of loose observations instead
   of a structured model.
3. Add `Completionist` whenever the ask includes anything like "is this
   ready," "what's missing," or "audit."
4. Cap at 5 for a `--standard` run; `--forensic` may use more, but
   justify each addition against the problem, not against "more
   coverage is always better" — an unjustified sixth lens usually
   produces redundant findings that just cost another Agent call without
   adding a new angle.

## What NOT to do

Do not pick profiles the way ADHD picks frames (bias toward variety,
always include one wild card). A "wild card" lens on a production
incident wastes the run's budget on an angle the problem doesn't need.
If a wide, unconstrained search for *angles* is actually what's wanted,
that's the ADHD → AUTISTIC route (see `../references/adhd-bridge.md`),
not a reason to make AUTISTIC's own selection random.
