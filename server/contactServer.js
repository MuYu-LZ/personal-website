import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const smtpUser = process.env.SMTP_USER || "****@qq.com";
const smtpPass = process.env.SMTP_PASS || "*****";

if (!smtpUser || !smtpPass) {
  console.warn(
    "[contact-server] Missing SMTP credentials. Please set SMTP_USER and SMTP_PASS.",
  );
}

const transporter = nodemailer.createTransport({
  host: "smtp.qq.com",
  port: 465,
  secure: true,
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
});

app.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body || {};
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const mailOptions = {
      from: `"${name}" <${smtpUser}>`,
      to: smtpUser,
      subject: `New message from ${name}`,
      replyTo: email,
      text: `From: ${name} <${email}>\n\n${message}`,
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (error) {
    console.error("[contact-server] send error", error);
    res.status(500).json({ error: "Failed to send message" });
  }
});

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`[contact-server] listening on http://localhost:${PORT}`);
});
