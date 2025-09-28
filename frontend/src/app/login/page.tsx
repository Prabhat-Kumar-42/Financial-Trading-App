"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import API from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";
import { Skeleton } from "@/components/Skeleton";

// /src/app/login/page.tsx
export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false); // NEW
  const { login } = useAuth();

  const handleChange = (e: any) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true); // show skeleton / loading
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
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        {loading ? (
          <>
            <Skeleton className="h-10 w-full mb-2" />
            <Skeleton className="h-10 w-full mb-2" />
            <Skeleton className="h-10 w-full" />
          </>
        ) : (
          <>
            <input
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <button
              type="submit"
              className="bg-green-600 text-white p-2 rounded"
            >
              Login
            </button>
          </>
        )}
      </form>
      <p className="mt-4 text-sm text-gray-600 text-center">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-blue-600 hover:underline font-semibold">
          Sign up here
        </Link>
      </p>
    </div>
  );
}
