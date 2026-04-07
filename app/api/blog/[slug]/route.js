import { NextResponse } from "next/server";

const DJANGO_API_URL = "https://api.sustainableshine.com.au/api";

export async function PATCH(request, { params }) {
  try {
    const { slug } = await params;
    const contentType = request.headers.get("content-type") || "";

    // Check for publish/unpublish action (sent as JSON with an `action` key)
    if (contentType.includes("application/json")) {
      const body = await request.json();
      const { action, ...rest } = body;

      if (action === "publish" || action === "unpublish") {
        const response = await fetch(
          `${DJANGO_API_URL}/blog/${slug}/${action}/`,
          { method: "PATCH" },
        );
        const data = await response.json().catch(() => ({}));
        return NextResponse.json(data, { status: response.status });
      }

      // Regular update with JSON body
      const response = await fetch(`${DJANGO_API_URL}/blog/${slug}/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rest),
      });
      const data = await response.json();
      return NextResponse.json(data, { status: response.status });
    }

    // FormData update (image upload)
    const formData = await request.formData();
    const response = await fetch(`${DJANGO_API_URL}/blog/${slug}/`, {
      method: "PATCH",
      body: formData,
    });
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Proxy PATCH /blog/[slug] error:", error);
    return NextResponse.json(
      { error: "Failed to update blog post" },
      { status: 500 },
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { slug } = await params;

    const response = await fetch(`${DJANGO_API_URL}/blog/${slug}/`, {
      method: "DELETE",
    });

    if (response.status === 204) {
      return new NextResponse(null, { status: 204 });
    }

    const data = await response.json().catch(() => ({}));
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Proxy DELETE /blog/[slug] error:", error);
    return NextResponse.json(
      { error: "Failed to delete blog post" },
      { status: 500 },
    );
  }
}
