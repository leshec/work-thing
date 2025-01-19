import { Hono } from "hono";
import { serveStatic } from 'hono/bun';
import { createClient } from "@libsql/client";
import { turso } from "./lib/turso";

const app = new Hono();
// Serve static files from the public directory.
app.use('/*', serveStatic({ root: './public' }));

const turso = createClient({
  url: process.env.TURSO_DATABASE_URL as string,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

turso.executeMultiple(
  "CREATE TABLE IF NOT EXISTS data(id INTEGER PRIMARY KEY AUTOINCREMENT, code INTEGER NOT NULL, collegeId INTEGER NOT NULL, first_name TEXT, q1 INTEGER NOT NULL, q2 INTEGER NOT NULL, q3 INTEGER NOT NULL, q4 INTEGER NOT NULL, q5 INTEGER NOT NULL, q6 INTEGER NOT NULL, q7 INTEGER NOT NULL, q8i INTEGER NOT NULL, q8ii INTEGER NOT NULL, q9a INTEGER NOT NULL, q9b INTEGER NOT NULL, q9c INTEGER NOT NULL, q10 INTEGER NOT NULL, q11a INTEGER NOT NULL, q11b INTEGER NOT NULL, q11c INTEGER NOT NULL, q12 INTEGER NOT NULL, q13a INTEGER NOT NULL, q13b INTEGER NOT NULL, q14 INTEGER NOT NULL, q15a INTEGER NOT NULL, q15b INTEGER NOT NULL, q15c INTEGER NOT NULL, q16 INTEGER NOT NULL, q17 INTEGER NOT NULL, q18 INTEGER NOT NULL, q19 INTEGER NOT NULL, q20 INTEGER NOT NULL, q21a INTEGER NOT NULL, q21b INTEGER NOT NULL, q22a INTEGER NOT NULL, q22b INTEGER NOT NULL, q23a INTEGER NOT NULL, q23b INTEGER NOT NULL, q24a INTEGER NOT NULL, q24b INTEGER NOT NULL, q25a INTEGER NOT NULL, q25b INTEGER NOT NULL, q26 INTEGER NOT NULL, q27 INTEGER NOT NULL, q28 INTEGER NOT NULL)"
);

app.get("/", (c) => {
  return c.html("Hello work project2");
});

app.get("/users", async (c) => {
  const { rows } = await turso.execute("SELECT * FROM data");

  return c.json({ rows });
});

app.get("/user/:id", async (c) => {
  const id = c.req.param('id');
  const { rows } = await turso.execute({ sql: "SELECT * FROM data WHERE id=?", args: [id], });

  return c.json({ rows });
});


app.post('/user', async (c) => {
  const body = await c.req.json();
  console.log("Parsed body of post request:", body);

  if (!body.name) {
    return c.json({ error: "Name is required" }, 400);
  }

  const name = body.name;

  try {
    await turso.execute({
      sql: "INSERT INTO data (name) VALUES (?)",
      args: [name],
    });
    return c.json({ name });
  } catch (error) {
    console.error("Error inserting user:", error);
    return c.json({ error: "Failed to insert user" }, 500);
  }
});


app.post('/user-form', async (c) => {
  const body = await c.req.formData()
  console.log("Parsed body of post request:", body);

  //fields here
  const code = body.get('code');
  c.set('code', code);
  const collegeId = body.get('collegeId');
  c.set('collegeId', collegeId);
  const first_name = body.get('first_name');
  c.set('first_name', first_name);
  const q1 = body.get('q1');
  c.set('q1', q1);
  const q2 = body.get('q2');
  c.set('q2', q2);
  const q3 = body.get('q3');
  c.set('q3', q3);
  const q4 = body.get('q4');
  c.set('q4', q4);
  const q5 = body.get('q5');
  c.set('q5', q5);
  const q6 = body.get('q6');
  c.set('q6', q6);
  const q7 = body.get('q7');
  c.set('q7', q7);
  const q8i = body.get('q8i');
  c.set('q8i', q8i);
  const q8ii = body.get('q8ii');
  c.set('q8ii', q8ii);
  const q9a = body.get('q9a');
  c.set('q9a', q9a);
  const q9b = body.get('q9b');
  c.set('q9b', q9b);
  const q9c = body.get('q9c');
  c.set('q9c', q9c);
  const q10 = body.get('q10');
  c.set('q10', q10);
  const q11a = body.get('q11a');
  c.set('q11a', q11a);
  const q11b = body.get('q11b');
  c.set('q11b', q11b);
  const q11c = body.get('q11c');
  c.set('q11c', q11c);
  const q12 = body.get('q12');
  c.set('q12', q12);
  const q13a = body.get('q13a');
  c.set('q13a', q13a);
  const q13b = body.get('q13b');
  c.set('q13b', q13b);
  const q14 = body.get('q14');
  c.set('q14', q14);
  const q15a = body.get('q15a');
  c.set('q15a', q15a);
  const q15b = body.get('q15b');
  c.set('q15b', q15b);
  const q15c = body.get('q15c');
  c.set('q15c', q15c);
  const q16 = body.get('q16');
  c.set('q16', q16);
  const q17 = body.get('q17');
  c.set('q17', q17);
  const q18 = body.get('q18');
  c.set('q18', q18);
  const q19 = body.get('q19');
  c.set('q19', q19);
  const q20 = body.get('q20');
  c.set('q20', q20);
  const q21a = body.get('q21a');
  c.set('q21a', q21a);
  const q21b = body.get('q21b');
  c.set('q21b', q21b);
  const q22a = body.get('q22a');
  c.set('q22a', q22a);
  const q22b = body.get('q22b');
  c.set('q22b', q22b);
  const q23a = body.get('q23a');
  c.set('q23a', q23a);
  const q23b = body.get('q23b');
  c.set('q23b', q23b);
  const q24a = body.get('q24a');
  c.set('q24a', q24a);
  const q24b = body.get('q24b');
  c.set('q24b', q24b);
  const q25a = body.get('q25a');
  c.set('q25a', q25a);
  const q25b = body.get('q25b');
  c.set('q25b', q25b);
  const q26 = body.get('q26');
  c.set('q26', q26);
  const q27 = body.get('q27');
  c.set('q27', q27);
  const q28 = body.get('q28');
  c.set('q28', q28);
  try {
    // Assuming db.run is asynchronous, wait for the query to complete

    await turso.execute({
      sql: "INSERT INTO data (code, collegeId, first_name, q1, q2, q3, q4, q5, q6, q7, q8i, q8ii, q9a, q9b, q9c, q10, q11a, q11b, q11c, q12, q13a, q13b, q14, q15a, q15b, q15c, q16, q17, q18, q19, q20, q21a, q21b, q22a, q22b, q23a, q23b, q24a, q24b, q25a, q25b, q26, q27, q28,) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      args: [code, collegeId, first_name, q1, q2, q3, q4, q5, q6, q7, q8i, q8ii, q9a, q9b, q9c, q10, q11a, q11b, q11c, q12, q13a, q13b, q14, q15a, q15b, q15c, q16, q17, q18, q19, q20, q21a, q21b, q22a, q22b, q23a, q23b, q24a, q24b, q25a, q25b, q26, q27, q28],
    });
    // Return a response with the inserted values (or a success message)


    return c.html("name");
  } catch (error) {
    console.error("Database insertion failed:", error);
    return c.json({ error: "Database error occurred!" }, 500);
  }

});

export default app;

