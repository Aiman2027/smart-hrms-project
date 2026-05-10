import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import API from "../utils/API";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await API.post("/auth/login", formData);

    localStorage.setItem("token", res.data.token);

    let role = res.data.user?.role;

    if (!role && res.data.token) {
      const payload = JSON.parse(atob(res.data.token.split(".")[1]));
      role = payload.role;
    }

    localStorage.setItem("role", role);

    
    if (role === "admin") {
      navigate("/dashboard");
    } else {
      navigate("/employee"); 
    }

  } catch (error) {
    alert("Login failed");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050816] px-6">

      <motion.form
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-cyan-400/20 rounded-3xl p-8 shadow-2xl"
      >

        
        <h1 className="text-4xl font-bold text-center text-cyan-400 mb-8">
          HRMS Login
        </h1>

        
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-black/30 border border-cyan-500/30 text-white mb-5 outline-none"
        />

    
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-black/30 border border-cyan-500/30 text-white mb-6 outline-none"
        />

        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full bg-cyan-500 hover:bg-cyan-400 transition-all duration-300 text-black font-bold py-4 rounded-xl"
        >
          Login
        </motion.button>

        
        <p className="text-center text-gray-400 mt-5 text-sm">
          Dont have an account?{" "}
          <Link to="/register" className="text-cyan-400 hover:underline">
            Register Employee
          </Link>
        </p>

      </motion.form>
    </div>
  );
};

export default Login;