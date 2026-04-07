import { NextResponse } from "next/server";

const DJANGO_API_URL = "https://api.sustainableshine.com.au/api";

export async function GET() {
  try {
    const response = await fetch(`${DJANGO_API_URL}/blog/`, {
      headers: { Accept: "application/json" },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Proxy GET /blog error:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    let body;
    const headers = {};

    if (contentType.includes("multipart/form-data")) {
      // Forward FormData as-is; fetch sets the correct Content-Type + boundary
      body = await request.formData();
    } else {
      body = await request.text();
      headers["Content-Type"] = "application/json";
    }

    const response = await fetch(`${DJANGO_API_URL}/blog/`, {
      method: "POST",
      headers,
      body,
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Proxy POST /blog error:", error);
    return NextResponse.json(
      { error: "Failed to create blog post" },
      { status: 500 },
    );
  }
}
