'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Upload, X, Plus, Eye, EyeOff } from 'lucide-react';

export default function CreateLessonPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    courseId: '',
    videoUrl: '',
    duration: '0',
    isPreview: false,
    contentType: 'video',
    content: '',
    resources: [] as { name: string; url: string }[],
    order: '1',
  });

  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const courses = [
    { id: '1', title: 'Advanced React Patterns' },
    { id: '2', title: 'Node.js Fundamentals' },
    { id: '3', title: 'React Performance Optimization' },
    { id: '4', title: 'TypeScript Advanced' },
  ];

  const contentTypes = [
    { value: 'video', label: 'Video Lesson' },
    { value: 'text', label: 'Text Content' },
    { value: 'quiz', label: 'Quiz' },
    { value: 'assignment', label: 'Assignment' },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      setFormData({ ...formData, videoUrl: file.name });
    }
  };

  const addResource = () => {
    setFormData({
      ...formData,
      resources: [...formData.resources, { name: '', url: '' }],
    });
  };

  const updateResource = (index: number, field: 'name' | 'url', value: string) => {
    const newResources = [...formData.resources];
    newResources[index][field] = value;
    setFormData({ ...formData, resources: newResources });
  };

  const removeResource = (index: number) => {
    const newResources = formData.resources.filter((_, i) => i !== index);
    setFormData({ ...formData, resources: newResources });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('[v0] Lesson created:', { ...formData, videoFile });
      router.push('/dashboard/instructor/lessons');
    } catch (error) {
      console.error('Error creating lesson:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/dashboard/instructor/lessons"
          className="inline-flex items-center gap-2 text-primary hover:underline mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Lessons
        </Link>
        <h1 className="text-4xl font-bold text-foreground mb-2">Create New Lesson</h1>
        <p className="text-muted-foreground">
          Add engaging content to your course
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information Section */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-xl font-semibold text-foreground mb-6">Lesson Details</h2>

          <div className="space-y-4">
            {/* Course Selection */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Select Course <span className="text-destructive">*</span>
              </label>
              <select
                name="courseId"
                value={formData.courseId}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                required
              >
                <option value="">Choose a course</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Lesson Title */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Lesson Title <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., React Hooks Deep Dive"
                className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Description <span className="text-destructive">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe the lesson content"
                rows={4}
                className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                required
              />
            </div>

            {/* Content Type & Order */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Content Type <span className="text-destructive">*</span>
                </label>
                <select
                  name="contentType"
                  value={formData.contentType}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                >
                  {contentTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Lesson Order <span className="text-destructive">*</span>
                </label>
                <input
                  type="number"
                  name="order"
                  value={formData.order}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Video Upload Section */}
        {formData.contentType === 'video' && (
          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-xl font-semibold text-foreground mb-6">Video Content</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Upload Video <span className="text-destructive">*</span>
                </label>
                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-sm text-foreground font-medium">
                      {videoFile ? videoFile.name : 'Click to upload or drag and drop'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      MP4, WebM, OGG up to 500MB
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoChange}
                    className="hidden"
                    required={formData.contentType === 'video'}
                  />
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Video Duration (minutes)
                </label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  placeholder="0"
                  min="0"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>
        )}

        {/* Text Content Section */}
        {formData.contentType === 'text' && (
          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-xl font-semibold text-foreground mb-6">Text Content</h2>

            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Enter lesson content in markdown or plain text"
              rows={8}
              className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              required={formData.contentType === 'text'}
            />
          </div>
        )}

        {/* Preview Toggle */}
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="isPreview"
                checked={formData.isPreview}
                onChange={handleInputChange}
                className="w-4 h-4 rounded border border-border"
              />
              <div>
                <p className="text-sm font-medium text-foreground">
                  Make this a preview lesson
                </p>
                <p className="text-xs text-muted-foreground">
                  Free users can access this lesson without enrolling
                </p>
              </div>
            </label>
            {formData.isPreview && (
              <Eye className="h-5 w-5 text-primary ml-auto" />
            )}
          </div>
        </div>

        {/* Resources Section */}
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">Resources</h2>
            <p className="text-sm text-muted-foreground">Optional</p>
          </div>

          <div className="space-y-4">
            {formData.resources.map((resource, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={resource.name}
                  onChange={(e) => updateResource(index, 'name', e.target.value)}
                  placeholder="Resource name (e.g., Cheat Sheet)"
                  className="flex-1 rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="url"
                  value={resource.url}
                  onChange={(e) => updateResource(index, 'url', e.target.value)}
                  placeholder="https://example.com"
                  className="flex-1 rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="button"
                  onClick={() => removeResource(index)}
                  className="px-3 py-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={addResource}
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              <Plus className="h-4 w-4" />
              Add resource
            </button>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex gap-4 justify-end">
          <Link
            href="/dashboard/instructor/lessons"
            className="px-6 py-2 rounded-lg border border-border bg-card text-foreground hover:bg-muted transition-colors font-medium"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Creating...' : 'Create Lesson'}
          </button>
        </div>
      </form>
    </div>
  );
}
