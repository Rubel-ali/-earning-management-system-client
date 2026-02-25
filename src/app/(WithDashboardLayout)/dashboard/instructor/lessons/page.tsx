"use client";

import { useState } from "react";
import {
  GripVertical,
  Plus,
  Edit2,
  Trash2,
  Eye
} from "lucide-react";
import toast from "react-hot-toast";
import {
  useAllVideosQuery,
  useCreateVideoMutation,
  useDeleteVideoMutation,
} from "@/redux/features/lesson/lessonApi";
import { useCoursesQuery } from "@/redux/features/course/courseApi";


export default function LessonsPage() {
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [showForm, setShowForm] = useState(false);

  const { data: coursesData } = useCoursesQuery(undefined);
  const courses = coursesData?.data || [];

  const {
    data: videosData,
    isLoading,
  } = useAllVideosQuery(selectedCourse, {
    skip: !selectedCourse,
  });

  const lessons = videosData?.data || [];

  const [createVideo] = useCreateVideoMutation();
  const [deleteVideo] = useDeleteVideoMutation();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateLesson = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCourse) return toast.error("Select a course");
    if (!thumbnailFile) return toast.error("Thumbnail required");
    if (!videoFile) return toast.error("Video required");

    try {
      setIsSubmitting(true);

      const payload = {
        name: title,
        title,
        description,
      };

      const formData = new FormData();
      formData.append("text", JSON.stringify(payload));
      formData.append("file", thumbnailFile);
      formData.append("video", videoFile);

      await createVideo({
        courseId: selectedCourse,
        formData,
      }).unwrap();

      toast.success("Lesson created successfully 🚀");

      setTitle("");
      setDescription("");
      setThumbnailFile(null);
      setVideoFile(null);
      setShowForm(false);
    } catch  {
      toast.error("Failed to create lesson");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteVideo(id).unwrap();
      toast.success("Lesson deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Manage Lessons</h1>
          <p className="text-muted-foreground">
            Create and organize course content
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-primary px-6 py-2 rounded text-white"
        >
          <Plus size={18} />
          Add Lesson
        </button>
      </div>

      {/* Course Selector */}
      <div>
        <label className="block mb-2 font-medium">Select Course</label>
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="w-full border rounded p-2"
        >
          <option value="">Choose Course</option>
          {courses.map((course: any) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </select>
      </div>

      {/* Create Form */}
      {showForm && (
        <div className="border rounded p-6 bg-card">
          <h3 className="font-semibold mb-4">Create New Lesson</h3>

          <form onSubmit={handleCreateLesson} className="space-y-4">

            <input
              type="text"
              placeholder="Lesson title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded p-2"
              required
            />

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded p-2"
              required
            />

            <div>
              <label className="block mb-1">Thumbnail</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setThumbnailFile(e.target.files?.[0] || null)
                }
                required
              />
            </div>

            <div>
              <label className="block mb-1">Video File</label>
              <input
                type="file"
                accept="video/*"
                onChange={(e) =>
                  setVideoFile(e.target.files?.[0] || null)
                }
                required
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="border px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary text-white px-6 py-2 rounded"
              >
                {isSubmitting ? "Creating..." : "Create Lesson"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Lessons List */}
      <div className="border rounded bg-card">

        {isLoading && (
          <p className="p-4 text-sm">Loading lessons...</p>
        )}

        {!isLoading && lessons.length === 0 && selectedCourse && (
          <p className="p-4 text-sm text-muted-foreground">
            No lessons found
          </p>
        )}

        {lessons.map((lesson: any, index: number) => (
          <div
            key={lesson.id}
            className="flex items-center gap-4 p-4 border-b last:border-none"
          >
            <GripVertical size={16} />

            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs">
              {index + 1}
            </div>

            <div className="flex-1">
              <h4 className="font-medium">{lesson.title}</h4>
              <p className="text-xs text-muted-foreground">
                {lesson.videoDuration || "0"} min
              </p>
            </div>

            <button className="p-2 hover:bg-muted rounded">
              <Eye size={16} />
            </button>

            <button className="p-2 hover:bg-muted rounded">
              <Edit2 size={16} />
            </button>

            <button
              onClick={() => handleDelete(lesson.id)}
              className="p-2 text-red-500 hover:bg-red-100 rounded"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}