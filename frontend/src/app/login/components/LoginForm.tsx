"use client";

import { useState } from "react";
import Link from "next/link";

interface LoginFormProps {
  onLogin: (form: { email: string; password: string }) => void;
}

export default function LoginForm({ onLogin }: LoginFormProps) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Inline validation
    validateField(name, value);
  };

  const validateField = (name: string, value: string) => {
    let error = "";

    if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
      error = "Invalid email";
    }

    if (name === "password" && value.length < 6) {
      error = "Password must be at least 6 characters";
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields before submitting
    Object.entries(form).forEach(([name, value]) =>
      validateField(name, value)
    );

    // Prevent submission if there are errors
    if (Object.values(errors).some(Boolean)) return;

    setLoading(true);
    onLogin(form);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Email */}
      <div>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className={`border p-3 rounded w-full focus:outline-none focus:ring-2 ${
            errors.email ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-500"
          }`}
          required
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      {/* Password */}
      <div className="relative">
        <input
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Password (min 6 characters)"
          value={form.password}
          onChange={handleChange}
          className={`border p-3 rounded w-full focus:outline-none focus:ring-2 ${
            errors.password ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-500"
          }`}
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-600"
        >
          {showPassword ? "Hide" : "Show"}
        </button>
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded font-semibold transition disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      {/* Signup Link */}
      <p className="text-sm text-gray-600 text-center">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-blue-600 hover:underline font-semibold">
          Sign up here
        </Link>
      </p>
    </form>
  );
}
