"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Users,
  BookOpen,
  TrendingUp,
  DollarSign,
  ArrowRight,
  Edit2,
  Trash2,
  CheckCircle,
  XCircle,
} from "lucide-react";

export default function AdminDashboard() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tabParam = (searchParams.get("tab") || "overview") as
    | "overview"
    | "courses"
    | "instructors"
    | "analytics";
  const [activeTab, setActiveTab] = useState<
    "overview" | "courses" | "instructors" | "analytics"
  >(tabParam);

  const handleTabChange = (
    tab: "overview" | "courses" | "instructors" | "analytics",
  ) => {
    setActiveTab(tab);
    router.push(`?tab=${tab}`);
  };

  useEffect(() => {
    setActiveTab(tabParam);
  }, [tabParam]);
  const [searchCourses, setSearchCourses] = useState("");
  const [filterCourses, setFilterCourses] = useState("all");
  const [searchInstructors, setSearchInstructors] = useState("");
  const [filterInstructors, setFilterInstructors] = useState("all");
  const platformStats = [
    {
      label: "Total Users",
      value: "2,450",
      change: "+12%",
      icon: Users,
      color: "text-blue-600",
    },
    {
      label: "Active Courses",
      value: "85",
      change: "+5 new",
      icon: BookOpen,
      color: "text-green-600",
    },
    {
      label: "Monthly Revenue",
      value: "$18,500",
      change: "+18%",
      icon: DollarSign,
      color: "text-purple-600",
    },
    {
      label: "Avg Rating",
      value: "4.7/5",
      change: "+0.2",
      icon: TrendingUp,
      color: "text-orange-600",
    },
  ];

  const categoryDistribution = [
    { name: "Development", value: 35, fill: "#2563eb" }, // Blue
    { name: "Design", value: 25, fill: "#10b981" }, // Green
    { name: "Marketing", value: 20, fill: "#8b5cf6" }, // Purple
    { name: "Business", value: 20, fill: "#f59e0b" }, // Orange
  ];

  const topInstructors = [
    { name: "Sarah Chen", courses: 8, students: 450, revenue: "$4,500" },
    { name: "Mike Johnson", courses: 6, students: 320, revenue: "$3,200" },
    { name: "Emily Rodriguez", courses: 7, students: 380, revenue: "$3,800" },
    { name: "David Brown", courses: 5, students: 280, revenue: "$2,800" },
  ];

  const [courses] = useState([
    {
      id: 1,
      title: "Advanced React Patterns",
      instructor: "Sarah Chen",
      category: "Web Development",
      students: 234,
      status: "published",
      rating: 4.8,
      revenue: "$2,340",
    },
    {
      id: 2,
      title: "UI/UX Design Principles",
      instructor: "Emma Wilson",
      category: "Design",
      students: 156,
      status: "published",
      rating: 4.9,
      revenue: "$1,560",
    },
    {
      id: 3,
      title: "Python for Data Science",
      instructor: "Dr. James Lee",
      category: "Data Science",
      students: 421,
      status: "published",
      rating: 4.7,
      revenue: "$4,210",
    },
    {
      id: 4,
      title: "JavaScript Mastery",
      instructor: "Emily Rodriguez",
      category: "Web Development",
      students: 89,
      status: "flagged",
      rating: 3.2,
      revenue: "$890",
    },
  ]);

  const [instructors] = useState([
    {
      id: 1,
      name: "Sarah Chen",
      email: "sarah.chen@example.com",
      phone: "+1 (555) 123-4567",
      status: "active",
      courses: 8,
      students: 1240,
      revenue: "$12,400",
      rating: 4.9,
    },
    {
      id: 2,
      name: "Mike Johnson",
      email: "mike.johnson@example.com",
      phone: "+1 (555) 234-5678",
      status: "active",
      courses: 6,
      students: 890,
      revenue: "$8,900",
      rating: 4.8,
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      email: "emily.rodriguez@example.com",
      phone: "+1 (555) 345-6789",
      status: "active",
      courses: 7,
      students: 1050,
      revenue: "$10,500",
      rating: 4.8,
    },
    {
      id: 4,
      name: "David Brown",
      email: "david.brown@example.com",
      phone: "+1 (555) 456-7890",
      status: "pending",
      courses: 0,
      students: 0,
      revenue: "$0",
      rating: 0,
    },
  ]);

  const enrollmentData = [
    { week: "Week 1", enrollments: 120, completions: 45 },
    { week: "Week 2", enrollments: 180, completions: 65 },
    { week: "Week 3", enrollments: 250, completions: 95 },
    { week: "Week 4", enrollments: 320, completions: 140 },
    { week: "Week 5", enrollments: 410, completions: 185 },
    { week: "Week 6", enrollments: 520, completions: 260 },
  ];

  const revenueData = [
    { month: "Jan", revenue: 28500, target: 25000 },
    { month: "Feb", revenue: 32100, target: 28000 },
    { month: "Mar", revenue: 38500, target: 32000 },
    { month: "Apr", revenue: 42300, target: 35000 },
    { month: "May", revenue: 48700, target: 40000 },
    { month: "Jun", revenue: 54800, target: 45000 },
  ];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title
      .toLowerCase()
      .includes(searchCourses.toLowerCase());
    const matchesFilter =
      filterCourses === "all" || course.status === filterCourses;
    return matchesSearch && matchesFilter;
  });

  const filteredInstructors = instructors.filter((instructor) => {
    const matchesSearch = instructor.name
      .toLowerCase()
      .includes(searchInstructors.toLowerCase());
    const matchesFilter =
      filterInstructors === "all" || instructor.status === filterInstructors;
    return matchesSearch && matchesFilter;
  });

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "courses", label: "Manage Courses" },
    { id: "instructors", label: "Manage Instructors" },
    { id: "analytics", label: "Analytics" },
  ] as const;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === "overview" && (
        <>
          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {platformStats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className="rounded-lg border border-border bg-card p-6 hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {stat.label}
                      </p>
                      <p className="mt-2 text-3xl font-bold text-foreground">
                        {stat.value}
                      </p>
                      <p className="mt-1 text-xs text-primary font-medium">
                        {stat.change}
                      </p>
                    </div>
                    <Icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Charts */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Enrollment Trend */}
            <div className="lg:col-span-2 rounded-lg border border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Enrollment Trend
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={enrollmentData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--color-border)"
                  />
                  <XAxis
                    dataKey="week" // ✅ FIXED (month ছিল)
                    stroke="var(--color-muted-foreground)"
                    style={{ fontSize: "12px" }}
                  />
                  <YAxis
                    stroke="var(--color-muted-foreground)"
                    style={{ fontSize: "12px" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="enrollments"
                    stroke="#2563eb" // ✅ BLUE FIXED
                    strokeWidth={3}
                    dot={{ fill: "#2563eb" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Category Distribution */}
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Courses by Category
              </h3>

              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ value }) => `${value}%`}
                    outerRadius={80}
                    dataKey="value"
                  >
                    {categoryDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>

                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Instructors */}
          <div>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">
                Top Instructors
              </h2>
              <button
                onClick={() => handleTabChange("instructors")}
                className="flex items-center gap-2 text-primary hover:underline text-sm font-medium"
              >
                View All
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="rounded-lg border border-border bg-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-border">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                        Instructor
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                        Courses
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                        Students
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                        Revenue
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {topInstructors.map((instructor, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-muted transition-colors"
                      >
                        <td className="px-6 py-4 text-sm font-medium text-foreground">
                          {instructor.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">
                          {instructor.courses}
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">
                          {instructor.students}
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-primary">
                          {instructor.revenue}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid gap-4 md:grid-cols-3">
            <button
              onClick={() => handleTabChange("courses")}
              className="rounded-lg border border-border bg-card p-6 hover:border-primary/50 hover:shadow-lg transition-all group text-left"
            >
              <BookOpen className="h-8 w-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-foreground mb-1">
                Manage Courses
              </h3>
              <p className="text-sm text-muted-foreground">
                Review and approve courses
              </p>
            </button>

            <button
              onClick={() => handleTabChange("instructors")}
              className="rounded-lg border border-border bg-card p-6 hover:border-primary/50 hover:shadow-lg transition-all group text-left"
            >
              <Users className="h-8 w-8 text-accent mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-foreground mb-1">
                Manage Instructors
              </h3>
              <p className="text-sm text-muted-foreground">
                Onboard and manage users
              </p>
            </button>

            <button
              onClick={() => handleTabChange("analytics")}
              className="rounded-lg border border-border bg-card p-6 hover:border-primary/50 hover:shadow-lg transition-all group text-left"
            >
              <TrendingUp className="h-8 w-8 text-green-600 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-foreground mb-1">
                View Analytics
              </h3>
              <p className="text-sm text-muted-foreground">
                Detailed platform analytics
              </p>
            </button>
          </div>
        </>
      )}

      {/* COURSES TAB */}
      {activeTab === "courses" && (
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search courses..."
                value={searchCourses}
                onChange={(e) => setSearchCourses(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <select
              value={filterCourses}
              onChange={(e) => setFilterCourses(e.target.value as any)}
              className="px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="flagged">Flagged</option>
            </select>
          </div>

          <div className="rounded-lg border border-border bg-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border bg-muted/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                      Course
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                      Instructor
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                      Students
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                      Rating
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                      Revenue
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredCourses.map((course) => (
                    <tr
                      key={course.id}
                      className="hover:bg-muted/30 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-foreground">
                        {course.title}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {course.instructor}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {course.students}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        ⭐ {course.rating}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            course.status === "published"
                              ? "bg-green-100 text-green-700"
                              : course.status === "draft"
                                ? "bg-gray-100 text-gray-700"
                                : "bg-red-100 text-red-700"
                          }`}
                        >
                          {course.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-primary">
                        {course.revenue}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex gap-2">
                          <button className="p-1.5 hover:bg-muted rounded transition-colors">
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button className="p-1.5 hover:bg-muted rounded transition-colors">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* INSTRUCTORS TAB */}
      {activeTab === "instructors" && (
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search instructors..."
                value={searchInstructors}
                onChange={(e) => setSearchInstructors(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <select
              value={filterInstructors}
              onChange={(e) => setFilterInstructors(e.target.value as any)}
              className="px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          <div className="rounded-lg border border-border bg-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border bg-muted/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                      Courses
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                      Students
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                      Rating
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                      Revenue
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredInstructors.map((instructor) => (
                    <tr
                      key={instructor.id}
                      className="hover:bg-muted/30 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-foreground">
                        {instructor.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {instructor.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {instructor.courses}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {instructor.students}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        ⭐ {instructor.rating || "N/A"}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            instructor.status === "active"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {instructor.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-primary">
                        {instructor.revenue}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex gap-2">
                          {instructor.status === "pending" ? (
                            <button className="p-1.5 hover:bg-green-100 rounded transition-colors text-green-600">
                              <CheckCircle className="h-4 w-4" />
                            </button>
                          ) : (
                            <button className="p-1.5 hover:bg-red-100 rounded transition-colors text-red-600">
                              <XCircle className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ANALYTICS TAB */}
      {activeTab === "analytics" && (
        <div className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Enrollments & Completions
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={enrollmentData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--color-border)"
                  />
                  <XAxis
                    dataKey="week"
                    stroke="var(--color-muted-foreground)"
                    style={{ fontSize: "12px" }}
                  />
                  <YAxis
                    stroke="var(--color-muted-foreground)"
                    style={{ fontSize: "12px" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="enrollments"
                    stroke="#2563eb" // ✅ BLUE
                    strokeWidth={3}
                  />
                  <Line
                    type="monotone"
                    dataKey="completions"
                    stroke="#10b981" // ✅ GREEN
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Revenue vs Target
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--color-border)"
                  />
                  <XAxis
                    dataKey="month"
                    stroke="var(--color-muted-foreground)"
                    style={{ fontSize: "12px" }}
                  />
                  <YAxis
                    stroke="var(--color-muted-foreground)"
                    style={{ fontSize: "12px" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="revenue"
                    fill="#1d4ed8" // ✅ DARK BLUE
                    radius={[6, 6, 0, 0]}
                  />
                  <Bar
                    dataKey="target"
                    fill="#93c5fd" // ✅ LIGHT BLUE
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
