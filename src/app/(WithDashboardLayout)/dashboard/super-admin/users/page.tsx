"use client";

import {
  useAllUsersQuery,
  useDeleteUserMutation,
  useUserStatusUpdateMutation,
} from "@/redux/features/auth/userApi";
import toast from "react-hot-toast";

type UserStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED";

export default function SuperAdminUsersPage() {
  const { data, isLoading } = useAllUsersQuery();
  const [updateStatus] = useUserStatusUpdateMutation();
  const [deleteUser] = useDeleteUserMutation();

  const users = data?.data?.data || [];

  const handleStatus = async (id: string, currentStatus: UserStatus) => {
    let newStatus: UserStatus = "ACTIVE";

    if (currentStatus === "ACTIVE") {
      newStatus = "SUSPENDED";
    } else if (currentStatus === "SUSPENDED") {
      newStatus = "ACTIVE";
    } else if (currentStatus === "INACTIVE") {
      newStatus = "ACTIVE";
    }

    try {
      await updateStatus({
        id,
        body: { status: newStatus },
      }).unwrap();

      toast.success(`Status changed to ${newStatus}`);
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      await deleteUser(id).unwrap();
      toast.success("User deleted successfully");
    } catch {
      toast.error("Delete failed");
    }
  };

  if (isLoading)
    return (
      <div className="py-20 text-center text-lg font-medium">
        Loading users...
      </div>
    );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">
        User Management
      </h1>

      <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-4 text-left font-semibold">Name</th>
              <th className="text-left font-semibold">Email</th>
              <th className="text-left font-semibold">Role</th>
              <th className="text-left font-semibold">Status</th>
              <th className="text-center font-semibold">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user: any) => (
              <tr
                key={user.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-4 font-medium">
                  {user.username}
                </td>

                <td className="text-gray-600">
                  {user.email}
                </td>

                <td>
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
                    {user.role}
                  </span>
                </td>

                {/* STATUS BADGE */}
                <td>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                      user.status === "ACTIVE"
                        ? "bg-green-100 text-green-700"
                        : user.status === "SUSPENDED"
                        ? "bg-red-100 text-red-600"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>

                {/* ACTION BUTTONS */}
                <td className="text-center space-x-2">
                  <button
                    onClick={() =>
                      handleStatus(user.id, user.status)
                    }
                    className={`px-4 py-1.5 text-xs rounded-lg font-medium transition ${
                      user.status === "ACTIVE"
                        ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                        : "bg-green-600 hover:bg-green-700 text-white"
                    }`}
                  >
                    {user.status === "ACTIVE"
                      ? "Suspend"
                      : "Activate"}
                  </button>

                  <button
                    onClick={() => handleDelete(user.id)}
                    className="px-4 py-1.5 text-xs rounded-lg font-medium bg-red-500 hover:bg-red-600 text-white transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <div className="p-10 text-center text-gray-500">
            No users found
          </div>
        )}
      </div>
    </div>
  );
}