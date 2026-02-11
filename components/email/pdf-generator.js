import { jsPDF } from "jspdf";

// Main PDF Generation Function
export function generatePDFQuotation(bookingData) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

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

      // Colors
      const darkBlue = [44, 90, 125]; // #2c5a7d
      const black = [0, 0, 0];
      const white = [255, 255, 255];

      let yPos = 20;

      // Header Section - Company name and INVOICE
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.text("Sustainable shine cleaning service", 15, yPos);

      // INVOICE heading on the right
      doc.setFontSize(42);
      doc.setTextColor(...darkBlue);
      doc.text("INVOICE", pageWidth - 15, yPos, { align: "right" });

      yPos += 8;

      // Company details
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...black);
      doc.text("12-14 Northumberland road", 15, yPos);
      yPos += 5;
      doc.text("sydney. NSW, 2144", 15, yPos);
      yPos += 5;
      doc.setFont("helvetica", "bold");
      doc.text("Phone: 0452422059", 15, yPos);

      yPos += 15;

      // Bill To Section
      // Dark blue header box
      doc.setFillColor(...darkBlue);
      doc.rect(15, yPos, 90, 10, "F");
      doc.setTextColor(...white);
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.text("BILL TO", 20, yPos + 7);

      // Invoice Number and Date Box
      const invoiceBoxX = pageWidth - 70;
      doc.setFillColor(...darkBlue);
      doc.rect(invoiceBoxX, yPos, 55, 10, "F");
      doc.setTextColor(...white);
      doc.text("INVOICE #", invoiceBoxX + 5, yPos + 7);
      doc.text("DATE", invoiceBoxX + 30, yPos + 7);

      yPos += 12;

      // Customer details
      doc.setTextColor(...black);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");

      const address = `${bookingData.unitNumber ? `${bookingData.unitNumber}/ ` : ""}${
        bookingData.street
      }`;
      doc.text(address, 20, yPos);

      // Invoice number and date
      const invoiceNumber = Math.floor(100 + Math.random() * 900);
      const currentDate = new Date().toLocaleDateString("en-AU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      doc.text(invoiceNumber.toString(), invoiceBoxX + 5, yPos);
      doc.text(currentDate, invoiceBoxX + 30, yPos);

      yPos += 5;
      doc.text(`${bookingData.suburb}, ${bookingData.postcode}`, 20, yPos);
      yPos += 5;
      doc.text(bookingData.phone, 20, yPos);
      yPos += 5;
      doc.setTextColor(0, 102, 204);
      doc.text(bookingData.email, 20, yPos);
      doc.setTextColor(...black);

      yPos += 15;

      // Description Table
      // Table header
      doc.setFillColor(...darkBlue);
      doc.rect(15, yPos, pageWidth - 30, 10, "F");

      doc.setTextColor(...white);
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.text("DESCRIPTION", 20, yPos + 7);
      doc.text("UNIT PRICE", pageWidth - 70, yPos + 7);
      doc.text("OFFER PRICE", pageWidth - 35, yPos + 7);

      yPos += 12;

      // Build description
      let description = "";
      if (bookingData.bedrooms > 0) {
        description += `${bookingData.bedrooms} bed `;
      }
      if (bookingData.bathrooms > 0) {
        description += `,${bookingData.bathrooms} bath`;
      }
      if (bookingData.laundry > 0) {
        description += `, ${bookingData.laundry} Laundry`;
      }

      // Add-ons
      const addOnDescriptions = [];
      if (bookingData.selectedAddOns && Object.keys(bookingData.selectedAddOns).length > 0) {
        Object.entries(bookingData.selectedAddOns).forEach(([key, value]) => {
          if (value && bookingData.addOnDetails[key]) {
            const addon = bookingData.addOnDetails[key];
            addOnDescriptions.push(
              `${addon.name.toLowerCase()}${addon.quantity > 1 ? `(${addon.quantity})` : ""}`
            );
          }
        });
      }

      if (addOnDescriptions.length > 0) {
        description += `, including ${addOnDescriptions.join(", ")}`;
      }

      // Calculate prices
      const subtotalBeforeDiscount =
        bookingData.priceDetails.discount > 0
          ? ((bookingData.priceDetails.subtotal + bookingData.priceDetails.discount) / 1.1) * 1.1
          : bookingData.priceDetails.subtotal;

      const unitPrice = subtotalBeforeDiscount;
      const offerPrice = bookingData.priceDetails.total;

      // Description text (wrap if needed)
      doc.setTextColor(...black);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      const splitDescription = doc.splitTextToSize(description, 110);
      doc.text(splitDescription, 20, yPos);

      // Prices
      doc.text(unitPrice.toFixed(2), pageWidth - 70, yPos, { align: "left" });
      doc.text(offerPrice.toFixed(2), pageWidth - 35, yPos, { align: "left" });

      yPos += Math.max(splitDescription.length * 5, 10);

      // Empty rows with lines
      doc.setDrawColor(208, 208, 208);
      doc.setLineWidth(0.1);

      for (let i = 0; i < 13; i++) {
        doc.line(15, yPos, pageWidth - 15, yPos);
        if (i > 0) {
          doc.text("-", pageWidth - 35, yPos - 2);
        }
        yPos += 6;
      }

      // Vertical lines
      doc.line(15, yPos - 78, 15, yPos); // Left border
      doc.line(pageWidth - 75, yPos - 78, pageWidth - 75, yPos); // Before unit price
      doc.line(pageWidth - 40, yPos - 78, pageWidth - 40, yPos); // Before offer price
      doc.line(pageWidth - 15, yPos - 78, pageWidth - 15, yPos); // Right border

      // Bottom border
      doc.setDrawColor(...black);
      doc.setLineWidth(0.5);
      doc.line(15, yPos, pageWidth - 15, yPos);

      yPos += 7;

      // Thank you message
      doc.setTextColor(...darkBlue);
      doc.setFontSize(11);
      doc.setFont("helvetica", "italic");
      doc.text("Thank you for your business!", 20, yPos);

      // Totals
      doc.setTextColor(...black);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text("SUBTOTAL", pageWidth - 70, yPos);
      doc.text(unitPrice.toFixed(2), pageWidth - 35, yPos);

      yPos += 7;
      doc.text("OFFER PRICE", pageWidth - 70, yPos);
      doc.text(offerPrice.toFixed(3), pageWidth - 35, yPos);

      yPos += 15;

      // Footer
      doc.text("NISHAN SHAHI", 20, yPos);
      yPos += 7;
      doc.text("BSB: 063-109", 20, yPos);
      yPos += 7;
      doc.text("ACCOUNT : 1329 9784", 20, yPos);

      // Convert to buffer
      const pdfBuffer = Buffer.from(doc.output("arraybuffer"));
      resolve(pdfBuffer);
    } catch (error) {
      console.error("Error generating PDF:", error);
      reject(error);
    }
  });
}
