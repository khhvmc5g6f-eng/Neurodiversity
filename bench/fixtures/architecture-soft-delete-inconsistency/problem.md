# Cross-module behavioural inconsistency: soft delete

## Scenario

The generic search feature is returning deleted user accounts in results
(confirmed by support), but correctly excludes deleted orders. Review the
soft-delete handling across the codebase.

```sql
-- orders table
deleted_at TIMESTAMP NULL
```

```sql
-- users table
is_deleted BOOLEAN NOT NULL DEFAULT false
-- note: users has no deleted_at column at all
```

```ts
// genericSearch.ts -- shared by both the orders search and the users search
function excludeDeleted(queryBuilder, table) {
  return queryBuilder.where('deleted_at', 'IS', null);
}

function search(table, filters) {
  let q = db(table).select('*');
  q = excludeDeleted(q, table); // applied uniformly to both 'orders' and 'users'
  return q.where(filters);
}
```

The ORM in use is configured with `unknownColumnMode: 'silent-skip'` for
all search endpoints specifically to avoid 500s when an optional filter
references a column that doesn't exist on a given table.
