"use client"

import { useActivityLogQuery } from "@/redux/features/fullSummary/fullSummaryApi"
import { Activity } from "lucide-react"

/* ================= TYPES ================= */

interface ActivityItem {
  id: string
  message: string
  createdAt: string
}

interface ActivityApiResponse {
  success: boolean
  message: string
  data: ActivityItem[]
}

/* ================= HELPER ================= */

function formatTime(dateString: string) {
  return new Date(dateString).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
}

/* ================= COMPONENT ================= */

export function RecentActivity() {
  const { data, isLoading, isError } =
    useActivityLogQuery(undefined) as {
      data?: ActivityApiResponse
      isLoading: boolean
      isError: boolean
    }

  const activities = data?.data ?? []

  return (
    <div className="bg-white rounded-lg border border-border p-6">
      <div className="flex items-center gap-2 mb-6">
        <Activity size={20} className="text-primary" />
        <h3 className="font-semibold text-foreground">
          Recent Activity
        </h3>
      </div>

      {/* Loading */}
      {isLoading && (
        <p className="text-sm text-muted-foreground">
          Loading activities...
        </p>
      )}

      {/* Error */}
      {isError && (
        <p className="text-sm text-red-500">
          Failed to load activity logs
        </p>
      )}

      {/* Empty */}
      {!isLoading && !isError && activities.length === 0 && (
        <p className="text-sm text-muted-foreground">
          No recent activity found
        </p>
      )}

      {/* Data */}
      <div className="space-y-4">
        {activities.map((item) => (
          <div
            key={item.id}
            className="pb-4 border-b border-gray-100 last:pb-0 last:border-b-0"
          >
            <p className="text-sm text-foreground mb-1">
              {item.message}
            </p>
            <p className="text-xs text-muted-foreground">
              {formatTime(item.createdAt)}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}