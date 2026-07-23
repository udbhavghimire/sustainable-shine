"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { getAllSuburbs } from "@/data/suburbs";

// Dynamically import the rich text editor to avoid SSR issues
const RichTextEditor = dynamic(() => import("@/components/admin/rich-text-editor"), {
  ssr: false,
  loading: () => <p className="p-4 text-gray-500">Loading editor...</p>,
});

const suburbs = getAllSuburbs().sort((a, b) => a.name.localeCompare(b.name));

export default function BlogEditor({ blog, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "cleaning-tips",
    tags: "",
    featured_image: "",
    image: "",
    author: "",
    status: "draft",
    featured: false,
    suburb: "",
    meta_title: "",
    meta_description: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [imageFile, setImageFile] = useState(null); // Store the actual File object
  // TipTap only reliably picks up initial content on mount — wait until form is hydrated
  const [editorReady, setEditorReady] = useState(!blog);

  useEffect(() => {
    if (blog) {
      setEditorReady(false);

      // Handle tags - could be array (tags_list) or string (tags)
      let tagsString = "";
      if (Array.isArray(blog.tags_list)) {
        tagsString = blog.tags_list.join(", ");
      } else if (Array.isArray(blog.tags)) {
        tagsString = blog.tags.join(", ");
      } else if (typeof blog.tags === "string") {
        tagsString = blog.tags;
      }
      
      const newFormData = {
        title: blog.title || "",
        slug: blog.slug || "",
        excerpt: blog.excerpt || "",
        content: blog.content || "",
        category: blog.category || "cleaning-tips",
        tags: tagsString,
        featured_image: blog.featured_image || "",
        image: blog.featured_image || "",
        author: blog.author_name || blog.author || "",
        status: blog.status || "draft",
        featured: blog.featured || false,
        suburb: blog.suburb || "",
        meta_title: blog.meta_title || blog.title || "",
        meta_description: blog.meta_description || blog.excerpt || "",
      };
      
      setFormData(newFormData);
      
      // Set image preview to the featured_image URL from API
      setImagePreview(blog.featured_image || "");
      setImageFile(null); // Reset file when loading existing blog
      setEditorReady(true);
    } else {
      // Reset all states when creating new blog
      setImageFile(null);
      setImagePreview("");
      setEditorReady(true);
    }
  }, [blog]);

  // Auto-generate slug from title (slugify function)
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "") // Remove special characters
      .replace(/[\s_-]+/g, "-") // Replace spaces, underscores with single dash
      .replace(/^-+|-+$/g, ""); // Remove leading/trailing dashes
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    // Always auto-generate slug from title
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title),
    });
  };

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5MB");
      return;
    }

    setUploadingImage(true);
    setError("");

    try {
      // Store the actual File object for upload
      setImageFile(file);
      
      // Convert to base64 for preview
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setImagePreview(base64String);
        setUploadingImage(false);
      };
      reader.onerror = () => {
        setError("Failed to read image file");
        setUploadingImage(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setError("Failed to upload image");
      setUploadingImage(false);
    }
  };

  const removeImage = () => {
    setImagePreview("");
    setImageFile(null);
    setFormData({
      ...formData,
      image: "",
      featured_image: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Ensure slug is always generated from title before submitting
      const slug = generateSlug(formData.title || "");
      
      // Convert tags string to array
      const tagsArray = formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag);

      // Use FormData if we have an image file, otherwise use JSON
      let blogData;
      
      if (imageFile) {
        // Use FormData for file uploads (multipart/form-data)
        const formDataToSend = new FormData();
        formDataToSend.append("title", formData.title);
        formDataToSend.append("slug", slug);
        formDataToSend.append("excerpt", formData.excerpt);
        formDataToSend.append("content", formData.content);
        formDataToSend.append("category", formData.category);
        formDataToSend.append("featured_image", imageFile);
        formDataToSend.append("author_name", formData.author || "");
        formDataToSend.append("status", formData.status);
        formDataToSend.append("featured", formData.featured);
        formDataToSend.append("suburb", formData.suburb || "");
        formDataToSend.append("meta_title", formData.meta_title || "");
        formDataToSend.append("meta_description", formData.meta_description || "");
        
        // Append tags_list as JSON string (Django REST Framework will parse it)
        tagsArray.forEach(tag => {
          formDataToSend.append("tags_list", tag);
        });
        
        blogData = formDataToSend;
      } else {
        // Use JSON format when no image is being uploaded
        blogData = {
          title: formData.title,
          slug: slug,
          excerpt: formData.excerpt,
          content: formData.content,
          category: formData.category,
          tags_list: tagsArray,
          author_name: formData.author || "",
          status: formData.status,
          featured: formData.featured,
          suburb: formData.suburb || "",
          meta_title: formData.meta_title || "",
          meta_description: formData.meta_description || "",
        };
      }

      await onSave(blogData, !!imageFile); // Pass flag to indicate if it's FormData
    } catch (err) {
      setError(err.message || "Failed to save blog post");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900">
          {blog ? "Edit Blog Post" : "Create New Blog Post"}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={handleTitleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="Enter blog title"
          />
          <p className="mt-1 text-xs text-gray-500">
            Slug will be auto-generated from the title
          </p>
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Excerpt *
          </label>
          <textarea
            value={formData.excerpt}
            onChange={(e) =>
              setFormData({ ...formData, excerpt: e.target.value })
            }
            required
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="Brief summary of the blog post"
          />
        </div>

        {/* Content - Rich Text Editor */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content *
          </label>
          <div className="border border-gray-300 rounded-lg overflow-hidden">
            {editorReady ? (
              <RichTextEditor
                key={blog?.slug || blog?.id || "new-blog"}
                content={formData.content}
                onChange={(content) => {
                  setFormData((prev) => ({ ...prev, content }));
                }}
              />
            ) : (
              <p className="p-4 text-gray-500">Loading content...</p>
            )}
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Use the toolbar to format your content with headings, lists, links, and more
          </p>
        </div>

        {/* Category and Tags */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="cleaning-tips">Cleaning Tips</option>
              <option value="eco-friendly">Eco-Friendly</option>
              <option value="home-maintenance">Home Maintenance</option>
              <option value="seasonal">Seasonal</option>
              <option value="product-reviews">Product Reviews</option>
              <option value="before-after">Before & After</option>
              <option value="company-news">Company News</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) =>
                setFormData({ ...formData, tags: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="tag1, tag2, tag3"
            />
            <p className="mt-1 text-xs text-gray-500">
              Separate tags with commas
            </p>
          </div>
        </div>

        {/* Suburb */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Suburb Page
          </label>
          <select
            value={formData.suburb}
            onChange={(e) =>
              setFormData({ ...formData, suburb: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            <option value="">None (General — blog page only)</option>
            {suburbs.map((suburb) => (
              <option key={suburb.slug} value={suburb.slug}>
                {suburb.name} ({suburb.postcode})
              </option>
            ))}
          </select>
          <p className="mt-1 text-xs text-gray-500">
            Select a suburb to show this post on that suburb&apos;s page. Leave as None to keep it on the general blog only.
          </p>
        </div>

        {/* Featured Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Featured Image
          </label>
          
          {imagePreview ? (
            <div className="relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full max-w-2xl h-64 object-cover rounded-lg border border-gray-300"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-all"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-emerald-500 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
                disabled={uploadingImage}
              />
              <label
                htmlFor="image-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                {uploadingImage ? (
                  <>
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mb-4"></div>
                    <p className="text-gray-600">Uploading image...</p>
                  </>
                ) : (
                  <>
                    <svg
                      className="w-12 h-12 text-gray-400 mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="text-gray-600 mb-2">
                      Click to upload image or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 5MB
                    </p>
                  </>
                )}
              </label>
            </div>
          )}
        </div>

        {/* Author */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Author
          </label>
          <input
            type="text"
            value={formData.author}
            onChange={(e) =>
              setFormData({ ...formData, author: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="Author name"
          />
        </div>

        {/* SEO Fields */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            SEO Settings
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meta Title
              </label>
              <input
                type="text"
                value={formData.meta_title}
                onChange={(e) =>
                  setFormData({ ...formData, meta_title: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="SEO title (leave empty to use blog title)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meta Description
              </label>
              <textarea
                value={formData.meta_description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    meta_description: e.target.value,
                  })
                }
                rows="2"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="SEO description (leave empty to use excerpt)"
              />
            </div>
          </div>
        </div>

        {/* Status and Featured */}
        <div className="grid md:grid-cols-2 gap-6 border-t pt-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status *
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          <div className="flex items-center">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) =>
                  setFormData({ ...formData, featured: e.target.checked })
                }
                className="w-5 h-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
              />
              <span className="ml-2 text-sm font-medium text-gray-700">
                Featured Post
              </span>
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-4 border-t pt-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Saving..." : blog ? "Update Post" : "Create Post"}
          </button>
        </div>
      </form>
    </div>
  );
}

