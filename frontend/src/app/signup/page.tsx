"use client";

import { useState } from "react";
import Link from "next/link";
import API from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";
import { Skeleton } from "@/components/Skeleton";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    pan: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleChange = (e: any) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => data.append(k, v as string));
    if (file) data.append("kycDoc", file);

    try {
      const res = await API.post("/auth/signup", data);
      const payload = res.data?.data ?? res.data;
      const token = payload?.token ?? res.data?.token;
      const user = payload?.user ?? payload?.user;
      if (!token) throw new Error("No token returned from signup");
      login(token, user ?? { id: "", name: form.name, email: form.email });
    } catch (err: any) {
      toast.error(
        "Signup failed: " + (err.response?.data?.message || err.message)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 space-y-6">
        {/* Page Title */}
        <h1 className="text-2xl font-bold text-center text-gray-800">Signup</h1>

        {/* Signup Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
          encType="multipart/form-data"
        >
          {loading ? (
            <>
              <Skeleton className="h-10 w-full rounded" />
              <Skeleton className="h-10 w-full rounded" />
              <Skeleton className="h-10 w-full rounded" />
              <Skeleton className="h-10 w-full rounded" />
              <Skeleton className="h-10 w-full rounded" />
            </>
          ) : (
            <>
              <input
                name="name"
                placeholder="Name"
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                name="pan"
                placeholder="PAN Number"
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="block w-full text-sm text-gray-500
             file:mr-4 file:py-2 file:px-4
             file:rounded file:border-0
             file:bg-blue-600 file:text-white
             file:font-semibold
             hover:file:bg-blue-700
             focus:outline-none focus:ring-2 focus:ring-blue-500
             border border-gray-300 p-2 rounded"
              />

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded font-semibold transition"
              >
                {loading ? "Signing up..." : "Signup"}
              </button>
            </>
          )}
        </form>

        {/* Login link */}
        <p className="text-sm text-gray-600 text-center">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-600 hover:underline font-semibold"
          >
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
}
