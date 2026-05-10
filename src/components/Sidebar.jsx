import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaClipboardCheck,
  FaFileAlt,
  FaUserShield,
  FaBars,
  FaTimes,
  FaUserPlus,
} from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { to: "/dashboard", icon: <FaHome />, label: "Dashboard" },
    { to: "/employees", icon: <FaUsers />, label: "Employees" },
    { to: "/add-employee", icon: <FaUserPlus />, label: "Add Employee" },
    { to: "/attendance", icon: <FaClipboardCheck />, label: "Attendance" },
    { to: "/leaves", icon: <FaFileAlt />, label: "Leaves" },
    { to: "/admin-leaves", icon: <FaUserShield />, label: "Leave Management" },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-3 left-3 z-50 bg-cyan-500 text-black p-2.5 rounded-xl shadow-lg"
      >
        {isOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
      </button>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="md:hidden fixed inset-0 bg-black/70 z-30 backdrop-blur-sm"
        />
      )}

      <div
        className={`
          fixed left-0 top-0 h-screen w-[260px] z-40
          bg-[#0b1120] border-r border-cyan-500/20 p-6
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-3xl font-bold text-cyan-400">HRFlow</h1>
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden text-gray-400 hover:text-cyan-400"
          >
            <FaTimes size={18} />
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                    : "text-gray-300 hover:text-cyan-400 hover:bg-white/5"
                }`
              }
            >
              <span className="text-lg">{link.icon}</span>
              <span className="font-medium">{link.label}</span>
            </NavLink>
          ))}
        </div>

        <div className="absolute bottom-6 left-6 right-6">
          <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-center">
            <p className="text-cyan-400 text-xs font-bold">HRMS Pro</p>
            <p className="text-gray-500 text-xs mt-1">Admin Panel</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
