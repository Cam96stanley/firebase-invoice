import { useNavigate, useLocation } from "react-router-dom";
import arrowLeft from "../../assets/icon-arrow-left.svg";
import styles from "./PendingInvoice.module.scss";
import { calculateDueDate } from "../../utils/calculateDueDate";
import { calculateTotal } from "../../utils/calculateTotal";
import { updateInvoice, deleteInvoice } from "../../services/invoices.service";

export default function PendingInvoice() {
  const navigate = useNavigate();
  const location = useLocation();
  const { invoice } = location.state || {};
  const dateOpt = { day: "2-digit", month: "short", year: "numeric" };

  if (!invoice) {
    return <p>Invoice not found.</p>;
  }

  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return styles.statusPending;
      case "Paid":
        return styles.statusPaid;
      default:
        return "";
    }
  };

  const handleGoBack = () => {
    navigate("/my-dashboard", { replace: true });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      handleGoBack();
    }
  };

  const handleMarkAsPaid = (e) => {
    e.preventDefault();

    try {
      const paidInvoice = { ...invoice, status: "Paid" };
      updateInvoice(invoice.id, paidInvoice);
      navigate("/my-dashboard", { replace: true });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();

    try {
      deleteInvoice(invoice.id);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div
        className={styles.back__container}
        role="button"
        tabIndex={0}
        onClick={handleGoBack}
        onKeyDown={handleKeyDown}
      >
        <img src={arrowLeft} alt="Left arrow icon" />
        <p>Go back</p>
      </div>

      <div className={styles.status__container}>
        <p>Status</p>
        <div
          className={`${styles.pending__status} ${getStatusClass(
            invoice.status
          )}`}
        >
          {invoice.status}
        </div>
      </div>

      <div className={styles.details__container}>
        <div className={styles.invoice_number__container}>
          <p className={styles.invoice__number}>
            <span>#</span>
            {invoice.invoiceNumber}
          </p>
          <p>{invoice.description}</p>
        </div>
        <div className={styles.bill_from__container}>
          <p>{invoice.billFrom.streetAddress}</p>
          <p>{invoice.billFrom.city}</p>
          <p>{invoice.billFrom.postCode}</p>
          <p>{invoice.billFrom.country}</p>
          <p></p>
        </div>
        <div className={styles.invoice_details__container}>
          <div>
            <div className={styles.invoice_date__container}>
              <p>Invoice Date</p>
              <p className={styles.invoice_date}>
                {new Date(invoice.invoiceDate).toLocaleDateString(
                  "en-GB",
                  dateOpt
                )}
              </p>
            </div>
            <div className={styles.payment_due__container}>
              <p>Payment Due</p>
              <p className={styles.payment_date}>
                {calculateDueDate(invoice.invoiceDate, invoice.paymentTerms)}
              </p>
            </div>
          </div>
          <div className={styles.bill_to__container}>
            <p>Bill To</p>
            <p className={styles.bill_to_name}>{invoice.billTo.name}</p>
            <div>
              <p>{invoice.billTo.streetAddress}</p>
              <p>{invoice.billTo.city}</p>
              <p>{invoice.billTo.postCode}</p>
              <p>{invoice.billTo.country}</p>
            </div>
          </div>
        </div>
        <div className={styles.sent_to_email}>
          <p>Sent to</p>
          <p className={styles.email}>{invoice.billTo.email}</p>
        </div>

        <div className={styles.items__container}>
          {invoice.items.map((item) => (
            <div className={styles.item__container} key={item.id}>
              <div>
                <p className={styles.item_name}>{item.name}</p>
                <p
                  className={styles.item_quantity}
                >{`${item.quantity} x $${item.price}`}</p>
              </div>
              <div>
                <p className={styles.item_total}>${item.total}</p>
              </div>
            </div>
          ))}
          <div className={styles.items_total}>
            <p>Amount Due</p>
            <p className={styles.total}>${calculateTotal(invoice.items)}</p>
          </div>
        </div>
      </div>

      {invoice.status === "Pending" && (
        <div className={styles.button__footer}>
          <button onClick={handleDelete} className={styles.delete__button}>
            Delete
          </button>
          <button onClick={handleMarkAsPaid} className={styles.paid__button}>
            Mark as Paid
          </button>
        </div>
      )}
    </>
  );
}
