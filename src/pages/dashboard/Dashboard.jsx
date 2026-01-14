import plusIcon from "../../assets/icon-plus.svg";
import arrowDown from "../../assets/icon-arrow-down.svg";
import styles from "./Dashboard.module.scss";

export default function Dashboard() {
  return (
    <section>
      <div className={styles.dashboard__header}>
        <div className={styles.left__container}>
          <h2 className={styles.left__container_invoice_text}>Invoices</h2>
          <p className={styles.left__container_invoice_count}>No invoices</p>
        </div>
        <div className={styles.right__container}>
          <div className={styles.dropdown}>
            <button className={styles.dropdown__button}>
              Filter <img src={arrowDown} alt="Down arrow icon" />
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
          <button className={styles.new_invoice__button}>
            <div className={styles.new_invoice__button_image_container}>
              <img src={plusIcon} alt="Plus icon" />
            </div>
            New
          </button>
        </div>
      </div>
    </section>
  );
}
