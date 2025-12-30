"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [smsReminders, setSmsReminders] = useState(true);
  const [hasPet, setHasPet] = useState("");
  const [hearAboutUs, setHearAboutUs] = useState("");
  const [specialNotes, setSpecialNotes] = useState("");
  const [address, setAddress] = useState("");
  const [aptNo, setAptNo] = useState("");
  const [cleanlinessLevel, setCleanlinessLevel] = useState("");
  const [parking, setParking] = useState("");
  const [flexibleDateTime, setFlexibleDateTime] = useState("");
  const [access, setAccess] = useState("");

  const GST_RATE = 0.1; // 10% GST

  // Add-ons list
  const addOnsData = [
    {
      id: "carpetSteam",
      name: "Carpet Steam Clean",
      price: 60,
      icon: "🧹",
      description: "(per room or area)",
      hasQuantity: true,
    },
    {
      id: "insideFridge",
      name: "Inside Fridge",
      price: 30,
      icon: "🧊",
      description: "(must be empty)",
    },
    {
      id: "insideDishwasher",
      name: "Inside Dishwasher",
      price: 30,
      icon: "🍽️",
      description: "",
    },
    {
      id: "ovenSteamer",
      name: "Extra Oven/Steamer",
      price: 60,
      icon: "🔥",
      description: "",
    },
    {
      id: "blindsRoller",
      name: "Blinds - Roller/Plantation",
      price: 10,
      icon: "🪟",
      description: "(per blind)",
      hasQuantity: true,
    },
    {
      id: "blindsVenetian",
      name: "Blinds - Venetian/Vertical",
      price: 20,
      icon: "🪟",
      description: "(per blind)",
      hasQuantity: true,
    },
    {
      id: "exteriorWindows",
      name: "Exterior Windows",
      price: 60,
      icon: "🏠",
      description: "(levelled house only)",
    },
    {
      id: "interiorWindows",
      name: "Interior Windows",
      price: 60,
      icon: "🪟",
      description: "(per hour)",
      hasQuantity: true,
    },
    {
      id: "spotClean60",
      name: "Spot Clean Walls",
      price: 60,
      icon: "🧼",
      description: "(1 hour)",
      hasQuantity: true,
    },

    {
      id: "garageSweep",
      name: "Garage Sweep & Tidy",
      price: 30,
      icon: "🚗",
      description: "",
      hasQuantity: true,
    },
    {
      id: "smallBalcony",
      name: "Small Balcony/Patio/Deck",
      price: 30,
      icon: "🏡",
      description: "(up to 12m sq.)",
      hasQuantity: true,
    },
    {
      id: "largeBalcony",
      name: "Large Balcony/Patio/Deck",
      price: 60,
      icon: "🏡",
      description: "(above 12m sq.)",
      hasQuantity: true,
    },
    {
      id: "slidingDoor",
      name: "Sliding Door",
      price: 30,
      icon: "🚪",
      description: "(each)",
      hasQuantity: true,
    },
    // {
    //   id: "tumbleDryer",
    //   name: "Tumble Dryer",
    //   price: 40,
    //   icon: "🌀",
    //   description: "",
    // },
    // {
    //   id: "keysPickup10km",
    //   name: "Keys Pickup/Drop Off",
    //   price: 30,
    //   icon: "🔑",
    //   description: "(1-10km)",
    // },
    // {
    //   id: "keysPickup20km",
    //   name: "Keys Pickup/Drop Off",
    //   price: 60,
    //   icon: "🔑",
    //   description: "(11-20km)",
    // },
    // {
    //   id: "fleaTreatment",
    //   name: "Flea Treatment",
    //   price: 80,
    //   icon: "🐛",
    //   description: "(End of Lease)",
    // },
  ];

  const toggleAddOn = (id) => {
    const addOn = addOnsData.find((a) => a.id === id);
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

  // Helper function to render add-on icons
  const renderAddOnIcon = (id) => {
    const iconClass = "w-16 h-16 text-teal-500";
    const svgProps = {
      className: iconClass,
      viewBox: "0 0 64 64",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    };

    switch (id) {
      case "carpetSteam":
        return (
          <svg {...svgProps}>
            {/* Vacuum cleaner */}
            <circle cx="32" cy="28" r="8" fill="currentColor" opacity="0.2" />
            <rect
              x="28"
              y="36"
              width="8"
              height="12"
              fill="currentColor"
              opacity="0.2"
            />
            <line x1="32" y1="48" x2="32" y2="54" />
            <path d="M22 50 L42 50" strokeWidth="3" />
            {/* Steam */}
            <path d="M20 22 Q20 18, 22 18" fill="none" opacity="0.5" />
            <path d="M26 20 Q26 16, 28 16" fill="none" opacity="0.5" />
            <path d="M38 20 Q38 16, 40 16" fill="none" opacity="0.5" />
            <path d="M44 22 Q44 18, 46 18" fill="none" opacity="0.5" />
          </svg>
        );

      case "insideFridge":
        return (
          <svg {...svgProps}>
            {/* Fridge body */}
            <rect
              x="20"
              y="15"
              width="24"
              height="38"
              rx="2"
              fill="currentColor"
              opacity="0.2"
            />
            <line x1="20" y1="30" x2="44" y2="30" />
            {/* Handles */}
            <rect
              x="38"
              y="20"
              width="2"
              height="6"
              rx="1"
              fill="currentColor"
            />
            <rect
              x="38"
              y="35"
              width="2"
              height="8"
              rx="1"
              fill="currentColor"
            />
            {/* Snowflake */}
            <line x1="32" y1="40" x2="32" y2="46" strokeWidth="1.5" />
            <line x1="29" y1="43" x2="35" y2="43" strokeWidth="1.5" />
            <line x1="30" y1="41" x2="34" y2="45" strokeWidth="1.5" />
            <line x1="30" y1="45" x2="34" y2="41" strokeWidth="1.5" />
          </svg>
        );

      case "insideDishwasher":
        return (
          <svg {...svgProps}>
            {/* Dishwasher */}
            <rect
              x="18"
              y="20"
              width="28"
              height="28"
              rx="2"
              fill="currentColor"
              opacity="0.2"
            />
            {/* Door handle */}
            <rect
              x="20"
              y="25"
              width="24"
              height="2"
              fill="currentColor"
              opacity="0.5"
            />
            {/* Plates */}
            <circle cx="26" cy="36" r="4" fill="none" strokeWidth="1.5" />
            <circle cx="32" cy="36" r="4" fill="none" strokeWidth="1.5" />
            <circle cx="38" cy="36" r="4" fill="none" strokeWidth="1.5" />
            {/* Water drops */}
            <circle cx="28" cy="42" r="1" fill="currentColor" opacity="0.5" />
            <circle cx="32" cy="44" r="1" fill="currentColor" opacity="0.5" />
            <circle cx="36" cy="42" r="1" fill="currentColor" opacity="0.5" />
          </svg>
        );

      case "ovenSteamer":
        return (
          <svg {...svgProps}>
            {/* Oven */}
            <rect
              x="18"
              y="20"
              width="28"
              height="28"
              rx="2"
              fill="currentColor"
              opacity="0.2"
            />
            {/* Window */}
            <rect x="22" y="28" width="20" height="16" rx="1" fill="none" />
            {/* Heat lines */}
            <path
              d="M26 34 Q28 32, 30 34 Q32 36, 34 34 Q36 32, 38 34"
              fill="none"
              strokeWidth="1.5"
            />
            <path
              d="M26 38 Q28 36, 30 38 Q32 40, 34 38 Q36 36, 38 38"
              fill="none"
              strokeWidth="1.5"
            />
            {/* Knobs */}
            <circle cx="24" cy="24" r="1.5" fill="currentColor" />
            <circle cx="32" cy="24" r="1.5" fill="currentColor" />
            <circle cx="40" cy="24" r="1.5" fill="currentColor" />
          </svg>
        );

      case "blindsRoller":
      case "blindsVenetian":
        return (
          <svg {...svgProps}>
            {/* Window frame */}
            <rect x="20" y="15" width="24" height="32" rx="1" fill="none" />
            {/* Blinds */}
            <line x1="22" y1="20" x2="42" y2="20" strokeWidth="1.5" />
            <line x1="22" y1="24" x2="42" y2="24" strokeWidth="1.5" />
            <line x1="22" y1="28" x2="42" y2="28" strokeWidth="1.5" />
            <line x1="22" y1="32" x2="42" y2="32" strokeWidth="1.5" />
            <line x1="22" y1="36" x2="42" y2="36" strokeWidth="1.5" />
            <line x1="22" y1="40" x2="42" y2="40" strokeWidth="1.5" />
            {/* Pull cord */}
            <line x1="38" y1="44" x2="38" y2="50" strokeWidth="1" />
            <circle cx="38" cy="50" r="1.5" fill="currentColor" />
          </svg>
        );

      case "exteriorWindows":
        return (
          <svg {...svgProps}>
            {/* Window panes */}
            <rect
              x="18"
              y="18"
              width="12"
              height="14"
              fill="currentColor"
              opacity="0.15"
            />
            <rect
              x="34"
              y="18"
              width="12"
              height="14"
              fill="currentColor"
              opacity="0.15"
            />
            <rect
              x="18"
              y="36"
              width="12"
              height="14"
              fill="currentColor"
              opacity="0.15"
            />
            <rect
              x="34"
              y="36"
              width="12"
              height="14"
              fill="currentColor"
              opacity="0.15"
            />
            {/* Frame */}
            <rect
              x="18"
              y="18"
              width="28"
              height="32"
              fill="none"
              strokeWidth="2"
            />
            <line x1="32" y1="18" x2="32" y2="50" strokeWidth="2" />
            <line x1="18" y1="34" x2="46" y2="34" strokeWidth="2" />
            {/* Sparkle */}
            <circle cx="24" cy="24" r="1.5" fill="currentColor" />
            <line x1="24" y1="22" x2="24" y2="26" strokeWidth="1" />
            <line x1="22" y1="24" x2="26" y2="24" strokeWidth="1" />
          </svg>
        );

      case "interiorWindows":
        return (
          <svg {...svgProps}>
            {/* Window panes - interior view */}
            <rect
              x="20"
              y="20"
              width="10"
              height="12"
              fill="currentColor"
              opacity="0.1"
            />
            <rect
              x="34"
              y="20"
              width="10"
              height="12"
              fill="currentColor"
              opacity="0.1"
            />
            <rect
              x="20"
              y="36"
              width="10"
              height="12"
              fill="currentColor"
              opacity="0.1"
            />
            <rect
              x="34"
              y="36"
              width="10"
              height="12"
              fill="currentColor"
              opacity="0.1"
            />
            {/* Frame */}
            <rect
              x="20"
              y="20"
              width="24"
              height="28"
              fill="none"
              strokeWidth="2"
            />
            <line x1="32" y1="20" x2="32" y2="48" strokeWidth="2" />
            <line x1="20" y1="34" x2="44" y2="34" strokeWidth="2" />
            {/* Cleaning cloth */}
            <rect
              x="26"
              y="28"
              width="6"
              height="4"
              rx="1"
              fill="currentColor"
              opacity="0.4"
            />
            {/* Sparkles */}
            <circle cx="24" cy="24" r="1" fill="currentColor" opacity="0.6" />
            <circle cx="38" cy="26" r="1" fill="currentColor" opacity="0.6" />
            <circle cx="28" cy="42" r="1" fill="currentColor" opacity="0.6" />
          </svg>
        );

      case "spotClean60":
        return (
          <svg {...svgProps}>
            {/* Wall/surface */}
            <rect
              x="15"
              y="20"
              width="34"
              height="28"
              rx="2"
              fill="currentColor"
              opacity="0.1"
            />
            {/* Sponge/cleaning tool */}
            <rect
              x="28"
              y="28"
              width="12"
              height="8"
              rx="2"
              fill="currentColor"
              opacity="0.3"
            />
            {/* Bubbles */}
            <circle cx="22" cy="26" r="2" fill="currentColor" opacity="0.4" />
            <circle cx="26" cy="38" r="1.5" fill="currentColor" opacity="0.4" />
            <circle cx="38" cy="38" r="2" fill="currentColor" opacity="0.4" />
            <circle cx="42" cy="30" r="1.5" fill="currentColor" opacity="0.4" />
            {/* Cleaning motion */}
            <path
              d="M34 30 Q36 28, 38 30"
              fill="none"
              strokeWidth="1"
              opacity="0.5"
            />
          </svg>
        );

      case "garageSweep":
        return (
          <svg {...svgProps}>
            {/* Garage door */}
            <rect
              x="18"
              y="20"
              width="28"
              height="28"
              rx="2"
              fill="currentColor"
              opacity="0.2"
            />
            <line x1="18" y1="26" x2="46" y2="26" />
            <line x1="18" y1="32" x2="46" y2="32" />
            <line x1="18" y1="38" x2="46" y2="38" />
            <line x1="18" y1="44" x2="46" y2="44" />
            {/* Broom */}
            <line x1="36" y1="28" x2="40" y2="42" strokeWidth="1.5" />
            <path
              d="M38 42 L42 42 L40 46 Z"
              fill="currentColor"
              opacity="0.3"
            />
          </svg>
        );

      case "smallBalcony":
      case "largeBalcony":
        return (
          <svg {...svgProps}>
            {/* Balcony floor */}
            <rect
              x="16"
              y="36"
              width="32"
              height="12"
              fill="currentColor"
              opacity="0.2"
            />
            {/* Railing posts */}
            <line x1="20" y1="24" x2="20" y2="36" strokeWidth="1.5" />
            <line x1="28" y1="24" x2="28" y2="36" strokeWidth="1.5" />
            <line x1="36" y1="24" x2="36" y2="36" strokeWidth="1.5" />
            <line x1="44" y1="24" x2="44" y2="36" strokeWidth="1.5" />
            {/* Top rail */}
            <line x1="18" y1="24" x2="46" y2="24" strokeWidth="2" />
            {/* Plant */}
            <circle cx="24" cy="42" r="3" fill="currentColor" opacity="0.3" />
            <path
              d="M24 39 L24 36 M22 40 L20 38 M26 40 L28 38"
              fill="none"
              strokeWidth="1"
            />
          </svg>
        );

      case "slidingDoor":
        return (
          <svg {...svgProps}>
            {/* Door frame */}
            <rect
              x="16"
              y="16"
              width="32"
              height="36"
              rx="1"
              fill="none"
              strokeWidth="2"
            />
            {/* Left door panel (fixed) */}
            <rect
              x="18"
              y="18"
              width="14"
              height="32"
              fill="currentColor"
              opacity="0.15"
            />
            <line x1="18" y1="18" x2="18" y2="50" strokeWidth="1.5" />
            <line x1="32" y1="18" x2="32" y2="50" strokeWidth="1.5" />
            {/* Vertical lines on left panel */}
            <line
              x1="22"
              y1="20"
              x2="22"
              y2="48"
              strokeWidth="1"
              opacity="0.5"
            />
            <line
              x1="28"
              y1="20"
              x2="28"
              y2="48"
              strokeWidth="1"
              opacity="0.5"
            />
            {/* Right door panel (sliding) */}
            <rect
              x="32"
              y="18"
              width="14"
              height="32"
              fill="currentColor"
              opacity="0.25"
            />
            <line x1="32" y1="18" x2="32" y2="50" strokeWidth="1.5" />
            <line x1="46" y1="18" x2="46" y2="50" strokeWidth="1.5" />
            {/* Vertical lines on right panel */}
            <line
              x1="36"
              y1="20"
              x2="36"
              y2="48"
              strokeWidth="1"
              opacity="0.5"
            />
            <line
              x1="42"
              y1="20"
              x2="42"
              y2="48"
              strokeWidth="1"
              opacity="0.5"
            />
            {/* Handle on right panel */}
            <rect
              x="34"
              y="32"
              width="2"
              height="4"
              rx="1"
              fill="currentColor"
            />
            {/* Arrow indicating sliding */}
            <path
              d="M38 12 L42 12 L40 10 M40 14 L42 12"
              fill="none"
              strokeWidth="1"
            />
          </svg>
        );

      default:
        return (
          <svg {...svgProps}>
            <circle cx="32" cy="32" r="12" fill="currentColor" opacity="0.2" />
            <path d="M28 32 L30 34 L36 28" fill="none" strokeWidth="2" />
          </svg>
        );
    }
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

  const serviceTypes = [
    { value: "general", label: "General Cleaning", icon: "🧹" },
    { value: "deep", label: "Deep Cleaning", icon: "🫧" },
    { value: "endOfLease", label: "End of Lease", icon: "🔑" },
    { value: "moveIn", label: "Move-in Cleaning", icon: "🏡" },
    // { value: "office", label: "Office Cleaning", icon: "💼" },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-20">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
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

        <div className="grid lg:grid-cols-3 gap-8 items-start">
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
                    onClick={() => setServiceType(type.value)}
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
                          <circle cx="38" cy="15" r="1.5" fill="currentColor" />
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
                          <circle cx="44" cy="22" r="1.5" fill="currentColor" />
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

            {/* Room Configuration */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Property Details
              </h2>

              <div className="space-y-6">
                {/* Bedrooms */}
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-2xl">🛏️</span>
                    <span className="text-base font-bold text-gray-900">
                      Bedrooms
                    </span>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {[1, 2, 3, 4].map((num) => (
                      <button
                        key={num}
                        onClick={() => setBedrooms(num)}
                        className={`py-2.5 px-3 rounded-lg font-semibold text-base transition-all duration-200 ${
                          bedrooms === num
                            ? "bg-emerald-500 text-white shadow-md"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                    <button
                      onClick={() => setBedrooms(5)}
                      className={`py-2.5 px-3 rounded-lg font-semibold text-base transition-all duration-200 ${
                        bedrooms >= 5
                          ? "bg-emerald-500 text-white shadow-md"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      5+
                    </button>
                  </div>
                </div>

                {/* Bathrooms */}
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-2xl">🚿</span>
                    <span className="text-base font-bold text-gray-900">
                      Bathrooms
                    </span>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {[1, 2, 3, 4].map((num) => (
                      <button
                        key={num}
                        onClick={() => setBathrooms(num)}
                        className={`py-2.5 px-3 rounded-lg font-semibold text-base transition-all duration-200 ${
                          bathrooms === num
                            ? "bg-emerald-500 text-white shadow-md"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                    <button
                      onClick={() => setBathrooms(5)}
                      className={`py-2.5 px-3 rounded-lg font-semibold text-base transition-all duration-200 ${
                        bathrooms >= 5
                          ? "bg-emerald-500 text-white shadow-md"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      5+
                    </button>
                  </div>
                </div>

                {/* Storeys */}
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-2xl">🏢</span>
                    <span className="text-base font-bold text-gray-900">
                      Storeys
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 max-w-sm">
                    {[1, 2, 3].map((num) => (
                      <button
                        key={num}
                        onClick={() => setStorey(num)}
                        className={`py-2.5 px-3 rounded-lg font-semibold text-base transition-all duration-200 ${
                          storey === num
                            ? "bg-emerald-500 text-white shadow-md"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    How many levels is your home?
                  </p>
                </div>

                {/* Laundry */}
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-2xl">🧺</span>
                    <span className="text-base font-bold text-gray-900">
                      Laundries
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 max-w-sm">
                    {[0, 1, 2].map((num) => (
                      <button
                        key={num}
                        onClick={() => setLaundry(num)}
                        className={`py-2.5 px-3 rounded-lg font-semibold text-base transition-all duration-200 ${
                          laundry === num
                            ? "bg-emerald-500 text-white shadow-md"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Do you have a laundry room/cupboard?
                  </p>
                </div>
              </div>
            </div>

            {/* Add-ons Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Customize Your Service
                  </h2>
                  <p className="text-gray-600">
                    Select your add-ons as required. Only pay for what you need.
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {addOnsData.map((addOn) => (
                    <button
                      key={addOn.id}
                      onClick={() => toggleAddOn(addOn.id)}
                      className={`relative p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-md ${
                        selectedAddOns[addOn.id]
                          ? "border-emerald-500 bg-emerald-50"
                          : "border-gray-200 hover:border-emerald-300 bg-white"
                      }`}
                    >
                      {/* Checkmark indicator */}
                      {selectedAddOns[addOn.id] && (
                        <div className="absolute top-2 right-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                      )}

                      <div className="mb-3 flex justify-center">
                        {renderAddOnIcon(addOn.id)}
                      </div>
                      <div
                        className={`text-sm font-bold mb-1 ${
                          selectedAddOns[addOn.id]
                            ? "text-emerald-700"
                            : "text-gray-800"
                        }`}
                      >
                        {addOn.name}
                      </div>
                      {addOn.description && (
                        <div className="text-xs text-gray-500 mb-2">
                          {addOn.description}
                        </div>
                      )}
                      <div
                        className={`text-lg font-bold mb-2 ${
                          selectedAddOns[addOn.id]
                            ? "text-emerald-600"
                            : "text-gray-700"
                        }`}
                      >
                        ${addOn.price}
                      </div>

                      {/* Quantity selector for items with hasQuantity */}
                      {addOn.hasQuantity && selectedAddOns[addOn.id] && (
                        <div
                          className="flex items-center justify-center space-x-2 mt-2"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              updateQuantity(
                                addOn.id,
                                (addOnQuantities[addOn.id] || 1) - 1
                              );
                            }}
                            className="w-7 h-7 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold flex items-center justify-center transition-colors"
                          >
                            -
                          </button>
                          <span className="w-10 text-center font-semibold text-gray-900">
                            {addOnQuantities[addOn.id] || 1}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              updateQuantity(
                                addOn.id,
                                (addOnQuantities[addOn.id] || 1) + 1
                              );
                            }}
                            className="w-7 h-7 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold flex items-center justify-center transition-colors"
                          >
                            +
                          </button>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Select Date Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Select Date
              </h2>
              <div className="relative">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full md:w-1/2 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-emerald-500 focus:outline-none text-gray-700"
                  placeholder="Select a date"
                />
              </div>
            </div>

            {/* Customer Details Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Customer Details
              </h2>
              <p className="text-gray-700 mb-6">
                This information will be used to contact you about your service.
              </p>

              <div className="space-y-6">
                {/* Name Row */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-900 font-semibold mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Ex: James"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-900 font-semibold mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Ex: Lee"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-gray-900 font-semibold mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ex: example@xyz.com"
                    className="w-full md:w-1/2 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-gray-900 font-semibold mb-2">
                    Phone No
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone No."
                    className="w-full md:w-1/2 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                {/* SMS Reminders Checkbox */}
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="smsReminders"
                    checked={smsReminders}
                    onChange={(e) => setSmsReminders(e.target.checked)}
                    className="w-5 h-5 accent-emerald-600 border-2 border-gray-300 rounded focus:ring-emerald-500 cursor-pointer"
                  />
                  <label
                    htmlFor="smsReminders"
                    className="text-gray-900 font-medium cursor-pointer"
                  >
                    Send me reminders about my booking via text message
                  </label>
                </div>
              </div>
            </div>

            {/* Pet and Referral Section */}
            <div className="bg-gray-50 rounded-2xl shadow-lg p-6 space-y-6">
              {/* Do You have Pet */}
              <div>
                <label className="block text-gray-900 font-semibold mb-2">
                  Do You have Pet?
                </label>
                <select
                  value={hasPet}
                  onChange={(e) => setHasPet(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-emerald-500 focus:outline-none appearance-none bg-white text-gray-700"
                >
                  <option value="">Select Option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              {/* How Did You Hear About Us */}
              <div>
                <label className="block text-gray-900 font-semibold mb-2">
                  How Did You Hear About Us
                </label>
                <select
                  value={hearAboutUs}
                  onChange={(e) => setHearAboutUs(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-emerald-500 focus:outline-none appearance-none bg-white text-gray-700"
                >
                  <option value="">Select Option</option>
                  <option value="google">Google Search</option>
                  <option value="facebook">Facebook</option>
                  <option value="instagram">Instagram</option>
                  <option value="friend">Friend/Family Referral</option>
                  <option value="flyer">Flyer</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Special Notes */}
              <div>
                <label className="block text-gray-900 font-semibold mb-2">
                  Would You Like To Add Any Notes?
                </label>
                <textarea
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  placeholder="Special Notes Or Instructions"
                  rows={5}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-emerald-500 focus:outline-none resize-none"
                />
              </div>
            </div>

            {/* Address Details Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Address Details
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-900 font-semibold mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Type Address"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-900 font-semibold mb-2">
                    Apt. No.
                  </label>
                  <input
                    type="text"
                    value={aptNo}
                    onChange={(e) => setAptNo(e.target.value)}
                    placeholder="#"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Access & Other Information Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Access & Other Information
              </h2>

              {/* Cleanliness Level */}
              <div>
                <label className="block text-gray-900 font-semibold mb-2">
                  On A Scale Of 1-4, How Clean Would You Estimate Your Home To
                  Be?
                </label>
                <select
                  value={cleanlinessLevel}
                  onChange={(e) => setCleanlinessLevel(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-emerald-500 focus:outline-none appearance-none bg-white text-gray-700"
                >
                  <option value="">Select Option</option>
                  <option value="1">1 - Very Clean</option>
                  <option value="2">2 - Moderately Clean</option>
                  <option value="3">3 - Needs Cleaning</option>
                  <option value="4">4 - Heavily Soiled</option>
                </select>
              </div>

              {/* Parking */}
              <div>
                <label className="block text-gray-900 font-semibold mb-2">
                  Where can the cleaners park?
                </label>
                <select
                  value={parking}
                  onChange={(e) => setParking(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-emerald-500 focus:outline-none appearance-none bg-white text-gray-700"
                >
                  <option value="">Select Option</option>
                  <option value="driveway">Driveway</option>
                  <option value="street">Street Parking</option>
                  <option value="garage">Garage</option>
                  <option value="visitor">Visitor Parking</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Flexible Date/Time */}
              <div>
                <label className="block text-gray-900 font-semibold mb-2">
                  Is Your Date And Time Flexible
                </label>
                <select
                  value={flexibleDateTime}
                  onChange={(e) => setFlexibleDateTime(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-emerald-500 focus:outline-none appearance-none bg-white text-gray-700"
                >
                  <option value="">Select Option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              {/* Access */}
              <div>
                <label className="block text-gray-900 font-semibold mb-2">
                  How Will The Cleaner Gain Access To Your Home
                </label>
                <select
                  value={access}
                  onChange={(e) => setAccess(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-emerald-500 focus:outline-none appearance-none bg-white text-gray-700"
                >
                  <option value="">Select Option</option>
                  <option value="home">I will be home</option>
                  <option value="key">Leave a key</option>
                  <option value="lockbox">Lockbox</option>
                  <option value="doorcode">Door code</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Right Side - Price Calculator */}
          <div className="lg:col-span-1 sticky top-30">
            <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl shadow-xl p-6 text-white">
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
                    <span className="text-emerald-100">
                      Subtotal (before discount)
                    </span>
                    <span className="font-semibold">
                      $
                      {(
                        ((priceDetails.subtotal + priceDetails.discount) /
                          1.1) *
                        1.1
                      ).toFixed(2)}
                    </span>
                  </div>
                )}
                {priceDetails.discount > 0 && (
                  <div className="flex justify-between items-center text-emerald-300">
                    <span className="font-semibold">
                      Discount ({frequencyDiscounts[frequency] * 100}% off from
                      2nd clean)
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
                  <span className="font-semibold">
                    ${priceDetails.gst.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Total Price */}
              <div className="border-t-2 border-white/30 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-white">
                    {priceDetails.discount > 0
                      ? "First Cleaning Total"
                      : "Total"}
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
  );
}
