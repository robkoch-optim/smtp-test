import nodemailer from "nodemailer";

console.log("=== SMTP TEST START ===");

const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    TEST_EMAIL
} = process.env;

async function main() {
    try {
        console.log("Connecting to SMTP...");

        const transporter = nodemailer.createTransport({
            host: SMTP_HOST,
            port: Number(SMTP_PORT),
            secure: Number(SMTP_PORT) === 465, 
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
            subject: "Render SMTP test",
            text: "OK – działa",
        });

        console.log("Email sent ✓");
        console.log(info);
        
    } catch (err) {
        console.error("ERROR:", err);
    }
}

main();

// test
