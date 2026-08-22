# Config failure: stale debug override

## Scenario

Caching appears to be completely ineffective in production despite the
base config and internal docs both stating a 300-second TTL. Investigate.

```ini
# config/base.env
CACHE_TTL_SECONDS=300
DB_POOL_SIZE=20
```

```ini
# config/production.env  (loaded AFTER base.env; keys here override base)
DB_POOL_SIZE=50
CACHE_TTL_SECONDS=0
```

```ts
// configLoader.ts
function loadConfig(env) {
  const base = parseEnvFile('config/base.env');
  const override = parseEnvFile(`config/${env}.env`);
  return { ...base, ...override };
}
```

Git history shows CACHE_TTL_SECONDS=0 was added to production.env eight
months ago in a commit titled "debug: temporarily disable cache to
reproduce issue #412", in the same commit as an unrelated, intentional
DB_POOL_SIZE change.
