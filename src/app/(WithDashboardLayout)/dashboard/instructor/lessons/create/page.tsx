"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useCreateVideoMutation } from "@/redux/features/lesson/lessonApi";

export default function CreateLessonPage() {
  const { id } = useParams();
  const router = useRouter();

  const [createLesson, { isLoading }] = useCreateVideoMutation();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!thumbnail) {
      alert("Thumbnail is required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("thumbnail", thumbnail);

    if (video) {
      formData.append("video", video);
    }

    try {
      await createLesson({
        courseId: id,
        formData,
      }).unwrap();

      alert("Lesson Created Successfully");

      router.push(`/dashboard/instructor/courses/${id}`);
    } catch (error: any) {
      alert(error?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6">Create Lesson</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-2 font-medium">Title</label>
          <input
            type="text"
            required
            className="w-full border rounded-lg px-4 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Description</label>
          <textarea
            className="w-full border rounded-lg px-4 py-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Thumbnail (Required)
          </label>
          <input
            type="file"
            accept="image/*"
            required
            onChange={(e) =>
              setThumbnail(e.target.files?.[0] || null)
            }
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Video (Optional)
          </label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) =>
              setVideo(e.target.files?.[0] || null)
            }
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          {isLoading ? "Creating..." : "Create Lesson"}
        </button>
      </form>
    </div>
  );
}