"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import API from "@/lib/api";
import toast from "react-hot-toast";
import SignupForm from "./components/SignupForm";
import SignupSkeleton from "./components/SignupSkeleton";

export default function SignupPage() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSignup = async (form: {
    name: string;
    email: string;
    password: string;
    pan: string;
    file: File | null;
  }) => {
    setLoading(true);
    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => {
      if (k === "file" && v) {
        data.append("kycDoc", v);
      } else if (typeof v === "string") {
        data.append(k, v);
      }
    });

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
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Signup
        </h1>

        {loading ? <SignupSkeleton /> : <SignupForm onSignup={handleSignup} />}
      </div>
    </div>
  );
}
