import { useNavigate } from "react-router-dom";
import { createInvoiceTemplate } from "../../utils/createInvoice";
import arrowLeft from "../../assets/icon-arrow-left.svg";
import plusIcon from "../../assets/icon-plus.svg";
import styles from "./NewInvoice.module.scss";
import ItemComponent from "./components/ItemComponent";
import { useState } from "react";
import { createInvoice } from "../../services/invoices.service";

export function NewInvoice() {
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState(createInvoiceTemplate());

  const handleGoBack = () => {
    navigate("/my-dashboard", { replace: true });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      handleGoBack();
    }
  };

  const addItem = () => {
    setInvoice((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          id: crypto.randomUUID(),
          name: "",
          quantity: "",
          price: "",
          total: 0,
        },
      ],
    }));
  };

  const deleteItem = (id) => {
    setInvoice((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id),
    }));
  };

  const handleChange = (e) => {
    const { name, value, dataset } = e.target;
    const section = dataset.section;

    const processedValue = name === "paymentTerms" ? Number(value) : value;

    if (section) {
      setInvoice((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [name]: processedValue,
        },
      }));
    } else {
      setInvoice((prev) => ({
        ...prev,
        [name]: processedValue,
      }));
    }
  };

  const handleItemChange = (id, field, value) => {
    setInvoice((prev) => {
      const updatedItems = prev.items.map((item) => {
        if (item.id === id) {
          const updatedItem = {
            ...item,
            [field]:
              field === "quantity" || field === "price" ? Number(value) : value,
          };

          updatedItem.total =
            (Number(updatedItem.quantity) || 0) *
            (Number(updatedItem.price) || 0);

          return updatedItem;
        }
        return item;
      });

      return {
        ...prev,
        items: updatedItems,
      };
    });
  };

  const handleSaveAndSend = async (e) => {
    e.preventDefault();
    try {
      console.log(invoice);
      await createInvoice(invoice);
      navigate("/my-dashboard");
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

      <form className={styles.new_invoice_form}>
        <h2 className={styles.new_invoice_form__title}>New Invoice</h2>

        <div className={styles.bill_from}>
          <p className={styles.form_section__title}>Bill From</p>
          <div className={styles.outer_div}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              data-section="billFrom"
              value={invoice.billFrom.name}
              onChange={handleChange}
              required
            />
            <label htmlFor="streetAddress">Street Address</label>
            <input
              id="streetAddress"
              type="text"
              name="streetAddress"
              data-section="billFrom"
              value={invoice.billFrom.streetAddress}
              onChange={handleChange}
              required
            />
            <div className={styles.inner_div}>
              <div>
                <label htmlFor="city">City</label>
                <input
                  id="city"
                  type="text"
                  name="city"
                  data-section="billFrom"
                  value={invoice.billFrom.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="postCode">Post Code</label>
                <input
                  id="postCode"
                  type="text"
                  name="postCode"
                  data-section="billFrom"
                  value={invoice.billFrom.postCode}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <label htmlFor="country">Country</label>
            <input
              id="country"
              type="text"
              name="country"
              data-section="billFrom"
              value={invoice.billFrom.country}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className={styles.bill_to}>
          <p className={styles.form_section__title}>Bill To</p>
          <div className={styles.outer_div}>
            <label htmlFor="name">Clients Name</label>
            <input
              id="name"
              type="text"
              name="name"
              data-section="billTo"
              value={invoice.billTo.name}
              onChange={handleChange}
              required
            />
            <label htmlFor="email">Clients Email</label>
            <input
              id="email"
              type="email"
              name="email"
              data-section="billTo"
              value={invoice.billTo.email}
              onChange={handleChange}
              required
            />
            <label htmlFor="streetAddress">Street Address</label>
            <input
              id="streetAddress"
              type="text"
              name="streetAddress"
              data-section="billTo"
              value={invoice.billTo.streetAddress}
              onChange={handleChange}
              required
            />
            <div className={styles.inner_div}>
              <div>
                <label htmlFor="city">City</label>
                <input
                  id="city"
                  type="text"
                  name="city"
                  data-section="billTo"
                  value={invoice.billTo.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="postCode">Post Code</label>
                <input
                  id="postCode"
                  type="text"
                  name="postCode"
                  data-section="billTo"
                  value={invoice.billTo.postCode}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <label htmlFor="country">Country</label>
            <input
              id="country"
              type="text"
              name="country"
              data-section="billTo"
              value={invoice.billTo.country}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className={styles.outer_div}>
          <label htmlFor="">Invoice date</label>
          <input
            id="invoiceDate"
            type="date"
            name="invoiceDate"
            value={invoice.invoiceDate}
            onChange={handleChange}
            required
          />
          <label htmlFor="paymentTerms">Payment Terms</label>
          <select
            name="paymentTerms"
            id="paymentTerms"
            value={invoice.paymentTerms}
            onChange={handleChange}
            required
          >
            <option value="">Select terms</option>
            <option value={7}>7 Days</option>
            <option value={14}>14 Days</option>
            <option value={30}>1 Month</option>
            <option value={60}>2 Months</option>
            <option value={90}>3 Months</option>
            <option value={180}>6 Months</option>
            <option value={365}>1 Year</option>
          </select>
          <label htmlFor="description">Project Description</label>
          <input
            id="description"
            type="text"
            name="description"
            value={invoice.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.items_container}>
          <p className={styles.items_container__title}>Item List</p>
          {invoice.items.map((item) => (
            <ItemComponent
              key={item.id}
              onDelete={() => deleteItem(item.id)}
              item={item}
              onChange={(field, value) =>
                handleItemChange(item.id, field, value)
              }
            />
          ))}
          <button
            type="button"
            className={styles.add_item_button}
            onClick={addItem}
          >
            <img src={plusIcon} alt="Plus icon" /> Add New Item
          </button>
        </div>

        <div className={styles.form__footer}>
          <button type="button" className={styles.discard__button}>
            Discard
          </button>
          <button type="button" className={styles.draft__button}>
            Save as Draft
          </button>
          <button onClick={handleSaveAndSend} className={styles.send__button}>
            Save & Send
          </button>
        </div>
      </form>
    </>
  );
}
