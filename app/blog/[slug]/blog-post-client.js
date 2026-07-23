"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const API_BASE_URL = "https://api.sustainableshine.com.au/api";

export default function BlogPostClient({ params }) {
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [slug, setSlug] = useState(null);

  useEffect(() => {
    // Handle params being a Promise in Next.js 15+
    const resolveParams = async () => {
      const resolvedParams = await params;
      setSlug(resolvedParams.slug);
    };
    resolveParams();
  }, [params]);

  useEffect(() => {
    if (slug) {
      fetchBlog();
    }
  }, [slug]);

  const fetchBlog = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/blog/${slug}/`, {
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Blog post not found");
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Only show if published
      if (data.status !== "published") {
        throw new Error("Blog post not available");
      }

      setBlog(data);
    } catch (error) {
      console.error("Error fetching blog:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Process content to ensure proper HTML formatting
  const processContent = (content) => {
    if (!content) return "";

    // If content doesn't have HTML tags, convert line breaks to paragraphs
    if (!content.includes("<p>") && !content.includes("<br>")) {
      return content
        .split("\n\n")
        .filter((para) => para.trim())
        .map((para) => `<p>${para.trim().replace(/\n/g, "<br>")}</p>`)
        .join("");
    }

    return content;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading blog post...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm border border-red-200 p-12 text-center">
            <div className="text-6xl mb-4">😔</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {error === "Blog post not found" ||
              error === "Blog post not available"
                ? "Blog Post Not Found"
                : "Unable to Load Blog Post"}
            </h2>
            <p className="text-gray-600 mb-6">
              {error === "Blog post not found" ||
              error === "Blog post not available"
                ? "The blog post you're looking for doesn't exist or is no longer available."
                : "We're having trouble loading this blog post. Please try again later."}
            </p>
            <div className="flex items-center justify-center space-x-4">
              {error !== "Blog post not found" &&
                error !== "Blog post not available" && (
                  <button
                    onClick={fetchBlog}
                    className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-all"
                  >
                    Retry
                  </button>
                )}
              <Link
                href="/blog"
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-all"
              >
                Back to Blog
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 py-16">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <Link
          href="/blog"
          className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium mb-8"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Blog
        </Link>

        {/* Blog post */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Featured image */}
          {blog.featured_image && (
            <div className="aspect-video w-full overflow-hidden bg-gray-100">
              <img
                src={blog.featured_image}
                alt={blog.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentElement.style.display = "none";
                }}
              />
            </div>
          )}

          {/* Content */}
          <div className="p-8 md:p-12">
            {/* Category and date */}
            <div className="flex items-center space-x-3 mb-6">
              {blog.category && (
                <span className="px-4 py-1.5 bg-emerald-100 text-emerald-700 text-sm font-medium rounded-full">
                  {blog.category}
                </span>
              )}
              <span className="text-gray-500">
                {formatDate(blog.published_date || blog.created_at)}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {blog.title}
            </h1>

            {/* Author */}
            {(blog.author_name || blog.author) && (
              <div className="flex items-center space-x-2 mb-8 text-gray-600">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>By {blog.author_name || blog.author}</span>
              </div>
            )}

            {/* Blog content */}
            <div
              className="rich-text"
              dangerouslySetInnerHTML={{ __html: processContent(blog.content) }}
            />

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  Tags:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready for a Spotless Home?
          </h2>
          <p className="text-emerald-50 mb-6 max-w-2xl mx-auto">
            Let our professional cleaning team help you maintain a clean and
            healthy living space.
          </p>
          <Link
            href="/booking"
            className="inline-flex items-center px-8 py-3 bg-white text-emerald-600 rounded-lg font-medium hover:bg-emerald-50 transition-all"
          >
            Book a Cleaning Service
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
      </article>
    </div>
  );
}
