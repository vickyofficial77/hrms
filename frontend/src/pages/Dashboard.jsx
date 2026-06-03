import { Building2, BriefcaseBusiness, Users, FileText, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const items = [
  {
    title: "Departments",
    path: "/departments",
    icon: Building2,
    text: "Create and organize company departments.",
  },
  {
    title: "Positions",
    path: "/positions",
    icon: BriefcaseBusiness,
    text: "Manage job positions and qualifications.",
  },
  {
    title: "Employees",
    path: "/employees",
    icon: Users,
    text: "Add, update, delete, and search employees.",
  },
  {
    title: "Reports",
    path: "/reports",
    icon: FileText,
    text: "View employees currently on leave.",
  },
];

function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-blue-800 via-blue-700 to-cyan-500 p-8 text-white shadow-2xl shadow-blue-500/30">
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute -bottom-20 left-20 h-56 w-56 rounded-full bg-cyan-200/20 blur-3xl" />

        <div className="relative z-10">
          <p className="text-sm font-black uppercase tracking-widest text-blue-100">
            Dashboard Overview
          </p>
          <h1 className="mt-3 text-4xl font-black">Welcome to HRMS</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-blue-50">
            Manage employee records, departments, positions, secure users, and
            status reports using a modern HR management platform.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.title}
              to={item.path}
              className="group rounded-[1.7rem] border border-blue-100 bg-white p-6 shadow-xl shadow-blue-100/60 transition-all duration-300 hover:-translate-y-2 hover:border-blue-300 hover:shadow-2xl hover:shadow-blue-200"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-700 to-cyan-500 text-white shadow-lg shadow-blue-500/30 transition group-hover:scale-110">
                <Icon size={26} />
              </div>

              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black text-slate-900">
                  {item.title}
                </h3>
                <ArrowUpRight className="text-blue-600 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                {item.text}
              </p>
            </Link>
          );
        })}
      </div>

      <div className="rounded-[1.7rem] border border-blue-100 bg-white p-8 shadow-xl shadow-blue-100/60">
        <h2 className="text-2xl font-black text-slate-900">System Purpose</h2>
        <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-600">
          This HRMS helps the company store employee information, assign
          departments and positions, manage user accounts, and generate
          employee status reports such as employees currently on leave.
        </p>
      </div>
    </div>
  );
}

export default Dashboard;