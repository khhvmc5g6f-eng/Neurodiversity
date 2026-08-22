# Production readiness review (Operations Analyst)

## Why this exists

Operations Analyst had the same problem Security Analyst had before
`threat-taxonomy.md`: a name and nothing else. Named as a supplementary
lens, described in one clause, no method. That's a real gap — "does
this system fall over safely in production" is exactly the kind of
question AUTISTIC's depth-first, systemising approach should be best
at, and a vague "consider operational concerns" prompt produces the
same shallow, reactive review the STRIDE fix replaced.

## The taxonomy: SRE production readiness review

Adapted from the standard SRE/production-readiness-review categories
used industry-wide before a service goes live or takes real load. Walk
each category, systematically, against every `service`/`component` node
Phase 0 scored as load-bearing — not against everything in the system
map indiscriminately, and not against nodes cartography didn't already
find:

| Category | The question, asked literally |
|---|---|
| **Monitoring & alerting** | If this component silently starts failing or degrading, would anything notice before a user reports it? |
| **Capacity & scaling** | What happens when load exceeds what this component was sized for — does it degrade gracefully, queue, shed load, or fall over? |
| **Deployment & rollback safety** | Can a bad deploy of this component be detected and reverted quickly, without taking dependents down with it? |
| **Dependency-failure handling** | If something this component depends on is slow, down, or returns garbage, what does this component do? |
| **On-call & runbooks** | If this breaks at 3am, does anything tell a human what's wrong and what to do about it, or does it start from zero? |
| **Disaster recovery / backup** | If this component's data or state is lost or corrupted, what's actually recoverable, and from what point in time? |
| **SLOs & error budgets** | Is there any stated, measurable target for this component's acceptable failure rate/latency, or is "working" undefined? |

## Hypothesis, then evidence — same discipline as STRIDE

Each (component × category) pair is a **hypothesis**, not a finding.
Check it against Phase 3's existing evidence machinery before it counts
as anything real, with the same three-way outcome
`threat-taxonomy.md` uses:

- **Confirmed** — a concrete gap exists (no monitoring found anywhere
  in the code/config/docs; no rollback mechanism; no runbook or
  equivalent doc). Becomes a real finding with evidence.
- **Ruled out** — a concrete mechanism exists that covers it (real
  alerting config, a documented rollback procedure, an actual SLO in a
  doc or dashboard config). Log it briefly — a component that was
  actually checked and found operationally sound is worth recording,
  not just silence.
- **Unresolved** — cannot be confirmed or ruled out from what's
  available (operational tooling that lives outside the repo/target
  scope — a real PagerDuty config, a real on-call rotation — isn't
  something code alone can confirm). State this plainly rather than
  assume either way.

## Scope discipline

Run this pass only when:

- The problem shape is an architecture review, a pre-release/pre-merge
  audit, or an explicit `--architecture`/`--forensic` run (see
  `frames/profile-selection.md`), or
- Phase 0 cartography surfaced a `service`/`component` node with a
  non-trivial load-bearing score on its own merits (high centrality,
  high failure impact).

Do not run all seven categories against every trivial component in a
`--standard` pass — walk the highest load-bearing one or two;
`--architecture`/`--forensic` walks every load-bearing component found.
This is the same adaptive-depth discipline the STRIDE pass already
applies, not a new rule.

## What this is not

Not a request for AUTISTIC to *build* monitoring, runbooks, or rollback
tooling — that's implementation work, decided and scoped separately per
Phase 4's "implementation was requested but architecture is materially
unclear" rule. This pass finds and reports the gaps; it doesn't
presume the fix.
