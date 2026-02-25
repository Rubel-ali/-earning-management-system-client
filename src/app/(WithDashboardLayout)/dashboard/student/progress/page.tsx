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
  BarChart,
  Bar,
} from "recharts";

import { TrendingUp, BookOpen, Zap } from "lucide-react";
import { useStudentAnalyticsQuery, useStudentProgressQuery } from "@/redux/features/course/courseApi";

export default function ProgressPage() {
  const { data, isLoading } = useStudentAnalyticsQuery({});
  const { data: progressDataAPI } = useStudentProgressQuery({});

  if (isLoading) {
    return <div className="p-10 text-center">Loading progress...</div>;
  }

  const overview = data?.data?.overview;

  const weeklyActivity =
    data?.data?.weeklyActivity || [];

  const courseProgress =
    progressDataAPI?.data || [];

  const stats = [
    {
      label: "Total Hours",
      value: overview?.totalHours || "0",
      change: overview?.growth || "+0%",
      icon: BookOpen,
      color: "text-blue-600",
    },
    {
      label: "Lessons Completed",
      value: overview?.totalLessons || "0",
      change: "+ this month",
      icon: TrendingUp,
      color: "text-green-600",
    },
    {
      label: "Streak",
      value: overview?.streak || "0 days",
      change: "Keep going!",
      icon: Zap,
      color: "text-orange-600",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Your Progress</h1>
        <p className="text-muted-foreground">
          Track your learning journey
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="border rounded-lg p-6 bg-card flex justify-between"
            >
              <div>
                <p className="text-sm text-muted-foreground">
                  {stat.label}
                </p>
                <p className="text-3xl font-bold mt-2">
                  {stat.value}
                </p>
                <p className="text-xs text-primary mt-1">
                  {stat.change}
                </p>
              </div>
              <Icon className={`h-8 w-8 ${stat.color}`} />
            </div>
          );
        })}
      </div>

      {/* Weekly Activity Chart */}
      <div className="border rounded-lg p-6 bg-card">
        <h2 className="text-xl font-semibold mb-6">
          Weekly Activity
        </h2>

        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={weeklyActivity}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Line
              type="monotone"
              dataKey="hours"
              stroke="#6366f1"
              name="Hours"
              strokeWidth={3}
            />

            <Line
              type="monotone"
              dataKey="lessons"
              stroke="#22c55e"
              name="Lessons"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Course Progress */}
      <div className="border rounded-lg p-6 bg-card">
        <h2 className="text-xl font-semibold mb-6">
          Course Progress
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={courseProgress}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="courseName" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Bar
              dataKey="progress"
              fill="#6366f1"
              name="Completion %"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Detailed Progress */}
      <div className="border rounded-lg p-6 bg-card">
        <h2 className="text-xl font-semibold mb-6">
          Detailed Progress
        </h2>

        <div className="space-y-6">
          {courseProgress.map((course: any, i: number) => (
            <div key={i} className="space-y-3">
              <div className="flex justify-between">
                <h3 className="font-medium">{course.courseName}</h3>
                <span className="font-bold text-primary">
                  {course.progress}%
                </span>
              </div>

              <div className="h-3 bg-muted rounded-full overflow-hidden">
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