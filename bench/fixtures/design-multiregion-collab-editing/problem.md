# Design: multi-region collaborative editing with data residency

## Design problem

Design the data architecture for a SaaS product with live collaborative
document editing (like a shared text document multiple people type into
at once), for customers in the US and EU. Constraints:

- Concurrent edits from multiple users must merge correctly with no
  data loss.
- Perceived edit latency should feel close to instant (sub-200ms) for
  users editing together.
- EU customer data must never leave EU infrastructure (a hard
  regulatory requirement, not a preference).
- Every edit must be captured in an audit log that is never allowed to
  lose an event, even across a regional outage.

Propose the architecture you'd actually build. Explain your reasoning,
not just a component diagram.
