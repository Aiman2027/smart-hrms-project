import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import API from "../utils/API";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    department: "",
  });

  const fetchEmployees = async () => {
    try {
      const res = await API.get("/employees");
      const data =
        res.data?.employees || res.data?.data || res.data || [];
      setEmployees(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log("Employee fetch error:", error);
      setEmployees([]);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addEmployee = async (e) => {
    e.preventDefault();
    try {
      await API.post("/employees", formData);
      alert("Employee Added Successfully");
      fetchEmployees();
      setFormData({ name: "", email: "", role: "", department: "" });
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to add employee");
    }
  };

  const deleteEmployee = async (id) => {
    try {
      await API.delete(`/employees/${id}`);
      alert("Employee Deleted");
      fetchEmployees();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex bg-[#050816] min-h-screen text-white">
      <Sidebar />
      <div className="flex-1 md:ml-[260px] ml-0 px-4 pt-16 pb-8 md:px-8 md:pt-8">
        <Navbar />

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 mt-2 md:mt-0"
        >
          <h1 className="text-2xl md:text-5xl font-bold text-cyan-400">
            Employees
          </h1>
          <p className="text-gray-400 mt-1 text-sm md:text-base">
            Manage your workforce
          </p>
        </motion.div>

        <div className="overflow-x-auto bg-white/5 rounded-2xl border border-cyan-500/20 p-3 md:p-6">
          <table className="w-full text-left text-sm md:text-base min-w-[480px]">
            <thead>
              <tr className="text-cyan-400 border-b border-cyan-500/20">
                <th className="p-3 md:p-4">Name</th>
                <th className="p-3 md:p-4">Email</th>
                <th className="p-3 md:p-4 hidden sm:table-cell">Role</th>
                <th className="p-3 md:p-4 hidden md:table-cell">Department</th>
                <th className="p-3 md:p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.length > 0 ? (
                employees.map((emp, index) => (
                  <motion.tr
                    key={emp._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-gray-700 hover:bg-cyan-500/5"
                  >
                    <td className="p-3 md:p-4 font-medium">{emp.name}</td>
                    <td className="p-3 md:p-4 text-gray-300 break-all">{emp.email}</td>
                    <td className="p-3 md:p-4 text-gray-300 hidden sm:table-cell">{emp.role}</td>
                    <td className="p-3 md:p-4 text-gray-300 hidden md:table-cell">{emp.department}</td>
                    <td className="p-3 md:p-4">
                      <button
                        onClick={() => deleteEmployee(emp._id)}
                        className="bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded-xl text-sm transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center p-6 text-gray-400">
                    No Employees Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Employees;
