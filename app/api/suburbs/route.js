import { NextResponse } from "next/server";

const BACKEND_BASE = "https://api.sustainableshine.com.au/api/suburbs";

export async function GET(request) {
  try {
    const res = await fetch(`${BACKEND_BASE}/`, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ error: "Backend unavailable" }, { status: 502 });
  }
}

export async function POST(request) {
  const body = await request.text();
  const headers = { "Content-Type": "application/json" };
  const cookie = request.headers.get("cookie");
  if (cookie) headers["Cookie"] = cookie;
  const csrf = request.headers.get("x-csrftoken");
  if (csrf) headers["X-CSRFToken"] = csrf;

  try {
    const res = await fetch(`${BACKEND_BASE}/`, {
      method: "POST",
      headers,
      body,
      credentials: "include",
    });
    const text = await res.text();
    return new NextResponse(text, {
      status: res.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return NextResponse.json({ error: "Backend unavailable" }, { status: 502 });
  }
}
