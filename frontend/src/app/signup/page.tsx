"use client";
import { useState } from "react";
import API from "@/lib/api";
import { useRouter } from "next/navigation";

// /src/app/signup/page.tsx
export default function Signup() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", pan: "" });
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => data.append(k, v));
    if (file) data.append("kycDoc", file);

    const res = await API.post("/auth/signup", data);
    localStorage.setItem("token", res.data.token);
    router.push("/products");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl mb-4">Signup</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input name="name" placeholder="Name" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} />
        <input name="pan" placeholder="PAN Number" onChange={handleChange} />
        <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">Signup</button>
      </form>
    </div>
  );
}
