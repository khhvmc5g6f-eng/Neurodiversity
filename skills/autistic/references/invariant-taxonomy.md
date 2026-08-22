# Invariant discovery taxonomy (Invariant Guardian)

## Why this exists

SKILL.md's Phase 3 invariant pass reads "what rules must hold across
all valid states? Then actively look for paths that could violate
them." That second sentence is the same shape of gap STRIDE closed for
security: "actively look for X" with no enumerated categories to walk,
so violation-search depends entirely on whatever the agent happens to
think of, rather than a systematic sweep. Invariant violations are
frequently the actual root cause AUTISTIC exists to find — this pass
runs in nearly every profile set (repository audit, production bug,
architecture review), so a vague method here has outsized cost.

## The taxonomy: invariant classes

Adapted from design-by-contract's standard invariant categories. For
every data store, state machine, and critical field Phase 0's system
map already found, ask which of these classes actually apply — not
every class applies to every node, and forcing a fit where none exists
produces noise, not findings:

| Class | The question, asked literally |
|---|---|
| **State invariants** | Are there states this entity must never be in (e.g. `cancelled` and `active` simultaneously), and is that actually prevented, or just assumed? |
| **Referential / uniqueness invariants** | Must a reference always point to something that exists? Must a value always be unique? Is that enforced (a real constraint) or just intended (an application-level check that can be bypassed)? |
| **Conservation / sum invariants** | Is there a quantity that must balance (money in = money out, total allocated ≤ total available)? Where is that actually checked, if anywhere? |
| **Temporal / ordering invariants** | Must certain events always happen before others (payment before fulfillment, auth before authorization)? Can the ordering be violated by a race, a retry, or an out-of-order delivery? |
| **Resource-bound invariants** | Is there a quantity that must stay within a bound (queue depth, connection pool size, rate limit)? What actually enforces the bound, and what happens at the edge of it? |
| **Mutual-exclusion invariants** | Must at most one thing be true/active/holding a resource at a time (single active session, single in-flight refresh, single owner of a lock)? What actually guarantees that, mechanically? |

## Hypothesis, then evidence

Each (node × applicable class) pair is a **hypothesis about what
invariant should hold**, not an assumption that it does. Check it
against the code/schema/system, same three-way discipline as
`threat-taxonomy.md` and `production-readiness.md`:

- **Confirmed violated** — a concrete path exists that breaks the
  invariant (no unique constraint backing an application-level check,
  no transaction wrapping a conservation-sensitive update, a race that
  lets two things hold a lock meant to be exclusive). Real finding,
  with the exact path as evidence.
- **Confirmed held** — a concrete mechanism enforces it (a real
  database constraint, a real transaction boundary, a real mutex).
  Worth recording briefly, not just silently passing over it.
- **Unresolved** — the invariant is plausible but nothing in scope
  proves or disproves it (enforcement lives in a layer not shown, e.g.
  a database's own constraints when only application code was
  reviewed). Say so rather than assume either way.

## Scope discipline

Run against nodes cartography already found — don't invent a data
store or state machine to have something to apply the taxonomy to. Not
every class applies everywhere: a stateless pure function has no state
invariant to check; a single-writer system has no mutual-exclusion
question worth asking. Skip classes that plainly don't apply rather
than forcing all six against every node — that produces exactly the
padded, low-signal output `SKILL.md`'s Output philosophy already warns
against.
