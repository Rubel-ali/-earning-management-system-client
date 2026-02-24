/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa6";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { useResetPasswordMutation } from "@/redux/features/auth/userApi";

const NewPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("new-password");
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Email is missing!");
      return;
    }

    try {
      const payload = { email, password };
      const res = await resetPassword(payload).unwrap();
      console.log(res);
      toast.success("Password updated successfully!");
      router.push("/login");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update password.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      <div className="space-y-4 rounded-md">
        <div>
          <label htmlFor="email" className="text-sm text-gray-500">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={email || ""}
            readOnly
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 bg-gray-100 text-gray-900 focus:outline-none focus:ring-green-500"
          />
        </div>

        <div>
          <label htmlFor="password" className="text-sm text-gray-500">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-green-500"
            />
            <div className="absolute right-3 top-3">
              <button
                type="button"
                className="text-xl"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEyeSlash /> : <IoEyeSharp />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-md bg-green-600 py-2 text-white hover:bg-green-700 transition-colors"
      >
        {isLoading ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

export default NewPassword;
