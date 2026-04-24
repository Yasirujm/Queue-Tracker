"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateAccountPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 relative bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1920&q=80')",
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Center Card */}
      <div className="relative z-10 max-w-md w-full bg-white/90 backdrop-blur-md border border-purple-300 rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-3 text-purple-700">
          Create your partner account
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Create an account to list and manage your property.
        </p>

        <label className="block text-gray-900 font-semibold text-md mb-3">
          Email address
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border-2 border-gray-200 rounded-lg px-4 py-2 text-lg mb-6 focus:outline-none focus:border-purple-500"
          placeholder="Enter your email"
        />

        <button
          onClick={() => router.push("/auth/property-type")}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold text-md mb-8 transition-colors"
        >
          Continue
        </button>

        <div className="border-t border-gray-300 pt-6">
          <p className="text-center text-gray-600 mb-6 text-sm">
            Do you have questions about your property? Visit{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Help
            </a>
            .
          </p>

          <button
            onClick={() => router.push("/auth/sign-in")}
            className="w-full border-2 border-purple-600 text-purple-600 hover:bg-purple-50 py-2 rounded-md font-semibold text-lg mb-4 transition-colors"
          >
            Sign in
          </button>

          <p className="text-center text-gray-600 text-sm">
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
    </div>
  );
}
