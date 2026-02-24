'use client'

import { Loader2, Calendar, CheckCircle, AlertCircle, Clock } from 'lucide-react'

import { StatCard } from '@/components/dashboard/fullSummary/stat-card'
import { StaffLoadSummary } from '@/components/dashboard/fullSummary/staff-load-summary'
import { RecentActivity } from '@/components/dashboard/fullSummary/recent-activity'
import { useAllSummaryQuery } from '@/redux/features/fullSummary/fullSummaryApi'

/* ================= TYPES ================= */

interface IStaffLoad {
  staffId: string
  name: string
  used: number
  capacity: number
  isFull: boolean
  label: string
}

interface IDashboardSummary {
  totalAppointments: number
  completed: number
  pending: number
  waitingQueueCount: number
  staffLoad: IStaffLoad[]
}

// interface IDashboardApiResponse {
//   success: boolean
//   message: string
//   data: IDashboardSummary
// }

/* ================= COMPONENT ================= */

export default function DashboardSummaryPage() {
  // RTK Query call
  const { data, isLoading, isError } = useAllSummaryQuery([])

  const summary: IDashboardSummary | undefined = data?.data

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-green-500" />
      </div>
    )
  }

  // Error state
  if (isError || !summary) {
    return (
      <div className="text-center text-red-500 py-12">
        Failed to load dashboard summary
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white border-b border-border px-8 py-4">
          <h1 className="text-3xl font-bold mb-1">Smart Appointment</h1>
          <p className="text-muted-foreground text-sm">
            Overview of your appointment management system
          </p>
        </div>

        {/* Stats */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              icon={<Calendar size={24} className="text-primary" />}
              value={summary.totalAppointments}
              label="Total Appointments"
              iconBgColor="bg-primary/10"
            />
            <StatCard
              icon={<CheckCircle size={24} className="text-green-500" />}
              value={summary.completed}
              label="Completed"
              iconBgColor="bg-green-100"
            />
            <StatCard
              icon={<AlertCircle size={24} className="text-yellow-500" />}
              value={summary.pending}
              label="Pending"
              iconBgColor="bg-yellow-100"
            />
            <StatCard
              icon={<Clock size={24} className="text-red-500" />}
              value={summary.waitingQueueCount}
              label="Waiting Queue"
              iconBgColor="bg-red-100"
              link="View Queue →"
            />
          </div>

          {/* Bottom */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <StaffLoadSummary data={summary.staffLoad} />
            <RecentActivity />
          </div>
        </div>
      </main>
    </div>
  )
}
