docker run -d --name local-postgres -e POSTGRES_USER=psqluser -e POSTGRES_PASSWORD=psqlpassword -e POSTGRES_DB=rbac_db -p 5432:5432 -v pgdata:/var/lib/postgresql/data postgres:15

### Your container settings:

- **User**: `psqluser`
- **Password**: `psqlpassword`
- **Database**: `rbac_db`
- **Host**: `localhost` (since you mapped `-p 5432:5432`)
- **Port**: `5432`

---

### ✅ Database URL format

A PostgreSQL `DATABASE_URL` looks like this:

```
postgresql://USER:PASSWORD@HOST:PORT/DATABASE
```

---

### 🔧 Your specific `DATABASE_URL`:

```
postgresql://psqluser:psqlpassword@localhost:5432/rbac_db
```

---

### 🧠 Notes

- Use `localhost` if you're connecting from your host machine.
- If you're connecting from **another Docker container**, use the container name (`local-postgres`) instead of `localhost`:

  ```
  postgresql://psqluser:psqlpassword@local-postgres:5432/rbac_db
  ```

- If you're using something like Prisma, some drivers prefer:

  ```
  postgres://psqluser:psqlpassword@localhost:5432/rbac_db
  ```

  (both usually work, depending on the tool)

---
