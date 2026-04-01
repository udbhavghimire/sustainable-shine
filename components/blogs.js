import Link from "next/link";
import BlogImage from "./blog-image";

const API_BASE_URL = "https://api.sustainableshine.com.au/api";

async function fetchBlogs() {
  try {
    const response = await fetch(`${API_BASE_URL}/blog/`, {
      headers: {
        Accept: "application/json",
      },
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const publishedBlogs = (data.results || data || []).filter(
      (blog) => blog.status === "published"
    );
    
    // Get only the 4 most recent blogs
    return publishedBlogs.slice(0, 4);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getExcerpt(content, maxLength = 120) {
  if (!content) return "";
  const text = content.replace(/<[^>]*>/g, "");
  return text.length > maxLength
    ? text.substring(0, maxLength) + "..."
    : text;
}

export default async function Blogs() {
  const blogs = await fetchBlogs();

  if (blogs.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Latest from Our Blog
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with cleaning tips, eco-friendly advice, and home care insights
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {blogs.map((blog) => (
            <Link
              key={blog.slug}
              href={`/blog/${blog.slug}`}
              className="block group"
            >
              <article className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                <div className="aspect-video w-full overflow-hidden bg-gray-100">
                  {blog.featured_image ? (
                    <BlogImage src={blog.featured_image} alt={blog.title} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-50 to-emerald-100">
                      <svg
                        className="w-16 h-16 text-emerald-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center space-x-2 mb-3">
                    {blog.category && (
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">
                        {blog.category}
                      </span>
                    )}
                    <span className="text-xs text-gray-500">
                      {formatDate(blog.published_date || blog.created_at)}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                    {getExcerpt(blog.content)}
                  </p>
                  <div className="inline-flex items-center text-emerald-600 group-hover:text-emerald-700 font-medium text-sm mt-auto">
                    Read more
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center px-8 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-all shadow-md hover:shadow-lg"
          >
            View All Blog Posts
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
