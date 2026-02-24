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

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLogIn("Loading...");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email")?.toString().trim();
    const password = formData.get("password")?.toString();

    if (!email || !password) {
      ShowToastify({ error: "Email and password are required." });
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

      // Save role in redux
      dispatch(setUser({ role: userInfo.role }));

      // Save token in cookie
      Cookies.set("token", token, { expires: 7 });

      // ✅ Correct Redirect According To Folder
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
    } catch (error) {
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
          <label htmlFor="email" className="text-sm text-gray-500">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="info@email.com"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
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
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
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