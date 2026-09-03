import type { FormData } from "./types";

export async function sendEmail(data: FormData & { honeypot?: string }) {
  const response = await fetch("/api/send-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const result = await response.json();
    throw new Error(result.error || "Failed to send email");
  }

  return response.json();
}
