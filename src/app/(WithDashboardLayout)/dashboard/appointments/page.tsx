'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Calendar, Edit2, Trash2 } from 'lucide-react';
import { AddAppointmentDialog } from '@/components/dashboard/appointments/add-appointment-dialog';

import { useAllServicesQuery } from '@/redux/features/services/servicesApi';
import { useAllAppointmentsQuery, useDeleteAppointmentMutation } from '@/redux/features/appointment/appointmentApi';
import { useAllStaffQuery } from '@/redux/features/staff/staffApi';

interface Appointment {
  id: string;
  customerName: string;
  serviceId: string;
  staffId: string;
  appointmentDate: string;
  startTime: string;
  endTime: string;
  status: string;
}

export default function AppointmentsPage() {
  const { data, isLoading } = useAllAppointmentsQuery({});
  const [deleteAppointment] = useDeleteAppointmentMutation();

  const { data: serviceData } = useAllServicesQuery({});
  const { data: staffData } = useAllStaffQuery({});

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [filterDate, setFilterDate] = useState('');
  const [filterStaff, setFilterStaff] = useState('');

  // ✅ Ensure appointments is always an array
  const appointments: Appointment[] = Array.isArray(data?.data)
    ? data.data
    : Array.isArray(data)
    ? data
    : [];

  // 🗑 Delete appointment
  const handleDelete = async (id: string) => {
    try {
      await deleteAppointment(id).unwrap();
      alert('Appointment deleted successfully');
    } catch (err) {
      console.error(err);
      alert('Failed to delete appointment');
    }
  };

  // 🔍 Filtered appointments
  const filteredAppointments = appointments.filter((apt) => {
    // Filter by date (ignore time)
    if (filterDate && !apt.appointmentDate.startsWith(filterDate)) return false;

    // Filter by staff name
    if (filterStaff) {
      const staffName = staffData?.data?.find((s: any) => s.id === apt.staffId)?.name;
      if (!staffName || staffName.toLowerCase() !== filterStaff.toLowerCase()) return false;
    }

    return true;
  });

  return (
    <div className="flex h-screen bg-background">
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white border-b px-8 py-6">
          <h1 className="text-3xl font-bold">Appointment Management</h1>
          <p className="text-muted-foreground text-sm">
            Create and manage customer appointments
          </p>
        </div>

        <div className="p-8">
          {/* Top bar */}
          <div className="flex justify-between mb-6">
            <h2 className="text-xl font-semibold">Appointments</h2>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="w-5 h-5 mr-2" />
              New Appointment
            </Button>
          </div>

          {/* Filters */}
          <div className="bg-white border rounded-lg p-4 mb-6 grid grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Filter by Date</label>
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Filter by Staff</label>
              <input
                placeholder="Staff name"
                value={filterStaff}
                onChange={(e) => setFilterStaff(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>

          {/* Table */}
          {isLoading ? (
            <p className="text-center text-muted-foreground">Loading appointments...</p>
          ) : filteredAppointments.length > 0 ? (
            <div className="bg-white border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-4 text-left">Customer</th>
                    <th className="px-6 py-4 text-left">Service</th>
                    <th className="px-6 py-4 text-left">Staff</th>
                    <th className="px-6 py-4 text-left">Date & Time</th>
                    <th className="px-6 py-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointments.map((apt) => {
                    const serviceName =
                      serviceData?.data?.find((s: any) => s.id === apt.serviceId)?.name || '-';
                    const staffName =
                      staffData?.data?.find((s: any) => s.id === apt.staffId)?.name || '-';
                    return (
                      <tr key={apt.id} className="border-b">
                        <td className="px-6 py-4">{apt.customerName}</td>
                        <td className="px-6 py-4">{serviceName}</td>
                        <td className="px-6 py-4">{staffName}</td>
                        <td className="px-6 py-4">
                          {apt.appointmentDate.split('T')[0]} {apt.startTime} - {apt.endTime}
                        </td>
                        <td className="px-6 py-4 flex gap-2">
                          <button className="text-primary">
                            <Edit2 className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(apt.id)}
                            className="text-red-500"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <Calendar className="w-12 h-12 mx-auto text-muted-foreground/40 mb-4" />
              <p className="text-muted-foreground">No appointments found</p>
            </div>
          )}
        </div>
      </main>

      {/* Dialog */}
      <AddAppointmentDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} />
    </div>
  );
}
