# Pattern analysis, outliers, and consistency

## Pattern expectation engine

Infer the repository's own conventions from repetition, then check
whether every instance actually follows them. If five modules use
`service / repository / validator / controller` and a sixth omits the
validator, that's an anomaly worth a finding — not necessarily a bug,
but something that needs an explicit reason (deliberate simplification?
oversight? different risk profile for that module?).

**Outlier detector.** Not every deviation from an established pattern is
an error. Each one needs an explanation before being cleared:

- Deliberate — the module has a documented reason to differ.
- Drift — the pattern changed over time and old code wasn't migrated.
- Oversight — nobody applied the pattern here; likely a real gap.

Only the last one is automatically a finding. The other two are still
worth recording (drift especially, since it often predicts where the
*next* inconsistency will appear), just not automatically flagged as
wrong.

## Nomenclature vs semantic consistency

Check naming, casing, identifiers, enum values, terminology, and status
language for fragmentation of what should be one concept:

```
cancelled   canceled   cancel   CANCELLED
```

Text matching alone under- and over-reports here. The more important
check is **semantic consistency**: do apparently different names
actually represent the same concept (`user.status = 'inactive'` vs
`account.is_disabled` vs `member.suspended_at != null` might all be
tracking the same underlying state, inconsistently)? And the inverse:
does one name quietly cover two different concepts in different places?

## Data contracts and field lifecycle

For every data object that crosses a boundary (module, service,
storage), track:

```
CREATOR SCHEMA VALIDATOR TRANSFORMERS STORAGE CONSUMERS
SERIALISATION VERSION
```

For critical fields specifically, trace the full lifecycle:

```
CREATED → VALIDATED → MUTATED → PERSISTED → TRANSMITTED → DISPLAYED → DELETED
```

A field that's validated on creation but never re-validated after a
later mutation step is a common and easy-to-miss gap — the lifecycle
trace is what surfaces it, a point-in-time read of the schema won't.

## Nullability, unit, and cross-representation consistency

Compare the same conceptual field's nullability across every
representation it appears in: database schema, type system (e.g.
TypeScript), API schema, frontend model, tests. Disagreements here are a
frequent, quiet source of null-handling bugs that don't show up until a
specific code path is hit.

Track units explicitly wherever a value could be ambiguous:

```
milliseconds vs seconds     bytes vs kilobytes
degrees vs radians          currency minor vs major units
```

A mismatch here is usually silent (both sides compile, both sides run,
the number is just wrong by a fixed factor) — treat any boundary where a
raw number crosses between two components as worth an explicit unit
check, not just an existence check.
