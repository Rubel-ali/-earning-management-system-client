'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { useAssignStaffMutation } from '@/redux/features/queue/queueApi';
import { useAllStaffQuery } from '@/redux/features/staff/staffApi';
import { toast } from 'react-toastify';

interface AssignStaffDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  queueId: string;              // ✅ FIXED
  queuePosition: number;
  patientName: string;
  onAssigned?: () => void;      // ✅ refetch callback
}

type SelectedStaff = {
  id: string;
  name: string;
};

export function AssignStaffDialog({
  open,
  onOpenChange,
  queueId,
  queuePosition,
  patientName,
  onAssigned,
}: AssignStaffDialogProps) {
  const [selectedStaff, setSelectedStaff] =
    useState<SelectedStaff | null>(null);

  const [assignStaff, { isLoading }] = useAssignStaffMutation();
  const { data: staffData, isLoading: staffLoading } =
    useAllStaffQuery(null);

  // ✅ only AVAILABLE staff
  const availableStaff =
    staffData?.data?.filter(
      (staff: any) => staff.status === 'AVAILABLE'
    ) || [];

  const handleAssign = async () => {
    if (!selectedStaff) {
      toast.error('Please select a staff');
      return;
    }

    try {
      await assignStaff({
        queueId,                 // ✅ IMPORTANT
        staffId: selectedStaff.id,
      }).unwrap();

      toast.success(
        `Assigned to ${selectedStaff.name}`
      );

      setSelectedStaff(null);
      onOpenChange(false);
      onAssigned?.();            // ✅ refresh queue list
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to assign staff');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Assign Staff</DialogTitle>
        </DialogHeader>

        {/* Queue Info */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4 text-sm space-y-2">
          <p><b>Position:</b> #{queuePosition}</p>
          <p><b>Patient:</b> {patientName}</p>
        </div>

        {/* Staff List */}
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {staffLoading && (
            <p className="text-center text-muted-foreground">
              Loading staff...
            </p>
          )}

          {!staffLoading && availableStaff.length === 0 && (
            <p className="text-center text-muted-foreground">
              No staff available
            </p>
          )}

          {availableStaff.map((staff: any) => {
            const isSelected = selectedStaff?.id === staff.id;

            return (
              <button
                key={staff.id}
                onClick={() =>
                  setSelectedStaff({ id: staff.id, name: staff.name })
                }
                className={`w-full px-4 py-3 border rounded-lg flex justify-between items-center ${
                  isSelected
                    ? 'border-primary bg-primary/10'
                    : 'hover:border-primary'
                }`}
              >
                <span>{staff.name}</span>
                {isSelected && (
                  <Check className="w-5 h-5 text-primary" />
                )}
              </button>
            );
          })}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleAssign}
            disabled={!selectedStaff || isLoading}
          >
            {isLoading ? 'Assigning...' : 'Assign Staff'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}