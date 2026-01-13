import { useState } from "react";
import { createUser, signIn } from "../../../firebase/auth";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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
        console.log("Logged In!", result);
        navigate("/dashboard", { replace: true });
      }
    }
    if (location.pathname === "/signup") {
      result = await createUser(user.email, user.password, user.displayName);
      if (result.errorCode) {
        setError(result.errorMessage.user);
      } else {
        console.log("User Created!", result);
        navigate("/dashboard", { replace: true });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {location.pathname === "/signup" && (
        <input
          type="text"
          name="displayName"
          placeholder="Name"
          value={user.displayName}
          onChange={handleChange}
          required
        />
      )}
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={user.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={user.password}
        onChange={handleChange}
        required
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">
        {location.pathname === "/" ? "Log In" : "Sign Up"}
      </button>
    </form>
  );
}
