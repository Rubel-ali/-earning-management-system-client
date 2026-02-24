'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { StaffMember } from './staff-table';

interface AddStaffDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddStaff: (staff: Omit<StaffMember, 'id' | 'dailyCapacity'>) => void;
}

const SERVICE_TYPES = ['Doctor', 'Consultant', 'Therapist', 'Nurse', 'Medicion', 'Administrator'];

export function AddStaffDialog({ open, onOpenChange, onAddStaff }: AddStaffDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    serviceType: '',
    dailyCapacity: '5',
    status: 'AVAILABLE' as StaffMember['status'],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.serviceType) newErrors.serviceType = 'Service type is required';
    if (!formData.dailyCapacity || isNaN(parseInt(formData.dailyCapacity))) newErrors.dailyCapacity = 'Valid daily capacity is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    onAddStaff({
      name: formData.name.trim(),
      serviceType: formData.serviceType,
      status: formData.status,
    });

    // reset form
    setFormData({ name: '', serviceType: '', dailyCapacity: '5', status: 'AVAILABLE' });
    setErrors({});
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Staff Member</DialogTitle>
          <DialogDescription>Fill in the details to add a new staff member.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">Name <span className="text-destructive">*</span></Label>
            <Input id="name" name="name" placeholder="Enter staff name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="serviceType" className="text-sm font-medium">Service Type <span className="text-destructive">*</span></Label>
            <Select value={formData.serviceType} onValueChange={(value) => setFormData({ ...formData, serviceType: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select a service type" />
              </SelectTrigger>
              <SelectContent>
                {SERVICE_TYPES.map((type) => <SelectItem key={type} value={type}>{type}</SelectItem>)}
              </SelectContent>
            </Select>
            {errors.serviceType && <p className="text-sm text-destructive">{errors.serviceType}</p>}
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90">Add Staff</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}