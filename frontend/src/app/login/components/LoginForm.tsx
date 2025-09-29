"use client";

import { useState } from "react";
import Link from "next/link";

interface LoginFormProps {
  onLogin: (form: { email: string; password: string }) => void;
}

export default function LoginForm({ onLogin }: LoginFormProps) {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(form);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded font-semibold transition"
      >
        Login
      </button>

      <p className="text-sm text-gray-600 text-center">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="text-blue-600 hover:underline font-semibold"
        >
          Sign up here
        </Link>
      </p>
    </form>
  );
}
