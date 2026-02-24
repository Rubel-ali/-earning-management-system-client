'use client';


import { useSuperAdminSummaryQuery } from '@/redux/features/dashboard/dashboardApi';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

const COLORS = ['#2563eb', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444'];

export default function SuperAdminAnalyticsPage() {
  const { data, isLoading, isError } = useSuperAdminSummaryQuery();

  if (isLoading) return <div className="p-10">Loading dashboard...</div>;
  if (isError) return <div className="p-10 text-red-500">Failed to load dashboard</div>;

  const dashboard = data?.data;

  /* =======================
     Transform API Data
  ======================= */

  const enrollmentData =
    dashboard?.enrollmentTrend?.map((item: any) => ({
      month: item.month,
      enrollments: item.enrollments,
    })) || [];

  const revenueData =
    dashboard?.monthlyRevenue?.map((item: any) => ({
      month: item.month,
      revenue: item.revenue,
    })) || [];

  const categoryData =
    dashboard?.categoryDistribution?.map((item: any) => ({
      name: item.categoryId.slice(-6), // যদি category name না থাকে
      value: item.percentage,
    })) || [];

  const instructorPerformance =
    dashboard?.topInstructors?.map((inst: any) => ({
      name: inst.name,
      revenue: inst.revenue,
      students: inst.totalStudents,
    })) || [];

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Platform Analytics</h1>
        <p className="text-muted-foreground">
          Comprehensive platform-wide analytics
        </p>
      </div>

      {/* KPI CARDS */}
      <div className="grid gap-4 sm:grid-cols-4">
        <KpiCard
          title="Total Revenue"
          value={`$${dashboard?.overview?.totalRevenue}`}
        />
        <KpiCard
          title="Total Enrollments"
          value={dashboard?.overview?.totalEnrollments}
        />
        <KpiCard
          title="Total Courses"
          value={dashboard?.overview?.totalCourses}
        />
        <KpiCard
          title="Total Users"
          value={dashboard?.overview?.totalUsers}
        />
      </div>

      {/* CHARTS */}
      <div className="grid gap-6 lg:grid-cols-2">

        {/* Enrollment Trend */}
        <ChartCard title="Enrollment Trend">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={enrollmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="enrollments"
                stroke="#2563eb"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Monthly Revenue */}
        <ChartCard title="Monthly Revenue">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="revenue"
                fill="#2563eb"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Category Distribution */}
        <ChartCard title="Course Category Distribution">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                outerRadius={100}
                label={({ name, value }) => `${name} ${value}%`}
              >
                {categoryData.map((_: any, index: number) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Top Instructors */}
        <ChartCard title="Top Instructors by Revenue">
          <div className="space-y-4">
            {instructorPerformance.map((inst: any, idx: number) => (
              <div key={idx} className="border-b pb-4 last:border-0">
                <div className="flex justify-between mb-2">
                  <h3 className="font-medium">{inst.name}</h3>
                  <span className="font-bold">
                    ${inst.revenue?.toFixed(2)}
                  </span>
                </div>

                <div className="w-full bg-muted rounded-full h-2 mb-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{
                      width: `${
                        (inst.revenue /
                          (dashboard?.overview?.totalRevenue || 1)) *
                        100
                      }%`,
                    }}
                  />
                </div>

                <div className="text-xs text-muted-foreground">
                  {inst.students} students
                </div>
              </div>
            ))}
          </div>
        </ChartCard>

      </div>
    </div>
  );
}

/* =======================
   Reusable Components
======================= */

function KpiCard({ title, value }: any) {
  return (
    <div className="rounded-lg border bg-card p-6">
      <div className="text-xs text-muted-foreground mb-2">{title}</div>
      <div className="text-3xl font-bold">{value}</div>
    </div>
  );
}

function ChartCard({ title, children }: any) {
  return (
    <div className="rounded-lg border bg-card p-6">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
}