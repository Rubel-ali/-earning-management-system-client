'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import toast from 'react-hot-toast';

import {
  useSingleCourseQuery,
  useUpdateCourseMutation,
} from '@/redux/features/course/courseApi';

export default function EditCoursePage() {
  const router = useRouter();
  const params = useParams();
  const courseId = params.id as string;

  const { data, isLoading } = useSingleCourseQuery(courseId);
  const [updateCourse] = useUpdateCourseMutation();

  const [formData, setFormData] = useState<any>({
    title: '',
    description: '',
    categoryId: '',
    level: '',
    price: 0,
    isPublished: false,
    thumbnail: null,
  });

  const [thumbnailPreview, setThumbnailPreview] =
    useState<string | null>(null);

  // ✅ Available Levels
  const levels = [
    'Beginner',
    'Intermediate',
    'Advanced',
  ];

  useEffect(() => {
    if (data?.data) {
      const course = data.data;

      setFormData({
        title: course.name || '',
        description: course.description || '',
        categoryId: course.categoryId || '', // থাকবে কিন্তু show হবে না
        level: course.level || '',
        price: course.price || 0,
        isPublished: course.activeStatus === 'PUBLISHED',
        thumbnail: null,
      });

      setThumbnailPreview(course.thumbnailUrl);
    }
  }, [data]);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]:
        type === 'checkbox'
          ? checked
          : name === 'price'
          ? Number(value)
          : value,
    });
  };

  const handleFile = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFormData({ ...formData, thumbnail: file });

    const reader = new FileReader();
    reader.onload = (event) =>
      setThumbnailPreview(event.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const form = new FormData();

      const coursePayload = {
        name: formData.title,
        description: formData.description,
        categoryId: formData.categoryId, // backend এ যাবে কিন্তু UI তে দেখাবো না
        level: formData.level,
        price: Number(formData.price),
        activeStatus: formData.isPublished ? 'PUBLISHED' : 'DRAFT',
      };

      form.append('text', JSON.stringify(coursePayload));

      if (formData.thumbnail) {
        form.append('file', formData.thumbnail);
      }

      await updateCourse({
        id: courseId,
        body: form,
      }).unwrap();

      toast.success('Course updated successfully');
      router.push('/dashboard/instructor/courses');
    } catch (err: any) {
      toast.error(err?.data?.message || 'Update failed');
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">

      {/* Title */}
      <input
        type="text"
        name="title"
        placeholder="Course Title"
        value={formData.title}
        onChange={handleChange}
        className="border p-2 w-full rounded-lg"
      />

      {/* Description */}
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="border p-2 w-full rounded-lg"
      />

      {/* ✅ Level Dropdown */}
      <select
        name="level"
        value={formData.level}
        onChange={handleChange}
        className="border p-2 w-full rounded-lg"
      >
        <option value="">Select Level</option>
        {levels.map((lvl) => (
          <option key={lvl} value={lvl}>
            {lvl}
          </option>
        ))}
      </select>

      {/* Price */}
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        className="border p-2 w-full rounded-lg"
      />

      {/* Publish Checkbox */}
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="isPublished"
          checked={formData.isPublished}
          onChange={handleChange}
        />
        Published
      </label>

      {/* Thumbnail Preview */}
      {thumbnailPreview && (
        <img
          src={thumbnailPreview}
          className="h-40 object-cover"
        />
      )}

      <input type="file" onChange={handleFile} />

      <button
        type="submit"
        className="bg-primary rounded-lg px-6 py-2.5 text-base font-medium text-primary-foreground hover:bg-primary/90 text-white p-2 w-full"
      >
        Update Course
      </button>
    </form>
  );
}