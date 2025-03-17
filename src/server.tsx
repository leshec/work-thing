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

// Read into memory the paper2rag db contents
const { rows } = await tursoClient.execute("SELECT question_alpha, learning_aim, max_score, maths_watch, maths_genie FROM paper2rag");

// Process the user post and output HTML report
function getInfo(body) {
  let output = "<table border='1' style='border-collapse: collapse; width: 80%;'>";
  output += "<tr style='color: black;'><th>Q</th><th>Topic</th><th>Score</th><th>Status</th><th>Mathswatch</th><th>Maths Genie</th></tr>";
  let total_score = 0;
  for (let i = 0; i <= 27; i++) {
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

app.get("/", (c) => {
  return c.html("Hello work project2");
});

app.get("health-check", async (c) => {
  return c.json({ message: 'health-check good' }, 200);
});

// Read into memory the paper3rag
app.get("/info", async (c) => {
  const { rows }  = await tursoClient.execute("SELECT question_alpha, learning_aim, max_score FROM paper2rag");
  rows.forEach((element) => console.log(element[2]));
  return c.json({ rows });
});

app.patch('/user-form', async (c) => {
  const body = await c.req.formData();
  console.log("Parsed body of post request:", body);

  const id = body.get('id');
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

  try {
    // Update the p2Students table based on the ID
    await tursoClient.execute({
      sql: `
        UPDATE p2Students SET
          q1 = ?, q2 = ?, q3 = ?, q4 = ?, q5 = ?, q6 = ?, q7 = ?, q8 = ?, q9 = ?, q10 = ?, q11 = ?, q12 = ?,
          q13 = ?, q14 = ?, q15 = ?, q16 = ?, q17 = ?, q18 = ?, q19 = ?, q20 = ?, q21 = ?, q22 = ?, q23 = ?,
          q24 = ?, q25 = ?, q26 = ?, q27 = ?, q28 = ?
        WHERE id = ?;
      `,
      args: [
        q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12,
        q13, q14, q15, q16, q17, q18, q19, q20, q21, q22, q23,
        q24, q25, q26, q27, q28, id
      ],
    });

  } catch (error) {
    console.error('Database update failed:', error);
    return c.json({ error: 'Database error occurred!' }, 500);
  }

  let output = getInfo(body);
  try {
    return c.html(output);
  } catch (error) {
    console.error('Error processing feedback:', error);
    return c.json({ error: 'Error processing feedback' }, 500);
  }
});

export default app;

