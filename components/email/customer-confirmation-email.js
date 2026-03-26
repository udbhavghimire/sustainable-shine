import { generatePDFQuotation } from "./pdf-generator";

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

// Helper function to format time from 24-hour to 12-hour format
function formatTime(time24) {
  if (!time24) return "";
  const [hours, minutes] = time24.split(":");
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes} ${ampm}`;
}

// Generate customer confirmation email HTML content
function generateCustomerEmailHTML(bookingData) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f9fafb; margin: 0; padding: 0; }
          .container { max-width: 650px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #059669, #047857); color: white; padding: 40px 30px; border-radius: 16px; margin-bottom: 24px; text-align: center; }
          .header h1 { margin: 0 0 10px 0; font-size: 32px; font-weight: bold; }
          .header p { margin: 0; font-size: 16px; opacity: 0.95; }
          .success-icon { font-size: 48px; margin-bottom: 10px; }
          .card { background: white; border-radius: 12px; padding: 30px; margin-bottom: 20px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
          .card h2 { color: #059669; margin-top: 0; margin-bottom: 20px; font-size: 20px; }
          .info-row { margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #e5e7eb; }
          .info-row:last-child { border-bottom: none; }
          .label { font-weight: bold; color: #374151; display: block; margin-bottom: 5px; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; }
          .value { color: #1f2937; font-size: 15px; }
          .highlight-box { background: #f0fdf4; border-left: 4px solid #059669; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .price-display { font-size: 36px; font-weight: bold; color: #059669; text-align: center; margin: 15px 0; }
          .button { display: inline-block; background: #059669; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
          .footer { margin-top: 30px; padding: 25px; text-align: center; color: #6b7280; border-top: 2px solid #e5e7eb; background: white; border-radius: 12px; }
          .footer-links { margin: 15px 0; }
          .footer-links a { color: #059669; text-decoration: none; margin: 0 10px; }
          .note { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; border-radius: 8px; margin: 20px 0; }
          .note-text { margin: 0; color: #92400e; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="success-icon">✓</div>
            <h1>Booking Confirmed!</h1>
            <p>Thank you for choosing Sustainable Shine Cleaning</p>
          </div>

          <div class="card">
            <h2>Hello ${bookingData.firstName}! 👋</h2>
            <p style="margin: 0 0 20px 0; font-size: 15px; line-height: 1.6;">
              We're delighted to confirm your booking with Sustainable Shine Cleaning. Your commitment to eco-friendly cleaning helps us create a healthier environment for everyone!
            </p>
            
            <div class="highlight-box">
              <p style="margin: 0 0 10px 0; font-weight: bold; color: #059669;">📄 Your Quotation is Attached</p>
              <p style="margin: 0; font-size: 14px; color: #374151;">
                We've attached a detailed PDF quotation for your records. Please review it and keep it for your reference.
              </p>
            </div>
          </div>

          <div class="card">
            <h2>Booking Summary</h2>
            
            <div class="info-row">
              <span class="label">Service Type</span>
              <span class="value">${serviceTypeLabels[bookingData.serviceType]}</span>
            </div>

            ${
              bookingData.serviceType === "general"
                ? `
            <div class="info-row">
              <span class="label">Frequency</span>
              <span class="value">${frequencyLabels[bookingData.frequency]}</span>
            </div>
            `
                : ""
            }

            <div class="info-row">
              <span class="label">Preferred Date</span>
              <span class="value">${bookingData.selectedDate || "To be confirmed"}</span>
            </div>

            ${
              bookingData.selectedTime
                ? `
            <div class="info-row">
              <span class="label">Preferred Time</span>
              <span class="value">${formatTime(bookingData.selectedTime)}</span>
            </div>
            `
                : ""
            }

            <div class="info-row">
              <span class="label">Property Address</span>
              <span class="value">${
                bookingData.unitNumber ? `Unit ${bookingData.unitNumber}, ` : ""
              }${bookingData.street}, ${bookingData.suburb} ${bookingData.postcode}</span>
            </div>

            <div class="info-row">
              <span class="label">Total Amount</span>
              <div class="price-display">$${(
                bookingData.priceDetails.total + (bookingData.priceDetails.discount || 0)
              ).toFixed(2)}</div>
            </div>
          </div>

          <div class="note">
            <p class="note-text">
              <strong>⏰ What's Next?</strong><br>
              Our team will contact you within 24 hours to confirm your booking time and answer any questions you may have.
            </p>
          </div>

          <div class="card">
            <h2>Need to Make Changes?</h2>
            <p style="margin: 0 0 15px 0; font-size: 14px; color: #6b7280;">
              If you need to reschedule or have any questions about your booking, please don't hesitate to reach out:
            </p>
            <p style="margin: 5px 0; font-size: 14px;">
              📞 <a href="tel:+61452422059" style="color: #059669; text-decoration: none;">+61 452 422 059</a>
            </p>
            <p style="margin: 5px 0; font-size: 14px;">
              ✉️ <a href="mailto:info@sustainableshine.com.au" style="color: #059669; text-decoration: none;">info@sustainableshine.com.au</a>
            </p>
          </div>

          <div class="footer">
            <p style="margin: 0 0 10px 0; font-size: 16px; font-weight: bold; color: #059669;">
              Sustainable Shine Cleaning
            </p>
            <p style="margin: 0 0 15px 0; font-size: 13px; color: #6b7280;">
              Your Eco-Friendly Cleaning Partner
            </p>
            <div class="footer-links">
              <a href="https://sustainableshine.com.au">Website</a> |
              <a href="tel:+61452422059">Call Us</a> |
              <a href="mailto:info@sustainableshine.com.au">Email Us</a>
            </div>
            <p style="margin: 15px 0 0 0; font-size: 11px; color: #9ca3af;">
              © ${new Date().getFullYear()} Sustainable Shine Cleaning. All rights reserved.
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
}

// Send customer confirmation email with PDF attachment
export async function sendCustomerConfirmationEmail(resend, bookingData) {
  try {
    console.log("🔵 Starting customer confirmation email process...");
    console.log("🔵 Customer email:", bookingData.email);
    
    // Generate PDF quotation
    console.log("🔵 Generating PDF quotation...");
    const pdfBuffer = await generatePDFQuotation(bookingData);
    const pdfBase64 = pdfBuffer.toString("base64");
    console.log("🔵 PDF generated successfully, size:", pdfBase64.length, "bytes");

    // Generate email HTML content
    console.log("🔵 Generating email HTML...");
    const htmlContent = generateCustomerEmailHTML(bookingData);

    // Ensure email is properly formatted and trimmed
    const customerEmail = bookingData.email?.trim();
    const customerName = `${bookingData.firstName} ${bookingData.lastName}`.trim();

    // Send email with PDF attachment
    console.log("🔵 Sending email to:", customerEmail);
    const emailData = await resend.emails.send({
      from: "Sustainable Shine Bookings <info@sustainableshine.com.au>",
      to: [`${customerName} <${customerEmail}>`],
      replyTo: "info@sustainableshine.com.au",
      subject: `✓ Booking Confirmed - ${
        serviceTypeLabels[bookingData.serviceType]
      } at Sustainable Shine Cleaning`,
      html: htmlContent,
      attachments: [
        {
          filename: `Sustainable-Shine-Quotation-${bookingData.firstName}-${bookingData.lastName}.pdf`,
          content: pdfBase64,
        },
      ],
    });

    console.log("✅ Customer email sent successfully!", emailData);
    return {
      success: true,
      data: emailData,
    };
  } catch (error) {
    console.error("❌ Error sending customer confirmation email:", error);
    console.error("❌ Error details:", {
      message: error.message,
      stack: error.stack,
      email: bookingData.email,
    });
    return {
      success: false,
      error: error.message,
      details: error.stack,
    };
  }
}
