import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiLock, FiUserPlus } from "react-icons/fi";
import toast from "react-hot-toast";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post(
        "https://pathforge-backend-zn5j.onrender.com/api/auth/register",
        { name, email, password }
      );

      localStorage.setItem("token", response.data.token);
window.dispatchEvent(new Event("storage"));

      toast.success("Registration Successful!");

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center 
    bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white p-6">

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 rounded-2xl bg-white/10 border border-white/10 
        shadow-2xl backdrop-blur-lg"
      >
        {/* Title */}
        <h2 className="text-4xl font-extrabold text-center mb-8 
        bg-gradient-to-r from-purple-500 to-cyan-400 text-transparent bg-clip-text">
          Create Account
        </h2>

        <form onSubmit={handleRegister} className="space-y-6">

          {/* NAME */}
          <div>
            <label className="text-sm text-slate-300 mb-1 flex items-center gap-2">
              <FiUser /> Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 
              text-white focus:ring-2 focus:ring-purple-500 outline-none backdrop-blur-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm text-slate-300 mb-1 flex items-center gap-2">
              <FiMail /> Email
            </label>
            <input
              type="email"
              placeholder="example@gmail.com"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 
              text-white focus:ring-2 focus:ring-purple-500 outline-none backdrop-blur-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm text-slate-300 mb-1 flex items-center gap-2">
              <FiLock /> Password
            </label>
            <input
              type="password"
              placeholder="Create a strong password"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 
              text-white focus:ring-2 focus:ring-purple-500 outline-none backdrop-blur-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* REGISTER BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl flex items-center justify-center gap-2 
            font-semibold text-lg transition 
            ${
              loading
                ? "bg-gray-500/40 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-600 to-cyan-500 hover:opacity-90"
            }`}
          >
            {loading ? "Registering..." : <><FiUserPlus /> Register</>}
          </button>
        </form>

        {/* LOGIN REDIRECT */}
        <p className="text-center text-slate-400 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-purple-400 hover:text-cyan-400 transition font-medium"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
