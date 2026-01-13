import useAuth from "../../context/useAuth";
import LoginForm from "./components/LoginForm";

export default function Auth() {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <LoginForm />;
}
