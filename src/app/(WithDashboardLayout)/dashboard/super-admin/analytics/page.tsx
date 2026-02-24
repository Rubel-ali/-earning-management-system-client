'use client';

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

/* =======================
   DATA
======================= */

const enrollmentData = [
  { month: 'Jan', enrollments: 2400, completions: 1200 },
  { month: 'Feb', enrollments: 3200, completions: 1800 },
  { month: 'Mar', enrollments: 2800, completions: 1600 },
  { month: 'Apr', enrollments: 3900, completions: 2200 },
  { month: 'May', enrollments: 4200, completions: 2600 },
  { month: 'Jun', enrollments: 4800, completions: 3100 },
];

const revenueData = [
  { month: 'Jan', revenue: 12400 },
  { month: 'Feb', revenue: 15200 },
  { month: 'Mar', revenue: 14800 },
  { month: 'Apr', revenue: 18900 },
  { month: 'May', revenue: 21200 },
  { month: 'Jun', revenue: 24800 },
];

const categoryData = [
  { name: 'Web Development', value: 35 },
  { name: 'Data Science', value: 25 },
  { name: 'Design', value: 20 },
  { name: 'Business', value: 15 },
  { name: 'Other', value: 5 },
];

/* Professional Unified Color System */
const COLORS = [
  '#2563eb', // Blue
  '#10b981', // Green
  '#8b5cf6', // Purple
  '#f59e0b', // Orange
  '#ef4444', // Red
];

const instructorPerformance = [
  { name: 'Sarah Chen', revenue: 15400, students: 3200, rating: 4.8 },
  { name: 'Lisa Anderson', revenue: 18450, students: 4100, rating: 4.8 },
  { name: 'Emma Wilson', revenue: 12600, students: 2800, rating: 4.9 },
  { name: 'Mike Johnson', revenue: 4800, students: 1200, rating: 4.7 },
  { name: 'James Lee', revenue: 22100, students: 4900, rating: 4.9 },
];

export default function SuperAdminAnalyticsPage() {
  return (
    <div className="space-y-8">

      {/* =======================
         HEADER
      ======================= */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          Platform Analytics
        </h1>
        <p className="text-muted-foreground">
          Comprehensive platform-wide analytics and performance metrics
        </p>
      </div>

      {/* =======================
         KPI CARDS
      ======================= */}
      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { title: 'Total Revenue', value: '$97,450', growth: '+18% vs last month' },
          { title: 'Total Enrollments', value: '24,400', growth: '+12% vs last month' },
          { title: 'Completion Rate', value: '65.2%', growth: '+3% vs last month' },
          { title: 'Active Instructors', value: '42', growth: '+4 this month' },
        ].map((card, i) => (
          <div key={i} className="rounded-lg border border-border bg-card p-6">
            <div className="text-xs font-medium text-muted-foreground mb-2">
              {card.title}
            </div>
            <div className="text-3xl font-bold text-foreground mb-2">
              {card.value}
            </div>
            <div className="text-xs text-green-600">{card.growth}</div>
          </div>
        ))}
      </div>

      {/* =======================
         CHARTS
      ======================= */}
      <div className="grid gap-6 lg:grid-cols-2">

        {/* Enrollment Trend */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Enrollment Trend
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={enrollmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="enrollments"
                stroke="#2563eb"
                strokeWidth={3}
              />
              <Line
                type="monotone"
                dataKey="completions"
                stroke="#10b981"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Trend */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Monthly Revenue
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip />
              <Bar
                dataKey="revenue"
                fill="#2563eb"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Course Category Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, value }) => `${name} ${value}%`}
              >
                {categoryData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Top Instructors */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Top Instructors by Revenue
          </h2>
          <div className="space-y-4">
            {instructorPerformance.map((instructor, idx) => (
              <div key={idx} className="border-b border-border pb-4 last:border-0">
                <div className="flex justify-between mb-2">
                  <h3 className="font-medium text-foreground">
                    {instructor.name}
                  </h3>
                  <span className="text-sm font-bold text-primary">
                    ${instructor.revenue.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 mb-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{
                      width: `${(instructor.revenue / 25000) * 100}%`,
                    }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>
                    {instructor.students.toLocaleString()} students
                  </span>
                  <span>★ {instructor.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}