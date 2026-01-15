import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Signup from "./pages/auth/signup/Signup";
import Login from "./pages/auth/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import { Invoice } from "./pages/invoice/Invoice";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/my-dashboard" element={<Dashboard />} />
          <Route path="/new-invoice" element={<Invoice />} />
          <Route path="/invoice/:invoiceId" element={<Invoice />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
