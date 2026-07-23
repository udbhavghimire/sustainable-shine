import Link from "next/link";
import { fetchPublishedBlogs } from "@/lib/blogs";
import { getSuburbData } from "@/data/suburbs";

async function fetchBlogs() {
  try {
    return await fetchPublishedBlogs({ revalidate: 60 });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-AU", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function getExcerpt(text, maxLength = 90) {
  if (!text) return "";
  const cleaned = text.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
  return cleaned.length > maxLength
    ? cleaned.substring(0, maxLength).trimEnd() + "…"
    : cleaned;
}

function formatCategory(category) {
  if (!category) return "";
  return String(category).replace(/-/g, " ");
}

function getSuburbLabel(suburb) {
  if (!suburb || suburb === "none") return null;
  const suburbData = getSuburbData(String(suburb).toLowerCase());
  if (suburbData?.name) return suburbData.name;
  // Fallback: turn slug into a readable label
  return String(suburb)
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

// Generate metadata for SEO
export const metadata = {
  title: "Blog | Sustainable Shine - Cleaning Tips & Insights",
  description:
    "Expert advice, eco-friendly cleaning tips, and insights to keep your home sparkling clean. Browse our latest articles on sustainable cleaning practices.",
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
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/40 via-white to-gray-50 py-28">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold tracking-wide uppercase text-emerald-600 mb-2">
            Our Blog
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Cleaning Tips & Insights
          </h1>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Expert advice, eco-friendly cleaning tips, and insights to keep your
            home sparkling clean
          </p>
        </div>

        {blogs.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              No Blog Posts Yet
            </h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto text-sm">
              We&apos;re currently working on bringing you valuable content about
              cleaning, home maintenance, and eco-friendly living. Check back
              soon!
            </p>
            <Link
              href="/"
              className="inline-flex items-center px-5 py-2.5 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
            >
              Return to Home
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {blogs.map((blog) => {
              const suburbLabel = getSuburbLabel(blog.suburb);

              return (
                <Link
                  key={blog.slug}
                  href={`/blog/${blog.slug}`}
                  className="block group h-full"
                >
                  <article className="h-full flex flex-col bg-white rounded-xl border border-gray-200/80 overflow-hidden shadow-sm hover:shadow-md hover:border-emerald-200 transition-all duration-300 hover:-translate-y-0.5">
                    <div className="aspect-[17/10] w-full overflow-hidden bg-gray-100">
                      {blog.featured_image ? (
                        <img
                          src={blog.featured_image}
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-50 to-emerald-100">
                          <svg
                            className="w-12 h-12 text-emerald-300"
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

                    <div className="p-4 flex flex-col flex-grow">
                      {(blog.category || suburbLabel) && (
                        <div className="flex items-center gap-1.5 flex-wrap mb-2">
                          {blog.category && (
                            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-semibold uppercase tracking-wide rounded-md capitalize">
                              {formatCategory(blog.category)}
                            </span>
                          )}
                          {suburbLabel && (
                            <span className="px-2 py-0.5 bg-emerald-600 text-white text-[10px] font-semibold rounded-md">
                              {suburbLabel}
                            </span>
                          )}
                        </div>
                      )}
                      <h2 className="text-sm font-semibold text-gray-900 leading-snug mb-1.5 line-clamp-2 group-hover:text-emerald-700 transition-colors">
                        {blog.title}
                      </h2>
                      <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-3 flex-grow">
                        {getExcerpt(blog.excerpt || blog.content)}
                      </p>
                      <time className="text-[11px] text-gray-400 block">
                        Posted on {formatDate(blog.published_date || blog.created_at)}
                      </time>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
