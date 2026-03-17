import BlogPostClient from "./blog-post-client";

const API_BASE_URL = "https://api.sustainableshine.com.au/api";

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const resolvedParams = await params;

  try {
    const response = await fetch(
      `${API_BASE_URL}/blog/${resolvedParams.slug}/`,
      {
        headers: {
          Accept: "application/json",
        },
        next: { revalidate: 3600 }, // Revalidate every hour
      },
    );

    if (response.ok) {
      const blog = await response.json();

      // Strip HTML tags from content for meta description
      const stripHtml = (html) => {
        if (!html) return "";
        return html.replace(/<[^>]*>/g, "").substring(0, 160);
      };

      const description =
        blog.meta_description ||
        stripHtml(blog.content) ||
        "Read our latest blog post";

      return {
        title: blog.title || "Blog Post | Sustainable Shine",
        description: description,
        keywords: blog.tags?.join(", ") || "",
        openGraph: {
          title: blog.title,
          description: description,
          type: "article",
          publishedTime: blog.published_date || blog.created_at,
          authors: blog.author ? [blog.author] : [],
          images: blog.featured_image
            ? [
                {
                  url: blog.featured_image,
                  width: 1200,
                  height: 630,
                  alt: blog.title,
                },
              ]
            : [],
        },
        twitter: {
          card: "summary_large_image",
          title: blog.title,
          description: description,
          images: blog.featured_image ? [blog.featured_image] : [],
        },
        alternates: {
          canonical: `https://sustainableshine.com.au/blog/${resolvedParams.slug}`,
        },
      };
    }
  } catch (error) {
    console.error("Error fetching blog metadata:", error);
  }

  return {
    title: "Blog Post | Sustainable Shine",
    description: "Read our latest blog post",
    alternates: {
      canonical: `https://sustainableshine.com.au/blog/${resolvedParams.slug}`,
    },
  };
}

export default function BlogPost({ params }) {
  return <BlogPostClient params={params} />;
}
