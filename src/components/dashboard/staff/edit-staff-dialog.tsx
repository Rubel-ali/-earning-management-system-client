'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { StaffMember } from './staff-table';

interface EditStaffDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  staff: StaffMember | null;
  onSave: (id: string, data: Partial<StaffMember>) => void;
}

export function EditStaffDialog({
  open,
  onOpenChange,
  staff,
  onSave,
}: EditStaffDialogProps) {
  const [name, setName] = useState('');
  const [serviceType, setServiceType] = useState('');

  useEffect(() => {
    if (staff) {
      setName(staff.name);
      setServiceType(staff.serviceType);
    }
  }, [staff]);

  if (!staff) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Staff</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div>
            <label className="text-sm font-medium">Service Type</label>
            <Input
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              onSave(staff.id, { name, serviceType });
              onOpenChange(false);
            }}
          >
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}