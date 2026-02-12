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
      const lightGray = [208, 208, 208];
      const black = [0, 0, 0];
      const white = [255, 255, 255];

      let yPos = 20;

      // ========== HEADER SECTION ==========
      // Company name - left side
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...black);
      doc.text("Sustainable shine cleaning service", 15, yPos);

      // INVOICE heading - right side
      doc.setFontSize(42);
      doc.setTextColor(...darkBlue);
      doc.text("INVOICE", pageWidth - 15, yPos, { align: "right" });

      yPos += 10;

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

      // ========== BILL TO & INVOICE DETAILS SECTION ==========
      const billToStartY = yPos;

      // Bill To - Dark blue header box
      doc.setFillColor(...darkBlue);
      doc.rect(15, yPos, 85, 10, "F");
      doc.setTextColor(...white);
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.text("BILL TO", 18, yPos + 7);

      // Invoice Number and Date - Dark blue header box (right side)
      const invoiceBoxX = pageWidth - 65;
      doc.setFillColor(...darkBlue);
      doc.rect(invoiceBoxX, yPos, 50, 10, "F");
      doc.setTextColor(...white);
      doc.text("INVOICE #", invoiceBoxX + 2, yPos + 7);
      doc.text("DATE", invoiceBoxX + 27, yPos + 7);

      yPos += 15; // Increased padding after header

      // Customer details
      doc.setTextColor(...black);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");

      const address = `${bookingData.unitNumber ? `${bookingData.unitNumber}/ ` : ""}${
        bookingData.street
      }`;
      
      // Wrap address if too long
      const addressLines = doc.splitTextToSize(address, 80);
      doc.text(addressLines, 18, yPos);
      
      const addressHeight = addressLines.length * 5;

      // Invoice number and date (right side)
      const invoiceNumber = Math.floor(100 + Math.random() * 900);
      const currentDate = new Date().toLocaleDateString("en-AU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      doc.text(invoiceNumber.toString(), invoiceBoxX + 2, yPos);
      doc.text(currentDate, invoiceBoxX + 27, yPos);

      yPos += addressHeight;
      doc.text(`${bookingData.suburb}, ${bookingData.postcode}`, 18, yPos);
      yPos += 5;
      doc.text(bookingData.phone, 18, yPos);
      yPos += 5;
      doc.setTextColor(0, 102, 204);
      doc.text(bookingData.email, 18, yPos);
      doc.setTextColor(...black);

      yPos += 15;

      // ========== DESCRIPTION TABLE ==========
      const tableStartY = yPos;
      
      // Table header - dark blue background
      doc.setFillColor(...darkBlue);
      doc.rect(15, yPos, pageWidth - 30, 10, "F");

      doc.setTextColor(...white);
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.text("DESCRIPTION", 18, yPos + 7);
      doc.text("UNIT PRICE", pageWidth - 65, yPos + 7);
      doc.text("OFFER PRICE", pageWidth - 35, yPos + 7);

      yPos += 18; // Increased padding after header

      // Build description
      let description = "";
      if (bookingData.bedrooms > 0) {
        description += `${bookingData.bedrooms} bed`;
      }
      if (bookingData.bathrooms > 0) {
        description += `${description ? " ," : ""}${bookingData.bathrooms} bath`;
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
      const splitDescription = doc.splitTextToSize(description, 115);
      doc.text(splitDescription, 18, yPos);

      // Prices
      doc.text(unitPrice.toFixed(2), pageWidth - 65, yPos);
      doc.text(offerPrice.toFixed(2), pageWidth - 35, yPos);

      yPos += Math.max(splitDescription.length * 5, 8);

      // Empty rows with horizontal lines
      doc.setDrawColor(...lightGray);
      doc.setLineWidth(0.1);

      const emptyRowsStartY = yPos;
      for (let i = 0; i < 13; i++) {
        doc.line(15, yPos, pageWidth - 15, yPos);
        if (i > 0) {
          doc.text("-", pageWidth - 35, yPos - 2);
        }
        yPos += 5;
      }

      // Vertical lines for table
      const tableEndY = yPos;
      doc.line(15, tableStartY, 15, tableEndY); // Left border
      doc.line(pageWidth - 75, tableStartY + 10, pageWidth - 75, tableEndY); // Before unit price
      doc.line(pageWidth - 45, tableStartY + 10, pageWidth - 45, tableEndY); // Before offer price
      doc.line(pageWidth - 15, tableStartY, pageWidth - 15, tableEndY); // Right border

      // Bottom border - thicker black line
      doc.setDrawColor(...black);
      doc.setLineWidth(0.5);
      doc.line(15, yPos, pageWidth - 15, yPos);

      yPos += 8;

      // ========== TOTALS SECTION ==========
      // Thank you message
      doc.setTextColor(...darkBlue);
      doc.setFontSize(11);
      doc.setFont("helvetica", "italic");
      doc.text("Thank you for your business!", 18, yPos);

      // Subtotal
      doc.setTextColor(...black);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text("SUBTOTAL", pageWidth - 65, yPos);
      doc.text(unitPrice.toFixed(2), pageWidth - 35, yPos);

      yPos += 7;

      // Offer Price
      doc.text("OFFER PRICE", pageWidth - 65, yPos);
      doc.text(offerPrice.toFixed(3), pageWidth - 35, yPos);

      yPos += 15;

      // ========== FOOTER ==========
      doc.setFont("helvetica", "normal");
      doc.text("NISHAN SHAHI", 18, yPos);
      yPos += 7;
      doc.text("BSB: 063-109", 18, yPos);
      yPos += 7;
      doc.text("ACCOUNT : 1329 9784", 18, yPos);

      // Convert to buffer
      const pdfBuffer = Buffer.from(doc.output("arraybuffer"));
      resolve(pdfBuffer);
    } catch (error) {
      console.error("Error generating PDF:", error);
      reject(error);
    }
  });
}
