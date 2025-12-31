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
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 800px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #059669, #047857); color: white; padding: 30px; border-radius: 10px; margin-bottom: 30px; }
            .header h1 { margin: 0; font-size: 28px; }
            .section { background: #f9fafb; padding: 20px; margin-bottom: 20px; border-radius: 8px; border-left: 4px solid #059669; }
            .section-title { font-size: 20px; color: #059669; margin-top: 0; margin-bottom: 15px; font-weight: bold; }
            .info-row { margin-bottom: 12px; }
            .label { font-weight: bold; color: #374151; display: inline-block; min-width: 180px; }
            .value { color: #1f2937; }
            .price-section { background: #ecfdf5; padding: 20px; border-radius: 8px; margin-top: 20px; }
            .price-row { display: flex; justify-content: space-between; margin-bottom: 10px; padding: 8px 0; }
            .price-total { font-size: 24px; font-weight: bold; color: #059669; border-top: 2px solid #059669; padding-top: 15px; margin-top: 15px; }
            .addon-item { margin-left: 20px; margin-bottom: 8px; color: #4b5563; }
            .discount { color: #dc2626; font-weight: bold; }
            ul { margin: 10px 0; padding-left: 20px; }
            li { margin-bottom: 5px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🧹 New Booking Request</h1>
            </div>

            <!-- Booking Source -->
            <div class="section" style="background: #f0fdf4; border-left-color: #10b981;">
              <h2 class="section-title" style="color: #10b981;">📍 Booking Source</h2>
              <div class="info-row">
                <span class="label">Channel:</span>
                <span class="value" style="font-weight: bold; font-size: 18px; color: #10b981;">🌐 Website Booking Form</span>
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
            <div class="section">
              <h2 class="section-title">📋 Service Details</h2>
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
            <div class="section">
              <h2 class="section-title">👤 Customer Information</h2>
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
            <div class="section">
              <h2 class="section-title">🏠 Property Details</h2>
              <div class="info-row">
                <span class="label">Address:</span>
                <span class="value">${bookingData.address}${
      bookingData.aptNo ? `, Apt ${bookingData.aptNo}` : ""
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

            ${
              bookingData.selectedAddOns &&
              Object.keys(bookingData.selectedAddOns).length > 0
                ? `
            <!-- Add-ons -->
            <div class="section">
              <h2 class="section-title">✨ Selected Add-ons</h2>
              <ul>
                ${Object.entries(bookingData.selectedAddOns)
                  .map(([key, value]) => {
                    if (value && bookingData.addOnDetails[key]) {
                      const addon = bookingData.addOnDetails[key];
                      return `<li>${addon.name}${
                        addon.quantity > 1 ? ` (x${addon.quantity})` : ""
                      } - $${addon.totalPrice}</li>`;
                    }
                    return "";
                  })
                  .join("")}
              </ul>
            </div>
            `
                : ""
            }

            <!-- Additional Information -->
            <div class="section">
              <h2 class="section-title">ℹ️ Additional Information</h2>
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

            <!-- Pricing -->
            <div class="price-section">
              <h2 class="section-title" style="color: #047857;">💰 Pricing Details</h2>
              ${
                bookingData.priceDetails.addOns > 0
                  ? `
              <div class="price-row">
                <span class="label">Room Surcharges:</span>
                <span class="value">$${bookingData.priceDetails.addOns.toFixed(
                  2
                )}</span>
              </div>
              `
                  : ""
              }
              ${
                bookingData.priceDetails.addOnsExtra > 0
                  ? `
              <div class="price-row">
                <span class="label">Add-ons Total:</span>
                <span class="value">$${bookingData.priceDetails.addOnsExtra.toFixed(
                  2
                )}</span>
              </div>
              `
                  : ""
              }
              ${
                bookingData.priceDetails.discount > 0
                  ? `
              <div class="price-row discount">
                <span class="label">Discount (from 2nd clean):</span>
                <span class="value">-$${bookingData.priceDetails.discount.toFixed(
                  2
                )}</span>
              </div>
              `
                  : ""
              }
              <div class="price-row">
                <span class="label">Subtotal:</span>
                <span class="value">$${bookingData.priceDetails.subtotal.toFixed(
                  2
                )}</span>
              </div>
              <div class="price-row">
                <span class="label">GST (10%):</span>
                <span class="value">$${bookingData.priceDetails.gst.toFixed(
                  2
                )}</span>
              </div>
              <div class="price-row price-total">
                <span>${
                  bookingData.priceDetails.discount > 0
                    ? "First Cleaning Total:"
                    : "Total:"
                }</span>
                <span>$${(
                  bookingData.priceDetails.total +
                  (bookingData.priceDetails.discount || 0)
                ).toFixed(2)}</span>
              </div>
              ${
                bookingData.priceDetails.discount > 0
                  ? `
              <div class="price-row" style="color: #059669; font-size: 18px; font-weight: bold;">
                <span>Recurring Clean Total:</span>
                <span>$${bookingData.priceDetails.total.toFixed(2)}</span>
              </div>
              `
                  : ""
              }
              <div class="price-row">
                <span class="label">Base Price:</span>
                <span class="value">$${bookingData.priceDetails.base.toFixed(
                  2
                )}</span>
              </div>
            </div>

            <div style="margin-top: 30px; padding: 20px; background: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;">
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
    const data = await resend.emails.send({
      from: "Sustainable Shine Bookings <onboarding@resend.dev>",
      to: ["info@sustainableshine.com.au"],
      replyTo: bookingData.email, // Allow direct reply to customer
      subject: `New Booking Request: ${
        serviceTypeLabels[bookingData.serviceType]
      } - ${bookingData.firstName} ${bookingData.lastName}`,
      html: htmlContent,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
