import { useEffect, useState } from "react";
import {
  Pencil,
  Trash2,
  Plus,
  Search,
  Users,
  X,
  RefreshCw,
} from "lucide-react";
import { toast } from "react-toastify";
import api from "../api/axios";

const initialForm = {
  EmpFirstName: "",
  EmpLastName: "",
  EmpGender: "",
  EmpDateOfBirth: "",
  EmpEmail: "",
  EmpTelephone: "",
  EmpAddress: "",
  EmpHireDate: "",
  EmpStatus: "",
  DepartID: "",
  PosID: "",
};

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [positions, setPositions] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editId, setEditId] = useState(null);
  const [keyword, setKeyword] = useState("");

  const fetchEmployees = async () => {
    try {
      const res = await api.get("/employees");
      setEmployees(res.data);
    } catch {
      toast.error("Failed to load employees");
    }
  };

  const fetchDropdownData = async () => {
    try {
      const depRes = await api.get("/departments");
      const posRes = await api.get("/positions");
      setDepartments(depRes.data);
      setPositions(posRes.data);
    } catch {
      toast.error("Failed to load form data");
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchDropdownData();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasEmptyField = Object.values(form).some((value) => !value);

    if (hasEmptyField) {
      toast.error("All employee fields are required");
      return;
    }

    try {
      if (editId) {
        await api.put(`/employees/${editId}`, form);
        toast.success("Employee updated successfully");
      } else {
        await api.post("/employees", form);
        toast.success("Employee added successfully");
      }

      resetForm();
      fetchEmployees();
    } catch (error) {
      toast.error(error.response?.data?.message || "Operation failed");
    }
  };

  const handleEdit = (employee) => {
    setEditId(employee.EmpID);

    setForm({
      EmpFirstName: employee.EmpFirstName,
      EmpLastName: employee.EmpLastName,
      EmpGender: employee.EmpGender,
      EmpDateOfBirth: employee.EmpDateOfBirth?.slice(0, 10),
      EmpEmail: employee.EmpEmail,
      EmpTelephone: employee.EmpTelephone,
      EmpAddress: employee.EmpAddress,
      EmpHireDate: employee.EmpHireDate?.slice(0, 10),
      EmpStatus: employee.EmpStatus,
      DepartID: employee.DepartID,
      PosID: employee.PosID,
    });
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this employee?")) return;

    try {
      await api.delete(`/employees/${id}`);
      toast.success("Employee deleted successfully");
      fetchEmployees();
    } catch {
      toast.error("Failed to delete employee");
    }
  };

  const handleSearch = async () => {
    if (!keyword.trim()) {
      fetchEmployees();
      return;
    }

    try {
      const res = await api.get(`/employees/search/${keyword}`);
      setEmployees(res.data);
    } catch {
      toast.error("Search failed");
    }
  };

  return (
    <div className="space-y-7">
      <div className="flex items-center justify-between rounded-[2rem] bg-gradient-to-r from-blue-800 to-cyan-500 p-7 text-white shadow-2xl shadow-blue-500/30">
        <div>
          <p className="text-sm font-black uppercase tracking-widest text-blue-100">
            Employees
          </p>
          <h1 className="mt-2 text-3xl font-black">Manage Employees</h1>
          <p className="mt-2 text-sm text-blue-50">
            Add, update, search, and delete employee records.
          </p>
        </div>

        <Users size={54} className="hidden opacity-80 md:block" />
      </div>

      <div className="rounded-[1.7rem] border border-blue-100 bg-white p-6 shadow-xl shadow-blue-100/60">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-slate-900">
              {editId ? "Update Employee" : "Register Employee"}
            </h2>
            <p className="text-sm text-slate-500">
              Fill all fields before saving employee record.
            </p>
          </div>

          {editId && (
            <button
              type="button"
              onClick={resetForm}
              className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-black text-slate-600 transition hover:bg-slate-100"
            >
              <X size={17} />
              Cancel
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-3">
          <Input
            name="EmpFirstName"
            value={form.EmpFirstName}
            onChange={handleChange}
            placeholder="First name"
          />

          <Input
            name="EmpLastName"
            value={form.EmpLastName}
            onChange={handleChange}
            placeholder="Last name"
          />

          <Select
            name="EmpGender"
            value={form.EmpGender}
            onChange={handleChange}
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </Select>

          <Input
            type="date"
            name="EmpDateOfBirth"
            value={form.EmpDateOfBirth}
            onChange={handleChange}
          />

          <Input
            type="email"
            name="EmpEmail"
            value={form.EmpEmail}
            onChange={handleChange}
            placeholder="Email address"
          />

          <Input
            name="EmpTelephone"
            value={form.EmpTelephone}
            onChange={handleChange}
            placeholder="Telephone"
          />

          <Input
            name="EmpAddress"
            value={form.EmpAddress}
            onChange={handleChange}
            placeholder="Address"
          />

          <Input
            type="date"
            name="EmpHireDate"
            value={form.EmpHireDate}
            onChange={handleChange}
          />

          <Select
            name="EmpStatus"
            value={form.EmpStatus}
            onChange={handleChange}
          >
            <option value="">Select status</option>
            <option value="on leave">On leave</option>
            <option value="left">Left</option>
            <option value="blacklisted">Blacklisted</option>
            <option value="deceased">Deceased</option>
            <option value="on mission">On mission</option>
          </Select>

          <Select
            name="DepartID"
            value={form.DepartID}
            onChange={handleChange}
          >
            <option value="">Select department</option>
            {departments.map((dep) => (
              <option key={dep.DepartID} value={dep.DepartID}>
                {dep.DepartName}
              </option>
            ))}
          </Select>

          <Select name="PosID" value={form.PosID} onChange={handleChange}>
            <option value="">Select position</option>
            {positions.map((pos) => (
              <option key={pos.PosID} value={pos.PosID}>
                {pos.PosName}
              </option>
            ))}
          </Select>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-700 to-cyan-500 px-6 py-3.5 text-sm font-black text-white shadow-xl shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:from-cyan-500 hover:to-blue-700 hover:shadow-2xl active:scale-95"
          >
            <Plus size={18} />
            {editId ? "Update Employee" : "Add Employee"}
          </button>
        </form>
      </div>

      <div className="rounded-[1.7rem] border border-blue-100 bg-white p-6 shadow-xl shadow-blue-100/60">
        <div className="mb-5 flex flex-col gap-3 md:flex-row">
          <div className="flex w-full items-center gap-3 rounded-2xl border border-blue-100 bg-blue-50/50 px-4 transition focus-within:border-blue-500 focus-within:bg-white">
            <Search size={19} className="text-blue-600" />
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Search by name, email, phone, department, position or status"
              className="w-full bg-transparent py-3.5 text-sm font-medium outline-none"
            />
          </div>

          <button
            onClick={handleSearch}
            className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-700 to-cyan-500 px-6 py-3.5 text-sm font-black text-white shadow-xl shadow-blue-500/30 transition-all hover:scale-105 hover:from-cyan-500 hover:to-blue-700"
          >
            <Search size={18} />
            Search
          </button>

          <button
            onClick={() => {
              setKeyword("");
              fetchEmployees();
              toast.success("Employee list refreshed");
            }}
            className="flex items-center justify-center gap-2 rounded-2xl border border-blue-100 bg-blue-50 px-6 py-3.5 text-sm font-black text-blue-700 transition hover:scale-105 hover:bg-blue-700 hover:text-white"
          >
            <RefreshCw size={18} />
            Reset
          </button>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-blue-100">
          <table className="w-full min-w-[1100px] text-left text-sm">
            <thead className="bg-blue-50 text-slate-700">
              <tr>
                <th className="px-5 py-4 font-black">Name</th>
                <th className="px-5 py-4 font-black">Gender</th>
                <th className="px-5 py-4 font-black">Email</th>
                <th className="px-5 py-4 font-black">Telephone</th>
                <th className="px-5 py-4 font-black">Department</th>
                <th className="px-5 py-4 font-black">Position</th>
                <th className="px-5 py-4 font-black">Status</th>
                <th className="px-5 py-4 text-right font-black">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-blue-50">
              {employees.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-5 py-8 text-center text-slate-500">
                    No employees found
                  </td>
                </tr>
              ) : (
                employees.map((emp) => (
                  <tr key={emp.EmpID} className="transition hover:bg-blue-50/50">
                    <td className="px-5 py-4 font-black text-slate-900">
                      {emp.EmpFirstName} {emp.EmpLastName}
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
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEdit(emp)}
                          className="rounded-xl bg-blue-50 p-2.5 text-blue-700 transition hover:scale-110 hover:bg-blue-600 hover:text-white"
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          onClick={() => handleDelete(emp.EmpID)}
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

function Input({ type = "text", name, value, onChange, placeholder }) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="rounded-2xl border border-blue-100 bg-blue-50/50 px-4 py-3.5 text-sm font-medium outline-none transition focus:border-blue-500 focus:bg-white"
    />
  );
}

function Select({ name, value, onChange, children }) {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="rounded-2xl border border-blue-100 bg-blue-50/50 px-4 py-3.5 text-sm font-medium outline-none transition focus:border-blue-500 focus:bg-white"
    >
      {children}
    </select>
  );
}

export default Employees;