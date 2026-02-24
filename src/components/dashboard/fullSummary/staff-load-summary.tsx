"use client"

import { Users } from "lucide-react"
import clsx from "clsx"

/* ========= TYPES ========= */
interface IStaffLoad {
  staffId: string
  name: string
  used: number
  capacity: number
  isFull: boolean
  label: string
}

interface StaffLoadSummaryProps {
  data: IStaffLoad[]
}

/* ========= COMPONENT ========= */
export function StaffLoadSummary({ data }: StaffLoadSummaryProps) {
  return (
    <div className="bg-white rounded-xl border p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <Users className="h-5 w-5 text-primary" />
        </div>
        <h2 className="text-lg font-semibold">Staff Load Summary</h2>
      </div>

      {/* Empty State */}
      {!data || data.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No staff load data available
        </p>
      ) : (
        <div className="space-y-4">
          {data.map((staff) => {
            const percentage = Math.round(
              (staff.used / staff.capacity) * 100
            )

            return (
              <div key={staff.staffId} className="space-y-2">
                {/* Name & Status */}
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">
                    {staff.name}
                  </span>

                  <span
                    className={clsx(
                      "text-xs font-medium px-2 py-1 rounded-full",
                      staff.isFull
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    )}
                  >
                    {staff.isFull ? "Full" : "Available"}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={clsx(
                      "h-full transition-all",
                      staff.isFull
                        ? "bg-red-500"
                        : percentage > 80
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    )}
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                {/* Meta */}
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>
                    {staff.used} / {staff.capacity} appointments
                  </span>
                  <span>{percentage}%</span>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}