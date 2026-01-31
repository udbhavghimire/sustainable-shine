"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const API_BASE_URL = "https://sustainable-shine-backend.onrender.com/api";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/blog/`, {
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // Only show published blogs
      const publishedBlogs = (data.results || data || []).filter(
        (blog) => blog.status === "published"
      );
      setBlogs(publishedBlogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
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

  const getExcerpt = (content, maxLength = 150) => {
    if (!content) return "";
    const text = content.replace(/<[^>]*>/g, ""); // Strip HTML tags
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
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

        {isLoading ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading blog posts...</p>
          </div>
        ) : error ? (
          <div className="bg-white rounded-lg shadow-sm border border-red-200 p-12 text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Unable to Load Blogs
            </h2>
            <p className="text-gray-600 mb-6">
              We're having trouble connecting to our server. Please try again
              later.
            </p>
            <button
              onClick={fetchBlogs}
              className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-all"
            >
              Retry
            </button>
          </div>
        ) : blogs.length === 0 ? (
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
              <article
                key={blog.slug}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="aspect-video w-full overflow-hidden bg-gray-100">
                  {blog.featured_image ? (
                    <img
                      src={blog.featured_image}
                      alt={blog.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        console.error("Image failed to load:", blog.featured_image);
                        e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450' viewBox='0 0 800 450'%3E%3Crect fill='%23e5e7eb' width='800' height='450'/%3E%3Ctext fill='%239ca3af' font-family='sans-serif' font-size='24' x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle'%3EImage Not Found%3C/text%3E%3C/svg%3E";
                      }}
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
                  <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-emerald-600 transition-colors">
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
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium"
                  >
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
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

