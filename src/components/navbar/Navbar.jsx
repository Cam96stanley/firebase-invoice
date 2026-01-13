import { Outlet } from "react-router-dom";
import logo from "../../assets/logo.svg";
import profileImg from "../../assets/image-avatar.jpg";
import styles from "./Navbar.module.scss";

export default function Navbar() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo__container}>
          <img src={logo} alt="Logo" />
        </div>

        <img
          src={profileImg}
          alt="Profile image"
          className={styles.profile__img}
        />
      </header>

      <Outlet />
    </>
  );
}
