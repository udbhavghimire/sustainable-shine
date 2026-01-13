"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("leads");
  const [isLoading, setIsLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date-desc");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  // Check authentication
  useEffect(() => {
    const isAuth = localStorage.getItem("adminAuth");
    if (!isAuth) {
      router.push("/admin/login");
    } else {
      setIsLoading(false);
      fetchBookings();
      fetchStatistics();
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    localStorage.removeItem("adminUser");
    router.push("/admin/login");
  };

  const fetchBookings = async () => {
    try {
      const response = await fetch(
        "https://sustainable-shine-backend.onrender.com/api/bookings/"
      );
      const data = await response.json();
      setBookings(data.results || []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const fetchStatistics = async () => {
    try {
      const response = await fetch(
        "https://sustainable-shine-backend.onrender.com/api/bookings/statistics/"
      );
      const data = await response.json();
      setStatistics(data);
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  };

  const fetchBookingDetails = async (bookingId) => {
    setIsLoadingDetails(true);
    try {
      const response = await fetch(
        `https://sustainable-shine-backend.onrender.com/api/bookings/${bookingId}/detailed/`
      );
      const data = await response.json();
      setBookingDetails(data.data);
    } catch (error) {
      console.error("Error fetching booking details:", error);
    } finally {
      setIsLoadingDetails(false);
    }
  };

  const updateBookingStatus = async (bookingId, newStatus) => {
    try {
      const response = await fetch(
        `https://sustainable-shine-backend.onrender.com/api/bookings/${bookingId}/update_status/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (response.ok) {
        fetchBookings();
        fetchStatistics();
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const deleteBooking = async (bookingId) => {
    if (!confirm("Are you sure you want to delete this booking?")) return;

    try {
      const response = await fetch(
        `https://sustainable-shine-backend.onrender.com/api/bookings/${bookingId}/`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        fetchBookings();
        fetchStatistics();
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
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
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
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
                Sustainable Shine Admin
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

        {activeTab === "blogs" && <BlogsSection />}
      </main>
    </div>
  );
}

function LeadsSection({
  bookings,
  statistics,
  filter,
  setFilter,
  sortBy,
  setSortBy,
  updateBookingStatus,
  deleteBooking,
  selectedBooking,
  bookingDetails,
  isLoadingDetails,
  setSelectedBooking,
  handleViewBooking,
  refreshData,
}) {
  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <StatCard
          title="Total Bookings"
          value={statistics?.total_bookings || 0}
          icon="📊"
          color="blue"
        />
        <StatCard
          title="Pending"
          value={statistics?.status_breakdown?.pending || 0}
          icon="⏳"
          color="yellow"
        />
        <StatCard
          title="Confirmed"
          value={statistics?.status_breakdown?.confirmed || 0}
          icon="✅"
          color="green"
        />
        <StatCard
          title="Completed"
          value={statistics?.status_breakdown?.completed || 0}
          icon="🎉"
          color="purple"
        />
      </div>

      {/* Filters and Controls */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === "all"
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("today")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === "today"
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Today
            </button>
            <button
              onClick={() => setFilter("tomorrow")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === "tomorrow"
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Tomorrow
            </button>
            <button
              onClick={() => setFilter("week")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === "week"
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              This Week
            </button>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">
              Sort by:
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="date-desc">Date (Newest)</option>
              <option value="date-asc">Date (Oldest)</option>
              <option value="created-desc">Created (Recent)</option>
            </select>

            <button
              onClick={refreshData}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-all"
            >
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookings.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    No bookings found
                  </td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleViewBooking(booking)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {booking.full_name ||
                          `${booking.first_name} ${booking.last_name}`}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {booking.suburb || booking.postcode || "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {booking.selected_date
                          ? new Date(booking.selected_date).toLocaleDateString()
                          : "Not set"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 capitalize">
                        {booking.service_type?.replace(/_/g, " ")}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        ${booking.price_details?.total?.toFixed(2) || "0.00"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={booking.status || "pending"}
                        onChange={(e) => {
                          e.stopPropagation();
                          updateBookingStatus(booking.id, e.target.value);
                        }}
                        className="text-xs px-2 py-1 rounded-full font-semibold border-0 focus:ring-2 focus:ring-emerald-500"
                        style={{
                          backgroundColor:
                            booking.status === "confirmed"
                              ? "#d1fae5"
                              : booking.status === "completed"
                              ? "#e0e7ff"
                              : booking.status === "cancelled"
                              ? "#fee2e2"
                              : "#fef3c7",
                          color:
                            booking.status === "confirmed"
                              ? "#065f46"
                              : booking.status === "completed"
                              ? "#3730a3"
                              : booking.status === "cancelled"
                              ? "#991b1b"
                              : "#92400e",
                        }}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteBooking(booking.id);
                        }}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <BookingDetailsModal
          booking={selectedBooking}
          bookingDetails={bookingDetails}
          isLoading={isLoadingDetails}
          onClose={() => {
            setSelectedBooking(null);
            setBookingDetails(null);
          }}
        />
      )}
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
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <div className={`text-4xl ${colorClasses[color]} rounded-lg p-3`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

function BookingDetailsModal({ booking, bookingDetails, isLoading, onClose }) {
  const details = bookingDetails || {};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Booking Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg
              className="w-6 h-6"
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

        {isLoading ? (
          <div className="p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading details...</p>
          </div>
        ) : (
          <div className="p-6 space-y-6">
            {/* Status Badge */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm text-gray-500">
                  Booking ID: #{booking.id}
                </span>
              </div>
              <span
                className="px-4 py-2 rounded-full text-sm font-semibold"
                style={{
                  backgroundColor:
                    booking.status === "confirmed"
                      ? "#d1fae5"
                      : booking.status === "completed"
                      ? "#e0e7ff"
                      : booking.status === "cancelled"
                      ? "#fee2e2"
                      : "#fef3c7",
                  color:
                    booking.status === "confirmed"
                      ? "#065f46"
                      : booking.status === "completed"
                      ? "#3730a3"
                      : booking.status === "cancelled"
                      ? "#991b1b"
                      : "#92400e",
                }}
              >
                {booking.status?.charAt(0).toUpperCase() +
                  booking.status?.slice(1)}
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Customer Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  👤 Customer Information
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <p>
                    <span className="font-medium">Name:</span>{" "}
                    {details.customer_information?.name ||
                      `${booking.first_name} ${booking.last_name}`}
                  </p>
                  <p>
                    <span className="font-medium">Email:</span>{" "}
                    {details.customer_information?.email || booking.email}
                  </p>
                  <p>
                    <span className="font-medium">Phone:</span>{" "}
                    {details.customer_information?.phone || booking.phone}
                  </p>
                  <p>
                    <span className="font-medium">SMS Reminders:</span>{" "}
                    {details.customer_information?.sms_reminders ? "Yes" : "No"}
                  </p>
                </div>
              </div>

              {/* Service Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  📋 Service Details
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <p>
                    <span className="font-medium">Service Type:</span>{" "}
                    {details.service_details?.service_type ||
                      booking.service_type}
                  </p>
                  <p>
                    <span className="font-medium">Frequency:</span>{" "}
                    {details.service_details?.frequency || booking.frequency}
                  </p>
                  <p>
                    <span className="font-medium">Preferred Date:</span>{" "}
                    {details.service_details?.preferred_date ||
                    booking.selected_date
                      ? new Date(
                          details.service_details?.preferred_date ||
                            booking.selected_date
                        ).toLocaleDateString()
                      : "Not set"}
                  </p>
                </div>
              </div>
            </div>

            {/* Property Details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                🏠 Property Details
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                <p>
                  <span className="font-medium">Address:</span>
                  <br />
                  {details.property_details?.address ||
                    booking.full_address ||
                    booking.street}
                </p>
                <p>
                  <span className="font-medium">Suburb:</span>
                  <br />
                  {details.property_details?.suburb || booking.suburb}
                </p>
                <p>
                  <span className="font-medium">Postcode:</span>
                  <br />
                  {details.property_details?.postcode || booking.postcode}
                </p>
                <p>
                  <span className="font-medium">Bedrooms:</span>
                  <br />
                  {details.property_details?.bedrooms || booking.bedrooms}
                </p>
                <p>
                  <span className="font-medium">Bathrooms:</span>
                  <br />
                  {details.property_details?.bathrooms || booking.bathrooms}
                </p>
                <p>
                  <span className="font-medium">Storeys:</span>
                  <br />
                  {details.property_details?.storeys || booking.storey}
                </p>
                <p>
                  <span className="font-medium">Laundries:</span>
                  <br />
                  {details.property_details?.laundries || booking.laundry}
                </p>
                <p>
                  <span className="font-medium">Kitchen:</span>
                  <br />
                  {details.property_details?.kitchen || booking.kitchen}
                </p>
                <p>
                  <span className="font-medium">Living/Dining:</span>
                  <br />
                  {details.property_details?.living_dining ||
                    booking.living_dining}
                </p>
              </div>
            </div>

            {/* Additional Information */}
            {details.additional_information && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  ℹ️ Additional Information
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-2 gap-4">
                  {details.additional_information.has_pet && (
                    <p>
                      <span className="font-medium">Has Pet:</span>
                      <br />
                      {details.additional_information.has_pet}
                    </p>
                  )}
                  {details.additional_information.cleanliness_level && (
                    <p>
                      <span className="font-medium">Cleanliness Level:</span>
                      <br />
                      {details.additional_information.cleanliness_level}
                    </p>
                  )}
                  {details.additional_information.parking && (
                    <p>
                      <span className="font-medium">Parking:</span>
                      <br />
                      {details.additional_information.parking}
                    </p>
                  )}
                  {details.additional_information.access && (
                    <p>
                      <span className="font-medium">Access:</span>
                      <br />
                      {details.additional_information.access}
                    </p>
                  )}
                  {details.additional_information.flexible_date_time && (
                    <p>
                      <span className="font-medium">Flexible Date/Time:</span>
                      <br />
                      {details.additional_information.flexible_date_time}
                    </p>
                  )}
                  {details.additional_information.hear_about_us && (
                    <p>
                      <span className="font-medium">Heard About Us:</span>
                      <br />
                      {details.additional_information.hear_about_us}
                    </p>
                  )}
                </div>
                {details.additional_information.special_notes && (
                  <div className="mt-4 bg-white border border-gray-200 rounded-lg p-4">
                    <p className="font-medium mb-2">Special Notes:</p>
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {details.additional_information.special_notes}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Add-ons */}
            {details.add_ons &&
              Object.keys(details.add_ons.selected || {}).length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    ✨ Add-ons
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <ul className="space-y-2">
                      {Object.entries(details.add_ons.selected).map(
                        ([key, value]) => {
                          if (value && details.add_ons.details?.[key]) {
                            const addon = details.add_ons.details[key];
                            return (
                              <li key={key} className="flex justify-between">
                                <span>
                                  {addon.name}{" "}
                                  {addon.quantity > 1
                                    ? `(x${addon.quantity})`
                                    : ""}
                                </span>
                                <span className="font-medium">
                                  ${addon.totalPrice}
                                </span>
                              </li>
                            );
                          }
                          return null;
                        }
                      )}
                    </ul>
                  </div>
                </div>
              )}

            {/* Pricing */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                💰 Pricing Details
              </h3>
              <div className="bg-emerald-50 rounded-lg p-4 space-y-2">
                {details.pricing_details ? (
                  <>
                    <div className="flex justify-between">
                      <span>Base Price:</span>
                      <span>
                        ${details.pricing_details.base?.toFixed(2) || "0.00"}
                      </span>
                    </div>
                    {details.pricing_details.addons > 0 && (
                      <div className="flex justify-between">
                        <span>Room Surcharges:</span>
                        <span>
                          ${details.pricing_details.addons?.toFixed(2)}
                        </span>
                      </div>
                    )}
                    {details.pricing_details.addons_extra > 0 && (
                      <div className="flex justify-between">
                        <span>Add-ons:</span>
                        <span>
                          ${details.pricing_details.addons_extra?.toFixed(2)}
                        </span>
                      </div>
                    )}
                    {details.pricing_details.discount > 0 && (
                      <div className="flex justify-between text-red-600">
                        <span>Discount:</span>
                        <span>
                          -${details.pricing_details.discount?.toFixed(2)}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>
                        ${details.pricing_details.subtotal?.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>GST (10%):</span>
                      <span>${details.pricing_details.gst?.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold text-emerald-600 pt-2 border-t-2 border-emerald-200">
                      <span>Total:</span>
                      <span>${details.pricing_details.total?.toFixed(2)}</span>
                    </div>
                  </>
                ) : (
                  <p className="text-2xl font-bold text-emerald-600">
                    ${booking.price_details?.total?.toFixed(2) || "0.00"}
                  </p>
                )}
              </div>
            </div>

            {/* Metadata */}
            {details.metadata && (
              <div className="text-sm text-gray-500 border-t pt-4">
                <p>
                  Created:{" "}
                  {new Date(details.metadata.created_at).toLocaleString()}
                </p>
                <p>
                  Last Updated:{" "}
                  {new Date(details.metadata.updated_at).toLocaleString()}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function BlogsSection() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
      <div className="max-w-md mx-auto">
        <div className="text-6xl mb-4">📝</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Blogs Coming Soon
        </h2>
        <p className="text-gray-600">
          The blog management section is under development. You'll be able to
          create, edit, and manage blog posts here.
        </p>
      </div>
    </div>
  );
}
