'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff
} from 'lucide-react';

import {
  useCoursesQuery,
  useDeleteCourseMutation,
  useUpdateStatusMutation
} from '@/redux/features/course/courseApi';

export default function InstructorCoursesPage() {
  const { data, isLoading } = useCoursesQuery(undefined);
  const [deleteCourse] = useDeleteCourseMutation();
  const [updateStatus] = useUpdateStatusMutation();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    courseId: string | null;
    courseName: string;
  }>({
    isOpen: false,
    courseId: null,
    courseName: ''
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const courses = data?.data || [];

  // Search + Filter
  const filteredCourses = useMemo(() => {
    return courses.filter((course: any) => {
      const matchesSearch = course.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesStatus =
        filterStatus === 'all' ||
        course.activeStatus?.toLowerCase() === filterStatus;

      return matchesSearch && matchesStatus;
    });
  }, [courses, searchQuery, filterStatus]);

  const openDeleteModal = (courseId: string, courseName: string) => {
    setDeleteModal({ isOpen: true, courseId, courseName });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ isOpen: false, courseId: null, courseName: '' });
  };

  const handleDeleteCourse = async () => {
    if (!deleteModal.courseId) return;

    try {
      await deleteCourse(deleteModal.courseId).unwrap();
      closeDeleteModal();
    } catch (error) {
      console.error('Delete failed', error);
    }
  };

  const handlePublishToggle = async (course: any) => {
    try {
      const newStatus =
        course.activeStatus === 'PUBLISHED'
          ? 'DRAFT'
          : 'PUBLISHED';

      await updateStatus({
        id: course.id,
        body: { status: newStatus }
      }).unwrap();

    } catch (error) {
      console.error('Status update failed', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PUBLISHED':
        return 'bg-green-100 text-green-700';
      case 'DRAFT':
        return 'bg-gray-100 text-gray-700';
      case 'ARCHIVED':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-blue-100 text-blue-700';
    }
  };

  if (isLoading) {
    return <div className="p-10 text-center">Loading Courses...</div>;
  }

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

        <Link
          href="/dashboard/instructor/courses/create"
          className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-base font-medium text-primary-foreground hover:bg-primary/90 transition-colors whitespace-nowrap"
        >
          <Plus className="h-5 w-5" />
          New Course
        </Link>
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
            className="w-full rounded-lg border border-input bg-background pl-10 pr-4 py-2.5"
          />
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="rounded-lg border border-input bg-background px-4 py-2.5"
        >
          <option value="all">All Status</option>
          <option value="published">Published</option>
          <option value="inactive">Inactive</option>
          <option value="archived">Archived</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      {/* Courses Table */}
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">Course</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Category</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Students</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Revenue</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Rating</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {filteredCourses.map((course: any) => (
                <tr key={course.id} className="hover:bg-muted transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium">{course.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {course.videoCount} lessons
                    </p>
                  </td>

                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {course.category?.name}
                  </td>

                  <td className="px-6 py-4 text-sm font-medium">
                    {course.reviewCount}
                  </td>

                  <td className="px-6 py-4 text-sm font-semibold text-primary">
                    ${course.price}
                  </td>

                  <td className="px-6 py-4 text-sm">
                    {course.reviewCount > 0 ? (
                      <span>⭐ {course.reviewCount}</span>
                    ) : (
                      <span className="text-muted-foreground">No ratings</span>
                    )}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        course.activeStatus
                      )}`}
                    >
                      {course.activeStatus}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/dashboard/instructor/courses/${course.id}/edit`}
                        className="p-1.5 rounded-lg hover:bg-muted"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Link>

                      <button
                        onClick={() => handlePublishToggle(course)}
                        className="p-1.5 rounded-lg hover:bg-muted"
                      >
                        {course.activeStatus === 'PUBLISHED' ? (
                          <Eye className="h-4 w-4 text-primary" />
                        ) : (
                          <EyeOff className="h-4 w-4" />
                        )}
                      </button>

                      <button
                        onClick={() =>
                          openDeleteModal(course.id, course.name)
                        }
                        className="p-1.5 rounded-lg text-destructive hover:bg-destructive/10"
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

      {filteredCourses.length === 0 && (
        <div className="rounded-lg border border-dashed p-12 text-center">
          <h3 className="text-lg font-semibold mb-2">
            No courses found
          </h3>
          <p className="text-sm text-muted-foreground">
            Create your first course to get started
          </p>
        </div>
      )}

      {/* Delete Modal */}
      {deleteModal.isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card border rounded-lg shadow-lg max-w-sm w-full">
            <div className="p-6 space-y-4">
              <h2 className="text-lg font-semibold">Delete Course?</h2>
              <p className="text-sm">
                Are you sure you want to delete &quot;
                {deleteModal.courseName}&quot;?
              </p>

              <div className="flex gap-3">
                <button
                  onClick={closeDeleteModal}
                  className="flex-1 px-4 py-2 rounded-lg border"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteCourse}
                  className="flex-1 px-4 py-2 rounded-lg bg-destructive text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}