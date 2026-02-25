'use client';

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import { TrendingUp, Users, Award, DollarSign } from 'lucide-react';
import { useInstructorAnalyticsQuery } from '@/redux/features/dashboard/dashboardApi';

const COLORS = ['#0ea5e9', '#8b5cf6', '#ec4899', '#f97316'];

export default function InstructorAnalyticsPage() {
  const { data, isLoading, isError } = useInstructorAnalyticsQuery([]);

  if (isLoading) {
    return (
      <div className="p-10 text-center text-lg font-semibold">
        Loading analytics...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-10 text-center text-red-500">
        Failed to load analytics data.
      </div>
    );
  }

  const analytics = data?.data;

  const revenueData =
    analytics?.revenueByCourse?.map((course: any) => ({
      name: course.title,
      value: course.revenue,
    })) || [];

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Analytics & Performance</h1>
        <p className="text-muted-foreground">
          Detailed insights into your courses and student engagement
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-4">

        {/* Total Students */}
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-3 mb-2">
            <Users className="h-5 w-5 text-blue-600" />
            <div>
              <div className="text-xs text-muted-foreground">Total Students</div>
              <div className="text-2xl font-bold">
                {analytics?.totalStudents || 0}
              </div>
            </div>
          </div>
        </div>

        {/* Completions */}
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-3 mb-2">
            <Award className="h-5 w-5 text-green-600" />
            <div>
              <div className="text-xs text-muted-foreground">Completions</div>
              <div className="text-2xl font-bold">
                {analytics?.totalCompletions || 0}
              </div>
            </div>
          </div>
          <div className="text-xs text-green-600">
            {analytics?.completionRate || 0}% completion rate
          </div>
        </div>

        {/* Avg Rating */}
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            <div>
              <div className="text-xs text-muted-foreground">Avg Rating</div>
              <div className="text-2xl font-bold">
                {analytics?.avgRating || 0}/5
              </div>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">
            Based on {analytics?.totalReviews || 0} reviews
          </div>
        </div>

        {/* Total Revenue */}
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="h-5 w-5 text-orange-600" />
            <div>
              <div className="text-xs text-muted-foreground">Total Revenue</div>
              <div className="text-2xl font-bold">
                ${analytics?.totalRevenue?.toLocaleString() || 0}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Revenue Section - Side by Side */}
      <div className="grid gap-6 lg:grid-cols-2">

        {/* Revenue Pie Chart */}
        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-lg font-semibold mb-4">
            Revenue by Course
          </h2>

          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={revenueData}
                dataKey="value"
                nameKey="name"
                outerRadius={120}
                label
              >
                {revenueData.map((_: unknown, index: any) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Table */}
        <div className="rounded-lg border bg-card overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">
              Course Revenue Details
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase">
                    Course Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase">
                    Revenue
                  </th>
                </tr>
              </thead>

              <tbody>
                {analytics?.revenueByCourse?.length ? (
                  analytics.revenueByCourse.map((course: any) => (
                    <tr
                      key={course.courseId}
                      className="border-b hover:bg-muted/30 transition"
                    >
                      <td className="px-6 py-4 font-medium">
                        {course.title}
                      </td>
                      <td className="px-6 py-4 font-bold text-primary">
                        ${course.revenue.toLocaleString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={2}
                      className="px-6 py-6 text-center text-muted-foreground"
                    >
                      No revenue data available
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>
        </div>

      </div>

    </div>
  );
}