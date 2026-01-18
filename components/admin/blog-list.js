"use client";

import { useState } from "react";

export default function BlogList({ blogs, onEdit, onDelete, onStatusChange }) {
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date-desc");

  // Get unique categories
  const categories = [
    ...new Set(blogs.map((blog) => blog.category).filter(Boolean)),
  ];

  // Filter and sort blogs
  const getFilteredBlogs = () => {
    let filtered = [...blogs];

    // Filter by status
    if (filterStatus !== "all") {
      filtered = filtered.filter((blog) => blog.status === filterStatus);
    }

    // Filter by category
    if (filterCategory !== "all") {
      filtered = filtered.filter((blog) => blog.category === filterCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (blog) =>
          blog.title?.toLowerCase().includes(query) ||
          blog.excerpt?.toLowerCase().includes(query) ||
          blog.tags?.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Sort
    switch (sortBy) {
      case "date-desc":
        filtered.sort(
          (a, b) =>
            new Date(b.published_date || b.created_at) -
            new Date(a.published_date || a.created_at)
        );
        break;
      case "date-asc":
        filtered.sort(
          (a, b) =>
            new Date(a.published_date || a.created_at) -
            new Date(b.published_date || b.created_at)
        );
        break;
      case "title":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "views":
        filtered.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;
      default:
        break;
    }

    return filtered;
  };

  const handlePublish = async (blog) => {
    if (confirm(`Publish "${blog.title}"?`)) {
      await onStatusChange(blog.slug, "published");
    }
  };

  const handleUnpublish = async (blog) => {
    if (confirm(`Unpublish "${blog.title}"?`)) {
      await onStatusChange(blog.slug, "draft");
    }
  };

  const handleDelete = async (blog) => {
    if (
      confirm(
        `Are you sure you want to delete "${blog.title}"? This action cannot be undone.`
      )
    ) {
      await onDelete(blog.slug);
    }
  };

  const filteredBlogs = getFilteredBlogs();

  return (
    <div className="space-y-6">
      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Posts"
          value={blogs.length}
          icon="📝"
          color="blue"
        />
        <StatCard
          title="Published"
          value={blogs.filter((b) => b.status === "published").length}
          icon="✅"
          color="green"
        />
        <StatCard
          title="Drafts"
          value={blogs.filter((b) => b.status === "draft").length}
          icon="📄"
          color="yellow"
        />
        <StatCard
          title="Featured"
          value={blogs.filter((b) => b.featured).length}
          icon="⭐"
          color="purple"
        />
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search posts..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="date-desc">Date (Newest)</option>
              <option value="date-asc">Date (Oldest)</option>
              <option value="title">Title (A-Z)</option>
              <option value="views">Views (Most)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Blog Posts List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {filteredBlogs.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-lg">No blog posts found</p>
            <p className="text-sm mt-2">Try adjusting your filters or create a new post</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredBlogs.map((blog) => (
              <BlogItem
                key={blog.id || blog.slug}
                blog={blog}
                onEdit={onEdit}
                onDelete={handleDelete}
                onPublish={handlePublish}
                onUnpublish={handleUnpublish}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }) {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600",
    yellow: "bg-yellow-50 text-yellow-600",
    green: "bg-green-50 text-green-600",
    purple: "bg-purple-50 text-purple-600",
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <div className={`text-3xl ${colorClasses[color]} rounded-lg p-2`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

function BlogItem({ blog, onEdit, onDelete, onPublish, onUnpublish }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="p-6 hover:bg-gray-50 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {blog.title}
            </h3>
            {blog.featured && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                ⭐ Featured
              </span>
            )}
            <span
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                blog.status === "published"
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {blog.status === "published" ? "Published" : "Draft"}
            </span>
          </div>

          {/* Meta Information */}
          <div className="flex items-center text-sm text-gray-500 space-x-4 mb-2">
            <span>📅 {new Date(blog.published_date || blog.created_at).toLocaleDateString()}</span>
            <span>👁️ {blog.views || 0} views</span>
            <span className="capitalize">
              📂 {blog.category?.replace(/-/g, " ")}
            </span>
            {blog.author && <span>✍️ {blog.author}</span>}
          </div>

          {/* Excerpt */}
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {blog.excerpt}
          </p>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {blog.tags.slice(0, 5).map((tag, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700"
                >
                  #{tag}
                </span>
              ))}
              {blog.tags.length > 5 && (
                <span className="text-xs text-gray-500">
                  +{blog.tags.length - 5} more
                </span>
              )}
            </div>
          )}

          {/* Expanded Content */}
          {isExpanded && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-gray-700 mb-1">Slug</p>
                  <p className="text-gray-600">{blog.slug}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700 mb-1">SEO Title</p>
                  <p className="text-gray-600">{blog.meta_title || "—"}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="font-medium text-gray-700 mb-1">
                    Meta Description
                  </p>
                  <p className="text-gray-600">
                    {blog.meta_description || "—"}
                  </p>
                </div>
                {(blog.image || blog.featured_image) && (
                  <div className="md:col-span-2">
                    <p className="font-medium text-gray-700 mb-2">
                      Featured Image
                    </p>
                    <img
                      src={blog.image || blog.featured_image}
                      alt={blog.title}
                      className="w-full max-w-md h-48 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-start space-x-2 ml-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            title={isExpanded ? "Show less" : "Show more"}
          >
            <svg
              className={`w-5 h-5 transition-transform ${
                isExpanded ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          <button
            onClick={() => onEdit(blog)}
            className="p-2 text-blue-600 hover:text-blue-700 rounded-lg hover:bg-blue-50"
            title="Edit"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>

          {blog.status === "draft" ? (
            <button
              onClick={() => onPublish(blog)}
              className="p-2 text-green-600 hover:text-green-700 rounded-lg hover:bg-green-50"
              title="Publish"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          ) : (
            <button
              onClick={() => onUnpublish(blog)}
              className="p-2 text-yellow-600 hover:text-yellow-700 rounded-lg hover:bg-yellow-50"
              title="Unpublish"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          )}

          <button
            onClick={() => onDelete(blog)}
            className="p-2 text-red-600 hover:text-red-700 rounded-lg hover:bg-red-50"
            title="Delete"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

