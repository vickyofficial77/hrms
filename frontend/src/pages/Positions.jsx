import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus, BriefcaseBusiness, X } from "lucide-react";
import { toast } from "react-toastify";
import api from "../api/axios";

function Positions() {
  const [positions, setPositions] = useState([]);
  const [form, setForm] = useState({
    PosName: "",
    RequiredQualification: "",
  });
  const [editId, setEditId] = useState(null);

  const fetchPositions = async () => {
    try {
      const res = await api.get("/positions");
      setPositions(res.data);
    } catch {
      toast.error("Failed to load positions");
    }
  };

  useEffect(() => {
    fetchPositions();
  }, []);

  const resetForm = () => {
    setForm({ PosName: "", RequiredQualification: "" });
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.PosName.trim() || !form.RequiredQualification.trim()) {
      toast.error("All fields are required");
      return;
    }

    try {
      if (editId) {
        await api.put(`/positions/${editId}`, form);
        toast.success("Position updated successfully");
      } else {
        await api.post("/positions", form);
        toast.success("Position added successfully");
      }

      resetForm();
      fetchPositions();
    } catch (error) {
      toast.error(error.response?.data?.message || "Operation failed");
    }
  };

  const handleEdit = (position) => {
    setEditId(position.PosID);
    setForm({
      PosName: position.PosName,
      RequiredQualification: position.RequiredQualification,
    });
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this position?")) return;

    try {
      await api.delete(`/positions/${id}`);
      toast.success("Position deleted successfully");
      fetchPositions();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="space-y-7">
      <div className="rounded-[2rem] bg-gradient-to-r from-blue-800 to-cyan-500 p-7 text-white shadow-2xl shadow-blue-500/30">
        <p className="text-sm font-black uppercase tracking-widest text-blue-100">
          Positions
        </p>
        <h1 className="mt-2 text-3xl font-black">Manage Positions</h1>
        <p className="mt-2 text-sm text-blue-50">
          Register job positions and required qualifications.
        </p>
      </div>

      <div className="rounded-[1.7rem] border border-blue-100 bg-white p-6 shadow-xl shadow-blue-100/60">
        <form onSubmit={handleSubmit} className="grid gap-3 lg:grid-cols-[1fr_1.5fr_auto_auto]">
          <div className="flex items-center gap-3 rounded-2xl border border-blue-100 bg-blue-50/50 px-4 focus-within:border-blue-500 focus-within:bg-white">
            <BriefcaseBusiness size={20} className="text-blue-600" />
            <input
              name="PosName"
              value={form.PosName}
              onChange={(e) => setForm({ ...form, PosName: e.target.value })}
              placeholder="Position name"
              className="w-full bg-transparent py-3.5 text-sm font-medium outline-none"
            />
          </div>

          <input
            name="RequiredQualification"
            value={form.RequiredQualification}
            onChange={(e) =>
              setForm({ ...form, RequiredQualification: e.target.value })
            }
            placeholder="Required qualification"
            className="rounded-2xl border border-blue-100 bg-blue-50/50 px-4 py-3.5 text-sm font-medium outline-none focus:border-blue-500 focus:bg-white"
          />

          <button
            type="submit"
            className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-700 to-cyan-500 px-6 py-3.5 text-sm font-black text-white shadow-xl shadow-blue-500/30 transition-all hover:scale-105 hover:from-cyan-500 hover:to-blue-700 active:scale-95"
          >
            <Plus size={18} />
            {editId ? "Update" : "Add"}
          </button>

          {editId && (
            <button
              type="button"
              onClick={resetForm}
              className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-black text-slate-600 transition hover:bg-slate-100"
            >
              <X size={18} />
              Cancel
            </button>
          )}
        </form>

        <div className="mt-6 overflow-hidden rounded-2xl border border-blue-100">
          <table className="w-full text-left text-sm">
            <thead className="bg-blue-50 text-slate-700">
              <tr>
                <th className="px-5 py-4 font-black">ID</th>
                <th className="px-5 py-4 font-black">Position</th>
                <th className="px-5 py-4 font-black">Qualification</th>
                <th className="px-5 py-4 text-right font-black">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-blue-50">
              {positions.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-5 py-8 text-center text-slate-500">
                    No positions found
                  </td>
                </tr>
              ) : (
                positions.map((position) => (
                  <tr key={position.PosID} className="transition hover:bg-blue-50/50">
                    <td className="px-5 py-4 font-black text-blue-700">
                      #{position.PosID}
                    </td>
                    <td className="px-5 py-4 font-bold text-slate-900">
                      {position.PosName}
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      {position.RequiredQualification}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEdit(position)}
                          className="rounded-xl bg-blue-50 p-2.5 text-blue-700 transition hover:scale-110 hover:bg-blue-600 hover:text-white"
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          onClick={() => handleDelete(position.PosID)}
                          className="rounded-xl bg-red-50 p-2.5 text-red-600 transition hover:scale-110 hover:bg-red-600 hover:text-white"
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

export default Positions;