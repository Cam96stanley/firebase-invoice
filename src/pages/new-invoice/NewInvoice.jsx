import { useNavigate } from "react-router-dom";
import arrowLeft from "../../assets/icon-arrow-left.svg";
import plusIcon from "../../assets/icon-plus.svg";
import styles from "./NewInvoice.module.scss";
import ItemComponent from "./components/ItemComponent";

export function NewInvoice() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/my-dashboard", { replace: true });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      handleGoBack();
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

      <form className={styles.new_invoice_form}>
        <h2 className={styles.new_invoice_form__title}>New Invoice</h2>

        <div className={styles.bill_from}>
          <p className={styles.form_section__title}>Bill From</p>
          <div className={styles.outer_div}>
            <label htmlFor="">Street Address</label>
            <input type="text" />
            <div className={styles.inner_div}>
              <div>
                <label htmlFor="">City</label>
                <input type="text" />
              </div>
              <div>
                <label htmlFor="">Post Code</label>
                <input type="text" />
              </div>
            </div>
            <label htmlFor="">Country</label>
            <input type="text" />
          </div>
        </div>

        <div className={styles.bill_to}>
          <p className={styles.form_section__title}>Bill To</p>
          <div className={styles.outer_div}>
            <label htmlFor="">Clients Name</label>
            <input type="text" />
            <label htmlFor="">Clients Email</label>
            <input type="text" />
            <label htmlFor="">Street Address</label>
            <input type="text" />
            <div className={styles.inner_div}>
              <div>
                <label htmlFor="">City</label>
                <input type="text" />
              </div>
              <div>
                <label htmlFor="">Post Code</label>
                <input type="text" />
              </div>
            </div>
            <label htmlFor="">Country</label>
            <input type="text" />
          </div>
        </div>

        <div className={styles.outer_div}>
          <label htmlFor="">Invoice date</label>
          <input type="text" />
          <label htmlFor="">Payment Terms</label>
          <input type="text" />
          <label htmlFor="">Project Description</label>
          <input type="text" />
        </div>

        <div className={styles.items_container}>
          <p className={styles.items_container__title}>Item List</p>
          <ItemComponent />
          <button className={styles.add_item_button}>
            <img src={plusIcon} alt="Plus icon" /> Add New Item
          </button>
        </div>

        <div className={styles.form__footer}>
          <button className={styles.discard__button}>Discard</button>
          <button className={styles.draft__button}>Save as Draft</button>
          <button className={styles.send__button}>Save & Send</button>
        </div>
      </form>
    </>
  );
}
