"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import API from "@/lib/api";
import toast from "react-hot-toast";
import LoginForm from "./components/LoginForm";
import LoginSkeleton from "./components/LoginSkeleton";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (form: { email: string; password: string }) => {
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
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Login
        </h1>

        {loading ? <LoginSkeleton /> : <LoginForm onLogin={handleLogin} />}

      </div>
    </div>
  );
}
