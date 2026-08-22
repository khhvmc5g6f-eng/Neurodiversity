# Hidden database mismatch

## Scenario

Review this user data layer for correctness before it goes into a larger
refactor. Nothing here has thrown an error in staging.

```sql
-- schema.sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email TEXT NOT NULL,
  deleted_at TIMESTAMP NULL,
  phone TEXT NULL
);
-- note: no UNIQUE constraint on email
```

```ts
// User.ts
interface User {
  id: string;
  email: string;
  phone: string; // required in the type
}
```

```ts
// userRepo.ts
async function listActiveUsers(): Promise<User[]> {
  return db.query('SELECT id, email, phone FROM users');
}

async function signup(email: string, phone: string) {
  const existing = await db.query('SELECT id FROM users WHERE email=$1', [email]);
  if (existing.length) throw new Error('email taken');
  await db.query(
    'INSERT INTO users (id, email, phone) VALUES ($1,$2,$3)',
    [uuid(), email, phone]
  );
}
```
