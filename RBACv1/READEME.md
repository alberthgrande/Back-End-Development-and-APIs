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

# DATABASE DESIGN TABLES

- users

```
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role_id UUID REFERENCES roles(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

- roles

```
CREATE TABLE roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(50) UNIQUE NOT NULL
);
```

- permissions (optional but PRO LEVEL)

```
CREATE TABLE permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) UNIQUE NOT NULL
);
```

- role_permissions

```
CREATE TABLE role_permissions (
  role_id UUID REFERENCES roles(id),
  permission_id UUID REFERENCES permissions(id),
  PRIMARY KEY (role_id, permission_id)
);
```

- refresh_tokens

```
CREATE TABLE refresh_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  token TEXT NOT NULL,
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

# create POST /permissions

{
"name": "read"
}

# assign POST /permissions/assign

{
"role_id": "admin-role-uuid",
"permission_id": "read-permission-uuid"
}

# authorize API

GET /admin
Authorization: Bearer <token>
