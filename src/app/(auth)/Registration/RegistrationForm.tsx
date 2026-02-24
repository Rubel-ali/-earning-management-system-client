"use client";

import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa6";
import ShowToastify from "@/utils/ShowToastify";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useRegisterUserMutation } from "@/redux/features/auth/userApi";

type UserRole = "STUDENT" | "INSTRUCTOR" | "ADMIN" | "";

const RegistrationFrom = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState("Sign up");
  const [registerUser] = useRegisterUserMutation();
  const router = useRouter();
  const [userRole, setUserRole] = useState<UserRole>("");

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading("Loading...");

    const formData = new FormData(e.currentTarget);

    const username = formData.get("username")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const password = formData.get("password")?.toString();

    const newErrors = {
      username: !username ? "Full name is required" : "",
      email: !email ? "Email is required" : "",
      password: !password ? "Password is required" : "",
      role: !userRole ? "Please select a role" : "",
    };

    setErrors(newErrors);

    if (!username || !email || !password || !userRole) {
      setLoading("Sign up");
      return;
    }

    const { data, error } = await registerUser({
      username,
      email,
      password,
      role: userRole,
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
    <form onSubmit={handleSignUp} className="mt-5 space-y-6">
      <div className="space-y-4 rounded-md">

        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-foreground">
            Full Name
          </label>
          <input
            name="username"
            type="text"
            className={`w-full px-4 py-2 rounded-lg border ${
              errors.username ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">
              {errors.username}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-foreground">
            Email
          </label>
          <input
            name="email"
            type="email"
            className={`w-full px-4 py-2 rounded-lg border ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email}
            </p>
          )}
        </div>

        {/* Role Selection */}
        <div>
          <label className="block text-sm font-medium text-foreground">
            I am a...
          </label>

          <div className="grid grid-cols-2 gap-3">
            {[
              { value: "STUDENT", label: "Student" },
              { value: "INSTRUCTOR", label: "Instructor" },
            ].map((role) => (
              <button
                key={role.value}
                type="button"
                onClick={() => {
                  setUserRole(role.value as UserRole);
                  setErrors((prev) => ({ ...prev, role: "" }));
                }}
                className={`px-4 py-2 rounded-lg border font-medium transition-all ${
                  userRole === role.value
                    ? "border-green-600 bg-green-100 text-green-700"
                    : "border-gray-300"
                }`}
              >
                {role.label}
              </button>
            ))}
          </div>

          {errors.role && (
            <p className="text-red-500 text-sm mt-1">
              {errors.role}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-foreground">
            Password
          </label>
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            <div className="absolute right-3 top-3">
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <IoEyeSharp />}
              </button>
            </div>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password}
            </p>
          )}
        </div>
      </div>

      {/* Login link */}
      <div className="flex items-center justify-end">
        <Link
          href="/login"
          className="block text-sm font-medium text-foreground hover:text-green-600"
        >
          Already have an account?
        </Link>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-700"
      >
        {loading}
      </button>
    </form>
  );
};

export default RegistrationFrom;