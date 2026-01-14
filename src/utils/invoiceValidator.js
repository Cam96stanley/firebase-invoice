import { PAYMENT_TERMS, STATUS } from "../models/invoice.model";

export const validateInvoice = (invoice) => {
  const errors = [];

  // Top Level Fields
  if (!invoice.invoiceDate) errors.push("Invoice description is required");
  if (
    !invoice.paymentTerms ||
    !Object.values(PAYMENT_TERMS).includes(invoice.paymentTerms)
  ) {
    errors.push("Invalid payment terms.");
  }
  if (!invoice.status || !Object.values(STATUS).includes(invoice.status)) {
    errors.push("Invalid invoice status.");
  }

  // Bill From
  const billFrom = invoice.billFrom;
  if (
    !billFrom.name ||
    !billFrom.streetAddress ||
    !billFrom.city ||
    !billFrom.postCode ||
    !billFrom.country
  ) {
    errors.push("All 'Bill From' fields are required.");
  }

  // Bill To
  const billTo = invoice.billTo;
  if (
    !billTo.name ||
    !billTo.email ||
    !billTo.streetAddress ||
    !billTo.city ||
    !billTo.postCode ||
    !billTo.country
  ) {
    errors.push("All 'Bill To' fields are required.");
  }

  // Invoice Items
  if (!invoice.items || !invoice.items.length) {
    errors.push("Invoice must have at least one item.");
  } else {
    invoice.items.forEach((item, i) => {
      if (!item.name) errors.push(`Item ${i + 1}: name is required.`);
      if (typeof item.quantity !== "number" || item.quantity <= 0) {
        errors.push(`Item ${i + 1}: quantity must be greater than 0.`);
      }
      if (typeof item.price !== "number" || item.price < 0) {
        errors.push(`Item ${i + 1}: price must be 0 or greater`);
      }
    });
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};
