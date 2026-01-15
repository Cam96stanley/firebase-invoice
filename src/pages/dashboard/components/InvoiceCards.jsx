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

  return (
    <>
      {invoices.map((invoice) => (
        <div
          key={invoice.invoiceNumber}
          className={styles.card}
          onClick={() => navigate(`/invoice/${invoice.id}`)}
        >
          <div className={styles.card__top}>
            <h2 className={styles.card__top_invoice_number}>
              {invoice.invoiceNumber}
            </h2>
            <p className={styles.card__top_recipient}>{invoice.billTo.name}</p>
          </div>
          <div className={styles.card__bottom}>
            <div className={styles.card__bottom_left}>
              <p className={styles.card__bottom_due_date}>
                Due{" "}
                {new Date(invoice.dueDate).toLocaleDateString("en-GB", dateOpt)}
              </p>
              <p className={styles.card__bottom_total}>${invoice.total}</p>
            </div>
            <div
              className={`${styles.card__bottom_right} ${getStatusClass(
                invoice.status
              )}`}
            >
              {invoice.status}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
