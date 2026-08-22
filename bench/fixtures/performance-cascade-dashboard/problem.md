# Performance cascade in dashboard endpoint

## Scenario

The dashboard endpoint is slow and occasionally times out entirely under
load. Review it for the underlying causes, not just "it's slow."

```ts
async function getDashboard(userId) {
  const orders = await db.query('SELECT * FROM orders WHERE user_id=$1', [userId]);
  const enriched = [];
  for (const order of orders) {
    const price = await fetchLivePrice(order.sku);
    enriched.push({ ...order, price });
  }
  return enriched;
}

async function fetchLivePrice(sku) {
  try {
    return await pricingApi.get(sku); // no timeout configured on this client
  } catch (e) {
    return await fetchLivePrice(sku); // retry on any error
  }
}
```
