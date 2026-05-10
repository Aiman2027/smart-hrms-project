import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaClipboardCheck,
  FaFileAlt,
  FaUserShield,
} from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-[260px] h-screen bg-[#0b1120] border-r border-cyan-500/20 p-6 fixed left-0 top-0">

      <h1 className="text-3xl font-bold text-cyan-400 mb-10">
        HRFlow
      </h1>

      <div className="flex flex-col gap-5">

        <NavLink to="/dashboard" className="flex items-center gap-3 text-gray-300 hover:text-cyan-400">
          <FaHome />
          Dashboard
        </NavLink>

        <NavLink to="/employees" className="flex items-center gap-3 text-gray-300 hover:text-cyan-400">
          <FaUsers />
          Employees
        </NavLink>

        <NavLink to="/add-employee" className="flex items-center gap-3 text-gray-300 hover:text-cyan-400">
          + Add Employee
        </NavLink>

        <NavLink to="/attendance" className="flex items-center gap-3 text-gray-300 hover:text-cyan-400">
          <FaClipboardCheck />
          Attendance
        </NavLink>

        <NavLink to="/leaves" className="flex items-center gap-3 text-gray-300 hover:text-cyan-400">
          <FaFileAlt />
          Leaves
        </NavLink>

        <NavLink to="/admin-leaves" className="flex items-center gap-3 text-gray-300 hover:text-cyan-400">
          <FaUserShield />
          Leave Mangement
        </NavLink>

      </div>
    </div>
  );
};

export default Sidebar;