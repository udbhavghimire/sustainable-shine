"use client";

import { useState, useEffect } from "react";

export default function BookingCalculator() {
  const [serviceType, setServiceType] = useState("general");
  const [bedrooms, setBedrooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [kitchen, setKitchen] = useState(1);
  const [livingDining, setLivingDining] = useState(1);
  const [laundry, setLaundry] = useState(0);
  const [storey, setStorey] = useState(1);
  const [selectedAddOns, setSelectedAddOns] = useState({});

  const GST_RATE = 0.1; // 10% GST

  // Add-ons list
  const addOnsData = [
    {
      id: "carpetSteam",
      name: "Carpet Steam Clean",
      price: 40,
      icon: "🧹",
      description: "(per room or area)",
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
      price: 50,
      icon: "🍽️",
      description: "",
    },
    {
      id: "ovenSteamer",
      name: "Extra Oven/Steamer",
      price: 50,
      icon: "🔥",
      description: "",
    },
    {
      id: "blindsRoller",
      name: "Blinds - Roller/Plantation",
      price: 10,
      icon: "🪟",
      description: "(per blind)",
    },
    {
      id: "blindsVenetian",
      name: "Blinds - Venetian/Vertical",
      price: 20,
      icon: "🪟",
      description: "(per blind)",
    },
    {
      id: "exteriorWindows",
      name: "Exterior Windows",
      price: 60,
      icon: "🏠",
      description: "(levelled house only)",
    },

    {
      id: "spotClean30",
      name: "Spot Clean Walls",
      price: 30,
      icon: "🧼",
      description: "(30 minutes)",
    },
    {
      id: "spotClean60",
      name: "Spot Clean Walls",
      price: 60,
      icon: "🧼",
      description: "(1 hour)",
    },

    {
      id: "garageSweep",
      name: "Garage Sweep & Tidy",
      price: 30,
      icon: "🚗",
      description: "",
    },
    {
      id: "smallBalcony",
      name: "Small Balcony/Patio/Deck",
      price: 30,
      icon: "🏡",
      description: "(up to 12m sq.)",
    },
    {
      id: "largeBalcony",
      name: "Large Balcony/Patio/Deck",
      price: 60,
      icon: "🏡",
      description: "(above 12m sq.)",
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
    setSelectedAddOns((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Base prices and add-on rates
  const pricing = {
    general: {
      base: 120,
      baseConfig: {
        bedrooms: 1,
        bathrooms: 1,
        kitchen: 1,
        livingDining: 1,
        laundry: 0,
      },
      addOnRate: 30,
    },
    deep: {
      base: 150,
      baseConfig: {
        bedrooms: 1,
        bathrooms: 1,
        kitchen: 1,
        livingDining: 1,
        laundry: 0,
      },
      addOnRate: 40,
    },
    endOfLease: {
      base: 320,
      baseConfig: {
        bedrooms: 1,
        bathrooms: 1,
        kitchen: 1,
        livingDining: 1,
        laundry: 0,
      },
      addOnRate: 40,
    },
    moveIn: {
      base: 280,
      baseConfig: {
        bedrooms: 1,
        bathrooms: 1,
        kitchen: 1,
        livingDining: 1,
        laundry: 0,
      },
      addOnRate: 40,
    },
    office: {
      base: 200,
      baseConfig: {
        bedrooms: 0,
        bathrooms: 1,
        kitchen: 1,
        livingDining: 1,
        laundry: 0,
      },
      addOnRate: 35,
    },
    school: {
      base: 250,
      baseConfig: {
        bedrooms: 0,
        bathrooms: 2,
        kitchen: 1,
        livingDining: 2,
        laundry: 0,
      },
      addOnRate: 35,
    },
  };

  const calculatePrice = () => {
    const config = pricing[serviceType];
    const baseConfig = config.baseConfig;

    // Calculate additional rooms beyond base
    const extraBedrooms = Math.max(0, bedrooms - baseConfig.bedrooms);
    const extraBathrooms = Math.max(0, bathrooms - baseConfig.bathrooms);
    const extraKitchen = Math.max(0, kitchen - baseConfig.kitchen);
    const extraLivingDining = Math.max(
      0,
      livingDining - baseConfig.livingDining
    );
    const extraLaundry = Math.max(0, laundry - baseConfig.laundry);

    const totalAddOns =
      (extraBedrooms +
        extraBathrooms +
        extraKitchen +
        extraLivingDining +
        extraLaundry) *
      config.addOnRate;

    // Calculate add-ons total
    const addOnsTotal = Object.keys(selectedAddOns).reduce((total, key) => {
      if (selectedAddOns[key]) {
        const addOn = addOnsData.find((a) => a.id === key);
        return total + (addOn ? addOn.price : 0);
      }
      return total;
    }, 0);

    const subtotal = config.base + totalAddOns + addOnsTotal;
    const gst = subtotal * GST_RATE;
    const total = subtotal + gst;

    return {
      base: config.base,
      addOns: totalAddOns,
      addOnsExtra: addOnsTotal,
      subtotal: subtotal,
      gst: gst,
      total: total,
      breakdown: {
        bedrooms: bedrooms,
        bathrooms: bathrooms,
        kitchen: kitchen,
        livingDining: livingDining,
        laundry: laundry,
      },
      extraRooms: {
        bedrooms: extraBedrooms,
        bathrooms: extraBathrooms,
        kitchen: extraKitchen,
        livingDining: extraLivingDining,
        laundry: extraLaundry,
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

    // { value: "school", label: "School Cleaning", icon: "🎓" },
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
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {serviceTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setServiceType(type.value)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-md ${
                      serviceType === type.value
                        ? "border-emerald-500 bg-emerald-50 shadow-md"
                        : "border-gray-200 hover:border-emerald-300"
                    }`}
                  >
                    <div className="text-3xl mb-2">{type.icon}</div>
                    <div
                      className={`text-sm font-semibold ${
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

            {/* Room Configuration */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Property Details
              </h2>

              <div className="space-y-3">
                {/* Bedrooms */}
                <div className="flex items-center justify-between p-4 bg-white rounded-xl border-2 border-gray-100 hover:border-emerald-200 transition-colors">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">🛏️</span>
                    <span className="text-lg font-bold text-gray-800">
                      Bedrooms
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setBedrooms(Math.max(1, bedrooms - 1))}
                      className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-emerald-500 hover:text-white text-gray-700 font-bold transition-all duration-200 flex items-center justify-center"
                    >
                      -
                    </button>
                    <div className="w-12 h-9 flex items-center justify-center bg-emerald-50 rounded-lg">
                      <span className="text-lg font-bold text-emerald-700">
                        {bedrooms}
                      </span>
                    </div>
                    <button
                      onClick={() => setBedrooms(bedrooms + 1)}
                      className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-emerald-500 hover:text-white text-gray-700 font-bold transition-all duration-200 flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Bathrooms */}
                <div className="flex items-center justify-between p-4 bg-white rounded-xl border-2 border-gray-100 hover:border-emerald-200 transition-colors">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">🚿</span>
                    <span className="text-lg font-bold text-gray-800">
                      Bathrooms
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setBathrooms(Math.max(1, bathrooms - 1))}
                      className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-emerald-500 hover:text-white text-gray-700 font-bold transition-all duration-200 flex items-center justify-center"
                    >
                      -
                    </button>
                    <div className="w-12 h-9 flex items-center justify-center bg-emerald-50 rounded-lg">
                      <span className="text-lg font-bold text-emerald-700">
                        {bathrooms}
                      </span>
                    </div>
                    <button
                      onClick={() => setBathrooms(bathrooms + 1)}
                      className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-emerald-500 hover:text-white text-gray-700 font-bold transition-all duration-200 flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Kitchen */}
                <div className="flex items-center justify-between p-4 bg-white rounded-xl border-2 border-gray-100 hover:border-emerald-200 transition-colors">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">🍳</span>
                    <span className="text-lg font-bold text-gray-800">
                      Kitchen
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setKitchen(Math.max(1, kitchen - 1))}
                      className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-emerald-500 hover:text-white text-gray-700 font-bold transition-all duration-200 flex items-center justify-center"
                    >
                      -
                    </button>
                    <div className="w-12 h-9 flex items-center justify-center bg-emerald-50 rounded-lg">
                      <span className="text-lg font-bold text-emerald-700">
                        {kitchen}
                      </span>
                    </div>
                    <button
                      onClick={() => setKitchen(kitchen + 1)}
                      className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-emerald-500 hover:text-white text-gray-700 font-bold transition-all duration-200 flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Living & Dining */}
                <div className="flex items-center justify-between p-4 bg-white rounded-xl border-2 border-gray-100 hover:border-emerald-200 transition-colors">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">🛋️</span>
                    <span className="text-lg font-bold text-gray-800">
                      Living & Dining
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() =>
                        setLivingDining(Math.max(1, livingDining - 1))
                      }
                      className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-emerald-500 hover:text-white text-gray-700 font-bold transition-all duration-200 flex items-center justify-center"
                    >
                      -
                    </button>
                    <div className="w-12 h-9 flex items-center justify-center bg-emerald-50 rounded-lg">
                      <span className="text-lg font-bold text-emerald-700">
                        {livingDining}
                      </span>
                    </div>
                    <button
                      onClick={() => setLivingDining(livingDining + 1)}
                      className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-emerald-500 hover:text-white text-gray-700 font-bold transition-all duration-200 flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Laundry */}
                <div className="flex items-center justify-between p-4 bg-white rounded-xl border-2 border-gray-100 hover:border-emerald-200 transition-colors">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">🧺</span>
                    <span className="text-lg font-bold text-gray-800">
                      Laundry
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setLaundry(Math.max(0, laundry - 1))}
                      className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-emerald-500 hover:text-white text-gray-700 font-bold transition-all duration-200 flex items-center justify-center"
                    >
                      -
                    </button>
                    <div className="w-12 h-9 flex items-center justify-center bg-emerald-50 rounded-lg">
                      <span className="text-lg font-bold text-emerald-700">
                        {laundry}
                      </span>
                    </div>
                    <button
                      onClick={() => setLaundry(laundry + 1)}
                      className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-emerald-500 hover:text-white text-gray-700 font-bold transition-all duration-200 flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Storey */}
                <div className="flex items-center justify-between p-4 bg-white rounded-xl border-2 border-gray-100 hover:border-emerald-200 transition-colors">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">🏢</span>
                    <span className="text-lg font-bold text-gray-800">
                      Storeys
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setStorey(Math.max(1, storey - 1))}
                      className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-emerald-500 hover:text-white text-gray-700 font-bold transition-all duration-200 flex items-center justify-center"
                    >
                      -
                    </button>
                    <div className="w-12 h-9 flex items-center justify-center bg-emerald-50 rounded-lg">
                      <span className="text-lg font-bold text-emerald-700">
                        {storey}
                      </span>
                    </div>
                    <button
                      onClick={() => setStorey(storey + 1)}
                      className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-emerald-500 hover:text-white text-gray-700 font-bold transition-all duration-200 flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Add-ons Section */}
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

                    <div className="text-4xl mb-3">{addOn.icon}</div>
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
                      className={`text-lg font-bold ${
                        selectedAddOns[addOn.id]
                          ? "text-emerald-600"
                          : "text-gray-700"
                      }`}
                    >
                      ${addOn.price}
                    </div>
                  </button>
                ))}
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
                          return (
                            <div
                              key={key}
                              className="flex justify-between items-center text-xs pl-2"
                            >
                              <span className="text-emerald-50">
                                • {addOn.name}
                              </span>
                              <span className="font-semibold text-emerald-50">
                                ${addOn.price}
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
                <div className="flex justify-between items-center">
                  <span className="text-emerald-100">Subtotal</span>
                  <span className="font-semibold">
                    ${priceDetails.subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-3">
                  <span className="text-emerald-100">GST (10%)</span>
                  <span className="font-semibold">
                    ${priceDetails.gst.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button className="w-full bg-white text-emerald-600 py-3 rounded-xl font-bold hover:bg-emerald-50 transition-colors duration-200 shadow-lg">
                  Book Now
                </button>
                <button className="w-full bg-white/10 backdrop-blur-sm text-white py-2.5 text-sm rounded-xl font-semibold hover:bg-white/20 transition-colors duration-200 border border-white/30">
                  Contact Us
                </button>
              </div>

              {/* Info Note */}
              <div className="mt-4 text-xs text-emerald-100 bg-white/10 rounded-lg p-3">
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
