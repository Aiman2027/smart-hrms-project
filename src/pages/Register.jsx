import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import API from "../utils/API";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await API.post("/auth/register", form);

      alert("Employee Registered Successfully");

      navigate("/login");

    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050816] px-6">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-cyan-400/20 rounded-3xl p-8 shadow-2xl"
      >

        
        <h1 className="text-4xl font-bold text-center text-cyan-400 mb-2">
          Register Employee
        </h1>

        <p className="text-center text-gray-400 mb-8 text-sm">
          Create account to access HRMS system
        </p>

    
        <form onSubmit={handleSubmit} className="space-y-5">

        
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-black/30 border border-cyan-500/30 text-white outline-none focus:border-cyan-400 transition"
          />

        
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-black/30 border border-cyan-500/30 text-white outline-none focus:border-cyan-400 transition"
          />

          
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-black/30 border border-cyan-500/30 text-white outline-none focus:border-cyan-400 transition"
          />

        
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-500 hover:bg-cyan-400 transition text-black font-bold py-4 rounded-xl disabled:opacity-50"
          >
            {loading ? "Creating..." : "Register Employee"}
          </motion.button>

        </form>

        
        <p className="text-center text-gray-400 mt-6 text-sm">
          Already have an account?{" "}
          <Link to="/Login" className="text-cyan-400 hover:underline">
            Login
          </Link>
        </p>

      </motion.div>
    </div>
  );
};

export default Register;