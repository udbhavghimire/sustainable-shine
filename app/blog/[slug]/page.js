import BlogPostClient from "./blog-post-client";

const API_BASE_URL = "https://sustainable-shine-backend.onrender.com/api";

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  
  try {
    const response = await fetch(`${API_BASE_URL}/blog/${resolvedParams.slug}/`, {
      headers: {
        Accept: "application/json",
      },
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (response.ok) {
      const blog = await response.json();
      
      return {
        title: blog.title || "Blog Post | Sustainable Shine",
        description: blog.meta_description || blog.content?.substring(0, 160) || "Read our latest blog post",
        keywords: blog.tags?.join(", ") || "",
        openGraph: {
          title: blog.title,
          description: blog.meta_description || blog.content?.substring(0, 160),
          type: "article",
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
