'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BarChart3, Users, TrendingUp, BookOpen, ArrowRight, Plus } from 'lucide-react';
import Link from 'next/link';

export default function InstructorDashboard() {
  const enrollmentData = [
    { month: 'Jan', enrollments: 25 },
    { month: 'Feb', enrollments: 45 },
    { month: 'Mar', enrollments: 65 },
    { month: 'Apr', enrollments: 80 },
    { month: 'May', enrollments: 95 },
    { month: 'Jun', enrollments: 120 },
  ];

  const stats = [
    {
      label: 'Active Courses',
      value: '5',
      icon: BookOpen,
      color: 'text-blue-600'
    },
    {
      label: 'Total Students',
      value: '342',
      icon: Users,
      color: 'text-green-600'
    },
    {
      label: 'Total Revenue',
      value: '$2,450',
      icon: TrendingUp,
      color: 'text-purple-600'
    },
    {
      label: 'Avg Rating',
      value: '4.8/5',
      icon: BarChart3,
      color: 'text-orange-600'
    }
  ];

  const recentCourses = [
    {
      id: 1,
      title: 'Advanced React Patterns',
      students: 82,
      revenue: '$820',
      rating: 4.8,
      status: 'Published'
    },
    {
      id: 2,
      title: 'Node.js Fundamentals',
      students: 56,
      revenue: '$560',
      rating: 4.6,
      status: 'Published'
    },
    {
      id: 3,
      title: 'React Performance Optimization',
      students: 45,
      revenue: '$450',
      rating: 4.9,
      status: 'Published'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Instructor Dashboard</h1>
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
                  <p className="mt-2 text-3xl font-bold text-foreground">{stat.value}</p>
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
              style={{ fontSize: '12px' }}
            />
            <YAxis stroke="var(--color-muted-foreground)" style={{ fontSize: '12px' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--color-card)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="enrollments"
              stroke="var(--color-primary)"
              strokeWidth={2}
              dot={{ fill: 'var(--color-primary)' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Courses */}
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

        <div className="rounded-lg border border-border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                    Course Title
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                    Students
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                    Revenue
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentCourses.map((course) => (
                  <tr key={course.id} className="hover:bg-muted transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-foreground">
                      {course.title}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {course.students}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-primary">
                      {course.revenue}
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">
                      ⭐ {course.rating}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        {course.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Link
          href="/dashboard/instructor/courses"
          className="rounded-lg border border-border bg-card p-6 hover:border-primary/50 hover:shadow-lg transition-all group"
        >
          <BookOpen className="h-8 w-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="font-semibold text-foreground mb-1">Create Course</h3>
          <p className="text-sm text-muted-foreground">Launch a new course</p>
        </Link>
        
        <Link
          href="/dashboard/instructor/lessons"
          className="rounded-lg border border-border bg-card p-6 hover:border-primary/50 hover:shadow-lg transition-all group"
        >
          <Zap className="h-8 w-8 text-accent mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="font-semibold text-foreground mb-1">Add Lessons</h3>
          <p className="text-sm text-muted-foreground">Upload course content</p>
        </Link>

        <Link
          href="/dashboard/instructor/analytics"
          className="rounded-lg border border-border bg-card p-6 hover:border-primary/50 hover:shadow-lg transition-all group"
        >
          <BarChart3 className="h-8 w-8 text-green-600 mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="font-semibold text-foreground mb-1">View Analytics</h3>
          <p className="text-sm text-muted-foreground">Track student progress</p>
        </Link>
      </div>
    </div>
  );
}

const Zap = BookOpen; // fallback if Zap not available
