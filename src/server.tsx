import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { createClient } from "@libsql/client";
import { turso as tursoHelper } from "./lib/turso";
import { html, raw } from 'hono/html'

const app = new Hono();

// Serve static files from the public directory
app.use("/*", serveStatic({ root: "./public" }));

// Create Turso client
const tursoClient = createClient({
  url: process.env.TURSO_DATABASE_URL as string,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

//read into memory the paper3rag db contents
  const {rows }  = await tursoClient.execute("SELECT question_alpha, learning_aim, max_score, maths_watch, maths_genie FROM paper3rag");


//process the user post and ouput html report
function getInfo(body) {
  let output = "<table border='1' style='border-collapse: collapse; width: 80%;'>";
  output += "<tr style='color: black;'><th>Q</th><th>Topic</th><th>Score</th><th>Status</th><th>Mathswatch</th><th>Maths Genie</th></tr>";
  let total_score = 0;
  for (let i = 0; i <= 28; i++) {
    let a = "q" + (i + 1);
    let score = parseInt(body.get(a));
    total_score += score;
    let max_score = parseInt(rows[i].max_score);
    let diff = max_score - score;
    let color = "black";
    let status = "";

    if (diff === 0) {
      color = "green";
      status = "<span style='color: green; font-weight: bold;'>GREEN</span>";
    } else if (diff === max_score) {
      color = "red";
      status = "<span style='color: red; font-weight: bold;'>RED</span>";
    } else {
      color = "orange";
      status = "<span style='color: orange; font-weight: bold;'>AMBER</span>";
    }

    output += `<tr>
                 <td style='color: black;'>q${rows[i].question_alpha}</td>
                 <td style='color: black;'>${rows[i].learning_aim}</td>
                 <td style='color: black;'>${score} / ${max_score}</td>
                 <td>${status}</td>
                  <td style='color: black;'>clip:${rows[i].maths_watch}</td>
                  <td style='color: black;'>${rows[i].maths_genie}</td>
               </tr>`;
  }
  
  output += "</table>";
  output += `<div class="total"><p>Total score: ${total_score} / 80</p><div>`;
  return output;
}

await tursoClient.execute(`
  CREATE TABLE IF NOT EXISTS data4 (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code INTEGER NOT NULL,
    collegeId INTEGER NOT NULL,
    class_name TEXT,
    teacher_name TEXT,
    first_name TEXT,
    last_name TEXT,
    q1 INTEGER NOT NULL DEFAULT 0,
    q2 INTEGER NOT NULL DEFAULT 0,
    q3 INTEGER NOT NULL DEFAULT 0,
    q4 INTEGER NOT NULL DEFAULT 0,
    q5 INTEGER NOT NULL DEFAULT 0,
    q6 INTEGER NOT NULL DEFAULT 0,
    q7 INTEGER NOT NULL DEFAULT 0,
    q8 INTEGER NOT NULL DEFAULT 0,
    q9 INTEGER NOT NULL DEFAULT 0,
    q10 INTEGER NOT NULL DEFAULT 0,
    q11 INTEGER NOT NULL DEFAULT 0,
    q12 INTEGER NOT NULL DEFAULT 0,
    q13 INTEGER NOT NULL DEFAULT 0,
    q14 INTEGER NOT NULL DEFAULT 0,
    q15 INTEGER NOT NULL DEFAULT 0,
    q16 INTEGER NOT NULL DEFAULT 0,
    q17 INTEGER NOT NULL DEFAULT 0,
    q18 INTEGER NOT NULL DEFAULT 0,
    q19 INTEGER NOT NULL DEFAULT 0,
    q20 INTEGER NOT NULL DEFAULT 0,
    q21 INTEGER NOT NULL DEFAULT 0,
    q22 INTEGER NOT NULL DEFAULT 0,
    q23 INTEGER NOT NULL DEFAULT 0,
    q24 INTEGER NOT NULL DEFAULT 0,
    q25 INTEGER NOT NULL DEFAULT 0,
    q26 INTEGER NOT NULL DEFAULT 0,
    q27 INTEGER NOT NULL DEFAULT 0,
    q28 INTEGER NOT NULL DEFAULT 0,
    q29 INTEGER NOT NULL DEFAULT 0
  )
`);

app.get("/", (c) => {
  return c.html("Hello work project2");
});

// // Fetch all users
// app.get("/users", async (c) => {
//   const { rows } = await tursoClient.execute("SELECT * FROM data4");
//   return c.json({ rows });
// });

// // Fetch a specific user by ID
// app.get("/user/:id", async (c) => {
//   const id = c.req.param("id");
//   const { rows } = await tursoClient.execute({ sql: "SELECT * FROM data4 WHERE id=?", args: [id] });
//   return c.json({ rows });
// });


//read into memory the paper3rag
app.get("/info", async (c) => {
  const {rows}  = await tursoClient.execute("SELECT question_alpha, learning_aim, max_score FROM paper3rag");
  rows.forEach((element) => console.log(element[2]));
  return c.json({ rows });
});


app.post('/user-form', async (c) => {
  const body = await c.req.formData();
  console.log("Parsed body of post request:", body);
  let output = getInfo(body);

  const code = body.get('code');
  const collegeId = body.get('collegeId');
  const class_name = body.get('class_name');
  const teacher_name = body.get('teacher_name');
  const first_name = body.get('first_name');
  const last_name = body.get('last_name');
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
        INSERT INTO data4 (
          code, collegeId, class_name, teacher_name, first_name, last_name, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13, q14, q15, q16, q17, q18, q19, q20, q21, q22, q23, q24, q25, q26, q27, q28, q29
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
      `,
      args: [
        code, collegeId, class_name, teacher_name, first_name, last_name, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11,
        q12, q13, q14, q15, q16, q17, q18, q19, q20, q21, q22, q23, q24, q25, q26, q27, q28, q29
      ],
    });

    return c.html(output);
  } catch (error) {
    console.error('Database insertion failed:', error);
    return c.json({ error: 'Database error occurred!' }, 500);
  }
});

export default app;

