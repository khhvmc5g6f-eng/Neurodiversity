# Evidence, falsification, and confidence calibration

## Evidence graph

Every finding that reaches the output must trace to something concrete:

```
FINDING → FILE → SYMBOL → TEST → EXTERNAL_SOURCE → OBSERVATION
```

A finding with no evidence link is a hypothesis, not a finding — keep it
in the working document (Synthesis A) but don't let it into the
distilled output (Synthesis B) without either evidence or an explicit
"unverified, here's why it's plausible" label.

## Source quality, for external claims

```
PRIMARY   OFFICIAL   AUTHORITATIVE_SECONDARY   COMMUNITY   ANECDOTAL   UNKNOWN
```

When up-to-date external information actually matters to a finding
(library behavior, a security advisory, a protocol detail), look it up —
don't let deep internal analysis quietly turn into deep speculation
about external systems.

## Contradiction hunt

Dedicated isolated pass, searching for disagreements between:

```
README   CODE   TESTS   SCHEMA   DOCUMENTATION   API   CONFIGURATION   CI   RUNTIME
```

Weight each contradiction by `IMPACT × CERTAINTY × REACH`, same shape as
the detail-value score in `monotropism.md` — this keeps prioritisation
consistent across passes instead of every pass inventing its own scale.

## False consensus

If several specialist agents independently repeat the same claim, check
whether they found independent evidence for it or all inherited it from
the same single source (a comment, a README line, an earlier finding
that got passed into their context). Repeated *agreement* is not
multiplicative evidence unless the agreement is independently sourced —
treat inherited consensus as one piece of evidence, not several.

## Claim challenger / falsification

For every finding with real impact, spawn a fresh agent, isolated from
the finding's own supporting context:

> Assume this claim is false: "{claim}". Actively look for evidence
> against it — in the code, in the data, in test results, in behavior.
> Do not try to confirm it. Report what you find, even if nothing
> refutes it.

Record `claim / attempts_to_disprove / result / confidence`. A claim
that survives a genuine attempt to refute it is more trustworthy than
one nobody tried to break.

## Confidence calibration

Confidence comes from:

```
DIRECT_EVIDENCE   INDEPENDENT_CONFIRMATION   TEST_RESULT
ASSUMPTION_COUNT (fewer unverified assumptions underneath = higher)
CONTRADICTORY_EVIDENCE (any unresolved = lower, regardless of everything else)
```

Never from how confidently something is phrased. A finding stated
tentatively with strong evidence is more trustworthy than one stated
with certainty and no evidence link — write the confidence score
separately from the prose, so tone can't substitute for it.

## Adversarial completeness check

After the model feels complete, run one final agent whose only job is:

> If this model of the system were incomplete, where would the missing
> piece most plausibly be hiding — a modality nobody searched, a claim
> nobody tried to verify, a source nobody read? Don't re-confirm what's
> already found; look specifically for what searching-so-far would have
> missed.

Treat its output as new candidate work for the interrupt queue, not as
an immediate obligation to reopen everything — rank it by materiality
like any other candidate.
