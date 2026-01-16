import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

function env(name: string, fallback?: string) {
  const v = process.env[name] ?? fallback;
  if (!v) throw new Error(`Missing environment variable: ${name}`);
  return v;
}

function isValidEmail(value: string) {
  return /.+@.+\..+/.test(value);
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { name?: string; email?: string; message?: string };
    const name = (body.name || '').trim();
    const email = (body.email || '').trim();
    const message = (body.message || '').trim();

    if (name.length < 2) {
      return NextResponse.json({ ok: false, message: 'Name is required.' }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ ok: false, message: 'Valid email is required.' }, { status: 400 });
    }
    if (message.length < 10) {
      return NextResponse.json({ ok: false, message: 'Message must be at least 10 characters.' }, { status: 400 });
    }

    // Gmail SMTP (recommended):
    // SMTP_HOST=smtp.gmail.com
    // SMTP_PORT=465
    // SMTP_SECURE=true
    // SMTP_USER=your_gmail@gmail.com
    // SMTP_PASS=your_app_password
    const host = env('SMTP_HOST', 'smtp.gmail.com');
    const port = Number(process.env.SMTP_PORT || '465');
    const secure = (process.env.SMTP_SECURE || 'true') === 'true';
    const user = env('SMTP_USER');
    const pass = env('SMTP_PASS');

    // Where you want to receive the messages.
    const to = process.env.CONTACT_TO || 'mandavavenkatasrisaisurya@gmail.com';

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    });

    const subject = `Portfolio Contact: ${name}`;
    const text = `New message from your portfolio contact form\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n`;

    await transporter.sendMail({
      from: `Portfolio Contact <${user}>`,
      to,
      replyTo: email,
      subject,
      text,
      html: `
        <div style="font-family: ui-sans-serif, system-ui, -apple-system; line-height: 1.6;">
          <h2 style="margin: 0 0 12px;">New portfolio message</h2>
          <p style="margin: 0 0 6px;"><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p style="margin: 0 0 6px;"><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p style="margin: 16px 0 6px;"><strong>Message:</strong></p>
          <pre style="white-space: pre-wrap; padding: 12px; border-radius: 12px; background: #f5f5f5;">${escapeHtml(
            message,
          )}</pre>
        </div>
      `.trim(),
    });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    // Avoid leaking secrets; return generic error.
    return NextResponse.json({ ok: false, message: e?.message || 'Server error' }, { status: 500 });
  }
}

function escapeHtml(input: string) {
  return input
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}
