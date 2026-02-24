'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCreateServiceMutation } from '@/redux/features/services/servicesApi';

interface AddServiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddServiceDialog({
  open,
  onOpenChange,
}: AddServiceDialogProps) {
  const [createService, { isLoading }] = useCreateServiceMutation();

  const [formData, setFormData] = useState({
    name: '',
    duration: '',
    requiredStaffType: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const staffTypeOptions = [
    'DOCTOR',
    'CONSULTANT',
    'THERAPIST',
    'NURSE',
    'MEDICINE',
    'ADMINISTRATOR',
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Service name is required';
    }

    if (!formData.duration || isNaN(Number(formData.duration)) || Number(formData.duration) <= 0) {
      newErrors.duration = 'Duration must be a positive number';
    }

    if (!formData.requiredStaffType) {
      newErrors.requiredStaffType = 'Required staff type is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await createService({
        name: formData.name,
        duration: Number(formData.duration),
        requiredStaffType: formData.requiredStaffType,
      }).unwrap();

      // reset + close
      setFormData({
        name: '',
        duration: '',
        requiredStaffType: '',
      });
      setErrors({});
      onOpenChange(false);
    } catch (error) {
      console.error('Create service failed', error);
      alert('Failed to create service');
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Service</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Service Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Service Name <span className="text-red-500">*</span>
            </label>
            <Input
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="e.g. General Checkup"
            />
            {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Duration (minutes) <span className="text-red-500">*</span>
            </label>
            <Input
              type="number"
              min="1"
              value={formData.duration}
              onChange={(e) => handleInputChange('duration', e.target.value)}
              placeholder="e.g. 30"
            />
            {errors.duration && <p className="text-xs text-red-500">{errors.duration}</p>}
          </div>

          {/* Staff Type */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Required Staff Type <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.requiredStaffType}
              onChange={(e) => handleInputChange('requiredStaffType', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm"
            >
              <option value="">Select staff type</option>
              {staffTypeOptions.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.requiredStaffType && (
              <p className="text-xs text-red-500">{errors.requiredStaffType}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? 'Adding...' : 'Add Service'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}