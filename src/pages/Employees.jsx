import { useEffect, useState } from "react";
import API from "../utils/API";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    department: "",
  });

  const fetchEmployees = async () => {
    try {
      const res = await API.get("/employees");
      const data = res.data?.employees || res.data?.data || res.data || [];
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
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full z-30 transition-transform duration-300 md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar />
      </div>

      <div className="flex-1 md:ml-[260px] min-w-0">
        <div className="flex items-center gap-3 p-4 md:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 p-2 rounded-xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <span className="text-cyan-400 font-bold text-lg">HR Panel</span>
        </div>

        <div className="hidden md:block">
          <Navbar />
        </div>

        <div className="p-4 md:p-8">
          <h1 className="text-2xl md:text-4xl font-bold text-cyan-400 mb-6 md:mb-8">
            Employees
          </h1>

          <div className="bg-[#0f172a] rounded-3xl border border-cyan-500/20 p-3 md:p-6 overflow-hidden">
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left text-sm md:text-base min-w-[500px]">
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
                    employees.map((emp) => (
                      <tr
                        key={emp._id}
                        className="border-b border-gray-700 hover:bg-cyan-500/5"
                      >
                        <td className="p-3 md:p-4 font-medium">{emp.name}</td>
                        <td className="p-3 md:p-4 text-gray-300 break-all">{emp.email}</td>
                        <td className="p-3 md:p-4 hidden sm:table-cell text-gray-300">{emp.role}</td>
                        <td className="p-3 md:p-4 hidden md:table-cell text-gray-300">{emp.department}</td>
                        <td className="p-3 md:p-4">
                          <button
                            onClick={() => deleteEmployee(emp._id)}
                            className="bg-red-500 hover:bg-red-600 px-3 py-1.5 md:px-4 md:py-2 rounded-xl text-sm transition-colors"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
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
      </div>
    </div>
  );
};

export default Employees;
