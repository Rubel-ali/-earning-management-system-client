'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, BookOpen, Zap } from 'lucide-react';

export default function ProgressPage() {
  const progressData = [
    { week: 'Week 1', hours: 4, lessons: 3 },
    { week: 'Week 2', hours: 6, lessons: 5 },
    { week: 'Week 3', hours: 5, lessons: 4 },
    { week: 'Week 4', hours: 8, lessons: 6 },
    { week: 'Week 5', hours: 7, lessons: 5 },
    { week: 'Week 6', hours: 9, lessons: 7 },
  ];

  const courseProgress = [
    { name: 'Advanced React', completion: 65, target: 100 },
    { name: 'Web Design', completion: 42, target: 100 },
    { name: 'JavaScript', completion: 88, target: 100 },
  ];

  const stats = [
    {
      label: 'Total Hours',
      value: '39.5 hrs',
      change: '+12%',
      icon: BookOpen,
      color: 'text-blue-600'
    },
    {
      label: 'Lessons Completed',
      value: '30',
      change: '+8 this month',
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      label: 'Streak',
      value: '7 days',
      change: 'Keep it up!',
      icon: Zap,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Your Progress</h1>
        <p className="text-muted-foreground">
          Track your learning journey and achievements
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
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
                  <p className="mt-1 text-xs text-primary font-medium">{stat.change}</p>
                </div>
                <Icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Hours & Lessons Chart */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Weekly Activity
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis
                dataKey="week"
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
                dataKey="hours"
                stroke="var(--color-primary)"
                name="Hours Studied"
                strokeWidth={2}
                dot={{ fill: 'var(--color-primary)' }}
              />
              <Line
                type="monotone"
                dataKey="lessons"
                stroke="var(--color-accent)"
                name="Lessons Completed"
                strokeWidth={2}
                dot={{ fill: 'var(--color-accent)' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Course Progress Chart */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Course Progress
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={courseProgress}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis
                dataKey="name"
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
              <Bar
                dataKey="completion"
                fill="var(--color-primary)"
                name="Completion %"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Course Progress */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">
          Detailed Progress by Course
        </h3>
        <div className="space-y-6">
          {courseProgress.map((course, idx) => (
            <div key={idx} className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-foreground">{course.name}</h4>
                <span className="text-sm font-bold text-primary">
                  {course.completion}%
                </span>
              </div>
              <div className="h-3 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent transition-all"
                  style={{ width: `${course.completion}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>You've completed {course.completion}% of this course</span>
                <span>{100 - course.completion}% remaining</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">
          Recent Achievements
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            {
              title: 'First Lesson Completed',
              description: 'Completed your first lesson',
              date: 'Jan 2, 2026'
            },
            {
              title: 'Week Streak',
              description: 'Studied 7 days in a row',
              date: 'Jan 8, 2026'
            },
            {
              title: 'Course Complete',
              description: 'Finished HTML & CSS Essentials',
              date: 'Dec 20, 2025'
            },
            {
              title: '50 Hours Milestone',
              description: 'Studied over 50 hours total',
              date: 'Dec 15, 2025'
            }
          ].map((achievement, idx) => (
            <div
              key={idx}
              className="rounded-lg border border-border bg-muted/30 p-4"
            >
              <h4 className="font-semibold text-foreground mb-1">
                🏆 {achievement.title}
              </h4>
              <p className="text-sm text-muted-foreground mb-2">
                {achievement.description}
              </p>
              <p className="text-xs text-muted-foreground">{achievement.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
