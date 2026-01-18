import { Link, useNavigate } from "react-router-dom";
import { Brain, LogOut, ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    setOpen(false);
    setMobileMenuOpen(false);
    navigate("/login");
  };

  const navLinks = [
    { to: "/", label: "Accueil" },
    { to: "/scan", label: "Scanner", requiresAuth: true },
    { to: "/history", label: "Historique", requiresAuth: true },
    { to: "/about", label: "À propos" },
  ];

  const visibleLinks = navLinks.filter(link => !link.requiresAuth || user);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-white/80 backdrop-blur-xl border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center gap-3 text-slate-900 hover:text-[#0f62fe] transition-colors duration-200"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0f62fe] text-white shadow-sm">
            <Brain className="h-5 w-5" strokeWidth={2.5} />
          </div>
          <span className="text-xl font-bold tracking-tight">Emotion AI</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {visibleLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="px-4 py-2.5 rounded-xl text-slate-600 font-medium hover:text-[#0f62fe] hover:bg-slate-50 transition-all duration-200"
            >
              {link.label}
            </Link>
          ))}

          {user ? (
            <div className="relative ml-2">
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2.5 pl-2.5 pr-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50/80 hover:bg-slate-100 transition-colors"
              >
                <div className="h-8 w-8 rounded-lg bg-[#0f62fe] flex items-center justify-center text-sm font-semibold text-white">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-semibold text-slate-800 max-w-[100px] truncate hidden lg:inline">{user.username}</span>
                <ChevronDown className={`h-4 w-4 text-slate-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
              </button>
              {open && (
                <div className="absolute right-0 top-full mt-1.5 w-48 rounded-xl border border-slate-200 bg-white py-1 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.12)]">
                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Déconnexion
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2 ml-2">
              <Link
                to="/login"
                className="px-4 py-2.5 rounded-xl font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-all"
              >
                Connexion
              </Link>
              <Link
                to="/register"
                className="px-4 py-2.5 rounded-xl font-semibold text-white bg-[#0f62fe] hover:bg-[#0043ce] shadow-sm transition-all"
              >
                Inscription
              </Link>
            </div>
          )}
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-slate-100"
        >
          {mobileMenuOpen ? <X className="h-6 w-6 text-slate-700" /> : <Menu className="h-6 w-6 text-slate-700" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <div className="max-w-6xl mx-auto px-4 py-4 space-y-1">
            {visibleLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-xl text-slate-700 font-medium hover:bg-slate-50 hover:text-[#0f62fe]"
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <button onClick={logout} className="w-full text-left px-4 py-3 rounded-xl text-red-600 font-medium hover:bg-red-50">
                Déconnexion
              </button>
            ) : (
              <div className="flex gap-2 pt-2">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="flex-1 py-3 rounded-xl text-center font-semibold border border-slate-200 text-slate-700">
                  Connexion
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="flex-1 py-3 rounded-xl text-center font-semibold bg-[#0f62fe] text-white">
                  Inscription
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
