import { Resend } from "resend";
import { NextResponse } from "next/server";
import { sendCustomerConfirmationEmail } from "@/components/email/customer-confirmation-email";
import { sendBusinessNotificationEmail } from "@/components/email/business-notification-email";
import { getPostHogClient } from "@/lib/posthog-server";

const resend = new Resend("re_BQqTwxtN_J62Yv9DuT9Qy5R2azym6TmKZ");

export async function POST(request) {
  try {
    const bookingData = await request.json();

    // Trim and validate email
    bookingData.email = bookingData.email?.trim();
    bookingData.firstName = bookingData.firstName?.trim();
    bookingData.lastName = bookingData.lastName?.trim();

    console.log("📧 Customer Email Address:", bookingData.email);
    console.log(
      "👤 Customer Name:",
      bookingData.firstName,
      bookingData.lastName,
    );

    // Send business notification email
    const businessEmailResult = await sendBusinessNotificationEmail(
      resend,
      bookingData,
    );
    console.log("✅ Business Email Result:", businessEmailResult);

    // Send customer confirmation email with PDF
    const customerEmailResult = await sendCustomerConfirmationEmail(
      resend,
      bookingData,
    );
    console.log("✅ Customer Email Result:", customerEmailResult);

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
        selected_time: bookingData.selectedTime || null,

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
        JSON.stringify(djangoPayload, null, 2),
      );

      const djangoResponse = await fetch(
        "https://api.sustainableshine.com.au/api/bookings/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(djangoPayload),
        },
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
          JSON.stringify(djangoError, null, 2),
        );
      } else {
        djangoSaved = true;
        const djangoData = JSON.parse(responseText);
        console.log("✅ Booking saved to Django successfully:", djangoData);
      }
    } catch (error) {
      // Log the error but don't fail the entire request
      // Emails were already sent successfully
      djangoError = {
        message: error.message,
        stack: error.stack,
      };
      console.error(
        "❌ Error saving to Django backend:",
        JSON.stringify(djangoError, null, 2),
      );
    }

    const posthog = getPostHogClient();
    const distinctId = bookingData.email || "anonymous";
    posthog.capture({
      distinctId,
      event: "booking_api_completed",
      properties: {
        service_type: bookingData.serviceType,
        suburb: bookingData.suburb,
        bedrooms: bookingData.bedrooms,
        bathrooms: bookingData.bathrooms,
        frequency: bookingData.frequency || "once",
        total_price: bookingData.priceDetails?.total || 0,
        django_saved: djangoSaved,
        hear_about_us: bookingData.hearAboutUs || "",
      },
    });
    posthog.identify({
      distinctId,
      properties: {
        email: bookingData.email,
        name: `${bookingData.firstName} ${bookingData.lastName}`.trim(),
        phone: bookingData.phone,
      },
    });
    await posthog.shutdown();

    return NextResponse.json({
      success: true,
      businessEmail: businessEmailResult,
      customerEmail: customerEmailResult,
      django_saved: djangoSaved,
      django_error: djangoError,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    try {
      const posthog = getPostHogClient();
      posthog.capture({
        distinctId: "server",
        event: "booking_api_failed",
        properties: { error: error.message },
      });
      await posthog.shutdown();
    } catch (_) {}
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
