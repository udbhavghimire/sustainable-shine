import { NextResponse } from "next/server";

const DJANGO_API_URL = "https://api.sustainableshine.com.au/api";

export async function GET() {
  try {
    const allSuburbs = [];
    let url = `${DJANGO_API_URL}/suburbs/`;

    while (url) {
      const response = await fetch(url, {
        headers: { Accept: "application/json" },
        cache: "no-store",
      });
      const data = await response.json();
      if (!response.ok) {
        return NextResponse.json(data, { status: response.status });
      }
      allSuburbs.push(...(data.results || (Array.isArray(data) ? data : [])));
      url = data.next || null;
    }

    return NextResponse.json({
      count: allSuburbs.length,
      next: null,
      previous: null,
      results: allSuburbs,
    });
  } catch (error) {
    console.error("Proxy GET /suburbs error:", error);
    return NextResponse.json(
      { error: "Failed to fetch suburbs" },
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
      body = await request.formData();
    } else {
      body = await request.text();
      headers["Content-Type"] = "application/json";
    }

    const response = await fetch(`${DJANGO_API_URL}/suburbs/`, {
      method: "POST",
      headers,
      body,
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Proxy POST /suburbs error:", error);
    return NextResponse.json(
      { error: "Failed to create suburb description" },
      { status: 500 },
    );
  }
}
