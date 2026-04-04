### Full command:

```bash
docker run --name pg-local -e POSTGRES_PASSWORD=secret -e POSTGRES_USER=devuser -e POSTGRES_DB=devdb -p 5432:5432 -d postgres:18.3
```

---

### 1️⃣ `docker run`

- This tells Docker: “I want to **start a new container** from an image.”

---

### 2️⃣ `--name pg-local`

- Assigns a **custom name** to your container: `pg-local`.
- Makes it easier to stop, remove, or reference later instead of using the random ID Docker gives by default.
  Example:

```bash
docker stop pg-local
docker start pg-local
```

---

### 3️⃣ `-e POSTGRES_PASSWORD=secret`

- `-e` sets an **environment variable** inside the container.
- `POSTGRES_PASSWORD` is required by the official PostgreSQL Docker image—it sets the password for the default user.
- Here, the password is `secret`.

---

### 4️⃣ `-e POSTGRES_USER=devuser`

- Another environment variable: sets the **username** for your database.
- Instead of the default `postgres` user, we’re using `devuser`.

---

### 5️⃣ `-e POSTGRES_DB=devdb`

- Environment variable: creates a **database automatically** when the container starts.
- Here, the database name will be `devdb`.

---

### 6️⃣ `-p 5432:5432`

- Maps ports from **host → container**: `hostPort:containerPort`.
- PostgreSQL inside the container listens on port `5432`.
- Mapping it to `5432` on your computer allows Node.js (or any local app) to connect using `localhost:5432`.

---

### 7️⃣ `-d`

- **Detached mode**: runs the container in the background.
- Docker will print the container ID and keep it running without tying up your terminal.

---

### 8️⃣ `postgres:18.3`

- The **image and tag** you want to use.
- Here, we’re pulling PostgreSQL **version 18.3**.
- If the image isn’t on your machine, Docker will download it from Docker Hub automatically.

---

✅ **Putting it together:**
This command starts a PostgreSQL 18.3 container named `pg-local`, with:

- Database: `devdb`
- User: `devuser`
- Password: `secret`
- Exposed port: 5432
- Runs in the background

Your Node.js app can now connect to `localhost:5432` using the credentials above.

---

## **1️⃣ Using `docker exec` to open `psql` inside the container**

This is the simplest method:

```bash
docker exec -it pg-local psql -U devuser -d devdb
```

**Breakdown:**

- `docker exec` → run a command **inside a running container**
- `-it` → interactive mode with a terminal
- `pg-local` → name of your container (the one you set with `--name`)
- `psql` → PostgreSQL command-line client
- `-U devuser` → connect as user `devuser`
- `-d devdb` → connect to database `devdb`

✅ After running this, you’ll see a prompt like:

```
devdb=#
```

You’re now inside PostgreSQL and can run SQL queries:

```sql
CREATE TABLE test(id SERIAL PRIMARY KEY, name TEXT);
INSERT INTO test(name) VALUES('Alberth');
SELECT * FROM test;
```

---

## **2️⃣ Connect from your host machine using `psql`**

If you have `psql` installed on your computer (outside Docker):

```bash
psql -h localhost -p 5432 -U devuser -d devdb
```

**Breakdown:**

- `-h localhost` → host running the database (your machine)
- `-p 5432` → port mapped from Docker container
- `-U devuser` → username
- `-d devdb` → database

It will ask for your password (`secret` in our example).

---

## **3️⃣ Optional: enter container shell first**

You can also start a shell inside the container and then run `psql`:

```bash
docker exec -it pg-local bash
```

Then inside the container:

```bash
psql -U devuser -d devdb
```

---

💡 **Tip:** For local development, the `docker exec -it pg-local psql -U devuser -d devdb` command is usually the easiest.

---

## **1️⃣ Show all databases**

```sql
\l
```

- Lists all databases in the server.
- You should see your `devdb` listed.

---

## **2️⃣ Connect to your database (if not already)**

```sql
\c devdb
```

- `\c` stands for “connect.”
- Makes sure you are using the right database.

---

## **3️⃣ Show all tables**

```sql
\dt
```

- `\dt` lists all tables in the **current database**.
- Example output:

```
          List of relations
 Schema | Name  | Type  | Owner
--------+-------+-------+-------
 public | test  | table | devuser
```

---

## **4️⃣ Show the structure of a table**

```sql
\d table_name
```

- Example:

```sql
\d test
```

- Output:

```
       Table "public.test"
 Column |  Type   | Modifiers
--------+---------+-----------
 id     | integer | not null default nextval('test_id_seq'::regclass)
 name   | text    |
Indexes:
    "test_pkey" PRIMARY KEY, btree (id)
```

---

## **5️⃣ See the data in a table**

```sql
SELECT * FROM table_name;
```

- Example:

```sql
SELECT * FROM test;
```

- Output:

```
 id | name
----+-------
 1  | Alberth
```

---

### **Quick Summary of Useful `psql` Commands**

| Command                    | Purpose               |
| -------------------------- | --------------------- |
| `\l`                       | List all databases    |
| `\c dbname`                | Connect to a database |
| `\dt`                      | Show all tables       |
| `\d tablename`             | Show table structure  |
| `SELECT * FROM tablename;` | Show table contents   |

---

GET → rows / rows[0]
INSERT → RETURNING _
UPDATE → RETURNING _
DELETE → rowCount

| Action                             | Command                                        |
| ---------------------------------- | ---------------------------------------------- |
| Code change (JS files, hot reload) | `docker-compose up`                            |
| Dependency or Dockerfile change    | `docker-compose up --build`                    |
| Restart containers                 | `docker-compose down` then `docker-compose up` |
