"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Swal from "sweetalert2";
import PropertyDetails, { addOnsData } from "./property-details";
import CustomerDetails from "./customer-details";
import posthog from "posthog-js";
import { trackBookingSubmit } from "@/lib/analytics";

// Calendar Picker Component
function CalendarPicker({ selectedDate, onDateSelect }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showMonthPicker, setShowMonthPicker] = useState(false);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const earliestBookableDate = new Date(today);
  earliestBookableDate.setDate(today.getDate() + 3);

  // Get days in month
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const { daysInMonth, startingDayOfWeek, year, month } =
    getDaysInMonth(currentMonth);

  // Generate calendar days
  const calendarDays = [];

  // Add empty cells for days before month starts
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null);
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const handleDateClick = (day) => {
    const clickedDate = new Date(year, month, day);
    clickedDate.setHours(0, 0, 0, 0);

    // Don't allow selecting past dates or dates within the next 2 days
    if (clickedDate < earliestBookableDate) return;

    // Format date as YYYY-MM-DD for input compatibility
    const formattedDate = `${year}-${String(month + 1).padStart(
      2,
      "0",
    )}-${String(day).padStart(2, "0")}`;
    onDateSelect(formattedDate);
  };

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const jumpToMonth = (monthIndex) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(monthIndex);
    setCurrentMonth(newMonth);
    setShowMonthPicker(false);
  };

  const isDateSelected = (day) => {
    if (!selectedDate || !day) return false;
    const selected = new Date(selectedDate);
    return (
      selected.getDate() === day &&
      selected.getMonth() === month &&
      selected.getFullYear() === year
    );
  };

  const getDateForDay = (day) => {
    if (!day) return null;
    const date = new Date(year, month, day);
    date.setHours(0, 0, 0, 0);
    return date;
  };

  const isPastDate = (day) => {
    const date = getDateForDay(day);
    return date && date < today;
  };

  const isWithinBookingBuffer = (day) => {
    const date = getDateForDay(day);
    return date && date >= today && date < earliestBookableDate;
  };

  const isToday = (day) =>
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();

  const getDayClasses = (day) => {
    if (!day) return "invisible";

    const base = "aspect-square p-1 text-xs transition-colors";

    if (isDateSelected(day)) {
      return `${base} cursor-pointer bg-emerald-500 text-white font-semibold hover:bg-emerald-600`;
    }

    if (isPastDate(day)) {
      return `${base} text-gray-300 cursor-not-allowed bg-gray-50/40`;
    }

    if (isWithinBookingBuffer(day)) {
      return `${base} text-emerald-800 cursor-not-allowed bg-emerald-50 font-medium${
        isToday(day) ? " font-semibold" : ""
      }`;
    }

    return `${base} hover:bg-emerald-100 cursor-pointer text-gray-700 bg-white${
      isToday(day) ? " font-semibold text-emerald-600" : ""
    }`;
  };

  const isDateDisabled = (day) => {
    if (!day) return true;
    const date = getDateForDay(day);
    return date < earliestBookableDate;
  };

  const canGoPrevious = () => {
    const prevMonth = new Date(currentMonth);
    prevMonth.setMonth(currentMonth.getMonth() - 1);
    prevMonth.setDate(1);
    prevMonth.setHours(0, 0, 0, 0);

    const todayFirstOfMonth = new Date(today);
    todayFirstOfMonth.setDate(1);

    return prevMonth >= todayFirstOfMonth;
  };

  return (
    <div className="w-full max-w-sm">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-3 bg-gray-50 rounded-lg p-2 border border-gray-200">
        <button
          onClick={() => navigateMonth(-1)}
          disabled={!canGoPrevious()}
          className={`p-1 hover:bg-gray-200 rounded transition-colors ${
            !canGoPrevious() ? "opacity-30 cursor-not-allowed" : ""
          }`}
          aria-label="Previous month"
        >
          <svg
            className="w-4 h-4 text-gray-700"
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
        </button>

        <span className="text-sm font-semibold text-gray-900">
          {monthNames[month]} {year}
        </span>

        <button
          onClick={() => navigateMonth(1)}
          className="p-1 hover:bg-gray-200 rounded transition-colors"
          aria-label="Next month"
        >
          <svg
            className="w-4 h-4 text-gray-700"
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
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        {/* Day Headers */}
        <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
          {["S", "M", "T", "W", "T", "F", "S"].map((day, idx) => (
            <div
              key={idx}
              className="text-center py-2 text-xs font-medium text-gray-600"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 bg-white">
          {calendarDays.map((day, index) => (
            <button
              key={index}
              onClick={() => day && handleDateClick(day)}
              disabled={isDateDisabled(day)}
              className={getDayClasses(day)}
            >
              {day}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function BookingCalculator() {
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get("service");

  const [serviceType, setServiceType] = useState(serviceParam || "general");
  const [frequency, setFrequency] = useState("once"); // once, weekly, fortnightly, monthly
  const [bedrooms, setBedrooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [kitchen, setKitchen] = useState(1);
  const [livingDining, setLivingDining] = useState(1);
  const [laundry, setLaundry] = useState(0);
  const [storey, setStorey] = useState(1);
  const [selectedAddOns, setSelectedAddOns] = useState({});
  const [addOnQuantities, setAddOnQuantities] = useState({});

  // Form details state
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [smsReminders, setSmsReminders] = useState(true);
  const [hasPet, setHasPet] = useState("");
  const [hearAboutUs, setHearAboutUs] = useState("");
  const [specialNotes, setSpecialNotes] = useState("");
  const [unitNumber, setUnitNumber] = useState("");
  const [street, setStreet] = useState("");
  const [suburb, setSuburb] = useState("");
  const [postcode, setPostcode] = useState("");
  const [cleanlinessLevel, setCleanlinessLevel] = useState("");
  const [parking, setParking] = useState("");
  const [flexibleDateTime, setFlexibleDateTime] = useState("");
  const [access, setAccess] = useState("");

  // Submission states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Mobile quote visibility state
  const [isQuoteVisible, setIsQuoteVisible] = useState(true);
  const [isQuoteMinimized, setIsQuoteMinimized] = useState(true); // Start minimized on mobile

  const GST_RATE = 0.1; // 10% GST

  const toggleAddOn = (id) => {
    const addOn = addOnsData.find((a) => a.id === id);
    const isSelecting = !selectedAddOns[id];
    posthog.capture("booking_add_on_selected", {
      add_on_id: id,
      add_on_name: addOn?.name,
      add_on_price: addOn?.price,
      selected: isSelecting,
      service_type: serviceType,
    });
    setSelectedAddOns((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));

    // Initialize quantity to 1 when toggling on for items with quantity
    if (!selectedAddOns[id] && addOn?.hasQuantity) {
      setAddOnQuantities((prev) => ({
        ...prev,
        [id]: 1,
      }));
    }
  };

  const updateQuantity = (id, value) => {
    const quantity = Math.max(1, Math.min(99, value));
    setAddOnQuantities((prev) => ({
      ...prev,
      [id]: quantity,
    }));
  };

  // Bedroom-based pricing tables (matching Simply Spotless)
  const bedroomPricing = {
    general: [129, 139, 174, 219, 239, 269],
    deep: [194, 204, 239, 318, 368, 398],
    endOfLease: [359, 399, 494, 589, 749, 799],
    moveIn: [359, 399, 494, 589, 749, 799],
  };

  // Frequency discounts (applied from second cleaning onwards)
  const frequencyDiscounts = {
    once: 0,
    weekly: 0.2, // 20%
    fortnightly: 0.15, // 15%
    monthly: 0.1, // 10%
  };

  const calculatePrice = () => {
    if (!serviceType)
      return {
        base: 0,
        addOns: 0,
        addOnsExtra: 0,
        subtotal: 0,
        gst: 0,
        total: 0,
        breakdown: {
          bedrooms: bedrooms,
          bathrooms: bathrooms,
          storey: storey,
          laundry: laundry,
        },
        extraRooms: {
          bedrooms: 0,
          bathrooms: 0,
          kitchen: 0,
          livingDining: 0,
          laundry: 0,
        },
      };

    // Get bedroom-based price from table
    const bedsIndex = Math.min(Math.max(1, bedrooms), 6) - 1;
    const tableBase = bedroomPricing[serviceType]?.[bedsIndex] ?? 0;

    // Location uplift and per-room surcharges (matching backend)
    const locationUplift = 29;
    const perExtraBathroom = 25; // per bathroom beyond the first
    const perExtraStorey = 35; // per storey beyond the first
    const perExtraLaundry = 20; // per laundry beyond the first

    const extraBathrooms = Math.max(0, bathrooms - 1);
    const extraStoreys = Math.max(0, storey - 1);
    const extraLaundry = Math.max(0, laundry - 1);

    // Calculate add-ons total (with quantities)
    const addOnsTotal = Object.keys(selectedAddOns).reduce((total, key) => {
      if (selectedAddOns[key]) {
        const addOn = addOnsData.find((a) => a.id === key);
        const quantity = addOnQuantities[key] || 1;
        return total + (addOn ? addOn.price * quantity : 0);
      }
      return total;
    }, 0);

    const baseForBedrooms = tableBase + locationUplift;
    const roomSurcharges =
      extraBathrooms * perExtraBathroom +
      extraStoreys * perExtraStorey +
      extraLaundry * perExtraLaundry;

    // Calculate total (GST-inclusive)
    const total = baseForBedrooms + roomSurcharges + addOnsTotal;

    // Calculate discount (only for general cleaning with recurring frequency)
    const discount =
      serviceType === "general" && frequency !== "once"
        ? frequencyDiscounts[frequency]
        : 0;
    const discountAmount = total * discount;
    const totalAfterDiscount = total - discountAmount;

    // Break down GST from the total (prices already include GST)
    const subtotal = Math.round((totalAfterDiscount / 1.1) * 100) / 100;
    const gst = Math.round((totalAfterDiscount - subtotal) * 100) / 100;

    // Diagnostic log
    console.log("Price calc:", {
      serviceType,
      bedrooms,
      bathrooms,
      storey,
      laundry,
      tableBase,
      locationUplift,
      baseForBedrooms,
      extraBathrooms,
      extraStoreys,
      extraLaundry,
      roomSurcharges,
      addOnsTotal,
      frequency,
      discount,
      discountAmount,
      subtotal,
      total: totalAfterDiscount,
    });

    return {
      base: baseForBedrooms,
      addOns: roomSurcharges,
      addOnsExtra: addOnsTotal,
      discount: discountAmount,
      subtotal: subtotal,
      gst: gst,
      total: totalAfterDiscount,
      breakdown: {
        bedrooms: bedrooms,
        bathrooms: bathrooms,
        storey: storey,
        laundry: laundry,
      },
      extraRooms: {
        bedrooms: 0,
        bathrooms: extraBathrooms,
        laundry: 0,
      },
    };
  };

  const priceDetails = calculatePrice();

  // Form validation
  const validateForm = () => {
    if (!selectedDate) {
      setSubmitError("Please select a preferred date");
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please select a preferred date",
        confirmButtonColor: "#059669",
        confirmButtonText: "OK",
      });
      return false;
    }
    if (!firstName || !lastName) {
      setSubmitError("Please enter your full name");
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please enter your full name",
        confirmButtonColor: "#059669",
        confirmButtonText: "OK",
      });
      return false;
    }
    if (!email) {
      setSubmitError("Please enter your email address");
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please enter your email address",
        confirmButtonColor: "#059669",
        confirmButtonText: "OK",
      });
      return false;
    }
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setSubmitError("Please enter a valid email address");
      Swal.fire({
        icon: "warning",
        title: "Invalid Email",
        text: "Please enter a valid email address",
        confirmButtonColor: "#059669",
        confirmButtonText: "OK",
      });
      return false;
    }
    if (!phone) {
      setSubmitError("Please enter your phone number");
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please enter your phone number",
        confirmButtonColor: "#059669",
        confirmButtonText: "OK",
      });
      return false;
    }
    if (!street) {
      setSubmitError("Please enter your street address");
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please enter your street address",
        confirmButtonColor: "#059669",
        confirmButtonText: "OK",
      });
      return false;
    }
    if (!suburb) {
      setSubmitError("Please enter your suburb");
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please enter your suburb",
        confirmButtonColor: "#059669",
        confirmButtonText: "OK",
      });
      return false;
    }
    if (!postcode) {
      setSubmitError("Please enter your postcode");
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please enter your postcode",
        confirmButtonColor: "#059669",
        confirmButtonText: "OK",
      });
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async () => {
    console.log("🚀 Starting form submission...");

    // Reset previous states
    setSubmitError("");
    setSubmitSuccess(false);

    // Validate form
    if (!validateForm()) {
      console.log("❌ Form validation failed");
      return;
    }

    console.log("✅ Form validation passed");
    setIsSubmitting(true);

    try {
      console.log("📝 Preparing booking data...");

      // Prepare add-on details for email
      const addOnDetails = {};
      Object.keys(selectedAddOns).forEach((key) => {
        if (selectedAddOns[key]) {
          const addOn = addOnsData.find((a) => a.id === key);
          if (addOn) {
            const quantity = addOnQuantities[key] || 1;
            addOnDetails[key] = {
              name: addOn.name,
              price: addOn.price,
              quantity: quantity,
              totalPrice: addOn.price * quantity,
            };
          }
        }
      });

      // Prepare booking data
      const bookingData = {
        serviceType,
        frequency,
        bedrooms,
        bathrooms,
        kitchen,
        livingDining,
        laundry,
        storey,
        selectedAddOns,
        addOnDetails,
        selectedDate,
        selectedTime,
        firstName: firstName?.trim(),
        lastName: lastName?.trim(),
        email: email?.trim(),
        phone: phone?.trim(),
        smsReminders,
        hasPet,
        hearAboutUs,
        specialNotes,
        unitNumber: unitNumber?.trim(),
        street: street?.trim(),
        suburb: suburb?.trim(),
        postcode: postcode?.trim(),
        cleanlinessLevel,
        parking,
        flexibleDateTime,
        access,
        priceDetails,
      };

      console.log("📤 Sending to API...");

      // Send to API
      const response = await fetch("/api/send-booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      console.log("📥 API response received, status:", response.status);

      const result = await response.json();

      // Log full response for debugging
      console.log("📦 Full API Response:", result);

      if (result.success) {
        console.log("✅ API call successful!");
        trackBookingSubmit("/booking");
        posthog.capture("booking_submitted", {
          service_type: serviceType,
          frequency,
          bedrooms,
          bathrooms,
          suburb,
          total_price: priceDetails?.total || 0,
          hear_about_us: hearAboutUs,
        });
        setSubmitSuccess(true);

        // Show success alert
        Swal.fire({
          icon: "success",
          title: "Booking Confirmed!",
          html: `Confirmation sent to<br><strong class="text-emerald-600">${email}<br><br>We'll contact you shortly.<br><br> Thank you for choosing Sustainable Shine`,
          confirmButtonColor: "#059669",
          confirmButtonText: "Close",
        });

        // Log Django save status for debugging
        if (!result.django_saved) {
          console.error(
            "⚠️ Booking email sent but NOT saved to database!",
            "\nError Details:",
            result.django_error,
          );
        } else {
          console.log("✅ Booking saved successfully to database");
        }
      } else {
        console.error("❌ API call failed:", result.error);
        setSubmitError(
          result.error || "Failed to submit booking. Please try again.",
        );

        // Show error alert
        Swal.fire({
          icon: "error",
          title: "Submission Failed",
          html: `${result.error || "Failed to submit booking. Please try again."}<br><br><strong>Need Help?</strong><br>Call us at <a href="tel:+61452422059" class="font-semibold underline">0452 422 059</a>`,
          confirmButtonColor: "#dc2626",
          confirmButtonText: "Close",
        });
      }
    } catch (error) {
      console.error("❌ Submission error:", error);
      setSubmitError(
        "An error occurred while submitting your booking. Please try again.",
      );

      // Show error alert
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        html: `An error occurred while submitting your booking. Please try again.<br><br><strong>Need Help?</strong><br>Call us at <a href="tel:+61452422059" class="font-semibold underline">0452 422 059</a>`,
        confirmButtonColor: "#dc2626",
        confirmButtonText: "Close",
      });
    } finally {
      console.log("🏁 Submission process completed");
      setIsSubmitting(false);
    }
  };

  const serviceTypes = [
    { value: "general", label: "General Cleaning", icon: "🧹" },
    { value: "deep", label: "Deep Cleaning", icon: "🫧" },
    { value: "endOfLease", label: "End of Lease", icon: "🔑" },
    { value: "moveIn", label: "Move-in Cleaning", icon: "🏡" },
    // { value: "office", label: "Office Cleaning", icon: "💼" },
  ];

  // Reusable Price Summary Component
  const PriceSummary = ({ className = "" }) => (
    <div
      className={`bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl shadow-xl p-6 text-white lg:max-h-none max-h-[500px] overflow-y-auto ${className}`}
    >
      <div className="text-center mb-4">
        <h3 className="text-2xl font-bold">Your Quote</h3>
      </div>

      <div className="border-t border-white/20 pt-4 mb-4">
        <div className="text-sm font-semibold mb-3 text-emerald-100">
          {serviceTypes.find((t) => t.value === serviceType)?.label}
        </div>

        {/* Property Summary */}
        <div className="space-y-2 text-sm">
          {priceDetails.breakdown.bedrooms > 0 && (
            <div className="flex items-center">
              <svg
                className="w-4 h-4 mr-2 text-emerald-300"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-emerald-50">
                {priceDetails.breakdown.bedrooms} Bedroom
                {priceDetails.breakdown.bedrooms > 1 ? "s" : ""}
              </span>
            </div>
          )}
          {priceDetails.breakdown.bathrooms > 0 && (
            <div className="flex items-center">
              <svg
                className="w-4 h-4 mr-2 text-emerald-300"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-emerald-50">
                {priceDetails.breakdown.bathrooms} Bathroom
                {priceDetails.breakdown.bathrooms > 1 ? "s" : ""}
              </span>
            </div>
          )}
          {priceDetails.breakdown.storey > 0 && (
            <div className="flex items-center">
              <svg
                className="w-4 h-4 mr-2 text-emerald-300"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-emerald-50">
                {priceDetails.breakdown.storey} Storey
                {priceDetails.breakdown.storey > 1 ? "s" : ""}
              </span>
            </div>
          )}
          {priceDetails.breakdown.kitchen > 0 && (
            <div className="flex items-center">
              <svg
                className="w-4 h-4 mr-2 text-emerald-300"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-emerald-50">
                {priceDetails.breakdown.kitchen} Kitchen
                {priceDetails.breakdown.kitchen > 1 ? "s" : ""}
              </span>
            </div>
          )}
          {priceDetails.breakdown.livingDining > 0 && (
            <div className="flex items-center">
              <svg
                className="w-4 h-4 mr-2 text-emerald-300"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-emerald-50">
                {priceDetails.breakdown.livingDining} Living & Dining
              </span>
            </div>
          )}
          {priceDetails.breakdown.laundry > 0 && (
            <div className="flex items-center">
              <svg
                className="w-4 h-4 mr-2 text-emerald-300"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-emerald-50">
                {priceDetails.breakdown.laundry} Laundry
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="border-t border-white/20 pt-4 space-y-2 text-sm mb-4">
        {priceDetails.addOnsExtra > 0 && (
          <div className="space-y-2 pb-3 mb-2 border-b border-white/10">
            <div className="text-emerald-100 font-semibold mb-2">
              Selected Add-ons:
            </div>
            {Object.keys(selectedAddOns).map((key) => {
              if (selectedAddOns[key]) {
                const addOn = addOnsData.find((a) => a.id === key);
                if (addOn) {
                  const quantity = addOnQuantities[key] || 1;
                  const totalPrice = addOn.price * quantity;
                  return (
                    <div
                      key={key}
                      className="flex justify-between items-center text-xs pl-2"
                    >
                      <span className="text-emerald-50">
                        • {addOn.name}
                        {addOn.hasQuantity && quantity > 1 && (
                          <span className="ml-1 text-emerald-200">
                            (x{quantity})
                          </span>
                        )}
                      </span>
                      <span className="font-semibold text-emerald-50">
                        ${totalPrice}
                      </span>
                    </div>
                  );
                }
              }
              return null;
            })}
            <div className="flex justify-between items-center pt-2 border-t border-white/10">
              <span className="text-emerald-100 font-semibold">
                Add-ons Total
              </span>
              <span className="font-semibold">
                ${priceDetails.addOnsExtra.toFixed(2)}
              </span>
            </div>
          </div>
        )}
        {priceDetails.discount > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-emerald-100">Subtotal (before discount)</span>
            <span className="font-semibold">
              $
              {(
                ((priceDetails.subtotal + priceDetails.discount) / 1.1) *
                1.1
              ).toFixed(2)}
            </span>
          </div>
        )}
        {priceDetails.discount > 0 && (
          <div className="flex justify-between items-center text-emerald-300">
            <span className="font-semibold">
              Discount ({frequencyDiscounts[frequency] * 100}% off from 2nd
              clean)
            </span>
            <span className="font-semibold">
              -${priceDetails.discount.toFixed(2)}
            </span>
          </div>
        )}
        <div className="flex justify-between items-center">
          <span className="text-emerald-100">Subtotal</span>
          <span className="font-semibold">
            ${priceDetails.subtotal.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-emerald-100">GST (10%)</span>
          <span className="font-semibold">${priceDetails.gst.toFixed(2)}</span>
        </div>
      </div>

      {/* Total Price */}
      <div className="border-t-2 border-white/30 pt-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-white">
            {priceDetails.discount > 0 ? "First Cleaning Total" : "Total"}
          </span>
          <span className="text-3xl font-bold text-white">
            ${(priceDetails.total + priceDetails.discount).toFixed(2)}
          </span>
        </div>
        {priceDetails.discount > 0 && (
          <div className="mt-3 pt-3 border-t border-white/20">
            <div className="flex justify-between items-center">
              <span className="text-base font-semibold text-emerald-200">
                Recurring Clean Total
              </span>
              <span className="text-2xl font-bold text-emerald-200">
                ${priceDetails.total.toFixed(2)}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Info Note */}
      <div className="text-xs text-emerald-100 bg-white/10 rounded-lg p-3">
        <div className="flex items-start space-x-2">
          <svg
            className="w-4 h-4 mt-0.5 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          <span>Final price may vary based on property condition.</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <section className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-20">
        <div className="container-custom">
          {/* Header */}
          <div className="text-center mb-12 pt-24 lg:pt-10">
            <span className="text-emerald-500 font-semibold text-sm uppercase tracking-wide">
              Instant Quote
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-4">
              Booking Calculator
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get an instant quote for your cleaning service. Customize your
              package and see the cost in real-time.
            </p>
          </div>

          {/* Floating Quote Section - Mobile Only */}
          <div className="lg:hidden">
            {/* Floating Header Button */}
            <div className="fixed top-22 left-0 right-0 z-40 px-4">
              <div className="max-w-3xl mx-auto">
                {isQuoteMinimized ? (
                  // Minimized floating button
                  <button
                    onClick={() => setIsQuoteMinimized(false)}
                    className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-2xl shadow-2xl p-4 transition-all duration-300 active:scale-[0.98]"
                    aria-label="Show quote"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
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
                            d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z"
                          />
                        </svg>
                        <div className="text-left">
                          <div className="font-bold text-lg">Your Quote</div>
                          <div className="text-xs text-emerald-100">
                            Tap to view details
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <div className="text-2xl font-bold">
                            $
                            {(
                              priceDetails.total + priceDetails.discount
                            ).toFixed(0)}
                          </div>
                          <div className="text-xs text-emerald-100">Total</div>
                        </div>
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
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </button>
                ) : (
                  // Expanded quote section
                  <div className="relative bg-gradient-to-br from-emerald-50 via-white to-blue-50 rounded-2xl p-1 shadow-2xl">
                    <button
                      onClick={() => setIsQuoteMinimized(true)}
                      className="absolute top-4 right-4 z-10 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full p-2 transition-colors shadow-lg"
                      aria-label="Minimize quote"
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
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                    </button>
                    <PriceSummary />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Side - Configuration */}
            <div className="lg:col-span-2 space-y-6">
              {/* Service Type Selection */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Select Your Service
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {serviceTypes.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => { setServiceType(type.value); posthog.capture("booking_service_selected", { service_type: type.value, service_label: type.label }); }}
                      className={`p-6 rounded-xl border-2 transition-all duration-200 hover:shadow-md ${
                        serviceType === type.value
                          ? "border-emerald-500 bg-emerald-50 shadow-md"
                          : "border-gray-200 hover:border-emerald-300"
                      }`}
                    >
                      {/* Icon */}
                      <div className="mb-4 flex justify-center">
                        {type.value === "general" && (
                          <svg
                            className="w-16 h-16 text-teal-500"
                            viewBox="0 0 64 64"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            {/* Broom handle */}
                            <line x1="32" y1="10" x2="20" y2="40" />
                            {/* Broom bristles */}
                            <path
                              d="M15 40 L25 40 L20 50 L10 50 Z"
                              fill="currentColor"
                              opacity="0.3"
                            />
                            <line x1="12" y1="42" x2="10" y2="50" />
                            <line x1="16" y1="42" x2="14" y2="50" />
                            <line x1="20" y1="42" x2="18" y2="50" />
                            <line x1="24" y1="42" x2="22" y2="50" />
                            {/* Sparkles */}
                            <circle
                              cx="38"
                              cy="15"
                              r="1.5"
                              fill="currentColor"
                            />
                            <circle cx="42" cy="22" r="1" fill="currentColor" />
                            <circle cx="28" cy="18" r="1" fill="currentColor" />
                          </svg>
                        )}
                        {type.value === "deep" && (
                          <svg
                            className="w-16 h-16 text-teal-500"
                            viewBox="0 0 64 64"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            {/* Washing bucket */}
                            <path
                              d="M18 25 L46 25 L42 50 L22 50 Z"
                              fill="currentColor"
                              opacity="0.2"
                            />
                            <line x1="18" y1="25" x2="46" y2="25" />
                            <line x1="20" y1="30" x2="44" y2="30" />
                            {/* Handle */}
                            <path
                              d="M22 25 Q22 18, 28 18 L36 18 Q42 18, 42 25"
                              fill="none"
                            />
                            {/* Bubbles */}
                            <circle
                              cx="25"
                              cy="35"
                              r="2"
                              fill="currentColor"
                              opacity="0.4"
                            />
                            <circle
                              cx="32"
                              cy="38"
                              r="2.5"
                              fill="currentColor"
                              opacity="0.4"
                            />
                            <circle
                              cx="39"
                              cy="36"
                              r="2"
                              fill="currentColor"
                              opacity="0.4"
                            />
                            <circle
                              cx="28"
                              cy="42"
                              r="1.5"
                              fill="currentColor"
                              opacity="0.4"
                            />
                            <circle
                              cx="36"
                              cy="44"
                              r="1.5"
                              fill="currentColor"
                              opacity="0.4"
                            />
                          </svg>
                        )}
                        {type.value === "endOfLease" && (
                          <svg
                            className="w-16 h-16 text-teal-500"
                            viewBox="0 0 64 64"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            {/* Truck body */}
                            <rect
                              x="12"
                              y="28"
                              width="28"
                              height="16"
                              rx="2"
                              fill="currentColor"
                              opacity="0.2"
                            />
                            <rect
                              x="40"
                              y="32"
                              width="10"
                              height="12"
                              rx="1"
                              fill="currentColor"
                              opacity="0.2"
                            />
                            {/* Wheels */}
                            <circle cx="22" cy="44" r="4" fill="none" />
                            <circle
                              cx="22"
                              cy="44"
                              r="2"
                              fill="currentColor"
                              opacity="0.3"
                            />
                            <circle cx="42" cy="44" r="4" fill="none" />
                            <circle
                              cx="42"
                              cy="44"
                              r="2"
                              fill="currentColor"
                              opacity="0.3"
                            />
                            {/* Water drop icon on truck */}
                            <path
                              d="M27 34 Q27 31, 29 31 Q31 31, 31 34 Q31 36, 29 36 Q27 36, 27 34 Z"
                              fill="currentColor"
                              opacity="0.5"
                            />
                            {/* Speed lines */}
                            <line x1="46" y1="35" x2="52" y2="35" />
                            <line x1="48" y1="38" x2="53" y2="38" />
                            <line x1="47" y1="41" x2="51" y2="41" />
                          </svg>
                        )}
                        {type.value === "moveIn" && (
                          <svg
                            className="w-16 h-16 text-teal-500"
                            viewBox="0 0 64 64"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            {/* House */}
                            <path
                              d="M32 15 L48 28 L48 50 L16 50 L16 28 Z"
                              fill="currentColor"
                              opacity="0.2"
                            />
                            <polyline points="12,30 32,15 52,30" fill="none" />
                            <rect
                              x="16"
                              y="28"
                              width="32"
                              height="22"
                              fill="none"
                            />
                            {/* Door */}
                            <rect
                              x="28"
                              y="38"
                              width="8"
                              height="12"
                              fill="currentColor"
                              opacity="0.3"
                            />
                            {/* Windows */}
                            <rect
                              x="22"
                              y="32"
                              width="6"
                              height="6"
                              fill="currentColor"
                              opacity="0.3"
                            />
                            <rect
                              x="36"
                              y="32"
                              width="6"
                              height="6"
                              fill="currentColor"
                              opacity="0.3"
                            />
                            {/* Chimney with sparkle */}
                            <rect
                              x="38"
                              y="18"
                              width="4"
                              height="8"
                              fill="currentColor"
                              opacity="0.3"
                            />
                            <circle
                              cx="44"
                              cy="22"
                              r="1.5"
                              fill="currentColor"
                            />
                          </svg>
                        )}
                      </div>
                      <div
                        className={`text-base font-semibold text-center ${
                          serviceType === type.value
                            ? "text-emerald-700"
                            : "text-gray-700"
                        }`}
                      >
                        {type.label}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Cleaning Frequency Section - Only for General Cleaning */}
              {serviceType === "general" && (
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">
                      Recurring service
                    </h2>
                    <div className="flex items-center space-x-2">
                      <span className="text-xl">🔥</span>
                      <span className="font-bold text-gray-900">
                        Most popular
                      </span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {/* Just Once */}
                    <button
                      onClick={() => setFrequency("once")}
                      className="w-full flex items-center justify-between p-4 rounded-xl border-2 border-gray-200 hover:border-emerald-300 transition-all duration-200"
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                            frequency === "once"
                              ? "border-emerald-500 bg-white"
                              : "border-gray-300 bg-white"
                          }`}
                        >
                          {frequency === "once" && (
                            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                          )}
                        </div>
                        <span className="text-lg font-medium text-gray-900">
                          Just Once
                        </span>
                      </div>
                    </button>

                    {/* Weekly */}
                    <button
                      onClick={() => setFrequency("weekly")}
                      className="w-full flex items-center justify-between p-4 rounded-xl border-2 border-gray-200 hover:border-emerald-300 transition-all duration-200"
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                            frequency === "weekly"
                              ? "border-emerald-500 bg-white"
                              : "border-gray-300 bg-white"
                          }`}
                        >
                          {frequency === "weekly" && (
                            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                          )}
                        </div>
                        <span className="text-lg font-medium text-gray-900">
                          Weekly
                        </span>
                      </div>
                      <span className="bg-yellow-400 text-gray-900 px-4 py-1.5 rounded-full font-semibold text-sm">
                        20% off
                      </span>
                    </button>

                    {/* Fortnightly */}
                    <button
                      onClick={() => setFrequency("fortnightly")}
                      className="w-full flex items-center justify-between p-4 rounded-xl border-2 border-gray-200 hover:border-emerald-300 transition-all duration-200"
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                            frequency === "fortnightly"
                              ? "border-emerald-500 bg-white"
                              : "border-gray-300 bg-white"
                          }`}
                        >
                          {frequency === "fortnightly" && (
                            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                          )}
                        </div>
                        <span className="text-lg font-medium text-gray-900">
                          Fortnightly
                        </span>
                      </div>
                      <span className="bg-yellow-400 text-gray-900 px-4 py-1.5 rounded-full font-semibold text-sm">
                        15% off
                      </span>
                    </button>

                    {/* Monthly */}
                    <button
                      onClick={() => setFrequency("monthly")}
                      className="w-full flex items-center justify-between p-4 rounded-xl border-2 border-gray-200 hover:border-emerald-300 transition-all duration-200"
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                            frequency === "monthly"
                              ? "border-emerald-500 bg-white"
                              : "border-gray-300 bg-white"
                          }`}
                        >
                          {frequency === "monthly" && (
                            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                          )}
                        </div>
                        <span className="text-lg font-medium text-gray-900">
                          Monthly
                        </span>
                      </div>
                      <span className="bg-yellow-400 text-gray-900 px-4 py-1.5 rounded-full font-semibold text-sm">
                        10% off
                      </span>
                    </button>
                  </div>
                  {frequency !== "once" && (
                    <div className="mt-4 text-sm text-gray-600 bg-emerald-50 rounded-lg p-3">
                      <div className="flex items-start space-x-2">
                        <svg
                          className="w-4 h-4 mt-0.5 flex-shrink-0 text-emerald-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <p>
                          * First cleaning at full price. Discount applies from
                          2nd cleaning onwards.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <PropertyDetails
                bedrooms={bedrooms}
                setBedrooms={setBedrooms}
                bathrooms={bathrooms}
                setBathrooms={setBathrooms}
                storey={storey}
                setStorey={setStorey}
                laundry={laundry}
                setLaundry={setLaundry}
                selectedAddOns={selectedAddOns}
                addOnQuantities={addOnQuantities}
                toggleAddOn={toggleAddOn}
                updateQuantity={updateQuantity}
              />

              {/* Select Date & Time Section */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Select Date & Time
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Calendar - Left Side */}
                  <div>
                    <label className="block text-gray-900 font-semibold mb-3">
                      Preferred Date
                    </label>
                    <CalendarPicker
                      selectedDate={selectedDate}
                      onDateSelect={setSelectedDate}
                    />
                    <p className="text-xs text-gray-600 mt-3">
                    For urgent bookings, please email us at {" "}
                      <a
                        href="mailto:info@sustainableshine.com.au"
                        className="text-emerald-600 hover:underline"
                      >
                        info@sustainableshine.com.au
                      </a>{" "}
                      so we can confirm availability and assist you as soon as possible.
                    </p>
                  </div>

                  {/* Time Selection - Right Side */}
                  <div>
                    <label className="block text-gray-900 font-semibold mb-3">
                      Preferred Time
                    </label>
                    <select
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-emerald-500 focus:outline-none appearance-none bg-white text-gray-700 cursor-pointer text-base"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23374151'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 0.75rem center",
                        backgroundSize: "1.5em 1.5em",
                        paddingRight: "2.5rem",
                      }}
                    >
                      <option value="">Select a time</option>
                      <option value="08:00">8:00 AM</option>
                      <option value="08:30">8:30 AM</option>
                      <option value="09:00">9:00 AM</option>
                      <option value="09:30">9:30 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="10:30">10:30 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="11:30">11:30 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="12:30">12:30 PM</option>
                      <option value="13:00">1:00 PM</option>
                      <option value="13:30">1:30 PM</option>
                      <option value="14:00">2:00 PM</option>
                      <option value="14:30">2:30 PM</option>
                      <option value="15:00">3:00 PM</option>
                      <option value="15:30">3:30 PM</option>
                      <option value="16:00">4:00 PM</option>
                      <option value="16:30">4:30 PM</option>
                    </select>
                    <p className="text-sm text-gray-600 mt-3">
                      Select your preferred time slot for the cleaning service
                    </p>
                  </div>
                </div>
              </div>

              <CustomerDetails
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
                email={email}
                setEmail={setEmail}
                phone={phone}
                setPhone={setPhone}
                smsReminders={smsReminders}
                setSmsReminders={setSmsReminders}
                unitNumber={unitNumber}
                setUnitNumber={setUnitNumber}
                street={street}
                setStreet={setStreet}
                suburb={suburb}
                setSuburb={setSuburb}
                postcode={postcode}
                setPostcode={setPostcode}
                hasPet={hasPet}
                setHasPet={setHasPet}
                hearAboutUs={hearAboutUs}
                setHearAboutUs={setHearAboutUs}
                specialNotes={specialNotes}
                setSpecialNotes={setSpecialNotes}
                cleanlinessLevel={cleanlinessLevel}
                setCleanlinessLevel={setCleanlinessLevel}
                parking={parking}
                setParking={setParking}
                flexibleDateTime={flexibleDateTime}
                setFlexibleDateTime={setFlexibleDateTime}
                access={access}
                setAccess={setAccess}
              />

              {/* Submit Button */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || submitSuccess}
                  className={`w-full py-5 px-8 rounded-xl font-bold text-lg transition-all duration-200 shadow-lg ${
                    isSubmitting || submitSuccess
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white transform hover:scale-[1.02]"
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending Booking Request...
                    </span>
                  ) : submitSuccess ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="w-6 h-6 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Booking Sent Successfully!
                    </span>
                  ) : (
                    "Submit Booking Request"
                  )}
                </button>
                <p className="text-sm text-gray-600 text-center mt-4">
                  By submitting, you agree to receive communication from
                  Sustainable Shine regarding your booking.
                </p>
              </div>
            </div>

            {/* Right Side - Price Calculator (Desktop Only) */}
            <div className="hidden lg:block lg:col-span-1 relative">
              <div className="sticky top-24 max-h-screen overflow-y-auto">
                <PriceSummary />
              </div>
            </div>
          </div>

          {/* Additional Info Section */}
          <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              What's Included in Your Service
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-start space-x-3">
                <div className="bg-emerald-100 p-2 rounded-lg">
                  <svg
                    className="w-6 h-6 text-emerald-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 mb-1">
                    Professional Team
                  </div>
                  <p className="text-sm text-gray-600">
                    Trained and insured cleaning professionals
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-emerald-100 p-2 rounded-lg">
                  <svg
                    className="w-6 h-6 text-emerald-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 mb-1">
                    Eco-Friendly Products
                  </div>
                  <p className="text-sm text-gray-600">
                    100% green and sustainable cleaning supplies
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-emerald-100 p-2 rounded-lg">
                  <svg
                    className="w-6 h-6 text-emerald-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 mb-1">
                    Satisfaction Guarantee
                  </div>
                  <p className="text-sm text-gray-600">
                    100% money-back guarantee if not satisfied
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
