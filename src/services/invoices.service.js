import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { calculateTotal } from "../utils/calculateTotal";
import { generateInvoiceNumber } from "./invoiceNumber.service";
import { invoiceModel } from "../models/invoice.model";
import { validateInvoice } from "../utils/invoiceValidator";
import { calculateDueDate } from "../utils/calculateDueDate";

export const createInvoice = async (invoice) => {
  if (!auth.currentUser)
    throw new Error("User not authenticated, Please log in");

  const invoiceNumber = await generateInvoiceNumber();

  const template = invoiceModel(invoice);

  const { valid, errors } = validateInvoice(template);

  if (!valid)
    throw new Error("Invoice validation failed:\n" + errors.join("\n"));

  const payload = {
    ...template,
    invoiceNumber,
    total: calculateTotal(template.items),
    dueDate: calculateDueDate(template.invoiceDate, template.paymentTerms),
    userId: auth.currentUser.uid,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  return await addDoc(collection(db, "invoices"), payload);
};
