# Integration version mismatch: webhook payload

## Scenario

A downstream partner reports intermittent crashes processing our
order-created webhook -- only for orders that came through the bulk CSV
import tool, never for normal checkout orders.

```md
# Webhook payload v2 (current, documented)
POST /webhooks/order-created
{
  "orderId": "...",
  "amount": 100,
  "currency": "USD"   // added in v2, always present per the docs
}
```

```ts
// webhookSender.ts -- normal checkout flow
function sendOrderCreated(order) {
  post('/webhooks/order-created', {
    orderId: order.id, amount: order.amount, currency: order.currency
  });
}
```

```ts
// legacyImportSender.ts -- bulk CSV import path, written before v2 existed
function sendOrderCreatedFromImport(order) {
  post('/webhooks/order-created', { orderId: order.id, amount: order.amount });
}
```

```ts
// (partner-side) consumer.ts, written against the v2 docs
function handleOrderCreated(payload) {
  return convert(payload.amount, payload.currency.toUpperCase());
}
```
