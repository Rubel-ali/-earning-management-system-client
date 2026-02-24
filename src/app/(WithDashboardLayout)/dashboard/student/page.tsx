'use client';

import Link from 'next/link';
import { BookOpen, Clock, Users, TrendingUp, ArrowRight, Star } from 'lucide-react';

export default function StudentDashboard() {
  const activeCourses = [
    {
      id: 1,
      title: 'Advanced React Patterns',
      instructor: 'Sarah Chen',
      progress: 65,
      image: 'bg-gradient-to-br from-blue-500 to-blue-600'
    },
    {
      id: 2,
      title: 'Web Design Fundamentals',
      instructor: 'Mike Johnson',
      progress: 42,
      image: 'bg-gradient-to-br from-purple-500 to-purple-600'
    },
    {
      id: 3,
      title: 'JavaScript Mastery',
      instructor: 'Emily Rodriguez',
      progress: 88,
      image: 'bg-gradient-to-br from-yellow-500 to-orange-600'
    }
  ];

  const topCourses = [
    {
      id: 10,
      title: 'Python for Data Science',
      instructor: 'Dr. James Lee',
      rating: 4.9,
      students: 4100,
      price: '$39.99',
      enrollments: 4100,
      image: 'bg-gradient-to-br from-green-500 to-green-600'
    },
    {
      id: 11,
      title: 'Advanced React Patterns',
      instructor: 'Sarah Chen',
      rating: 4.8,
      students: 3200,
      price: 'Free',
      enrollments: 3200,
      image: 'bg-gradient-to-br from-blue-500 to-blue-600'
    },
    {
      id: 12,
      title: 'Digital Marketing Essentials',
      instructor: 'Robert Martinez',
      rating: 4.7,
      students: 3400,
      price: '$24.99',
      enrollments: 3400,
      image: 'bg-gradient-to-br from-red-500 to-red-600'
    },
    {
      id: 13,
      title: 'UI/UX Design Principles',
      instructor: 'Emma Wilson',
      rating: 4.9,
      students: 2800,
      price: '$29.99',
      enrollments: 2800,
      image: 'bg-gradient-to-br from-pink-500 to-pink-600'
    },
    {
      id: 14,
      title: 'Mobile App Development',
      instructor: 'Lisa Anderson',
      rating: 4.8,
      students: 2600,
      price: 'Free',
      enrollments: 2600,
      image: 'bg-gradient-to-br from-purple-500 to-purple-600'
    }
  ];

  const stats = [
    {
      label: 'Active Courses',
      value: '3',
      icon: BookOpen,
      color: 'text-blue-600'
    },
    {
      label: 'Hours Studied',
      value: '24.5',
      icon: Clock,
      color: 'text-green-600'
    },
    {
      label: 'Certificates Earned',
      value: '2',
      icon: TrendingUp,
      color: 'text-purple-600'
    },
    {
      label: 'Skill Points',
      value: '850',
      icon: Users,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Welcome back, John</h1>
        <p className="text-muted-foreground">
          You have 3 active courses. Keep up the excellent progress!
        </p>
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

      {/* Active Courses Section */}
      <div>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Active Courses</h2>
          <Link
            href="/dashboard/student/my-enrollments"
            className="flex items-center gap-2 text-primary hover:underline text-sm font-medium"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {activeCourses.map((course) => (
            <Link
              key={course.id}
              href={`/dashboard/student/courses/${course.id}`}
              className="group rounded-lg border border-border bg-card overflow-hidden hover:border-primary/50 transition-all hover:shadow-lg"
            >
              {/* Course Image */}
              <div className={`h-32 w-full ${course.image}`} />
              
              {/* Course Content */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                  {course.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  by {course.instructor}
                </p>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-foreground">
                      Progress
                    </span>
                    <span className="text-xs font-medium text-primary">
                      {course.progress}%
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-accent transition-all"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Top 5 Trending Courses */}
      <div>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Top 5 Trending Courses</h2>
          <Link
            href="/dashboard/student/courses"
            className="flex items-center gap-2 text-primary hover:underline text-sm font-medium"
          >
            Browse All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          {topCourses.map((course, idx) => (
            <div
              key={course.id}
              className="group rounded-lg border border-border bg-card overflow-hidden hover:border-primary/50 transition-all hover:shadow-lg flex flex-col"
            >
              {/* Course Image */}
              <div className={`h-24 w-full ${course.image} relative`}>
                <div className="absolute top-2 right-2 bg-orange-400 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  #{idx + 1}
                </div>
              </div>

              {/* Course Content */}
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors mb-1 line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-xs text-muted-foreground mb-3">
                  by {course.instructor}
                </p>

                {/* Rating & Students */}
                <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-0.5">
                    <Star className="h-3 w-3 fill-orange-400 text-orange-400" />
                    <span className="font-medium text-foreground">{course.rating}</span>
                  </div>
                  <div>({(course.students / 1000).toFixed(1)}K)</div>
                </div>

                {/* Price & Enroll - Fixed at bottom */}
                <div className="mt-auto pt-3 border-t border-border flex items-center justify-between">
                  <span className="text-sm font-bold text-primary">
                    {course.price}
                  </span>
                  <button className="rounded px-3 py-1.5 text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                    Enroll
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
