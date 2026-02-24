'use client';

import { useState } from 'react';
import { CheckCircle } from 'lucide-react';

type TabType = 'active' | 'completed' | 'dropped';

export default function MyEnrollmentsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('active');

  const enrollments = {
    active: [
      {
        id: 1,
        title: 'Advanced React Patterns',
        instructor: 'Sarah Chen',
        progress: 65,
        lastAccessed: '2 days ago',
        lessonsCompleted: 15,
        totalLessons: 24,
        image: 'bg-gradient-to-br from-blue-500 to-blue-600'
      }
    ],
    completed: [
      {
        id: 4,
        title: 'HTML & CSS Essentials',
        instructor: 'David Brown',
        completedDate: 'Dec 2024',
        certificateEarned: true,
        image: 'bg-gradient-to-br from-green-500 to-green-600'
      }
    ],
    dropped: [
      {
        id: 6,
        title: 'Node.js Backend Development',
        instructor: 'Lisa Anderson',
        droppedDate: '3 months ago',
        image: 'bg-gradient-to-br from-pink-500 to-pink-600'
      }
    ]
  };

  const tabButtonStyle = (tab: TabType) =>
    `px-4 py-2 text-sm font-medium rounded-lg transition-all ${
      activeTab === tab
        ? 'bg-primary text-white'
        : 'bg-muted text-muted-foreground hover:bg-muted/70'
    }`;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">My Enrollments</h1>
        <p className="text-muted-foreground">
          Manage your courses and track your progress
        </p>
      </div>

      {/* Custom Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('active')}
          className={tabButtonStyle('active')}
        >
          Active ({enrollments.active.length})
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={tabButtonStyle('completed')}
        >
          Completed ({enrollments.completed.length})
        </button>
        <button
          onClick={() => setActiveTab('dropped')}
          className={tabButtonStyle('dropped')}
        >
          Dropped ({enrollments.dropped.length})
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'active' && (
        <div className="space-y-6">
          {enrollments.active.map((course) => (
            <div
              key={course.id}
              className="border rounded-lg p-6 bg-card space-y-4"
            >
              <h3 className="text-lg font-semibold">{course.title}</h3>
              <p className="text-sm text-muted-foreground">
                by {course.instructor}
              </p>

              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-primary"
                  style={{ width: `${course.progress}%` }}
                />
              </div>

              <button className="rounded-lg bg-primary px-4 py-2 text-white text-sm">
                Continue Learning
              </button>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'completed' && (
        <div className="space-y-6">
          {enrollments.completed.map((course) => (
            <div
              key={course.id}
              className="border rounded-lg p-6 bg-card space-y-4"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{course.title}</h3>
                <CheckCircle className="text-green-600" />
              </div>
              <p className="text-sm text-muted-foreground">
                Completed {course.completedDate}
              </p>

              <button className="rounded-lg border px-4 py-2 text-sm text-primary border-primary">
                Download Certificate
              </button>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'dropped' && (
        <div className="space-y-6">
          {enrollments.dropped.map((course) => (
            <div
              key={course.id}
              className="border rounded-lg p-6 bg-card opacity-75 space-y-4"
            >
              <h3 className="text-lg font-semibold">{course.title}</h3>
              <p className="text-sm text-muted-foreground">
                Dropped {course.droppedDate}
              </p>

              <button className="rounded-lg bg-primary px-4 py-2 text-white text-sm">
                Re-enroll
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}