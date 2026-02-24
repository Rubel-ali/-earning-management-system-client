"use client";

import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa6";
import ShowToastify from "@/utils/ShowToastify";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useLoginUserMutation } from "@/redux/features/auth/userApi";
import { AppDispatch } from "@/redux/store";
import { logOut, setUser } from "@/redux/ReduxFunction";

type DecodedToken = {
  role: "SUPER_ADMIN" | "ADMIN" | "INSTRUCTOR" | "STUDENT";
  iat?: number;
  exp?: number;
};

const LoginForm = () => {
  const [logIn, setLogIn] = useState("Login");
  const [showPassword, setShowPassword] = useState(false);
  const [loginFun] = useLoginUserMutation();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLogIn("Loading...");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email")?.toString().trim();
    const password = formData.get("password")?.toString();

    const newErrors = {
      email: !email ? "Email is required" : "",
      password: !password ? "Password is required" : "",
    };

    setErrors(newErrors);

    if (!email || !password) {
      setLogIn("Login");
      return;
    }

    try {
      const res = await loginFun({ email, password }).unwrap();

      if (!res?.data?.token) {
        throw new Error("Token not found");
      }

      const token = res.data.token;

      let userInfo: DecodedToken;

      try {
        userInfo = jwtDecode<DecodedToken>(token);
      } catch {
        throw new Error("Invalid token");
      }

      const allowedRoles = [
        "SUPER_ADMIN",
        "ADMIN",
        "INSTRUCTOR",
        "STUDENT",
      ];

      if (!allowedRoles.includes(userInfo.role)) {
        dispatch(logOut());
        throw new Error("Unauthorized role");
      }

      dispatch(setUser({ role: userInfo.role }));
      Cookies.set("token", token, { expires: 7 });

      switch (userInfo.role) {
        case "SUPER_ADMIN":
          router.push("/dashboard/super-admin");
          break;
        case "ADMIN":
          router.push("/dashboard/admin");
          break;
        case "INSTRUCTOR":
          router.push("/dashboard/instructor");
          break;
        case "STUDENT":
          router.push("/dashboard/student");
          break;
        default:
          router.push("/login");
      }

      ShowToastify({ success: "Login successful!" });

    } catch {
      dispatch(logOut());
      ShowToastify({ error: "Check your email or password." });
      setLogIn("Login");
    }
  };

  return (
    <form onSubmit={handleLogin} className="mt-8 space-y-6">
      <div className="space-y-4 rounded-md">

        {/* Email */}
        <div>
          <label className="text-sm text-gray-500">
            Email
          </label>
          <input
            name="email"
            type="email"
            className={`mt-1 block w-full rounded-md border px-3 py-2 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="text-sm text-gray-500">
            Password
          </label>
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              className={`mt-1 block w-full rounded-md border px-3 py-2 ${
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

      <div className="flex justify-between">
        <Link href="/forgetPassword" className="text-xs text-gray-500">
          Forgot password?
        </Link>
        <Link href="/Registration" className="text-xs text-gray-500">
          Don&apos;t have an account?
        </Link>
      </div>

      <button
        type="submit"
        className="w-full rounded-md bg-green-600 px-3 py-2 text-white"
      >
        {logIn}
      </button>
    </form>
  );
};

export default LoginForm;