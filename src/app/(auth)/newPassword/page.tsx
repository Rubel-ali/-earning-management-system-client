

import { ToastContainer } from "react-toastify";
import NewPassword from "./newPassword";

export default function newPasswordPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center">


          <h2 className="text-center text-5xl font-medium text-green-600">
            Set New Password
          </h2>
        </div>

        <NewPassword />
      </div>
      <ToastContainer />
    </div>
  );
}
