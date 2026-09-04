# System cartography, the system graph, and the three-layer model

## Why cartography comes before any deep dive

Every later phase (profile selection, tunnel ranking, cross-cutting
passes) reads from the system map. Skipping it doesn't save time — it
just means the first "load-bearing question" chosen in Phase 2 is a
guess instead of a ranked candidate, and the hyperfocus valve has
nothing to rank against.

## What to capture

```
ACTORS COMPONENTS SERVICES DATA STATE DEPENDENCIES EVENTS INTERFACES
EXTERNAL_SYSTEMS CONFIGURATION SECURITY_BOUNDARIES FAILURE_BOUNDARIES
```

## The typed graph

Nodes carry a `kind` (one of the categories above) and a free-text
`name`. Edges carry a `type` from this fixed vocabulary — don't invent
new edge types ad hoc, map to the closest existing one so graphs stay
comparable across runs:

```
CALLS READS WRITES DEPENDS_ON TRIGGERS VALIDATES AUTHENTICATES
AUTHORIZES OBSERVES CACHES TRANSFORMS SERIALISES CONSUMES PRODUCES
OWNS BLOCKS RETRIES INVALIDATES
```

Example:

```
Mobile App --CALLS--> API Gateway
API Gateway --AUTHENTICATES--> (via) Auth Service
API Gateway --WRITES--> Database
API Gateway --PRODUCES--> Event Bus
```

Full JSON shape: `../schemas/system-map.schema.json`.

## Implicit security boundaries — don't only capture the labeled ones

The threat-taxonomy STRIDE pass (`threat-taxonomy.md`) can only walk
`security_boundary` nodes and `AUTHENTICATES`/`AUTHORIZES`/`VALIDATES`
edges that cartography actually found. A boundary that exists in the
system but was never labeled with an obvious auth check is invisible to
it — and an *absent* check is exactly the kind of thing worth finding,
not a reason to skip the node. The `security-trust-boundary` fixture in
the companion repo's benchmark (a client-supplied `x-internal-role`
header trusted for authorization, no middleware wrapping it) is a
worked example: nothing in that code says "auth" anywhere near the
vulnerable line.

For every function/handler/entry point found while mapping the system,
run this checklist, in order:

1. **Does it receive data whose origin is outside this system's
   control?** — HTTP request body/headers/query/cookies, CLI args, file
   contents from a user-writable path, a webhook payload, deserialized
   data, an upstream service response that isn't itself already fully
   trusted.
2. **Does that data, directly or after light transformation, reach a
   sensitive sink?** — a privilege/authorization decision, a financial
   amount, a destructive operation (delete/overwrite), a query executed
   against a datastore, a command executed by the OS/shell, a file path
   used for read/write, or a call to an external system.
3. **If both are yes, this is an implicit security boundary** —
   regardless of whether anything nearby is labeled "auth." Add a
   `security_boundary` node for it, with a short `justification` noting
   which external input and which sensitive sink triggered the
   inference (`schemas/system-map.schema.json`'s `justification`
   field) — record *why* it was inferred, don't silently invent
   boundaries that can't be traced back to evidence.
4. **Check explicitly whether an authorization/validation step actually
   sits between the input and the sink.** If one exists, note it (the
   boundary is real but covered). If none exists, that absence is
   itself a candidate finding for the STRIDE pass's Spoofing and
   Elevation-of-privilege categories — don't just note the boundary and
   move on, feed it directly into Phase 3.

This is cartography work, not the STRIDE walk itself — the checklist
finds where boundaries are; STRIDE (once profile selection includes
Security Analyst) is what systematically interrogates each one across
all six categories.

## Load-bearing component detector

Score every node (relative ranking across the current map is enough —
don't chase false precision):

```
SCORE ≈ CENTRALITY + DEPENDENCY_COUNT + FAILURE_IMPACT
         − REPLACEABILITY − OBSERVABILITY
```

- **Centrality**: how many paths through the graph pass through this
  node?
- **Dependency count**: in-degree + out-degree.
- **Failure impact**: if this node fails, how much of the system stops
  working correctly (not just "throws an error" — silent wrong behavior
  counts too)?
- **Replaceability**: how easily could this be swapped or bypassed?
  Higher replaceability lowers the score.
- **Observability**: how well-instrumented is this node already? Higher
  observability lowers the score — well-observed failures are cheaper to
  diagnose later, so they're lower priority for expensive manual depth
  now.

High scorers are the natural seeds for Phase 2 attention tunnels and get
first claim on `--focus`-directed depth.

## Three-layer model — keep all three populated

- **MICRO**: individual functions, values, statements, fields,
  parameters.
- **MESO**: modules, services, components, interfaces, workflows — the
  relationships between MICRO units.
- **MACRO**: whole-system behavior — architecture, user outcome,
  scalability, governance, operational implications.

A tunnel that never surfaces back to MACRO has lost the plot even if
every MICRO fact in it is correct. This is why Phase 2 mandates a global
coherence check every 2–3 tiers: *does this finding materially change
the whole-system model?* If MICRO evidence contradicts the MACRO model
built in Phase 0, the MACRO model is what changes — never force new
evidence to fit an earlier architecture assumption just because the
assumption was written down first.

## Change impact & blast-radius prediction

For any proposed or actual code change, walk the graph outward from the
changed node:

```
CHANGE → DIRECT_EFFECT → DEPENDENCIES → DATA → UI → TESTS → OPERATIONS
```

Predict the affected set *before* changing shared/high-load-bearing
components; after the change, verify the predicted set actually covers
what moved. A prediction that turns out too narrow is itself a finding
about the system map being incomplete — feed it back into Phase 0's
graph, don't just quietly widen the blast radius note and move on.
