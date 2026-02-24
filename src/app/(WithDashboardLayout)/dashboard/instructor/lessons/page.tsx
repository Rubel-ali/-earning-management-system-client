'use client';

import { useState } from 'react';
import { GripVertical, Plus, Edit2, Trash2, Eye, Lock } from 'lucide-react';

export default function LessonsPage() {
  const [selectedCourse, setSelectedCourse] = useState('1');
  const [showForm, setShowForm] = useState(false);

  const courses = [
    { id: '1', title: 'Advanced React Patterns' },
    { id: '2', title: 'Node.js Fundamentals' },
    { id: '3', title: 'React Performance Optimization' }
  ];

  const lessons = [
    {
      id: 1,
      title: 'Introduction to React Patterns',
      contentType: 'video',
      duration: 12,
      order: 1,
      isPreview: true,
      students_watched: 82
    },
    {
      id: 2,
      title: 'Higher Order Components',
      contentType: 'video',
      duration: 18,
      order: 2,
      isPreview: false,
      students_watched: 78
    },
    {
      id: 3,
      title: 'Render Props Pattern',
      contentType: 'video',
      duration: 15,
      order: 3,
      isPreview: false,
      students_watched: 72
    },
    {
      id: 4,
      title: 'Custom Hooks Deep Dive',
      contentType: 'article',
      duration: 8,
      order: 4,
      isPreview: false,
      students_watched: 65
    },
    {
      id: 5,
      title: 'Advanced Patterns Quiz',
      contentType: 'quiz',
      duration: 10,
      order: 5,
      isPreview: false,
      students_watched: 58
    }
  ];

  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return '🎥';
      case 'article':
        return '📄';
      case 'quiz':
        return '✓';
      default:
        return '📎';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-col sm:flex-row">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Manage Lessons</h1>
          <p className="text-muted-foreground">
            Create and organize course content
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-base font-medium text-primary-foreground hover:bg-primary/90 transition-colors whitespace-nowrap"
        >
          <Plus className="h-5 w-5" />
          Add Lesson
        </button>
      </div>

      {/* Course Selector */}
      <div className="flex gap-4 flex-col sm:flex-row">
        <div className="flex-1">
          <label className="block text-sm font-medium text-foreground mb-2">
            Select Course
          </label>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background transition-all"
          >
            {courses.map(course => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Add Lesson Form */}
      {showForm && (
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">
            Create New Lesson
          </h3>
          <form className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Title */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Lesson Title
                </label>
                <input
                  type="text"
                  placeholder="Enter lesson title"
                  className="w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background transition-all"
                />
              </div>

              {/* Content Type */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Content Type
                </label>
                <select className="w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background transition-all">
                  <option>Video</option>
                  <option>Article</option>
                  <option>Quiz</option>
                  <option>Assignment</option>
                </select>
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  placeholder="15"
                  className="w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background transition-all"
                />
              </div>

              {/* Content Upload */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Upload Content
                </label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <p className="text-sm text-muted-foreground">
                    Drag and drop your file here, or click to select
                  </p>
                </div>
              </div>

              {/* Preview Checkbox */}
              <div className="md:col-span-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-input"
                  />
                  <span className="text-sm font-medium text-foreground">
                    Make this lesson available for preview
                  </span>
                </label>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-lg border border-border bg-background px-6 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Create Lesson
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Lessons List */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-foreground">
          Course Lessons ({lessons.length})
        </h3>
        <div className="rounded-lg border border-border bg-card overflow-hidden">
          <div className="divide-y divide-border">
            {lessons.map((lesson) => (
              <div
                key={lesson.id}
                className="flex items-center gap-4 p-4 hover:bg-muted transition-colors group"
              >
                {/* Drag Handle */}
                <button className="flex-shrink-0 cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity">
                  <GripVertical className="h-5 w-5 text-muted-foreground" />
                </button>

                {/* Order */}
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-xs font-semibold text-foreground">
                    {lesson.order}
                  </span>
                </div>

                {/* Lesson Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-base">
                      {getContentTypeIcon(lesson.contentType)}
                    </span>
                    <h4 className="font-medium text-foreground">
                      {lesson.title}
                    </h4>
                    {lesson.isPreview && (
                      <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-700">
                        Preview
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{lesson.duration} min</span>
                    <span>{lesson.students_watched} students watched</span>
                    {!lesson.isPreview && (
                      <span className="flex items-center gap-1">
                        <Lock className="h-3 w-3" />
                        Locked
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-lg hover:bg-background transition-colors text-foreground">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-background transition-colors text-foreground">
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-background transition-colors text-destructive hover:bg-red-100">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="rounded-lg border border-border/50 bg-accent/5 p-6">
        <h4 className="font-semibold text-foreground mb-3">Tips for Creating Great Lessons</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>✓ Keep videos between 5-20 minutes for optimal engagement</li>
          <li>✓ Include a preview lesson to help students decide to enroll</li>
          <li>✓ Order lessons in a logical progression</li>
          <li>✓ Include quizzes or assignments to reinforce learning</li>
          <li>✓ Add downloadable resources to increase student satisfaction</li>
        </ul>
      </div>
    </div>
  );
}
