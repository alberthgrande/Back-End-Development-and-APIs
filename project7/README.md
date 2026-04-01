# start project with new install dependency

docker compose up --build

# start project

docker compose up -d

# run backend

npm run dev

# to stop the project

docker compose down

# Connect to database

docker exec -it project6-db-1 psql -U postgres -d postgres

\dt → list tables ✔️
\d tasks → see table structure
\q → exit psql

```
🔍 Explanation
docker exec -it project6-db-1 → runs a command inside the container
psql → PostgreSQL CLI
-U postgres → user
-d postgres → database name (this is what you intended)
-P → formatting options (not for database selection)
```
