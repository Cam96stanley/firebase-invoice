import { useState } from "react";
import { createUser, signIn } from "../../../firebase/auth";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "./AuthForm.module.scss";

export default function LoginForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
    displayName: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    let result = "";

    if (location.pathname === "/") {
      result = await signIn(user.email, user.password);
      if (result.errorCode) {
        setError(result.errorMessage);
      } else {
        navigate("/my-dashboard", { replace: true });
      }
    }
    if (location.pathname === "/signup") {
      result = await createUser(user.email, user.password, user.displayName);
      if (result.errorCode) {
        setError(result.errorMessage.user);
      } else {
        navigate("/my-dashboard", { replace: true });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {location.pathname === "/signup" && (
        <input
          type="text"
          name="displayName"
          placeholder="Name"
          value={user.displayName}
          onChange={handleChange}
          className={styles.form__input}
          required
        />
      )}
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={user.email}
        onChange={handleChange}
        className={styles.form__input}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={user.password}
        onChange={handleChange}
        className={styles.form__input}
        required
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit" className={styles.form__button}>
        {location.pathname === "/" ? "Log In" : "Sign Up"}
      </button>
    </form>
  );
}
