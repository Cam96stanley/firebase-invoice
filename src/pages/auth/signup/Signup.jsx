import { Link } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import styles from "./Signup.module.scss";

export default function Signup() {
  return (
    <section className={styles.signup__section}>
      <h2>Signup</h2>
      <AuthForm />
      <p className={styles.text}>
        Already have an account?{" "}
        <Link className={styles.text__link} to="/">
          Click Here
        </Link>
      </p>
    </section>
  );
}
