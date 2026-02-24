"use client";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import ForgetPassword from "./forgetPassword"; // this expects props

const ForgetPage = () => {
  const [,setStep] = useState(1);
  const [, setEmail] = useState("");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center">
          <h2 className="text-center text-5xl font-medium text-green-600">
            Forget Password
          </h2>
        </div>

        <ForgetPassword setStep={setStep} setEmail={setEmail} />
      </div>
      <ToastContainer />
    </div>
  );
};

export default ForgetPage;
