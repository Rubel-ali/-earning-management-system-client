'use client';

import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

export default function AdminAnalyticsPage() {

  const enrollmentData = [
    { week: 'Week 1', enrollments: 120, completions: 45 },
    { week: 'Week 2', enrollments: 180, completions: 65 },
    { week: 'Week 3', enrollments: 250, completions: 95 },
    { week: 'Week 4', enrollments: 320, completions: 140 },
    { week: 'Week 5', enrollments: 410, completions: 185 },
    { week: 'Week 6', enrollments: 520, completions: 260 },
  ];

  const revenueData = [
    { month: 'Jan', revenue: 28500, target: 25000 },
    { month: 'Feb', revenue: 32100, target: 28000 },
    { month: 'Mar', revenue: 38500, target: 32000 },
    { month: 'Apr', revenue: 42300, target: 35000 },
    { month: 'May', revenue: 48700, target: 40000 },
    { month: 'Jun', revenue: 54800, target: 45000 },
  ];

  const categoryData = [
    { name: 'Web Dev', value: 32 },
    { name: 'Design', value: 24 },
    { name: 'Business', value: 22 },
    { name: 'Data Science', value: 15 },
    { name: 'Others', value: 7 },
  ];

  const chartColors = [
    'hsl(var(--chart-1))',
    'hsl(var(--chart-2))',
    'hsl(var(--chart-3))',
    'hsl(var(--chart-4))',
    'hsl(var(--chart-5))',
  ];

  return (
    <div className="space-y-8">

      <h1 className="text-3xl font-bold">
        Analytics Dashboard
      </h1>

      {/* LINE */}
      <div className="rounded-lg border border-border bg-card p-6">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={enrollmentData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="enrollments"
              stroke="hsl(var(--primary))"
              strokeWidth={3}
            />
            <Line
              type="monotone"
              dataKey="completions"
              stroke="hsl(var(--chart-2))"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* BAR */}
      <div className="rounded-lg border border-border bg-card p-6">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip />
            <Legend />
            <Bar dataKey="revenue" fill="hsl(var(--primary))" />
            <Bar dataKey="target" fill="hsl(var(--muted))" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* PIE */}
      <div className="rounded-lg border border-border bg-card p-6">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              outerRadius={80}
              dataKey="value"
              label={({ value }) => `${value}%`}
            >
              {categoryData.map((_, i) => (
                <Cell key={i} fill={chartColors[i]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}