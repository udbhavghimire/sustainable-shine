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

export async function GET() {
  try {
    // Proxy all pages so admin sees every post
    const allBlogs = [];
    let url = `${DJANGO_API_URL}/blog/`;

    while (url) {
      const response = await fetch(url, {
        headers: { Accept: "application/json" },
        cache: "no-store",
      });
      const data = await response.json();
      if (!response.ok) {
        return NextResponse.json(data, { status: response.status });
      }
      allBlogs.push(...(data.results || (Array.isArray(data) ? data : [])));
      url = data.next || null;
    }

    return NextResponse.json({
      count: allBlogs.length,
      next: null,
      previous: null,
      results: allBlogs,
    });
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
    if (response.ok) {
      revalidateBlogPages(data.slug);
    }
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Proxy POST /blog error:", error);
    return NextResponse.json(
      { error: "Failed to create blog post" },
      { status: 500 },
    );
  }
}
