# Security trust-boundary failure

## Scenario

Security review of the admin refund path before this goes to production.

```ts
// adminRoutes.ts
app.post('/admin/refund', (req, res) => {
  const role = req.headers['x-internal-role'];
  if (role !== 'admin') return res.status(403).end();
  processRefund(req.body.orderId, req.body.amount);
  res.status(200).end();
});
```

```yaml
# infra/routes.yaml
- path: /admin/*
  upstream: api-service
  # no auth middleware attached here; relies on the internal network for isolation
- path: /*
  upstream: api-service
```

```yaml
# infra/network.yaml
api-service:
  public: true   # reachable directly from the public internet
```
