import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiCalendar, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token");

      const res = await axios.get("http://localhost:4000/api/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // SUPPORT BOTH: { user } and raw user object
      const u = res.data.user || res.data;

      if (!u) throw new Error("No user returned");

      setUser(u);
    } catch (err) {
      toast.error("Please login to view your profile.");
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out");
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white">
        Loading profile...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white">
        Failed to load profile.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-6 py-14 text-white">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-extrabold text-center mb-8 
                     bg-gradient-to-r from-purple-500 to-cyan-400 text-transparent bg-clip-text"
        >
          Your Profile
        </motion.h1>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 border border-white/10 p-6 rounded-2xl shadow-xl backdrop-blur-xl"
        >
          <div className="flex items-center gap-6">

            {/* Avatar */}
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 flex items-center justify-center text-3xl font-bold">
              {user.name?.charAt(0)?.toUpperCase()}
            </div>

            {/* User Info */}
            <div>
              <h2 className="text-2xl font-semibold">{user.name}</h2>

              <p className="flex items-center gap-2 text-slate-300 mt-1">
                <FiMail /> {user.email}
              </p>

              <p className="flex items-center gap-2 text-slate-300 mt-1">
                <FiCalendar /> Joined: {new Date(user.createdAt).toDateString()}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/10 my-6"></div>

          {/* Actions */}
          <div className="flex justify-between">
            <button
              className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition"
              onClick={() => navigate("/dashboard")}
            >
              Your Roadmaps
            </button>

            <button
              className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 transition flex items-center gap-2"
              onClick={logout}
            >
              <FiLogOut /> Logout
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
