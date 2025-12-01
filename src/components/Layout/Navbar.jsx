import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiLogOut, FiMenu, FiX, FiUser } from "react-icons/fi";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function Navbar() {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  useEffect(() => {
    const sync = () => setToken(localStorage.getItem("token"));
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setDropdown(false);
    toast.success("Logged out");
    navigate("/");
  };

  const MENU_LINKS = [
    { label: "Create", path: "/create" },
    { label: "Explore", path: "/explore" },
    { label: "About", path: "/about" },
  ];

  return (
    <>
      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full bg-slate-900/80 backdrop-blur-xl shadow-sm px-6 py-4 sticky top-0 
                   z-[70] border-b border-slate-800"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">

          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-extrabold bg-gradient-to-r from-purple-500 to-cyan-400 
                       text-transparent bg-clip-text tracking-tight"
          >
            PathForge
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {MENU_LINKS.map(({ label, path }) => (
              <Link
                key={path}
                to={path}
                className="text-gray-300 hover:text-purple-400 transition"
              >
                {label}
              </Link>
            ))}

            {token ? (
              <div className="relative">
                <button
                  onClick={() => setDropdown(!dropdown)}
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 
                             flex items-center justify-center text-white"
                >
                  <FiUser />
                </button>

                {dropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 mt-3 w-40 bg-slate-900 border border-slate-700 
                               rounded-xl shadow-xl p-3 z-[80]"
                  >
                    <Link
                      onClick={() => setDropdown(false)}
                      to="/profile"
                      className="block px-3 py-2 text-slate-300 hover:bg-slate-800 rounded-lg"
                    >
                      Profile
                    </Link>

                    <Link
                      onClick={() => setDropdown(false)}
                      to="/dashboard"
                      className="block px-3 py-2 text-slate-300 hover:bg-slate-800 rounded-lg"
                    >
                      Dashboard
                    </Link>

                    <button
                      onClick={logout}
                      className="w-full text-left px-3 py-2 text-red-400 hover:bg-slate-800 rounded-lg"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded-lg 
                           hover:opacity-90 transition"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-3xl text-white z-[100]"
            onClick={() => setOpen(!open)}
          >
            <motion.div initial={false} animate={open ? { rotate: 180 } : { rotate: 0 }}>
              {open ? <FiX /> : <FiMenu />}
            </motion.div>
          </button>
        </div>
      </motion.nav>

      {/* MOBILE OVERLAY */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: open ? 1 : 0 }}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition pointer-events-${
          open ? "auto" : "none"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* MOBILE MENU */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: open ? 0 : "100%" }}
        transition={{ type: "spring", stiffness: 200, damping: 22 }}
        className="fixed right-0 top-0 h-full w-72 bg-slate-900 border-l border-slate-800 shadow-xl 
                   p-6 z-[80] md:hidden"
      >
        <div className="flex flex-col gap-6 text-lg text-gray-300 mt-10">

          {MENU_LINKS.map(({ label, path }) => (
            <Link
              key={path}
              onClick={() => setOpen(false)}
              to={path}
              className="text-gray-300 hover:text-purple-400"
            >
              {label}
            </Link>
          ))}

          {token ? (
            <>
              <Link
                onClick={() => setOpen(false)}
                to="/profile"
                className="text-gray-300 hover:text-purple-400"
              >
                Profile
              </Link>

              <Link
                onClick={() => setOpen(false)}
                to="/dashboard"
                className="text-gray-300 hover:text-purple-400"
              >
                Dashboard
              </Link>

              <button
                onClick={logout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg text-center"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded-lg text-center"
            >
              Login
            </Link>
          )}

        </div>
      </motion.div>
    </>
  );
}
