import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

const DJANGO_API_URL = "https://api.sustainableshine.com.au/api";

function revalidateBlogPages(slug) {
  // Expire immediately so newly published posts show on the next request
  revalidateTag("blogs", { expire: 0 });
  revalidatePath("/blog");
  revalidatePath("/");
  if (slug) {
    revalidatePath(`/blog/${slug}`);
  }
}

export async function GET(request, { params }) {
  try {
    const { slug } = await params;

    const response = await fetch(`${DJANGO_API_URL}/blog/${slug}/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Proxy GET /blog/[slug] error:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog post" },
      { status: 500 },
    );
  }
}

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
        if (response.ok) {
          revalidateBlogPages(slug);
        }
        return NextResponse.json(data, { status: response.status });
      }

      // Regular update with JSON body
      const response = await fetch(`${DJANGO_API_URL}/blog/${slug}/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rest),
      });
      const data = await response.json();
      if (response.ok) {
        revalidateBlogPages(data.slug || slug);
      }
      return NextResponse.json(data, { status: response.status });
    }

    // FormData update (image upload)
    const formData = await request.formData();
    const response = await fetch(`${DJANGO_API_URL}/blog/${slug}/`, {
      method: "PATCH",
      body: formData,
    });
    const data = await response.json();
    if (response.ok) {
      revalidateBlogPages(data.slug || slug);
    }
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

    if (response.ok || response.status === 204) {
      revalidateBlogPages(slug);
    }

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
