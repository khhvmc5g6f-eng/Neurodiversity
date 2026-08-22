# Obscure concurrency bug: token refresh race

## Scenario

This is the token-refresh path of an auth client. Some users report
intermittent logouts under normal use, with no clear reproduction steps
from the frontend team. Investigate why, and identify every distinct
defect that contributes to it.

```js
// tokenService.js
let currentToken = null;
let refreshing = false;

async function getToken() {
  if (currentToken && !isExpired(currentToken)) return currentToken;
  if (!refreshing) {
    refreshing = true;
    const newToken = await refreshToken(currentToken);
    currentToken = newToken;
    refreshing = false;
    return newToken;
  }
  // another call is already refreshing -- wait a bit and use whatever we have
  await sleep(50);
  return currentToken;
}

async function refreshToken(oldToken) {
  // server invalidates oldToken the moment it receives this request
  const resp = await api.post('/auth/refresh', { token: oldToken });
  return resp.newToken;
}
```

Every authenticated request on the page calls `getToken()` independently
(there is no shared request queue at the call sites).
