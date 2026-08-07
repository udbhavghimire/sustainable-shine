"use client";

import { useState, useEffect } from "react";

const SUBURBS_API = "/api/suburbs";

export default function SuburbsSection() {
  const [suburbs, setSuburbs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSuburb, setEditingSuburb] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [form, setForm] = useState({
    slug: "",
    name: "",
    description: "",
    is_active: true,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSuburbs();
  }, []);

  const fetchSuburbs = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(SUBURBS_API, {
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error("Failed to fetch suburbs");
      const data = await res.json();
      setSuburbs(data.results || (Array.isArray(data) ? data : []));
    } catch (err) {
      console.error(err);
      setSuburbs([]);
    } finally {
      setIsLoading(false);
    }
  };

  const openCreate = () => {
    setEditingSuburb(null);
    setForm({ slug: "", name: "", description: "", is_active: true });
    setError(null);
    setShowForm(true);
  };

  const openEdit = async (suburb) => {
    setIsSaving(true);
    setError(null);
    try {
      const res = await fetch(`${SUBURBS_API}/${suburb.slug}`, {
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error("Failed to load suburb details");
      const fullData = await res.json();
      setEditingSuburb(fullData);
      setForm({
        slug: fullData.slug || suburb.slug,
        name: fullData.name || suburb.name,
        description: fullData.description || "",
        is_active: fullData.is_active !== undefined ? fullData.is_active : true,
      });
      setShowForm(true);
    } catch (err) {
      alert("Failed to load details: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  // Auto-generate slug from name (only when creating)
  const handleNameChange = (e) => {
    const name = e.target.value;
    setForm((prev) => ({
      ...prev,
      name,
      ...(editingSuburb
        ? {}
        : {
            slug: name
              .toLowerCase()
              .replace(/\s+/g, "-")
              .replace(/[^a-z0-9-]/g, ""),
          }),
    }));
  };

  const handleSave = async () => {
    if (!form.slug.trim() || !form.name.trim() || !form.description.trim()) {
      setError("Slug, name, and description are all required.");
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      const url = editingSuburb
        ? `${SUBURBS_API}/${editingSuburb.slug}`
        : SUBURBS_API;
      const method = editingSuburb ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: form.slug.trim(),
          name: form.name.trim(),
          description: form.description,
          is_active: form.is_active,
        }),
      });

      const responseData = await res.json().catch(() => ({}));

      if (!res.ok) {
        let errorMessage = "Failed to save suburb description";
        if (responseData.message) {
          errorMessage = responseData.message;
        } else if (typeof responseData === "object") {
          const fieldErrors = Object.entries(responseData)
            .map(([field, errors]) => {
              const errorList = Array.isArray(errors) ? errors : [errors];
              return `${field}: ${errorList.join(", ")}`;
            })
            .join("; ");
          if (fieldErrors) errorMessage = fieldErrors;
        }
        throw new Error(errorMessage);
      }

      await fetchSuburbs();
      setShowForm(false);
      setEditingSuburb(null);
      alert(
        editingSuburb
          ? "Suburb description updated successfully!"
          : "Suburb description created successfully!"
      );
    } catch (err) {
      console.error("Error saving suburb:", err);
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (slug) => {
    if (
      !confirm(
        `Delete suburb description for "${slug}"? This cannot be undone.`
      )
    )
      return;

    try {
      const res = await fetch(`${SUBURBS_API}/${slug}`, { method: "DELETE" });
      if (!res.ok && res.status !== 204) throw new Error("Delete failed");
      await fetchSuburbs();
      alert("Suburb description deleted successfully.");
    } catch (err) {
      alert("Failed to delete: " + err.message);
    }
  };

  const handleToggleActive = async (suburb) => {
    try {
      const res = await fetch(`${SUBURBS_API}/${suburb.slug}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_active: !suburb.is_active }),
      });
      if (!res.ok) throw new Error("Update failed");
      await fetchSuburbs();
    } catch (err) {
      alert("Failed to update: " + err.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Suburb Descriptions
          </h2>
          <p className="text-gray-600 mt-1">
            Manage suburb-specific content shown below the FAQ on each suburb
            page.
          </p>
        </div>
        {!showForm && (
          <button
            onClick={openCreate}
            className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-all flex items-center space-x-2"
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
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span>Add Suburb</span>
          </button>
        )}
      </div>

      {/* Create / Edit Form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-5">
          <h3 className="text-lg font-semibold text-gray-900">
            {editingSuburb
              ? `Editing: ${editingSuburb.name}`
              : "New Suburb Description"}
          </h3>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Suburb Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.name}
                onChange={handleNameChange}
                placeholder="e.g. Bondi Beach"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL Slug <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.slug}
                onChange={(e) =>
                  setForm((p) => ({ ...p, slug: e.target.value }))
                }
                placeholder="e.g. bondi-beach"
                disabled={!!editingSuburb}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-50 disabled:text-gray-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Must match the suburb page URL (e.g. /bondi-beach → bondi-beach)
              </p>
            </div>
          </div>

          {/* Active toggle */}
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() =>
                setForm((p) => ({ ...p, is_active: !p.is_active }))
              }
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${
                form.is_active ? "bg-emerald-500" : "bg-gray-200"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform transition duration-200 ${
                  form.is_active ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
            <span className="text-sm text-gray-700">
              {form.is_active
                ? "Active — visible on suburb page"
                : "Inactive — hidden from public"}
            </span>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm((p) => ({ ...p, description: e.target.value }))
              }
              rows={10}
              placeholder="Enter the suburb description. HTML is supported."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
            />
            <p className="text-xs text-gray-500 mt-1">
              HTML is supported (e.g. &lt;p&gt;, &lt;h3&gt;, &lt;ul&gt;,
              &lt;strong&gt;).
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3 pt-2">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-6 py-2.5 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 disabled:opacity-60 transition-all"
            >
              {isSaving ? "Saving…" : editingSuburb ? "Save Changes" : "Create"}
            </button>
            <button
              onClick={() => {
                setShowForm(false);
                setEditingSuburb(null);
                setError(null);
              }}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      {isLoading ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto" />
          <p className="mt-4 text-gray-600">Loading suburbs…</p>
        </div>
      ) : suburbs.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-emerald-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No suburb descriptions yet
          </h3>
          <p className="text-gray-500 text-sm">
            Add a suburb description to display custom content below the FAQ on
            suburb pages.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Suburb
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Slug
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Updated
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {suburbs.map((suburb) => (
                <tr
                  key={suburb.slug}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-gray-900">
                      {suburb.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <code className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded font-mono">
                      /{suburb.slug}
                    </code>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleToggleActive(suburb)}
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                        suburb.is_active
                          ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                          suburb.is_active ? "bg-emerald-500" : "bg-gray-400"
                        }`}
                      />
                      {suburb.is_active ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(suburb.updated_at).toLocaleDateString("en-AU", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                    <button
                      onClick={() => openEdit(suburb)}
                      className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(suburb.slug)}
                      className="text-sm text-red-500 hover:text-red-700 font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
