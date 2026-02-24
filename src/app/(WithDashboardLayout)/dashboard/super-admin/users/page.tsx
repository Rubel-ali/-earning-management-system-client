'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Trash2, Shield, ShieldOff, Mail, Calendar, TrendingUp } from 'lucide-react';

export default function SuperAdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Sarah Chen',
      email: 'sarah.chen@example.com',
      role: 'instructor',
      status: 'active',
      joinDate: '2024-01-15',
      courses: 5,
      students: 3200,
      revenue: '$15,400'
    },
    {
      id: 2,
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      role: 'instructor',
      status: 'active',
      joinDate: '2024-02-10',
      courses: 3,
      students: 1200,
      revenue: '$4,800'
    },
    {
      id: 3,
      name: 'John Smith',
      email: 'john.smith@example.com',
      role: 'student',
      status: 'active',
      joinDate: '2024-03-01',
      courses: 4,
      students: 0,
      revenue: '$0'
    },
    {
      id: 4,
      name: 'Emma Wilson',
      email: 'emma.wilson@example.com',
      role: 'instructor',
      status: 'active',
      joinDate: '2024-03-05',
      courses: 6,
      students: 2800,
      revenue: '$12,600'
    },
    {
      id: 5,
      name: 'David Brown',
      email: 'david.brown@example.com',
      role: 'student',
      status: 'suspended',
      joinDate: '2024-01-20',
      courses: 2,
      students: 0,
      revenue: '$0'
    },
    {
      id: 6,
      name: 'Lisa Anderson',
      email: 'lisa.anderson@example.com',
      role: 'instructor',
      status: 'active',
      joinDate: '2024-02-20',
      courses: 7,
      students: 4100,
      revenue: '$18,450'
    },
    {
      id: 7,
      name: 'Robert Martinez',
      email: 'robert.martinez@example.com',
      role: 'admin',
      status: 'active',
      joinDate: '2023-12-01',
      courses: 0,
      students: 0,
      revenue: '$0'
    },
    {
      id: 8,
      name: 'Jennifer Wong',
      email: 'jennifer.wong@example.com',
      role: 'student',
      status: 'active',
      joinDate: '2024-02-15',
      courses: 5,
      students: 0,
      revenue: '$0'
    },
  ]);

  const handleSuspendUser = (userId: number) => {
    setUsers(users.map(user =>
      user.id === userId
        ? { ...user, status: user.status === 'suspended' ? 'active' : 'suspended' }
        : user
    ));
  };

  const handleDeleteUser = (userId: number) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-purple/10 text-purple';
      case 'instructor': return 'bg-blue/10 text-blue-600';
      case 'student': return 'bg-green/10 text-green-600';
      default: return 'bg-gray/10 text-gray-600';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/10 text-green-700';
      case 'suspended': return 'bg-red-500/10 text-red-700';
      default: return 'bg-gray/10 text-gray-600';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">User Management</h1>
        <p className="text-muted-foreground">
          Manage all users, instructors, and admins on the platform
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-4">
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="text-xs font-medium text-muted-foreground mb-1">Total Users</div>
          <div className="text-2xl font-bold text-foreground">{users.length}</div>
          <div className="text-xs text-muted-foreground mt-2">+3 this month</div>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="text-xs font-medium text-muted-foreground mb-1">Instructors</div>
          <div className="text-2xl font-bold text-foreground">{users.filter(u => u.role === 'instructor').length}</div>
          <div className="text-xs text-muted-foreground mt-2">+1 this month</div>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="text-xs font-medium text-muted-foreground mb-1">Students</div>
          <div className="text-2xl font-bold text-foreground">{users.filter(u => u.role === 'student').length}</div>
          <div className="text-xs text-muted-foreground mt-2">+2 this month</div>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="text-xs font-medium text-muted-foreground mb-1">Suspended</div>
          <div className="text-2xl font-bold text-foreground">{users.filter(u => u.status === 'suspended').length}</div>
          <div className="text-xs text-muted-foreground mt-2">1 under review</div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="rounded-lg border border-border bg-card p-4">
        <div className="grid gap-4 sm:grid-cols-4">
          <div className="relative sm:col-span-2">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-border bg-background pl-10 pr-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="instructor">Instructor</option>
            <option value="student">Student</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-6 py-4 text-left text-xs font-semibold text-foreground uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-foreground uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-foreground uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-foreground uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-foreground uppercase tracking-wider">Joined</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-foreground uppercase tracking-wider">Activity</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-foreground">{user.name}</td>
                  <td className="px-6 py-4">
                    <a href={`mailto:${user.email}`} className="text-sm text-primary hover:underline flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {user.email}
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getRoleBadgeColor(user.role)}`}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusBadgeColor(user.status)}`}>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {new Date(user.joinDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm">
                      {user.role === 'instructor' && (
                        <>
                          <TrendingUp className="h-3 w-3 text-primary" />
                          <span className="text-xs">{user.courses} courses</span>
                        </>
                      )}
                      {user.role === 'student' && (
                        <span className="text-xs text-muted-foreground">{user.courses} enrollments</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleSuspendUser(user.id)}
                        title={user.status === 'active' ? 'Suspend user' : 'Unsuspend user'}
                        className={`p-1.5 rounded-lg transition-colors ${
                          user.status === 'active'
                            ? 'text-muted-foreground hover:bg-destructive/10 hover:text-destructive'
                            : 'text-destructive hover:bg-destructive/10'
                        }`}
                      >
                        {user.status === 'active' ? (
                          <ShieldOff className="h-4 w-4" />
                        ) : (
                          <Shield className="h-4 w-4" />
                        )}
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        title="Delete user"
                        className="p-1.5 rounded-lg text-destructive hover:bg-destructive/10 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {filteredUsers.length === 0 && (
        <div className="rounded-lg border border-border border-dashed bg-muted/30 p-12 text-center">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No users found
          </h3>
          <p className="text-sm text-muted-foreground">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
}
