"use client";
import { useState } from "react";
import Link from "next/link";
import API from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";
import { Skeleton } from "@/components/Skeleton";

// /src/app/signup/page.tsx
export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "", pan: "" });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false); // NEW
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
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl mb-4">Signup</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        {loading ? (
          <>
            <Skeleton className="h-10 w-full mb-2" />
            <Skeleton className="h-10 w-full mb-2" />
            <Skeleton className="h-10 w-full mb-2" />
            <Skeleton className="h-10 w-full mb-2" />
            <Skeleton className="h-10 w-full" />
          </>
        ) : (
          <>
            <input name="name" placeholder="Name" onChange={handleChange} className="border p-2 rounded" />
            <input name="email" placeholder="Email" onChange={handleChange} className="border p-2 rounded" />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} className="border p-2 rounded" />
            <input name="pan" placeholder="PAN Number" onChange={handleChange} className="border p-2 rounded" />
            <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
            <button type="submit" className="bg-blue-600 text-white p-2 rounded">
              Signup
            </button>
          </>
        )}
      </form>
      <p className="mt-4 text-sm text-gray-600 text-center">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-600 hover:underline font-semibold">
          Log in here
        </Link>
      </p>
    </div>
  );
}
