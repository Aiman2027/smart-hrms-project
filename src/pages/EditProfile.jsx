import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import API from "../utils/API";

const EditProfile = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  
  const fetchProfile = async () => {
    try {
      const res = await API.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setForm({
        name: res.data.name,
        email: res.data.email,
        password: "",
      });

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  
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

      await API.put("/auth/update-profile", form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      alert("Profile Updated Successfully");

    } catch (error) {
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] flex items-center justify-center px-6">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-cyan-500/20 p-8 rounded-3xl shadow-2xl"
      >

        <h1 className="text-3xl font-bold text-cyan-400 text-center mb-6">
          Edit Profile
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

        
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-4 bg-black/30 border border-cyan-500/30 rounded-xl text-white outline-none focus:border-cyan-400"
          />

          
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-4 bg-black/30 border border-cyan-500/30 rounded-xl text-white outline-none focus:border-cyan-400"
          />

          
          <input
            type="password"
            name="password"
            placeholder="New Password (optional)"
            value={form.password}
            onChange={handleChange}
            className="w-full p-4 bg-black/30 border border-cyan-500/30 rounded-xl text-white outline-none focus:border-cyan-400"
          />

    
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            type="submit"
            className="w-full bg-cyan-500 text-black font-bold py-3 rounded-xl hover:bg-cyan-400 transition"
          >
            {loading ? "Updating..." : "Update Profile"}
          </motion.button>

        </form>

      </motion.div>
    </div>
  );
};

export default EditProfile;