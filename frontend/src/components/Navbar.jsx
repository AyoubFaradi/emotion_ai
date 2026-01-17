import { Link, useNavigate } from "react-router-dom";
import { Brain, LogOut, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  const syncUser = () => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);
  };

  useEffect(() => {
    syncUser();
    window.addEventListener("storage", syncUser);
    return () => window.removeEventListener("storage", syncUser);
  }, []);

  const logout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-gray-900/90 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO */}
        <Link to="/" className="flex items-center space-x-2">
          <Brain className="w-7 h-7 text-indigo-400" />
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Emotion AI
          </span>
        </Link>

        {/* MENU */}
        <div className="flex items-center space-x-6">

          <Link to="/" className="hover:text-indigo-400 transition">Accueil</Link>
          <Link to="/scan" className="hover:text-indigo-400 transition">Scanner</Link>
          <Link to="/history" className="hover:text-indigo-400 transition">Historique</Link>
          <Link to="/about" className="hover:text-indigo-400 transition">À propos</Link>

          {/* USER CONNECTÉ */}
          {user ? (
            <div className="relative">

              {/* User Button */}
              <button
                onClick={() => setOpen(!open)}
                className="
                  flex items-center gap-2 px-3 py-1.5 rounded-full
                  bg-white/5 hover:bg-white/10
                  border border-white/10
                  transition-all duration-300
                "
              >
                {/* Avatar */}
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-sm font-bold">
                  {user.username.charAt(0).toUpperCase()}
                </div>

                <span className="text-sm font-medium">{user.username}</span>
                <ChevronDown className={`w-4 h-4 transition ${open ? "rotate-180" : ""}`} />
              </button>

              {/* Dropdown */}
              {open && (
                <div className="absolute right-0 mt-3 w-44 bg-gray-900/95 backdrop-blur border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-fade-in">
                  <button
                    onClick={logout}
                    className="
                      w-full flex items-center px-4 py-3 text-sm
                      text-red-400 hover:bg-white/5 transition
                    "
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Déconnexion
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* LOGIN / REGISTER */
            <div className="flex items-center gap-3">

              {/* LOGIN */}
              <Link
                to="/login"
                className="
                  px-5 py-2.5 rounded-xl
                  bg-gradient-to-r from-indigo-500 to-blue-500
                  text-white font-medium
                  shadow-lg shadow-indigo-500/30
                  hover:from-indigo-600 hover:to-blue-600
                  hover:shadow-indigo-500/50
                  transition-all duration-300
                "
              >
                Login
              </Link>

              {/* REGISTER */}
              <Link
                to="/register"
                className="
                  px-5 py-2.5 rounded-xl
                  bg-gradient-to-r from-emerald-500 to-cyan-500
                  text-white font-medium
                  shadow-lg shadow-emerald-500/30
                  hover:from-emerald-600 hover:to-cyan-600
                  hover:shadow-emerald-500/50
                  transition-all duration-300
                "
              >
                Register
              </Link>

            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
