"use client";

import { useAdminSummaryQuery } from "@/redux/features/dashboard/dashboardApi";
import {
  Users,
  BookOpen,
  TrendingUp,
  DollarSign,
} from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function AdminDashboard() {
  const { data, isLoading } = useAdminSummaryQuery([]);

  if (isLoading) {
    return <div className="p-10 text-center">Loading dashboard...</div>;
  }

  const overview = data?.data?.overview;
  const enrollmentTrend = data?.data?.enrollmentTrend || [];
  const coursesByCategory = data?.data?.coursesByCategory || [];

  const stats = [
    {
      label: "Total Users",
      value: overview?.totalUsers || 0,
      icon: Users,
    },
    {
      label: "Active Courses",
      value: overview?.activeCourses || 0,
      icon: BookOpen,
    },
    {
      label: "Monthly Revenue",
      value: `$${overview?.monthlyRevenue || 0}`,
      icon: DollarSign,
    },
    {
      label: "Avg Rating",
      value: overview?.avgRating || 0,
      icon: TrendingUp,
    },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="p-6 rounded-lg border bg-card">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold mt-2">
                    {stat.value}
                  </p>
                </div>
                <Icon className="h-8 w-8 text-primary" />
              </div>
            </div>
          );
        })}
      </div>

      {/* ✅ Charts Side By Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Enrollment Trend */}
        <div className="rounded-lg border bg-card p-6">
          <h3 className="mb-4 font-semibold">Enrollment Trend</h3>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={enrollmentTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="enrollments"
                stroke="#2563eb"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Courses by Category */}
        <div className="rounded-lg border bg-card p-6">
          <h3 className="mb-4 font-semibold">Courses by Category</h3>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={coursesByCategory}
                dataKey="count"
                nameKey="category"
                outerRadius={100}
              >
                {coursesByCategory.map((_: unknown, i: any) => (
                  <Cell key={i} fill="#16a34a" />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}