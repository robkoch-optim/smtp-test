import express from "express";
import { runSmtpTest } from "./smtp-test.js";

const app = express();

app.get("/", (req, res) => {
  res.send("SMTP test – wejdź w /send-test aby wysłać email.");
});

app.get("/send-test", async (req, res) => {
  const result = await runSmtpTest(process.env);
  res.json(result);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
