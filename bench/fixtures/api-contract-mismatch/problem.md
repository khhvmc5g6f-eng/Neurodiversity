# Contradictory API contract

## Scenario

QA reports that a "cancelled subscription" banner never appears in the
client, even for subscriptions the backend team confirms are cancelled.
Review the documented contract against the implementation.

```md
### GET /subscriptions/{id}  -- documented contract
Returns:
{
  "status": "active" | "paused" | "cancelled",
  "amount": number   // dollars
}
```

```ts
// subscriptions.ts (server)
function serialize(sub) {
  return {
    status: sub.canceledAt ? "canceled" : sub.status, // US spelling
    amount: sub.amountCents,
  };
}
```

```ts
// client.ts
function isCancelled(sub) {
  return sub.status === "cancelled"; // UK spelling, matches the documented contract
}
function formatAmount(sub) {
  return `$${sub.amount.toFixed(2)}`; // assumes dollars, per the documented contract
}
```
