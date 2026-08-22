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
