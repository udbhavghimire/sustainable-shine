import { NextResponse } from "next/server";

const DJANGO_API_URL = "https://api.sustainableshine.com.au/api";

export async function GET(request, { params }) {
  try {
    const { slug } = await params;

    const response = await fetch(`${DJANGO_API_URL}/suburbs/${slug}/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Proxy GET /suburbs/[slug] error:", error);
    return NextResponse.json(
      { error: "Failed to fetch suburb description" },
      { status: 500 },
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    const { slug } = await params;
    const contentType = request.headers.get("content-type") || "";
    let body;
    const headers = {};

    if (contentType.includes("application/json")) {
      const jsonBody = await request.json();
      body = JSON.stringify(jsonBody);
      headers["Content-Type"] = "application/json";
    } else {
      body = await request.text();
      headers["Content-Type"] = "application/json";
    }

    const response = await fetch(`${DJANGO_API_URL}/suburbs/${slug}/`, {
      method: "PATCH",
      headers,
      body,
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Proxy PATCH /suburbs/[slug] error:", error);
    return NextResponse.json(
      { error: "Failed to update suburb description" },
      { status: 500 },
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { slug } = await params;

    const response = await fetch(`${DJANGO_API_URL}/suburbs/${slug}/`, {
      method: "DELETE",
    });

    if (response.ok || response.status === 204) {
      return new NextResponse(null, { status: 204 });
    }

    const data = await response.json().catch(() => ({}));
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Proxy DELETE /suburbs/[slug] error:", error);
    return NextResponse.json(
      { error: "Failed to delete suburb description" },
      { status: 500 },
    );
  }
}
