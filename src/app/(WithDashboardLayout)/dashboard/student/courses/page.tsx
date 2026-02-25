"use client";

import { useState } from "react";
import { Search, Filter, Star, Users, Clock } from "lucide-react";
import toast from "react-hot-toast";

import {
  useAllPubsishedCoursesQuery,
  useCategoriesQuery,
  useBuyCourseMutation,
} from "@/redux/features/course/courseApi";

export default function BrowseCoursesPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const { data: courseRes, isLoading } =
    useAllPubsishedCoursesQuery(undefined);

  const { data: categoryRes } =
    useCategoriesQuery(undefined);

  const [buyCourse, { isLoading: isBuying }] =
    useBuyCourseMutation();

  const courses = courseRes?.data || [];

  const categories = [
    "All",
    ...(categoryRes?.data?.map((c: any) => c.name) || []),
  ];

  const handleEnroll = async (courseId: string) => {
    try {
      await buyCourse({
        courseId,
      }).unwrap();

      toast.success("Course purchased successfully 🚀");
    } catch (error: any) {
      console.error(error);
      toast.error(
        error?.data?.message || "Failed to purchase course"
      );
    }
  };

  const filteredCourses = courses.filter((course: any) => {
    const matchSearch =
      course.name.toLowerCase().includes(search.toLowerCase()) ||
      course.user?.username
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchCategory =
      category === "All" ||
      course.category?.name === category;

    return matchSearch && matchCategory;
  });

  if (isLoading)
    return <div className="p-10">Loading courses...</div>;

  return (
    <div className="space-y-8">

      <h1 className="text-3xl font-bold">
        Browse Courses
      </h1>

      {/* Search */}
      <div className="flex gap-4 flex-col md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-3 h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-lg px-10 py-2"
          />
        </div>

        <button className="border px-4 py-2 rounded-lg flex items-center gap-2">
          <Filter size={16} />
          Filters
        </button>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-lg border whitespace-nowrap ${
              category === cat
                ? "bg-primary text-white"
                : "bg-card"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Courses */}
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredCourses.map((course: any) => (
          <div
            key={course.id}
            className="border rounded-lg overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={course.thumbnailUrl}
              className="h-40 w-full object-cover"
            />

            <div className="p-5 space-y-3">
              <h3 className="font-semibold line-clamp-2">
                {course.name}
              </h3>

              <p className="text-sm text-muted-foreground">
                by {course.user?.username}
              </p>

              {/* Meta */}
              <div className="flex gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star size={15} />
                  {course.reviewCount}
                </div>

                <div className="flex items-center gap-1">
                  <Users size={15} />
                  {course.enrollmentCount}
                </div>

                <div className="flex items-center gap-1">
                  <Clock size={15} />
                  {course.videoDuration || "0h"}
                </div>
              </div>

              <div className="flex justify-between items-center pt-3 border-t">
                <span className="font-bold text-primary">
                  ${course.price}
                </span>

                <button
                  onClick={() => handleEnroll(course.id)}
                  disabled={isBuying}
                  className="bg-primary text-white px-4 py-2 rounded-lg text-sm disabled:opacity-50"
                >
                  {isBuying ? "Processing..." : "Enroll"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}