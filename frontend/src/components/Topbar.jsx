import { LogOut, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/axios";

function Topbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      toast.success("Logged out successfully");
      navigate("/");
    } catch {
      toast.error("Logout failed");
    }
  };

  return (
    <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-blue-100 bg-white/80 px-8 backdrop-blur-xl">
      <div>
        <div className="flex items-center gap-2">
          <Sparkles size={18} className="text-blue-600" />
          <p className="text-sm font-black uppercase tracking-widest text-blue-600">
            HRMS Workspace
          </p>
        </div>

        <p className="mt-1 text-sm text-slate-500">
          Manage employees, departments, positions and reports.
        </p>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-700 to-cyan-500 px-5 py-3 text-sm font-black text-white shadow-xl shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:from-cyan-500 hover:to-blue-700 hover:shadow-2xl active:scale-95"
      >
        <LogOut size={18} />
        Logout
      </button>
    </header>
  );
}

export default Topbar;