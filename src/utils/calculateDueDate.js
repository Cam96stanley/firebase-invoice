export const calculateDueDate = (invoiceDate, paymentTerms) => {
  if (!invoiceDate) return null;

  const date = new Date(invoiceDate);
  if (isNaN(date)) throw new Error("Invalid invoiceDate");

  const due = new Date(date);
  due.setDate(due.getDate() + paymentTerms);

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(due);
};
