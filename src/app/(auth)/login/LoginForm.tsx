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
  role: string;
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

    const { data, error } = await loginFun({ email, password });

    if (error || !data?.data?.token) {
      ShowToastify({ error: "Check your email or password." });
      setLogIn("Login");
      return;
    }

    let userInfo: DecodedToken;

    try {
      userInfo = jwtDecode<DecodedToken>(data.data.token);
    } catch {
      ShowToastify({ error: "Invalid token received." });
      setLogIn("Login");
      return;
    }

    // ✅ Allow SUPER_ADMIN, STUDENT, INSTRUCTOR, ADMIN only
    const allowedRoles = ["SUPER_ADMIN", "STUDENT", "INSTRUCTOR", "ADMIN"];

    if (!allowedRoles.includes(userInfo.role)) {
      ShowToastify({ error: "You are not authorized." });
      dispatch(logOut());
      setLogIn("Login");
      return;
    }

    // ✅ name পুরোপুরি remove
    dispatch(setUser({ role: userInfo.role }));

    Cookies.set("token", data.data.token);
    router.push("/");
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

      {/* Links */}
      <div className="flex justify-between">
        <Link href="/forgetPassword" className="text-xs text-gray-500">
          Forgot password?
        </Link>
        <Link href="/Registration" className="text-xs text-gray-500">
          Don&apos;t have an account?
        </Link>
      </div>

      {/* Submit */}
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
