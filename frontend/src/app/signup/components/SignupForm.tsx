"use client";

import { useState } from "react";
import Link from "next/link";

interface SignupFormProps {
  onSignup: (form: {
    name: string;
    email: string;
    password: string;
    pan: string;
    file: File | null;
  }) => void;
}

const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]$/i;

export default function SignupForm({ onSignup }: SignupFormProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    pan: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Inline validation
    validateField(name, value);
  };

  const validateField = (name: string, value: string) => {
    let error = "";

    if (name === "name" && value.trim().length < 2) {
      error = "Name must be at least 2 characters";
    }

    if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
      error = "Invalid email";
    }

    if (name === "password" && value.length < 6) {
      error = "Password must be at least 6 characters";
    }

    if (name === "pan") {
      if (value.length !== 10) {
        error = "PAN must be 10 characters";
      } else if (!PAN_REGEX.test(value)) {
        error = "PAN format is invalid (expected format: AAAAA9999A)";
      }
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
    onSignup({ ...form, file });
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
      encType="multipart/form-data"
    >
      {/* Name */}
      <div>
        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className={`border p-3 rounded w-full focus:outline-none focus:ring-2 ${
            errors.name ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-500"
          }`}
          required
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      {/* Email */}
      <div>
        <input
          name="email"
          type="email"
          placeholder="Email Address"
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

      {/* PAN */}
      <div>
        <input
          name="pan"
          placeholder="PAN Number (e.g. AAAAA9999A)"
          value={form.pan}
          onChange={handleChange}
          className={`border p-3 rounded w-full focus:outline-none focus:ring-2 ${
            errors.pan ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-500"
          }`}
          required
        />
        {errors.pan && <p className="text-red-500 text-sm">{errors.pan}</p>}
      </div>

      {/* File Upload */}
      <div>
        <label className="block text-sm font-medium mb-1">Upload KYC Document</label>
        <input
          type="file"
          accept=".jpg,.jpeg,.png,.pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 border border-gray-300 p-2 rounded"
        />
        {file && <span className="text-sm text-gray-600 mt-1">Selected file: {file.name}</span>}
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded font-semibold transition disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Signing up..." : "Signup"}
      </button>

      {/* Login Link */}
      <p className="text-sm text-gray-600 text-center">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-600 hover:underline font-semibold">
          Log in here
        </Link>
      </p>
    </form>
  );
}
