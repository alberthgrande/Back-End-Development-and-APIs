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

CREATE TABLE tasks (
id SERIAL PRIMARY KEY,
title VARCHAR(255),
description TEXT,
status VARCHAR(50) DEFAULT 'pending',
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO tasks (title, description, status)
VALUES ('Buy groceries', 'Milk, eggs, bread', 'pending');
INSERT INTO tasks (title, description)
VALUES ('Finish project', 'Complete the final report');
INSERT INTO tasks (title, description, status)
VALUES 
  ('Task 1', 'Description 1', 'pending'),
  ('Task 2', 'Description 2', 'completed'),
  ('Task 3', 'Description 3', 'in_progress');
