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
  CREATE TABLE IF NOT EXISTS data3 (
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
    q8 INTEGER NOT NULL,
    q9 INTEGER NOT NULL,
    q10 INTEGER NOT NULL,
    q11 INTEGER NOT NULL,
    q12 INTEGER NOT NULL,
    q13 INTEGER NOT NULL,
    q14 INTEGER NOT NULL,
    q15 INTEGER NOT NULL,
    q16 INTEGER NOT NULL,
    q17 INTEGER NOT NULL,
    q18 INTEGER NOT NULL,
    q19 INTEGER NOT NULL,
    q20 INTEGER NOT NULL,
    q21 INTEGER NOT NULL,
    q22 INTEGER NOT NULL,
    q23 INTEGER NOT NULL,
    q24 INTEGER NOT NULL,
    q25 INTEGER NOT NULL,
    q26 INTEGER NOT NULL,
    q27 INTEGER NOT NULL,
    q28 INTEGER NOT NULL,
    q29 INTEGER NOT NULL
  )
`);

// Routes
app.get("/", (c) => {
  return c.html("Hello work project2");
});

// Fetch all users
app.get("/users", async (c) => {
  const { rows } = await tursoClient.execute("SELECT * FROM data3");
  return c.json({ rows });
});

// Fetch a specific user by ID
app.get("/user/:id", async (c) => {
  const id = c.req.param("id");
  const { rows } = await tursoClient.execute({ sql: "SELECT * FROM data3 WHERE id=?", args: [id] });
  return c.json({ rows });
});


//read into memory the paper3rag
app.get("/info", async (c) => {
const  {info}  = await tursoClient.execute("SELECT question_alpha, learning_aim, max_score FROM paper3rag");
  console.log(info);

  return c.json({ info });
});





// Add a user via JSON body
app.post("/user", async (c) => {
  const body = await c.req.json();
  const { name } = body;

  if (!name) {
    return c.json({ error: "Name is required" }, 400);
  }

  try {
    await tursoClient.execute({ sql: "INSERT INTO data3 (first_name) VALUES (?)", args: [name] });
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
  const q8 = body.get('q8');
  const q9 = body.get('q9');
  const q10 = body.get('q10');
  const q11 = body.get('q11');
  const q12 = body.get('q12');
  const q13 = body.get('q13');
  const q14 = body.get('q14');
  const q15 = body.get('q15');
  const q16 = body.get('q16');
  const q17 = body.get('q17');
  const q18 = body.get('q18');
  const q19 = body.get('q19');
  const q20 = body.get('q20');
  const q21 = body.get('q21');
  const q22 = body.get('q22');
  const q23 = body.get('q23');
  const q24 = body.get('q24');
  const q25 = body.get('q25');
  const q26 = body.get('q26');
  const q27 = body.get('q27');
  const q28 = body.get('q28');
  const q29 = body.get('q29');

  try {
    await tursoClient.execute({
      sql: `
        INSERT INTO data3 (
          code, collegeId, first_name, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13, q14, q15, q16, q17, q18, q19, q20, q21, q22, q23, q24, q25, q26, q27, q28, q29
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
      `,
      args: [
        code, collegeId, first_name, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11,
        q12, q13, q14, q15, q16, q17, q18, q19, q20, q21, q22, q23, q24, q25, q26, q27, q28, q29
      ],
    });

    return c.html('User data successfully inserted.');
  } catch (error) {
    console.error('Database insertion failed:', error);
    return c.json({ error: 'Database error occurred!' }, 500);
  }
});

export default app;

