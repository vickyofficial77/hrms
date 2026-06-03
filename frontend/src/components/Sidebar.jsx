import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  BriefcaseBusiness,
  Users,
  FileText,
  Rocket,
  ShieldCheck,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Departments", path: "/departments", icon: Building2 },
  { name: "Positions", path: "/positions", icon: BriefcaseBusiness },
  { name: "Employees", path: "/employees", icon: Users },
  { name: "Reports", path: "/reports", icon: FileText },
];

function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user"));

  const userName = user?.UserName || "User";
  const firstLetter = userName.charAt(0).toUpperCase();

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 overflow-hidden bg-gradient-to-b from-blue-800 via-blue-700 to-sky-500 px-5 py-6 text-white shadow-2xl">
      <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />

      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-10 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-blue-700 shadow-xl">
            <Rocket size={25} />
          </div>

          <div>
            <h1 className="text-2xl font-black">HRMS</h1>
            <p className="text-xs text-blue-100">
              Human Resource Management
            </p>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition-all duration-300 ${
                    isActive
                      ? "bg-white text-blue-700 shadow-xl"
                      : "text-blue-50 hover:bg-white/15 hover:text-white"
                  }`
                }
              >
                <Icon size={20} />
                {item.name}
              </NavLink>
            );
          })}
        </nav>

        <div className="rounded-[1.5rem] border border-white/20 bg-white/15 p-4 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-lg font-black text-blue-700">
              {firstLetter}
            </div>

            <div>
              <p className="font-black">{userName}</p>

              <div className="flex items-center gap-1 text-xs text-blue-100">
                <ShieldCheck size={13} />
                Active User
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;