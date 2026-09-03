import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { urls } = await request.json();

    if (!Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json({ error: "urls array required" }, { status: 400 });
    }

    const results = await Promise.allSettled(
      urls.map(async (url: string) => {
        try {
          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), 5000);

          const response = await fetch(url, {
            method: "HEAD",
            signal: controller.signal,
            redirect: "follow",
          });

          clearTimeout(timeout);
          return { url, ok: response.ok, status: response.status };
        } catch {
          return { url, ok: false, status: 0 };
        }
      })
    );

    const statusMap: Record<string, boolean> = {};
    results.forEach((result) => {
      if (result.status === "fulfilled") {
        statusMap[result.value.url] = result.value.ok;
      } else {
        statusMap["unknown"] = false;
      }
    });

    return NextResponse.json({ statusMap });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
