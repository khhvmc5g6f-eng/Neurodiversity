# Edge-case taxonomy (Exception Hunter)

## Why this exists

Exception Hunter was described as "search for the one path that
violates the pattern," with no enumerated categories to search
through — the same shape of gap closed for the other lenses, at lower
severity since edge cases are usually a narrower blast radius than a
missing invariant or a security boundary. Grounded in classic boundary-
value analysis (the standard software-testing technique for
enumerating where a rule is most likely to break), not invented from
scratch.

## The taxonomy: boundary categories

For a value, collection, or state established as following a rule
elsewhere in the system (from Pattern Analyst's or Systemiser's
findings), walk:

| Category | The question, asked literally |
|---|---|
| **Null / absence** | Does the rule's implementation actually handle the value being null, undefined, or missing — or does it assume presence? |
| **Zero / empty** | Does it handle a zero quantity, an empty string, or an empty collection, or does it assume at-least-one? |
| **Negative / below-range** | Does it handle a negative number or a below-minimum value, or does it assume non-negative? |
| **Maximum / overflow** | Does it handle the largest realistic value (or a value beyond a numeric type's safe range), or does it assume comfortably-sized input? |
| **Single-element** | Does it handle a collection of exactly one item — where "first" and "last" are the same element — or does it assume at-least-two? |
| **First / last position** | Does it handle the first or last element of an ordered sequence correctly, where an off-by-one is most likely to hide? |
| **Duplicate / collision** | Does it handle two logically-identical-but-distinct entries (same key, same value, same timestamp), or does it assume uniqueness that isn't actually enforced? |
| **Encoding / type coercion** | Does it handle unicode/multi-byte input, or a value that silently coerces to a different type (a numeric string, a stringly-typed boolean), the way the rule's happy-path example didn't? |

## Hypothesis, then evidence

Same three-way discipline as the other systematic passes: each
(rule × category) pair is a hypothesis, checked against the actual
code/behavior — **confirmed** (a real path where the category breaks
the stated rule), **ruled out** (the code explicitly guards against
it), or **unresolved** (can't tell from what's in scope).

## Scope discipline

Only walk categories that are plausible for the specific rule/value in
question — a boolean flag has no "maximum/overflow" question, a
required non-nullable field established at compile time has no "null"
question worth re-litigating. Skip what doesn't apply; this is a
narrow-blast-radius lens, so don't let it balloon into checking all
eight categories against every value in scope.
