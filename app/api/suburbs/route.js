import { NextResponse } from "next/server";

const BACKEND_BASE = "https://api.sustainableshine.com.au/api/suburbs";

export async function GET() {
  try {
    const res = await fetch(`${BACKEND_BASE}/`, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Proxy GET /suburbs error:", error);
    return NextResponse.json({ error: "Backend unavailable" }, { status: 502 });
  }
}

export async function POST(request) {
  try {
    const body = await request.text();
    const res = await fetch(`${BACKEND_BASE}/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });

    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Proxy POST /suburbs error:", error);
    return NextResponse.json({ error: "Backend unavailable" }, { status: 502 });
  }
}
