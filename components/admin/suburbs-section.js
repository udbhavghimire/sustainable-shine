"use client";

import { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { getAllSuburbs } from "@/data/suburbs";

const TinyMCEEditor = dynamic(() => import("@/components/admin/tinymce-editor"), {
  ssr: false,
  loading: () => (
    <div className="border border-gray-300 rounded-lg p-4 text-sm text-gray-500">
      Loading editor…
    </div>
  ),
});

const stripHtml = (html) =>
  (html || "").replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();

const SUBURBS_API = "/api/suburbs";

export default function SuburbsSection() {
  const staticSuburbs = useMemo(() => getAllSuburbs(), []);
  const [backendSuburbs, setBackendSuburbs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); // 'all', 'configured', 'unconfigured', 'active', 'inactive'

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
  const [editorReady, setEditorReady] = useState(false);

  useEffect(() => {
    fetchBackendSuburbs();
  }, []);

  const fetchBackendSuburbs = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(SUBURBS_API, {
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error("Failed to fetch backend suburbs");
      const data = await res.json();
      setBackendSuburbs(data.results || (Array.isArray(data) ? data : []));
    } catch (err) {
      console.error("Error fetching backend suburbs:", err);
      setBackendSuburbs([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Map backend suburbs by slug for fast lookup
  const backendMap = useMemo(() => {
    const map = {};
    for (const item of backendSuburbs) {
      if (item && item.slug) {
        map[item.slug] = item;
      }
    }
    return map;
  }, [backendSuburbs]);

  // Combine static suburbs from data/suburbs.js with backend entries
  const combinedSuburbs = useMemo(() => {
    // Start with all suburbs from data/suburbs.js
    const list = staticSuburbs.map((item) => {
      const saved = backendMap[item.slug];
      return {
        slug: item.slug,
        name: item.name,
        postcode: item.postcode,
        isConfigured: !!saved,
        is_active: saved ? saved.is_active : false,
        updated_at: saved ? saved.updated_at : null,
        backendData: saved || null,
      };
    });

    // Also include any backend suburb that might not be in static file
    for (const [slug, saved] of Object.entries(backendMap)) {
      if (!list.some((s) => s.slug === slug)) {
        list.push({
          slug,
          name: saved.name || slug,
          postcode: "",
          isConfigured: true,
          is_active: saved.is_active,
          updated_at: saved.updated_at,
          backendData: saved,
        });
      }
    }

    return list.sort((a, b) => a.name.localeCompare(b.name));
  }, [staticSuburbs, backendMap]);

  // Filter suburbs by search query and status filter
  const filteredSuburbs = useMemo(() => {
    return combinedSuburbs.filter((suburb) => {
      // Search check
      const query = searchQuery.trim().toLowerCase();
      if (query) {
        const matchName = suburb.name.toLowerCase().includes(query);
        const matchSlug = suburb.slug.toLowerCase().includes(query);
        const matchPostcode = suburb.postcode.includes(query);
        if (!matchName && !matchSlug && !matchPostcode) return false;
      }

      // Status check
      if (filterStatus === "configured") return suburb.isConfigured;
      if (filterStatus === "unconfigured") return !suburb.isConfigured;
      if (filterStatus === "active") return suburb.is_active;
      if (filterStatus === "inactive") return suburb.isConfigured && !suburb.is_active;

      return true;
    });
  }, [combinedSuburbs, searchQuery, filterStatus]);

  const openCreate = () => {
    setEditingSuburb(null);
    setForm({ slug: "", name: "", description: "", is_active: true });
    setError(null);
    setEditorReady(true);
    setShowForm(true);
  };

  const openEdit = async (suburb) => {
    setIsSaving(true);
    setError(null);
    setEditorReady(false);

    let currentDescription = "";
    let isActiveStatus = true;

    try {
      const res = await fetch(`${SUBURBS_API}/${suburb.slug}`, {
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        const fullData = await res.json();
        currentDescription = fullData.description || "";
        if (fullData.is_active !== undefined) {
          isActiveStatus = fullData.is_active;
        }
      }
    } catch {
      // Backend description doesn't exist yet for this suburb
    }

    setEditingSuburb({
      slug: suburb.slug,
      name: suburb.name,
    });
    setForm({
      slug: suburb.slug,
      name: suburb.name,
      description: currentDescription,
      is_active: isActiveStatus,
    });
    setShowForm(true);
    setEditorReady(true);
    setIsSaving(false);
  };

  const handleSave = async () => {
    if (!form.slug.trim() || !form.name.trim() || !stripHtml(form.description)) {
      setError("Slug, name, and description are all required.");
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      const res = await fetch(SUBURBS_API, {
        method: "POST",
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

      await fetchBackendSuburbs();
      setShowForm(false);
      setEditingSuburb(null);
      alert("Suburb description saved successfully!");
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
        `Delete backend description for "${slug}"? This will remove custom content from that suburb page.`
      )
    )
      return;

    try {
      const res = await fetch(`${SUBURBS_API}/${slug}`, { method: "DELETE" });
      if (!res.ok && res.status !== 204) throw new Error("Delete failed");
      await fetchBackendSuburbs();
      alert("Suburb description removed.");
    } catch (err) {
      alert("Failed to delete: " + err.message);
    }
  };

  const handleToggleActive = async (suburb) => {
    if (!suburb.isConfigured) {
      alert("Please edit and save a description for this suburb first.");
      return;
    }

    try {
      const res = await fetch(`${SUBURBS_API}/${suburb.slug}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_active: !suburb.is_active }),
      });
      if (!res.ok) throw new Error("Update failed");
      await fetchBackendSuburbs();
    } catch (err) {
      alert("Failed to update status: " + err.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Bar / Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Suburb Descriptions</h2>
          <p className="text-gray-600 mt-1 text-sm">
            Loaded {staticSuburbs.length} suburbs from data/suburbs.js. Click <strong>Edit</strong> to add or customize descriptions.
          </p>
        </div>
        {!showForm && (
          <button
            onClick={openCreate}
            className="px-5 py-2.5 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-all flex items-center space-x-2 self-start sm:self-auto text-sm"
          >
            <svg
              className="w-4 h-4"
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
            <span>Add Custom Suburb</span>
          </button>
        )}
      </div>

      {/* Filter and Search controls */}
      {!showForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col sm:flex-row gap-4 justify-between items-center">
          {/* Search box */}
          <div className="relative w-full sm:w-80">
            <svg
              className="w-4 h-4 text-gray-400 absolute left-3 top-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search suburb name or postcode…"
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Filter pills */}
          <div className="flex items-center space-x-2 text-xs font-medium w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setFilterStatus("all")}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                filterStatus === "all"
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All ({combinedSuburbs.length})
            </button>
            <button
              onClick={() => setFilterStatus("configured")}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                filterStatus === "configured"
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              With Description ({combinedSuburbs.filter((s) => s.isConfigured).length})
            </button>
            <button
              onClick={() => setFilterStatus("unconfigured")}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                filterStatus === "unconfigured"
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Not Configured ({combinedSuburbs.filter((s) => !s.isConfigured).length})
            </button>
          </div>
        </div>
      )}

      {/* Editor Modal / Form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-5">
          <div className="flex justify-between items-center border-b border-gray-100 pb-3">
            <h3 className="text-lg font-semibold text-gray-900">
              {editingSuburb
                ? `Edit Suburb Description — ${editingSuburb.name}`
                : "New Suburb Description"}
            </h3>
            <button
              onClick={() => {
                setShowForm(false);
                setEditingSuburb(null);
                setError(null);
                setEditorReady(false);
              }}
              className="text-gray-400 hover:text-gray-600 text-sm"
            >
              ✕ Close
            </button>
          </div>

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
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    name: e.target.value,
                    ...(editingSuburb
                      ? {}
                      : {
                          slug: e.target.value
                            .toLowerCase()
                            .replace(/\s+/g, "-")
                            .replace(/[^a-z0-9-]/g, ""),
                        }),
                  }))
                }
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
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-50 disabled:text-gray-500 font-mono"
              />
              <p className="text-xs text-gray-500 mt-1">
                Matches the URL page: <code>sustainableshine.com.au/{form.slug || "suburb"}</code>
              </p>
            </div>
          </div>

          {/* Active toggle */}
          <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
            <button
              type="button"
              onClick={() =>
                setForm((p) => ({ ...p, is_active: !p.is_active }))
              }
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${
                form.is_active ? "bg-emerald-500" : "bg-gray-300"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform transition duration-200 ${
                  form.is_active ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
            <span className="text-sm font-medium text-gray-800">
              {form.is_active
                ? "Active — Description will show below FAQ on the suburb page"
                : "Inactive — Hidden from the suburb page"}
            </span>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Suburb Description <span className="text-red-500">*</span>
            </label>
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              {editorReady ? (
                <TinyMCEEditor
                  key={editingSuburb?.slug || form.slug || "new-suburb"}
                  content={form.description}
                  onChange={(description) =>
                    setForm((p) => ({ ...p, description }))
                  }
                />
              ) : (
                <div className="p-4 text-sm text-gray-500">Loading description…</div>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Use the toolbar to format content. This section will be displayed directly below FAQ on{" "}
              <code>/{form.slug || "suburb"}</code>.
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3 pt-2">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-6 py-2.5 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 disabled:opacity-60 transition-all text-sm"
            >
              {isSaving ? "Saving…" : "Save Suburb Description"}
            </button>
            <button
              onClick={() => {
                setShowForm(false);
                setEditingSuburb(null);
                setError(null);
                setEditorReady(false);
              }}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Suburbs Table */}
      {isLoading ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-600 mx-auto" />
          <p className="mt-4 text-gray-600 text-sm">Loading suburb list from data/suburbs.js…</p>
        </div>
      ) : filteredSuburbs.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <p className="text-gray-500 text-sm">No suburbs found matching your search query.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-3 bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider flex justify-between items-center">
            <span>Showing {filteredSuburbs.length} suburbs</span>
            <span>Data source: data/suburbs.js & Backend API</span>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Suburb Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Postcode
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    URL Slug
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSuburbs.map((suburb) => (
                  <tr
                    key={suburb.slug}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-semibold text-gray-900">
                        {suburb.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {suburb.postcode || "—"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded font-mono">
                        /{suburb.slug}
                      </code>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {suburb.isConfigured ? (
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
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                          No Description
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                      <button
                        onClick={() => openEdit(suburb)}
                        className="text-emerald-600 hover:text-emerald-800 font-semibold"
                      >
                        {suburb.isConfigured ? "Edit" : "+ Add Description"}
                      </button>
                      {suburb.isConfigured && (
                        <button
                          onClick={() => handleDelete(suburb.slug)}
                          className="text-red-500 hover:text-red-700 text-xs font-normal"
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
