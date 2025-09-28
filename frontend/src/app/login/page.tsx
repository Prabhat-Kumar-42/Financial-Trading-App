"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import API from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";
import { Skeleton } from "@/components/Skeleton";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleChange = (e: any) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/auth/login", form);
      const payload = res.data?.data ?? res.data;
      const token = payload?.token ?? payload?.accessToken;
      const user = payload?.user ?? payload?.user;
      if (!token) throw new Error("No token returned");
      login(token, user ?? { id: "", name: "", email: form.email });
    } catch (err: any) {
      toast.error(
        "Login failed: " + (err.response?.data?.message || err.message)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 space-y-6">
        {/* Page Title */}
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Login
        </h1>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {loading ? (
            <>
              <Skeleton className="h-10 w-full rounded" />
              <Skeleton className="h-10 w-full rounded" />
              <Skeleton className="h-10 w-full rounded" />
            </>
          ) : (
            <>
              <input
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded font-semibold transition"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </>
          )}
        </form>

        {/* Sign up link */}
        <p className="text-sm text-gray-600 text-center">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-blue-600 hover:underline font-semibold"
          >
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
}
