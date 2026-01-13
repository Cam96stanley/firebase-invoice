import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Auth from "./pages/auth/Auth";
import Dashboard from "./pages/dashboard/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Auth />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
