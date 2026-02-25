"use client";

import { useMyPurchasedCoursesQuery } from "@/redux/features/course/courseApi";

export default function MyCoursesPage() {
  const { data, isLoading } = useMyPurchasedCoursesQuery(undefined);

  const courses = data?.data || [];

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Courses</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {courses.map((course: any) => (
          <div key={course.id} className="border rounded-lg p-4">
            <h3 className="font-semibold">{course.name}</h3>
            <p className="text-sm text-muted-foreground">
              {course.user?.username}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}