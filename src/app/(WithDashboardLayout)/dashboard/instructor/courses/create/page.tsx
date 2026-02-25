'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import {
  useCreateCourseMutation,
  useCategoriesQuery,
} from '@/redux/features/course/courseApi';

export default function CreateCoursePage() {
  const router = useRouter();
  const [createCourse] = useCreateCourseMutation();
  const { data: categoryData, isLoading: categoryLoading } =
    useCategoriesQuery(undefined);

  const categories = categoryData?.data || [];

  const [formData, setFormData] = useState<any>({
    name: '',
    description: '',
    price: 0,
    level: '',
    categoryId: '',
    thumbnail: null,
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === 'price' ? Number(value) : value,
    });
  };

  const handleFile = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFormData({
      ...formData,
      thumbnail: file,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      if (!formData.thumbnail) {
        toast.error('Thumbnail is required');
        return;
      }

      const form = new FormData();

      const payload = {
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        level: formData.level,
        categoryId: formData.categoryId,
      };

      form.append('text', JSON.stringify(payload));
      form.append('file', formData.thumbnail);

      await createCourse(form).unwrap();

      toast.success('Course created successfully');
      router.push('/dashboard/instructor/courses');

    } catch (err: any) {
      toast.error(err?.data?.message || 'Course creation failed');
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Create Course</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="name"
          placeholder="Course Title"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 w-full rounded-lg"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 w-full rounded-lg"
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="border p-2 w-full rounded-lg"
          required
        />

        {/* Level Dropdown */}
        <select
          name="level"
          value={formData.level}
          onChange={handleChange}
          className="border p-2 w-full rounded-lg"
          required
        >
          <option value="">Select Level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>

        {/* 🔥 Dynamic Category Dropdown */}
        <select
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          className="border p-2 w-full rounded-lg"
          required
        >
          <option value="">Select Category</option>

          {categoryLoading ? (
            <option disabled>Loading...</option>
          ) : (
            categories.map((cat: any) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))
          )}
        </select>

        <input
          type="file"
          onChange={handleFile}
          accept="image/*"
          className="border p-2 w-full rounded-lg"
          required
        />

        <button
          type="submit"
          className="bg-primary rounded-lg px-6 py-2.5 text-base font-medium text-primary-foreground hover:bg-primary/90 text-white p-2 w-full"
        >
          Create Course
        </button>

      </form>
    </div>
  );
}