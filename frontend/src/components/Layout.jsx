import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function Layout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-slate-100">
      <Sidebar />

      <main className="ml-72 min-h-screen">
        <Topbar />

        <section className="p-8">
          <Outlet />
        </section>
      </main>
    </div>
  );
}

export default Layout;