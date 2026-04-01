import Link from "next/link";

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
    // Only show published blogs
    const publishedBlogs = (data.results || data || []).filter(
      (blog) => blog.status === "published",
    );
    return publishedBlogs;
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

function getExcerpt(content, maxLength = 150) {
  if (!content) return "";
  const text = content.replace(/<[^>]*>/g, ""); // Strip HTML tags
  return text.length > maxLength
    ? text.substring(0, maxLength) + "..."
    : text;
}

// Generate metadata for SEO
export const metadata = {
  title: "Blog | Sustainable Shine - Cleaning Tips & Insights",
  description: "Expert advice, eco-friendly cleaning tips, and insights to keep your home sparkling clean. Browse our latest articles on sustainable cleaning practices.",
  openGraph: {
    title: "Blog | Sustainable Shine",
    description: "Expert cleaning tips and eco-friendly home care insights",
    type: "website",
  },
  alternates: {
    canonical: "https://sustainableshine.com.au/blog",
  },
};

export default async function Blog() {
  const blogs = await fetchBlogs();

  return (
    <div className="min-h-screen bg-gray-50 py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Cleaning Tips & Insights
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert advice, eco-friendly cleaning tips, and insights to keep your
            home sparkling clean
          </p>
        </div>

        {blogs.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <div className="text-6xl mb-4">📝</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              No Blog Posts Yet
            </h2>
            <p className="text-gray-600 mb-6">
              We're currently working on bringing you valuable content about
              cleaning, home maintenance, and eco-friendly living. Check back
              soon!
            </p>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-all"
            >
              Return to Home
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <Link
                key={blog.slug}
                href={`/blog/${blog.slug}`}
                className="block group"
              >
                <article className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full">
                  <div className="aspect-video w-full overflow-hidden bg-gray-100">
                    {blog.featured_image ? (
                      <img
                        src={blog.featured_image}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-50 to-emerald-100">
                        <svg
                          className="w-20 h-20 text-emerald-300"
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
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      {blog.category && (
                        <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">
                          {blog.category}
                        </span>
                      )}
                      <span className="text-sm text-gray-500">
                        {formatDate(blog.published_date || blog.created_at)}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
                      {blog.title}
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {getExcerpt(blog.content)}
                    </p>
                    {blog.author && (
                      <div className="flex items-center space-x-2 mb-4 text-sm text-gray-500">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>By {blog.author}</span>
                      </div>
                    )}
                    <div className="inline-flex items-center text-emerald-600 group-hover:text-emerald-700 font-medium">
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
        )}
      </div>
    </div>
  );
}
