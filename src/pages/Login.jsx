import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiLogIn, FiMail, FiLock } from "react-icons/fi";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

const handleLogin = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const response = await axios.post("http://localhost:4000/api/auth/login", {
      email,
      password,
    });

    // Save token
    localStorage.setItem("token", response.data.token);

    
    // 🔥 Notify Navbar to re-render immediately
    window.dispatchEvent(new Event("token-updated"));

    toast.success("Login Successful!");
    navigate("/dashboard");

  } catch (error) {
    toast.error(error.response?.data?.message || "Login failed");
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="min-h-screen flex justify-center items-center 
      bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 p-6 text-white">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 rounded-2xl bg-white/10 
        backdrop-blur-xl border border-white/10 shadow-2xl"
      >
        {/* Heading */}
        <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r 
          from-purple-500 to-cyan-400 text-transparent bg-clip-text mb-8">
          Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-6">

          {/* EMAIL FIELD */}
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

          {/* PASSWORD FIELD */}
          <div>
            <label className="text-sm text-slate-300 mb-1 flex items-center gap-2">
              <FiLock /> Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 
                text-white focus:ring-2 focus:ring-purple-500 outline-none backdrop-blur-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 mt-2 rounded-xl flex items-center justify-center gap-2 font-semibold text-lg 
              transition ${
                loading
                  ? "bg-gray-500/40 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-600 to-cyan-500 hover:opacity-90"
              }`}
          >
            {loading ? (
              "Logging in..."
            ) : (
              <>
                <FiLogIn /> Login
              </>
            )}
          </button>
        </form>

        {/* REGISTER REDIRECT */}
        <p className="text-center text-slate-400 mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-purple-400 hover:text-cyan-400 transition font-medium"
          >
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
