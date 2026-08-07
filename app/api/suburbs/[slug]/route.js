import { NextResponse } from "next/server";

const BACKEND_BASE = "https://api.sustainableshine.com.au/api/suburbs";

export async function GET(request, { params }) {
  const { slug } = await params;

  try {
    const res = await fetch(`${BACKEND_BASE}/${slug}/`, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });

    if (res.status === 404) {
      return NextResponse.json(null, { status: 404 });
    }

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Proxy GET /suburbs/[slug] error:", error);
    return NextResponse.json(null, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  try {
    const { slug } = await params;
    const body = await request.text();

    const res = await fetch(`${BACKEND_BASE}/${slug}/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body,
    });

    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Proxy PATCH /suburbs/[slug] error:", error);
    return NextResponse.json({ error: "Backend unavailable" }, { status: 502 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { slug } = await params;
    const body = await request.text();

    const res = await fetch(`${BACKEND_BASE}/${slug}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body,
    });

    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Proxy PUT /suburbs/[slug] error:", error);
    return NextResponse.json({ error: "Backend unavailable" }, { status: 502 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { slug } = await params;

    const res = await fetch(`${BACKEND_BASE}/${slug}/`, {
      method: "DELETE",
    });

    if (res.ok || res.status === 204) {
      return new NextResponse(null, { status: 204 });
    }

    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Proxy DELETE /suburbs/[slug] error:", error);
    return NextResponse.json({ error: "Backend unavailable" }, { status: 502 });
  }
}
