"use client";

import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa6";
import ShowToastify from "@/utils/ShowToastify";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useRegisterUserMutation } from "@/redux/features/auth/userApi";

const RegistrationFrom = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState("Sign up");
  const [registerUser] = useRegisterUserMutation();
  const router = useRouter();

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading("Loading...");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email")?.toString().trim();
    const password = formData.get("password")?.toString();

    if ( !email || !password) {
      ShowToastify({ error: "All fields are required." });
      setLoading("Sign up");
      return;
    }

    const { data, error } = await registerUser({
      email,
      password,
    });

    if (error || !data?.success) {
      ShowToastify({ error: data?.message || "Registration failed." });
      setLoading("Sign up");
      return;
    }

    ShowToastify({ success: "Account created successfully!" });
    router.push("/login");
  };

  return (
    <form onSubmit={handleSignUp} className="mt-8 space-y-6">
      <div className="space-y-4 rounded-md">

        {/* Email */}
        <div>
          <label htmlFor="email" className="text-sm text-gray-500">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="info@email.com"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-green-500 focus:outline-none focus:ring-green-500"
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="text-sm text-gray-500">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-green-500 focus:outline-none focus:ring-green-500"
            />
            <div className="absolute right-3 top-3">
              <button
                type="button"
                className="text-xl"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <IoEyeSharp />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Login link */}
      <div className="flex items-center justify-end">
        <Link
          href="/login"
          className="text-xs text-gray-500 hover:text-green-600"
        >
          Already have an account?
        </Link>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      >
        {loading}
      </button>
    </form>
  );
};

export default RegistrationFrom;
