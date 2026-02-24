'use client';

import { useSuperAdminSummaryQuery } from "@/redux/features/dashboard/dashboardApi";
import { Users, DollarSign, BookOpen, TrendingUp } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import toast from "react-hot-toast";

export default function SuperAdminDashboard() {
  const { data, isLoading, isError } = useSuperAdminSummaryQuery();

  if (isLoading) return <div className="py-20 text-center">Loading...</div>;

  if (isError) {
    toast.error("Failed to load dashboard");
    return <div className="py-20 text-center text-red-500">Error loading dashboard</div>;
  }

  const dashboard = data?.data;
  const overview = dashboard?.overview;

  const stats = [
    { label: "Total Users", value: overview?.totalUsers, icon: Users },
    { label: "Total Revenue", value: `$${overview?.totalRevenue}`, icon: DollarSign },
    { label: "Total Courses", value: overview?.totalCourses, icon: BookOpen },
    { label: "Enrollments", value: overview?.totalEnrollments, icon: TrendingUp },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Super Admin Dashboard</h1>

      <div className="grid md:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="p-6 border rounded-xl bg-card">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <h2 className="text-2xl font-bold">{stat.value}</h2>
                </div>
                <Icon className="w-8 h-8 text-primary" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-6 border rounded-xl bg-card">
        <h2 className="mb-4 font-semibold">Monthly Revenue</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dashboard?.monthlyRevenue}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}