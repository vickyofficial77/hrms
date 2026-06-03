import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { toast } from "react-toastify";
import api from "../api/axios";

function Departments() {
  const [departments, setDepartments] = useState([]);
  const [DepartName, setDepartName] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchDepartments = async () => {
    try {
      const res = await api.get("/departments");
      setDepartments(res.data);
    } catch {
      toast.error("Failed to load departments");
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!DepartName.trim()) {
      toast.error("Department name is required");
      return;
    }

    try {
      if (editId) {
        await api.put(`/departments/${editId}`, { DepartName });
        toast.success("Department updated successfully");
      } else {
        await api.post("/departments", { DepartName });
        toast.success("Department added successfully");
      }

      setDepartName("");
      setEditId(null);
      fetchDepartments();
    } catch (error) {
      toast.error(error.response?.data?.message || "Operation failed");
    }
  };

  const handleEdit = (department) => {
    setEditId(department.DepartID);
    setDepartName(department.DepartName);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this department?")) return;

    try {
      await api.delete(`/departments/${id}`);
      toast.success("Department deleted successfully");
      fetchDepartments();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div>
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="text-sm font-semibold text-blue-600">Departments</p>
          <h1 className="mt-1 text-3xl font-extrabold text-slate-900">
            Manage Departments
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Add, update, and delete company departments.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="mb-6 flex gap-3">
          <input
            type="text"
            value={DepartName}
            onChange={(e) => setDepartName(e.target.value)}
            placeholder="Enter department name"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
          />

          <button
            type="submit"
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
          >
            <Plus size={18} />
            {editId ? "Update" : "Add"}
          </button>
        </form>

        <div className="overflow-hidden rounded-xl border border-slate-200">
          <table className="w-full border-collapse bg-white text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-5 py-4 font-bold">ID</th>
                <th className="px-5 py-4 font-bold">Department Name</th>
                <th className="px-5 py-4 text-right font-bold">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {departments.length === 0 ? (
                <tr>
                  <td colSpan="3" className="px-5 py-6 text-center text-slate-500">
                    No departments found
                  </td>
                </tr>
              ) : (
                departments.map((department) => (
                  <tr key={department.DepartID} className="hover:bg-slate-50">
                    <td className="px-5 py-4 font-semibold text-slate-700">
                      {department.DepartID}
                    </td>
                    <td className="px-5 py-4 text-slate-700">
                      {department.DepartName}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEdit(department)}
                          className="rounded-lg bg-amber-50 p-2 text-amber-600 hover:bg-amber-100"
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          onClick={() => handleDelete(department.DepartID)}
                          className="rounded-lg bg-red-50 p-2 text-red-600 hover:bg-red-100"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
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

export default Departments;