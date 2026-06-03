import { useEffect, useState } from "react";
import { Download, RefreshCw, FileText } from "lucide-react";
import { toast } from "react-toastify";
import api from "../api/axios";

function Reports() {
  const [employees, setEmployees] = useState([]);

  const fetchReport = async () => {
    try {
      const res = await api.get("/reports/on-leave");
      setEmployees(res.data);
      toast.success("Report refreshed");
    } catch {
      toast.error("Failed to load report");
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  return (
    <div className="space-y-7">
      <div className="flex items-center justify-between rounded-[2rem] bg-gradient-to-r from-blue-800 to-cyan-500 p-7 text-white shadow-2xl shadow-blue-500/30">
        <div>
          <p className="text-sm font-black uppercase tracking-widest text-blue-100">
            Reports
          </p>
          <h1 className="mt-2 text-3xl font-black">Employee Status Report</h1>
          <p className="mt-2 text-sm text-blue-50">
            Employees currently on leave.
          </p>
        </div>

        <FileText size={54} className="hidden opacity-80 md:block" />
      </div>

      <div className="rounded-[1.7rem] border border-blue-100 bg-white p-6 shadow-xl shadow-blue-100/60">
        <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-black text-slate-900">
              On Leave Employees
            </h2>
            <p className="text-sm text-slate-500">
              Total employees on leave:{" "}
              <span className="font-black text-blue-700">{employees.length}</span>
            </p>
          </div>

          <div className="flex gap-3 print:hidden">
            <button
              onClick={fetchReport}
              className="flex items-center gap-2 rounded-2xl border border-blue-100 bg-blue-50 px-5 py-3 text-sm font-black text-blue-700 transition hover:scale-105 hover:bg-blue-700 hover:text-white"
            >
              <RefreshCw size={17} />
              Refresh
            </button>

            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-700 to-cyan-500 px-5 py-3 text-sm font-black text-white shadow-xl shadow-blue-500/30 transition hover:scale-105 hover:from-cyan-500 hover:to-blue-700"
            >
              <Download size={17} />
              Export / Print
            </button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-blue-100">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-blue-50 text-slate-700">
              <tr>
                <th className="px-5 py-4 font-black">ID</th>
                <th className="px-5 py-4 font-black">Full Name</th>
                <th className="px-5 py-4 font-black">Gender</th>
                <th className="px-5 py-4 font-black">Email</th>
                <th className="px-5 py-4 font-black">Phone</th>
                <th className="px-5 py-4 font-black">Department</th>
                <th className="px-5 py-4 font-black">Position</th>
                <th className="px-5 py-4 font-black">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-blue-50">
              {employees.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-5 py-8 text-center text-slate-500">
                    No employees currently on leave
                  </td>
                </tr>
              ) : (
                employees.map((emp) => (
                  <tr key={emp.EmpID} className="transition hover:bg-blue-50/50">
                    <td className="px-5 py-4 font-black text-blue-700">
                      #{emp.EmpID}
                    </td>
                    <td className="px-5 py-4 font-bold text-slate-900">
                      {emp.FullName}
                    </td>
                    <td className="px-5 py-4">{emp.EmpGender}</td>
                    <td className="px-5 py-4">{emp.EmpEmail}</td>
                    <td className="px-5 py-4">{emp.EmpTelephone}</td>
                    <td className="px-5 py-4">{emp.DepartName}</td>
                    <td className="px-5 py-4">{emp.PosName}</td>
                    <td className="px-5 py-4">
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-black text-blue-700">
                        {emp.EmpStatus}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Reports;