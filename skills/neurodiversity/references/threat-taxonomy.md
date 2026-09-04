# Systematic threat taxonomy (STRIDE)

## Why this exists, and why it isn't "roleplay as an attacker"

Stress-testing NEURODIVERSITY's depth-first phases against problems shaped
by divergent-framing parameters (hostile-attacker framing,
extreme-constraint framing, inversion, trap-detection, breadth-routing —
see `divergence.md`'s frame table) found the depth-first phases strong
across the board except one specific, repeatable gap: given a security
question, the specialist lenses *review* — they verify or refute a
claim already on the table — but nothing in Phases 0–4 *generates* novel
attack surface before anything's been proposed. Falsification
(`references/verification.md`) is excellent at "assume this claim is
false and find evidence against it"; it has no counterpart for "what
haven't we even considered yet."

The tempting fix is to bolt an adversarial-attacker persona (the same
shape as Phase D's own Adversary frame: "you are trying to break,
exploit, or sabotage the obvious solution") directly onto the
depth-first Security Analyst lens. That's the wrong fix for the
depth-first phases specifically — creative, associative roleplay is
exactly Phase D's mechanism, and duplicating it inside a
verification-oriented lens would blur the strict generation/evaluation
separation both phases depend on (see Phase D's own anti-patterns in
`divergence.md`). The fix that's actually *more* depth-first, not less,
is systematic taxonomy enumeration: apply the same explicit-rule-
construction, systemising instinct the rest of this skill already uses,
to security specifically, instead of leaving "Security Analyst" as an
unstructured generic lens.

## The taxonomy: STRIDE

For every `security_boundary` node and every `AUTHENTICATES` /
`AUTHORIZES` / `VALIDATES` edge already captured in Phase 0's system
map (`schemas/system-map.schema.json`) — do not invent boundaries this
pass didn't already find; if cartography found none, this pass has
nothing to walk and should say so, not manufacture a boundary to
analyse — walk all six categories, one at a time, systematically:

| Category | The question, asked exactly this literally |
|---|---|
| **Spoofing** | Can an actor's claimed identity be forged or impersonated at this boundary? |
| **Tampering** | Can data crossing this edge be modified — in transit or at rest — without detection? |
| **Repudiation** | Can an actor deny having performed an action that crossed this boundary, with nothing recorded to disprove it? |
| **Information disclosure** | Can data crossing this boundary reach an actor who shouldn't see it? |
| **Denial of service** | Can this boundary or edge be overwhelmed, wedged, or exhausted to deny legitimate use? |
| **Elevation of privilege** | Can an actor use this boundary to gain capability beyond what they were actually granted? |

## Hypothesis, then evidence — never skip the second half

Each (boundary/edge × category) pair produces a **hypothesis**, not a
finding. This is the load-bearing discipline of the whole pass: a
hypothesis becomes a finding only when Phase 3's existing falsification
machinery checks it against actual evidence in the code/system, the
same way any other candidate finding is checked
(`references/verification.md`). Three outcomes, all of them logged, not
just the interesting one:

- **Confirmed** — a concrete mechanism exists (or a concrete gap
  exists) that makes the hypothesis exploitable. This becomes a real
  finding with evidence, same as any other.
- **Ruled out** — a concrete mechanism exists that prevents it (real
  auth check, real encryption, real rate limit, real audit log).
  Log this too, briefly — a boundary that was actually checked and
  found sound is worth recording, so a later run doesn't re-ask the
  same question from zero, and so the output doesn't read as if only
  problems were looked for.
- **Unresolved** — cannot be confirmed or ruled out from what's
  available (e.g. the enforcing mechanism lives server-side and isn't
  in scope). State this plainly, as Phase 0's `.neurodiversity/memory.json`
  and the stress-test transcript that motivated this file both did
  correctly — an honest "can't verify from here" beats a confident
  guess in either direction.

## Scope discipline

Run this pass only when:

- Profile selection included the Security Analyst lens (security-
  focused audits — see `frames/profile-selection.md`), or
- Phase 0 cartography surfaced a `security_boundary` node with a
  non-trivial load-bearing score on its own merits.

Do not run a full six-category walk against every trivial edge in a
`--standard` pass — that's exhaustive mode applied where it wasn't
asked for, the same anti-pattern `SKILL.md`'s adaptive-depth principle
already warns against elsewhere. Scale it: a `--security` or
`--forensic` run walks every security boundary found; a `--standard`
run walks only the highest load-bearing one or two.
