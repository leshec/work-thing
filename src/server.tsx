import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { createClient } from "@libsql/client";
import { turso as tursoHelper } from "./lib/turso";

const app = new Hono();

// Serve static files from the public directory
app.use("/*", serveStatic({ root: "./public" }));

// Create Turso client
const tursoClient = createClient({
  url: process.env.TURSO_DATABASE_URL as string,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

// Create the database table if it doesn't already exist
await tursoClient.execute(`
  CREATE TABLE IF NOT EXISTS data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code INTEGER NOT NULL,
    collegeId INTEGER NOT NULL,
    first_name TEXT,
    q1 INTEGER NOT NULL,
    q2 INTEGER NOT NULL,
    q3 INTEGER NOT NULL,
    q4 INTEGER NOT NULL,
    q5 INTEGER NOT NULL,
    q6 INTEGER NOT NULL,
    q7 INTEGER NOT NULL,
    q8i INTEGER NOT NULL,
    q8ii INTEGER NOT NULL,
    q9a INTEGER NOT NULL,
    q9b INTEGER NOT NULL,
    q9c INTEGER NOT NULL,
    q10 INTEGER NOT NULL,
    q11a INTEGER NOT NULL,
    q11b INTEGER NOT NULL,
    q11c INTEGER NOT NULL,
    q12 INTEGER NOT NULL,
    q13a INTEGER NOT NULL,
    q13b INTEGER NOT NULL,
    q14 INTEGER NOT NULL,
    q15a INTEGER NOT NULL,
    q15b INTEGER NOT NULL,
    q15c INTEGER NOT NULL,
    q16 INTEGER NOT NULL,
    q17 INTEGER NOT NULL,
    q18 INTEGER NOT NULL,
    q19 INTEGER NOT NULL,
    q20 INTEGER NOT NULL,
    q21a INTEGER NOT NULL,
    q21b INTEGER NOT NULL,
    q22a INTEGER NOT NULL,
    q22b INTEGER NOT NULL,
    q23a INTEGER NOT NULL,
    q23b INTEGER NOT NULL,
    q24a INTEGER NOT NULL,
    q24b INTEGER NOT NULL,
    q25a INTEGER NOT NULL,
    q25b INTEGER NOT NULL,
    q26 INTEGER NOT NULL,
    q27 INTEGER NOT NULL,
    q28 INTEGER NOT NULL
  )
`);

// Routes
app.get("/", (c) => {
  return c.html("Hello work project2");
});

// Fetch all users
app.get("/users", async (c) => {
  const { rows } = await tursoClient.execute("SELECT * FROM data");
  return c.json({ rows });
});

// Fetch a specific user by ID
app.get("/user/:id", async (c) => {
  const id = c.req.param("id");
  const { rows } = await tursoClient.execute({ sql: "SELECT * FROM data WHERE id=?", args: [id] });
  return c.json({ rows });
});

// Add a user via JSON body
app.post("/user", async (c) => {
  const body = await c.req.json();
  const { name } = body;

  if (!name) {
    return c.json({ error: "Name is required" }, 400);
  }

  try {
    await tursoClient.execute({ sql: "INSERT INTO data (first_name) VALUES (?)", args: [name] });
    return c.json({ success: true, name });
  } catch (error) {
    console.error("Error inserting user:", error);
    return c.json({ error: "Failed to insert user" }, 500);
  }
});

// Add a user via form submission
app.post('/user-form', async (c) => {
  const body = await c.req.formData();
  console.log("Parsed body of post request:", body);

  const code = body.get('code');
  const collegeId = body.get('collegeId');
  const first_name = body.get('first_name');
  const q1 = body.get('q1');
  const q2 = body.get('q2');
  const q3 = body.get('q3');
  const q4 = body.get('q4');
  const q5 = body.get('q5');
  const q6 = body.get('q6');
  const q7 = body.get('q7');
  const q8i = body.get('q8i');
  const q8ii = body.get('q8ii');
  const q9a = body.get('q9a');
  const q9b = body.get('q9b');
  const q9c = body.get('q9c');
  const q10 = body.get('q10');
  const q11a = body.get('q11a');
  const q11b = body.get('q11b');
  const q11c = body.get('q11c');
  const q12 = body.get('q12');
  const q13a = body.get('q13a');
  const q13b = body.get('q13b');
  const q14 = body.get('q14');
  const q15a = body.get('q15a');
  const q15b = body.get('q15b');
  const q15c = body.get('q15c');
  const q16 = body.get('q16');
  const q17 = body.get('q17');
  const q18 = body.get('q18');
  const q19 = body.get('q19');
  const q20 = body.get('q20');
  const q21a = body.get('q21a');
  const q21b = body.get('q21b');
  const q22a = body.get('q22a');
  const q22b = body.get('q22b');
  const q23a = body.get('q23a');
  const q23b = body.get('q23b');
  const q24a = body.get('q24a');
  const q24b = body.get('q24b');
  const q25a = body.get('q25a');
  const q25b = body.get('q25b');
  const q26 = body.get('q26');
  const q27 = body.get('q27');
  const q28 = body.get('q28');

  try {
    await tursoClient.execute({
      sql: `
        INSERT INTO data (
          code, collegeId, first_name, q1, q2, q3, q4, q5, q6, q7, q8i, q8ii, q9a, q9b, q9c, q10, q11a, q11b, q11c, q12, q13a, q13b, q14, q15a, q15b, q15c, q16, q17, q18, q19, q20, q21a, q21b, q22a, q22b, q23a, q23b, q24a, q24b, q25a, q25b, q26, q27, q28
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
      `,
      args: [
        code, collegeId, first_name, q1, q2, q3, q4, q5, q6, q7, q8i, q8ii, q9a, q9b, q9c, q10, q11a, q11b, q11c,
        q12, q13a, q13b, q14, q15a, q15b, q15c, q16, q17, q18, q19, q20, q21a, q21b, q22a, q22b, q23a, q23b, q24a,
        q24b, q25a, q25b, q26, q27, q28,
      ],
    });

    return c.html('User data successfully inserted.');
  } catch (error) {
    console.error('Database insertion failed:', error);
    return c.json({ error: 'Database error occurred!' }, 500);
  }
});

export default app;

