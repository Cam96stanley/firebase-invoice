import { Link } from "react-router-dom";
import styles from "./Login.module.scss";
import AuthForm from "../components/AuthForm";

export default function Login() {
  return (
    <section className={styles.login__section}>
      <h2>Login</h2>
      <AuthForm className="" />
      <p className={styles.text}>
        Don't have an account?{" "}
        <Link className={styles.text__link} to="/signup">
          Click Here
        </Link>
      </p>
    </section>
  );
}
