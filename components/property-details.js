"use client";

export const addOnsData = [
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
];

function renderAddOnIcon(id) {
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
          <circle cx="32" cy="28" r="8" fill="currentColor" opacity="0.2" />
          <rect x="28" y="36" width="8" height="12" fill="currentColor" opacity="0.2" />
          <line x1="32" y1="48" x2="32" y2="54" />
          <path d="M22 50 L42 50" strokeWidth="3" />
          <path d="M20 22 Q20 18, 22 18" fill="none" opacity="0.5" />
          <path d="M26 20 Q26 16, 28 16" fill="none" opacity="0.5" />
          <path d="M38 20 Q38 16, 40 16" fill="none" opacity="0.5" />
          <path d="M44 22 Q44 18, 46 18" fill="none" opacity="0.5" />
        </svg>
      );

    case "insideFridge":
      return (
        <svg {...svgProps}>
          <rect x="20" y="15" width="24" height="38" rx="2" fill="currentColor" opacity="0.2" />
          <line x1="20" y1="30" x2="44" y2="30" />
          <rect x="38" y="20" width="2" height="6" rx="1" fill="currentColor" />
          <rect x="38" y="35" width="2" height="8" rx="1" fill="currentColor" />
          <line x1="32" y1="40" x2="32" y2="46" strokeWidth="1.5" />
          <line x1="29" y1="43" x2="35" y2="43" strokeWidth="1.5" />
          <line x1="30" y1="41" x2="34" y2="45" strokeWidth="1.5" />
          <line x1="30" y1="45" x2="34" y2="41" strokeWidth="1.5" />
        </svg>
      );

    case "insideDishwasher":
      return (
        <svg {...svgProps}>
          <rect x="18" y="20" width="28" height="28" rx="2" fill="currentColor" opacity="0.2" />
          <rect x="20" y="25" width="24" height="2" fill="currentColor" opacity="0.5" />
          <circle cx="26" cy="36" r="4" fill="none" strokeWidth="1.5" />
          <circle cx="32" cy="36" r="4" fill="none" strokeWidth="1.5" />
          <circle cx="38" cy="36" r="4" fill="none" strokeWidth="1.5" />
          <circle cx="28" cy="42" r="1" fill="currentColor" opacity="0.5" />
          <circle cx="32" cy="44" r="1" fill="currentColor" opacity="0.5" />
          <circle cx="36" cy="42" r="1" fill="currentColor" opacity="0.5" />
        </svg>
      );

    case "ovenSteamer":
      return (
        <svg {...svgProps}>
          <rect x="18" y="20" width="28" height="28" rx="2" fill="currentColor" opacity="0.2" />
          <rect x="22" y="28" width="20" height="16" rx="1" fill="none" />
          <path d="M26 34 Q28 32, 30 34 Q32 36, 34 34 Q36 32, 38 34" fill="none" strokeWidth="1.5" />
          <path d="M26 38 Q28 36, 30 38 Q32 40, 34 38 Q36 36, 38 38" fill="none" strokeWidth="1.5" />
          <circle cx="24" cy="24" r="1.5" fill="currentColor" />
          <circle cx="32" cy="24" r="1.5" fill="currentColor" />
          <circle cx="40" cy="24" r="1.5" fill="currentColor" />
        </svg>
      );

    case "blindsRoller":
    case "blindsVenetian":
      return (
        <svg {...svgProps}>
          <rect x="20" y="15" width="24" height="32" rx="1" fill="none" />
          <line x1="22" y1="20" x2="42" y2="20" strokeWidth="1.5" />
          <line x1="22" y1="24" x2="42" y2="24" strokeWidth="1.5" />
          <line x1="22" y1="28" x2="42" y2="28" strokeWidth="1.5" />
          <line x1="22" y1="32" x2="42" y2="32" strokeWidth="1.5" />
          <line x1="22" y1="36" x2="42" y2="36" strokeWidth="1.5" />
          <line x1="22" y1="40" x2="42" y2="40" strokeWidth="1.5" />
          <line x1="38" y1="44" x2="38" y2="50" strokeWidth="1" />
          <circle cx="38" cy="50" r="1.5" fill="currentColor" />
        </svg>
      );

    case "exteriorWindows":
      return (
        <svg {...svgProps}>
          <rect x="18" y="18" width="12" height="14" fill="currentColor" opacity="0.15" />
          <rect x="34" y="18" width="12" height="14" fill="currentColor" opacity="0.15" />
          <rect x="18" y="36" width="12" height="14" fill="currentColor" opacity="0.15" />
          <rect x="34" y="36" width="12" height="14" fill="currentColor" opacity="0.15" />
          <rect x="18" y="18" width="28" height="32" fill="none" strokeWidth="2" />
          <line x1="32" y1="18" x2="32" y2="50" strokeWidth="2" />
          <line x1="18" y1="34" x2="46" y2="34" strokeWidth="2" />
          <circle cx="24" cy="24" r="1.5" fill="currentColor" />
          <line x1="24" y1="22" x2="24" y2="26" strokeWidth="1" />
          <line x1="22" y1="24" x2="26" y2="24" strokeWidth="1" />
        </svg>
      );

    case "interiorWindows":
      return (
        <svg {...svgProps}>
          <rect x="20" y="20" width="10" height="12" fill="currentColor" opacity="0.1" />
          <rect x="34" y="20" width="10" height="12" fill="currentColor" opacity="0.1" />
          <rect x="20" y="36" width="10" height="12" fill="currentColor" opacity="0.1" />
          <rect x="34" y="36" width="10" height="12" fill="currentColor" opacity="0.1" />
          <rect x="20" y="20" width="24" height="28" fill="none" strokeWidth="2" />
          <line x1="32" y1="20" x2="32" y2="48" strokeWidth="2" />
          <line x1="20" y1="34" x2="44" y2="34" strokeWidth="2" />
          <rect x="26" y="28" width="6" height="4" rx="1" fill="currentColor" opacity="0.4" />
          <circle cx="24" cy="24" r="1" fill="currentColor" opacity="0.6" />
          <circle cx="38" cy="26" r="1" fill="currentColor" opacity="0.6" />
          <circle cx="28" cy="42" r="1" fill="currentColor" opacity="0.6" />
        </svg>
      );

    case "spotClean60":
      return (
        <svg {...svgProps}>
          <rect x="15" y="20" width="34" height="28" rx="2" fill="currentColor" opacity="0.1" />
          <rect x="28" y="28" width="12" height="8" rx="2" fill="currentColor" opacity="0.3" />
          <circle cx="22" cy="26" r="2" fill="currentColor" opacity="0.4" />
          <circle cx="26" cy="38" r="1.5" fill="currentColor" opacity="0.4" />
          <circle cx="38" cy="38" r="2" fill="currentColor" opacity="0.4" />
          <circle cx="42" cy="30" r="1.5" fill="currentColor" opacity="0.4" />
          <path d="M34 30 Q36 28, 38 30" fill="none" strokeWidth="1" opacity="0.5" />
        </svg>
      );

    case "garageSweep":
      return (
        <svg {...svgProps}>
          <rect x="18" y="20" width="28" height="28" rx="2" fill="currentColor" opacity="0.2" />
          <line x1="18" y1="26" x2="46" y2="26" />
          <line x1="18" y1="32" x2="46" y2="32" />
          <line x1="18" y1="38" x2="46" y2="38" />
          <line x1="18" y1="44" x2="46" y2="44" />
          <line x1="36" y1="28" x2="40" y2="42" strokeWidth="1.5" />
          <path d="M38 42 L42 42 L40 46 Z" fill="currentColor" opacity="0.3" />
        </svg>
      );

    case "smallBalcony":
    case "largeBalcony":
      return (
        <svg {...svgProps}>
          <rect x="16" y="36" width="32" height="12" fill="currentColor" opacity="0.2" />
          <line x1="20" y1="24" x2="20" y2="36" strokeWidth="1.5" />
          <line x1="28" y1="24" x2="28" y2="36" strokeWidth="1.5" />
          <line x1="36" y1="24" x2="36" y2="36" strokeWidth="1.5" />
          <line x1="44" y1="24" x2="44" y2="36" strokeWidth="1.5" />
          <line x1="18" y1="24" x2="46" y2="24" strokeWidth="2" />
          <circle cx="24" cy="42" r="3" fill="currentColor" opacity="0.3" />
          <path d="M24 39 L24 36 M22 40 L20 38 M26 40 L28 38" fill="none" strokeWidth="1" />
        </svg>
      );

    case "slidingDoor":
      return (
        <svg {...svgProps}>
          <rect x="16" y="16" width="32" height="36" rx="1" fill="none" strokeWidth="2" />
          <rect x="18" y="18" width="14" height="32" fill="currentColor" opacity="0.15" />
          <line x1="18" y1="18" x2="18" y2="50" strokeWidth="1.5" />
          <line x1="32" y1="18" x2="32" y2="50" strokeWidth="1.5" />
          <line x1="22" y1="20" x2="22" y2="48" strokeWidth="1" opacity="0.5" />
          <line x1="28" y1="20" x2="28" y2="48" strokeWidth="1" opacity="0.5" />
          <rect x="32" y="18" width="14" height="32" fill="currentColor" opacity="0.25" />
          <line x1="32" y1="18" x2="32" y2="50" strokeWidth="1.5" />
          <line x1="46" y1="18" x2="46" y2="50" strokeWidth="1.5" />
          <line x1="36" y1="20" x2="36" y2="48" strokeWidth="1" opacity="0.5" />
          <line x1="42" y1="20" x2="42" y2="48" strokeWidth="1" opacity="0.5" />
          <rect x="34" y="32" width="2" height="4" rx="1" fill="currentColor" />
          <path d="M38 12 L42 12 L40 10 M40 14 L42 12" fill="none" strokeWidth="1" />
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
}

export default function PropertyDetails({
  bedrooms,
  setBedrooms,
  bathrooms,
  setBathrooms,
  storey,
  setStorey,
  laundry,
  setLaundry,
  selectedAddOns,
  addOnQuantities,
  toggleAddOn,
  updateQuantity,
}) {
  return (
    <>
      {/* Property Details */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Property Details
        </h2>

        <div className="space-y-6">
          {/* Bedrooms */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-2xl">🛏️</span>
              <span className="text-base font-bold text-gray-900">Bedrooms</span>
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
              <span className="text-base font-bold text-gray-900">Bathrooms</span>
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
              <span className="text-base font-bold text-gray-900">Storeys</span>
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
              <span className="text-base font-bold text-gray-900">Laundries</span>
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

      {/* Customize Your Service */}
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
                  selectedAddOns[addOn.id] ? "text-emerald-700" : "text-gray-800"
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
                  selectedAddOns[addOn.id] ? "text-emerald-600" : "text-gray-700"
                }`}
              >
                ${addOn.price}
              </div>

              {addOn.hasQuantity && selectedAddOns[addOn.id] && (
                <div
                  className="flex items-center justify-center space-x-2 mt-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      updateQuantity(addOn.id, (addOnQuantities[addOn.id] || 1) - 1);
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
                      updateQuantity(addOn.id, (addOnQuantities[addOn.id] || 1) + 1);
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
    </>
  );
}
