'use client';

import { useState } from 'react';
import { Search, Filter, Star, Users, Clock } from 'lucide-react';

export default function BrowseCoursesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('popular');

  const categories = ['All', 'Web Development', 'Design', 'Business', 'Data Science', 'Mobile'];

  const courses = [
    {
      id: 1,
      title: 'Advanced React Patterns',
      instructor: 'Sarah Chen',
      category: 'Web Development',
      rating: 4.8,
      students: 3200,
      price: 'Free',
      duration: '24 hours',
      level: 'Advanced',
      image: 'bg-gradient-to-br from-blue-500 to-blue-600'
    },
    {
      id: 2,
      title: 'UI/UX Design Principles',
      instructor: 'Emma Wilson',
      category: 'Design',
      rating: 4.9,
      students: 2800,
      price: '$29.99',
      duration: '18 hours',
      level: 'Intermediate',
      image: 'bg-gradient-to-br from-pink-500 to-pink-600'
    },
    {
      id: 3,
      title: 'Python for Data Science',
      instructor: 'Dr. James Lee',
      category: 'Data Science',
      rating: 4.7,
      students: 4100,
      price: '$39.99',
      duration: '32 hours',
      level: 'Intermediate',
      image: 'bg-gradient-to-br from-green-500 to-green-600'
    },
    {
      id: 4,
      title: 'Business Strategy Masterclass',
      instructor: 'Michael Zhang',
      category: 'Business',
      rating: 4.6,
      students: 1900,
      price: '$49.99',
      duration: '20 hours',
      level: 'Advanced',
      image: 'bg-gradient-to-br from-orange-500 to-orange-600'
    },
    {
      id: 5,
      title: 'Mobile App Development',
      instructor: 'Lisa Anderson',
      category: 'Mobile',
      rating: 4.8,
      students: 2600,
      price: 'Free',
      duration: '28 hours',
      level: 'Intermediate',
      image: 'bg-gradient-to-br from-purple-500 to-purple-600'
    },
    {
      id: 6,
      title: 'Digital Marketing Essentials',
      instructor: 'Robert Martinez',
      category: 'Business',
      rating: 4.5,
      students: 3400,
      price: '$24.99',
      duration: '15 hours',
      level: 'Beginner',
      image: 'bg-gradient-to-br from-red-500 to-red-600'
    },
    {
      id: 7,
      title: 'TypeScript Advanced Concepts',
      instructor: 'Alex Kim',
      category: 'Web Development',
      rating: 4.8,
      students: 2500,
      price: 'Free',
      duration: '20 hours',
      level: 'Advanced',
      image: 'bg-gradient-to-br from-cyan-500 to-cyan-600'
    },
    {
      id: 8,
      title: 'Database Design Mastery',
      instructor: 'David Brown',
      category: 'Web Development',
      rating: 4.9,
      students: 1800,
      price: '$49.99',
      duration: '26 hours',
      level: 'Advanced',
      image: 'bg-gradient-to-br from-indigo-500 to-indigo-600'
    },
    {
      id: 9,
      title: 'Web Design Fundamentals',
      instructor: 'Mike Johnson',
      category: 'Design',
      rating: 4.7,
      students: 2200,
      price: '$19.99',
      duration: '18 hours',
      level: 'Beginner',
      image: 'bg-gradient-to-br from-fuchsia-500 to-fuchsia-600'
    },
    {
      id: 10,
      title: 'JavaScript Mastery',
      instructor: 'Emily Rodriguez',
      category: 'Web Development',
      rating: 4.8,
      students: 3900,
      price: 'Free',
      duration: '30 hours',
      level: 'Intermediate',
      image: 'bg-gradient-to-br from-yellow-500 to-orange-600'
    },
    {
      id: 11,
      title: 'Cloud Computing Fundamentals',
      instructor: 'Jennifer Wong',
      category: 'Data Science',
      rating: 4.6,
      students: 1600,
      price: '$44.99',
      duration: '22 hours',
      level: 'Intermediate',
      image: 'bg-gradient-to-br from-sky-500 to-sky-600'
    },
    {
      id: 12,
      title: 'Content Marketing Strategy',
      instructor: 'Marcus Johnson',
      category: 'Business',
      rating: 4.5,
      students: 2100,
      price: '$29.99',
      duration: '16 hours',
      level: 'Beginner',
      image: 'bg-gradient-to-br from-rose-500 to-rose-600'
    },
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Explore All Courses</h1>
        <p className="text-muted-foreground">
          Discover {courses.length} courses from our expert instructors across multiple categories
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex gap-4 flex-col sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-input bg-background pl-10 pr-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background transition-all"
          />
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 font-medium text-foreground hover:bg-muted transition-colors whitespace-nowrap">
          <Filter className="h-4 w-4" />
          Filters
        </button>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`whitespace-nowrap px-4 py-2 rounded-lg font-medium transition-all ${
              selectedCategory === cat
                ? 'bg-primary text-primary-foreground'
                : 'border border-border bg-card text-foreground hover:border-primary/50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Sort Options */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredCourses.length} courses
        </p>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background transition-all"
        >
          <option value="popular">Most Popular</option>
          <option value="rating">Highest Rated</option>
          <option value="newest">Newest</option>
          <option value="price">Price: Low to High</option>
        </select>
      </div>

      {/* Courses Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="group rounded-lg border border-border bg-card overflow-hidden hover:border-primary/50 transition-all hover:shadow-lg"
          >
            {/* Course Image */}
            <div className={`h-40 w-full ${course.image}`} />

            {/* Course Content */}
            <div className="p-6">
              {/* Title & Instructor */}
              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-1 line-clamp-2">
                {course.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                by {course.instructor}
              </p>

              {/* Rating & Students */}
              <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-orange-400 text-orange-400" />
                  <span className="font-medium text-foreground">{course.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{(course.students / 1000).toFixed(1)}K</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{course.duration}</span>
                </div>
              </div>

              {/* Level */}
              <div className="mb-4">
                <span className={`inline-block px-2.5 py-1 rounded text-xs font-medium ${
                  course.level === 'Beginner'
                    ? 'bg-green-100 text-green-700'
                    : course.level === 'Intermediate'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-purple-100 text-purple-700'
                }`}>
                  {course.level}
                </span>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between border-t border-border pt-4">
                <span className="text-lg font-bold text-primary">
                  {course.price}
                </span>
                <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                  Enroll
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
