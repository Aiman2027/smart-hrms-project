import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";
import Leaves from "./pages/Leaves";
import AddEmployee from "./pages/AddEmployee";
import AdminLeavePanel from "./pages/AdminLeavePanel";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import EditProfile from "./pages/EditProfile";




function App() {
  return (
    <BrowserRouter>
      <Routes>

      
        <Route path="/" element={<Navigate to="/Login" />} />

        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

      
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/add-employee" element={<AddEmployee />} />
        <Route path="/admin-leaves" element={<AdminLeavePanel />} />

      
        <Route path="/employee" element={<EmployeeDashboard />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="leaves" element={<Leaves />} />
        <Route path="/profile" element={<EditProfile />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;