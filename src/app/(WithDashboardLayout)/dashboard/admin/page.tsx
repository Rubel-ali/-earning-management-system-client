"use client";

import { useSuperAdminSummaryQuery } from "@/redux/features/dashboard/dashboardApi";
import {
  Users,
  BookOpen,
  DollarSign,
  TrendingUp,
  AlertCircle,
} from "lucide-react";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export default function SuperAdminDashboard() {
  const { data, isLoading } = useSuperAdminSummaryQuery();

  if (isLoading) {
    return (
      <div className="p-10 text-center text-lg font-medium">
        Loading dashboard...
      </div>
    );
  }

  const dashboard = data?.data;

  const overview = dashboard?.overview;
  const enrollmentTrend = dashboard?.enrollmentTrend || [];
  const monthlyRevenue = dashboard?.monthlyRevenue || [];
  const categoryDistribution = dashboard?.categoryDistribution || [];
  const topInstructors = dashboard?.topInstructors || [];
  const platformHealth = dashboard?.platformHealth;

  const stats = [
    {
      label: "Total Users",
      value: overview?.totalUsers || 0,
      icon: Users,
    },
    {
      label: "Total Courses",
      value: overview?.totalCourses || 0,
      icon: BookOpen,
    },
    {
      label: "Total Revenue",
      value: `$${overview?.totalRevenue || 0}`,
      icon: DollarSign,
    },
    {
      label: "Total Enrollments",
      value: overview?.totalEnrollments || 0,
      icon: TrendingUp,
    },
  ];

  const COLORS = ["#2563eb", "#16a34a", "#f59e0b", "#ef4444", "#8b5cf6"];

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold">Super Admin Dashboard</h1>

      {/* ================= OVERVIEW CARDS ================= */}
      <div className="grid gap-4 md:grid-cols-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="p-6 rounded-xl border bg-card shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-center">
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

      {/* ================= CHARTS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Enrollment Trend */}
        <div className="rounded-xl border bg-card p-6">
          <h3 className="mb-4 font-semibold text-lg">
            Enrollment Trend
          </h3>

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

        {/* Monthly Revenue */}
        <div className="rounded-xl border bg-card p-6">
          <h3 className="mb-4 font-semibold text-lg">
            Monthly Revenue
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#16a34a" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ================= CATEGORY & TOP INSTRUCTORS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Category Distribution */}
        <div className="rounded-xl border bg-card p-6">
          <h3 className="mb-4 font-semibold text-lg">
            Category Distribution
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryDistribution}
                dataKey="percentage"
                nameKey="categoryId"
                outerRadius={100}
                label
              >
                {categoryDistribution.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Top Instructors */}
        <div className="rounded-xl border bg-card p-6">
          <h3 className="mb-4 font-semibold text-lg">
            Top Instructors
          </h3>

          <div className="space-y-3">
            {topInstructors.map((inst: any, i: number) => (
              <div
                key={i}
                className="flex justify-between border-b pb-2"
              >
                <div>
                  <p className="font-medium">{inst.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {inst.totalStudents} students
                  </p>
                </div>
                <p className="font-semibold">
                  ${inst.revenue}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ================= PLATFORM HEALTH ================= */}
      <div className="rounded-xl border bg-card p-6">
        <h3 className="mb-4 font-semibold text-lg">
          Platform Health
        </h3>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold">
              {platformHealth?.percentage}%
            </p>
            <p className="text-muted-foreground">
              Status: {platformHealth?.status}
            </p>
          </div>

          <AlertCircle className="h-10 w-10 text-yellow-500" />
        </div>
      </div>
    </div>
  );
}