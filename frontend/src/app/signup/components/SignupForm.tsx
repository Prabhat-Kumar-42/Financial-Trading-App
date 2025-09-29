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

export default function SignupForm({ onSignup }: SignupFormProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    pan: "",
  });
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignup({ ...form, file });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
      encType="multipart/form-data"
    >
      <input
        name="name"
        placeholder="Name"
        onChange={handleChange}
        className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
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
      <input
        name="pan"
        placeholder="PAN Number"
        onChange={handleChange}
        className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="block w-full text-sm text-gray-500
             file:mr-4 file:py-2 file:px-4
             file:rounded file:border-0
             file:bg-blue-600 file:text-white
             file:font-semibold
             hover:file:bg-blue-700
             focus:outline-none focus:ring-2 focus:ring-blue-500
             border border-gray-300 p-2 rounded"
      />

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded font-semibold transition"
      >
        Signup
      </button>

      <p className="text-sm text-gray-600 text-center">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-blue-600 hover:underline font-semibold"
        >
          Log in here
        </Link>
      </p>
    </form>
  );
}
