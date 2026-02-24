'use client';

import { StaffTable, StaffMember } from '@/components/dashboard/staff/staff-table';
import {
  useAllStaffQuery,
  useCreateStaffMutation,
  useDeleteStaffMutation,
  useUpdateStaffMutation,
} from '@/redux/features/staff/staffApi';
import { toast } from 'react-toastify';

export default function StaffPage() {
  const { data, isLoading } = useAllStaffQuery([]);
  const [createStaff] = useCreateStaffMutation();
  const [deleteStaff] = useDeleteStaffMutation();
  const [updateStaff] = useUpdateStaffMutation();

  const staffList: StaffMember[] =
    data?.data?.map((s: any) => ({
      id: s.id,
      name: s.name,
      serviceType: s.serviceType,
      dailyCapacity: s.dailyCapacity,
      status: s.status,
    })) || [];

  const handleAddStaff = async (staff: Omit<StaffMember, 'id' | 'dailyCapacity'>) => {
    try {
      await createStaff({ ...staff, dailyCapacity: 5 }).unwrap();
      toast.success('Staff added successfully');
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to add staff');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteStaff(id).unwrap();
      toast.success('Staff deleted successfully');
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to delete staff');
    }
  };

  const handleEdit = async (staff: StaffMember) => {
    const newName = prompt('Enter new name', staff.name);
    if (!newName) return;

    try {
      await updateStaff({
        id: staff.id,
        data: { name: newName },
      }).unwrap();

      toast.success('Staff updated successfully');
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to update staff');
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <StaffTable
      staffMembers={staffList}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onAddStaff={handleAddStaff}
    />
  );
}