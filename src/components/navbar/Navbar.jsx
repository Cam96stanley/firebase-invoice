import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import styles from "./Navbar.module.scss";
import useAuth from "../../context/useAuth";
import { globalSignOut } from "../../firebase/auth";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  const handleClick = () => {
    globalSignOut();
    return navigate("/", { replace: true });
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo__container}>
          <img src={logo} alt="Logo" />
        </div>
        {!loading && user?.email && (
          <>
            <button className={styles.logout__button} onClick={handleClick}>
              Log out
            </button>
          </>
        )}
      </header>

      <Outlet />
    </>
  );
}
