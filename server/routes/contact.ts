import { RequestHandler } from "express";
import tls from "node:tls";

interface ContactFormPayload {
  fullName?: string;
  email?: string;
  phone?: string;
  propertyType?: string;
  city?: string;
  message?: string;
}

function getSmtpConfig() {
  const toEmail = process.env.CONTACT_TO_EMAIL || "prernasuthar014@gmail.com";

  return {
    toEmail,
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT || 465),
    user: process.env.SMTP_USER || toEmail,
    appPassword: (process.env.SMTP_APP_PASSWORD || "").replace(/\s+/g, ""),
  };
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatAddress(email: string) {
  return `<${email}>`;
}

function createEmailBody(payload: Required<ContactFormPayload>) {
  const rows = [
    ["Full Name", payload.fullName],
    ["Email", payload.email],
    ["Phone", payload.phone || "Not provided"],
    ["Property Type", payload.propertyType],
    ["City", payload.city || "Not provided"],
    ["Message", payload.message || "Not provided"],
  ];

  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n");
  const htmlRows = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;font-weight:700;border:1px solid #ddd;">${escapeHtml(label)}</td><td style="padding:8px 12px;border:1px solid #ddd;">${escapeHtml(value)}</td></tr>`
    )
    .join("");

  return {
    text,
    html: `<h2>New Contact Enquiry</h2><table style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px;">${htmlRows}</table>`,
  };
}

function readSmtpResponse(socket: tls.TLSSocket): Promise<string> {
  return new Promise((resolve, reject) => {
    let response = "";

    const cleanup = () => {
      socket.off("data", onData);
      socket.off("error", onError);
    };

    const onError = (error: Error) => {
      cleanup();
      reject(error);
    };

    const onData = (chunk: Buffer) => {
      response += chunk.toString("utf8");
      const lines = response.trimEnd().split(/\r?\n/);
      const lastLine = lines[lines.length - 1];

      if (/^\d{3}\s/.test(lastLine)) {
        cleanup();
        resolve(response);
      }
    };

    socket.on("data", onData);
    socket.on("error", onError);
  });
}

async function sendSmtpCommand(socket: tls.TLSSocket, command: string, expectedCodes: number[]) {
  socket.write(`${command}\r\n`);
  const response = await readSmtpResponse(socket);
  const code = Number(response.slice(0, 3));

  if (!expectedCodes.includes(code)) {
    throw new Error(`SMTP command failed: ${response}`);
  }
}

async function sendMail(payload: Required<ContactFormPayload>) {
  const smtp = getSmtpConfig();

  if (!smtp.appPassword) {
    throw new Error("SMTP_APP_PASSWORD is not configured");
  }

  const { text, html } = createEmailBody(payload);
  const subject = `New contact enquiry from ${payload.fullName}`;
  const boundary = `shashwatt-${Date.now()}`;
  const message = [
    `From: Shashwatt Energy Website ${formatAddress(smtp.user)}`,
    `To: ${formatAddress(smtp.toEmail)}`,
    `Reply-To: ${formatAddress(payload.email)}`,
    `Subject: ${subject}`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    "",
    `--${boundary}`,
    'Content-Type: text/plain; charset="UTF-8"',
    "",
    text,
    "",
    `--${boundary}`,
    'Content-Type: text/html; charset="UTF-8"',
    "",
    html,
    "",
    `--${boundary}--`,
    "",
  ]
    .join("\r\n")
    .replace(/^\./gm, "..");

  const socket = tls.connect(smtp.port, smtp.host, { servername: smtp.host });

  try {
    await readSmtpResponse(socket);
    await sendSmtpCommand(socket, `EHLO ${smtp.host}`, [250]);
    await sendSmtpCommand(socket, "AUTH LOGIN", [334]);
    await sendSmtpCommand(socket, Buffer.from(smtp.user).toString("base64"), [334]);
    await sendSmtpCommand(socket, Buffer.from(smtp.appPassword).toString("base64"), [235]);
    await sendSmtpCommand(socket, `MAIL FROM:${formatAddress(smtp.user)}`, [250]);
    await sendSmtpCommand(socket, `RCPT TO:${formatAddress(smtp.toEmail)}`, [250, 251]);
    await sendSmtpCommand(socket, "DATA", [354]);
    await sendSmtpCommand(socket, `${message}\r\n.`, [250]);
    await sendSmtpCommand(socket, "QUIT", [221]);
  } finally {
    socket.end();
  }
}

export const handleContact: RequestHandler = async (req, res) => {
  const body = req.body as ContactFormPayload;
  const fullName = body.fullName?.trim() || "";
  const email = body.email?.trim() || "";
  const phone = body.phone?.trim() || "";
  const city = body.city?.trim() || "";
  const payload: Required<ContactFormPayload> = {
    fullName,
    email,
    phone,
    propertyType: body.propertyType?.trim() || "Residential",
    city,
    message: body.message?.trim() || "",
  };

  if (!fullName || !email || !phone || !city) {
    return res.status(400).json({ message: "This field is required" });
  }

  try {
    await sendMail(payload);
    res.json({ message: "Form submitted successfully" });
  } catch (error) {
    console.error("Contact form email failed:", error);
    res.status(500).json({
      message:
        process.env.NODE_ENV === "production"
          ? "Unable to submit form right now. Please try again later."
          : error instanceof Error
            ? error.message
            : "Unable to submit form right now. Please try again later.",
    });
  }
};
