# Misleading documentation: rate limiting

## Scenario

A shared-office customer reports getting rate-limited far more easily
than the documented limit suggests should be possible. Review the
documentation against the implementation.

```md
## Rate limiting
Each API key is limited to 100 requests per minute. Exceeding the limit
returns HTTP 429 with a `Retry-After` header indicating when to retry.
```

```ts
// rateLimiter.ts
const buckets = new Map();

function checkLimit(req) {
  const key = req.ip;
  const count = (buckets.get(key) || 0) + 1;
  buckets.set(key, count);
  if (count > 100) {
    return { limited: true };
  }
  return { limited: false };
}
```
