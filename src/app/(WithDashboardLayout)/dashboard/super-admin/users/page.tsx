/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAllUsersQuery, useUserStatusUpdateMutation } from "@/redux/features/auth/userApi"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

type User = {
  id: string
  username: string
  email: string
  profileImage: string
  role: string
  status?: string
  isPremium?: boolean
  memoryCreate?: number
}

export default function UserListTable() {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [emailSearch, setEmailSearch] = useState("")
  const [searchInput, setSearchInput] = useState("")
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  const { data: usersData, isLoading, isError, refetch } = useAllUsersQuery()

  const [userStatusUpdate] = useUserStatusUpdateMutation()

  const handleStatusChange = async (userId: string, newStatus: "ACTIVE" | "BLOCKED") => {
    setUpdatingId(userId);
    try {
      const response = await userStatusUpdate({
        id: userId,
        body: { status: newStatus }
      }).unwrap();
      
      if (response?.status === 200 || response?.success) {
        toast.success(`User status updated successfully to ${newStatus}`);
        refetch();
      } else {
        toast.error("Status update completed but with unexpected response");
      }
    } catch (error: any) {
      console.error("Failed to update user status:", error);
      toast.error(error.data?.message || "Failed to update user status");
    } finally {
      setUpdatingId(null);
    }
  }

  const handleSearch = () => {
    setEmailSearch(searchInput)
    setPage(1)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-green-500" />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-12 bg-red-50 rounded-lg">
        <p className="text-red-500 text-lg mb-4">Error loading users</p>
        <Button 
          onClick={() => refetch()}
          variant="outline"
          className="text-blue-500 border-blue-500"
        >
          Retry
        </Button>
      </div>
    )
  }

  const users = usersData?.data?.data || []
  const totalUsers = usersData?.meta?.total || 0

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Users</h1>
        <div className="flex gap-2">
          <Input
            placeholder="Search by email"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyPress}
            className="w-64"
          />
          <Button onClick={handleSearch}>Search</Button>
        </div>
      </div>

      {users.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-lg mb-2">No users found</p>
          <p className="text-gray-400 text-sm">
            {emailSearch 
              ? `No users match your search for "${emailSearch}"`
              : "There are currently no users to display"}
          </p>
          {emailSearch && (
            <Button 
              variant="ghost" 
              className="mt-4 text-blue-500"
              onClick={() => {
                setEmailSearch("")
                setSearchInput("")
              }}
            >
              Clear search
            </Button>
          )}
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Username</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Role</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((user: User) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{user.username}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{user.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{user.role}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <Select
                        value={user.status}
                        onValueChange={(value) => handleStatusChange(user.id, value as "ACTIVE" | "BLOCKED")}
                        disabled={updatingId === user.id}
                      > 
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ACTIVE">Unrestricted</SelectItem>
                          <SelectItem value="BLOCKED">Restricted</SelectItem>
                        </SelectContent>
                      </Select>
                      {updatingId === user.id && (
                        <span className="ml-2 text-sm text-gray-500">Updating...</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination controls */}
          <div className="flex justify-between min-h-screen items-center mt-4">
            <div className="text-sm text-gray-500">
              Showing {users.length} of {totalUsers} users
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                disabled={page === 1}
                onClick={() => setPage(p => Math.max(1, p - 1))}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                disabled={!usersData?.meta?.hasNextPage}
                onClick={() => setPage(p => p + 1)}
              >
                Next
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">Rows per page:</span>
              <Select
                value={limit.toString()}
                onValueChange={(value) => {
                  setLimit(Number(value))
                  setPage(1)
                }}
              >
                <SelectTrigger className="w-20">
                  <SelectValue placeholder={limit} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </>
      )}
    </div>
  )
}