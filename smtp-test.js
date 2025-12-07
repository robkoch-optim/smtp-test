import nodemailer from "nodemailer";

export async function runSmtpTest(env) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, TEST_EMAIL } = env;

  console.log("=== SMTP TEST START ===");

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465, // SSL only for 465
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS
      },
      tls: { rejectUnauthorized: false }
    });

    await transporter.verify();
    console.log("SMTP Verified ✓");

    const info = await transporter.sendMail({
      from: SMTP_USER,
      to: TEST_EMAIL,
      subject: "SMTP test – Cyclic.sh",
      text: "Działa! (wysłane z Cyclic.sh)"
    });

    console.log("Email sent ✓");
    return { ok: true, info };

  } catch (err) {
    console.error("ERROR:", err);
    return { ok: false, error: err.message };
  }
}
