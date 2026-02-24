import Image from "next/image";

import { ToastContainer } from "react-toastify";
import RegistrationFrom from "./RegistrationForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center">

          <Image
            src="/logo.png"
            alt="Everlasting Life App Logo"
            height={500}
            width={500}
            className="object-contain"
            priority
          />

          <h2 className="text-center text-5xl font-medium text-green-600">
            Sign up
          </h2>
        </div>

        <RegistrationFrom />
      </div>
      <ToastContainer />
    </div>
  );
}
