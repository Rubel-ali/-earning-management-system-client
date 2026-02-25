"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  BarChart3,
  Users,
  TrendingUp,
  BookOpen,
  ArrowRight,
  Plus,
  Tag,
} from "lucide-react";
import Link from "next/link";
import { useInstructorSummaryQuery } from "@/redux/features/dashboard/dashboardApi";

export default function InstructorDashboard() {
  const { data, isLoading } = useInstructorSummaryQuery(undefined);

  const overview = data?.data?.overview;
  const enrollmentData = data?.data?.enrollmentTrend || [];

  const stats = [
    {
      label: "Active Courses",
      value: overview?.activeCourses ?? 0,
      icon: BookOpen,
      color: "text-blue-600",
    },
    {
      label: "Total Students",
      value: overview?.totalStudents ?? 0,
      icon: Users,
      color: "text-green-600",
    },
    {
      label: "Total Revenue",
      value: `$${overview?.totalRevenue ?? 0}`,
      icon: TrendingUp,
      color: "text-purple-600",
    },
    {
      label: "Avg Rating",
      value: `${overview?.avgRating ?? 0}/5`,
      icon: BarChart3,
      color: "text-orange-600",
    },
  ];

  // temporary empty recentCourses (API তে না থাকলে empty রাখলাম)
  // const recentCourses: any[] = [];

  if (isLoading) {
    return <div className="p-10 text-center">Loading Dashboard...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">
            Instructor Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage your courses and track student engagement
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            href="/dashboard/instructor/courses/create"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
          >
            <Plus className="h-4 w-4" />
            Create Course
          </Link>

          <Link
            href="/dashboard/instructor/lessons/create"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card text-foreground hover:bg-muted transition-colors font-medium"
          >
            <Plus className="h-4 w-4" />
            Create Lesson
          </Link>

          <Link
            href="/dashboard/instructor/categories"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card text-foreground hover:bg-muted transition-colors font-medium"
          >
            <Tag className="h-4 w-4" />
            Manage Categories
          </Link>

          <Link
            href="/dashboard/instructor/analytics"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card text-foreground hover:bg-muted transition-colors font-medium"
          >
            <BarChart3 className="h-4 w-4" />
            View Analytics
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="rounded-lg border border-border bg-card p-6 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="mt-2 text-3xl font-bold text-foreground">
                    {stat.value}
                  </p>
                </div>
                <Icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Enrollment Trend */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Enrollment Trend
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={enrollmentData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis
              dataKey="month"
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: "12px" }}
            />
            <YAxis
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: "12px" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-card)",
                border: "1px solid var(--color-border)",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="enrollments"
              stroke="var(--color-primary)"
              strokeWidth={2}
              dot={{ fill: "var(--color-primary)" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Courses Section (structure untouched) */}
      <div>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Your Courses</h2>
          <Link
            href="/dashboard/instructor/courses"
            className="flex items-center gap-2 text-primary hover:underline text-sm font-medium"
          >
            Manage All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
