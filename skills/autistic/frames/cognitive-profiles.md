# Cognitive profiles

Ten configurable analytical lenses. Each is a reasoning strategy, not a
claim about how autistic people think — see
`../references/monotropism.md`. Pick 3–5 per run using
`profile-selection.md`; each becomes the vantage prompt for one isolated
specialist Agent call.

| Profile | Vantage prompt |
|---|---|
| **Monotropic** | You sustain maximum depth on one subject rather than surveying many. Pick the single highest-value unresolved question here and drive it to saturation — subquestion, subquestion, invariant, edge case, verification — before considering anything else in scope. |
| **Systemiser** | You think in explicit rules, inputs, outputs, and transformations. For every behavior you examine, state the rule that governs it as an IF/THEN/ELSE, not a vague description. Where no explicit rule exists, that absence is itself a finding. |
| **Detail Forensic** | You notice fine-grained inconsistencies most readers skim past: off-by-one boundaries, a status enum with one more or fewer value than its callers expect, a comment that no longer matches the code three lines below it. Report the exact location, not the general area. |
| **Pattern Analyst** | You infer the repository's own conventions from repetition, then check every instance against them. Find repeated structures, find the one instance that breaks the pattern, and ask why — deliberate, drift, or oversight. |
| **Invariant Guardian** | You ask, for every claim: what must *always* remain true for this system to be correct? State it as a rule that holds across all valid states, then actively search for a code path that could violate it. |
| **Literalist** | You interpret requirements and documentation exactly as written, with zero inferred convention. Where the wording is ambiguous under a strict reading, say so precisely — quote the exact phrase that creates the gap. |
| **Consistency Auditor** | You compare representations of the same concept across README, code, tests, schema, docs, config, and runtime behavior, and report every place they disagree. |
| **Sensory-Noise Analogue** | You strip irrelevant context and competing signals before analysing. Given a large pile of information, first identify what's load-bearing vs supporting vs background vs pure noise, and analyse only the load-bearing and supporting tiers unless asked otherwise. |
| **Completionist** | You search for what's missing rather than what's present: missing screens, states, permissions, error paths, empty/loading/offline states, or requirements that were mentioned once and never implemented. |
| **Exception Hunter** | You search specifically for behavior that violates the pattern everything else establishes — the one code path, the one input, the one timing window where the rule the rest of the system follows quietly doesn't apply. |

## Supplementary lenses (used inside specific phases, not general-purpose picks)

These appear in SKILL.md's named passes rather than the profile-
selection table, but follow the same isolated-agent-call pattern:

- **Temporal Analyst** — builds the event causality timeline (see
  `../references/debugging.md`).
- **Concurrency Analyst** — the concurrency panel.
- **Failure Analyst** — failure propagation graph, forward and backward.
- **Security Analyst** — runs the systematic STRIDE threat-taxonomy walk
  against Phase 0's security boundaries, not a generic "think about
  security" prompt — see `../references/threat-taxonomy.md`.
- **Operations Analyst** — used in architecture-shape profile sets (see
  profile-selection.md).
- **Evidence Verifier / Falsification Agent** — the claim challenger.
- **Simplicity Reviewer** — the final "now that we understand
  everything important, what can be removed?" pass, run only after
  synthesis, never before (simplifying before understanding just hides
  complexity instead of removing it).
