'use client';

import { useState } from 'react';
import { Search, Mail, Phone, Edit2, CheckCircle, XCircle, TrendingUp, Users, Award } from 'lucide-react';

export default function AdminManageInstructorsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [instructors, setInstructors] = useState([
    {
      id: 1,
      name: 'Sarah Chen',
      email: 'sarah.chen@example.com',
      phone: '+1 (555) 123-4567',
      status: 'active',
      courses: 8,
      students: 1240,
      revenue: '$12,400',
      rating: 4.9,
      joinDate: '2023-06-15',
      image: 'SC'
    },
    {
      id: 2,
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      phone: '+1 (555) 234-5678',
      status: 'active',
      courses: 6,
      students: 890,
      revenue: '$8,900',
      rating: 4.8,
      joinDate: '2023-07-20',
      image: 'MJ'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@example.com',
      phone: '+1 (555) 345-6789',
      status: 'active',
      courses: 7,
      students: 1050,
      revenue: '$10,500',
      rating: 4.8,
      joinDate: '2023-08-10',
      image: 'ER'
    },
    {
      id: 4,
      name: 'David Brown',
      email: 'david.brown@example.com',
      phone: '+1 (555) 456-7890',
      status: 'pending',
      courses: 0,
      students: 0,
      revenue: '$0',
      rating: 0,
      joinDate: '2024-02-01',
      image: 'DB'
    },
    {
      id: 5,
      name: 'Jennifer Wong',
      email: 'jennifer.wong@example.com',
      phone: '+1 (555) 567-8901',
      status: 'suspended',
      courses: 4,
      students: 320,
      revenue: '$3,200',
      rating: 2.1,
      joinDate: '2023-09-05',
      image: 'JW'
    },
    {
      id: 6,
      name: 'Robert Martinez',
      email: 'robert.martinez@example.com',
      phone: '+1 (555) 678-9012',
      status: 'active',
      courses: 5,
      students: 780,
      revenue: '$7,800',
      rating: 4.7,
      joinDate: '2023-10-12',
      image: 'RM'
    },
  ]);

  const filteredInstructors = instructors.filter(instructor => {
    const matchesSearch = instructor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         instructor.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || instructor.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleApproveInstructor = (instructorId: number) => {
    setInstructors(instructors.map(instructor =>
      instructor.id === instructorId
        ? { ...instructor, status: 'ACTIVE' }
        : instructor
    ));
  };

  const handleSuspendInstructor = (instructorId: number) => {
    setInstructors(instructors.map(instructor =>
      instructor.id === instructorId
        ? { ...instructor, status: 'SUSPENDED' }
        : instructor
    ));
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { bg: 'bg-green-500/10', text: 'text-green-600', label: 'Active' },
      pending: { bg: 'bg-yellow-500/10', text: 'text-yellow-600', label: 'Pending' },
      suspended: { bg: 'bg-red-500/10', text: 'text-red-600', label: 'Suspended' },
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${config?.bg} ${config?.text}`}>
        {config?.label}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-foreground">Manage Instructors</h1>
        <p className="text-muted-foreground">
          Manage instructor accounts and monitor their performance
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Instructors</p>
              <p className="mt-2 text-2xl font-bold text-foreground">{instructors.length}</p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active</p>
              <p className="mt-2 text-2xl font-bold text-green-600">
                {instructors.filter(i => i.status === 'active').length}
              </p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pending Review</p>
              <p className="mt-2 text-2xl font-bold text-yellow-600">
                {instructors.filter(i => i.status === 'pending').length}
              </p>
            </div>
            <Award className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Revenue Share</p>
              <p className="mt-2 text-2xl font-bold text-primary">
                ${instructors.reduce((sum, i) => sum + parseInt(i.revenue.replace('$', '').replace(',', '')), 0).toLocaleString()}
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-primary" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 flex-col sm:flex-row">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search instructors by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="suspended">Suspended</option>
        </select>
      </div>

      {/* Instructors Table */}
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Instructor</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Courses</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Students</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Rating</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredInstructors.map((instructor) => (
                <tr key={instructor.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">
                        {instructor.image}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{instructor.name}</p>
                        <p className="text-xs text-muted-foreground">Since {new Date(instructor.joinDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-sm text-foreground">
                        <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                        {instructor.email}
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Phone className="h-3.5 w-3.5" />
                        {instructor.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-foreground">{instructor.courses}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{instructor.students}</td>
                  <td className="px-6 py-4 text-sm font-medium text-foreground">{instructor.rating > 0 ? `${instructor.rating}/5` : 'N/A'}</td>
                  <td className="px-6 py-4 text-sm font-medium text-primary">{instructor.revenue}</td>
                  <td className="px-6 py-4">{getStatusBadge(instructor.status)}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {instructor.status === 'pending' && (
                        <button
                          onClick={() => handleApproveInstructor(instructor.id)}
                          title="Approve instructor"
                          className="p-1.5 rounded-lg hover:bg-green-500/10 transition-colors text-green-600"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </button>
                      )}
                      {instructor.status === 'active' && (
                        <button
                          onClick={() => handleSuspendInstructor(instructor.id)}
                          title="Suspend instructor"
                          className="p-1.5 rounded-lg hover:bg-red-500/10 transition-colors text-red-600"
                        >
                          <XCircle className="h-4 w-4" />
                        </button>
                      )}
                      <button
                        title="Edit instructor"
                        className="p-1.5 rounded-lg hover:bg-muted transition-colors text-foreground"
                      >
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

      {/* Empty State */}
      {filteredInstructors.length === 0 && (
        <div className="rounded-lg border border-border border-dashed bg-muted/30 p-12 text-center">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No instructors found
          </h3>
          <p className="text-sm text-muted-foreground">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
}
