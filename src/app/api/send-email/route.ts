import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { validateName, validateEmail, validateContent } from "@/lib/utils/validation";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

const rateLimit = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + 15 * 60 * 1000 });
    return true;
  }

  if (entry.count >= 5) return false;
  entry.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, content, honeypot } = body;

    if (honeypot) {
      return NextResponse.json({ success: true });
    }

    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const contentError = validateContent(content);

    if (nameError || emailError || contentError) {
      return NextResponse.json(
        { error: "Validation failed", nameError, emailError, contentError },
        { status: 400 }
      );
    }

    const { data, error } = await getResend().emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["contact@dooma.dev"],
      subject: `New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${content}`,
      replyTo: email,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error("Email send error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
