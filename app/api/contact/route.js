import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

function getBaseUrl(request) {
  const proto = request.headers.get("x-forwarded-proto") || "http";
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host");
  return `${proto}://${host}`;
}

export async function POST(request) {
  const formData = await request.formData();
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const message = String(formData.get("message") || "").trim();

  const redirectUrl = new URL("/contact", getBaseUrl(request));

  if (!name || !email || !message) {
    redirectUrl.searchParams.set("sent", "0");
    redirectUrl.searchParams.set("error", "missing_fields");
    return NextResponse.redirect(redirectUrl, { status: 303 });
  }

  if (!email.includes("@")) {
    redirectUrl.searchParams.set("sent", "0");
    redirectUrl.searchParams.set("error", "invalid_email");
    return NextResponse.redirect(redirectUrl, { status: 303 });
  }

  const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
  const smtpPort = Number(process.env.SMTP_PORT || "465");
  const smtpUsername = process.env.SMTP_USERNAME;
  const smtpPassword = process.env.SMTP_PASSWORD;
  const contactTo = process.env.CONTACT_TO_EMAIL || "olimasad@gmail.com";
  const fromEmail = process.env.CONTACT_FROM_EMAIL || smtpUsername || "no-reply@example.com";

  if (!smtpUsername || !smtpPassword) {
    redirectUrl.searchParams.set("sent", "0");
    redirectUrl.searchParams.set("error", "smtp_not_configured");
    return NextResponse.redirect(redirectUrl, { status: 303 });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: true,
      auth: {
        user: smtpUsername,
        pass: smtpPassword,
      },
    });

    await transporter.sendMail({
      subject: `New portfolio message from ${name.replace(/[\r\n]/g, " ")}`,
      from: fromEmail,
      to: contactTo,
      replyTo: email.replace(/[\r\n]/g, ""),
      text:
        "New message from your portfolio contact form.\n\n" +
        `Name: ${name}\n` +
        `Email: ${email}\n\n` +
        `Message:\n${message}\n`,
    });
  } catch {
    redirectUrl.searchParams.set("sent", "0");
    redirectUrl.searchParams.set("error", "send_failed");
    return NextResponse.redirect(redirectUrl, { status: 303 });
  }

  redirectUrl.searchParams.set("sent", "1");
  return NextResponse.redirect(redirectUrl, { status: 303 });
}
