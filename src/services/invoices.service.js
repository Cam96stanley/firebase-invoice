import {
  addDoc,
  getDoc,
  doc,
  collection,
  serverTimestamp,
  where,
  query,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
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

  const docRef = await addDoc(collection(db, "invoices"), payload);
  return docRef;
};

export const getInvoices = async () => {
  try {
    const invoicesRef = collection(db, "invoices");

    const q = query(invoicesRef, where("userId", "==", auth.currentUser.uid));

    const snapshot = await getDocs(q);

    const invoices = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return invoices;
  } catch (err) {
    console.error("Error fetching invoices:", err);
    throw err;
  }
};

export const getInvoiceId = async (id) => {
  try {
    const docRef = doc(db, "invoices", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error("Invoice not found");
    }

    return {
      id: docSnap.id,
      ...docSnap.data(),
    };
  } catch (err) {
    console.error("Error fetching invoice", err);
    throw err;
  }
};

export const updateInvoice = async (id, invoiceData) => {
  try {
    const docRef = doc(db, "invoices", id);
    await updateDoc(docRef, {
      ...invoiceData,
      updatedAt: new Date(),
    });
  } catch (err) {
    console.error("Document failed to update", err);
    throw err;
  }
};

export const deleteInvoice = async (id) => {
  if (!id) throw new Error("deleteInvoice called without and ID");

  try {
    const docRef = doc(db, "invoices", id);
    await deleteDoc(docRef);
  } catch (err) {
    console.error("Error deleting invoice", err);
    throw err;
  }
};
