import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(80, "Name is too long"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().max(120, "Subject is too long").optional().or(z.literal("")),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message is too long"),
});

const OWNER_EMAIL = "kashyappatel326@gmail.com";

// Simple in-memory rate limiting (per IP, per window)
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 4;
const hits = new Map<string, { count: number; first: number }>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now - entry.first > RATE_WINDOW_MS) {
    hits.set(ip, { count: 1, first: now });
    return true;
  }
  if (entry.count >= RATE_MAX) return false;
  entry.count += 1;
  return true;
}

function buildMailto(
  name: string,
  email: string,
  subject: string | undefined,
  message: string,
  idHint?: string
) {
  const mailSubject =
    subject && subject.length > 0 ? subject : `Portfolio message from ${name}`;
  const mailBody = [
    `Name: ${name}`,
    `Email: ${email}`,
    "",
    "Message:",
    message,
    "",
    `— Sent via kashyap-p portfolio${idHint ? ` (message id: ${idHint})` : ""}`,
  ].join("\n");
  return `mailto:${OWNER_EMAIL}?subject=${encodeURIComponent(
    mailSubject
  )}&body=${encodeURIComponent(mailBody)}`;
}

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    if (!rateLimit(ip)) {
      return NextResponse.json(
        { ok: false, error: "Too many messages. Please try again in a minute." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0];
      return NextResponse.json(
        { ok: false, error: firstError?.message ?? "Invalid input" },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = parsed.data;

    // Try to persist to the database. On serverless platforms without a
    // persistent filesystem (e.g. Vercel without an external DB), this will
    // fail gracefully — we still return success with a mailto fallback so the
    // visitor can deliver the message via their own email client.
    let savedId: string | undefined;
    let persisted = false;
    try {
      const saved = await db.contactMessage.create({
        data: {
          name,
          email,
          subject: subject && subject.length > 0 ? subject : null,
          message,
        },
      });
      savedId = saved.id;
      persisted = true;
      console.log(
        `[contact] New message from ${name} <${email}> (id: ${savedId}) → ${OWNER_EMAIL}`
      );
    } catch (dbErr) {
      // Database unavailable (e.g. Vercel serverless, no DATABASE_URL).
      // Non-fatal — the mailto fallback still delivers the message.
      console.warn(
        "[contact] DB persist skipped (database unavailable). Falling back to mailto only.",
        dbErr instanceof Error ? dbErr.message : dbErr
      );
    }

    const mailto = buildMailto(name, email, subject, message, savedId);

    return NextResponse.json({
      ok: true,
      id: savedId ?? `mailto-${Date.now()}`,
      persisted,
      recipient: OWNER_EMAIL,
      mailto,
      message: persisted
        ? "Thanks! Your message has been received."
        : "Thanks! Use the email link to send your message directly.",
    });
  } catch (err) {
    console.error("[contact] error", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
