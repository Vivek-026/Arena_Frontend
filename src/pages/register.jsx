import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import register from "../api/registerApi";
import { authLogin } from "../auth/auth-slice";
import { useDispatch } from "react-redux";

function Register() {
  const [role, setRole] = useState("user");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async () => {
    try {
      const data = { name, email, password, role };
      const response = await register(data);
      const token = response.data.data.token;
      dispatch(authLogin(response.data.data));
      if (token) {
        alert("Account created successfully");
        navigate("/");
      }
    } catch (error) {
      alert("Registration failed. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 px-4">
      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>

      <div className="relative bg-white/80 backdrop-blur-md w-full max-w-md rounded-2xl shadow-2xl border border-white/20 p-8 transform transition-all duration-300 hover:shadow-3xl">
        <div className="text-center mb-8">
          <div className="mb-6">
            <div className="relative inline-block">
              <h1 className="text-5xl font-black tracking-tight bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2 relative">
                ARENA
              </h1>
              <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-full transform scale-x-75"></div>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Create Your Account
          </h2>
          <p className="text-gray-600 text-sm">Sign up to get started</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm mb-1">Full Name</label>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-12 px-4 border border-gray-300 rounded-md text-gray-900 bg-transparent focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm mb-1">Email Address</label>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 px-4 border border-gray-300 rounded-md text-gray-900 bg-transparent focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm mb-1">Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 px-4 border border-gray-300 rounded-md text-gray-900 bg-transparent focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm mb-1">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full h-12 px-4 border border-gray-300 rounded-md text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              <option value="user">User</option>
              <option value="owner">Owner</option>
            </select>
          </div>

          <div className="mt-4">
            <button
              onClick={onSubmit}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3.5 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transform hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 shadow-lg"
            >
              Create Account
            </button>
          </div>

          <div className="text-center mt-6">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-green-600 hover:text-green-700 font-semibold"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
