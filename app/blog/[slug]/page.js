import BlogPostClient from "./blog-post-client";
import { fetchPublishedBlogs } from "@/lib/blogs";
import {
  BlogPostingSchema,
  BreadcrumbSchema,
} from "@/components/schema-markup";

const API_BASE_URL = "https://api.sustainableshine.com.au/api";

async function fetchBlogBySlug(slug) {
  try {
    const response = await fetch(`${API_BASE_URL}/blog/${slug}/`, {
      headers: {
        Accept: "application/json",
      },
      next: { revalidate: 60, tags: ["blogs"] },
    });

    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  try {
    const publishedBlogs = await fetchPublishedBlogs({ revalidate: 60 });
    return publishedBlogs.map((blog) => ({
      slug: blog.slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const blog = await fetchBlogBySlug(resolvedParams.slug);

  if (blog) {
    const stripHtml = (html) => {
      if (!html) return "";
      return html.replace(/<[^>]*>/g, "").substring(0, 160);
    };

    const description =
      blog.meta_description ||
      blog.excerpt ||
      stripHtml(blog.content) ||
      "Read our latest blog post";

    const author = blog.author_name || blog.author;

    return {
      title: blog.title || "Blog Post | Sustainable Shine",
      description: description,
      keywords: Array.isArray(blog.tags)
        ? blog.tags.join(", ")
        : blog.tags || "",
      openGraph: {
        title: blog.title,
        description: description,
        type: "article",
        publishedTime: blog.published_date || blog.created_at,
        authors: author ? [author] : [],
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

  return {
    title: "Blog Post | Sustainable Shine",
    description: "Read our latest blog post",
    alternates: {
      canonical: `https://sustainableshine.com.au/blog/${resolvedParams.slug}`,
    },
  };
}

export default async function BlogPost({ params }) {
  const resolvedParams = await params;
  const blog = await fetchBlogBySlug(resolvedParams.slug);

  return (
    <>
      <BlogPostClient params={params} />
      {blog && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(BlogPostingSchema({ blog })),
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(
                BreadcrumbSchema({
                  items: [
                    { name: "Home", url: "https://sustainableshine.com.au" },
                    {
                      name: "Blog",
                      url: "https://sustainableshine.com.au/blog",
                    },
                    {
                      name: blog.title,
                      url: `https://sustainableshine.com.au/blog/${resolvedParams.slug}`,
                    },
                  ],
                }),
              ),
            }}
          />
        </>
      )}
    </>
  );
}
