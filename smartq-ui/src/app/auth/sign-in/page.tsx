"use client";
import React, { useState } from "react";

export default function SignInPage() {
  const [form, setForm] = useState({
    firstName: "Kevin",
    lastName: "Silva",
    phone: "+94 76 888 88 88",
    language: "English",
    email: "Kevinsilva@gmail.com",
    password: "",
  });

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://d2fi3g03kp79b8.cloudfront.net/uploads/Queue_Management_System_Hero_Banner_93dd9940e9.jpg')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Sign-in Card */}
      <div className="relative z-10 w-full max-w-md bg-white/95 backdrop-blur-md border border-purple-300 rounded-3xl shadow-xl p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6text-[#3589c7]">
          Sign in to manage your property
        </h1>

        <div className="space-y-5">
          {/* First Name */}
          <div>
            <label className="block text-gray-900 font-medium mb-2">
              First name
            </label>
            <input
              type="text"
              value={form.firstName}
              onChange={(e) =>
                setForm({ ...form, firstName: e.target.value })
              }
              className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-gray-900 font-medium mb-2">
              Last name
            </label>
            <input
              type="text"
              value={form.lastName}
              onChange={(e) =>
                setForm({ ...form, lastName: e.target.value })
              }
              className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-900 font-medium mb-2">
              Phone number
            </label>
            <input
              type="text"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Language */}
          <div>
            <label className="block text-gray-900 font-medium mb-2">
              Language preference
            </label>
            <div className="relative">
              <select
                value={form.language}
                onChange={(e) =>
                  setForm({ ...form, language: e.target.value })
                }
                className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:border-purple-500 appearance-none bg-white"
              >
                <option>English</option>
                <option>Sinhala</option>
                <option>Tamil</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-900 font-medium mb-2">
              Email address
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-gray-900 font-medium">
                Password
              </label>
              <a
                href="#"
                className="text-blue-600 hover:underline text-sm"
              >
                Forgot password?
              </a>
            </div>
            <input
              type="password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:border-purple-500"
              placeholder="••••••••••••"
            />
          </div>
        </div>

        {/* Button */}
        <button className="mt-8 w-full bg-blue-500 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold text-lg transition-colors">
          Continue
        </button>

        <p className="text-center text-gray-600 mt-6 text-sm">
          Not a member?{" "}
          <a
            href="#"
            className="text-blue-600 hover:underline font-medium"
          >
            Start a 14 day free trial
          </a>
        </p>
      </div>
    </div>
  );
}
