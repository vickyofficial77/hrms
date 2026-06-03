import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Rocket, User, Lock, IdCard } from "lucide-react";
import { toast } from "react-toastify";
import api from "../api/axios";

function Login() {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);

  const [loginForm, setLoginForm] = useState({
    UserName: "",
    Password: "",
  });

  const [registerForm, setRegisterForm] = useState({
    EmpID: "",
    UserName: "",
    Password: "",
    ConfirmPassword: "",
  });

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await api.post("/auth/login", loginForm);

    localStorage.setItem(
      "user",
      JSON.stringify(res.data.user)
    );

    toast.success("Login successful");

    navigate("/dashboard");
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Login failed"
    );
  }
};

  const handleRegister = async (e) => {
    e.preventDefault();

    if (
      !registerForm.EmpID ||
      !registerForm.UserName ||
      !registerForm.Password ||
      !registerForm.ConfirmPassword
    ) {
      toast.error("Please fill all registration fields");
      return;
    }

    if (registerForm.Password !== registerForm.ConfirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await api.post("/auth/register", {
        EmpID: registerForm.EmpID,
        UserName: registerForm.UserName,
        Password: registerForm.Password,
      });

      toast.success("Account created successfully");

      setRegisterForm({
        EmpID: "",
        UserName: "",
        Password: "",
        ConfirmPassword: "",
      });

      setIsRegister(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-slate-200 via-slate-100 to-blue-100 px-4 py-4">
      <div className="flex min-h-[calc(100vh-2rem)] items-center justify-center">
        <div className="grid w-full max-w-6xl overflow-hidden rounded-[2rem] bg-white shadow-2xl md:min-h-[84vh] md:grid-cols-[0.92fr_1.08fr]">
          <div className="relative hidden overflow-hidden bg-gradient-to-b from-blue-800 via-blue-700 to-sky-500 text-white md:flex md:flex-col md:items-center md:justify-center">
            <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl" />
            <div className="absolute right-[-50px] top-0 h-full w-28 rounded-l-full bg-white" />

            <div className="relative z-10 flex flex-col items-center px-10 text-center">
              <p className="mb-8 text-xl font-semibold">Welcome to</p>

              <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white text-blue-700 shadow-2xl shadow-blue-900/30 transition duration-300 hover:scale-110">
                <Rocket size={48} />
              </div>

              <h1 className="text-5xl font-black tracking-tight">HRMS</h1>

              <p className="mt-8 max-w-sm text-sm leading-7 text-blue-50">
                Manage employees, departments, positions, accounts, and reports
                in one clean professional system.
              </p>

              <div className="mt-10 grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-2xl bg-white/15 px-5 py-4 backdrop-blur">
                  Employee Records
                </div>
                <div className="rounded-2xl bg-white/15 px-5 py-4 backdrop-blur">
                  Secure Access
                </div>
              </div>
            </div>
          </div>

          <div className="flex max-h-[calc(100vh-2rem)] items-center justify-center overflow-y-auto px-6 py-8 sm:px-10">
            <div className="w-full max-w-lg">
              <div className="mb-7 flex gap-2 rounded-2xl bg-slate-100 p-1.5 shadow-inner">
                <button
                  type="button"
                  onClick={() => setIsRegister(false)}
                  className={`w-1/2 rounded-xl py-3 text-sm font-extrabold transition-all duration-300 ${
                    !isRegister
                      ? "scale-[1.03] bg-blue-700 text-white shadow-xl shadow-blue-500/40"
                      : "bg-white text-slate-700 shadow-sm hover:scale-[1.03] hover:bg-blue-100 hover:text-blue-800 hover:shadow-lg"
                  }`}
                >
                  Sign In
                </button>

                <button
                  type="button"
                  onClick={() => setIsRegister(true)}
                  className={`w-1/2 rounded-xl py-3 text-sm font-extrabold transition-all duration-300 ${
                    isRegister
                      ? "scale-[1.03] bg-blue-700 text-white shadow-xl shadow-blue-500/40"
                      : "bg-white text-slate-700 shadow-sm hover:scale-[1.03] hover:bg-blue-100 hover:text-blue-800 hover:shadow-lg"
                  }`}
                >
                  Sign Up
                </button>
              </div>

              <h2 className="mb-2 text-center text-3xl font-black text-slate-800">
                {isRegister ? "Create your account" : "Sign in to your account"}
              </h2>

              <p className="mb-7 text-center text-sm text-slate-500">
                {isRegister
                  ? "Create your own Employee ID, username and password."
                  : "Enter your username and password to continue."}
              </p>

              {isRegister ? (
                <form onSubmit={handleRegister} className="space-y-4">
                  <Input
                    icon={<IdCard size={18} />}
                    label="Employee ID"
                    placeholder="Example: EMP001"
                    value={registerForm.EmpID}
                    onChange={(e) =>
                      setRegisterForm({
                        ...registerForm,
                        EmpID: e.target.value,
                      })
                    }
                  />

                  <Input
                    icon={<User size={18} />}
                    label="Username"
                    placeholder="Create username"
                    value={registerForm.UserName}
                    onChange={(e) =>
                      setRegisterForm({
                        ...registerForm,
                        UserName: e.target.value,
                      })
                    }
                  />

                  <Input
                    icon={<Lock size={18} />}
                    label="Password"
                    type="password"
                    placeholder="Create password"
                    value={registerForm.Password}
                    onChange={(e) =>
                      setRegisterForm({
                        ...registerForm,
                        Password: e.target.value,
                      })
                    }
                  />

                  <Input
                    icon={<Lock size={18} />}
                    label="Confirm Password"
                    type="password"
                    placeholder="Confirm password"
                    value={registerForm.ConfirmPassword}
                    onChange={(e) =>
                      setRegisterForm({
                        ...registerForm,
                        ConfirmPassword: e.target.value,
                      })
                    }
                  />

                  <button
                    type="submit"
                    className="mt-3 w-full rounded-2xl bg-gradient-to-r from-blue-700 to-cyan-500 py-4 text-base font-black text-white shadow-xl shadow-blue-500/40 transition-all duration-300 hover:scale-105 hover:from-cyan-500 hover:to-blue-700 hover:shadow-2xl hover:shadow-cyan-500/40 active:scale-95"
                  >
                    Create Account
                  </button>

                  <p className="text-center text-xs text-slate-500">
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setIsRegister(false)}
                      className="font-bold text-blue-700 hover:text-cyan-600"
                    >
                      Sign in
                    </button>
                  </p>
                </form>
              ) : (
                <form onSubmit={handleLogin} className="space-y-5">
                  <Input
                    icon={<User size={18} />}
                    label="Username"
                    placeholder="Enter username"
                    value={loginForm.UserName}
                    onChange={(e) =>
                      setLoginForm({
                        ...loginForm,
                        UserName: e.target.value,
                      })
                    }
                  />

                  <Input
                    icon={<Lock size={18} />}
                    label="Password"
                    type="password"
                    placeholder="Enter password"
                    value={loginForm.Password}
                    onChange={(e) =>
                      setLoginForm({
                        ...loginForm,
                        Password: e.target.value,
                      })
                    }
                  />

                  <button
                    type="submit"
                    className="mt-3 w-full rounded-2xl bg-gradient-to-r from-blue-700 to-cyan-500 py-4 text-base font-black text-white shadow-xl shadow-blue-500/40 transition-all duration-300 hover:scale-105 hover:from-cyan-500 hover:to-blue-700 hover:shadow-2xl hover:shadow-cyan-500/40 active:scale-95"
                  >
                    Sign In
                  </button>

                  <p className="text-center text-xs text-slate-500">
                    Do not have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setIsRegister(true)}
                      className="font-bold text-blue-700 hover:text-cyan-600"
                    >
                      Sign up
                    </button>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Input({ icon, label, type = "text", placeholder, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-extrabold text-slate-700">
        {label}
      </label>

      <div className="mt-1 flex items-center gap-3 border-b-2 border-sky-200 pb-2.5 text-slate-400 transition-all duration-300 focus-within:border-blue-600">
        {icon}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required
          className="w-full bg-transparent text-sm font-medium text-slate-700 outline-none placeholder:text-slate-300"
        />
      </div>
    </div>
  );
}

export default Login;