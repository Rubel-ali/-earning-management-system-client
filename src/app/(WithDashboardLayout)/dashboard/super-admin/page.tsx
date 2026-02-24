'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, DollarSign, TrendingUp, AlertCircle, Shield, Edit2, CheckCircle, XCircle } from 'lucide-react';

export default function SuperAdminDashboard() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tabParam = (searchParams.get('tab') || 'overview') as 'overview' | 'users' | 'analytics' | 'settings';
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'analytics' | 'settings'>(tabParam);
  const [searchUsers, setSearchUsers] = useState('');
  const [filterUsers, setFilterUsers] = useState('all');

  const handleTabChange = (tab: 'overview' | 'users' | 'analytics' | 'settings') => {
    setActiveTab(tab);
    router.push(`?tab=${tab}`);
  };

  useEffect(() => {
    setActiveTab(tabParam);
  }, [tabParam]);
  const [users] = useState([
    { id: 1, name: 'Admin User', email: 'admin@example.com', role: 'admin', status: 'active', joinDate: '2024-01-15', courses: 0 },
    { id: 2, name: 'Sarah Chen', email: 'sarah.chen@example.com', role: 'instructor', status: 'active', joinDate: '2024-02-20', courses: 8 },
    { id: 3, name: 'John Doe', email: 'john.doe@example.com', role: 'student', status: 'active', joinDate: '2024-03-10', courses: 3 },
    { id: 4, name: 'Mike Johnson', email: 'mike.johnson@example.com', role: 'instructor', status: 'suspended', joinDate: '2024-01-05', courses: 6 },
  ]);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchUsers.toLowerCase());
    const matchesFilter = filterUsers === 'all' || user.role === filterUsers;
    return matchesSearch && matchesFilter;
  });

  const platformStats = [
    {
      label: 'Total Users',
      value: '12,450',
      change: '+8%',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      label: 'Total Revenue',
      value: '$184,500',
      change: '+15%',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      label: 'Platform Health',
      value: '99.8%',
      change: 'Excellent',
      icon: TrendingUp,
      color: 'text-purple-600'
    },
    {
      label: 'Pending Actions',
      value: '23',
      change: 'Requires attention',
      icon: AlertCircle,
      color: 'text-orange-600'
    }
  ];

  const revenueData = [
    { month: 'Jan', revenue: 28500 },
    { month: 'Feb', revenue: 32100 },
    { month: 'Mar', revenue: 38500 },
    { month: 'Apr', revenue: 42300 },
    { month: 'May', revenue: 48700 },
    { month: 'Jun', revenue: 54800 },
  ];

  const userGrowth = [
    { month: 'Jan', instructors: 45, students: 2300, admins: 8 },
    { month: 'Feb', instructors: 52, students: 2800, admins: 8 },
    { month: 'Mar', instructors: 63, students: 3500, admins: 10 },
    { month: 'Apr', instructors: 75, students: 4200, admins: 11 },
    { month: 'May', instructors: 88, students: 5100, admins: 12 },
    { month: 'Jun', instructors: 102, students: 6200, admins: 14 },
  ];

  const recentActivities = [
    {
      action: 'New Instructor Registration',
      user: 'John Smith',
      status: 'Pending Review',
      time: '2 hours ago',
      severity: 'info'
    },
    {
      action: 'Course Flagged for Review',
      user: 'Advanced Python Course',
      status: 'Requires Action',
      time: '4 hours ago',
      severity: 'warning'
    },
    {
      action: 'Payment Dispute',
      user: 'Student ID: 4521',
      status: 'In Progress',
      time: '1 day ago',
      severity: 'error'
    },
    {
      action: 'System Update',
      user: 'Platform v2.1.0',
      status: 'Completed',
      time: '2 days ago',
      severity: 'success'
    },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'users', label: 'Manage Users' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'settings', label: 'Settings' },
  ] as const;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Shield className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">Super Admin Dashboard</h1>
        </div>
        <p className="text-muted-foreground">
          Platform administration and system-wide analytics
        </p>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-border">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === 'overview' && (
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
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="mt-2 text-3xl font-bold text-foreground">{stat.value}</p>
                  <p className={`mt-1 text-xs font-medium ${
                    stat.color === 'text-orange-600' ? 'text-orange-600' : 'text-primary'
                  }`}>
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
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue Growth */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Monthly Revenue
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip />
              <Bar
                dataKey="revenue"
                fill="#2563eb"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* User Growth */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            User Growth by Type
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={userGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis
                dataKey="month"
                stroke="var(--color-muted-foreground)"
                style={{ fontSize: '12px' }}
              />
              <YAxis stroke="var(--color-muted-foreground)" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="students"
                stroke="var(--color-primary)"
                strokeWidth={2}
                name="Students"
                dot={{ fill: 'var(--color-primary)' }}
              />
              <Line
                type="monotone"
                dataKey="instructors"
                stroke="var(--color-accent)"
                strokeWidth={2}
                name="Instructors"
                dot={{ fill: 'var(--color-accent)' }}
              />
              <Line
                type="monotone"
                dataKey="admins"
                stroke="var(--color-chart-4)"
                strokeWidth={2}
                name="Admins"
                dot={{ fill: 'var(--color-chart-4)' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activities */}
      <div>
        <h2 className="mb-6 text-2xl font-bold text-foreground">Recent Activities</h2>
        <div className="rounded-lg border border-border bg-card overflow-hidden">
          <div className="divide-y divide-border">
            {recentActivities.map((activity, idx) => (
              <div key={idx} className="flex items-center justify-between p-6 hover:bg-muted transition-colors">
                <div className="flex-1">
                  <h3 className="font-medium text-foreground mb-1">
                    {activity.action}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {activity.user} · {activity.time}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    activity.severity === 'info'
                      ? 'bg-blue-100 text-blue-700'
                      : activity.severity === 'warning'
                      ? 'bg-yellow-100 text-yellow-700'
                      : activity.severity === 'error'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {activity.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

          {/* System Monitoring */}
          <div>
            <h2 className="mb-6 text-2xl font-bold text-foreground">System Status</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                { name: 'API Servers', status: 'Operational', uptime: '99.9%', color: 'bg-green-100 text-green-700' },
                { name: 'Database', status: 'Operational', uptime: '100%', color: 'bg-green-100 text-green-700' },
                { name: 'Cache Layer', status: 'Operational', uptime: '99.8%', color: 'bg-green-100 text-green-700' },
                { name: 'Email Service', status: 'Degraded', uptime: '97%', color: 'bg-yellow-100 text-yellow-700' },
              ].map((service, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-border bg-card p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-foreground">{service.name}</h3>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${service.color}`}>
                      {service.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Uptime</span>
                    <span className="font-semibold text-foreground">{service.uptime}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Admin Actions */}
          <div>
            <h2 className="mb-6 text-2xl font-bold text-foreground">Admin Actions</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <button
                onClick={() => handleTabChange('users')}
                className="rounded-lg border border-border bg-card p-6 hover:border-primary/50 hover:shadow-lg transition-all group text-left"
              >
                <Users className="h-8 w-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-foreground mb-1">Manage Users</h3>
                <p className="text-sm text-muted-foreground">View and manage all users</p>
              </button>

              <button
                onClick={() => handleTabChange('analytics')}
                className="rounded-lg border border-border bg-card p-6 hover:border-primary/50 hover:shadow-lg transition-all group text-left"
              >
                <TrendingUp className="h-8 w-8 text-accent mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-foreground mb-1">Analytics</h3>
                <p className="text-sm text-muted-foreground">Platform-wide analytics</p>
              </button>

              <button
                onClick={() => handleTabChange('settings')}
                className="rounded-lg border border-border bg-card p-6 hover:border-primary/50 hover:shadow-lg transition-all group text-left"
              >
                <Shield className="h-8 w-8 text-green-600 mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-foreground mb-1">Settings</h3>
                <p className="text-sm text-muted-foreground">System configuration</p>
              </button>
            </div>
          </div>
        </>
      )}

      {/* USERS TAB */}
      {activeTab === 'users' && (
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchUsers}
                onChange={(e) => setSearchUsers(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <select
              value={filterUsers}
              onChange={(e) => setFilterUsers(e.target.value)}
              className="px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admins</option>
              <option value="instructor">Instructors</option>
              <option value="student">Students</option>
            </select>
          </div>

          <div className="rounded-lg border border-border bg-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border bg-muted/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Role</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Join Date</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Courses</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredUsers.map(user => (
                    <tr key={user.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-foreground">{user.name}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{user.email}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 capitalize">
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{user.joinDate}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{user.courses}</td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex gap-2">
                          {user.status === 'active' ? (
                            <button className="p-1.5 hover:bg-red-100 rounded transition-colors text-red-600" title="Suspend user">
                              <XCircle className="h-4 w-4" />
                            </button>
                          ) : (
                            <button className="p-1.5 hover:bg-green-100 rounded transition-colors text-green-600" title="Activate user">
                              <CheckCircle className="h-4 w-4" />
                            </button>
                          )}
                          <button className="p-1.5 hover:bg-muted rounded transition-colors text-foreground" title="Edit user">
                            <Edit2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            Showing {filteredUsers.length} of {users.length} users
          </div>
        </div>
      )}

      {/* ANALYTICS TAB */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {/* Key Metrics */}
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
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="mt-2 text-3xl font-bold text-foreground">{stat.value}</p>
                      <p className="mt-1 text-xs text-primary font-medium">{stat.change}</p>
                    </div>
                    <Icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Charts */}
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Revenue Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="month" stroke="var(--color-muted-foreground)" style={{ fontSize: '12px' }} />
                  <YAxis stroke="var(--color-muted-foreground)" style={{ fontSize: '12px' }} />
                  <Tooltip contentStyle={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)', borderRadius: '8px' }} />
                  <Bar dataKey="revenue" fill="var(--color-primary)" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">User Growth by Role</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={userGrowth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="month" stroke="var(--color-muted-foreground)" style={{ fontSize: '12px' }} />
                  <YAxis stroke="var(--color-muted-foreground)" style={{ fontSize: '12px' }} />
                  <Tooltip contentStyle={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)', borderRadius: '8px' }} />
                  <Legend />
                  <Line type="monotone" dataKey="students" stroke="var(--color-primary)" strokeWidth={2} />
                  <Line type="monotone" dataKey="instructors" stroke="var(--color-accent)" strokeWidth={2} />
                  <Line type="monotone" dataKey="admins" stroke="var(--color-secondary)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Statistics Summary */}
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="text-sm font-semibold text-muted-foreground mb-2">Active Courses</h3>
              <p className="text-3xl font-bold text-foreground">2,847</p>
              <p className="text-xs text-green-600 mt-2">+12% from last month</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="text-sm font-semibold text-muted-foreground mb-2">Course Enrollments</h3>
              <p className="text-3xl font-bold text-foreground">145,230</p>
              <p className="text-xs text-green-600 mt-2">+8% from last month</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="text-sm font-semibold text-muted-foreground mb-2">Completion Rate</h3>
              <p className="text-3xl font-bold text-foreground">78.5%</p>
              <p className="text-xs text-green-600 mt-2">+2% from last month</p>
            </div>
          </div>
        </div>
      )}

      {/* SETTINGS TAB */}
      {activeTab === 'settings' && (
        <div className="space-y-6">
          <div className="rounded-lg border border-border bg-card p-6 space-y-6">
            <h2 className="text-xl font-semibold text-foreground">Platform Settings</h2>

            {/* Maintenance Mode */}
            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div>
                <h3 className="font-medium text-foreground">Maintenance Mode</h3>
                <p className="text-sm text-muted-foreground">Temporarily disable platform access</p>
              </div>
              <input type="checkbox" className="w-5 h-5 rounded border-border accent-primary" />
            </div>

            {/* Email Service */}
            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div>
                <h3 className="font-medium text-foreground">Email Notifications</h3>
                <p className="text-sm text-muted-foreground">Enable email notifications for users</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-border accent-primary" />
            </div>

            {/* API Rate Limiting */}
            <div className="p-4 border border-border rounded-lg">
              <h3 className="font-medium text-foreground mb-3">API Rate Limiting</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-muted-foreground">Requests per minute</label>
                  <input type="number" defaultValue="1000" className="w-full mt-1 px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Requests per hour</label>
                  <input type="number" defaultValue="50000" className="w-full mt-1 px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
              </div>
            </div>

            {/* Security Settings */}
            <div className="p-4 border border-border rounded-lg">
              <h3 className="font-medium text-foreground mb-3">Security Settings</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked id="2fa" className="w-4 h-4 rounded border-border accent-primary" />
                  <label htmlFor="2fa" className="text-sm text-foreground">Require 2FA for admin accounts</label>
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked id="ssl" className="w-4 h-4 rounded border-border accent-primary" />
                  <label htmlFor="ssl" className="text-sm text-foreground">Force HTTPS connections</label>
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" id="session" className="w-4 h-4 rounded border-border accent-primary" />
                  <label htmlFor="session" className="text-sm text-foreground">Enforce session timeout (30 minutes)</label>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex gap-3 pt-4 border-t border-border">
              <button className="px-6 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium">
                Save Changes
              </button>
              <button className="px-6 py-2 rounded-lg border border-border bg-background text-foreground hover:bg-muted transition-colors font-medium">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
