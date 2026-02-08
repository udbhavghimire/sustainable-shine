"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import BlogEditor from "@/components/admin/blog-editor";
import BlogList from "@/components/admin/blog-list";
import LeadsSection from "@/components/admin/leads-section";
import Navbar from "@/components/navbar";

const API_BASE_URL = "https://sustainable-shine-backend.onrender.com/api";

function AdminDashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("leads");
  const [isLoading, setIsLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date-desc");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [apiError, setApiError] = useState(false);
  
  // Blog state
  const [blogs, setBlogs] = useState([]);
  const [isLoadingBlogs, setIsLoadingBlogs] = useState(false);
  const [showBlogEditor, setShowBlogEditor] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);

  // Check authentication
  useEffect(() => {
    const isAuth = localStorage.getItem("adminAuth");
    if (!isAuth) {
      router.push("/admin/login");
    } else {
      setIsLoading(false);
      fetchBookings();
      fetchStatistics();
      fetchBlogs();
    }
  }, []);

  // Handle URL parameters for editing blogs
  useEffect(() => {
    const blogSlug = searchParams.get('edit');
    const tab = searchParams.get('tab');
    
    if (tab) {
      setActiveTab(tab);
    }
    
    if (blogSlug && blogs.length > 0) {
      const blogToEdit = blogs.find(b => b.slug === blogSlug);
      if (blogToEdit) {
        console.log('Loading blog for editing:', blogToEdit);
        setEditingBlog(blogToEdit);
        setShowBlogEditor(true);
        setActiveTab('blogs');
      }
    }
  }, [searchParams, blogs]);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    localStorage.removeItem("adminUser");
    router.push("/admin/login");
  };

  const fetchBookings = async () => {
    try {
      const response = await fetch(
        "https://sustainable-shine-backend.onrender.com/api/bookings/",
        {
          headers: {
            "Accept": "application/json",
          },
        }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setBookings(data.results || []);
      setApiError(false);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setBookings([]);
      setApiError(true);
    }
  };

  const fetchStatistics = async () => {
    try {
      const response = await fetch(
        "https://sustainable-shine-backend.onrender.com/api/bookings/statistics/",
        {
          headers: {
            "Accept": "application/json",
          },
        }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setStatistics(data);
    } catch (error) {
      console.error("Error fetching statistics:", error);
      setStatistics(null);
    }
  };

  const fetchBookingDetails = async (bookingId) => {
    setIsLoadingDetails(true);
    try {
      const response = await fetch(
        `https://sustainable-shine-backend.onrender.com/api/bookings/${bookingId}/detailed/`,
        {
          headers: {
            "Accept": "application/json",
          },
        }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setBookingDetails(data.data);
    } catch (error) {
      console.error("Error fetching booking details:", error);
      setBookingDetails(null);
    } finally {
      setIsLoadingDetails(false);
    }
  };

  // Blog Management Functions
  const fetchBlogs = async () => {
    setIsLoadingBlogs(true);
    try {
      const response = await fetch(`${API_BASE_URL}/blog/`, {
        headers: {
          "Accept": "application/json",
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setBlogs(data.results || data || []);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setBlogs([]);
      // Show user-friendly error
      if (error.message === "Failed to fetch") {
        console.warn("Backend server may be starting up or unavailable. Please wait a moment and refresh.");
      }
    } finally {
      setIsLoadingBlogs(false);
    }
  };

  const saveBlog = async (blogData, isFormData = false) => {
    try {
      const url = editingBlog
        ? `${API_BASE_URL}/blog/${editingBlog.slug}/`
        : `${API_BASE_URL}/blog/`;
      
      const method = editingBlog ? "PATCH" : "POST";

      // Set up headers and body based on whether we're sending FormData or JSON
      const fetchOptions = {
        method,
        credentials: "include", // Include cookies for authentication
      };

      if (isFormData && blogData instanceof FormData) {
        // For FormData, let the browser set Content-Type with boundary
        // Don't set Content-Type header manually - browser will set it with boundary
        fetchOptions.body = blogData;
      } else {
        // For JSON data
        fetchOptions.headers = {
          "Content-Type": "application/json",
        };
        fetchOptions.body = JSON.stringify(blogData);
      }

      const response = await fetch(url, fetchOptions);

      if (!response.ok) {
        const errorData = await response.json();
        // Handle Django REST Framework validation errors
        let errorMessage = "Failed to save blog post";
        if (errorData.message) {
          errorMessage = errorData.message;
        } else if (typeof errorData === 'object') {
          // Extract field-specific errors from Django REST Framework
          const fieldErrors = Object.entries(errorData)
            .map(([field, errors]) => {
              const errorList = Array.isArray(errors) ? errors : [errors];
              return `${field}: ${errorList.join(", ")}`;
            })
            .join("; ");
          if (fieldErrors) {
            errorMessage = fieldErrors;
          }
        }
        console.error("Backend validation errors:", errorData);
        throw new Error(errorMessage);
      }

      const data = await response.json();
      
      // Refresh blogs list
      await fetchBlogs();
      
      // Close editor and clear URL
      setShowBlogEditor(false);
      setEditingBlog(null);
      router.push('/admin?tab=blogs', { shallow: true });
      
      alert(editingBlog ? "Blog post updated successfully!" : "Blog post created successfully!");
    } catch (error) {
      console.error("Error saving blog:", error);
      throw error;
    }
  };

  const deleteBlog = async (slug) => {
    try {
      const response = await fetch(`${API_BASE_URL}/blog/${slug}/`, {
        method: "DELETE",
        credentials: "include", // Include cookies for authentication
      });

      if (!response.ok) {
        throw new Error("Failed to delete blog post");
      }

      await fetchBlogs();
      alert("Blog post deleted successfully!");
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Failed to delete blog post. Please try again.");
    }
  };

  const changeBlogStatus = async (slug, newStatus) => {
    try {
      const endpoint = newStatus === "published" ? "publish" : "unpublish";
      const response = await fetch(`${API_BASE_URL}/blog/${slug}/${endpoint}/`, {
        method: "PATCH",
        credentials: "include", // Include cookies for authentication
      });

      if (!response.ok) {
        throw new Error(`Failed to ${endpoint} blog post`);
      }

      await fetchBlogs();
      alert(`Blog post ${newStatus === "published" ? "published" : "unpublished"} successfully!`);
    } catch (error) {
      console.error("Error changing blog status:", error);
      alert("Failed to update blog status. Please try again.");
    }
  };

  const handleEditBlog = (blog) => {
    console.log('Editing blog:', blog);
    setEditingBlog(blog);
    setShowBlogEditor(true);
    // Update URL to reflect editing state
    router.push(`/admin?tab=blogs&edit=${blog.slug}`, { shallow: true });
  };

  const handleCancelBlogEdit = () => {
    setShowBlogEditor(false);
    setEditingBlog(null);
    // Clear URL parameters
    router.push('/admin?tab=blogs', { shallow: true });
  };

  const updateBookingStatus = async (bookingId, newStatus) => {
    try {
      const response = await fetch(
        `https://sustainable-shine-backend.onrender.com/api/bookings/${bookingId}/update_status/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include", // Include cookies for authentication
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error ||
            errorData.message ||
            `Failed to update booking status (${response.status})`
        );
      }

      const data = await response.json();

      // Update the status in the frontend state
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === bookingId ? { ...booking, status: newStatus } : booking
        )
      );

      // Also update the selected booking if it's the one being modified
      if (selectedBooking?.id === bookingId) {
        setSelectedBooking((prev) => ({ ...prev, status: newStatus }));
      }

      console.log(`✅ Status updated to: ${newStatus} (saved to database)`);
      
      // Optionally show a subtle success message
      // You could add a toast notification here instead of console.log
    } catch (error) {
      console.error("Error updating booking status:", error);
      alert(
        `Failed to update booking status: ${error.message}\n\nPlease try again or refresh the page.`
      );
      
      // Optionally refresh the bookings list to restore correct state
      await fetchBookings();
    }
  };

  const deleteBooking = async (bookingId) => {
    if (
      !confirm(
        "Are you sure you want to delete this lead? This action cannot be undone."
      )
    )
      return;

    try {
      const response = await fetch(
        `https://sustainable-shine-backend.onrender.com/api/bookings/${bookingId}/`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
          },
          credentials: "include", // Include cookies for authentication
        }
      );

      if (!response.ok) {
        throw new Error(
          response.status === 403
            ? "You don't have permission to delete this lead. Please ensure you're logged in."
            : response.status === 404
            ? "Lead not found or already deleted"
            : "Failed to delete lead"
        );
      }

      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking.id !== bookingId)
      );
      if (selectedBooking?.id === bookingId) {
        setSelectedBooking(null);
        setBookingDetails(null);
      }
      alert("Lead deleted successfully.");
    } catch (error) {
      console.error("Error deleting lead:", error);
      alert(
        error.message || "Failed to delete lead. Please try again."
      );
    }
  };

  const getFilteredBookings = () => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const weekEnd = new Date(today);
    weekEnd.setDate(weekEnd.getDate() + 7);

    let filtered = [...bookings];

    // Apply date filter
    if (filter === "today") {
      filtered = filtered.filter((booking) => {
        const bookingDate = new Date(booking.selected_date);
        return bookingDate.toDateString() === today.toDateString();
      });
    } else if (filter === "tomorrow") {
      filtered = filtered.filter((booking) => {
        const bookingDate = new Date(booking.selected_date);
        return bookingDate.toDateString() === tomorrow.toDateString();
      });
    } else if (filter === "week") {
      filtered = filtered.filter((booking) => {
        const bookingDate = new Date(booking.selected_date);
        return bookingDate >= today && bookingDate <= weekEnd;
      });
    }

    // Apply sorting
    if (sortBy === "date-desc") {
      filtered.sort(
        (a, b) => new Date(b.selected_date) - new Date(a.selected_date)
      );
    } else if (sortBy === "date-asc") {
      filtered.sort(
        (a, b) => new Date(a.selected_date) - new Date(b.selected_date)
      );
    } else if (sortBy === "created-desc") {
      filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }

    return filtered;
  };

  const handleViewBooking = async (booking) => {
    setSelectedBooking(booking);
    await fetchBookingDetails(booking.id);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Navbar */}
      <Navbar />
      
      {/* Admin Header - positioned below navbar */}
      <header className="bg-white shadow-sm border-b border-gray-200 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="bg-emerald-600 rounded-lg p-2">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome, {localStorage.getItem("adminUser")}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm text-red-600 hover:text-red-700 font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab("leads")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "leads"
                  ? "border-emerald-500 text-emerald-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Leads
            </button>
            <button
              onClick={() => setActiveTab("blogs")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "blogs"
                  ? "border-emerald-500 text-emerald-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Blogs
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* API Error Banner */}
        {apiError && (
          <div className="mb-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  <strong>Backend Connection Issue:</strong> Unable to connect to the server. 
                  The backend might be starting up (Render free tier takes ~30 seconds to wake up).
                  <button 
                    onClick={() => {
                      fetchBookings();
                      fetchStatistics();
                      fetchBlogs();
                    }}
                    className="ml-2 underline font-medium hover:text-yellow-800"
                  >
                    Click here to retry
                  </button>
                </p>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === "leads" && (
          <LeadsSection
            bookings={getFilteredBookings()}
            statistics={statistics}
            filter={filter}
            setFilter={setFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
            updateBookingStatus={updateBookingStatus}
            deleteBooking={deleteBooking}
            selectedBooking={selectedBooking}
            bookingDetails={bookingDetails}
            isLoadingDetails={isLoadingDetails}
            setSelectedBooking={setSelectedBooking}
            handleViewBooking={handleViewBooking}
            refreshData={fetchBookings}
          />
        )}

        {activeTab === "blogs" && (
          <>
            {!showBlogEditor ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Blog Management</h2>
                    <p className="text-gray-600 mt-1">Create and manage your blog posts</p>
                  </div>
                  <button
                    onClick={() => {
                      setShowBlogEditor(true);
                      setEditingBlog(null);
                      router.push('/admin?tab=blogs&new=true', { shallow: true });
                    }}
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
                    <span>Create New Post</span>
                  </button>
                </div>
                
                {isLoadingBlogs ? (
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading blogs...</p>
                  </div>
                ) : (
                  <BlogList
                    blogs={blogs}
                    onEdit={handleEditBlog}
                    onDelete={deleteBlog}
                    onStatusChange={changeBlogStatus}
                  />
                )}
              </div>
            ) : (
              <BlogEditor
                blog={editingBlog}
                onSave={saveBlog}
                onCancel={handleCancelBlogEdit}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <AdminDashboardContent />
    </Suspense>
  );
}
