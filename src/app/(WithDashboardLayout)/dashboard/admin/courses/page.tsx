'use client';

import { useState } from 'react';
import { Search, Edit2, Eye, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export default function AdminManageCoursesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: 'Advanced React Patterns',
      instructor: 'Sarah Chen',
      category: 'Web Development',
      students: 234,
      status: 'published',
      rating: 4.8,
      revenue: '$2,340',
      createdDate: '2024-01-15'
    },
    {
      id: 2,
      title: 'UI/UX Design Principles',
      instructor: 'Emma Wilson',
      category: 'Design',
      students: 156,
      status: 'published',
      rating: 4.9,
      revenue: '$1,560',
      createdDate: '2024-01-20'
    },
    {
      id: 3,
      title: 'Python for Data Science',
      instructor: 'Dr. James Lee',
      category: 'Data Science',
      students: 421,
      status: 'published',
      rating: 4.7,
      revenue: '$4,210',
      createdDate: '2024-02-01'
    },
    {
      id: 4,
      title: 'JavaScript Mastery',
      instructor: 'Emily Rodriguez',
      category: 'Web Development',
      students: 89,
      status: 'flagged',
      rating: 3.2,
      revenue: '$890',
      createdDate: '2024-02-10'
    },
    {
      id: 5,
      title: 'Business Strategy Masterclass',
      instructor: 'Michael Zhang',
      category: 'Business',
      students: 145,
      status: 'draft',
      rating: 4.6,
      revenue: '$0',
      createdDate: '2024-02-15'
    },
    {
      id: 6,
      title: 'Digital Marketing Essentials',
      instructor: 'Robert Martinez',
      category: 'Business',
      students: 267,
      status: 'published',
      rating: 4.5,
      revenue: '$2,670',
      createdDate: '2024-02-20'
    },
  ]);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || course.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleApproveCourse = (courseId: number) => {
    setCourses(courses.map(course =>
      course.id === courseId
        ? { ...course, status: 'published' }
        : course
    ));
  };

  const handleRejectCourse = (courseId: number) => {
    setCourses(courses.filter(course => course.id !== courseId));
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      published: { bg: 'bg-green-500/10', text: 'text-green-600', icon: CheckCircle, label: 'Published' },
      draft: { bg: 'bg-gray-500/10', text: 'text-gray-600', icon: AlertCircle, label: 'Draft' },
      flagged: { bg: 'bg-red-500/10', text: 'text-red-600', icon: XCircle, label: 'Flagged' },
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config?.icon || AlertCircle;
    return (
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${config?.bg}`}>
        <Icon className={`h-3.5 w-3.5 ${config?.text}`} />
        <span className={`text-xs font-medium ${config?.text}`}>{config?.label}</span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-foreground">Manage Courses</h1>
        <p className="text-muted-foreground">
          Monitor, review, and manage all courses on the platform
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Total Courses</p>
          <p className="mt-2 text-2xl font-bold text-foreground">{courses.length}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Published</p>
          <p className="mt-2 text-2xl font-bold text-green-600">
            {courses.filter(c => c.status === 'published').length}
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Flagged for Review</p>
          <p className="mt-2 text-2xl font-bold text-red-600">
            {courses.filter(c => c.status === 'flagged').length}
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Total Revenue</p>
          <p className="mt-2 text-2xl font-bold text-primary">
            ${courses.reduce((sum, c) => sum + parseInt(c.revenue.replace('$', '').replace(',', '')), 0).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 flex-col sm:flex-row">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search courses or instructors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="all">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="flagged">Flagged</option>
        </select>
      </div>

      {/* Courses Table */}
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Course</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Instructor</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Students</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Rating</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredCourses.map((course) => (
                <tr key={course.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-foreground">{course.title}</p>
                      <p className="text-xs text-muted-foreground">{course.category}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">{course.instructor}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{course.students}</td>
                  <td className="px-6 py-4 text-sm font-medium text-foreground">{course.rating}/5</td>
                  <td className="px-6 py-4 text-sm font-medium text-primary">{course.revenue}</td>
                  <td className="px-6 py-4">{getStatusBadge(course.status)}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {course.status === 'flagged' && (
                        <>
                          <button
                            onClick={() => handleApproveCourse(course.id)}
                            title="Approve course"
                            className="p-1.5 rounded-lg hover:bg-green-500/10 transition-colors text-green-600"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleRejectCourse(course.id)}
                            title="Reject course"
                            className="p-1.5 rounded-lg hover:bg-red-500/10 transition-colors text-red-600"
                          >
                            <XCircle className="h-4 w-4" />
                          </button>
                        </>
                      )}
                      <button
                        title="View details"
                        className="p-1.5 rounded-lg hover:bg-muted transition-colors text-foreground"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        title="Edit course"
                        className="p-1.5 rounded-lg hover:bg-muted transition-colors text-foreground"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {filteredCourses.length === 0 && (
        <div className="rounded-lg border border-border border-dashed bg-muted/30 p-12 text-center">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No courses found
          </h3>
          <p className="text-sm text-muted-foreground">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
}
