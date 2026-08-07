import { NextResponse } from "next/server";

const BACKEND_BASE = "https://api.sustainableshine.com.au/api/suburbs";

export async function GET(request, { params }) {
  const { slug } = await params;

  try {
    const res = await fetch(`${BACKEND_BASE}/${slug}/`, {
      next: { revalidate: 60 }, // cache for 60s, re-validate in background
      headers: { Accept: "application/json" },
    });

    if (res.status === 404) {
      return NextResponse.json(null, { status: 404 });
    }

    if (!res.ok) {
      return NextResponse.json(null, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(null, { status: 500 });
  }
}

export async function POST(request, { params }) {
  const { slug } = await params;
  const body = await request.text();
  return _proxy("POST", slug, body, request.headers);
}

export async function PATCH(request, { params }) {
  const { slug } = await params;
  const body = await request.text();
  return _proxy("PATCH", slug, body, request.headers);
}

export async function PUT(request, { params }) {
  const { slug } = await params;
  const body = await request.text();
  return _proxy("PUT", slug, body, request.headers);
}

export async function DELETE(request, { params }) {
  const { slug } = await params;
  return _proxy("DELETE", slug, null, request.headers);
}

async function _proxy(method, slug, body, inHeaders) {
  const headers = { "Content-Type": "application/json" };
  const cookie = inHeaders.get("cookie");
  if (cookie) headers["Cookie"] = cookie;
  const csrf = inHeaders.get("x-csrftoken");
  if (csrf) headers["X-CSRFToken"] = csrf;

  const options = { method, headers, credentials: "include" };
  if (body) options.body = body;

  try {
    const res = await fetch(`${BACKEND_BASE}/${slug}/`, options);
    const text = await res.text();
    return new NextResponse(text, {
      status: res.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return NextResponse.json({ error: "Backend unavailable" }, { status: 502 });
  }
}
