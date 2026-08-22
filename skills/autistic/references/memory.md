# Cross-run memory ledger

AUTISTIC has no memory by default: every run rebuilds the system map
and rediscovers every invariant and contradiction from scratch, even
against the same repo it analysed yesterday. For a repo that gets
audited repeatedly (recurring `/autistic audit repo` runs, or repeated
production-bug investigations in the same codebase), that's wasted
depth — the highest-value use of a second run is going deeper than the
first, not re-deriving what's already confirmed.

## The ledger file

A confirmed-finding ledger lives at `.autistic/memory.json` **in the
target repo being analysed** (not in this skill's own directory, and
not in the user's global Claude memory — it travels with the repo, so
it's available regardless of which machine or session runs AUTISTIC
against it next). Shape: `schemas/memory-ledger.schema.json`.

```json
{
  "repo": "descriptive name or path, for sanity-checking on load",
  "lastUpdated": "ISO date of the run that last wrote this",
  "invariants": [
    { "rule": "...", "confidence": 0.9, "evidence": ["file.ts:42"], "confirmedRuns": 2 }
  ],
  "contradictions": [
    { "description": "...", "status": "open|resolved", "sources": ["README.md", "src/x.ts"] }
  ],
  "assumptions": [
    { "claim": "...", "verified": true, "blastRadius": "high" }
  ],
  "loadBearingNodes": [
    { "name": "...", "score": 7.2 }
  ]
}
```

## Read: Phase 0

At the start of System Cartography, check whether `.autistic/memory.json`
exists in the target repo. If it does:

- Load it and treat its `invariants`/`assumptions` as **prior evidence,
  not settled fact** — a repo changes between runs, so re-verify
  anything the current investigation actually touches rather than
  trusting the ledger blindly. But don't re-derive from zero what the
  ledger already found unless a Phase 2 tunnel specifically needs to
  re-confirm it (e.g. because the touched code changed).
- Use `loadBearingNodes` to seed Phase 0's load-bearing scoring instead
  of computing it cold — still re-score if the current cartography pass
  finds the graph has materially changed shape.
- If the ledger's `lastUpdated` is old relative to the repo's own git
  history (the repo has commits since), treat every entry as lower
  confidence than its stored value until re-touched by this run — stale
  memory about a codebase that's moved on is worse than no memory.

## Write: Phase 4 (Synthesis)

After synthesis, update `.autistic/memory.json`:

- Add newly confirmed invariants/contradictions/assumptions from this
  run's `verifiedFindings`.
- For an invariant/assumption already in the ledger that this run
  re-confirmed, increment `confirmedRuns` rather than duplicating the
  entry.
- For a ledger entry this run's evidence actually **contradicts** (the
  code changed and the old invariant no longer holds), do not silently
  overwrite it — mark it `superseded` with a pointer to the new finding,
  so a human skimming the ledger's history can see that something that
  used to be true stopped being true, not just that it's now different.
- Only write entries with real evidence (`verifiedFindings`, not
  `unknowns` or unresolved candidates) — the ledger is a record of what
  AUTISTIC has actually confirmed, not a scratchpad of everything it
  considered.

## What this is not

Not a substitute for the git history, and not a place to record
implementation details or recommendations — just the durable facts
about the system (invariants, contradictions, assumption status,
load-bearing structure) that are expensive to re-derive and don't
change every commit. If a project already has this file, don't
recreate its concepts elsewhere (e.g. don't also start writing
invariants into a README) — one ledger.
