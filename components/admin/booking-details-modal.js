export default function BookingDetailsModal({ booking, bookingDetails, isLoading, onClose }) {
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

