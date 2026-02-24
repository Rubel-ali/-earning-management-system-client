'use client';

import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, Users, Award, DollarSign } from 'lucide-react';

const enrollmentData = [
  { month: 'Jan', enrollments: 120, completions: 45 },
  { month: 'Feb', enrollments: 180, completions: 72 },
  { month: 'Mar', enrollments: 240, completions: 110 },
  { month: 'Apr', enrollments: 320, completions: 165 },
  { month: 'May', enrollments: 420, completions: 240 },
  { month: 'Jun', enrollments: 540, completions: 350 },
];

const courseRevenue = [
  { name: 'Advanced React', value: 4500 },
  { name: 'TypeScript Basics', value: 2800 },
  { name: 'Database Design', value: 3200 },
  { name: 'Web Security', value: 1500 },
];

const COLORS = ['#0ea5e9', '#8b5cf6', '#ec4899', '#f97316'];

const coursePerformance = [
  { name: 'Advanced React Patterns', students: 320, rating: 4.8, revenue: 4500 },
  { name: 'TypeScript Advanced', students: 180, rating: 4.7, revenue: 2800 },
  { name: 'Database Design Mastery', students: 210, rating: 4.9, revenue: 3200 },
  { name: 'Web Security Fundamentals', students: 95, rating: 4.6, revenue: 1500 },
  { name: 'JavaScript ES6+', students: 420, rating: 4.5, revenue: 3200 },
];

export default function InstructorAnalyticsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Analytics & Performance</h1>
        <p className="text-muted-foreground">
          Detailed insights into your courses and student engagement
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-4">
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <div className="text-xs font-medium text-muted-foreground">Total Students</div>
              <div className="text-2xl font-bold text-foreground">1,265</div>
            </div>
          </div>
          <div className="text-xs text-green-600">+180 this month</div>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-green-500/10">
              <Award className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <div className="text-xs font-medium text-muted-foreground">Completions</div>
              <div className="text-2xl font-bold text-foreground">782</div>
            </div>
          </div>
          <div className="text-xs text-green-600">61.8% completion rate</div>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-purple-500/10">
              <TrendingUp className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <div className="text-xs font-medium text-muted-foreground">Avg Rating</div>
              <div className="text-2xl font-bold text-foreground">4.7/5.0</div>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">Based on 450 reviews</div>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-orange-500/10">
              <DollarSign className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <div className="text-xs font-medium text-muted-foreground">Total Revenue</div>
              <div className="text-2xl font-bold text-foreground">$15,200</div>
            </div>
          </div>
          <div className="text-xs text-green-600">+$2,400 this month</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Enrollment & Completion Trend */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Enrollment & Completion Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={enrollmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis stroke="var(--muted-foreground)" style={{ fontSize: '12px' }} />
              <YAxis stroke="var(--muted-foreground)" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--background)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  color: 'var(--foreground)'
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="enrollments" stroke="#0ea5e9" strokeWidth={2} dot={{ fill: '#0ea5e9' }} />
              <Line type="monotone" dataKey="completions" stroke="#8b5cf6" strokeWidth={2} dot={{ fill: '#8b5cf6' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue by Course */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Revenue by Course</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={courseRevenue}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name} $${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {courseRevenue.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--background)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  color: 'var(--foreground)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Course Performance Table */}
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Course Performance Details</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-6 py-4 text-left text-xs font-semibold text-foreground uppercase tracking-wider">Course Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-foreground uppercase tracking-wider">Students</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-foreground uppercase tracking-wider">Rating</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-foreground uppercase tracking-wider">Revenue</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-foreground uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {coursePerformance.map((course, idx) => (
                <tr key={idx} className="border-b border-border hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">{course.name}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{course.students} enrolled</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium text-foreground">{course.rating}</span>
                      <span className="text-yellow-400">★</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-primary">${course.revenue.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-semibold px-2 py-1 rounded-full bg-green-500/10 text-green-700">Published</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Engagement Metrics */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="text-sm font-semibold text-foreground mb-4">Completion Metrics</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Avg. Completion Time</span>
              <span className="font-bold text-foreground">32 days</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Dropout Rate</span>
              <span className="font-bold text-destructive">38.2%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Completion Streak</span>
              <span className="font-bold text-foreground">Week 5</span>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="text-sm font-semibold text-foreground mb-4">Student Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Active This Week</span>
              <span className="font-bold text-foreground">456</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Avg. Session Duration</span>
              <span className="font-bold text-foreground">45 min</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Forum Posts</span>
              <span className="font-bold text-foreground">234</span>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="text-sm font-semibold text-foreground mb-4">Revenue Metrics</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Avg. Revenue/Student</span>
              <span className="font-bold text-foreground">$12.00</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Payout This Month</span>
              <span className="font-bold text-green-600">$10,640</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Platform Fee (30%)</span>
              <span className="font-bold text-foreground">$4,560</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
