'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { useAllServicesQuery } from '@/redux/features/services/servicesApi';
import { useAllStaffQuery } from '@/redux/features/staff/staffApi';
import { useCreateAppointmentMutation } from '@/redux/features/appointment/appointmentApi';

export function AddAppointmentDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [createAppointment, { isLoading }] = useCreateAppointmentMutation();
  const { data: serviceData } = useAllServicesQuery({});
  const { data: staffData } = useAllStaffQuery({});

  const [formData, setFormData] = useState({
    customerName: '',
    serviceId: '',
    staffId: '', // optional
    appointmentDate: '',
    startTime: '',
    endTime: '',
  });

  const handleSubmit = async () => {
    if (
      !formData.customerName ||
      !formData.serviceId ||
      !formData.appointmentDate ||
      !formData.startTime ||
      !formData.endTime
    ) {
      alert('Please fill all required fields');
      return;
    }

    const payload = {
      customerName: formData.customerName,
      serviceId: formData.serviceId,
      staffId: formData.staffId || undefined, // optional
      appointmentDate: new Date(
        `${formData.appointmentDate}T${formData.startTime}`
      ).toISOString(),
      startTime: formData.startTime,
      endTime: formData.endTime,
    };

    try {
      await createAppointment(payload).unwrap();
      onOpenChange(false);
      setFormData({
        customerName: '',
        serviceId: '',
        staffId: '',
        appointmentDate: '',
        startTime: '',
        endTime: '',
      });
    } catch {
      alert('Failed to create appointment');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Create Appointment</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Customer name"
            value={formData.customerName}
            onChange={(e) =>
              setFormData({ ...formData, customerName: e.target.value })
            }
          />

          <Select
            value={formData.serviceId}
            onValueChange={(value) =>
              setFormData({ ...formData, serviceId: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select service" />
            </SelectTrigger>
            <SelectContent>
              {serviceData?.data?.map((service: any) => (
                <SelectItem key={service.id} value={service.id}>
                  {service.name} ({service.duration} min)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={formData.staffId}
            onValueChange={(value) =>
              setFormData({ ...formData, staffId: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select staff (optional)" />
            </SelectTrigger>
            <SelectContent>
              {staffData?.data?.map((staff: any) => (
                <SelectItem key={staff.id} value={staff.id}>
                  {staff.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            type="date"
            value={formData.appointmentDate}
            onChange={(e) =>
              setFormData({ ...formData, appointmentDate: e.target.value })
            }
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              type="time"
              value={formData.startTime}
              onChange={(e) =>
                setFormData({ ...formData, startTime: e.target.value })
              }
            />
            <Input
              type="time"
              value={formData.endTime}
              onChange={(e) =>
                setFormData({ ...formData, endTime: e.target.value })
              }
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
