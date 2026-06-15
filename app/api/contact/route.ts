import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

function escapeHtml(str: unknown) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, pet, service, date, notes } = body;

    const to = process.env.TO_EMAIL || "jeremiahbarzaga511@gmail.com";
    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (!host || !user || !pass) {
      return NextResponse.json(
        { error: "SMTP not configured. Set SMTP_HOST, SMTP_USER, SMTP_PASS in environment." },
        { status: 500 },
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    const html = `
      <h2>New appointment request</h2>
      <ul>
        <li><strong>Name:</strong> ${escapeHtml(name)}</li>
        <li><strong>Pet:</strong> ${escapeHtml(pet)}</li>
        <li><strong>Service:</strong> ${escapeHtml(service)}</li>
        <li><strong>Date:</strong> ${escapeHtml(date)}</li>
        <li><strong>Notes:</strong> ${escapeHtml(notes)}</li>
      </ul>
    `;

    await transporter.sendMail({
      from: `Website <${user}>`,
      to,
      subject: `Appointment request from ${escapeHtml(name) || "website"}`,
      text: `Name: ${name}\nPet: ${pet}\nService: ${service}\nDate: ${date}\nNotes: ${notes}`,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: String(err?.message || err) }, { status: 500 });
  }
}
