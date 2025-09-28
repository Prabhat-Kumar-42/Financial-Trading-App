"use client";
import { useState } from "react";
import Link from "next/link";
import API from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";

// /src/app/signup/page.tsx
export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    pan: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const { login } = useAuth();

  const handleChange = (e: any) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => data.append(k, v as string));
    if (file) data.append("kycDoc", file);

    try {
      const res = await API.post("/auth/signup", data);
      const payload = res.data?.data ?? res.data;
      const token = payload?.token ?? res.data?.token;
      const user = payload?.user ?? payload?.user;
      if (!token) {
        // fallback if your signup response returns token differently
        if (res.data?.token) {
          login(
            res.data.token,
            res.data.user ?? { id: "", name: form.name, email: form.email }
          );
          return;
        }
        throw new Error("No token returned from signup");
      }
      login(token, user ?? { id: "", name: form.name, email: form.email });
    } catch (err: any) {
      //alert(err.response?.data?.error || err.message);
      toast.error('signup  failed: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl mb-4">Signup</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input name="name" placeholder="Name" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <input name="pan" placeholder="PAN Number" onChange={handleChange} />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Signup
        </button>
      </form>
      <p className="mt-4 text-sm text-gray-600 text-center">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-600 hover:underline">Log in here</Link>
      </p>
    </div>
  );
}
