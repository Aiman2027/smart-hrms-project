import { useEffect, useState } from "react";
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

      console.log("API RESPONSE:", res.data);

      
      const data =
        res.data?.employees ||
        res.data?.data ||
        res.data ||
        [];

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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addEmployee = async (e) => {
    e.preventDefault();

    try {
      await API.post("/employees", formData);

      alert("Employee Added Successfully");

      fetchEmployees();

      setFormData({
        name: "",
        email: "",
        role: "",
        department: "",
      });

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

      <div className="flex-1 ml-[260px] p-8">

        <Navbar />

        <h1 className="text-4xl font-bold text-cyan-400 mb-8">
          
        </h1>

        {/* TABLE */}
        <div className="overflow-x-auto bg-[#0f172a] rounded-3xl border border-cyan-500/20 p-6">

          <table className="w-full text-left">

            <thead>
              <tr className="text-cyan-400 border-b border-cyan-500/20">
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4">Department</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {employees.length > 0 ? (
                employees.map((emp) => (
                  <tr
                    key={emp._id}
                    className="border-b border-gray-700 hover:bg-cyan-500/5"
                  >
                    <td className="p-4">{emp.name}</td>
                    <td className="p-4">{emp.email}</td>
                    <td className="p-4">{emp.role}</td>
                    <td className="p-4">{emp.department}</td>

                    <td className="p-4">
                      <button
                        onClick={() => deleteEmployee(emp._id)}
                        className="bg-red-500 px-4 py-2 rounded-xl"
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
  );
};

export default Employees;