'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Plus, Edit2, Trash2, Eye, EyeOff, MoreVertical, AlertCircle, X } from 'lucide-react';

export default function InstructorCoursesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; courseId: number | null; courseName: string }>({
    isOpen: false,
    courseId: null,
    courseName: ''
  });
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: 'Advanced React Patterns',
      category: 'Web Development',
      students: 82,
      revenue: '$820',
      rating: 4.8,
      status: 'published',
      lessons: 24,
      price: '$10'
    },
    {
      id: 2,
      title: 'Node.js Fundamentals',
      category: 'Backend',
      students: 56,
      revenue: '$560',
      rating: 4.6,
      status: 'published',
      lessons: 18,
      price: '$10'
    },
    {
      id: 3,
      title: 'React Performance Optimization',
      category: 'Web Development',
      students: 45,
      revenue: '$450',
      rating: 4.9,
      status: 'published',
      lessons: 15,
      price: '$10'
    },
    {
      id: 4,
      title: 'TypeScript Advanced',
      category: 'Web Development',
      students: 0,
      revenue: '$0',
      rating: 0,
      status: 'draft',
      lessons: 8,
      price: 'Free'
    }
  ]);

  const handlePublishCourse = (courseId: number) => {
    setCourses(courses.map(course =>
      course.id === courseId
        ? { ...course, status: course.status === 'published' ? 'draft' : 'published' }
        : course
    ));
  };

  const openDeleteModal = (courseId: number, courseName: string) => {
    setDeleteModal({ isOpen: true, courseId, courseName });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ isOpen: false, courseId: null, courseName: '' });
  };

  const handleDeleteCourse = () => {
    if (deleteModal.courseId) {
      setCourses(courses.filter(course => course.id !== deleteModal.courseId));
      closeDeleteModal();
    }
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || course.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-700';
      case 'draft':
        return 'bg-gray-100 text-gray-700';
      case 'archived':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-blue-100 text-blue-700';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-col sm:flex-row">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">My Courses</h1>
          <p className="text-muted-foreground">
            Create and manage your courses
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-base font-medium text-primary-foreground hover:bg-primary/90 transition-colors whitespace-nowrap">
          <Plus className="h-5 w-5" />
          New Course
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex gap-4 flex-col sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-input bg-background pl-10 pr-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background transition-all"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="rounded-lg border border-input bg-background px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background transition-all"
        >
          <option value="all">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      {/* Courses Table */}
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  Course
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  Students
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  Revenue
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  Rating
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredCourses.map((course) => (
                <tr key={course.id} className="hover:bg-muted transition-colors">
                  {/* Course Title */}
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-foreground">{course.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {course.lessons} lessons
                      </p>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {course.category}
                  </td>

                  {/* Students */}
                  <td className="px-6 py-4 text-sm font-medium text-foreground">
                    {course.students}
                  </td>

                  {/* Revenue */}
                  <td className="px-6 py-4 text-sm font-semibold text-primary">
                    {course.revenue}
                  </td>

                  {/* Rating */}
                  <td className="px-6 py-4 text-sm text-foreground">
                    {course.rating > 0 ? (
                      <span>⭐ {course.rating}</span>
                    ) : (
                      <span className="text-muted-foreground">No ratings</span>
                    )}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(course.status)}`}>
                      {course.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/dashboard/instructor/courses/${course.id}/edit`}
                        title="Edit course"
                        className="p-1.5 rounded-lg hover:bg-muted transition-colors text-foreground"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => handlePublishCourse(course.id)}
                        title={course.status === 'published' ? 'Unpublish course' : 'Publish course'}
                        className={`p-1.5 rounded-lg transition-colors ${
                          course.status === 'published'
                            ? 'text-primary hover:bg-primary/10'
                            : 'text-muted-foreground hover:bg-muted'
                        }`}
                      >
                        {course.status === 'published' ? (
                          <Eye className="h-4 w-4" />
                        ) : (
                          <EyeOff className="h-4 w-4" />
                        )}
                      </button>
                      <button
                        onClick={() => openDeleteModal(course.id, course.title)}
                        title="Delete course"
                        className="p-1.5 rounded-lg hover:bg-destructive/10 transition-colors text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
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
            Create your first course to get started
          </p>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModal.isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card border border-border rounded-lg shadow-lg max-w-sm w-full animate-in fade-in zoom-in-95 duration-300">
            <div className="p-6 space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="bg-destructive/10 rounded-full p-2.5">
                    <AlertCircle className="h-5 w-5 text-destructive" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-foreground">Delete Course?</h2>
                    <p className="text-xs text-muted-foreground mt-1">This action cannot be undone</p>
                  </div>
                </div>
                <button
                  onClick={closeDeleteModal}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Content */}
              <div className="bg-muted/30 rounded-lg p-3 border border-border/50">
                <p className="text-sm text-foreground">
                  Are you sure you want to delete <span className="font-semibold">"{deleteModal.courseName}"</span>?
                </p>
                <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                  <li>• All course content will be permanently deleted</li>
                  <li>• Students will lose access to this course</li>
                  <li>• This cannot be reversed</li>
                </ul>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={closeDeleteModal}
                  className="flex-1 px-4 py-2.5 rounded-lg border border-border bg-background text-foreground hover:bg-muted transition-colors font-medium text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteCourse}
                  className="flex-1 px-4 py-2.5 rounded-lg bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors font-medium text-sm"
                >
                  Delete Course
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
