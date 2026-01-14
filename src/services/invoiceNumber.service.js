import { doc, runTransaction } from "firebase/firestore";
import { db, auth } from "../firebase/firebase";

export const generateInvoiceNumber = async () => {
  if (!auth.currentUser) {
    throw new Error("User not authenticated");
  }

  const counterRef = doc(db, "counters", auth.currentUser.uid);

  return await runTransaction(db, async (transaction) => {
    const snapshot = await transaction.get(counterRef);

    let nextNumber = 1;

    if (snapshot.exists()) {
      nextNumber = snapshot.data().invoiceNumber + 1;
      transaction.update(counterRef, { invoiceNumber: nextNumber });
    } else {
      transaction.set(counterRef, { invoiceNumber: nextNumber });
    }

    return `INV-${String(nextNumber).padStart(5, "0")}`;
  });
};
