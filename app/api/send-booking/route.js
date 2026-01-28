import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend("re_BQqTwxtN_J62Yv9DuT9Qy5R2azym6TmKZ");

export async function POST(request) {
  try {
    const bookingData = await request.json();

    // Format service type for display
    const serviceTypeLabels = {
      general: "General Cleaning",
      deep: "Deep Cleaning",
      endOfLease: "End of Lease",
      moveIn: "Move-in Cleaning",
    };

    const frequencyLabels = {
      once: "Just Once",
      weekly: "Weekly",
      fortnightly: "Fortnightly",
      monthly: "Monthly",
    };

    // Create HTML email content
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f9fafb; margin: 0; padding: 0; }
            .container { max-width: 650px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #059669, #047857); color: white; padding: 30px; border-radius: 16px; margin-bottom: 24px; text-align: center; }
            .header h1 { margin: 0; font-size: 32px; font-weight: bold; }
            .card { background: linear-gradient(to bottom right, #059669, #047857); border-radius: 16px; padding: 24px; margin-bottom: 20px; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); color: white; }
            .card-title { font-size: 24px; font-weight: bold; text-align: center; margin-bottom: 16px; color: white; }
            .divider { border-top: 1px solid rgba(255, 255, 255, 0.2); padding-top: 16px; margin-bottom: 16px; }
            .section-label { font-size: 14px; font-weight: 600; margin-bottom: 12px; color: #a7f3d0; }
            .property-item { display: flex; align-items: center; margin-bottom: 8px; font-size: 14px; }
            .checkmark { display: inline-block; width: 16px; height: 16px; margin-right: 8px; color: #6ee7b7; }
            .property-text { color: #ecfdf5; }
            .price-section { border-top: 1px solid rgba(255, 255, 255, 0.2); padding-top: 16px; margin-bottom: 16px; }
            .price-row { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 14px; }
            .price-label { color: #a7f3d0; }
            .price-value { font-weight: 600; }
            .addon-section { padding-bottom: 12px; margin-bottom: 8px; border-bottom: 1px solid rgba(255, 255, 255, 0.1); }
            .addon-title { color: #a7f3d0; font-weight: 600; margin-bottom: 8px; font-size: 14px; }
            .addon-item { display: flex; justify-content: space-between; margin-bottom: 6px; padding-left: 8px; font-size: 12px; }
            .addon-name { color: #ecfdf5; }
            .addon-price { font-weight: 600; color: #ecfdf5; }
            .total-section { border-top: 2px solid rgba(255, 255, 255, 0.3); padding-top: 16px; margin-bottom: 24px; }
            .total-row { display: flex; justify-content: space-between; align-items: center; }
            .total-label { font-size: 20px; font-weight: bold; color: white; }
            .total-value { font-size: 32px; font-weight: bold; color: white; }
            .recurring-section { margin-top: 12px; padding-top: 12px; border-top: 1px solid rgba(255, 255, 255, 0.2); }
            .recurring-label { font-size: 16px; font-weight: 600; color: #6ee7b7; }
            .recurring-value { font-size: 24px; font-weight: bold; color: #6ee7b7; }
            .info-note { font-size: 12px; color: #a7f3d0; background: rgba(255, 255, 255, 0.1); border-radius: 8px; padding: 12px; display: flex; align-items: flex-start; }
            .info-icon { margin-right: 8px; flex-shrink: 0; }
            .details-card { background: white; border-radius: 12px; padding: 20px; margin-bottom: 16px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); }
            .details-title { font-size: 18px; color: #059669; margin-top: 0; margin-bottom: 15px; font-weight: bold; }
            .info-row { margin-bottom: 12px; }
            .label { font-weight: bold; color: #374151; display: inline-block; min-width: 180px; }
            .value { color: #1f2937; }
            .discount-text { color: #6ee7b7; font-weight: 600; }
            ul { margin: 10px 0; padding-left: 20px; }
            li { margin-bottom: 5px; color: #374151; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🧹 New Booking Request</h1>
            </div>

            <!-- Price Calculator Card -->
            <div class="card">
              <div class="card-title">Your Quote</div>
              
              <div class="divider">
                <div class="section-label">${
                  serviceTypeLabels[bookingData.serviceType]
                }</div>
                
                <!-- Property Summary -->
                <div style="margin-bottom: 16px;">
                  ${
                    bookingData.bedrooms > 0
                      ? `
                  <div class="property-item">
                    <span class="checkmark">✓</span>
                    <span class="property-text">${bookingData.bedrooms} Bedroom${
                          bookingData.bedrooms > 1 ? "s" : ""
                        }</span>
                  </div>
                  `
                      : ""
                  }
                  ${
                    bookingData.bathrooms > 0
                      ? `
                  <div class="property-item">
                    <span class="checkmark">✓</span>
                    <span class="property-text">${bookingData.bathrooms} Bathroom${
                          bookingData.bathrooms > 1 ? "s" : ""
                        }</span>
                  </div>
                  `
                      : ""
                  }
                  ${
                    bookingData.storey > 0
                      ? `
                  <div class="property-item">
                    <span class="checkmark">✓</span>
                    <span class="property-text">${bookingData.storey} Storey${
                          bookingData.storey > 1 ? "s" : ""
                        }</span>
                  </div>
                  `
                      : ""
                  }
                  ${
                    bookingData.laundry > 0
                      ? `
                  <div class="property-item">
                    <span class="checkmark">✓</span>
                    <span class="property-text">${bookingData.laundry} Laundry</span>
                  </div>
                  `
                      : ""
                  }
                </div>
              </div>

              <!-- Price Breakdown -->
              <div class="price-section">
                ${
                  bookingData.selectedAddOns &&
                  Object.keys(bookingData.selectedAddOns).length > 0
                    ? `
                <div class="addon-section">
                  <div class="addon-title">Selected Add-ons:</div>
                  ${Object.entries(bookingData.selectedAddOns)
                    .map(([key, value]) => {
                      if (value && bookingData.addOnDetails[key]) {
                        const addon = bookingData.addOnDetails[key];
                        return `
                    <div class="addon-item">
                      <span class="addon-name">• ${addon.name}${
                          addon.quantity > 1 ? ` (x${addon.quantity})` : ""
                        }</span>
                      <span class="addon-price">$${addon.totalPrice}</span>
                    </div>`;
                      }
                      return "";
                    })
                    .join("")}
                  <div class="price-row" style="padding-top: 8px; border-top: 1px solid rgba(255, 255, 255, 0.1); margin-top: 8px;">
                    <span class="price-label" style="font-weight: 600;">Add-ons Total</span>
                    <span class="price-value">$${bookingData.priceDetails.addOnsExtra.toFixed(
                      2
                    )}</span>
                  </div>
                </div>
                `
                    : ""
                }
                ${
                  bookingData.priceDetails.discount > 0
                    ? `
                <div class="price-row">
                  <span class="price-label">Subtotal (before discount)</span>
                  <span class="price-value">$${(
                    ((bookingData.priceDetails.subtotal +
                      bookingData.priceDetails.discount) /
                      1.1) *
                    1.1
                  ).toFixed(2)}</span>
                </div>
                <div class="price-row discount-text">
                  <span style="font-weight: 600;">Discount (${
                    frequencyLabels[bookingData.frequency]
                  })</span>
                  <span style="font-weight: 600;">-$${bookingData.priceDetails.discount.toFixed(
                    2
                  )}</span>
                </div>
                `
                    : ""
                }
                <div class="price-row">
                  <span class="price-label">Subtotal</span>
                  <span class="price-value">$${bookingData.priceDetails.subtotal.toFixed(
                    2
                  )}</span>
                </div>
                <div class="price-row">
                  <span class="price-label">GST (10%)</span>
                  <span class="price-value">$${bookingData.priceDetails.gst.toFixed(
                    2
                  )}</span>
                </div>
              </div>

              <!-- Total Price -->
              <div class="total-section">
                <div class="total-row">
                  <span class="total-label">${
                    bookingData.priceDetails.discount > 0
                      ? "First Cleaning Total"
                      : "Total"
                  }</span>
                  <span class="total-value">$${(
                    bookingData.priceDetails.total +
                    (bookingData.priceDetails.discount || 0)
                  ).toFixed(2)}</span>
                </div>
                ${
                  bookingData.priceDetails.discount > 0
                    ? `
                <div class="recurring-section">
                  <div class="total-row">
                    <span class="recurring-label">Recurring Clean Total</span>
                    <span class="recurring-value">$${bookingData.priceDetails.total.toFixed(
                      2
                    )}</span>
                  </div>
                </div>
                `
                    : ""
                }
              </div>

              <!-- Info Note -->
              <div class="info-note">
                <span class="info-icon">ℹ️</span>
                <span>Final price may vary based on property condition.</span>
              </div>
            </div>

            <!-- Booking Source -->
            <div class="details-card">
              <h2 class="details-title">📍 Booking Source</h2>
              <div class="info-row">
                <span class="label">Channel:</span>
                <span class="value" style="font-weight: bold; font-size: 16px; color: #059669;">🌐 Website Booking Form</span>
              </div>
              <div class="info-row">
                <span class="label">Booking URL:</span>
                <span class="value">
                  <a href="https://sustainableshine.com.au/booking" style="color: #059669; text-decoration: none;">
                    https://sustainableshine.com.au/booking
                  </a>
                </span>
              </div>
              <div class="info-row">
                <span class="label">Submitted:</span>
                <span class="value">${new Date().toLocaleString("en-AU", {
                  timeZone: "Australia/Sydney",
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}</span>
              </div>
            </div>

            <!-- Service Details -->
            <div class="details-card">
              <h2 class="details-title">📋 Service Details</h2>
              <div class="info-row">
                <span class="label">Service Type:</span>
                <span class="value" style="font-weight: bold; font-size: 18px; color: #059669;">${
                  serviceTypeLabels[bookingData.serviceType]
                }</span>
              </div>
              ${
                bookingData.serviceType === "general"
                  ? `
              <div class="info-row">
                <span class="label">Frequency:</span>
                <span class="value">${
                  frequencyLabels[bookingData.frequency]
                }</span>
              </div>
              `
                  : ""
              }
              <div class="info-row">
                <span class="label">Preferred Date:</span>
                <span class="value">${
                  bookingData.selectedDate || "Not specified"
                }</span>
              </div>
            </div>

            <!-- Customer Information -->
            <div class="details-card">
              <h2 class="details-title">👤 Customer Information</h2>
              <div class="info-row">
                <span class="label">Name:</span>
                <span class="value">${bookingData.firstName} ${
      bookingData.lastName
    }</span>
              </div>
              <div class="info-row">
                <span class="label">Email:</span>
                <span class="value">${bookingData.email}</span>
              </div>
              <div class="info-row">
                <span class="label">Phone:</span>
                <span class="value">${bookingData.phone}</span>
              </div>
              <div class="info-row">
                <span class="label">SMS Reminders:</span>
                <span class="value">${
                  bookingData.smsReminders ? "Yes" : "No"
                }</span>
              </div>
            </div>

            <!-- Property Details -->
            <div class="details-card">
              <h2 class="details-title">🏠 Property Details</h2>
              <div class="info-row">
                <span class="label">Address:</span>
                <span class="value">${
                  bookingData.unitNumber
                    ? `Unit ${bookingData.unitNumber}, `
                    : ""
                }${bookingData.street}, ${bookingData.suburb} ${
      bookingData.postcode
    }</span>
              </div>
              <div class="info-row">
                <span class="label">Bedrooms:</span>
                <span class="value">${bookingData.bedrooms}</span>
              </div>
              <div class="info-row">
                <span class="label">Bathrooms:</span>
                <span class="value">${bookingData.bathrooms}</span>
              </div>
              <div class="info-row">
                <span class="label">Storeys:</span>
                <span class="value">${bookingData.storey}</span>
              </div>
              <div class="info-row">
                <span class="label">Laundries:</span>
                <span class="value">${bookingData.laundry}</span>
              </div>
            </div>


            <!-- Additional Information -->
            <div class="details-card">
              <h2 class="details-title">ℹ️ Additional Information</h2>
              ${
                bookingData.hasPet
                  ? `
              <div class="info-row">
                <span class="label">Has Pet:</span>
                <span class="value">${
                  bookingData.hasPet === "yes" ? "Yes" : "No"
                }</span>
              </div>
              `
                  : ""
              }
              ${
                bookingData.cleanlinessLevel
                  ? `
              <div class="info-row">
                <span class="label">Cleanliness Level:</span>
                <span class="value">${bookingData.cleanlinessLevel} (1=Very Clean, 4=Heavily Soiled)</span>
              </div>
              `
                  : ""
              }
              ${
                bookingData.parking
                  ? `
              <div class="info-row">
                <span class="label">Parking:</span>
                <span class="value">${bookingData.parking}</span>
              </div>
              `
                  : ""
              }
              ${
                bookingData.access
                  ? `
              <div class="info-row">
                <span class="label">Access:</span>
                <span class="value">${bookingData.access}</span>
              </div>
              `
                  : ""
              }
              ${
                bookingData.flexibleDateTime
                  ? `
              <div class="info-row">
                <span class="label">Flexible Date/Time:</span>
                <span class="value">${
                  bookingData.flexibleDateTime === "yes" ? "Yes" : "No"
                }</span>
              </div>
              `
                  : ""
              }
              ${
                bookingData.hearAboutUs
                  ? `
              <div class="info-row">
                <span class="label">Heard About Us:</span>
                <span class="value">${bookingData.hearAboutUs}</span>
              </div>
              `
                  : ""
              }
              ${
                bookingData.specialNotes
                  ? `
              <div class="info-row" style="margin-top: 15px;">
                <span class="label">Special Notes:</span>
                <div class="value" style="margin-top: 8px; padding: 12px; background: white; border-radius: 6px; white-space: pre-wrap;">${bookingData.specialNotes}</div>
              </div>
              `
                  : ""
              }
            </div>

            <div class="details-card" style="background: #fef3c7; border-left: 4px solid #f59e0b;">
              <p style="margin: 0; color: #92400e;">
                <strong>⚠️ Note:</strong> This is an automated booking request. Please contact the customer to confirm availability and finalize the booking.
              </p>
            </div>

            <!-- Footer -->
            <div style="margin-top: 30px; padding: 20px; text-align: center; color: #6b7280; border-top: 2px solid #e5e7eb;">
              <p style="margin: 0 0 10px 0; font-size: 14px;">
                <strong>Sustainable Shine Cleaning</strong>
              </p>
              <p style="margin: 0 0 5px 0; font-size: 12px;">
                📞 <a href="tel:+61452422059" style="color: #059669; text-decoration: none;">+61 452 422 059</a>
              </p>
              <p style="margin: 0 0 5px 0; font-size: 12px;">
                ✉️ <a href="mailto:info@sustainableshine.com.au" style="color: #059669; text-decoration: none;">info@sustainableshine.com.au</a>
              </p>
              <p style="margin: 0 0 5px 0; font-size: 12px;">
                🌐 <a href="https://sustainableshine.com.au" style="color: #059669; text-decoration: none;">sustainableshine.com.au</a>
              </p>
              <p style="margin: 15px 0 0 0; font-size: 11px; color: #9ca3af;">
                © ${new Date().getFullYear()} Sustainable Shine Cleaning. All rights reserved.
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email using Resend
    const emailData = await resend.emails.send({
      from: "Sustainable Shine Bookings <onboarding@resend.dev>",
      to: ["info@sustainableshine.com.au"],
      replyTo: bookingData.email, // Allow direct reply to customer
      subject: `New Booking Request: ${
        serviceTypeLabels[bookingData.serviceType]
      } - ${bookingData.firstName} ${bookingData.lastName}`,
      html: htmlContent,
    });

    // Send booking data to Django backend API
    let djangoSaved = false;
    let djangoError = null;

    try {
      const djangoPayload = {
        // Customer Information
        first_name: bookingData.firstName,
        last_name: bookingData.lastName,
        email: bookingData.email,
        phone: bookingData.phone,
        sms_reminders: bookingData.smsReminders || false,

        // Service Details
        service_type: bookingData.serviceType,
        frequency: bookingData.frequency || "once",
        selected_date: bookingData.selectedDate || null,

        // Property Details
        unit_number: bookingData.unitNumber || "",
        street: bookingData.street,
        suburb: bookingData.suburb,
        postcode: bookingData.postcode,
        bedrooms: parseInt(bookingData.bedrooms) || 0,
        bathrooms: parseInt(bookingData.bathrooms) || 0,
        storey: parseInt(bookingData.storey) || 1,
        laundry: parseInt(bookingData.laundry) || 0,
        kitchen: parseInt(bookingData.kitchen) || 0,
        living_dining: parseInt(bookingData.livingDining) || 0,

        // Additional Information
        has_pet: bookingData.hasPet || "no",
        cleanliness_level: bookingData.cleanlinessLevel || null,
        parking: bookingData.parking || "",
        access: bookingData.access || "",
        flexible_date_time: bookingData.flexibleDateTime || "no",
        hear_about_us: bookingData.hearAboutUs || "",
        special_notes: bookingData.specialNotes || "",

        // Add-ons
        selected_add_ons: bookingData.selectedAddOns || {},
        add_on_details: bookingData.addOnDetails || {},

        // Pricing
        price_details: {
          base: bookingData.priceDetails?.base || 0,
          addons: bookingData.priceDetails?.addOns || 0,
          addons_extra: bookingData.priceDetails?.addOnsExtra || 0,
          discount: bookingData.priceDetails?.discount || 0,
          subtotal: bookingData.priceDetails?.subtotal || 0,
          gst: bookingData.priceDetails?.gst || 0,
          total: bookingData.priceDetails?.total || 0,
        },
      };

      console.log(
        "Sending to Django API:",
        JSON.stringify(djangoPayload, null, 2)
      );

      const djangoResponse = await fetch(
        "https://sustainable-shine-backend.onrender.com/api/bookings/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(djangoPayload),
        }
      );

      const responseText = await djangoResponse.text();

      if (!djangoResponse.ok) {
        djangoError = {
          status: djangoResponse.status,
          statusText: djangoResponse.statusText,
          body: responseText,
        };
        console.error(
          "❌ Django API Error:",
          JSON.stringify(djangoError, null, 2)
        );
      } else {
        djangoSaved = true;
        const djangoData = JSON.parse(responseText);
        console.log("✅ Booking saved to Django successfully:", djangoData);
      }
    } catch (error) {
      // Log the error but don't fail the entire request
      // Email was already sent successfully
      djangoError = {
        message: error.message,
        stack: error.stack,
      };
      console.error(
        "❌ Error saving to Django backend:",
        JSON.stringify(djangoError, null, 2)
      );
    }

    return NextResponse.json({
      success: true,
      data: emailData,
      django_saved: djangoSaved,
      django_error: djangoError,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
