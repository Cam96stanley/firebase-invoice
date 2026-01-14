export const calculateDueDate = (invoiceDate, paymentTerms) => {
  if (!invoiceDate) return null;

  const date = new Date(invoiceDate);
  if (isNaN(date)) throw new Error("Invalid invoiceDate");

  const due = new Date(date);
  due.setDate(due.getDate() + paymentTerms);

  const year = due.getFullYear();
  const month = String(due.getMonth() + 1).padStart(2, "0");
  const day = String(due.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
