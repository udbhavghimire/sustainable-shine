import PDFDocument from "pdfkit";

// PDF Component: Draw Header with company info and INVOICE title
function drawHeader(doc) {
  const headerY = 50;
  
  // Left side - Company name and details
  doc
    .fontSize(18)
    .fillColor("#000")
    .font("Helvetica-Bold")
    .text("Sustainable shine cleaning service", 50, headerY);
  
  doc
    .fontSize(10)
    .fillColor("#000")
    .font("Helvetica")
    .text("12-14 Northumberland road", 50, headerY + 25);
  
  doc.text("sydney. NSW, 2144", 50, headerY + 38);
  doc.font("Helvetica-Bold").text("Phone: 0452422059", 50, headerY + 51);

  // Right side - INVOICE heading
  doc
    .fontSize(42)
    .fillColor("#2c5a7d")
    .font("Helvetica-Bold")
    .text("INVOICE", 400, headerY, { align: "right", width: 145 });

  return headerY + 90; // Return Y position for next section
}

// PDF Component: Draw Bill To section with customer details
function drawBillToSection(doc, bookingData, startY) {
  // Bill To Box (dark blue header)
  doc.rect(50, startY, 280, 25).fill("#2c5a7d");
  doc
    .fontSize(11)
    .fillColor("#fff")
    .font("Helvetica-Bold")
    .text("BILL TO", 60, startY + 8);

  // Customer details
  const address = `${bookingData.unitNumber ? `${bookingData.unitNumber}/ ` : ""}${
    bookingData.street
  }`;
  
  doc
    .fontSize(10)
    .fillColor("#000")
    .font("Helvetica")
    .text(address, 60, startY + 35);
  doc.text(`${bookingData.suburb}, ${bookingData.postcode}`, 60, startY + 48);
  doc.text(bookingData.phone, 60, startY + 61);
  doc.fillColor("#0066cc").text(bookingData.email, 60, startY + 74, {
    underline: true,
    link: `mailto:${bookingData.email}`,
  });

  return startY + 110; // Return Y position for next section
}

// PDF Component: Draw Invoice Number and Date boxes
function drawInvoiceDetails(doc, startY) {
  // Invoice Number and Date Box (dark blue header)
  doc.rect(350, startY, 195, 25).fill("#2c5a7d");
  
  // Invoice # header
  doc
    .fontSize(11)
    .fillColor("#fff")
    .font("Helvetica-Bold")
    .text("INVOICE #", 360, startY + 8, { width: 85 });
  
  // Date header
  doc.text("DATE", 460, startY + 8, { width: 75 });

  // Invoice number and date values
  const invoiceNumber = Math.floor(100 + Math.random() * 900); // Random 3-digit number
  const currentDate = new Date().toLocaleDateString("en-AU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  
  doc
    .fontSize(10)
    .fillColor("#000")
    .font("Helvetica")
    .text(invoiceNumber.toString(), 360, startY + 35, { width: 85 });
  doc.text(currentDate, 460, startY + 35, { width: 75 });
}

// PDF Component: Build service description from booking data
function buildServiceDescription(bookingData) {
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
  
  // Add-ons to description
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

  return description;
}

// PDF Component: Calculate unit price and offer price
function calculatePrices(bookingData) {
  const subtotalBeforeDiscount = 
    bookingData.priceDetails.discount > 0
      ? ((bookingData.priceDetails.subtotal + bookingData.priceDetails.discount) / 1.1) * 1.1
      : bookingData.priceDetails.subtotal;
  
  return {
    unitPrice: subtotalBeforeDiscount,
    offerPrice: bookingData.priceDetails.total,
  };
}

// PDF Component: Draw description table with services and prices
function drawDescriptionTable(doc, description, unitPrice, offerPrice, startY) {
  // Table header (dark blue)
  doc.rect(50, startY, 495, 25).fill("#2c5a7d");
  
  doc
    .fontSize(11)
    .fillColor("#fff")
    .font("Helvetica-Bold")
    .text("DESCRIPTION", 60, startY + 8, { width: 310 });
  doc.text("UNIT PRICE", 380, startY + 8, { width: 75, align: "center" });
  doc.text("OFFER PRICE", 465, startY + 8, { width: 75, align: "center" });

  // Description text
  doc
    .fontSize(10)
    .fillColor("#000")
    .font("Helvetica")
    .text(description, 60, startY + 38, { width: 310 });

  // Unit Price
  doc.text(unitPrice.toFixed(2), 380, startY + 38, {
    width: 75,
    align: "center",
  });

  // Offer Price
  doc.text(offerPrice.toFixed(2), 465, startY + 38, {
    width: 75,
    align: "center",
  });

  // Add empty rows (lines)
  let lineY = startY + 60;
  for (let i = 0; i < 13; i++) {
    doc
      .moveTo(50, lineY)
      .lineTo(545, lineY)
      .strokeColor("#d0d0d0")
      .lineWidth(0.5)
      .stroke();
    
    // Add "-" in offer price column for empty rows
    if (i > 0) {
      doc.fontSize(10).fillColor("#000").text("-", 465, lineY - 10, {
        width: 75,
        align: "center",
      });
    }
    
    lineY += 20;
  }

  // Vertical lines for table
  doc
    .moveTo(50, startY)
    .lineTo(50, lineY)
    .strokeColor("#d0d0d0")
    .lineWidth(0.5)
    .stroke();
  
  doc
    .moveTo(370, startY + 25)
    .lineTo(370, lineY)
    .stroke();
  
  doc
    .moveTo(455, startY + 25)
    .lineTo(455, lineY)
    .stroke();
  
  doc
    .moveTo(545, startY)
    .lineTo(545, lineY)
    .stroke();

  // Bottom section border
  doc
    .moveTo(50, lineY)
    .lineTo(545, lineY)
    .strokeColor("#000")
    .lineWidth(1)
    .stroke();

  return lineY; // Return Y position for next section
}

// PDF Component: Draw totals section with subtotal and offer price
function drawTotalsSection(doc, unitPrice, offerPrice, startY) {
  const bottomY = startY + 15;
  
  // Thank you message
  doc
    .fontSize(11)
    .fillColor("#2c5a7d")
    .font("Helvetica-Oblique")
    .text("Thank you for your business!", 60, bottomY);

  // Subtotal
  doc
    .fontSize(10)
    .fillColor("#000")
    .font("Helvetica")
    .text("SUBTOTAL", 380, bottomY, { width: 75, align: "left" });
  doc.text(unitPrice.toFixed(2), 465, bottomY, {
    width: 75,
    align: "center",
  });

  // Offer Price
  doc.text("OFFER PRICE", 380, bottomY + 20, { width: 75, align: "left" });
  doc.text(offerPrice.toFixed(3), 465, bottomY + 20, {
    width: 75,
    align: "center",
  });

  return bottomY + 60; // Return Y position for footer
}

// PDF Component: Draw footer with bank details
function drawFooter(doc, startY) {
  doc
    .fontSize(10)
    .fillColor("#000")
    .font("Helvetica")
    .text("NISHAN SHAHI", 60, startY);

  doc.text("BSB: 063-109", 60, startY + 25);
  doc.text("ACCOUNT : 1329 9784", 60, startY + 40);
}

// Main PDF Generation Function
export function generatePDFQuotation(bookingData) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50, size: "A4" });
      const chunks = [];

      doc.on("data", (chunk) => chunks.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", reject);

      // Draw all components in sequence
      const billToY = drawHeader(doc);
      const tableY = drawBillToSection(doc, bookingData, billToY);
      drawInvoiceDetails(doc, billToY);
      
      const description = buildServiceDescription(bookingData);
      const { unitPrice, offerPrice } = calculatePrices(bookingData);
      
      const totalsY = drawDescriptionTable(doc, description, unitPrice, offerPrice, tableY);
      const footerY = drawTotalsSection(doc, unitPrice, offerPrice, totalsY);
      drawFooter(doc, footerY);

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}
