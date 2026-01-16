import { useNavigate } from "react-router-dom";
import styles from "./InvoiceCards.module.scss";

export default function InvoiceCards({ invoices }) {
  const navigate = useNavigate();
  const dateOpt = { day: "2-digit", month: "short", year: "numeric" };

  const getStatusClass = (status) => {
    switch (status) {
      case "Draft":
        return styles.statusDraft;
      case "Pending":
        return styles.statusPending;
      case "Paid":
        return styles.statusPaid;
      default:
        return "";
    }
  };

  const handleInvoiceClick = (invoice) => {
    if (invoice.status === "Pending" || invoice.status === "Paid") {
      navigate(`/invoice/${invoice.id}/${invoice.status.toLowerCase()}`, {
        state: { invoice },
      });
    } else {
      navigate(`/invoice/${invoice.id}`);
    }
  };

  return (
    <>
      {invoices.map((invoice) => (
        <div
          key={invoice.invoiceNumber}
          className={styles.card}
          onClick={() => handleInvoiceClick(invoice)}
        >
          <div className={styles.card__grid}>
            <p className={styles.invoiceNumber}>
              <span className={styles.hash}>#</span>
              {`${invoice.invoiceNumber}`}
            </p>
            <p className={styles.invoiceDate}>
              Due{" "}
              {new Date(invoice.dueDate).toLocaleDateString("en-GB", dateOpt)}
            </p>

            <p className={styles.clientName}>{invoice.billTo.name}</p>
            <p className={styles.invoiceTotal}>${invoice.total}</p>
            <div
              className={`${styles.status} ${getStatusClass(invoice.status)}`}
            >
              {invoice.status}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
