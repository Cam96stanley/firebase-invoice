import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../context/useAuth";
import styles from "./ProtectedRoute.module.scss";

export default function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className={styles.loading__state}>
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
