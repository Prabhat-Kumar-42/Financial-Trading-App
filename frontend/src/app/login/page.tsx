"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import API from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";

// /src/app/login/page.tsx
export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useAuth();

  const handleChange = (e: any) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      // support both shapes: { token, user } or { success: true, data: { token, user } }
      const payload = res.data?.data ?? res.data;
      const token = payload?.token ?? payload?.accessToken;
      const user = payload?.user ?? payload?.user;
      if (!token) throw new Error("No token returned");
      login(token, user ?? { id: "", name: "", email: form.email });
    } catch (err: any) {
      alert(err.response?.data?.error || err.message);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button type="submit" className="bg-green-600 text-white p-2 rounded">
          Login
        </button>
      </form>
      <p className="mt-4 text-sm text-gray-600 text-center">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-blue-600 hover:underline">Sign up here</Link>
      </p>
    </div>
  );
}
