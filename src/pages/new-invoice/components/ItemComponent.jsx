import trashIcon from "../../../assets/icon-delete.svg";
import styles from "./ItemComponent.module.scss";

export default function ItemComponent() {
  return (
    <div className={styles.item__container}>
      <label htmlFor="">Item Name</label>
      <input type="text" />
      <div className={styles.item__container_bottom}>
        <div>
          <label htmlFor="">Qty.</label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor="">Price</label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor="">Total</label>
          <input type="text" readOnly />
        </div>
        <button>
          <img src={trashIcon} alt="Trashcan icon" />
        </button>
      </div>
    </div>
  );
}
