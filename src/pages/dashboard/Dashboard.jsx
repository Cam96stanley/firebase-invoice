import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import plusIcon from "../../assets/icon-plus.svg";
import arrowDown from "../../assets/icon-arrow-down.svg";
import illustrationEmpty from "../../assets/illustration-empty.svg";
import styles from "./Dashboard.module.scss";
import { getInvoices } from "../../services/invoices.service";
import InvoiceCards from "./components/InvoiceCards";

export default function Dashboard() {
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      const data = await getInvoices();
      setInvoices(data);
    };

    fetchInvoices();
  }, []);

  return (
    <section>
      <div className={styles.dashboard__header}>
        <div className={styles.left__container}>
          <h2 className={styles.left__container_invoice_text}>Invoices</h2>
          <p className={styles.left__container_invoice_count}>
            {invoices.length > 0
              ? `${invoices.length} Invoices`
              : "No Invoices"}
          </p>
        </div>
        <div className={styles.right__container}>
          <div className={styles.dropdown}>
            <button className={styles.dropdown__button}>
              <span className={styles.filter__label}>Filter</span>{" "}
              <img src={arrowDown} alt="Down arrow icon" />
            </button>
            <div className={styles.dropdown__content}>
              <p
                className={styles.dropdown__content_item}
                id="item1"
                value="pending"
              >
                Pending
              </p>
              <p
                className={styles.dropdown__content_item}
                id="item2"
                value="completed"
              >
                Completed
              </p>
              <p
                className={styles.dropdown__content_item}
                id="item3"
                value="canceled"
              >
                Canceled
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate("/new-invoice", { replace: true })}
            className={styles.new_invoice__button}
          >
            <div className={styles.new_invoice__button_image_container}>
              <img src={plusIcon} alt="Plus icon" />
            </div>
            <span className={styles.label}>New</span>
          </button>
        </div>
      </div>

      <InvoiceCards invoices={invoices} />

      {invoices.length === 0 && (
        <div className={styles.empty__container}>
          <img
            src={illustrationEmpty}
            alt="a woman coming out of an envelope"
          />
          <p className={styles.empty__title}>There is nothing here</p>
          <p className={styles.empty__description}>
            Create an invoice by clicking the
            <br />
            <span className={styles.bold}>New</span> button and get started.
          </p>
        </div>
      )}
    </section>
  );
}
