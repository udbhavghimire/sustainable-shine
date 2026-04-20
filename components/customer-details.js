"use client";

export default function CustomerDetails({
  // Customer Details
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  phone,
  setPhone,
  smsReminders,
  setSmsReminders,
  // Address Details
  unitNumber,
  setUnitNumber,
  street,
  setStreet,
  suburb,
  setSuburb,
  postcode,
  setPostcode,
  // Pet & Referral
  hasPet,
  setHasPet,
  hearAboutUs,
  setHearAboutUs,
  specialNotes,
  setSpecialNotes,
  // Access & Other Information
  cleanlinessLevel,
  setCleanlinessLevel,
  parking,
  setParking,
  flexibleDateTime,
  setFlexibleDateTime,
  access,
  setAccess,
}) {
  return (
    <>
      {/* Customer Details */}
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

          {/* Email and Phone */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-gray-900 font-semibold mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ex: example@xyz.com"
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-900 font-semibold mb-2">
                Phone No
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone No."
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          {/* SMS Reminders */}
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

      {/* Address Details */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Address Details
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-900 font-semibold mb-2">
              Unit Number
            </label>
            <input
              type="text"
              value={unitNumber}
              onChange={(e) => setUnitNumber(e.target.value)}
              placeholder="e.g., Unit 5, Apt 2B (optional)"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-emerald-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-900 font-semibold mb-2">
              Street <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              placeholder="e.g., 123 Main Street"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-emerald-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-900 font-semibold mb-2">
              Suburb <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={suburb}
              onChange={(e) => setSuburb(e.target.value)}
              placeholder="e.g., Sydney"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-emerald-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-900 font-semibold mb-2">
              Postcode <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
              placeholder="e.g., 2000"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-emerald-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Pet, Referral & Notes */}
      <div className="bg-gray-50 rounded-2xl shadow-lg p-6 space-y-6">
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

      {/* Access & Other Information */}
      <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Access & Other Information
        </h2>

        <div>
          <label className="block text-gray-900 font-semibold mb-2">
            On A Scale Of 1-4, How Clean Would You Estimate Your Home To Be?
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
    </>
  );
}
