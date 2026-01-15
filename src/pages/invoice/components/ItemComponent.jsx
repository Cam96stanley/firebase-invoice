import trashIcon from "../../../assets/icon-delete.svg";
import styles from "./ItemComponent.module.scss";

export default function ItemComponent({ item, onChange, onDelete }) {
  return (
    <div className={styles.item__container}>
      <label htmlFor="name">Item Name</label>
      <input
        id="name"
        type="text"
        name="name"
        value={item.name}
        onChange={(e) => onChange("name", e.target.value)}
        required
      />
      <div className={styles.item__container_bottom}>
        <div>
          <label htmlFor="quantity">Qty.</label>
          <input
            id="quantity"
            type="number"
            name="quantity"
            value={item.quantity}
            onChange={(e) => onChange("quantity", Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            id="price"
            type="number"
            name="price"
            value={item.price}
            onChange={(e) => onChange("price", Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label htmlFor="total">Total</label>
          <input
            id="total"
            type="number"
            name="total"
            value={item.total}
            readOnly
          />
        </div>
        <button type="button" onClick={onDelete} aria-label="Delete Item">
          <img src={trashIcon} alt="Trashcan icon" />
        </button>
      </div>
    </div>
  );
}
