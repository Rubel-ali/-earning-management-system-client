'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { useStaffStatusUpdateMutation } from '@/redux/features/staff/staffApi';
import { AddStaffDialog } from './add-staff-dialog';

export interface StaffMember {
  id: string;
  name: string;
  serviceType: string;
  dailyCapacity: number;
  status: 'AVAILABLE' | 'ON_LEAVE';
}

interface StaffTableProps {
  staffMembers?: StaffMember[];
  onEdit: (staff: StaffMember) => void;
  onDelete: (id: string) => void;
  onAddStaff?: (staff: Omit<StaffMember, 'id' | 'dailyCapacity'>) => void;
  onStatusChange?: (id: string, status: StaffMember['status']) => void;
}

export function StaffTable({ staffMembers = [], onEdit, onDelete, onAddStaff, onStatusChange }: StaffTableProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [updateStatus] = useStaffStatusUpdateMutation();
  const AVAILABILITY_STATUS: StaffMember['status'][] = ['AVAILABLE', 'ON_LEAVE'];

  const getStatusColor = (status: StaffMember['status']) => {
    switch (status) {
      case 'AVAILABLE':
        return 'bg-green-100 text-green-800';
      case 'ON_LEAVE':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusChange = async (id: string, newStatus: StaffMember['status']) => {
    if (onStatusChange) onStatusChange(id, newStatus);
    try {
      await updateStatus({ id, data: { status: newStatus } }).unwrap();
    } catch (err: any) {
      console.error('Status update failed', err);
      alert(err?.data?.message || 'Failed to update status');
    }
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Staff Members</h2>
        <Button onClick={() => setDialogOpen(true)} variant="outline">
          <Plus className="w-4 h-4 mr-2" /> Add Staff
        </Button>
      </div>

      <AddStaffDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onAddStaff={(staff) => {
          onAddStaff?.(staff);
          setDialogOpen(false);
        }}
      />

      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">NAME</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">SERVICE TYPE</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">DAILY CAPACITY</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">STATUS</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {staffMembers.length > 0 ? (
            staffMembers.map((staff) => (
              <tr key={staff.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-900">{staff.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{staff.serviceType}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{staff.dailyCapacity}</td>
                <td className="px-6 py-4">
                  <Select value={staff.status} onValueChange={(value) => handleStatusChange(staff.id, value as StaffMember['status'])}>
                    <SelectTrigger className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(staff.status)}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {AVAILABILITY_STATUS.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={() => onEdit(staff)} className="text-gray-600 hover:text-primary">
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => onDelete(staff.id)} className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center py-4 text-gray-500">
                No staff available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}