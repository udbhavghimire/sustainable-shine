import StatCard from "./stat-card";
import BookingDetailsModal from "./booking-details-modal";

export default function LeadsSection({
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
          value={bookings.length}
          icon="📊"
          color="blue"
        />
        <StatCard
          title="Pending"
          value={
            bookings.filter((b) => b.status === "pending" || !b.status).length
          }
          icon="⏳"
          color="yellow"
        />
        <StatCard
          title="Confirmed"
          value={bookings.filter((b) => b.status === "confirmed").length}
          icon="✅"
          color="green"
        />
        <StatCard
          title="Completed"
          value={bookings.filter((b) => b.status === "completed").length}
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
                  Date & Time
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
                      {booking.selected_time && (
                        <div className="text-xs text-gray-600 mt-1">
                          {(() => {
                            const [hours, minutes] = booking.selected_time.split(":");
                            const hour = parseInt(hours);
                            const ampm = hour >= 12 ? "PM" : "AM";
                            const hour12 = hour % 12 || 12;
                            return `${hour12}:${minutes} ${ampm}`;
                          })()}
                        </div>
                      )}
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
                    <td
                      className="px-6 py-4 whitespace-nowrap"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <select
                        value={booking.status || "pending"}
                        onChange={(e) => {
                          e.stopPropagation();
                          updateBookingStatus(booking.id, e.target.value);
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs px-2 py-1 rounded-full font-semibold border-0 focus:ring-2 focus:ring-emerald-500 cursor-pointer"
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
          }}
        />
      )}
    </div>
  );
}

