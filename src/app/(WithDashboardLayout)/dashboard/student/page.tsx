"use client";



import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import { BookOpen, Clock, TrendingUp, Zap } from "lucide-react";
import { useStudentSummaryQuery } from "@/redux/features/dashboard/dashboardApi";
import { useStudentProgressQuery } from "@/redux/features/course/courseApi";

export default function StudentDashboard() {
  const { data, isLoading } = useStudentSummaryQuery({});
  const { data: progressData } = useStudentProgressQuery({});

  if (isLoading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  const overview = data?.data?.overview;
  const enrollmentTrend = data?.data?.enrollmentTrend || [];
  const activeCourses = progressData?.data || [];

  const stats = [
    {
      label: "Active Courses",
      value: overview?.activeCourses || 0,
      icon: BookOpen,
    },
    {
      label: "Hours Studied",
      value: overview?.hoursStudied || 0,
      icon: Clock,
    },
    {
      label: "Certificates",
      value: overview?.certificatesEarned || 0,
      icon: TrendingUp,
    },
    {
      label: "Skill Points",
      value: overview?.skillPoints || 0,
      icon: Zap,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Student Dashboard</h1>
        <p className="text-muted-foreground">
          Track your learning progress
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="p-6 border rounded-lg bg-card flex justify-between"
            >
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
          );
        })}
      </div>

      {/* Enrollment Trend Chart */}
      <div className="border rounded-lg p-6 bg-card">
        <h2 className="text-xl font-semibold mb-6">
          Enrollment Trend
        </h2>

        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={enrollmentTrend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="enrollments"
              strokeWidth={3}
              stroke="#6366f1"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Course Progress */}
      <div className="border rounded-lg p-6 bg-card">
        <h2 className="text-xl font-semibold mb-6">
          Course Progress
        </h2>

        <div className="space-y-6">
          {activeCourses.map((course: any, i: number) => (
            <div key={i} className="space-y-3">
              <div className="flex justify-between">
                <h3 className="font-medium">
                  {course.courseName}
                </h3>
                <span className="text-primary font-bold">
                  {course.progress}%
                </span>
              </div>

              <div className="h-3 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}